# Lab Setup

## Environment

- Host: VirtualBox
- Attacker VM: Kali Linux
- Target VM: Metasploitable 2
- Analysis tool: Wireshark

## Network Configuration

1. Opened the settings for both Kali Linux and Metasploitable 2 in VirtualBox.
2. Changed the network adapter mode from NAT to Bridged Adapter.
3. Started both VMs and confirmed they were on the same reachable network.
4. Ran `ifconfig` on both systems to identify their IP addresses.
5. Treated the Metasploitable 2 IP address as `TARGET_IP` for the rest of the lab.

## Validation

After identifying the target IP, I verified that the Metasploitable web service was reachable from Kali. This confirmed that traffic generated from Kali could reach the target and be captured in Wireshark.

## Evidence

![Network setup](screenshots/01-network-setup.png)

![Metasploitable web check](screenshots/01-metasploitable-web-check.png)

## Lab Safety

The traffic was generated only inside the lab environment. DoS simulation commands should never be run against public systems, third-party networks, or any target without explicit authorization.
