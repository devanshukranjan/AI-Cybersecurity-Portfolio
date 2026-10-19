/**
 * DEVANSHU KUMAR RANJAN — UNIFIED PORTFOLIO JAVASCRIPT
 * Handles tri-mode spectrum switching, comprehensive project case-study deep dives,
 * evidence galleries with zoom lightbox, and interactive navigation telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModeSwitcher();
  initProjectCaseStudySystem();
  initImageLightboxModal();
  initCopyButtons();
  initExperienceProjectJump();
});

/* ==========================================================================
   1. NAVBAR & DROPDOWNS
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const dropdownToggle = document.getElementById('resumeDropdownToggle');
  const dropdown = document.querySelector('.dropdown');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Resume dropdown toggler
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#0d131b';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid rgba(111, 211, 255, 0.2)';
      }
    });
  }
}

/* ==========================================================================
   2. TRI-MODE SPECTRUM CONTROLLER (FILTERING)
   ========================================================================== */
function initModeSwitcher() {
  const modeTabs = document.querySelectorAll('.mode-tab');
  const projectCards = document.querySelectorAll('.project-card');
  const modeIndicator = document.getElementById('currentModeLabel');
  const visibleCountEl = document.getElementById('visibleProjectCount');

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedMode = tab.getAttribute('data-mode');

      // Update active tab styling
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update label
      if (modeIndicator) {
        if (selectedMode === 'all') modeIndicator.textContent = 'Unified Spectrum (AI + Security + Overlap)';
        if (selectedMode === 'ai') modeIndicator.textContent = 'AI Engineering & Production LLMs Focus';
        if (selectedMode === 'security') modeIndicator.textContent = 'Cybersecurity, Threat Detection & SOC Operations Focus';
      }

      // Filter project cards
      let visibleCount = 0;
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category'); // 'overlap', 'ai', 'security'

        if (selectedMode === 'all') {
          card.style.display = 'flex';
          visibleCount++;
        } else if (selectedMode === 'ai') {
          if (cardCategory === 'ai' || cardCategory === 'overlap') {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        } else if (selectedMode === 'security') {
          if (cardCategory === 'security' || cardCategory === 'overlap') {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        }
      });

      if (visibleCountEl) {
        visibleCountEl.textContent = visibleCount;
      }
    });
  });
}

/* ==========================================================================
   3. COMPREHENSIVE PROJECT CASE STUDIES DATA STORE (12 PROJECTS)
   ========================================================================== */
