# Hermes — AI-Powered Ransomware & Zero-Day Intrusion Detection System

Hermes is an AI-powered intrusion detection system built around ransomware, zero-day, and benign traffic classification. The project combines dataset engineering, multi-model evaluation, a Tab2Image CNN experiment, and a GUI workflow that behaves like an analyst-facing security tool instead of a notebook-only demo.

Source code location in this repository:

- [`Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main`](../../Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/Autonomous-AI-Based-Threat-Detection-and-Threat-Elimination-Engine-main/README.md)

Copied portfolio notebooks:

- [`notebooks/anomaly-detection.ipynb`](notebooks/anomaly-detection.ipynb)
- [`notebooks/Hermes.ipynb`](notebooks/Hermes.ipynb)
- [`notebooks/cnn-image.ipynb`](notebooks/cnn-image.ipynb)
- [`notebooks/essemble.ipynb`](notebooks/essemble.ipynb)
- [`notebooks/benign_data_code.ipynb`](notebooks/benign_data_code.ipynb)

## Key Result

The strongest saved runtime result in Hermes is the `RandomForestClassifier`, with the `ML_EnsembleNet` reaching a nearly identical score.

| Model | Accuracy | False-positive rate |
| --- | ---: | ---: |
| ANN | 0.968 | 0.032 |
| NaiveBayes | 0.741 | 0.259 |
| RandomForestClassifier | 0.986 | 0.014 |
| SVMClassifer | 0.945 | 0.055 |
| GradientBoostingClassifier | 0.981 | 0.019 |
| XGBoostClassifier | 0.983 | 0.017 |
| Tab2Image_CNN | 0.969 | 0.031 |
| CNN-MLEnsembleNet | 0.983 | 0.017 |
| ML_EnsembleNet | 0.986 | 0.014 |

That means Hermes reached about 98.6% accuracy with about a 1.4% false-positive rate on 60,013 test samples, which is strong portfolio evidence for a student-built IDS.

## Why This Project Stands Out

### 1. Model comparison, not single-model reporting

Hermes does not stop at training one classifier. It benchmarks ANN, Naive Bayes, Random Forest, SVM, Gradient Boosting, XGBoost, a Tab2Image CNN, and two ensemble variants, then exposes those saved metrics inside the GUI.

### 2. Tab2Image CNN experiment

Hermes uses a custom `single_tabular_to_image()` approach that pads a 10-feature network-traffic sample into a `64 x 64 x 1` grayscale image before sending it through a CNN. That is unusual in entry-level security portfolios because it treats tabular intrusion-detection data as an image-based deep-learning problem rather than relying only on standard classifiers.

### 3. Real dataset engineering

The training pipeline combines UGRansome ransomware and zero-day traffic with `51,000` benign samples extracted from UNSW-NB15, producing a merged dataset of `200,043` rows. That is actual data-preparation work: extraction, schema alignment, feature selection, scaling, train-test splitting, and artifact generation.

### 4. Analyst-facing runtime workflow

Hermes includes:

- SHA-256-backed login from `users.json`
- model cards showing accuracy and false-positive rates
- manual sample checks
- live monitoring every 2 seconds
- AI auto-blocking for ransomware and zero-day detections
- analyst actions logged to `traffic_actions.csv`
- model statistics and feature-importance views

That makes Hermes closer to a prototype analyst console than a notebook screenshot.

## Dataset and Split

- Combined dataset rows: `200,043`
- Benign UNSW subset: `51,000`
- Selected features: `10`
- Train split: `140,030 x 10`
- Test split: `60,013 x 10`

The selected features used by the GUI are:

`USD, BTC, Protcol, SeddAddress, Flag, IPaddress, Clusters, ExpAddress, Netflow_Bytes, Port`

## Runtime Flow

1. Load saved metrics from `Dataset/model_metrics.pkl`
2. Load trained models from `Model/`
3. Load runtime test samples from `Dataset/X_test.npy`
4. Start the Tkinter GUI and login flow
5. Let the analyst run detections manually or through live monitoring
6. Record analyst actions and optional auto-block decisions to local logs

## Supporting Notes

- [Screenshots folder](screenshots/README.md)
- [Architecture](architecture.md)
- [Model comparison](model-comparison.md)
- [Dataset notes](dataset-notes.md)
- [Tab2Image approach](tab2image-approach.md)

## Screenshots

- [01-login-screen.png](screenshots/01-login-screen.png)
- [02-main-dashboard.png](screenshots/02-main-dashboard.png)
- [03-model-cards.png](screenshots/03-model-cards.png)
- [04-live-monitoring.png](screenshots/04-live-monitoring.png)
- [05-detection-alert.png](screenshots/05-detection-alert.png)
- [06-analyst-action-panel.png](screenshots/06-analyst-action-panel.png)
- [07-model-statistics.png](screenshots/07-model-statistics.png)
- [08-feature-importance.png](screenshots/08-feature-importance.png)
- [09-export-log.png](screenshots/09-export-log.png)
