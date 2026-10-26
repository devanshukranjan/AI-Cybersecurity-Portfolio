# KAS Global Commerce Inc. — Master Engineering Record & Technical Dossier

> **Author:** Devanshu Kumar Ranjan  
> **Tenure:** September 2025 – Present (Continuous Production Tenure)  
> **Location:** Bilaspur, Himachal Pradesh, India (On-site)  
> **Company:** KAS Global Commerce Inc. • Enterprise E-Commerce Intelligence  
> **Product Suite:** My Seller Central (MSC IQ Assistant & Diagnostic Suite)  
> **Career Trajectory:** AI Research Intern (Sept 2025 – June 2026) ──●── Promoted to AI Engineer (July 2026 – Present)

---

## 📌 Executive Summary & Purpose of this Document
This dossier serves as the **unabridged master source of truth** for all engineering architectures, database optimizations, distributed crawlers, multi-agent systems, and multimodal pipelines built and deployed at KAS Global Commerce Inc. 

While the public web portfolio condenses these systems for quick recruiter scanning, this document preserves every metric, architectural design decision, SQL optimization, and implementation detail for:
1. **Technical System Design & Behavioral Interviews** (STAR format deep dives).
2. **ATS Resume Customization** for specific AI/ML and Data Engineering positions.
3. **Patent, Academic, or Tech Blog Publications**.
4. **Promotion, Review, and Architecture Decision Records (ADRs)**.

---

## 🚀 Key Quantified Impact Cheat Sheet
| Metric | Baseline | Production Result | Method / Key Tech |
|---|---|---|---|
| **Full-Catalog Scraping Latency** | 2–3 Months | **1.5 Weeks (90%+ latency reduction)** | Distributed 2-stage Zyte API crawler @ 1,000 req/min with MongoDB |
| **PostgreSQL RCA Query Latency** | >1 Minute (60s+) | **<7 Seconds (88%+ speedup)** | Parallelized multi-query execution, compound B-tree/GIN indexing, optimized joins |
| **RCA Diagnostic Coverage** | Manual Analyst Audits | **28 Completed Diagnostics across 6 Domains** | MSC IQ LangGraph routing, registry-driven RCA services, typed `rca_report` delivery |
| **Marketplace Scaling** | 2 (Amazon, ONDC) | **9 Global Marketplaces** | Amazon.in, Amazon.com, ONDC, Walmart, Flipkart, eBay, OnBuy modular schema adapters |
| **Taxonomy Vector Search** | Keyword Search | **<50ms Retrieval Latency** (96% Top-1 Accuracy) | OpenAI `text-embedding-3-large` (3,072-dim) + PostgreSQL `pgvector` |
| **Multimodal Vision Analysis** | Zero Automated Insights | **Batch Analysis across 6 Image Types** | Gemini 2.5 Flash Vision + statistical scoring across top 25 category best-sellers |
| **Amazon A+ Content Intelligence** | Manual Review | **Structured Insight JSON Generation** | Module 5 visual hierarchy extraction & cross-marketplace schema extension |

---

## 💼 Full-Time Staff Role: AI Engineer
* **Period:** July 2026 – Present
* **Title:** AI Engineer (Promoted from Pre-Placement Research Intern)
* **Location:** Bilaspur, HP (On-site)
* **Core Mandate:** End-to-end design, research, prototyping, and production deployment of autonomous multi-agent diagnostic systems, high-concurrency analytical engines, and automated multimodal intelligence pipelines.

### 1. Root Cause Analysis (RCA) Engine (Research to Production)
* **Architecture:** MySellerCentral's MSC IQ assistant validates seller access and uses a LangGraph supervisor to route English/Hinglish causal questions to the RCA service through `POST /api/analyze`. The typed `rca_report` result is persisted with the conversation in MongoDB and rendered by `RCAReport.jsx`.
* **Diagnostic Scope:**
  * Completed **28 diagnostic workflows across 6 domains**: Marketing (14), Orders (6), Business (3), Inventory (2), Catalog (2), and Customer (1).
  * Registry-driven dispatch covers advertising efficiency, orders and revenue, business health, supply risk, listing quality, product impact, and retention.
  * Evidence is produced by read-only, pooled, parameterized PostgreSQL queries; foundation models assist with intent, date resolution, and cross-diagnostic arbitration rather than inventing metrics.
  * The v3 investigation path can execute up to three compatible diagnostics in parallel, normalize their outputs, de-duplicate causes, and remove recommendations whose evidence does not survive arbitration.