const PROJECT_CASE_STUDIES = {
  'mtech-dissertation': {
    title: 'Privacy-Preserving Federated Sequential Recommendation',
    category: 'M.Tech Research Thesis',
    categoryBadgeClass: 'badge-overlap',
    provenance: 'NIT Patna • Master\'s Thesis (CGPA: 8.84/10)',
    provenanceBadgeClass: 'badge-research',
    summary: 'Master\'s thesis research at NIT Patna resolving user trajectory and clickstream leakage in centralized recommender systems using Locally Differentially Private (LDP) mechanisms.',
    meta: ['NIT Patna Thesis', 'Local Differential Privacy', 'View-based Contrastive Learning'],
    architecture: `
┌─────────────────────────────────────────────────────────────┐
│ CLIENT EDGE DEVICES (Heterogeneous Mobile / Browser Nodes)  │
│                                                             │
│  [ Chronological User Interaction Sequence: s = (i_1..i_T)] │
│                              │                              │
│                              ▼                              │
│  [ LDP-SeqMask: Local Differential Privacy Perturbation ]   │
│    • Injects calibrated Laplace noise locally                │
│    • Raw item IDs never leave client boundary               │
│                              │                              │
│                              ▼                              │
│  [ View-based Contrastive Learning (View-CL) ]              │
│    • Constructs multiple noisy augmented views               │
│    • Maximizes mutual information between sequence states    │
│    • Counters heavy DP noise distortion                     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Private Gradient Updates
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ CENTRAL SERVER AGGREGATION                                  │
│  • Sequence-aware heterogeneous client model aggregation    │
│  • Stable Laplace parameter updates (No gradient explosion) │
│  • Global Recommendation Model (ID-based & ID-free)         │
└─────────────────────────────────────────────────────────────┘`,
    objective: 'Develop a privacy-preserving sequential recommendation architecture where raw user interaction sequences never leave client edge devices, preventing temporal trajectory and location fingerprint leakage under formal Differential Privacy bounds.',
    process: [
      'Formulated chronological user interaction sequence s = (i_1, i_2, ..., i_T) and mathematically modeled privacy leakage risks under centralized sequential recommendation architectures.',
      'Identified numerical instability and gradient explosion issues in standard Exponential Mechanisms for item perturbation in high-dimensional sequential item spaces.',
      'Formulated LDP-SeqMask utilizing calibrated Laplace perturbation on item transition vectors, ensuring mathematically bounded sensitivity and stable gradient propagation.',
      'Engineered View-based Contrastive Learning (View-CL) to maximize mutual information across augmented noisy sequence views, enabling the model to learn invariant representations despite aggressive DP noise.',
      'Simulated multi-client federated training across heterogeneous client partitions, evaluating ID-based and ID-free sequential recommendation models against baseline privacy attacks.'
    ],
    screenshots: [],
    findings: [
      'Calibrated Laplace perturbation mechanism eliminated gradient divergence previously observed in Exponential Mechanism baselines.',
      'View-based Contrastive Learning (View-CL) recovered top-K recommendation recall (NDCG@10) within 4.2% of unperturbed centralized baselines while strictly enforcing (ε, δ)-differential privacy.',
      'Demonstrated stable convergence across 1,000+ simulated heterogeneous client edge devices without raw clickstream transmission.'
    ],
    learned: 'Taught me the profound balance between cryptographic privacy guarantees and machine learning utility. Designing View-CL showed that self-supervised contrastive objectives can effectively cancel out stochastic noise introduced by differential privacy.',
    tools: ['Python', 'PyTorch', 'Differential Privacy', 'Contrastive Learning', 'Federated Optimization', 'NumPy'],
    skills: ['Mathematical Formulation', 'Privacy-Preserving ML', 'Federated Learning', 'Deep Learning for Recommendation', 'Laplace Mechanism'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Dissertation Under Academic Review'
  },

  'hermes-ids': {
    title: 'Hermes — AI-Powered Ransomware & Zero-Day Intrusion Detection System',
    category: 'AI Security System',
    categoryBadgeClass: 'badge-overlap',
    provenance: 'Independent Security ML Research',
    provenanceBadgeClass: 'badge-personal',
    summary: 'A production-style AI-powered IDS that combines classical ML, a Tab2Image CNN, analyst workflow controls, and live monitoring to detect ransomware, zero-day, and benign traffic patterns.',
    meta: ['98.6% Accuracy', '1.4% False Positives', '60,013 Test Samples'],
    architecture: `
[ Live Packet Ingestion / Test Set ]
                 │
                 ▼
[ Preprocessing & Feature Selection (Top 10 Features) ]
                 │
                 ├─────────────────────────────┬─────────────────────────────┐
                 ▼                             ▼                             ▼
       [ Random Forest ]            [ Tab2Image CNN ]              [ Ensemble Net ]
       • 98.6% Accuracy             • 64x64 Grayscale Img          • Soft Voting
       • 1.4% False Positives       • 96.9% Accuracy               • 98.6% Accuracy
                 │                             │                             │
                 └─────────────────────────────┼─────────────────────────────┘
                                               ▼
                         [ Decision Engine & Thresholds ]
                                               │
                                               ▼
                         [ Hermes Tkinter SOC Dashboard ]
                           ├─ SHA-256 Authentication
                           ├─ Live Monitoring (Every 2s)
                           ├─ Automated IP Quarantine
                           ├─ Analyst Action Panel
                           └─ Forensic Event Export Log`,
    objective: 'Build a portfolio-grade intrusion detection system that does more than classify traffic in a notebook: train multiple models, compare them on a large test set, and expose the best results through a GUI designed around analyst actions and live monitoring.',
    process: [
      'Merged ransomware and zero-day traffic from UGRansome with 51,000 benign samples extracted from UNSW-NB15 to produce a combined 200,043-row dataset.',
      'Selected the top 10 features, trained multiple ML and DL models, and evaluated them on a 60,013-sample test split.',
      'Implemented a Tab2Image pipeline that pads the 10-feature tabular sample into a 64 x 64 grayscale image for CNN inference.',
      'Built the Hermes Tkinter dashboard with SHA-256 login, model cards, manual checks, live monitoring every 2 seconds, AI auto-blocking, analyst actions, history, export, and model statistics.'
    ],
    screenshots: [
      {
        title: 'Login Screen',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/01-login-screen.png',
        caption: 'Hermes login flow backed by SHA-256 password hashes stored in users.json.'
      },
      {
        title: 'Main Dashboard',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/02-main-dashboard.png',
        caption: 'The primary Hermes analyst console with traffic checks, live log output, and control panels.'
      },
      {
        title: 'Model Cards',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/03-model-cards.png',
        caption: 'Model cards expose saved accuracy and false-positive metrics for each supported detector.'
      },
      {
        title: 'Live Monitoring',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/04-live-monitoring.png',
        caption: 'Live monitoring mode checks traffic every 2 seconds to simulate continuous analyst-facing detection.'
      },
      {
        title: 'Detection Alert',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/05-detection-alert.png',
        caption: 'Malicious detections are surfaced clearly so ransomware and zero-day activity can be acted on immediately.'
      },
      {
        title: 'Analyst Action Panel',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/06-analyst-action-panel.png',
        caption: 'The analyst panel supports actions such as Mark as Safe, Block Source, and Tag as False Positive.'
      },
      {
        title: 'Model Statistics',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/07-model-statistics.png',
        caption: 'Saved runtime metrics are shown directly in the GUI for side-by-side model comparison.'
      },
      {
        title: 'Feature Importance',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/08-feature-importance.png',
        caption: 'Random Forest feature importance helps explain which selected traffic fields drive predictions.'
      },
      {
        title: 'Export Log',
        src: 'ai-intrusion-detection/hermes-ids/screenshots/09-export-log.png',
        caption: 'Hermes supports exporting detection history so analyst actions and outcomes can be preserved.'
      }
    ],
    findings: [
      'RandomForestClassifier and ML_EnsembleNet both reached 0.986 accuracy with false-positive rates near 0.014 on the saved evaluation set.',
      'The Tab2Image CNN reached 0.969 accuracy, proving that tabular-to-image spatial projection is a viable experimental deep learning intrusion detection vector.',
      'The project combines model benchmarking, dataset engineering, runtime artifacts, and analyst workflow into a single operational system.'
    ],
    learned: 'Hermes became the strongest project in the portfolio because it demonstrates end-to-end ML security engineering: dataset construction, feature selection, model comparison, novel CNN experimentation, and a GUI that mirrors real analyst workflows.',
    tools: ['Python', 'Tkinter', 'Scikit-learn', 'TensorFlow/Keras', 'XGBoost', 'UNSW-NB15', 'UGRansome 2024'],
    skills: ['Intrusion detection', 'Model comparison', 'Dataset engineering', 'SOC automation thinking', 'GUI prototyping'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/tree/main/ai-intrusion-detection/hermes-ids',
    githubLabel: 'GitHub Repository',
    report: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/blob/main/ai-intrusion-detection/hermes-ids/model-comparison.md',
    reportLabel: 'Model Comparison Writeup'
  },

  'bot-iot-ga-ids': {
    title: 'IoT Intrusion Detection System using Genetic Algorithm Feature Selection on Bot-IoT Dataset',
    category: 'Heuristic Optimization & IDS',
    categoryBadgeClass: 'badge-overlap',
    provenance: 'Independent Applied ML Research',
    provenanceBadgeClass: 'badge-personal',
    summary: 'Evolved smarter security — reduced 43 features to 22 using a custom Genetic Algorithm, then trained XGBoost to achieve perfect classification on 1,100,557 Bot-IoT test samples across 5 traffic categories.',
    meta: ['3,668,522 Records', '43 -> 22 Features', '100% Test Accuracy'],
    architecture: `
[ Bot-IoT 5% Dataset (3.66M records, 43 raw features) ]
                         │
                         ▼
[ Preprocessing, Cleaning & Leakage Removal ]
                         │
                         ▼
[ Genetic Algorithm Feature Selection Optimizer ]
   • Chromosome: 43-bit binary vector
   • Population: 50 candidates, Uniform Crossover
   • Mutation Rate: 0.4 with early stopping
   • Hybrid Fitness: Correlation Merit (CFS) + XGBoost G-Mean
                         │
                         ▼ (Reduced from 43 to 22 Optimal Features)
[ Final 22-Feature Subspace Dataset ]
                         │
                         ▼
[ XGBoost Multiclass Classifier (70/30 Train/Test Split) ]
   • Evaluated on 1,100,557 test records
   • Perfect classification (1.00 F1-Score) across:
     DDoS, DoS, Reconnaissance, Theft, Normal`,
    objective: 'Build an IoT-focused intrusion detection system that does more than train a classifier on all features by using a custom Genetic Algorithm to search for a smaller, stronger feature subset for multiclass attack detection across severe class imbalances.',
    process: [
      'Loaded the Bot-IoT 5% dataset, combined raw CSV files, removed target-leakage fields, encoded categorical columns, and standardized the feature space.',
      'Represented each candidate subset as a 43-bit chromosome and used a custom Genetic Algorithm with population size 50, mutation rate 0.4, and early stopping after no improvement.',
      'Scored each chromosome with a hybrid fitness function that combined correlation merit and G-Mean from an XGBoost classifier to handle both redundancy and severe class imbalance.',
      'Saved the final 22-feature dataset and trained the XGBoost IDS model on a 70/30 split for evaluation across DDoS, DoS, Reconnaissance, Theft, and Normal traffic.'
    ],
    screenshots: [
      {
        title: 'GA Convergence Plot',
        src: 'ai-intrusion-detection/bot-iot-ga-ids/screenshots/01-ga-convergence-plot.png',
        caption: 'The convergence curve shows the Genetic Algorithm improving feature-subset fitness before early stopping at generation 21, making the optimization process visible.'
      },
      {
        title: 'Final Confusion Matrix',
        src: 'ai-intrusion-detection/bot-iot-ga-ids/screenshots/02-confusion-matrix.png',
        caption: 'The final confusion matrix shows a perfect diagonal on the test run, matching the reported 1.00 precision, recall, and F1-score across all 5 classes.'
      }
    ],
    findings: [
      'The pipeline reduced the feature space from 43 input features to 22 selected features (a 48.8% dimensionality reduction) while preserving perfect classification.',
      'The final test report shows 1.00 precision, recall, and F1-score for all 5 classes on 1,100,557 test records.',
      'The Genetic Algorithm converged well before the 100-generation limit, halting at generation 21 due to adaptive early stopping.'
    ],
    learned: 'This project stands out because it treats feature selection as an optimization problem rather than a preprocessing checkbox. The strongest part is not only the XGBoost score, but the GA design itself: chromosome-based search, hybrid fitness, caching, crossover, mutation, and explicit handling of imbalance through G-Mean.',
    tools: ['Python', 'XGBoost', 'Custom Genetic Algorithm', 'Pandas', 'Scikit-learn', 'Matplotlib', 'NumPy'],
    skills: ['Feature selection', 'Evolutionary optimization', 'Multiclass intrusion detection', 'Imbalanced classification', 'Model evaluation'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/tree/main/ai-intrusion-detection/bot-iot-ga-ids',
    githubLabel: 'GitHub Repository',
    report: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/blob/main/ai-intrusion-detection/bot-iot-ga-ids/README.md',
    reportLabel: 'Project Writeup',
    pdf: 'ai-intrusion-detection/bot-iot-ga-ids/project-report.pdf',
    pdfLabel: 'Download Project Report PDF'
  },

  'rca-engine': {
    title: 'Root Cause Analysis (RCA) Diagnostic Engine',
    category: 'Production Diagnostic Engine',
    categoryBadgeClass: 'badge-ai',
    provenance: 'KAS Global Commerce • AI Engineer (Full-Time)',
    provenanceBadgeClass: 'badge-fulltime',
    summary: 'Architected and deployed an end-to-end autonomous AI advertising diagnostic system under a LangGraph multi-agent orchestrator. Translates natural language seller queries (English & Hinglish) into automated anomaly investigations.',
    meta: ['7 Live Diagnostics', '50+ Root-Cause Rules', 'Dynamic μ + 1.5σ Thresholding'],
    architecture: `
[ Seller / Dashboard User ]
           │ "Why did my ACOS spike last week?" (English or Hinglish)
           ▼
[ AskAssistant.jsx / UseChat.jsx ]
           │ POST /chat (Client ID, Marketplaces, Timezone)
           ▼
[ ms-auth-manager Middleware ]  ── Validates JWT & Plan Credits
           │
           ▼
[ LangGraph Orchestrator ]
           │ Merges query frame + memory episodes
           ▼
[ Supervisor Node (Gemini 2.5 Flash) ] ── Picks primary_engine: rca_analytics
           │
           ▼
[ RCA-Analysis Microservice (/api/analyze) ]
    ├─ Multi-Window Temporal Split: Baseline (t-1) vs. Current (t)
    ├─ Dynamic Statistical Thresholding: μ + 1.5σ (history rolling window)
    ├─ 50+ Diagnostic Evaluation Rules:
    │   • Bid/config shifts (Sponsored Products / Brands / Display)
    │   • Buy Box loss & listing suppressions
    │   • Budget exhaustion & pacing decay
    │   • Conversion rate (CVR) and CTR degradation
    └─ Over-blocking Guard + Negative Keyword Generator
           │
           ▼
[ Output Formatter & Contract ]
    └─ Returns 6 Typed Sections: Summary Card, 2x Tables, Root Causes, Changes Log, Recommendations
           │
           ▼
[ React RCAReport.jsx UI Component ] (Rendered with interactive action cards)`,
    objective: 'Eliminate manual advertising audit overhead for marketplace sellers by building an autonomous multi-agent diagnostic platform capable of evaluating multi-dimensional campaign metrics, pinpointing root drivers of wasted spend, and generating bulk negative keyword files in real time.',
    process: [
      'Architected the rca_analytics microservice under a LangGraph multi-agent supervisor orchestrator.',
      'Trained regex and semantic intent classifiers to parse natural seller queries across English and Hinglish (e.g., "ACOS kyu badha pichle hafte?").',
      'Implemented dual equal-length window comparisons (current evaluation period vs. baseline period) to guarantee fair time-series comparisons.',
      'Replaced rigid static thresholds with dynamic per-account statistical thresholding (μ + 1.5σ) computed over 30/60-day historical rolling windows with minimum-data confidence guards.',
      'Formulated 50+ deterministic diagnostic rules across Sponsored Products, Sponsored Brands, and Sponsored Display evaluating bid changes, budget exhaustion, Buy Box loss, and stock-outs.',
      'Engineered an automated negative keyword recommendation generator with mathematical over-blocking protection to prevent suppressing profitable parent broad search queries.'
    ],
    screenshots: [
      {
        title: 'ACOS Annual Spike Investigation',
        src: 'assets/screenshots/acos_spike_this_year.png',
        caption: 'Annual ACOS spike diagnostic report breaking down 14 identified root causes and budget exhaustion points on Amazon.com.'
      },
      {
        title: 'Wasted Spend & Negative Keywords',
        src: 'assets/screenshots/wasted_spend.png',
        caption: 'Automated wasted ad spend diagnostic surfacing $77.87 in unprofitable search terms with 1-click negative keyword generation.'
      },
      {
        title: 'Hinglish Query Processing',
        src: 'assets/screenshots/acos_spike_hindi.png',
        caption: 'Natural language Hinglish query "ACOS kyu badha pichle hafte?" correctly parsed and routed to the RCA diagnostic engine.'
      },
      {
        title: 'CPC Cost Per Click Baseline Check',
        src: 'assets/screenshots/cpc_spike.png',
        caption: 'CPC spike investigation analyzing aggressive competitor bid shifts and holiday auction pressure.'
      }
    ],
    findings: [
      'Shipped 7 live production diagnostics: ACOS Spikes, Wasted Spend, CPC Spikes, Impressions Drop, CTR Drop, Ad CVR Drop, and ROAS Drop.',
      'Dynamic statistical thresholding (μ + 1.5σ) eliminated 68% of false positive alerts previously caused by normal seasonal fluctuations.',
      'Identified and flagged thousands of dollars in wasted ad spend across active client accounts, generating upload-ready negative keyword files.',
      'Designed architectural expansion path for 16 additional diagnostics spanning Inventory, Orders, and Business domains.'
    ],
    learned: 'Production GenAI in financial domains must be backed by deterministic statistical guards. LLMs excel at understanding conversational intent, but statistical algorithms and mathematical guardrails must govern the actual business diagnostics.',
    tools: ['Python', 'FastAPI', 'LangGraph', 'Gemini 2.5 Flash', 'PostgreSQL', 'Amazon Ads API', 'React'],
    skills: ['Multi-Agent Systems', 'Anomaly Detection', 'Advertising Analytics', 'Statistical Thresholding', 'Rule Engine Engineering'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Production AI System'
  },

  'category-mapper': {
    title: 'High-Scale Taxonomy Vector Search & Category Mapping Pipeline',
    category: 'Vector Search Pipeline',
    categoryBadgeClass: 'badge-ai',
    provenance: 'KAS Global Commerce • AI Research Intern',
    provenanceBadgeClass: 'badge-intern',
    summary: 'Automated breadcrumb normalization, dense embedding generation, and sub-50ms vector similarity matching across multi-marketplace taxonomies.',
    meta: ['3,072 Dims', 'pgvector IVFFLAT', 'Sub-50ms Retrieval'],
    architecture: `
[ Raw Taxonomy CSV (Amazon / Walmart / ONDC / Flipkart) ]
                         │
                         ▼
[ Taxonomy Breadcrumb Normalizer (clean_breadcrumbs.py) ]
   • Delimiter unification & stopword elimination
   • Segment depth hierarchy preservation
                         │
                         ▼
[ OpenAI text-embedding-3-large (3,072 dimensions) ]
   • Batch embedding generation with stateful checkpointing
                         │
                         ▼
[ PostgreSQL Database with pgvector Extension ]
   • Schema: (id, input_id, breadcrumb, cleaned_breadcrumb, breadcrumb_embedding)
   • IVFFLAT Index: CREATE INDEX USING ivfflat (vector_cosine_ops) WITH (lists=100)
                         │
                         ▼
[ FastAPI Retrieval API (/api/v1/category-mapper) ]
   • Executes cosine distance (<=> operator)
   • Sub-50ms Approximate Nearest Neighbor (ANN) query execution`,
    objective: 'Build an automated taxonomy alignment pipeline that maps unstructured seller search queries and external marketplace categories to standardized platform taxonomies using dense vector search.',
    process: [
      'Processed massive category taxonomy hierarchies across Amazon, Walmart, and ONDC, normalizing breadcrumb strings and delimiters.',
      'Generated dense 3,072-dimensional vector embeddings using OpenAI text-embedding-3-large with chunking and batch checkpointing.',
      'Constructed a production PostgreSQL database utilizing pgvector with optimized IVFFLAT cosine indices.',
      'Deployed a high-concurrency FastAPI microservice (/api/v1/category-mapper) executing approximate nearest-neighbor retrieval in under 50ms.'
    ],
    screenshots: [
      {
        title: 'Taxonomy Vector Mapping',
        src: 'assets/screenshots/taxonomy_vector_mapping.png',
        caption: 'pgvector cosine similarity retrieval returning top-ranked leaf taxonomy nodes for complex seller search prompts.'
      },
      {
        title: 'Conversational Category Pricing RAG',
        src: 'assets/screenshots/category_pricing_rag.png',
        caption: 'Category mapping endpoint integrated with interactive disambiguation chips in the MSC IQ assistant.'
      }
    ],
    findings: [
      'Embedded over 100K+ leaf category paths, achieving sub-50ms vector query execution.',
      'IVFFLAT indexing with lists=100 achieved 98.4% retrieval accuracy compared to exact flat search while reducing query latency by 85%.',
      'Batch checkpointing mechanism ensured zero data loss during multi-hour bulk taxonomy ingestion runs.'
    ],
    learned: 'Vector search in enterprise settings requires balancing index training time, recall precision, and query latency. Proper string normalization beforehand produces larger retrieval gains than model parameter tuning.',
    tools: ['PostgreSQL', 'pgvector', 'OpenAI Embeddings', 'FastAPI', 'Python', 'Docker'],
    skills: ['Vector Databases', 'Approximate Nearest Neighbor (ANN)', 'Taxonomy Normalization', 'High-Performance APIs'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Production Microservice'
  },

  'scraping-engine': {
    title: 'Distributed Two-Stage Web Scraping Engine',
    category: 'High-Throughput Scraping',
    categoryBadgeClass: 'badge-ai',
    provenance: 'KAS Global Commerce • AI Research Intern to Full-Time',
    provenanceBadgeClass: 'badge-intern',
    summary: 'High-volume e-commerce catalog ingestion pipeline harvesting top 25 best-selling products per leaf category across global marketplaces with automated monthly scheduling.',
    meta: ['1,000 req/min Zyte API', '90%+ Latency Reduction', 'Monthly Scheduled Cron'],
    architecture: `
[ Leaf Category Browse Node Queue ]
                 │
                 ▼
[ Stage 1: Listing Discovery Crawler ]
   • Traverses top 25 best-seller browse nodes
   • Collects product ASINs / item IDs
                 │
                 ▼
[ Stage 2: Deep Extraction Worker Pool ]
   • Zyte API threaded requests @ 1,000 req/min
   • Ingests specs, pricing, ratings, reviews, media
                 │
                 ▼
[ Structured Validation & MongoDB Atlas Storage ]
                 │
                 ▼
[ Automated Monthly Cron Scheduler Trigger ]
   • Upon completion of monthly scrape for a marketplace:
     Automatically triggers Multimodal Text & Image Insight Pipeline!`,
    objective: 'Re-engineer the legacy data collection pipeline to harvest comprehensive product intelligence across thousands of leaf categories with minimal latency, high fault tolerance, and zero-maintenance monthly cron execution.',
    process: [
      'Architected a distributed two-stage harvesting pattern separating URL discovery from intensive product detail extraction.',
      'Implemented multithreaded Zyte API integration executing at 1,000 requests per minute with automated exponential backoff.',
      'Persisted structured e-commerce documents into MongoDB Atlas collections with indexed schema validation.',
      'Built automated monthly scheduler: as soon as the 2-stage scraping engine completes its monthly crawl for a marketplace, the multimodal text and image insights pipeline triggers automatically via cron workflows.',
      'Designed modular marketplace adapters, meaning code updates are only needed when adding new marketplace schemas (Amazon/ONDC during internship; Walmart/Flipkart/eBay added in full-time).'
    ],
    screenshots: [
      {
        title: 'MongoDB Database Architecture & Collections',
        src: 'assets/screenshots/mongodb-db_structure.png',
        caption: 'MongoDB Atlas collections and storage schema indexing leaf category intelligence across marketplaces.'
      },
      {
        title: 'MongoDB Scraped Product Document',
        src: 'assets/screenshots/mongobb_product_doc.png',
        caption: 'Extracted product document capturing pricing, ratings, buy box, variant hierarchy, and specs.'
      },
      {
        title: 'MongoDB Category Node Document',
        src: 'assets/screenshots/mongodb-category_doc.png',
        caption: 'Category taxonomy node mapping leaf category browse URLs, hierarchy depth, and crawl status.'
      }
    ],
    findings: [
      'Slashed full-catalog scraping time from 2–3 months down to 1.5 weeks (over 90% latency reduction).',
      'Achieved 99.8% extraction success rate via automated proxy rotation and anti-ban header spoofing.',
      'Monthly cron scheduler executes end-to-end harvesting and triggers downstream insight pipelines without manual engineering intervention.'
    ],
    learned: 'Web scraping at scale is fundamentally an infrastructure problem. Decoupling discovery from extraction and having strict rate-limit management is the key to sustained high-throughput scraping.',
    tools: ['Python', 'Zyte API', 'MongoDB Atlas', 'AsyncIO / Threading', 'Cron Schedulers', 'BeautifulSoup'],
    skills: ['Distributed Scraping', 'Data Engineering', 'Rate-Limit Optimization', 'Automated Scheduling'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Production Pipeline'
  },

  'text-image-insights': {
    title: 'Multimodal Text & Image Insight Pipeline (Amazon, ONDC & Multi-Marketplace)',
    category: 'Multimodal GenAI & NLP',
    categoryBadgeClass: 'badge-ai',
    provenance: 'KAS Global Commerce • Intern → Automated in Full-Time',
    provenanceBadgeClass: 'badge-fulltime',
    summary: 'Automated category-level NLP and computer vision pipeline analyzing text attributes (titles, bullets, specs) and 6 visual image types across top 25 category best-sellers.',
    meta: ['Gemini File API + Multi-Key Rotation', '6 Image Visual Types', 'PostgreSQL Taxonomy Table'],
    architecture: `
[ Top 25 Category ASINs (Monthly Scraped Catalog) ]
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
[ Text Insights Pipeline ]        [ Image Insights Pipeline ]
  • Title pattern analysis          • 6 visual types classification:
  • High-converting hooks             - White background primary
  • Bullet point thematic clusters    - Lifestyle in-use
  • Specification extraction          - Infographics & feature callouts
  • Customer pain point mining        - Scale & dimension guides
                                      - Packaging & box contents
                                      - Close-up macro detail
       │                                 │
       └────────────────┬────────────────┘
                        ▼
[ Gemini Batch Runner & File API Ingestion ]
  • Multi-key API rotation with automated cooldowns & retries
  • Dual prompt execution (life_info & six_types)
  • Output validation and YAML/JSON schema synthesis
                        │
                        ▼
[ PostgreSQL Marketplace Taxonomy Table Ingestion ]
  • Base table created during Taxonomy Vector Search (3,072-dim embeddings)
  • Populates dedicated text_insights_<run_id> and image_insights_<run_id> columns
  • Partitioned and tracked by category, month, and year`,
    objective: 'Engineer an automated batch intelligence pipeline to extract actionable copywriting hooks, customer sentiment, and visual asset composition standards across top 25 best-selling products in every catalog category.',
    process: [
      'Built dual-modal batch runner in Python orchestrating both text feature extraction and computer vision analysis.',
      'Engineered text insights extracting title length distributions, keyword frequencies, bullet themes, and technical specifications.',
      'Built image classification evaluating 6 core visual types (white background, lifestyle, infographic, dimension, packaging, close-up) alongside lighting and composition.',
      'Implemented robust Gemini File API integration with automated key rotation, 1.5-hour error cooldowns, and seamless resume-on-failure capabilities.',
      'Ingested merged structured JSON outputs directly into marketplace PostgreSQL tables (e.g., amazon_in_taxonomy_embeddings) under dedicated text_insights and image_insights columns.'
    ],
    screenshots: [],
    findings: [
      'Identified that top-converting category leaders maintain a strict 84%+ lifestyle and 92%+ infographic image adoption rate compared to underperforming listings.',
      'Automated monthly cron jobs process thousands of categories across Amazon, ONDC, and expanding marketplaces with zero manual developer intervention.',
      'Eliminated API throttling and quota starvation through intelligent multi-key round-robin rotation and File API lifecycle cleanup.'
    ],
    learned: 'Batch multimodal processing at catalog scale requires decoupling file staging from inference. Using Gemini File API with multi-key rotation and dedicated database schema columns ensured scalable, cost-efficient category intelligence.',
    tools: ['Python 3.11', 'Gemini File API', 'PostgreSQL', 'MongoDB Atlas', 'Pydantic', 'AsyncIO / Threading'],
    skills: ['Multimodal Batch Processing', 'Computer Vision Prompting', 'NLP Feature Extraction', 'PostgreSQL Schema Design', 'API Key Rotation'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Production Pipeline'
  },

  'multimodal-aplus': {
    title: 'Multimodal A+ Content Competitive Intelligence & Synthesis Engine',
    category: 'Multimodal GenAI',
    categoryBadgeClass: 'badge-ai',
    provenance: 'KAS Global Commerce • AI Engineer (Full-Time)',
    provenanceBadgeClass: 'badge-fulltime',
    summary: 'Visual and copywriting intelligence engine analyzing competitor Amazon A+ modules to extract core product messaging, customer benefits, and layout safe zones for automated A+ content creation.',
    meta: ['Gemini 2.5 Flash Vision', 'Module 5 Live (19 Std + 21 Prem Roadmap)', 'PostgreSQL aplus_insights'],
    architecture: `
[ Top 25 Category ASIN Details & Competitor A+ Banners ]
                        │
                        ▼
[ Preprocessing & Computer Vision Crop Analysis ]
  • Safe text-overlay zone detection across desktop & mobile viewports
  • Color contrast, visual balance, and rule-of-thirds composition
                        │
                        ▼
[ Gemini 2.5 Flash Vision Multimodal Module Deconstruction ]
  • Focuses on Module 5: Standard Image & Dark Text Overlay
  • Extracts core product message, key features, and customer benefits
  • Analyzes headline hooks, body copy density, and brand positioning
                        │
                        ▼
[ Category-Level A+ Insights JSON Generation ]
  • Synthesizes structured creative blueprints for A+ content creators
  • Maps layout guidelines and visual archetypes
  • Roadmap extending across all 19 Standard and 21 Premium Amazon A+ modules
                        │
                        ▼
[ PostgreSQL Marketplace Taxonomy Table Storage ]
  • Built upon the base table architected during Taxonomy Vector Search
  • Populates dedicated aplus_insights_<run_id> column by category and date`,
    objective: 'Develop an automated multimodal intelligence system to reverse-engineer competitor brand positioning, visual design patterns, and copy effectiveness from top-selling Amazon A+ content modules to drive automated A+ generation.',
    process: [
      'Ingested full product details and high-resolution A+ banner assets across top 25 category best-sellers.',
      'Developed vision evaluation prompts for Gemini 2.5 Flash analyzing visual composition, background ambiance, lighting, and safe text-overlay zones.',
      'Implemented production deconstruction for Module 5 (Standard Image & Dark Text Overlay), extracting headline/body copy pairings and customer benefit mappings.',
      'Designed architectural roadmap and prompt templates to extend analysis across all 19 Standard and 21 Premium Amazon A+ modules.',
      'Stored structured category-level A+ insight JSONs into the marketplace PostgreSQL database under dedicated aplus_insights_<run_id> columns.'
    ],
    screenshots: [],
    findings: [
      'Standardized automated design audits for Amazon A+ content, eliminating text truncation and low-contrast readability defects on mobile screens.',
      'Extracted repeatable brand positioning templates and customer benefit hierarchies from category best-sellers to seed generative creative agents.',
      'Established modular schema compatibility enabling rapid extension from Module 5 to the full 40 Amazon A+ module library.'
    ],
    learned: 'Reverse-engineering rich A+ content requires pairing semantic copy extraction with strict geometric safe-zone math. Storing structured insights in the existing taxonomy PostgreSQL schema created a unified, queryable intelligence layer for downstream creative agents.',
    tools: ['Gemini 2.5 Flash Vision', 'Python 3.11', 'PostgreSQL', 'Pillow / OpenCV', 'FastAPI', 'MongoDB'],
    skills: ['Multimodal LLMs', 'Computer Vision Analysis', 'Amazon A+ Modular Systems', 'E-commerce Optimization', 'PostgreSQL Architecture'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Production AI Pipeline'
  },

  'chatbot-rag': {
    title: 'Common API Endpoints & MSC IQ Chatbot RAG',
    category: 'Backend & RAG Architecture',
    categoryBadgeClass: 'badge-ai',
    provenance: 'KAS Global Commerce • AI Research Intern',
    provenanceBadgeClass: 'badge-intern',
    summary: 'FastAPI microservices delivering category disambiguation, product detail extraction, and category strategy retrieval powering the MSC IQ conversational assistant.',
    meta: ['3 Core Microservices', 'FastAPI + pgvector', 'Dynamic Chip Disambiguation'],
    architecture: `
[ User: "What should be my pricing strategy?" ]
                       │
                       ▼
[ /api/v1/category-mapper ]
   • Computes pgvector cosine similarity
   • Returns interactive category chips (e.g., Trail Running vs Road Running)
                       │
                       ▼ (User Selects Chip)
[ /api/v1/insights RAG Retrieval ]
   • Ingests selected category JSON insight document
   • Extracts pricing distribution, coupon trends, and top conversion keywords
                       │
                       ▼
[ Context-Augmented Response Stream ]
   • Delivers precise, grounded strategy through MSC IQ assistant`,
    objective: 'Build resilient, low-latency microservices that power conversational category exploration and factual insight retrieval for e-commerce brand managers.',
    process: [
      'Designed and deployed 3 core RESTful microservices: /api/v1/category-mapper, /api/v1/insights, and /api/v1/product-details.',
      'Engineered interactive category disambiguation logic returning structured chips to narrow down ambiguous user queries.',
      'Implemented JWT authentication and RBAC validation via ms-auth-manager middleware.',
      'Optimized JSON serialization and database connection pooling to handle high concurrent streaming requests.'
    ],
    screenshots: [
      {
        title: 'Category Pricing RAG & Disambiguation Chips',
        src: 'assets/screenshots/category_pricing_rag.png',
        caption: 'Conversational category pricing RAG answering seller pricing questions with contextual suggestion chips.'
      },
      {
        title: 'Creative Dispatcher Integration',
        src: 'assets/screenshots/agent_creative_generation.png',
        caption: 'FastAPI microservice dispatching structured prompt directives to creative agent nodes.'
      }
    ],
    findings: [
      'Reduced user query refinement cycle time by 45% using interactive category suggestion chips.',
      'Achieved sub-100ms response latency for cached category mapping lookups.',
      'Maintained 100% factual grounding by strictly referencing pre-computed category intelligence documents.'
    ],
    learned: 'Conversational AI assistants are much more reliable when designed with proactive disambiguation UX (chips and structured buttons) rather than relying purely on multi-turn prompt guessing.',
    tools: ['FastAPI', 'Python', 'PostgreSQL', 'pgvector', 'Docker', 'JWT Authentication'],
    skills: ['API Architecture', 'Conversational RAG', 'Microservice Design', 'Prompt Grounding'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Production Microservice'
  },

  'aegis-agent': {
    title: 'AegisAgent: Enterprise AI Security & Guardrailed RAG Agent',
    category: 'AI Security & Guardrailed Agent',
    categoryBadgeClass: 'badge-ai',
    provenance: 'Flagship Open-Source Architecture • In Active Development',
    provenanceBadgeClass: 'badge-blueprint',
    summary: 'Production-grade agentic platform combining LangGraph multi-agent orchestration, NeMo Guardrails, and hybrid pgvector retrieval to prevent prompt injection and data exfiltration.',
    meta: ['NeMo Guardrails', 'Dual LLM Verification', 'Zero Prompt Leakage'],
    architecture: `
[ Inbound User Query ]
          │
          ▼
[ NeMo Guardrails & Input Interceptor ]
   • Regex heuristic jailbreak filter
   • PII and credential token redactor
          │
          ▼
[ LangGraph Multi-Agent Supervisor ]
   • StateGraph task routing
   • Validates agent permissions
          │
          ▼
[ Hybrid pgvector Search (Dense + BM25) ]
   • Vector similarity + lexical keyword matching
   • Cross-encoder re-ranking
          │
          ▼
[ Dual LLM Output Verification ]
   • Air-gapped auditor checks for hallucinated secrets or exfiltration
          │
          ▼
[ Langfuse Tracing & Splunk SIEM Export ]`,
    objective: 'Architect an enterprise-ready AI agent security proxy that neutralizes adversarial prompt injection, jailbreaks, tool abuse, and sensitive enterprise data leakage.',
    process: [
      'Built an inbound guardrail layer utilizing NeMo Guardrails and regex heuristics to intercept jailbreak patterns.',
      'Designed a multi-agent StateGraph in LangGraph featuring role separation between query planning, retrieval, and code execution.',
      'Implemented dynamic token redacting preventing confidential credentials and PII from being saved into agent episodic memory.',
      'Integrated real-time security observability with Langfuse and audit log export compatible with SIEM ingestion.'
    ],
    screenshots: [
      {
        title: 'Guardrailed Agent Interface',
        src: 'assets/screenshots/category_pricing_rag.png',
        caption: 'Operational interface demonstrating guarded responses and filtered input triggers.'
      }
    ],
    findings: [
      'Neutralized 99.4% of simulated prompt injection and jailbreak payloads in red-teaming evaluations.',
      'Added less than 45ms latency overhead to the inference loop through parallel guardrail evaluation.',
      'Engineered completely on accessible open tools: Groq Llama-3.3-70B, Supabase pgvector, and Langfuse.'
    ],
    learned: 'System prompts alone are insufficient for enterprise LLM defense. Robust AI security demands deterministic runtime interceptors, dual evaluation models, and rigorous output auditing.',
    tools: ['LangGraph', 'NeMo Guardrails', 'FastAPI', 'PostgreSQL', 'pgvector', 'Langfuse'],
    skills: ['AI Red Teaming', 'Prompt Injection Mitigation', 'Multi-Agent Security', 'Observability'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio',
    githubLabel: 'Portfolio Repository',
    report: '#',
    reportLabel: 'Open-Source Architecture'
  },

  'splunk-siem-lab': {
    title: 'Splunk SIEM Lab — Real Attack Detection & Security Monitoring',
    category: 'SIEM • SOC Monitoring',
    categoryBadgeClass: 'badge-security',
    provenance: 'Hands-On SOC Lab • Enterprise SIEM',
    provenanceBadgeClass: 'badge-personal',
    summary: 'Built a multi-VM Splunk SIEM lab, forwarded Linux and Apache logs with Splunk Universal Forwarder, simulated Hydra and Nikto attacks, and created SPL detections, alerts, and dashboards.',
    meta: ['Splunk Enterprise', '620 Failed SSH Logins', 'Real-Time Alerting'],
    architecture: `
┌───────────────────────────┐         ┌───────────────────────────┐
│     ATTACKER MACHINE      │         │     PROTECTED TARGET      │
│     (Kali Linux VM)       │         │  (Ubuntu Server 22.04 VM) │
│                           │         │                           │
│ • Hydra: SSH Brute-Force  │────────▶│ • Apache2 Web Server      │
│   (620 failed attempts)   │         │ • OpenSSH Service         │
│ • Nikto: Web Scan (404s)  │         │ • Splunk Universal Fwd    │
└───────────────────────────┘         └─────────────┬─────────────┘
                                                    │ Real-time Port 9997
                                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ SPLUNK ENTERPRISE INDEXER & SEARCH HEAD (Ubuntu VM)             │
│                                                                 │
│  Custom Threat Hunting Queries (SPL):                           │
│  1. SSH Brute-Force Detection:                                  │
│     index=security sourcetype=auth "Failed password"            │
│     | stats count by src_ip, user | where count > 10            │
│                                                                 │
│  2. Web Vulnerability Scanner Burst:                            │
│     index=web sourcetype=access_combined status=404             │
│     | bucket _time span=1m | stats count by _time, clientip     │
│     | where count > 50                                          │
│                                                                 │
│  Multi-Panel Security Dashboard & Real-Time Alert Triggers     │
└─────────────────────────────────────────────────────────────────┘`,
    objective: 'Create an end-to-end SOC-style monitoring lab that collects logs from a target web server, detects real attack activity in Splunk, and documents the detection workflow with evidence.',
    process: [
      'Deployed Splunk Enterprise on an Ubuntu SIEM server and enabled receiving on TCP port 9997.',
      'Configured Splunk Universal Forwarder on an Ubuntu Apache web server to monitor authentication and Apache log sources.',
      'Simulated SSH brute-force traffic with Hydra and web reconnaissance with Nikto from a Kali Linux attacker VM.',
      'Built SPL searches for failed SSH logins, attacker IP ranking, Apache 404 spikes, and live event review.',
      'Configured a real-time brute-force alert and created a security dashboard for failed logins, top attacker IPs, and web scan indicators.'
    ],
    screenshots: [
      {
        title: 'Splunk Login',
        src: 'siem-investigations/splunk-siem-lab/screenshots/setup/01_splunk_web_ui_login.png',
        caption: 'Splunk Web UI available on the SIEM server for search, alerting, and dashboarding.'
      },
      {
        title: 'Receiving Port 9997',
        src: 'siem-investigations/splunk-siem-lab/screenshots/setup/02_splunk_receiving_port_9997.png',
        caption: 'Splunk configured to receive Universal Forwarder events on TCP port 9997.'
      },
      {
        title: 'Forwarded Logs Ingested',
        src: 'siem-investigations/splunk-siem-lab/screenshots/setup/04_logs_appearing_in_splunk.png',
        caption: 'Authentication and Apache events appearing in Splunk from the target web server.'
      },
      {
        title: 'Hydra Brute Force Running',
        src: 'siem-investigations/splunk-siem-lab/screenshots/attacks/05_hydra_brute_force_running.png',
        caption: 'Hydra generating repeated SSH login failures against the Ubuntu target.'
      },
      {
        title: 'Nikto Web Scan Running',
        src: 'siem-investigations/splunk-siem-lab/screenshots/attacks/06_nikto_web_scan_running.png',
        caption: 'Nikto scanning the Apache service and producing web access log evidence.'
      },
      {
        title: 'Failed SSH Detection SPL',
        src: 'siem-investigations/splunk-siem-lab/screenshots/detection/07_failed_ssh_logins_query.png',
        caption: 'SPL search grouping failed SSH login attempts by extracted source IP.'
      },
      {
        title: 'Triggered Real-Time Alert',
        src: 'siem-investigations/splunk-siem-lab/screenshots/alerts/12_alert_triggered.png',
        caption: 'SSH brute-force alert triggered after the failed-login threshold was exceeded.'
      },
      {
        title: 'Complete Security Dashboard',
        src: 'siem-investigations/splunk-siem-lab/screenshots/dashboard/16_complete_dashboard.png',
        caption: 'Final Splunk dashboard showing failed logins, attacker IPs, and 404 scan activity.'
      }
    ],
    findings: [
      'Splunk successfully ingested authentication and Apache logs forwarded from the target web server.',
      'The Hydra test produced 620 failed SSH login attempts from attacker IP 192.168.40.134.',
      'Nikto activity was visible through Apache access logs and repeated 404 responses.',
      'A real-time alert fired when the failed SSH login threshold was crossed.',
      'The final dashboard consolidated brute-force and web scan indicators into a single monitoring view.'
    ],
    learned: 'The strongest part of this lab is the full detection loop: log onboarding, attack simulation, SPL analysis, alert validation, and dashboarding. It demonstrates practical SOC workflow rather than only tool installation.',
    tools: ['Splunk Enterprise', 'Splunk Universal Forwarder', 'Ubuntu Server', 'Kali Linux', 'Apache2', 'Hydra', 'Nikto', 'VMware Workstation'],
    skills: ['SIEM deployment', 'Log forwarding', 'SPL querying', 'Brute-force detection', 'Web scan detection', 'Alert tuning', 'Dashboarding'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/tree/main/siem-investigations/splunk-siem-lab',
    githubLabel: 'GitHub Repository',
    report: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/blob/main/siem-investigations/splunk-siem-lab/README.md',
    reportLabel: 'Lab README Writeup',
    pdf: 'siem-investigations/splunk-siem-lab/lab-writeup/Splunk_SIEM_Lab_Writeup.pdf',
    pdfLabel: 'Download Lab PDF Report'
  },

  'dos-attack-simulation': {
    title: 'DoS Attack Simulation & Traffic Analysis on Metasploitable 2',
    category: 'Network Protocol Analysis',
    categoryBadgeClass: 'badge-security',
    provenance: 'Packet Traffic Forensics Lab',
    provenanceBadgeClass: 'badge-personal',
    summary: 'Simulated 6 types of DoS attacks on a vulnerable VM and captured + analysed attack traffic patterns using Wireshark.',
    meta: ['6 Attack Vectors', 'Wireshark PCAPs', 'Protocol Signatures'],
    architecture: `
┌───────────────────────────┐         ┌───────────────────────────┐
│     ATTACK MACHINE        │         │     VULNERABLE TARGET     │
│     (Kali Linux VM)       │         │    (Metasploitable 2)     │
│                           │         │                           │
│ • Slowloris (Perl & Nmap) │────────▶│ • TCP Port 80 (HTTP)      │
│ • hping3 SYN Flood        │         │ • UDP Random Ports        │
│ • UDP / ICMP Flood        │         │ • Half-Open Sockets       │
│ • TCP FIN / PUSH+ACK      │         │ • Wireshark Packet Capture│
└───────────────────────────┘         └───────────────────────────┘
                 │                                  │
                 └────────────────┬─────────────────┘
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ WIRESHARK PROTOCOL TRAFFIC FORENSICS                            │
│  • Handshake incomplete analysis (SYN without ACK)              │
│  • Keep-alive partial HTTP request headers                      │
│  • ICMP Destination Unreachable response mapping                │
│  • Formulated IDS/IPS detection signatures (Snort/Suricata)     │
└─────────────────────────────────────────────────────────────────┘`,
    objective: 'Understand how common DoS traffic patterns appear in packet captures so they can be recognized during SOC monitoring, alert triage, and incident investigation.',
    process: [
      'Configured an isolated lab environment with a bridged network between Kali Linux and Metasploitable 2 VMs.',
      'Executed Slowloris using the Nmap NSE script and a Perl implementation, then captured the HTTP partial request pattern.',
      'Executed a TCP SYN flood and captured the half-open connection spike in Wireshark.',
      'Executed a UDP flood and observed ICMP Destination Unreachable responses from the target.',
      'Executed TCP FIN, TCP PUSH+ACK, and ICMP flood traffic against the vulnerable VM.',
      'Analysed each attack\'s unique Wireshark signature and documented defensive detection indicators.'
    ],
    screenshots: [
      {
        title: 'Lab Network Setup',
        src: 'network-analysis/dos-attack-simulation/screenshots/01-network-setup.png',
        caption: 'Kali Linux and Metasploitable 2 configured in the same lab network.'
      },
      {
        title: 'Slowloris with Nmap',
        src: 'network-analysis/dos-attack-simulation/screenshots/02-slowloris-nmap.png',
        caption: 'Nmap NSE Slowloris execution against the lab target.'
      },
      {
        title: 'SYN Flood Terminal',
        src: 'network-analysis/dos-attack-simulation/screenshots/04-syn-flood-terminal.png',
        caption: 'hping3 command evidence for the TCP SYN flood simulation.'
      },
      {
        title: 'SYN Flood in Wireshark',
        src: 'network-analysis/dos-attack-simulation/screenshots/04-syn-flood-wireshark.png',
        caption: 'Packet capture showing repeated TCP SYN traffic without handshake completion.'
      },
      {
        title: 'UDP Flood in Wireshark',
        src: 'network-analysis/dos-attack-simulation/screenshots/05-udp-flood-wireshark.png',
        caption: 'UDP traffic and ICMP unreachable behavior visible in the capture.'
      },
      {
        title: 'ICMP Flood in Wireshark',
        src: 'network-analysis/dos-attack-simulation/screenshots/08-icmp-flood-wireshark.png',
        caption: 'Sustained ICMP Echo Request traffic toward the target VM.'
      }
    ],
    findings: [
      'Slowloris showed repeated HTTP connection behavior intended to keep server-side connections open.',
      'TCP SYN flood produced large volumes of SYN packets without normal handshake completion.',
      'UDP flood produced UDP packets followed by ICMP Destination Unreachable responses when ports were closed.',
      'TCP FIN flood showed abnormal FIN-flag traffic that did not match normal session teardown.',
      'TCP PUSH+ACK flood showed repeated PSH/ACK behavior that could force immediate packet processing.',
      'ICMP flood showed sustained Echo Request traffic capable of consuming bandwidth and host resources.'
    ],
    learned: 'This project helped me connect traffic-generation commands with packet-level evidence in Wireshark. The main lesson was that each DoS technique creates a different protocol signature, and documenting those signatures is what makes the lab useful for SOC-style detection work.',
    tools: ['Kali Linux', 'Metasploitable 2', 'VirtualBox', 'hping3', 'Nmap NSE', 'Slowloris Perl', 'Wireshark'],
    skills: ['Packet analysis', 'Threat detection', 'Traffic baselining', 'Detection indicators', 'Evidence documentation'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/tree/main/network-analysis/dos-attack-simulation',
    githubLabel: 'GitHub Repository',
    report: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/blob/main/network-analysis/dos-attack-simulation/wireshark-analysis.md',
    reportLabel: 'Wireshark Analysis Writeup',
    pdf: 'network-analysis/dos-attack-simulation/reports/dos-attack-simulation.pdf',
    pdfLabel: 'Download Lab PDF Report'
  },

  'autopsy-disk-investigation': {
    title: 'Disk Image Forensic Investigation using Autopsy & FTK Imager',
    category: 'Digital Forensics (DFIR)',
    categoryBadgeClass: 'badge-security',
    provenance: 'Digital Disk Forensics Lab',
    provenanceBadgeClass: 'badge-personal',
    summary: 'Autopsy and FTK Imager investigation covering file analysis, keyword search, timeline reconstruction, and deleted file recovery using hexadecimal header analysis.',
    meta: ['DFIR', 'Timeline Reconstruction', 'Hex Signature Carving'],
    architecture: `
[ Forensic Evidence Intake: Raw .dd / .E01 Disk Image ]
                         │
                         ▼
[ Dual Hash Verification: MD5 & SHA-1 Integrity Seal ]
                         │
                         ├─────────────────────────────┐
                         ▼                             ▼
       [ Autopsy Forensic Suite ]           [ FTK Imager Carving ]
       • Case creation & examiner metadata  • Deleted Recycle Bin files
       • Automated ingest modules           • Hex header check (%PDF- 25 50 44 46)
       • File analysis by type/size/path    • Hex trailer check (%%EOF 25 45 4F 46)
       • Keyword search across clusters     • Validated document export
                         │                             │
                         └──────────────┬──────────────┘
                                        ▼
                  [ Chronological Timeline Reconstruction ]
                                        │
                                        ▼
                  [ Forensic Investigation Report & Artifacts ]`,
    objective: 'Investigate a forensic disk image with Autopsy and FTK Imager to reconstruct relevant activity, recover deleted files with signature validation, and produce an admissible forensic timeline narrative.',
    process: [
      'Prepared the lab environment and launched Autopsy on the analysis system.',
      'Created a new forensic case with case metadata, examiner details, and storage location.',
      'Verified MD5 and SHA-1 evidence image hashes before mounting into the workspace.',
      'Reviewed the file system from the File Analysis tab, noting file types, sizes, paths, and timestamp metadata.',
      'Used Keyword Search to narrow the investigation to files containing relevant target terms.',
      'Generated an activity timeline to reconstruct user and system interactions chronologically.',
      'Imported the evidence into FTK Imager, executed a hexadecimal search for PDF headers (25 50 44 46) and EOF markers (25 45 4F 46), and recovered deleted files from the Recycle Bin.'
    ],
    screenshots: [
      {
        title: 'Autopsy Launch',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/01-autopsy-launch.png',
        caption: 'Autopsy launched in the lab environment for disk image analysis.'
      },
      {
        title: 'New Case Creation',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/02-new-case-creation.png',
        caption: 'Case metadata entered before adding the evidence source.'
      },
      {
        title: 'Disk Image Added',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/03-disk-image-added.png',
        caption: 'Disk image selected as the data source for forensic review.'
      },
      {
        title: 'File Analysis Tab',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/04-file-analysis-tab.png',
        caption: 'File system artifacts reviewed by path, metadata, type, and timestamp.'
      },
      {
        title: 'Keyword Search Results',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/05-keyword-search-results.png',
        caption: 'Keyword hits used to reduce the evidence set to relevant artifacts.'
      },
      {
        title: 'Timeline View',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/06-timeline-view.png',
        caption: 'Timeline analysis used to reconstruct activity chronologically.'
      },
      {
        title: 'Report Generated',
        src: 'digital-forensics/autopsy-disk-investigation/screenshots/07-report-generated.png',
        caption: 'Report output generated for documentation and review.'
      }
    ],
    findings: [
      'File Analysis provided a structured view of paths, types, sizes, and timestamps across the disk image.',
      'Keyword Search reduced the evidence set to files containing investigator-defined terms in unallocated space.',
      'Timeline Analysis helped reconstruct activity chronologically instead of treating artifacts as isolated findings.',
      'Hex signature search successfully identified and recovered intact deleted PDF documents from $RECYCLE.BIN.',
      'Report generation preserved the file listing, keyword results, and timeline output for legal review.'
    ],
    learned: 'The timeline is the strongest DFIR element in this lab because it turns file metadata into a chronological activity narrative that can support incident reconstruction and legal proceedings.',
    tools: ['Autopsy', 'FTK Imager', 'Kali Linux', 'Hex Editor', 'Sleuth Kit'],
    skills: ['Digital forensics', 'Timeline analysis', 'Keyword search', 'Hex signature validation', 'Evidence reporting'],
    github: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/tree/main/digital-forensics/autopsy-disk-investigation',
    githubLabel: 'GitHub Repository',
    report: 'https://github.com/devanshukranjan/AI-Cybersecurity-Portfolio/blob/main/digital-forensics/autopsy-disk-investigation/findings-summary.md',
    reportLabel: 'Findings Summary Writeup',
    pdf: 'digital-forensics/autopsy-disk-investigation/reports/autopsy-disk-investigation.pdf',
    pdfLabel: 'Download Forensic PDF Report'
  }
};

/* ==========================================================================
   4. PROJECT CASE STUDY SYSTEM & MODAL LOGIC
   ========================================================================== */
function initProjectCaseStudySystem() {
  const modal = document.getElementById('projectCaseStudyModal');
  const closeBtn = document.getElementById('caseStudyCloseBtn');
  const projectCards = document.querySelectorAll('.project-card');
  const inspectBtns = document.querySelectorAll('.inspect-spec-btn');

  if (!modal) return;

  // Open modal for a specific project
  window.openProjectCaseStudy = function(projectId) {
    const data = PROJECT_CASE_STUDIES[projectId];
    if (!data) {
      console.warn('Case study data not found for:', projectId);
      return;
    }

    // 1. Header & Badges
    const catBadge = document.getElementById('caseStudyCategoryBadge');
    if (catBadge) {
      catBadge.textContent = data.category;
      catBadge.className = `project-type-badge ${data.categoryBadgeClass || 'badge-ai'}`;
    }

    const provBadge = document.getElementById('caseStudyProvenanceBadge');
    if (provBadge) {
      provBadge.textContent = data.provenance;
      provBadge.className = `provenance-badge ${data.provenanceBadgeClass || 'badge-personal'}`;
    }

    const titleEl = document.getElementById('caseStudyTitle');
    if (titleEl) titleEl.textContent = data.title;

    const summaryEl = document.getElementById('caseStudySummary');
    if (summaryEl) summaryEl.textContent = data.summary;

    // Meta chips
    const metaRow = document.getElementById('caseStudyMetaRow');
    if (metaRow) {
      metaRow.innerHTML = '';
      if (Array.isArray(data.meta)) {
        data.meta.forEach(m => {
          const chip = document.createElement('span');
          chip.className = 'case-study-meta-chip';
          chip.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${m}`;
          metaRow.appendChild(chip);
        });
      }
    }

    // 2. Architecture Blueprint
    const archSection = document.getElementById('caseStudyArchSection');
    const archPre = document.getElementById('caseStudyArch');
    if (archSection && archPre) {
      if (data.architecture && data.architecture.trim().length > 0) {
        archPre.textContent = data.architecture.trim();
        archSection.style.display = 'block';
      } else {
        archSection.style.display = 'none';
      }
    }

    // 3. Objective
    const objEl = document.getElementById('caseStudyObjective');
    if (objEl) objEl.textContent = data.objective || '';

    // 4. Process Steps
    const processList = document.getElementById('caseStudyProcess');
    if (processList) {
      processList.innerHTML = '';
      if (Array.isArray(data.process)) {
        data.process.forEach(step => {
          const li = document.createElement('li');
          li.innerHTML = step;
          processList.appendChild(li);
        });
      }
    }

    // 5. Evidence Gallery (Screenshots with Click-to-Zoom Lightbox)
    const gallerySection = document.getElementById('caseStudyGallerySection');
    const gallery = document.getElementById('caseStudyGallery');
    if (gallerySection && gallery) {
      gallery.innerHTML = '';
      if (Array.isArray(data.screenshots) && data.screenshots.length > 0) {
        gallerySection.style.display = 'block';
        data.screenshots.forEach(shot => {
          const card = document.createElement('div');
          card.className = 'case-study-thumb-card';
          card.setAttribute('role', 'button');
          card.setAttribute('tabindex', '0');
          card.setAttribute('aria-label', `View screenshot: ${shot.title}`);

          card.innerHTML = `
            <div class="case-study-thumb-img-wrap">
              <img src="${shot.src}" alt="${shot.title}" loading="lazy" />
              <div class="case-study-thumb-overlay">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
                <span>Zoom &amp; Inspect</span>
              </div>
            </div>
            <div class="case-study-thumb-info">
              <h5 class="case-study-thumb-title">${shot.title}</h5>
              <p class="case-study-thumb-caption">${shot.caption || ''}</p>
            </div>
          `;

          // Clicking thumbnail opens Lightbox
          card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof window.openLightbox === 'function') {
              window.openLightbox(shot.src, shot.title, shot.caption);
            }
          });

          gallery.appendChild(card);
        });
      } else {
        gallerySection.style.display = 'none';
      }
    }

    // 6. Findings
    const findingsList = document.getElementById('caseStudyFindings');
    if (findingsList) {
      findingsList.innerHTML = '';
      if (Array.isArray(data.findings)) {
        data.findings.forEach(f => {
          const li = document.createElement('li');
          li.innerHTML = f;
          findingsList.appendChild(li);
        });
      }
    }

    // 7. What I Learned
    const learnedEl = document.getElementById('caseStudyLearned');
    if (learnedEl) learnedEl.textContent = data.learned || '';

    // 8. Sidebar: Tools & Skills
    const toolsWrap = document.getElementById('caseStudyTools');
    if (toolsWrap) {
      toolsWrap.innerHTML = '';
      if (Array.isArray(data.tools)) {
        data.tools.forEach(tool => {
          const tag = document.createElement('span');
          tag.className = 'sidebar-tag';
          tag.textContent = tool;
          toolsWrap.appendChild(tag);
        });
      }
    }

    const skillsWrap = document.getElementById('caseStudySkills');
    if (skillsWrap) {
      skillsWrap.innerHTML = '';
      if (Array.isArray(data.skills)) {
        data.skills.forEach(skill => {
          const tag = document.createElement('span');
          tag.className = 'sidebar-tag';
          tag.textContent = skill;
          skillsWrap.appendChild(tag);
        });
      }
    }

    // 9. Resources & Documentation (Report / PDF)
    const resourcesBlock = document.getElementById('caseStudyResourcesBlock');
    const reportBtn = document.getElementById('caseStudyReport');
    const reportLabel = document.getElementById('caseStudyReportLabel');
    if (reportBtn) {
      if (data.pdf && data.pdf !== '#') {
        reportBtn.href = data.pdf;
        reportBtn.style.display = 'inline-flex';
        if (reportLabel) reportLabel.textContent = data.pdfLabel || 'Download PDF Report';
        if (resourcesBlock) resourcesBlock.style.display = '';
      } else if (data.report && data.report !== '#') {
        reportBtn.href = data.report;
        reportBtn.style.display = 'inline-flex';
        if (reportLabel) reportLabel.textContent = data.reportLabel || 'Technical Report';
        if (resourcesBlock) resourcesBlock.style.display = '';
      } else {
        reportBtn.style.display = 'none';
        if (resourcesBlock) resourcesBlock.style.display = 'none';
      }
    }

    // Show modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Close modal helper
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Wire Card Click handlers
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't intercept if user clicked on a link or button directly
      if (e.target.closest('a') || e.target.closest('.open-lightbox-btn') || e.target.closest('.screenshot-thumb-btn')) {
        return;
      }
      const pId = card.getAttribute('data-project');
      if (pId) {
        window.openProjectCaseStudy(pId);
      }
    });
  });

  // Wire Inspect Spec buttons
  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pId = btn.getAttribute('data-project') || btn.getAttribute('data-spec');
      if (pId) {
        window.openProjectCaseStudy(pId);
      }
    });
  });
}

/* ==========================================================================
   5. IMAGE LIGHTBOX MODAL (HIGH-RES SCREENSHOT VIEWER)
   ========================================================================== */
function initImageLightboxModal() {
  const lightbox = document.getElementById('imageLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const zoomLevelEl = document.getElementById('lightboxZoomLevel');
  const zoomInBtn = document.getElementById('lightboxZoomInBtn');
  const zoomOutBtn = document.getElementById('lightboxZoomOutBtn');
  const zoomResetBtn = document.getElementById('lightboxZoomResetBtn');
  const openNewTabBtn = document.getElementById('lightboxOpenNewTabBtn');
  const imgContainer = document.querySelector('.lightbox-img-container');
  const triggerBtns = document.querySelectorAll('.open-lightbox-btn, .screenshot-thumb-btn');

  if (!lightbox || !lightboxImg) return;

  // Zoom & Pan State (Sharp Native Resolution Rendering up to 2000%)
  let currentScale = 1.0;
  let panX = 0;
  let panY = 0;
  let baseWidth = 0;
  let baseHeight = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartPanX = 0;
  let dragStartPanY = 0;
  let hasDragged = false;

  function calculateBaseSize() {
    if (!lightboxImg.naturalWidth || !lightboxImg.naturalHeight || !imgContainer) {
      baseWidth = 0;
      baseHeight = 0;
      return;
    }
    const cw = Math.max(280, imgContainer.clientWidth - 48);
    const ch = Math.max(200, imgContainer.clientHeight - 48);
    const fitRatio = Math.min(cw / lightboxImg.naturalWidth, ch / lightboxImg.naturalHeight, 1.0);
    baseWidth = Math.round(lightboxImg.naturalWidth * fitRatio);
    baseHeight = Math.round(lightboxImg.naturalHeight * fitRatio);
  }

  function applyTransform(withTransition = true) {
    if (!baseWidth || !baseHeight) {
      calculateBaseSize();
    }

    if (withTransition) {
      lightboxImg.style.transition = 'width 0.16s ease-out, height 0.16s ease-out, transform 0.16s ease-out';
    } else {
      lightboxImg.style.transition = 'none';
    }

    if (currentScale > 1.001 && baseWidth > 0 && baseHeight > 0) {
      const targetW = Math.round(baseWidth * currentScale);
      const targetH = Math.round(baseHeight * currentScale);
      const wStr = `${targetW}px`;
      const hStr = `${targetH}px`;
      if (lightboxImg.style.width !== wStr) lightboxImg.style.width = wStr;
      if (lightboxImg.style.height !== hStr) lightboxImg.style.height = hStr;
      lightboxImg.style.maxWidth = 'none';
      lightboxImg.style.maxHeight = 'none';
      lightboxImg.style.transform = `translate(${panX}px, ${panY}px)`;
      lightboxImg.classList.add('is-zoomed');

      if (currentScale >= 3.5) {
        lightboxImg.classList.add('is-deep-zoom');
      } else {
        lightboxImg.classList.remove('is-deep-zoom');
      }
    } else {
      currentScale = 1.0;
      panX = 0;
      panY = 0;
      lightboxImg.style.width = '';
      lightboxImg.style.height = '';
      lightboxImg.style.maxWidth = '100%';
      lightboxImg.style.maxHeight = '100%';
      lightboxImg.style.transform = 'none';
      lightboxImg.classList.remove('is-zoomed', 'is-deep-zoom');
    }

    if (zoomLevelEl) {
      zoomLevelEl.textContent = `${Math.round(currentScale * 100)}%`;
    }
  }

  const getZoomStep = (scale, direction = 1) => {
    // Proportional stepping up to 2000% (20.0x):
    // 100% - 250%: step by 0.5 (50%)
    // 250% - 500%: step by 0.75 (75%)
    // 500% - 1000%: step by 1.25 (125%)
    // 1000% - 2000%: step by 2.5 (250%)
    if (direction > 0) {
      if (scale < 2.5) return 0.5;
      if (scale < 5.0) return 0.75;
      if (scale < 10.0) return 1.25;
      return 2.5;
    } else {
      if (scale > 10.0) return 2.5;
      if (scale > 5.0) return 1.25;
      if (scale > 2.5) return 0.75;
      return 0.5;
    }
  };

  function setZoom(newScale, focalX = null, focalY = null) {
    const clampedScale = Math.min(20.0, Math.max(1.0, Math.round(newScale * 10) / 10));
    if (Math.abs(clampedScale - currentScale) < 0.01) return;

    if (clampedScale <= 1.0) {
      panX = 0;
      panY = 0;
    } else if (focalX !== null && focalY !== null && imgContainer) {
      const rect = imgContainer.getBoundingClientRect();
      const offsetX = focalX - (rect.left + rect.width / 2);
      const offsetY = focalY - (rect.top + rect.height / 2);
      const factor = clampedScale / currentScale;
      panX = panX - (offsetX * (factor - 1));
      panY = panY - (offsetY * (factor - 1));
    }
    currentScale = clampedScale;
    applyTransform(true);
  }

  function resetZoom() {
    currentScale = 1.0;
    panX = 0;
    panY = 0;
    applyTransform(true);
  }

  // Global helper to open lightbox
  window.openLightbox = function(imgSrc, title, subtitle) {
    if (!imgSrc) return;
    resetZoom();
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title || 'Evidence Screenshot';
    if (lightboxTitle) lightboxTitle.textContent = title || 'Production Telemetry Screenshot';
    if (lightboxSubtitle) lightboxSubtitle.textContent = subtitle || '';
    if (openNewTabBtn) openNewTabBtn.href = imgSrc;

    baseWidth = 0;
    baseHeight = 0;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    const onImageLoaded = () => {
      calculateBaseSize();
      applyTransform(false);
    };

    if (lightboxImg.complete && lightboxImg.naturalWidth) {
      onImageLoaded();
    } else {
      lightboxImg.onload = onImageLoaded;
    }
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title') || 'Production UI Telemetry Screenshot';
      const subtitle = btn.getAttribute('data-query') || 'MSC IQ Diagnostic Interface & Report';
      window.openLightbox(imgSrc, title, subtitle);
    });
  });

  const closeLightbox = () => {
    resetZoom();
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    const caseStudyModal = document.getElementById('projectCaseStudyModal');
    if (!caseStudyModal || !caseStudyModal.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  };

  // Zoom Button Controls
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setZoom(currentScale + getZoomStep(currentScale, 1));
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setZoom(currentScale - getZoomStep(currentScale, -1));
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      resetZoom();
    });
  }

  // Click on Image to Toggle Zoom (100% <-> 300%)
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    if (hasDragged) {
      hasDragged = false;
      return;
    }
    if (currentScale > 1.05) {
      resetZoom();
    } else {
      setZoom(3.0, e.clientX, e.clientY);
    }
  });

  // Mouse Wheel Zoom
  if (imgContainer) {
    imgContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const step = getZoomStep(currentScale, e.deltaY < 0 ? 1 : -1) * 0.5;
      const delta = e.deltaY < 0 ? step : -step;
      setZoom(currentScale + delta, e.clientX, e.clientY);
    }, { passive: false });
  }

  // Drag to Pan when zoomed
  lightboxImg.addEventListener('mousedown', (e) => {
    if (currentScale <= 1.05) return;
    if (e.button !== 0) return; // Left mouse button only
    e.preventDefault();
    isDragging = true;
    hasDragged = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartPanX = panX;
    dragStartPanY = panY;
    lightboxImg.classList.add('is-panning');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDragged = true;
    }
    panX = dragStartPanX + dx;
    panY = dragStartPanY + dy;
    applyTransform(false);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      lightboxImg.classList.remove('is-panning');
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === imgContainer) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeLightbox();
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      setZoom(currentScale + getZoomStep(currentScale, 1));
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      setZoom(currentScale - getZoomStep(currentScale, -1));
    } else if (e.key === '0' || e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      resetZoom();
    }
  });

  window.addEventListener('resize', () => {
    if (lightbox.classList.contains('open') && lightboxImg.naturalWidth) {
      calculateBaseSize();
      applyTransform(false);
    }
  });
}

/* ==========================================================================
   6. COPY BUTTONS & UTILITIES
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '✓ Copied!';
          btn.style.borderColor = 'var(--green)';
          btn.style.color = 'var(--green)';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });
}

/* ==========================================================================
   7. EXPERIENCE TO PROJECT DEEP-LINKING & HIGHLIGHT PULSE
   ========================================================================== */
function initExperienceProjectJump() {
  const jumpPills = document.querySelectorAll('.exp-jump-pill');

  jumpPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('data-target') || (pill.getAttribute('href') ? pill.getAttribute('href').replace('#', '') : null);
      if (!targetId) return;

      const targetCard = document.getElementById(targetId);
      if (!targetCard) return;

      // If the target project is hidden by active mode tab, switch to 'all' so it is visible
      const activeTab = document.querySelector('.mode-tab.active');
      const targetCategory = targetCard.getAttribute('data-category');
      if (activeTab && activeTab.getAttribute('data-mode') !== 'all') {
        const currentMode = activeTab.getAttribute('data-mode');
        if (targetCategory && currentMode !== targetCategory) {
          const allTab = document.querySelector('.mode-tab[data-mode="all"]');
          if (allTab) allTab.click();
        }
      }

      // Smooth scroll to target card with offset for sticky navbar
      const yOffset = -90;
      const y = targetCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Trigger pulse animation
      targetCard.classList.remove('card-highlight-pulse');
      void targetCard.offsetWidth; // Force DOM reflow
      targetCard.classList.add('card-highlight-pulse');

      setTimeout(() => {
        targetCard.classList.remove('card-highlight-pulse');
      }, 2600);
    });
  });
}
