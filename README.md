# Unified AI & Cybersecurity Portfolio

> **Production AI Engineer & M.Tech Cyber Security (NIT Patna)**  
> Live Portfolio: [devanshukranjan.github.io/AI-Cybersecurity-Portfolio/](https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/) *(or custom domain)*  
> Interactive Web Application showcasing applied AI engineering, large-scale data systems, and cybersecurity operations.

[![Portfolio Live](https://img.shields.io/badge/Live%20Demo-Available-6fd3ff?style=for-the-badge&logo=google-chrome&logoColor=black)](https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-7ee787?style=for-the-badge)](LICENSE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Devanshu%20Kumar%20Ranjan-8ab4ff?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/devanshu-kumar-ranjan-06399221b)
[![GitHub](https://img.shields.io/badge/GitHub-devanshukranjan-white?style=for-the-badge&logo=github)](https://github.com/devanshukranjan)

---

## 🎯 The Core Differentiator: The AI & Cyber Overlap

Recruiters and hiring managers typically review candidates who are either pure machine learning practitioners (lacking systems security and networking rigor) or cybersecurity analysts (lacking production LLM/agentic and deep learning experience).

This portfolio represents **the convergence of Applied AI Systems Engineering and Cybersecurity**:
1. **Production AI Systems:** Architect of an enterprise Root Cause Analysis (RCA) diagnostic engine; architect of large-scale scraping (1,000 req/min) and category taxonomy vector embeddings (`pgvector`); builder of multimodal insight generation pipelines for e-commerce intelligence.
2. **Privacy-Preserving & Adversarial AI:** M.Tech dissertation on **Locally Differentially Private (LDP)** Federated Sequential Recommendation, proving mathematical and algorithmic rigor in data privacy and secure ML.
3. **Security Operations & Systems Rigor:** Hands-on SOC environment builder (Splunk SIEM, custom SPL, real-time alerting), packet-level network forensics (Wireshark, DoS simulation), and digital forensics (Autopsy, FTK Imager).
4. **Threat Detection ML:** Custom IDS engines built on UNSW-NB15, UGRansome 2024, and Genetic Algorithm (GA) feature selection with XGBoost on Bot-IoT.

---

## 🏗️ Repository Architecture

```text
AI-Cybersecurity-Portfolio/
├── index.html                   # Semantic Single-Page Application (SPA)
├── style.css                    # Cyber-Tech Command Center Design System (Vanilla CSS)
├── script.js                    # Dynamic Spectrum Controller & Architecture Drawer
├── favicon.svg                  # Custom Vector Tech Icon
├── assets/
│   ├── resumes/                 # Official ATS Resumes (AI & Cyber Tracks)
│   │   ├── Devanshu_AI_Resume.pdf
│   │   └── Devanshu_Cybersecurity_Resume.pdf
│   ├── screenshots/             # Live UI Telemetry & System Screenshots
│   └── diagrams/                # System Architecture & Request Flows
└── README.md                    # Project Documentation
```

---

## ⚡ Featured Projects & Systems

### 1. The Intersection (Core Edge)
* **Privacy-Preserving Federated Sequential Recommendation (M.Tech Dissertation):** Formulated **LDP-SeqMask** and a calibrated Laplace perturbation mechanism with **View-based Contrastive Learning (View-CL)** to prevent trajectory leakage in sequential recommendation.
* **Autonomous AI Threat Detection Engine:** Real-time ransomware and zero-day intrusion detection trained on **UGRansome 2024** and **UNSW-NB15** with an interactive monitoring GUI.
* **GA-Optimized Bot-IoT IDS:** Heuristic Genetic Algorithm wrapper eliminating 70%+ redundant network features while sustaining **>99% attack detection recall** with XGBoost.

### 2. Applied AI & Production Systems (KAS Global Commerce &bull; MySellerCentral / MSC IQ)
* **Root Cause Analysis (RCA) Diagnostic Engine:** 7 live diagnostics, 50+ root-cause rules, dynamic statistical thresholding ($\mu + 1.5\sigma$), and automated negative keyword generation.
* **Scaled Taxonomy Vector Search Pipeline:** 100K+ breadcrumb dense embeddings via OpenAI `text-embedding-3-large` (3,072 dims) in PostgreSQL with `pgvector` IVFFLAT indexing.
* **Distributed Two-Stage Web Scraper:** 1,000 req/min via Zyte API with MongoDB persistence, reducing catalog extraction time from 2–3 months to 1.5 weeks.
* **Multimodal Text & Image Insight Pipeline:** Automated category NLP and computer vision pipeline analyzing text attributes (titles, bullets, specs) and 6 visual image types across top 25 category best-sellers.
* **Multimodal A+ Content Intelligence Engine:** Analyzes visual design patterns, product placement, background settings, and headline messaging for Amazon A+ content creation (Module 5 live; 40-module roadmap).
* **Common API Endpoints & MSC IQ Chatbot RAG:** FastAPI microservice powering category disambiguation, product detail extraction, and Category RAG.

### 3. Cybersecurity Operations & Forensics Labs
* **Splunk SIEM Enterprise SOC Lab:** 3-VM virtual SOC environment with Kali Linux attacker (Hydra brute-force, Nikto scans) and Ubuntu target forwarding logs to Splunk Enterprise via Universal Forwarder.
* **DoS Attack Simulation & Packet Forensics:** 6 attack flood vectors on Metasploitable 2 with Wireshark PCAP deep-dive protocol analysis.
* **Digital Forensic Investigation & File Recovery:** FTK Imager evidence acquisition (.dd), hash verification (MD5/SHA1), Autopsy timeline analysis, and hex signature file carving.

---

## 🚀 Running Locally

This portfolio is built purely with **Vanilla HTML, CSS, and JavaScript** with zero build tools or npm dependencies required:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio.git
   cd AI-Cybersecurity-Portfolio
   ```

2. **Open in any modern browser:**
   - Double-click `index.html`, or
   - Start a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000 in your browser
     ```

---

## 📄 License & Attribution

This project is open-source under the [MIT License](LICENSE).  
Copyright &copy; 2026 Devanshu Kumar Ranjan. All rights reserved.
