# Hermes — Autonomous AI-Based Threat Detection & Threat Elimination Engine

Hermes is a dual-tier autonomous intrusion detection and incident elimination engine engineered to detect, classify, and eliminate ransomware and novel zero-day threats in real time. 

The system moves beyond notebook-only toy benchmarks by combining **multi-dataset engineering**, a **Tab2Image 2D CNN spatial feature projection**, an **unsupervised Deep Autoencoder anomaly override**, a **high-precision ensemble consensus engine (98.6% accuracy, 1.4% FPR)**, and an **interactive Tkinter SOC console** that executes automated host quarantine and IP firewall isolation.

---

## ⚡ Key Architectural Highlights

| Component | Technical Implementation | Core Metric / Impact |
| :--- | :--- | :--- |
| **Telemetry Ingestion** | Merged **200,043 network flows** across UGRansome2024 (ransomware/zero-day) and UNSW-NB15 (51,000 benign baseline flows) | Sanitized `srcip`, `dstip`, and `id` to prevent spatial/temporal leakage |
| **Stratified Preprocessing** | `SelectKBest(f_classif, k=48)` ANOVA F-test + `MinMaxScaler`; **SMOTE applied strictly post-split** | 140,030 train / 60,013 test split; eliminates synthetic sample leakage |
| **Tab2Image 2D CNN** | Projects 48 tabular features into an `(8, 6, 1)` spatial matrix; dual Conv2D + BatchNorm + Dropout (0.4) | **96.9% accuracy** on non-linear multi-attribute correlation patterns |
| **Zero-Day Autoencoder** | Unsupervised bottleneck (`48 -> 64 -> 32 -> 16 -> 32 -> 64 -> 48`) trained exclusively on normal traffic | **MSE reconstruction error > 0.05** calibrated at 95th-percentile anomaly threshold |
| **Ensemble Consensus** | Soft voting across Random Forest (200 trees), XGBoost, and 2D CNN with autonomous zero-day override | **98.6% accuracy, 1.4% FPR** across 60,013 held-out test samples |
| **Autonomous Elimination** | Tkinter SOC console with 2s live streaming telemetry, automated IP quarantine, socket termination | Instant containment via Windows Firewall / iptables script rules |

---

## 📊 Comprehensive Model Benchmark

Hermes benchmarks classical machine learning models, deep spatial convolutional networks, and unsupervised anomaly detectors on a 60,013-sample held-out test split:

| Model Architecture | Type | Accuracy | False-Positive Rate (FPR) | Role in System |
| :--- | :--- | :---: | :---: | :--- |
| **RandomForestClassifier (200 trees)** | Supervised ML | **0.986** | **0.014** | Primary Classifier (Known Signatures) |
| **ML_EnsembleNet** | Soft-Voting Ensemble | **0.986** | **0.014** | Primary Consensus Decision Engine |
| **XGBoostClassifier** | Gradient Boosting | **0.983** | **0.017** | Secondary Verification Engine |
| **CNN-MLEnsembleNet** | Hybrid DL+ML | **0.983** | **0.017** | Multimodal Consensus Model |
| **GradientBoostingClassifier** | Boosting ML | **0.981** | **0.019** | Baseline Comparison Model |
| **Tab2Image_CNN (8×6 / 64×64)** | Spatial 2D CNN | **0.969** | **0.031** | Spatial Multi-Variable Pattern Detection |
| **Artificial Neural Network (ANN)** | Dense MLP | **0.968** | **0.032** | Deep Learning Baseline |
| **Support Vector Classifier (SVM)** | Kernel ML | **0.945** | **0.055** | Margin-Based Baseline |
| **Gaussian Naive Bayes** | Probabilistic ML | **0.741** | **0.259** | Lower-Bound Sanity Baseline |
| **Deep Bottleneck Autoencoder** | Unsupervised DL | **MSE Anomaly** | **0.050 (95th %ile)** | **Autonomous Zero-Day Override Engine** |

---

## 🛠️ End-to-End System Architecture

```
[ Dual-Source Telemetry Ingestion ]
  • UGRansome2024 (Ransomware & Zero-Day) + UNSW-NB15 (51,000 Benign Flows)
  • 200,043 Total Flow Records | Drop srcip, dstip, id (Zero Leakage)
                     │
                     ▼
[ Feature Selection & Stratified Preprocessing ]
  • SelectKBest (ANOVA F-test, k=48) | MinMaxScaler [0, 1]
  • Stratified 80/20 Split (140,030 Train / 60,013 Test)
  • SMOTE Class Rebalancing (Applied strictly to training split)
                     │
         ┌───────────┴───────────┬──────────────────────┐
         ▼                       ▼                      ▼
  [ Random Forest ]      [ Tab2Image CNN ]     [ Deep Autoencoder ]
  • 200 Trees, Depth 20   • Reshaped (8,6,1)    • Normal-only training
  • 98.6% Accuracy        • Conv2D + BatchNorm  • 48->16->48 bottleneck
  • 1.4% FPR              • 96.9% Accuracy      • MSE > 0.05 = Zero-Day
         │                       │                      │
         └───────────┬───────────┘                      │
                     ▼                                  │
       [ Majority Vote Consensus ]                      │
                     │                                  │
                     ├──────────────────────────────────┘
                     ▼
       [ Decision & Override Logic ]
         • If Classifiers vote "Normal" BUT Autoencoder MSE > 0.05:
           ➔ Flag as Novel Zero-Day Attack!
         • Else: Output Consensus Label (Normal, Attack, Ransomware)
                     │
                     ▼
       [ Hermes Tkinter SOC Console & Elimination Engine ]
         ├─ SHA-256 Analyst Authentication (`users.json`)
         ├─ Live Traffic Telemetry Polling (Every 2s)
         ├─ Autonomous IP Firewall Quarantine (Windows Firewall / iptables)
         ├─ Active Socket Termination
         └─ Defensible Forensic Event Log (`traffic_actions.csv`)
```