* **Statistical Thresholding & Safety:**
  * Applied diagnostic-owned metric gates and equal comparison windows; requests shorter than seven days expand to a reliable 14-day current period versus the prior 14 days.
  * Automated negative keyword generation with **traffic-loss safeguards** (checking organic rank and past conversion volume before recommending negative matches).
* **Database Query Performance Engineering:**
  * Reduced complex analytics fetch latency from **>1 minute down to <7 seconds (88%+ reduction)** across millions of advertising records.
  * *Mechanisms:* Parallelization of independent database sub-queries, compound B-tree and GIN indexing on high-cardinality foreign keys (`account_id`, `campaign_id`, `date`, `keyword_id`), and denormalized relational joins.
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-rca-engine`

### 2. Automated Monthly Scraping & Multimodal Text/Image Insights (Production Scheduling)
* **Orchestration:** Fully automated end-to-end catalog intelligence cycle.
* **Autonomous Cron Workflows:**
  * As soon as the two-stage catalog scraper completes its monthly crawl for a given marketplace, the downstream Multimodal Text and Image Insights pipeline triggers automatically via cron workflows.
  * Ingests, processes, and calculates statistical quality scores and Gemini 2.5 Flash Vision insights with zero manual engineer intervention.
* **Maintainability:**
  * Modular architecture where engineering code modifications are strictly isolated to onboarding new marketplace schema adapters.
* **Linked Projects:** 
  * `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-scraper-engine`
  * `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-text-image-insights`

### 3. Cross-Marketplace Expansion (9 Global Platforms)
* **Coverage:** Scaled scraping and multimodal text/image analysis engines across **9 global marketplaces**:
  * Amazon.in (India)
  * Amazon.com (United States)
  * ONDC (Open Network for Digital Commerce)
  * Walmart.com (US)
  * Flipkart (India)
  * eBay (Global)
  * OnBuy (UK/Europe)
  * Additional regional marketplace endpoints
* **Analysis Depth:** Analyzes titles, bullet points, technical specifications, and **6 distinct image types** (Main White-Background, Infographics, Lifestyle, Packaging/Dimensions, Ingredients/Nutrition, Comparison Charts) across the top 25 category best-sellers.
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-text-image-insights`

### 4. Multimodal A+ Content Intelligence & Modular Architecture
* **Vision & NLP Extraction:** Analyzed visual layout patterns, product placement, background settings, color harmony, typography contrast, and headline messaging across competitor Amazon A+ content to generate structured insight JSONs for automated A+ content generation.
* **Modular Coverage:**
  * Built and validated production analysis for **Module 5** (Standard Image & Dark Text Overlay) across top 25 category best-sellers.
  * Formulated an architectural scaling roadmap targeting all **19 Standard Modules** and **21 Premium Amazon A+ Modules**.
* **Database Partitioning Strategy:**
  * Built upon the PostgreSQL infrastructure originally created during the Taxonomy Vector Search pipeline (containing 3,072-dimensional vector embeddings).
  * Progressively extended schema with dedicated `text_insights`, `image_insights`, and `aplus_insights` JSONB columns partitioned by month and year (`run_id`).
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-aplus-engine`

### 5. Engineering Mentorship & Pipeline Governance
* Guided and mentored junior engineering teammates on:
  * Marketplace schema adapter development and normalization.
  * Distributed error recovery telemetry and automatic retry backoffs.
  * Zyte API rate-limit balancing (1,000 req/min) across concurrent worker pools.
  * Health monitoring and alert dispatch for monthly scheduled cron pipelines.

---

## 🎓 Pre-Placement Research Internship: AI Research Intern
* **Period:** September 2025 – June 2026
* **Title:** AI Research Intern
* **Location:** Bilaspur, HP (On-site)
* **Core Mandate:** Foundational data extraction, semantic search infrastructure, and multimodal microservice engineering.

### 1. Distributed Two-Stage Web Scraping Engine
* **Problem:** Legacy scraping took 2–3 months to harvest comprehensive category data, causing stale competitive intelligence.
* **Solution:** Engineered a distributed two-stage harvesting pattern:
  * *Stage 1:* Lightweight browse node traverser extracting top 25 best-seller product identifiers and ASINs across leaf categories.
  * *Stage 2:* Multithreaded Zyte API extraction pool operating at **1,000 requests/minute** with anti-bot fingerprint rotation and exponential backoff.
* **Result:** Reduced full-catalog scraping time from **2–3 months down to 1.5 weeks (90%+ latency reduction)** with indexed document persistence in MongoDB Atlas.
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-scraper-engine`

