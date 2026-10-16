# Hermes Dataset Notes

Hermes is built on a combined intrusion-detection dataset rather than a single-source tutorial dataset.

## Dataset Construction

The main training pipeline:

- loads ransomware and zero-day traffic from UGRansome
- loads `unsw_benign_51k.csv`, a benign subset generated from official UNSW-NB15 traffic
- merges them into `combined_dataset.csv`

Observed output from the training notebook:

- combined dataset size: `200,043` rows
- benign UNSW subset size: `51,000` rows

## Why The Merge Matters

This is one of the strongest engineering parts of Hermes. The project does not just train on a pre-cleaned dataset. It has to:

- extract benign traffic from UNSW-NB15
- align it to the ransomware dataset schema
- encode categorical fields
- select runtime features
- preserve artifacts needed for later inference

That makes Hermes closer to a real data-preparation pipeline than a one-click model demo.

## Feature Selection

The runtime application ultimately uses 10 selected features:

`USD, BTC, Protcol, SeddAddress, Flag, IPaddress, Clusters, ExpAddress, Netflow_Bytes, Port`

These are selected through the training workflow and then reused by the GUI and saved models.

## Saved Split

The notebook records:

- `X_train: 140030 x 10`
- `X_test: 60013 x 10`

Those shapes make the saved runtime metrics easier to trust because the evaluation happened on a large held-out test set rather than a tiny demo subset.