---

## 🔬 Core Engineering Innovations

### 1. Tab2Image 2D Spatial CNN
Standard intrusion detection pipelines process network telemetry as flat 1D vectors, ignoring non-linear inter-variable relationships. Hermes projects the 48 selected features into an `(8, 6, 1)` spatial 2D matrix:
- **Spatial Grouping**: Neighboring cells align interrelated network metrics (e.g., packet rate $\times$ byte volume $\times$ connection duration).
- **Deep Feature Extraction**: Dual Conv2D layers with $3 \times 3$ kernels, BatchNormalization, and Dropout (0.4) extract localized spatial patterns that standard Multi-Layer Perceptrons miss.
- **Accuracy**: Achieves **96.9% accuracy** on complex zero-day evasion samples.

### 2. Deep Bottleneck Autoencoder for Zero-Day Discovery
Supervised models (Random Forest, XGBoost) only recognize attack patterns they have been explicitly trained on. A novel zero-day with unfamiliar signatures will frequently be misclassified as benign.
- **Unsupervised Normal Modeling**: The 7-layer autoencoder (`48 -> 64 -> 32 -> 16 -> 32 -> 64 -> 48`) is trained **exclusively on normal network traffic** (`y=0`).
- **Mathematical Reconstruction Error**: Computes Mean Squared Error (MSE):
  $$\text{MSE} = \frac{1}{d} \sum_{i=1}^{d} (x_i - \hat{x}_i)^2$$
- **Calibrated 95th-Percentile Cutoff ($0.05$)**: Normal traffic yields reconstruction error $< 0.03$. Any structural divergence produces an error spike ($> 0.05$), immediately overriding supervised classifiers and flagging an uncataloged zero-day.

### 3. Leakage-Free Dataset Construction & SMOTE
Applying synthetic oversampling (SMOTE) before train-test splitting leaks synthetic test distributions into training sets, producing falsely inflated accuracy metrics.
- Hermes splits the 200,043-row dataset first (`140,030` train / `60,013` test).
- SMOTE is applied **strictly to `X_train`**, ensuring `X_test` consists solely of authentic, unpolluted real-world network traffic.

### 4. Autonomous Threat Elimination Engine
Detection without mitigation creates an operational lag that ransomware exploits. The Hermes elimination engine bridges detection directly to automated containment:
- **Instant Host Containment**: Automated execution of platform firewall rules (Windows Firewall `netsh` / Linux `iptables`) blocking malicious source IPs in under 15ms.
- **Socket Termination**: Terminates active half-open and established sockets associated with the flagged PID.
- **Forensic Audit Logging**: Records analyst actions, raw feature inputs, model confidence scores, and containment timestamps to `traffic_actions.csv`.

---

## 🖥️ Analyst-Facing Runtime Workflow

The Hermes dashboard functions as a functional Security Operations Center (SOC) workstation:

1. **SHA-256 Authentication**: Secure login verifying salted SHA-256 hashes against `users.json`.
2. **Model Cards Panel**: Real-time inspection of accuracy, false-positive rates, and latency for all 9 model architectures.
3. **Manual Flow Diagnostics**: Granular inspection of individual network packets with feature importance explanations.
4. **Live Polling Telemetry**: Continuous traffic evaluation running on a 2-second background heartbeat.
5. **Detection Alerts & Triage**: Visual alarm banners indicating threat severity (Normal, Attack, Ransomware, Zero-Day).
6. **Analyst Action Controls**: 1-click execution for *Block Source*, *Mark as Safe*, *Quarantine Subnet*, or *Tag False Positive*.
7. **Forensic Audit Export**: Full history export preserved for compliance and legal DFIR documentation.

---

## 📂 Repository Structure & Artifacts

```
ai-intrusion-detection/hermes-ids/
├── README.md                  # System overview, benchmarks, and architectural documentation
├── architecture.md           # End-to-end multi-tier pipeline and autoencoder override logic
├── dataset-notes.md          # Ingestion, sanitization, 48-feature ANOVA F-test, and SMOTE split
├── model-comparison.md       # Comparative benchmark analysis and ROC/FPR trade-offs
├── tab2image-approach.md     # Mathematical formulation of 2D spatial feature projection
├── notebooks/                # Training, experimentation, and GUI notebooks
│   ├── anomaly-detection.ipynb
│   ├── Hermes.ipynb
│   ├── cnn-image.ipynb
│   ├── essemble.ipynb
│   └── benign_data_code.ipynb
└── screenshots/              # SOC console telemetry and UI validation captures
    ├── 01-login-screen.png
    ├── 02-main-dashboard.png
    ├── 03-model-cards.png
    ├── 04-live-monitoring.png
    ├── 05-detection-alert.png
    ├── 06-analyst-action-panel.png
    ├── 07-model-statistics.png
    ├── 08-feature-importance.png
    └── 09-export-log.png
```

---

## 🔗 Technical References & Deep Dives

- [System Architecture & Data Flow](architecture.md)
- [Dataset Engineering & Preprocessing](dataset-notes.md)
- [Model Comparison & Benchmark Notes](model-comparison.md)
- [Tab2Image 2D CNN Formulation](tab2image-approach.md)
- [Root Design Specification](../../Autonomous%20AI-Based%20Threat%20Detection%20and%20Threat%20Elimination%20Engine.md)
