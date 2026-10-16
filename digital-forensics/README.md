# Digital Forensics & Incident Response

## Category Overview

Digital Forensics & Incident Response (DFIR) focuses on collecting, preserving, analyzing, and reporting evidence from systems after suspicious activity, data loss, or a security incident. The goal is to reconstruct what happened, identify relevant artifacts, preserve evidence integrity, and communicate findings clearly enough for technical review.

## Approach

My DFIR lab work follows a repeatable investigation flow:

1. Define the case scope, examiner details, and evidence source.
2. Add the disk image or evidence source to a forensic tool.
3. Review the file system, recovered files, metadata, timestamps, and search hits.
4. Validate suspicious artifacts using forensic indicators such as file signatures and end-of-file markers.
5. Build a chronological view of activity using timeline analysis.
6. Document findings, limitations, and exported reports.

## Projects

| Project | Tool | Focus |
| --- | --- | --- |
| [Disk Image Forensic Investigation using Autopsy](autopsy-disk-investigation/README.md) | Autopsy | File analysis, keyword search, timeline reconstruction, report generation |
| [File Recovery & Evidence Analysis using FTK Imager](ftk-file-recovery/README.md) | FTK Imager | Deleted file recovery, hexadecimal signature analysis, evidence reporting |

## Skills Demonstrated

- Disk image intake and evidence review
- File system analysis and deleted file recovery
- Keyword searching and artifact triage
- Timeline analysis for chronological activity reconstruction
- Hex signature validation using file headers and EOF markers
- Forensic reporting and documentation

