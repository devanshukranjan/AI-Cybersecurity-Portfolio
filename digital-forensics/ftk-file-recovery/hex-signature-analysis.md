# Hex Signature Analysis

## Purpose

The goal of this step was to validate suspected PDF artifacts using hexadecimal signatures instead of relying only on filenames or file extensions.

## PDF Header Search

FTK Imager was used to perform a hexadecimal search for the PDF header:

```text
25 50 44 46
```

This byte sequence corresponds to the beginning of a PDF file. A match indicates that the file or fragment may contain PDF content.

## EOF Marker Validation

After identifying PDF header matches, a second hexadecimal search was performed for the PDF EOF marker:

```text
25 45 4F 46
```

This marker helps confirm whether the suspected PDF has a recognizable file ending.

## Finding

| Artifact | Path | Header Found | EOF Found | Assessment |
| --- | --- | --- | --- | --- |
| `$RF84VMP.pdf` | `/root/$RECYCLEBIN/` | Yes | Yes | Valid PDF |
| `unknown.bin` | `/Unallocated Space/` | Yes | No | Possible fragment |

## Analysis

The file `$RF84VMP.pdf` was the strongest evidence item because both the PDF header and EOF marker were present. In contrast, `unknown.bin` contained the PDF header but did not include the EOF marker, so it should be treated as a possible fragment rather than a complete validated PDF.

