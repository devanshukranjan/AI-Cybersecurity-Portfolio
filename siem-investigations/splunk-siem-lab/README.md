# Splunk SIEM Lab - Real Attack Detection

## Objective

Build a functional SIEM environment using Splunk Enterprise, Splunk Universal Forwarder, an Ubuntu Apache web server, and a Kali Linux attacker VM. The lab simulates SSH brute-force activity and web directory scanning, forwards logs into Splunk, and uses SPL searches, alerts, and dashboards to detect suspicious behavior.

## Tools Used

| Tool | Purpose |
| --- | --- |
| Splunk Enterprise | Central SIEM, log indexing, SPL search, alerts, and dashboards |
| Splunk Universal Forwarder | Forwarded `/var/log/auth.log` and Apache logs from the web server |
| Ubuntu Server | Hosted the Splunk server and target Apache web server VMs |
| Kali Linux | Generated attack traffic using Hydra and Nikto |
| Apache2 | Produced access logs and 404 responses for web scan detection |
| VMware Workstation | Hosted the isolated multi-VM lab environment |

## Lab Architecture

| VM | Operating System | Role | Example IP |
| --- | --- | --- | --- |
| Splunk-Server | Ubuntu Server 22.04 | SIEM / log collector | `192.168.40.131` |
| Web-Server | Ubuntu Server 22.04 | Apache target + Universal Forwarder | `192.168.40.x` |
| Kali-Attacker | Kali Linux | Attack simulation machine | `192.168.40.134` |

## Attack Simulated

- SSH brute-force attack against the web server using Hydra.
- Web directory scanning against Apache using Nikto.
- Failed SSH login monitoring from `/var/log/auth.log`.
- Apache access log analysis for high-volume requests, 404 spikes, and attacking IPs.

## Key Findings

- Splunk successfully received forwarded Linux authentication and Apache logs from the target web server.
- Failed SSH login events were grouped by extracted source IP to identify brute-force behavior.
- The attacker IP `192.168.40.134` generated 620 failed SSH login attempts during the lab.
- Apache 404 responses showed directory-scanning behavior from web reconnaissance tooling.
- A real-time Splunk alert triggered when failed SSH login attempts exceeded the configured threshold.
- A security monitoring dashboard was created to visualize failed logins, top attacker IPs, and 404 spikes.

## Skills Demonstrated

- SIEM deployment and log source onboarding
- Splunk Universal Forwarder configuration
- Linux authentication and Apache log analysis
- SPL search development
- Brute-force and web scan detection
- Field extraction for source IP enrichment
- Alert configuration and validation
- Dashboard design for SOC-style monitoring
- Evidence documentation for a cybersecurity portfolio

## Project Files

- [Full lab writeup PDF](lab-writeup/Splunk_SIEM_Lab_Writeup.pdf)
- [SPL query reference](spl-queries/queries.md)
- [Universal Forwarder inputs.conf](configs/inputs.conf)
- [Universal Forwarder outputs.conf](configs/outputs.conf)

## Screenshots

### Setup

| Evidence | Screenshot |
| --- | --- |
| Splunk Web UI login | [01_splunk_web_ui_login.png](screenshots/setup/01_splunk_web_ui_login.png) |
| Receiving port 9997 configured | [02_splunk_receiving_port_9997.png](screenshots/setup/02_splunk_receiving_port_9997.png) |
| Universal Forwarder running | [03_universal_forwarder_running.png](screenshots/setup/03_universal_forwarder_running.png) |
| Logs appearing in Splunk | [04_logs_appearing_in_splunk.png](screenshots/setup/04_logs_appearing_in_splunk.png) |

### Attacks

| Evidence | Screenshot |
| --- | --- |
| Hydra brute-force execution | [05_hydra_brute_force_running.png](screenshots/attacks/05_hydra_brute_force_running.png) |
| Nikto web scan execution | [06_nikto_web_scan_running.png](screenshots/attacks/06_nikto_web_scan_running.png) |

### Detection

| Evidence | Screenshot |
| --- | --- |
| Failed SSH logins query | [07_failed_ssh_logins_query.png](screenshots/detection/07_failed_ssh_logins_query.png) |
| Top attacker IPs | [08_top_attacker_ips.png](screenshots/detection/08_top_attacker_ips.png) |
| 404 error spikes | [09_404_error_spikes.png](screenshots/detection/09_404_error_spikes.png) |
| Live event feed | [10_live_event_feed.png](screenshots/detection/10_live_event_feed.png) |

### Alerts

| Evidence | Screenshot |
| --- | --- |
| Alert configuration | [11_alert_configuration.png](screenshots/alerts/11_alert_configuration.png) |
| Triggered alert | [12_alert_triggered.png](screenshots/alerts/12_alert_triggered.png) |

### Dashboard

| Evidence | Screenshot |
| --- | --- |
| Failed logins over time | [13_panel1_failed_logins_over_time.png](screenshots/dashboard/13_panel1_failed_logins_over_time.png) |
| Top attacker IPs panel | [14_panel2_top_attacker_ips.png](screenshots/dashboard/14_panel2_top_attacker_ips.png) |
| 404 spikes panel | [15_panel3_404_spikes.png](screenshots/dashboard/15_panel3_404_spikes.png) |
| Complete dashboard | [16_complete_dashboard.png](screenshots/dashboard/16_complete_dashboard.png) |
