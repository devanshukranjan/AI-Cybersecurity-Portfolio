# SPL Queries

This file documents the SPL searches used in the Splunk SIEM Lab to validate log ingestion, detect attack behavior, configure alerting, and build dashboard panels.

## Validate Log Ingestion

Shows recent events arriving from the forwarded Linux and Apache log sources.

```spl
index=main
| head 50
| table _time, host, source, _raw
```

## Failed SSH Logins by Source IP

Detects SSH brute-force behavior by counting failed password attempts per extracted `src_ip` field.

```spl
index=main source="/var/log/auth.log" "Failed password"
| stats count by src_ip
| sort -count
```

## SSH Brute-Force Alert Threshold

Filters to source IPs with more than five failed SSH login attempts. This query was used to validate the `SSH Brute Force Detected` alert.

```spl
index=main source="/var/log/auth.log" "Failed password"
| stats count by src_ip
| where count > 5
| sort -count
```

## Failed SSH Logins Over Time

Dashboard query for tracking brute-force activity as a time-series trend.

```spl
index=main source="/var/log/auth.log" "Failed password"
| timechart count span=1m
```

## Top Attacking IPs from Apache Logs

Ranks client IPs by request count to identify high-volume web scanning or probing activity.

```spl
index=main source="/var/log/apache2/access.log"
| stats count by clientip
| sort -count
| head 10
```

## 404 Error Spikes by Client IP

Detects directory scanning behavior by charting repeated `404` responses by client IP.

```spl
index=main source="/var/log/apache2/access.log" status=404
| timechart count by clientip
```

## 404 Error Spikes Dashboard Panel

Dashboard panel query for 404 spikes over one-minute intervals.

```spl
index=main source="/var/log/apache2/access.log" status=404
| timechart count span=1m
```

## Real-Time Event Feed

Provides a compact live feed of forwarded events for analyst review.

```spl
index=main
| head 50
| table _time, host, source, _raw
```

## Source IP Field Extraction Search

Initial search used before creating the `src_ip` field extraction in Splunk Field Extractor.

```spl
index=main source="/var/log/auth.log" "Failed password"
```
