# IoT Intrusion Detection System using Genetic Algorithm Feature Selection on Bot-IoT Dataset

Evolved smarter security: this project reduces a 43-feature Bot-IoT intrusion-detection problem to 22 selected features using a custom Genetic Algorithm, then trains an XGBoost classifier that reaches perfect classification on the saved test run.

## Headline Result

- Dataset size: `3,668,522` records
- Traffic classes: `DDoS`, `DoS`, `Reconnaissance`, `Theft`, `Normal`
- Feature reduction: `43 -> 22`
- Test records: `1,100,557`
- Saved notebook result: `1.0000` testing accuracy

## What The Project Does

This project builds a machine-learning IDS for IoT traffic using the Bot-IoT 5% dataset. Instead of training directly on all available features, it implements a custom Genetic Algorithm from scratch to search for a smaller feature subset that is both informative and less redundant.

The GA uses a hybrid fitness function:

`fitness = 0.5 * correlation_merit + 0.5 * gmean`

That matters because the dataset is highly imbalanced. G-Mean rewards balanced detection performance across classes, while correlation merit discourages redundant feature subsets.

## Tech Stack

- Python
- XGBoost
- Custom Genetic Algorithm
- Pandas
- Scikit-learn
- Matplotlib
- NumPy

## Core Metrics

- Raw combined dataset: `3,668,522` rows and `46` columns before target/label cleanup
- Preprocessed IDS dataset: `43` feature columns plus `1` target column
- GA output dataset: `22` selected features plus `1` target column
- GA configuration:
  - population size: `50`
  - max generations: `100`
  - max no improvement: `10`
  - mutation rate: `0.4`
- Saved report note: GA stopped after `21 generations`

## Selected Features

```text
pkSeqID
stime
proto_number
saddr
sport
daddr
dport
pkts
ltime
stddev
min
max
sbytes
rate
drate
TnBPDstIP
AR_P_Proto_P_SrcIP
AR_P_Proto_P_DstIP
N_IN_Conn_P_DstIP
N_IN_Conn_P_SrcIP
AR_P_Proto_P_Sport
AR_P_Proto_P_Dport
```

## Final Evaluation

Saved test-set classification report from the project writeup:

| Class | Precision | Recall | F1-score | Support |
| --- | ---: | ---: | ---: | ---: |
| DDoS | 1.00 | 1.00 | 1.00 | 578,162 |
| DoS | 1.00 | 1.00 | 1.00 | 495,064 |
| Normal | 1.00 | 1.00 | 1.00 | 141 |
| Reconnaissance | 1.00 | 1.00 | 1.00 | 27,166 |
| Theft | 1.00 | 1.00 | 1.00 | 24 |

Overall saved testing accuracy:

`1.00`

## Why This Project Matters

Most student IDS work ends at training a classifier. This project shows higher-signal ML depth because it addresses why feature selection matters in intrusion detection:

- lower dimensionality
- reduced redundancy
- better computational tractability
- more defensible handling of severe class imbalance

The most recruiter-readable story is not only that the classifier performed well, but that the feature space itself was optimized through an evolutionary search process.

## Best Visual Evidence

The two strongest visuals from this project are:

- the GA convergence plot
- the final confusion matrix

Together they show both sides of the project: the optimizer improving over generations and the final classifier making zero visible mistakes on the saved test run.

## Files

- Source writeup: [`original-project-writeup.md`](original-project-writeup.md)
- PDF report: [`project-report.pdf`](project-report.pdf)
- Main notebook: [`notebooks/ids-with-ga-feature-selection-over-bot-iot.ipynb`](notebooks/ids-with-ga-feature-selection-over-bot-iot.ipynb)
- Preprocessing notebook: [`notebooks/pre-processing-bot-iot.ipynb`](notebooks/pre-processing-bot-iot.ipynb)
