# AI & Intrusion Detection

This category collects projects that combine machine learning with practical intrusion-detection workflow.

## Projects

### [Hermes — AI-Powered Ransomware & Zero-Day Intrusion Detection System](hermes-ids/README.md)

Hermes is the headline project in this category. It combines:

- a 200,043-row merged dataset built from UGRansome and 51,000 benign UNSW-NB15 samples
- multiple trained ML and DL models evaluated on 60,013 test samples
- a Tab2Image CNN experiment that converts 10 tabular features into a `64 x 64` grayscale image
- a Tkinter dashboard with SHA-256 login, live monitoring, AI auto-blocking, analyst actions, and model statistics

Related documents:

- [Project writeup](hermes-ids/README.md)
- [Architecture](hermes-ids/architecture.md)
- [Model comparison](hermes-ids/model-comparison.md)
- [Dataset notes](hermes-ids/dataset-notes.md)
- [Tab2Image approach](hermes-ids/tab2image-approach.md)

### [IoT Intrusion Detection System using Genetic Algorithm Feature Selection on Bot-IoT Dataset](bot-iot-ga-ids/README.md)

This project focuses on IoT intrusion detection through evolutionary feature selection. It combines:

- a `3,668,522`-record Bot-IoT dataset across 5 traffic classes
- a custom Genetic Algorithm wrapper over a `43`-feature search space
- feature reduction from `43` to `22` selected features
- an XGBoost classifier with a saved `1.0000` testing accuracy on `1,100,557` test records

Related documents:

- [Project writeup](bot-iot-ga-ids/README.md)
- [Source writeup](bot-iot-ga-ids/original-project-writeup.md)
- [PDF report](bot-iot-ga-ids/project-report.pdf)
- [Main notebook](bot-iot-ga-ids/notebooks/ids-with-ga-feature-selection-over-bot-iot.ipynb)
