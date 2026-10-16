# Hermes Architecture

Hermes is split into two practical layers: a training pipeline that creates runtime artifacts, and a GUI application that loads those artifacts for analyst-facing detection.

## 1. Training Pipeline

Primary notebook:

- [`notebooks/anomaly-detection.ipynb`](notebooks/anomaly-detection.ipynb)

Flow:

1. Load UGRansome ransomware and zero-day traffic.
2. Load `unsw_benign_51k.csv`, generated from benign rows in UNSW-NB15.
3. Merge both sources into `combined_dataset.csv` with `200,043` rows.
4. Encode categorical columns.
5. Use Random Forest feature importance to reduce the dataset to 10 runtime features.
6. Scale the selected features.
7. Split into train and test sets.
8. Train classical ML models, DL models, and ensemble variants.
9. Save runtime artifacts:
   - trained models in `Model/`
   - saved metrics in `Dataset/model_metrics.pkl`
   - runtime test samples in `Dataset/X_test.npy`

## 2. Runtime Artifacts

Hermes depends on these artifacts at runtime:

- `Dataset/model_metrics.pkl`
- `Dataset/X_test.npy`
- `Model/ann_model.keras`
- `Model/nb_model.pkl`
- `Model/rfc_model.pkl`
- `Model/svm_model.pkl`
- `Model/gbc_model.pkl`
- `Model/xgb_model.pkl`
- `Model/cnn2image_model.keras`
- `users.json`

## 3. GUI Flow

Main entry points:

- [`notebooks/Hermes.ipynb`](notebooks/Hermes.ipynb)
- source script: [`../../Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/Hermes.py`](../../Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/Hermes.py)

Runtime sequence:

1. Load metrics and models.
2. Load test samples.
3. Start Tkinter.
4. Show splash screen.
5. Validate user credentials from SHA-256 hashes in `users.json`.
6. Open the dashboard after login.
7. Support model-specific checks, live monitoring, analyst actions, and export/history features.

## 4. Analyst Workflow

Hermes behaves like a lightweight SOC-facing prototype:

- manual checks let an analyst inspect a specific sample and model
- model cards expose saved accuracy and false-positive rates
- live monitoring runs every 2 seconds
- auto-blocking can record `Block Source` automatically for malicious detections
- analyst actions are recorded in `traffic_actions.csv`
- model statistics and feature-importance views help explain model behavior

## 5. Why The Architecture Matters

The project is stronger than a standard ML notebook because the training and deployment-style layers are connected. Hermes shows how model artifacts become part of a usable security workflow instead of remaining buried inside experimentation code.
