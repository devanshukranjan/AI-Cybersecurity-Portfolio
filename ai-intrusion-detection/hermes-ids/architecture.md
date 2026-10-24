# Hermes System Architecture & Execution Blueprint

Hermes is architected across five operational layers: **Telemetry Ingestion**, **Stratified Feature Preprocessing**, **Multi-Model Inference (Supervised + Spatial CNN + Unsupervised Autoencoder)**, **Consensus Decision & Zero-Day Override**, and **Autonomous Response & SOC Telemetry**.

---

## 1. End-to-End Architectural Blueprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. TELEMETRY INGESTION & DATASET HARMONIZATION LAYER                        │
│                                                                             │
│  [ UGRansome2024 Dataset ]                  [ UNSW-NB15 Dataset ]           │
│  • Ransomware & zero-day telemetry           • 51,000 extracted benign flows│
│  • Raw shape: (149,043 x M)                 • Standardized to label=0       │
│                     │                                     │                 │
│                     └─────────────────┬───────────────────┘                 │
│                                       ▼                                     │
│               [ Harmonized Merged Corpus: 200,043 Rows ]                    │
│               • Align common schema attributes                              │
│               • Scrub identifiers: drop ['srcip', 'dstip', 'id']            │
│               • Eliminate spatial, temporal, and target-leakage bias        │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. STRATIFIED FEATURE SELECTION & SMOTE LAYER                               │
│                                                                             │
│  • SelectKBest (ANOVA F-test: f_classif, k=48 optimal features)             │
│  • MinMaxScaler: scales continuous features to bounded domain [0, 1]        │
│  • Stratified 80/20 Train-Test Split (140,030 Train / 60,013 Test)          │
│  • SMOTE (Synthetic Minority Over-sampling Technique):                      │
│    -> APPLIED STRICTLY POST-SPLIT on X_train to prevent synthetic leakage   │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
┌─────────────────────────┐┌─────────────────────────┐┌─────────────────────────┐
│ 3A. SUPERVISED ML       ││ 3B. TAB2IMAGE 2D CNN    ││ 3C. ZERO-DAY AUTOENCODER│
│                         ││                         ││                         │
│ • Random Forest         ││ • Reshapes 48 features  ││ • Trained EXCLUSIVELY   │
│   - 200 Trees, Depth 20 ││   into (8, 6, 1) matrix ││   on normal traffic (0) │
│   - 98.6% Acc, 1.4% FPR ││ • Conv2D(32, 3x3) + BN  ││ • 7-Layer Bottleneck    │
│ • XGBoost Classifier    ││ • MaxPool(2, 2)         ││   (48->64->32->16->48)  │
│   - 200 Trees, Depth 8  ││ • Conv2D(64, 3x3) + BN  ││ • Reconstructs normal   │
│   - 98.3% Acc, 1.7% FPR ││ • Dense(128) + Drop(0.4)││   patterns with low MSE │
│ • Evaluates known attack││ • 96.9% Acc on complex  ││ • Novel zero-days cause │
│   signatures & trees    ││   cross-feature patterns││   high reconstruction e │
└────────────┬────────────┘└────────────┬────────────┘└────────────┬────────────┘
             │                          │                          │
             └────────────┬─────────────┘                          │
                          ▼                                        │
┌────────────────────────────────────────────────────┐             │
│ 4. CONSENSUS DECISION & ZERO-DAY OVERRIDE ENGINE   │             │
│                                                    │             │
│  • Majority Vote across [RF, XGBoost, CNN]         │             │
│  • Autoencoder Anomaly Score Calculation:          │             │
│    MSE = mean( (X - recon)^2 )                     │             │
│    Threshold = 95th-percentile error (0.05)        │             │
│                                                    │             │
│  CRITICAL ZERO-DAY OVERRIDE LOGIC:                 │             │
│  if is_anomaly (MSE > 0.05) and majority_vote == 0:│◀────────────┘
│      ➔ OVERRIDE: Flag as Novel Zero-Day Attack!   │
│  else:                                             │
│      ➔ Output majority_vote label                 │
└─────────────────────────┬──────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. AUTONOMOUS ELIMINATION & SOC WORKSTATION LAYER                           │
│                                                                             │
│  • Hermes Tkinter SOC Dashboard:                                            │
│    - SHA-256 User Authentication (`users.json`)                             │
│    - Live Background Telemetry Polling (Every 2s)                           │
│    - Model Performance Cards & Live Confusion Matrices                      │
│  • Autonomous Threat Elimination:                                           │
│    - Automated IP Quarantine via Windows Firewall (`netsh`) / `iptables`    │
│    - Socket Termination & Host Isolation                                    │
│    - Forensic Audit Log Export (`traffic_actions.csv`)                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Implementation Details

### File Structure & Production Code Layout

The engine is decoupled into modular micro-components matching enterprise security standards:

```
├── config.py           # Centralized hyperparameter, dimension, and threshold settings
├── preprocess.py       # Multi-source ingestion, cleaning, ANOVA F-test, and SMOTE split
├── train.py            # Supervised, 2D CNN, and Autoencoder training pipelines
├── inference.py        # Low-latency runtime prediction and consensus decision engine
├── eliminate.py        # Automated firewall quarantine and socket isolation hooks
└── Hermes.py           # Tkinter-based SOC analyst monitoring workstation
```

### 1. Telemetry Ingestion (`preprocess.py`)
- Standardizes diverse network packet formats into unified Pandas dataframes.
- Remaps labels into a clean ternary space:
  - `0`: Normal / Benign traffic (from UNSW-NB15)
  - `1`: Malicious general network attack traffic (from UNSW-NB15)
  - `2`: Ransomware activity (from UGRansome2024)
