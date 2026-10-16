# Wireshark Analysis

This file documents what each DoS simulation looked like in Wireshark and what detection indicators a SOC analyst could use during packet review.

## Slowloris

Wireshark showed HTTP traffic designed to keep web server connections open for longer than normal. The defensive indicator is repeated partial HTTP behavior where connections remain active instead of completing cleanly.

Evidence:

![Slowloris Nmap script](screenshots/02-slowloris-nmap.png)

![Slowloris Perl run](screenshots/03-slowloris-github-run.png)

## TCP SYN Flood

Wireshark showed a spike of TCP SYN packets sent toward the target service without normal handshake completion. This pattern is useful for identifying half-open connection pressure against a service.

Detection indicators:

- High volume of TCP packets with the SYN flag set.
- Missing or incomplete three-way handshakes.
- Repeated connection attempts against the same destination service.

Evidence:

![SYN flood Wireshark capture](screenshots/04-syn-flood-wireshark.png)

## UDP Flood

Wireshark showed UDP packets sent toward the target, followed by ICMP Destination Unreachable responses when the target had no application listening on the destination port.

Detection indicators:

- High-volume UDP traffic toward one host.
- Random or repeated destination ports.
- ICMP Destination Unreachable responses following the UDP traffic.

Evidence:

![UDP flood Wireshark capture](screenshots/05-udp-flood-wireshark.png)

## TCP FIN Flood

Wireshark showed repeated TCP traffic with the FIN flag set. In a normal connection, FIN is used to close a session, but a flood of FIN packets can indicate abnormal connection termination activity.

Detection indicators:

- Large number of TCP FIN packets.
- FIN packets that do not match expected session behavior.
- Repeated packets from changing or unexpected sources.

Evidence:

![FIN flood Wireshark capture](screenshots/06-fin-flood-wireshark.png)

## TCP PUSH+ACK Flood

Wireshark showed repeated TCP packets using PUSH and ACK behavior. These packets can pressure the target because pushed data is intended to be processed quickly by the receiving application.

Detection indicators:

- High volume of TCP packets with PSH and ACK behavior.
- Repeated packets against the same destination port.
- Traffic volume that does not match normal application use.

Evidence:

![PUSH+ACK flood Wireshark capture](screenshots/07-push-ack-wireshark.png)

## ICMP Flood

Wireshark showed sustained ICMP Echo Request traffic toward the target. This can consume bandwidth and host processing resources when the packet rate is high.

Detection indicators:

- High volume of ICMP Echo Request packets.
- Repeated request traffic toward the same destination.
- Unusual ICMP rate compared with normal network baseline.

Evidence:

![ICMP flood Wireshark capture](screenshots/08-icmp-flood-wireshark.png)

## Analyst Takeaway

Each DoS type has a different packet-level signature. By comparing terminal evidence with Wireshark captures, this project shows how a SOC analyst can move from raw traffic to a defensible detection note.
