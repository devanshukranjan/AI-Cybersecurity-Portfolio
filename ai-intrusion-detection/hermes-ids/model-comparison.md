# Hermes Model Comparison

Hermes saves model accuracy and false-positive metrics to `Dataset/model_metrics.pkl` and exposes them in the GUI.

## Saved Runtime Metrics

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

## What This Shows

- `RandomForestClassifier` is the strongest single saved model.
- `ML_EnsembleNet` reaches nearly the same top-line result.
- `Tab2Image_CNN` is not just a novelty experiment; it still posts `0.969` accuracy.
- `NaiveBayes` is included as a lower-performing baseline, which makes the comparison set more honest.

## Best Portfolio Talking Point

The clearest result to lead with is:

`98.6% accuracy with a 1.4% false-positive rate on 60,013 test samples`

That is the most recruiter-readable summary of the Hermes model evidence.
