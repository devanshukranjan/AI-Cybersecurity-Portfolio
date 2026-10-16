# Deleted Files Recovered

## Recovery Focus

FTK Imager was used to identify deleted or recoverable files from the disk image. Particular attention was given to artifacts in recycle bin paths and unallocated space.

## Recovered Evidence

| File Name | Location | Recovery Status | Notes |
| --- | --- | --- | --- |
| `$RF84VMP.pdf` | `/root/$RECYCLEBIN/` | Recovered and validated | PDF header and EOF marker were both present |
| `unknown.bin` | `/Unallocated Space/` | Partial evidence | PDF header was found, but EOF marker was not found |

## Interpretation

The recycle bin artifact `$RF84VMP.pdf` should be treated as the strongest recovered file because its file structure was validated through both the PDF signature and EOF marker. The unallocated space artifact should be handled more cautiously because it may represent a carved fragment rather than a complete file.

