# Tab2Image Approach

Hermes includes a `Tab2Image_CNN` model that converts a tabular network-traffic sample into an image before classification.

## Implementation

In `Hermes.py`, the helper function is:

```python
def single_tabular_to_image(sample, img_size=(64, 64)):
    total_pixels = img_size[0] * img_size[1]
    padded = np.zeros(total_pixels)
    padded[:sample.shape[0]] = sample
    image = padded.reshape(img_size[0], img_size[1], 1)
    return np.expand_dims(image, axis=0)
```

This takes a 10-feature tabular sample, pads it into a `64 x 64` array, adds a single grayscale channel, and then feeds it to the CNN.

## Why It Matters

Most student IDS projects stay entirely in the tabular-classifier lane. Hermes adds a different modeling path by treating the intrusion-detection sample as an image-shaped representation and comparing that CNN against the classical models.

That makes the project more technically interesting for reviewers because it shows:

- experimentation beyond standard classifiers
- a willingness to test alternative feature representations
- practical comparison between classical ML and DL approaches

## Result

The saved `Tab2Image_CNN` runtime metric is:

- accuracy: `0.969`
- false-positive rate: `0.031`

That is strong enough to present as a serious experiment, even though the Random Forest and ML ensemble remain the better headline results.