### 2. Taxonomy ETL & Dense Vector Search
* **Problem:** Different e-commerce marketplaces use divergent taxonomy breadcrumbs for identical products (e.g., "Electronics > Audio > Headphones" vs "Consumer Tech > Portable Sound > Earphones").
* **Solution:** Developed an automated taxonomy normalization pipeline:
  * Generated 3,072-dimensional semantic embeddings using OpenAI `text-embedding-3-large`.
  * Ingested and indexed over 10,000+ category leaf nodes into PostgreSQL using `pgvector` with IVFFLAT and HNSW indexing.
  * Implemented cosine distance retrieval with dynamic distance thresholding.
* **Result:** Achieved **sub-50ms retrieval latency** with 96% top-1 category mapping accuracy across cross-platform listings.
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-vector-taxonomy`

### 3. Common API Endpoints & Chatbot RAG
* **Deliverable:** Architected and deployed 3 core REST microservices:
  * `/api/v1/category-mapper` — Vector similarity lookup and taxonomy breadcrumb resolution.
  * `/api/v1/insights` — Aggregated statistical and multimodal category insights.
  * `/api/v1/product-details` — Enriched product metadata, reviews, and specification extraction.
* **Impact:** Enabled multi-turn conversational category RAG with dynamic chip disambiguation powering the **MSC IQ assistant**.
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-common-api`

### 4. Multimodal Text & Image Insight Pipeline (Amazon & ONDC)
* **Design:** Built foundational category intelligence combining quantitative statistical analysis with Gemini 2.5 Flash inference for Amazon.in, Amazon.com, and ONDC product listings.
* **Extraction:** Extracted sentiment distributions, feature mentions, packaging claims, and image compliance metrics into normalized database tables.
* **Linked Project:** `https://devanshukranjan.github.io/AI-Cybersecurity-Portfolio/#proj-text-image-insights`

---

## 🛠 Complete Tech Stack Reference
* **Agentic AI & LLMs:** LangGraph, Multi-Agent Supervisors, Gemini 2.5 Flash, Gemini Flash Vision, OpenAI `text-embedding-3-large`, RAG Workflows, Structured JSON Outputs.
* **Databases & Vector Storage:** PostgreSQL, `pgvector` (HNSW & IVFFLAT indexing), MongoDB Atlas, Document Validation, Table Partitioning (by `run_id` month/year).
* **Distributed Engineering & Web Scraping:** Zyte API (1,000 req/min), Asyncio/Threading, Anti-Bot Fingerprint Rotation, Scheduled Linux Cron Orchestrators.
* **Backend & API Microservices:** Python 3.11+, FastAPI, Pydantic, RESTful API Design, Docker Containers.
* **Statistical Methods & Analytics:** Anomaly Detection, Moving Averages, Standard Deviation Thresholding, Period-over-Period Normalization.

---

## 💡 STAR Interview Guide (Situational Cheat Sheet)

### Story 1: Optimizing PostgreSQL Query Performance (From >1min to <7s)
* **Situation:** In the RCA engine, when a seller asked for diagnostic root causes across their catalog, backend queries were taking over 60 seconds to join advertising, inventory, and bid data, causing frontend timeouts.
* **Task:** Reduce query response times to under 10 seconds without sacrificing calculation depth or data integrity.
* **Action:** 
  1. Analyzed query execution plans using `EXPLAIN ANALYZE` and identified table scans on non-indexed foreign keys.
  2. Created compound B-tree indexes for `(account_id, campaign_id, date)` and GIN indexes for queryable JSONB insight fields.
  3. Decomposed large monolithic queries into independent asynchronous queries dispatched in parallel using Python `asyncio.gather`.
  4. Restructured relational joins to filter candidate rows before joining high-volume time-series tables.
* **Result:** Slashed query execution latency by **88%+ from >1 minute down to <7 seconds**, eliminating timeouts and enabling real-time conversational RCA.

### Story 2: Slashing Catalog Scraping Time from Months to 1.5 Weeks
* **Situation:** Market intelligence was stale because legacy single-threaded scraping took 2–3 months to cycle through thousands of category leaf nodes.
* **Task:** Re-engineer the scraper to complete full-catalog harvesting in under 2 weeks.
* **Action:**
  1. Split the pipeline into a distributed two-stage model: Stage 1 solely harvested product IDs/ASINs; Stage 2 handled heavy extraction.
  2. Integrated multithreaded Zyte API calls throttled at 1,000 requests/minute with exponential backoff and proxy rotation.
  3. Persisted structured records into indexed MongoDB Atlas collections and configured autonomous cron schedulers to auto-trigger multimodal vision processing upon crawl completion.
* **Result:** Achieved a **90%+ latency reduction (2–3 months down to 1.5 weeks)**, keeping competitive product intelligence continuously up to date.

---
*(End of Master Technical Dossier)*