- Drops `srcip`, `dstip`, and `id` to ensure the models learn protocol and behavioral properties rather than memorizing IP addresses.

### 2. Feature Selection & Preprocessing Pipeline
- **ANOVA F-Test (`SelectKBest`)**: Ranks the variance-ratio of all features against the target classes, selecting the $k=48$ most discriminative features.
- **Normalization**: Scales continuous features to $[0, 1]$ using `MinMaxScaler`, preserving relative distance while preventing unbounded packet counts from overwhelming gradient updates.
- **SMOTE Post-Split**:
  ```python
  X_train, X_test, y_train, y_test = train_test_split(
      X, y, test_size=0.2, random_state=42, stratify=y
  )
  sm = SMOTE(random_state=42)
  X_train_sm, y_train_sm = sm.fit_resample(X_train, y_train)
  ```
  This ensures zero synthetic observation leaks into the evaluation split.

### 3. Deep Bottleneck Autoencoder Architecture
Trained **only on normal traffic** (`y == 0`):

```python
def build_autoencoder(input_dim=48):
    inp = Input(shape=(input_dim,))
    # Encoder
    x = Dense(64, activation="relu")(inp)
    x = Dense(32, activation="relu")(x)
    x = Dense(16, activation="relu")(x)  # Bottleneck representation
    # Decoder
    x = Dense(32, activation="relu")(x)
    x = Dense(64, activation="relu")(x)
    out = Dense(input_dim, activation="sigmoid")(x)
    
    autoencoder = Model(inp, out)
    autoencoder.compile(optimizer="adam", loss="mse")
    return autoencoder
```

**Reconstruction Threshold Calibration**:
```python
recon = ae.predict(X_normal)
recon_err = np.mean(np.power(X_normal - recon, 2), axis=1)
threshold = np.percentile(recon_err, 95)  # 95th percentile ~ 0.05
```
- By establishing the cutoff at the 95th percentile, normal traffic operates with a ~5% acceptable false-alarm rate.
- Any traffic containing novel payload characteristics produces an elevated MSE spike ($0.08 - 0.40$), indicating anomalous zero-day intrusion.

### 4. Tab2Image 2D CNN Architecture
Converts the 48 normalized features into an $(8, 6, 1)$ spatial tensor:

```python
def build_cnn(input_shape=(8, 6, 1), num_classes=3):
    model = Sequential([
        Input(shape=input_shape),
        Conv2D(32, (3, 3), activation="relu", padding="same"),
        BatchNormalization(),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation="relu", padding="same"),
        BatchNormalization(),
        Flatten(),
        Dense(128, activation="relu"),
        Dropout(0.4),
        Dense(num_classes, activation="softmax")
    ])
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
    return model
```

### 5. Consensus & Zero-Day Override Engine (`inference.py`)

```python
def predict(raw_features: np.ndarray) -> dict:
    X = selector.transform(raw_features.reshape(1, -1))
    X = scaler.transform(X)

    # Supervised predictions
    rf_pred = rf.predict(X)[0]
    xgb_pred = xgb.predict(X)[0]

    # CNN spatial prediction
    X_cnn = X.reshape(1, 8, 6, 1)
    cnn_pred = np.argmax(cnn.predict(X_cnn), axis=1)[0]

    # Autoencoder reconstruction error
    recon = ae.predict(X)
    recon_err = np.mean(np.power(X - recon, 2))
    is_anomaly = recon_err > threshold

    # Consensus voting
    votes = [rf_pred, xgb_pred, cnn_pred]
    majority = max(set(votes), key=votes.count)

    # Zero-day override
    if is_anomaly and majority == 0:
        final = 1
        note = "Zero-day anomaly detected by autoencoder override"
    else:
        final = majority
        note = "Ensemble consensus vote"

    return {
        "final_verdict": LABELS[final],
        "autoencoder_err": float(recon_err),
        "is_anomaly": bool(is_anomaly),
        "note": note
    }
```

---

## 3. Autonomous Threat Elimination Mechanics

When a critical threat or zero-day is confirmed by the consensus engine, the elimination engine executes immediate mitigation:

1. **Firewall Rule Insertion**:
   - **Windows**: Executes `netsh advfirewall firewall add rule name="Hermes_Block_IP" dir=in action=block remoteip=<TARGET_IP>`
   - **Linux**: Executes `iptables -A INPUT -s <TARGET_IP> -j DROP`
2. **Socket Termination**: Uses native socket APIs to sever active TCP half-open or established sessions.
3. **Forensic Logging**: Writes event timestamps, packet vectors, detector votes, and analyst decisions into `traffic_actions.csv` for audit review.

---

## 4. Runtime Artifact Dependencies

The runtime engine depends on pre-trained, validated artifacts saved in the `models/` directory:

| Artifact File | Description | Loaded By |
| :--- | :--- | :--- |
| `models/random_forest.pkl` | 200-tree Random Forest classifier | `inference.py` |
| `models/xgboost.pkl` | Tuned XGBoost gradient booster | `inference.py` |
| `models/cnn_model.h5` | Trained 2D spatial CNN weights | `inference.py` |
| `models/autoencoder.h5` | Trained Deep Bottleneck Autoencoder | `inference.py` |
| `models/ae_threshold.pkl` | Calibrated 95th-percentile error threshold ($0.05$) | `inference.py` |
| `models/scaler.pkl` | Fitted `MinMaxScaler` normalization object | `inference.py` |
| `models/selector.pkl` | Fitted `SelectKBest` 48-feature selector | `inference.py` |
| `users.json` | Salted SHA-256 analyst credentials | `Hermes.py` |
