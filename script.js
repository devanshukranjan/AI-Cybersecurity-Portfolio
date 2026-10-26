/**
 * DEVANSHU KUMAR RANJAN — UNIFIED PORTFOLIO JAVASCRIPT
 * Handles tri-mode spectrum switching, comprehensive project case-study deep dives,
 * evidence galleries with zoom lightbox, and interactive navigation telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initModeSwitcher();
  initProjectCaseStudySystem();
  initImageLightboxModal();
  initCopyButtons();
  initExperienceProjectJump();
  initExperienceInternToggle();
  initProjectsPageFilters();
});

/* ==========================================================================
   0. THEME PREFERENCE
   ========================================================================== */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const root = document.documentElement;

  function updateToggle(theme) {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const label = `Switch to ${nextTheme} theme`;
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    toggle.setAttribute('aria-pressed', String(theme === 'light'));
  }

  const currentTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
  root.dataset.theme = currentTheme;
  updateToggle(currentTheme);

  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (error) {
      // Theme switching still works when browser storage is unavailable.
    }
    updateToggle(nextTheme);
  });
}

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
      const isOpen = dropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
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
      mobileToggle.setAttribute('aria-expanded', String(!isVisible));
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

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 960) {
          navLinks.style.display = 'none';
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

/* ==========================================================================
   2. SPECTRUM CONTROLLER & HOMEPAGE FILTERING
   ========================================================================== */
function initModeSwitcher() {
  const modeTabs = document.querySelectorAll('.mode-tab');
  const projectCards = document.querySelectorAll('#homepageCardsGrid .project-card, .homepage-cards .project-card');
  const modeIndicator = document.getElementById('currentModeLabel');
  const visibleCountEl = document.getElementById('visibleProjectCount');

  if (!modeTabs.length || !projectCards.length) return;

  function applyMode(mode) {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const isFeatured = card.getAttribute('data-featured') === 'true';
      const category = card.getAttribute('data-category'); // 'ai', 'security', 'overlap'

      let show = false;
      if (mode === 'featured') {
        show = isFeatured;
      } else if (mode === 'ai') {
        show = (category === 'ai' || category === 'overlap');
      } else if (mode === 'security') {
        show = (category === 'security' || category === 'overlap');
      } else if (mode === 'overlap') {
        show = (category === 'overlap');
      } else if (mode === 'all') {
        show = true;
      }

      if (show) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // Update active tab buttons
    modeTabs.forEach(tab => {
      const tabMode = tab.getAttribute('data-mode');
      const isActive = tabMode === mode;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update label text
    if (modeIndicator) {
      if (mode === 'featured') modeIndicator.textContent = 'Featured (6 Flagship Systems)';
      if (mode === 'ai') modeIndicator.textContent = 'AI Engineering & Production LLMs Focus';
      if (mode === 'security') modeIndicator.textContent = 'Cybersecurity, Threat Detection & SOC Operations Focus';
      if (mode === 'overlap') modeIndicator.textContent = 'AI × Security (Core Hybrid Edge)';
      if (mode === 'all') modeIndicator.textContent = 'All Engineering Systems';
    }

    if (visibleCountEl) {
      visibleCountEl.textContent = visibleCount;
    }
  }

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-mode') || 'featured';
      applyMode(mode);
    });
  });

  // Hero CTA quick jump buttons
  const modeJumps = document.querySelectorAll('[data-mode-jump]');
  modeJumps.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMode = btn.getAttribute('data-mode-jump');
      if (targetMode) {
        applyMode(targetMode);
      }
    });
  });

  // Handle URL hash on load
  const hash = window.location.hash;
  if (hash === '#ai-systems') {
    applyMode('ai');
  } else if (hash === '#security-labs') {
    applyMode('security');
  } else if (hash === '#intersection') {
    applyMode('overlap');
  } else {
    // Default to 'featured'
    applyMode('featured');
  }
}

/* ==========================================================================
   3. COMPREHENSIVE PROJECT CASE STUDIES DATA STORE (12 PROJECTS)
   ========================================================================== */
const PROJECT_CASE_STUDIES = {
  'mtech-dissertation': {
    title: 'Privacy-Preserving Federated Sequential Recommendation',
    category: 'M.Tech Research Thesis',
    categoryBadgeClass: 'badge-overlap',
    provenance: 'NIT Patna • Master\'s Thesis',
    provenanceBadgeClass: 'badge-research',
    pipeline: [
      { step: '01', title: 'Edge User Trajectories', icon: 'fa-file-lines', type: 'Local Edge Client', desc: 'Captures chronological user interaction trajectories s = (i_1, i_2, ..., i_T) on local client devices without transmitting raw event logs.', chips: ['Local Interaction Sequence', 'Temporal Trajectories', 'Edge Boundary'] },
      { step: '02', title: 'LDP-SeqMask Perturbation', icon: 'fa-shield-halved', type: 'Local Differential Privacy', active: true, desc: 'Injects calibrated Laplace noise locally into item transition vectors, eliminating numerical instability and gradient explosion of standard Exponential Mechanisms while bounding sensitivity under formal (ε, δ)-DP bounds.', chips: ['Calibrated Laplace Noise', 'Bounded Sensitivity', 'No Gradient Divergence', 'Differential Privacy'] },
      { step: '03', title: 'View-CL Contrastive Learning', icon: 'fa-layer-group', type: 'Self-Supervised Learning', desc: 'Constructs multiple noisy augmented views of sequential states and maximizes mutual information to cancel out stochastic noise distortion.', chips: ['View-CL', 'Mutual Information Maximization', 'Noise Resilience'] },
      { step: '04', title: 'Federated Aggregation', icon: 'fa-database', type: 'Central Server Node', desc: 'Simulates federated training across 1,000+ heterogeneous client partitions, aggregating private Laplace parameter updates without central clickstream leakage or gradient divergence.', chips: ['Federated Optimization', '1,000+ Client Nodes', 'Laplace Aggregation', 'Zero Leakage'] },
      { step: '05', title: 'Global Recommendation Model', icon: 'fa-square-check', type: 'Inference Model', desc: 'Produces ID-based and ID-free sequential recommendation models recovering top-K recall within 4.2% of unperturbed centralized baselines.', chips: ['NDCG@10 Recovery', 'Privacy Guarantees', 'ID-Free Architecture'] }
    ],
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
    title: 'Hermes — Autonomous AI-Based Threat Detection & Elimination Engine',
    category: 'AI Security & Autonomous Response',
    categoryBadgeClass: 'badge-overlap',
    provenance: 'Independent AI Security Research',
    provenanceBadgeClass: 'badge-research',
    summary: 'Autonomous AI-driven intrusion detection & threat elimination engine trained on 200,043 network flows (UGRansome2024 + UNSW-NB15). Fuses Tab2Image 2D CNN spatial feature projection (96.9% accuracy) with an unsupervised Deep Autoencoder for zero-day discovery, backed by a Random Forest + XGBoost ensemble (98.6% accuracy, 1.4% FPR) and a live Tkinter SOC console executing automated host quarantine.',
    pipeline: [
      { step: '01', title: 'Dual Telemetry Ingestion', icon: 'fa-network-wired', type: 'Dataset Fusion & Sanitization', desc: 'Merges 200,043 network flow records across UGRansome2024 (ransomware/zero-day) and UNSW-NB15 (51,000 benign baseline flows). Drops identifier fields (srcip, dstip, id) to prevent spatial/temporal bias and target leakage.', chips: ['200,043 Network Flows', 'UGRansome2024', 'UNSW-NB15', 'Zero Identifier Leakage'] },
      { step: '02', title: 'Feature Selection & SMOTE', icon: 'fa-filter', type: 'Stratified Preprocessing', desc: 'Executes SelectKBest with ANOVA F-test (f_classif, k=48) and MinMaxScaler normalization. Enforces strict stratified 80/20 train-test split (160,034 train / 40,009 test) before applying SMOTE to prevent synthetic sample leakage into evaluation.', chips: ['SelectKBest (k=48)', 'MinMaxScaler', 'Post-Split SMOTE', 'Class Rebalancing'] },
      { step: '03', title: 'Tab2Image 2D Spatial CNN', icon: 'fa-layer-group', type: 'Spatial Feature Projection', desc: 'Projects flat 48-feature vectors into an (8, 6, 1) spatial 2D matrix. Dual Conv2D layers (32 & 64 filters) with BatchNormalization and Dropout (0.4) capture non-linear cross-feature spatial relationships, achieving 96.9% accuracy.', chips: ['(8,6,1) Spatial Matrix', 'Conv2D + BatchNorm', '96.9% Accuracy', 'Dropout (0.4)'] },
      { step: '04', title: 'Zero-Day Deep Autoencoder', icon: 'fa-brain', type: 'Unsupervised Anomaly Bottleneck', desc: 'Deep bottleneck autoencoder (48 -> 64 -> 32 -> 16 -> 32 -> 64 -> 48) trained exclusively on normal traffic. Calculates MSE reconstruction error against a calibrated 95th-percentile cutoff (threshold 0.05) to flag novel zero-days.', chips: ['16-Dim Bottleneck', 'MSE Reconstruction', '95th Percentile (0.05)', 'Zero-Day Detection'] },
      { step: '05', title: 'Ensemble Voting Consensus', icon: 'fa-shield-halved', type: 'Consensus Decision Engine', active: true, desc: 'Soft voting ensemble combining Random Forest (200 trees, 98.6% accuracy, 1.4% FPR), XGBoost (200 trees, 98.3%), and 2D CNN. The Autoencoder acts as an autonomous override: if classifiers predict Normal but reconstruction error > 0.05, it flags a zero-day.', chips: ['Random Forest 98.6%', 'XGBoost 98.3%', 'Zero-Day Override', 'Soft Voting'] },
      { step: '06', title: 'Autonomous Threat Elimination', icon: 'fa-bolt', type: 'Automated SOC Response', desc: 'Real-time Tkinter SOC console with SHA-256 analyst authentication, 2-second streaming telemetry, automated IP firewall quarantine (Windows Firewall / iptables), active socket termination, and forensic event exports.', chips: ['Automated IP Quarantine', 'Socket Termination', '2s Live Stream', 'SHA-256 Auth', 'Forensic Export'] }
    ],
    objective: 'Build an operational, portfolio-grade AI threat detection and elimination engine that moves beyond notebook toy benchmarks: train dual supervised classifiers, novel 2D spatial CNNs, and unsupervised zero-day autoencoders on 200,043 network flows, exposed through a real-time SOC console with automated firewall quarantine.',
    process: [
      'Merged ransomware traffic from UGRansome2024 with 51,000 benign network flows from UNSW-NB15 to create a robust 200,043-row balanced corpus, stripping raw IP addresses to eliminate spatial bias.',
      'Selected the top 48 features via SelectKBest ANOVA F-test and scaled attributes with MinMaxScaler; enforced stratified 80/20 split before SMOTE oversampling to protect test-set integrity.',
      'Engineered Tab2Image spatial representation converting 48 numerical features into an (8, 6, 1) matrix, detecting cross-variable attack correlations with a deep Conv2D neural network (96.9% accuracy).',
      'Constructed a 7-layer symmetrical Deep Autoencoder bottleneck (48->64->32->16->32->64->48) trained exclusively on normal traffic, setting a 95th-percentile MSE anomaly threshold (0.05) to flag zero-day vectors.',
      'Constructed a multi-model soft voting ensemble combining Random Forest (98.6% accuracy, 1.4% FPR), XGBoost (98.3%), and CNN, with automatic autoencoder override for zero-day traffic.',
      'Engineered the Hermes Tkinter SOC analyst dashboard featuring SHA-256 user authentication, live packet monitoring every 2s, automated firewall quarantine rules, and defensible audit log exports.'
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
      'RandomForestClassifier achieved 98.6% accuracy with a 1.4% false-positive rate across 40,009 test samples, matching XGBoost at 98.3% accuracy.',
      'The Tab2Image 2D CNN attained 96.9% accuracy, demonstrating that spatial matrix projection allows convolutional filters to discover multi-variable attack signatures missed by flat models.',
      'The unsupervised Deep Autoencoder successfully caught zero-day anomalies by flagging flows exceeding the 0.05 MSE reconstruction error threshold on normal traffic.',
      'Live SOC automation executes automated IP blocking rules within milliseconds of anomaly confirmation, eliminating manual triage delay.'
    ],
    learned: 'Hermes proves that enterprise AI intrusion detection requires defense-in-depth: combining high-precision supervised classifiers (Random Forest/XGBoost) for known signatures, 2D CNNs for spatial pattern detection, and unsupervised autoencoders for zero-day anomalies, paired with automated containment.',
    tools: ['Python 3.10', 'Tkinter GUI', 'TensorFlow / Keras', 'Scikit-learn', 'XGBoost', 'SMOTE', 'Pandas', 'NumPy', 'Joblib'],
    skills: ['Autonomous Threat Elimination', 'Tab2Image 2D CNN', 'Deep Autoencoder Zero-Day Discovery', 'Ensemble Soft Voting', 'SOC Console Engineering'],
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
    pipeline: [
      { step: '01', title: 'Bot-IoT Dataset Intake', icon: 'fa-file-lines', type: 'High-Volume Dataset', desc: 'Ingests 3.66M network flow records from the Bot-IoT dataset across 43 raw telemetry features.', chips: ['3.66M Records', '43 Raw Features', 'IoT Traffic'] },
      { step: '02', title: 'Leakage Removal', icon: 'fa-filter', type: 'Preprocessing', desc: 'Combines raw Bot-IoT 5% CSVs, removes target-leakage fields (IP/MAC bias), encodes categorical attributes, and standardizes continuous flow telemetry.', chips: ['Zero Data Leakage', 'Categorical Encoding', 'Standardization', 'Identifier Removal'] },
      { step: '03', title: 'Genetic Optimizer', icon: 'fa-dna', type: 'Heuristic Search', active: true, desc: 'Evolves 43-bit binary chromosomes across 50 population candidates with uniform crossover and mutation rate 0.4, halting at generation 21 via adaptive early stopping with hybrid CFS + XGBoost G-Mean fitness.', chips: ['Population 50', 'Mutation Rate 0.4', 'Gen 21 Early Stop', 'Hybrid CFS + G-Mean'] },
      { step: '04', title: '22-Feature Subspace', icon: 'fa-layer-group', type: 'Optimized Feature Matrix', desc: 'Reduces feature space by 48.8% (43 down to 22 features), slashing training latency while preserving critical attack signals.', chips: ['48.8% Reduction', '22 Optimal Features'] },
      { step: '05', title: 'XGBoost Classification', icon: 'fa-brain', type: 'Inference Engine', desc: 'Trains XGBoost classifier on a stratified 70/30 train/test split. Evaluated on 1,100,557 test records, achieving 1.00 F1-score across Normal, DDoS, DoS, Reconnaissance, and Theft classes.', chips: ['70/30 Train/Test', '1,100,557 Test Records', '1.00 F1-Score', '5 Attack Classes'] }
    ],
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
    pipeline: [
      { step: '01', title: 'Dashboard Query', icon: 'fa-file-lines', type: 'Input Ingestion', desc: 'Accepts English & Hinglish seller queries (e.g. "ACOS kyu badha pichle hafte?") via AskAssistant.jsx; ms-auth-manager validates JWT & plan credits.', chips: ['FastAPI', 'JWT Auth', 'Hinglish Parsing'] },
      { step: '02', title: 'Supervisor Routing', icon: 'fa-diagram-project', type: 'Agent Orchestration', desc: 'LangGraph multi-agent supervisor (Gemini 2.5 Flash) merges query frame with memory episodes and routes to the primary engine: rca_analytics.', chips: ['LangGraph', 'Gemini 2.5 Flash', 'Intent Routing'] },
      { step: '03', title: 'Multi-Window Baseline', icon: 'fa-layer-group', type: 'Time-Series Prep', desc: 'Splits advertising metrics into fair equal-length evaluation windows: baseline period (t-1) vs. current investigation period (t).', chips: ['Equal-Length Windows', 'Time-Series Analysis'] },
      { step: '04', title: 'Statistical Thresholding', icon: 'fa-database', type: 'Analytical Engine', active: true, desc: 'Computes dynamic per-account thresholds (μ + 1.5σ) over 30/60-day historical rolling windows with minimum-data confidence guards to prevent false anomalies.', chips: ['Dynamic μ + 1.5σ', 'Rolling Windows', 'Confidence Guards'] },
      { step: '05', title: '50+ Evaluation Rules', icon: 'fa-shield-halved', type: 'Diagnostic Rules Engine', desc: 'Evaluates 50+ deterministic rules across Sponsored Products, Brands, and Display for bid shifts, budget exhaustion, and Buy Box loss, pairing negative keyword generation with mathematical over-blocking protection to protect profitable parent queries.', chips: ['50+ Rules', 'Negative Keyword Generator', 'Over-blocking Protection', 'Bid/Budget Audits'] },
      { step: '06', title: 'Structured Insights', icon: 'fa-square-check', type: 'Output Formatter & Contract', desc: 'Synthesizes typed contract with 6 sections: Summary Card, 2x Data Tables, Root Causes, Changes Log, and 1-click Downloadable Negative Keyword bulk files.', chips: ['Typed Contract', 'RCAReport.jsx', '1-Click Action Cards'] }
    ],
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
      'Shipped 15 live production diagnostics (ACOS Spikes, Wasted Spend, CPC Spikes, Impressions Drop, CTR Drop, Ad CVR Drop, ROAS Drop, etc.) out of 30 total diagnostics across 50+ root-cause rules.',
      'Dynamic statistical thresholding eliminated 68% of false positive alerts previously caused by normal seasonal fluctuations.',
      'Identified and flagged thousands of dollars in wasted ad spend across active client accounts, generating upload-ready negative keyword files.',
      'Designed architectural expansion path across 30 total diagnostics spanning Advertising, Inventory, Orders, and Business domains.'
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
    pipeline: [
      { step: '01', title: 'Raw Taxonomy CSV', icon: 'fa-file-lines', type: 'Ingestion Input', desc: 'Ingests multi-marketplace category hierarchies across Amazon, Walmart, ONDC, and Flipkart with varying delimiter structures.', chips: ['Raw CSV Ingestion', 'Multi-Marketplace', 'Taxonomy Trees'] },
      { step: '02', title: 'Breadcrumb Normalizer', icon: 'fa-filter', type: 'Preprocessing Pipeline', desc: 'Unifies hierarchy delimiters, strips promotional stopwords, and preserves root-to-leaf semantic depth hierarchy.', chips: ['clean_breadcrumbs.py', 'Depth Preservation', 'Stopword Removal'] },
      { step: '03', title: 'Dense Embeddings', icon: 'fa-brain', type: 'Embedding Generation', desc: 'Generates high-dimensional semantic representations using OpenAI text-embedding-3-large (3,072 dimensions) with stateful batch checkpointing.', chips: ['3,072 Dimensions', 'text-embedding-3-large', 'Checkpointing'] },
      { step: '04', title: 'PostgreSQL + pgvector', icon: 'fa-database', type: 'Vector Database Storage', active: true, desc: 'Stores embeddings in dedicated taxonomy tables with IVFFLAT vector indexing (vector_cosine_ops, lists=100) for sub-50ms nearest neighbor search.', chips: ['PostgreSQL', 'pgvector IVFFLAT', 'Sub-50ms Retrieval'] },
      { step: '05', title: 'Disambiguation API', icon: 'fa-square-check', type: 'FastAPI Microservice', desc: 'FastAPI microservice (/api/v1/category-mapper) performing cosine similarity lookups and serving interactive disambiguation chips.', chips: ['FastAPI', 'Cosine Similarity', 'Disambiguation UX'] }
    ],
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
    pipeline: [
      { step: '01', title: 'Browse Node Queue', icon: 'fa-compass', type: 'Catalog Taxonomy Queue', desc: 'Traverses top 25 best-seller category browse nodes across global marketplaces using modular schema adapters (Amazon, ONDC, Walmart, Flipkart, eBay).', chips: ['Top 25 Browse Nodes', 'Modular Adapters', 'Multi-Marketplace'] },
      { step: '02', title: 'Listing Discovery Crawler', icon: 'fa-filter', type: 'Stage 1: URL Discovery', desc: 'Stage 1 crawler isolates product ASIN and item ID collection from heavy extraction, queuing thousands of catalog targets with minimal overhead.', chips: ['Stage 1 Crawler', 'ASIN Harvesting', 'Fast Discovery'] },
      { step: '03', title: 'Deep Extraction Workers', icon: 'fa-layer-group', type: 'Stage 2: Multithreaded Zyte', active: true, desc: 'Stage 2 multithreaded Zyte API extraction pool operating at 1,000 req/min with automated exponential backoff, harvesting specs, pricing, ratings, reviews, and media.', chips: ['Zyte API @ 1,000 req/min', 'Anti-Ban Spoofing', 'Auto Backoff', 'Rich Media'] },
      { step: '04', title: 'MongoDB Atlas Ingestion', icon: 'fa-database', type: 'Document Persistence', desc: 'Validates schemas and persists structured e-commerce documents and category node hierarchies into indexed MongoDB Atlas collections.', chips: ['MongoDB Atlas', 'Indexed Collections', 'Product Documents', 'Category Nodes'] },
      { step: '05', title: 'Monthly Cron Trigger', icon: 'fa-clock-rotate-left', type: 'Automated Pipeline Trigger', desc: 'Autonomous monthly cron scheduler executes end-to-end catalog crawls and automatically triggers the downstream Multimodal Text & Image Insight Pipeline upon completion.', chips: ['Monthly Cron Trigger', 'Zero Manual Ops', 'Downstream Insight Dispatch'] }
    ],
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
    pipeline: [
      { step: '01', title: 'Top 25 Catalog ASINs', icon: 'fa-file-lines', type: 'Catalog Ingestion', desc: 'Monthly scraped product catalog queue ingests top 25 category best-sellers across Amazon, ONDC, Walmart, Flipkart, and eBay.', chips: ['Monthly Scraping', 'Top 25 Best-Sellers', 'Multi-Marketplace'] },
      { step: '02', title: 'Dual-Modal Extraction', icon: 'fa-diagram-project', type: 'Feature Extraction', desc: 'Parallel extraction orchestrator: text worker analyzes title lengths, keyword frequencies, and bullet clusters; image worker classifies 6 visual types (white background, lifestyle, infographic, dimension, packaging, close-up).', chips: ['Title Hook Mining', 'Bullet Clustering', '6 Image Visual Types', 'Composition Audits'] },
      { step: '03', title: 'Gemini Batch Runner', icon: 'fa-layer-group', type: 'GenAI File API Pool', active: true, desc: 'Batch runner with Gemini File API, intelligent multi-key round-robin rotation, 1.5-hour error cooldowns, and automatic resume-on-failure retry queues.', chips: ['Gemini File API', 'Multi-Key Rotation', '1.5-Hour Cooldown', 'Zero Quota Starvation'] },
      { step: '04', title: 'PostgreSQL Taxonomy', icon: 'fa-database', type: 'Relational DB Records', desc: 'Persists structured JSON outputs directly into dedicated text_insights and image_insights columns in marketplace PostgreSQL taxonomy tables.', chips: ['PostgreSQL Partitioning', 'JSON Schema Synthesis', '3,072-dim Embeddings'] },
      { step: '05', title: 'Category Benchmarks', icon: 'fa-square-check', type: 'Downstream Strategy', desc: 'Delivers actionable category creative blueprints identifying an 84%+ lifestyle and 92%+ infographic visual adoption rate among leaders.', chips: ['Actionable Insights', 'Brand Benchmarking', 'Conversion Uplift'] }
    ],
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
    pipeline: [
      { step: '01', title: 'Top 25 A+ Banners', icon: 'fa-file-lines', type: 'Competitor Ingestion', desc: 'Ingests top 25 category ASIN details and competitor Amazon A+ visual banner modules from monthly scraped databases.', chips: ['Amazon A+ Banners', 'Module Deconstruction', 'Top 25 ASINs'] },
      { step: '02', title: 'Vision Crop Analysis', icon: 'fa-crop', type: 'Computer Vision', desc: 'Performs rule-of-thirds composition analysis, color contrast evaluation, and background layout segmentation.', chips: ['OpenCV / Pillow', 'Rule of Thirds', 'Color Contrast'] },
      { step: '03', title: 'Gemini 2.5 Flash Vision', icon: 'fa-brain', type: 'Multimodal Deconstruction', active: true, desc: 'Deconstructs visual design patterns, product placement, and headline messaging for Amazon A+ content modules (Module 5 live; 40-module roadmap).', chips: ['Gemini 2.5 Flash Vision', 'Module 5 Live', '19 Std + 21 Prem'] },
      { step: '04', title: 'PostgreSQL Taxonomy Store', icon: 'fa-database', type: 'Relational DB Records', desc: 'Stores category-level synthesized creative blueprints in dedicated aplus_insights_<run_id> columns partitioned by category and date.', chips: ['PostgreSQL Schema', 'aplus_insights', 'Partitioned Storage'] },
      { step: '05', title: 'Creative Blueprint', icon: 'fa-square-check', type: 'Automated Synthesis', desc: 'Outputs structured creative blueprints with headline hooks, background guidelines, and visual archetypes for automated A+ generation.', chips: ['Creative Synthesis', 'Layout Archetypes', 'Zero Manual Copywriting'] }
    ],
    architecture: `
[ Top 25 Category ASIN Details & Competitor A+ Banners ]
                        │
                        ▼
[ Preprocessing & Computer Vision Crop Analysis ]
  • Visual design patterns, product placement, and background settings
  • Color contrast, visual balance, and rule-of-thirds composition
                        │
                        ▼
[ Gemini 2.5 Flash Vision Multimodal Module Deconstruction ]
  • Focuses on Module 5: Standard Image & Dark Text Overlay
  • Extracts core product message, key features, and customer benefits
  • Analyzes headline messaging, body copy density, and brand positioning
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
    objective: 'Develop an automated multimodal intelligence system to analyze competitor brand positioning, visual design patterns, product placement, background settings, and headline messaging from top-selling Amazon A+ content modules to drive automated A+ generation.',
    process: [
      'Ingested full product details and high-resolution A+ banner assets across top 25 category best-sellers.',
      'Developed vision evaluation prompts for Gemini 2.5 Flash analyzing visual composition, background ambiance, lighting, and product placement.',
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
    learned: 'Analyzing rich A+ content requires pairing visual design patterns, product placement, and background settings with clear headline messaging. Storing structured insights in the existing taxonomy PostgreSQL schema created a unified, queryable intelligence layer for downstream creative agents.',
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
    pipeline: [
      { step: '01', title: 'User Query & Auth', icon: 'fa-comments', type: 'Frontend Ingestion', desc: 'Accepts natural language seller queries in MSC IQ; validated with JWT authentication and plan credits via ms-auth-manager middleware.', chips: ['MSC IQ Assistant', 'FastAPI Stream', 'JWT Validation', 'RBAC Middleware'] },
      { step: '02', title: '/category-mapper Service', icon: 'fa-diagram-project', type: 'Vector Disambiguation', desc: 'Computes pgvector cosine similarity against 3,072-dimensional taxonomy embeddings and returns interactive disambiguation chips under 50ms.', chips: ['pgvector Cosine Search', 'Sub-50ms Latency', 'Dynamic Chips'] },
      { step: '03', title: '/insights RAG Retrieval', icon: 'fa-database', type: 'Knowledge Store', active: true, desc: 'High-concurrency microservice fetching structured pre-computed category JSON insights (pricing distributions, coupon trends, keywords) with DB connection pooling.', chips: ['/api/v1/insights', 'Connection Pooling', 'Zero Hallucination', 'JSON Insights'] },
      { step: '04', title: 'Context Augmented LLM', icon: 'fa-brain', type: 'Grounded Generation', desc: 'Injects verified category benchmarks and quantitative bounds into the LLM context prompt to generate factual strategic recommendations.', chips: ['Prompt Grounding', 'Context Injection', 'Pydantic Schemas'] },
      { step: '05', title: 'Interactive Chat Stream', icon: 'fa-square-check', type: 'Response Streaming', desc: 'Streams responses via SSE with interactive category chips, product details (/api/v1/product-details), and formatted comparison tables.', chips: ['SSE Streaming', '/api/v1/product-details', 'Sub-100ms First Token', '100% Grounded'] }
    ],
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
    pipeline: [
      { step: '01', title: 'Inbound User Query', icon: 'fa-file-lines', type: 'Untrusted Ingestion', desc: 'Accepts enterprise user prompts through the secured API gateway with session token validation.', chips: ['Gateway Auth', 'Session State', 'Untrusted Input'] },
      { step: '02', title: 'NeMo Guardrails Interceptor', icon: 'fa-shield-halved', type: 'Input Firewall', desc: 'Runs heuristic jailbreak filters, detects prompt injection attempts, and redacts sensitive PII and credential tokens.', chips: ['NeMo Guardrails', 'PII Redaction', 'Anti-Jailbreak'] },
      { step: '03', title: 'LangGraph Supervisor', icon: 'fa-diagram-project', type: 'Agent Orchestration', active: true, desc: 'Routes stateful tasks across specialized agent nodes using StateGraph workflows and strict permission boundaries.', chips: ['LangGraph', 'StateGraph Workflows', 'RBAC Validation'] },
      { step: '04', title: 'Hybrid pgvector Search', icon: 'fa-database', type: 'Secure Vector Retrieval', desc: 'Combines dense vector similarity with sparse BM25 lexical search and cross-encoder re-ranking under tenant isolation.', chips: ['Hybrid Search', 'Dense + BM25', 'Tenant Isolation'] },
      { step: '05', title: 'Dual LLM Verifier & SIEM', icon: 'fa-square-check', type: 'Auditing & Telemetry', desc: 'Secondary auditor model verifies generated response for secret leakage, exfiltration, or hallucinations; exports traces to Splunk SIEM.', chips: ['Dual Verification', 'Langfuse Tracing', 'Splunk SIEM Export'] }
    ],
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
        title: 'Console Telemetry & Guardrail Interceptor',
        isPlaceholder: true,
        alt: 'Under Active Development — Architecture implementation in progress. System telemetry and interface artifacts pending completion.',
        caption: 'Project currently in active research & engineering phase. Architecture blueprints and LangGraph guardrail pipelines are defined; console interface telemetry will be published upon final integration testing.'
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
    title: 'Splunk SIEM Lab — Multi-Stage Attack Detection & Security Operations Monitoring',
    category: 'SIEM • SOC Monitoring',
    categoryBadgeClass: 'badge-security',
    provenance: 'Hands-On SOC Lab • Enterprise SIEM',
    provenanceBadgeClass: 'badge-personal',
    summary: 'Full-cycle enterprise SOC monitoring lab deploying Splunk Enterprise 9.x to ingest live authentication and Apache telemetry from an Ubuntu web server over Universal Forwarder (port 9997). Simulated multi-vector adversary attacks with Hydra (620 failed SSH logins) and Nikto web vulnerability scans, establishing custom SPL detection rules, real-time alerting triggers, and a unified incident dashboard.',
    pipeline: [
      { step: '01', title: 'Enterprise SOC Architecture', icon: 'fa-server', type: 'Lab Virtualization', desc: 'Configured an enterprise SOC lab pairing an Ubuntu Server 22.04 Apache web target with a dedicated Splunk Enterprise 9.x SIEM indexer and a Kali Linux attacker VM.', chips: ['Splunk Enterprise 9.x', 'Ubuntu Server 22.04', 'Kali Linux', 'Enterprise Subnet'] },
      { step: '02', title: 'Universal Forwarder Ingest', icon: 'fa-network-wired', type: 'Log Pipeline & Ingestion', desc: 'Configured Splunk Universal Forwarder on port 9997, streaming auth.log, syslog, and Apache access/error logs into dedicated index=security and index=web partitions with zero ingestion delay.', chips: ['Port 9997 Forwarder', 'auth.log & syslog', 'Apache Access Logs', 'Zero Packet Loss'] },
      { step: '03', title: 'Hydra & Nikto Adversary Run', icon: 'fa-skull', type: 'Threat Emulation', desc: 'Emulated multi-stage attacks: Hydra executed an automated SSH brute-force attack (generating 620 failed logins), while Nikto scanned Apache endpoints, generating bursts of 404 access events.', chips: ['Hydra 620 SSH Failures', 'Nikto Web Scanner', 'Status 404 Burst', 'Attacker IP Attribution'] },
      { step: '04', title: 'Custom SPL Threat Hunting', icon: 'fa-magnifying-glass-chart', type: 'Correlation & Querying', active: true, desc: 'Authored high-precision SPL correlation queries: thresholding failed SSH logins (>10 attempts by source IP) and grouping web scanner spikes by client IP within 1-minute time buckets.', chips: ['Custom SPL Queries', 'Failed Login Threshold', 'Time-Bucket Aggregation', 'Indicator Triage'] },
      { step: '05', title: 'Real-Time Alerts & Dashboard', icon: 'fa-shield-halved', type: 'Incident Detection & Visualization', desc: 'Constructed a multi-panel SOC dashboard visualizing failed authentication trends, top malicious IP addresses, and HTTP error distributions, backed by automated real-time alert triggers.', chips: ['Real-Time Alert Trigger', 'Multi-Panel Dashboard', 'Top Attacker Attribution', 'Incident Response'] }
    ],
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
    title: 'DoS Attack Simulation & Protocol Traffic Forensics on Metasploitable 2',
    category: 'Network Protocol Analysis',
    categoryBadgeClass: 'badge-security',
    provenance: 'Packet Traffic Forensics Lab • Kali Linux & Wireshark',
    provenanceBadgeClass: 'badge-personal',
    summary: 'Comprehensive Denial of Service simulation and protocol traffic forensics lab conducted in an isolated virtualized environment. Executed 6 distinct DoS attack vectors from Kali Linux against Metasploitable 2, performing deep packet inspection in Wireshark to isolate socket starvation signatures, half-open connection queues, ICMP diagnostics, and formulating defensive detection rules.',
    pipeline: [
      { step: '01', title: 'Isolated Lab Virtualization', icon: 'fa-server', type: 'Virtual Network Setup', desc: 'Constructed an isolated VirtualBox host-only subnet (192.168.56.0/24) pairing a Kali Linux attacking VM (192.168.56.101) with a vulnerable Metasploitable 2 target (192.168.56.102).', chips: ['VirtualBox Host-Only', 'Kali Linux', 'Metasploitable 2', 'Bridged Subnet'] },
      { step: '02', title: 'Slowloris HTTP Starvation', icon: 'fa-hourglass-half', type: 'Application-Layer Attack', desc: 'Simulated Slowloris using Nmap NSE and Perl scripts, transmitting incomplete HTTP GET headers at periodic keep-alive intervals to hold Apache port 80 worker threads open until connection pool starvation.', chips: ['Partial HTTP GETs', 'Keep-Alive Headers', 'Port 80 Starvation', 'Nmap NSE'] },
      { step: '03', title: 'TCP SYN Flood Attack', icon: 'fa-network-wired', type: 'Transport-Layer Attack', desc: 'Executed high-volume SYN flood with hping3 (-S -p 80 --flood --rand-source), flooding the target with unacknowledged TCP SYN packets and saturating the half-open connection backlog queue.', chips: ['hping3 SYN Flood', 'Half-Open Connections', 'Backlog Saturation', 'Spoofed IPs'] },
      { step: '04', title: 'UDP Flood Diagnostics', icon: 'fa-triangle-exclamation', type: 'UDP Saturation & Diagnostics', desc: 'Bombarded target with high-velocity UDP datagrams across random ports, verifying system degradation via sustained ICMP Destination Unreachable (Type 3, Code 3: Port Unreachable) responses.', chips: ['UDP Datagram Burst', 'ICMP Destination Unreachable', 'Port 3 Unreachable'] },
      { step: '05', title: 'TCP FIN & PSH+ACK Floods', icon: 'fa-shield-halved', type: 'Control Flag Anomalies', desc: 'Transmitted abnormal TCP FIN and PSH+ACK packet streams bypassing naive stateless packet filters, forcing the target operating system stack to allocate immediate kernel buffer processing cycles.', chips: ['TCP FIN Spikes', 'PSH+ACK Flooding', 'Stateful Inspection', 'Kernel Buffers'] },
      { step: '06', title: 'Wireshark Packet Forensics', icon: 'fa-magnifying-glass-chart', type: 'Deep Packet Forensics', active: true, desc: 'Captured full pcap traces in Wireshark, analyzed TCP conversation statistics and IO graphs, extracted protocol anomalies, and formulated deterministic Snort/Suricata IDS detection rules.', chips: ['Deep Packet Inspection', 'IO Graph Analysis', 'Snort/Suricata Signatures', 'PCAP Forensics'] }
    ],
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
    provenance: 'Digital Disk Forensics Lab • Sleuth Kit & FTK',
    provenanceBadgeClass: 'badge-personal',
    summary: 'End-to-end digital disk forensics investigation on raw and Expert Witness (.E01) disk images. Followed strict chain-of-custody protocols with MD5 and SHA-1 hash integrity verification, automated Autopsy ingest module processing, keyword indexing, FTK Imager hexadecimal file carving of deleted PDF documents from $RECYCLE.BIN, and defensible chronological timeline reporting.',
    pipeline: [
      { step: '01', title: 'Evidence Intake & Hash Seals', icon: 'fa-file-shield', type: 'Chain of Custody', desc: 'Secured evidentiary disk image (.dd / .E01) with cryptographic MD5 and SHA-1 verification hashes, establishing an uncompromised chain of custody before forensic mounting.', chips: ['Cryptographic MD5 & SHA-1', 'Forensic Image Intake', 'Chain of Custody', 'Integrity Sealed'] },
      { step: '02', title: 'Autopsy Ingest & Parsing', icon: 'fa-folder-tree', type: 'Automated Ingest Modules', desc: 'Executed Autopsy automated ingest modules: volume partition parsing, MIME type resolution, extension mismatch detection, and unallocated cluster indexing.', chips: ['Autopsy Ingest Modules', 'Partition Table Parsing', 'MIME Resolution', 'Extension Mismatch'] },
      { step: '03', title: 'Keyword Search & Unallocated Triage', icon: 'fa-magnifying-glass', type: 'Evidence Set Reduction', desc: 'Executed targeted keyword and regex queries across unallocated clusters, filtering through gigabytes of raw data to identify suspect communication strings and hidden files.', chips: ['Keyword Indexing', 'Regex Querying', 'Cluster Analysis', 'Data Reduction'] },
      { step: '04', title: 'Hex Signature Carving', icon: 'fa-code', type: 'Deleted Artifact Carving', active: true, desc: 'Utilized FTK Imager to perform byte-level signature carving in $RECYCLE.BIN. Verified PDF magic header (25 50 44 46: %PDF-) and EOF trailer (25 45 4F 46: %%EOF), recovering intact evidentiary documents.', chips: ['FTK Imager Carving', 'Magic Header 25 50 44 46', 'EOF Trailer 25 45 4F 46', 'Recycle Bin Recovery'] },
      { step: '05', title: 'Timeline & Forensic Report', icon: 'fa-timeline', type: 'Incident Chronology & Report', desc: 'Reconstructed a chronological activity timeline from file MACB timestamps and generated comprehensive, court-defensible forensic reports cataloging findings and attribution evidence.', chips: ['MACB Timestamps', 'Chronological Timeline', 'Court-Defensible DFIR', 'Formal Case Report'] }
    ],
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
  },

  'osint-missing-person': {
    title: 'OSINT Investigation: Missing Person Geolocation & Entity Resolution',
    category: 'OSINT • Geospatial Recon',
    categoryBadgeClass: 'badge-security',
    provenance: 'Hands-On OSINT Lab • TryHackMe',
    provenanceBadgeClass: 'badge-personal',
    pipeline: [
      { step: '01', title: 'Artifact Intake & EXIF', icon: 'fa-file-lines', type: 'Metadata Forensics', desc: 'Ingests uncaptioned photos (MotoGP.jpg, food.jpg) and extracts camera metadata using exifmeta to recover original capture dates and timestamps.', chips: ['exifmeta', 'EXIF Metadata', 'Timestamp Forensics', 'Image Intake'] },
      { step: '02', title: 'Geospatial Recon (GEOINT)', icon: 'fa-earth-americas', type: 'Location Geolocation', desc: 'Reverse image lookups on track landmarks geolocate the event to Pertamina Mandalika International Circuit in Lombok, Indonesia, correlating local dining venues.', chips: ['Reverse Image Search', 'Pertamina Mandalika Circuit', 'Lombok, Indonesia', 'GEOINT'] },
      { step: '03', title: 'Social Media Recon (SOCMINT)', icon: 'fa-hashtag', type: 'Entity Resolution', active: true, desc: 'Analyzes Indonesian social media event feeds to locate afterparty advertisements at Surfers Bar in Kuta Lombok, extracting performer identity (DJ Bongleleh).', chips: ['SOCMINT', 'Surfers Bar, Kuta Lombok', 'DJ Bongleleh', 'Link Analysis'] },
      { step: '04', title: 'Timeline Reconstruction', icon: 'fa-timeline', type: 'Chronological Synthesis', desc: 'Corroborates photographic timestamps with the official Oct 3–5, 2025 MotoGP championship calendar to establish an unbroken, minute-by-minute subject movement ledger.', chips: ['Oct 3-5, 2025 MotoGP Calendar', 'Timeline Corroboration', 'Zero Speculation'] },
      { step: '05', title: 'Target Resolution', icon: 'fa-location-dot', type: 'Final Intelligence', desc: 'Maps nearby cavern landmarks (Gua Sumur) and cross-correlates business registries to pinpoint subject coordinates and recover verified associate telephone records.', chips: ['Gua Sumur Cavern', 'Verified Phone Record', 'TryHackMe Solved', 'High-Confidence Intel'] }
    ],
    architecture: `
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: DIGITAL ARTIFACT INTAKE & METADATA FORENSICS           │
│ • Raw evidence: MotoGP.jpg, food.jpg                            │
│ • exifmeta extraction: Timestamps (10/05/2025, HH:MM:SS)        │
│ • Corroboration: Validated against official MotoGP 2025 dates   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: GEOSPATIAL INTELLIGENCE (GEOINT) & REVERSE LOOKUP      │
│ • Google Reverse Image Lookup: Landmark & venue features        │
│ • Geolocation match: Pertamina Mandalika Street Circuit, Lombok │
│ • Dining venue correlation: Local Mexican restaurant identified │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: SOCIAL MEDIA INTELLIGENCE (SOCMINT) & LINK ANALYSIS    │
│ • Event indexing: Facebook video telemetry for afterparty       │
│ • Venue localized: Surfers Bar, Kuta Lombok                     │
│ • Audio/video entity extraction: Associate stage name (DJ)      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: TARGET RESOLUTION & ACTIONABLE TELEMETRY               │
│ • Proximity mapping: Identified excursion destination (Gua Sumur)│
│ • Commercial cross-reference: Correlated DJ + Cave Facebook     │
│ • High-Confidence Output: Subject location & verified telephone │
└─────────────────────────────────────────────────────────────────┘`,
    objective: 'Reconstruct a missing subject’s travel timeline, localize geographic stops, and identify associate networks using only public data, metadata extraction, and social intelligence.',
    process: [
      'Ingested uncaptioned holiday photos and extracted camera metadata using exifmeta to recover original capture dates and timestamps.',
      'Conducted reverse image lookups on track landmarks to geolocate the event to the Pertamina Mandalika International Circuit in Lombok, Indonesia.',
      'Cross-referenced photographic timestamps with official 2025 MotoGP championship calendars to verify primary ground-truth dates.',
      'Analyzed Indonesian social media event feeds to locate afterparty advertisements at Surfers Bar in Kuta Lombok.',
      'Extracted associate identities from promotional video footage, surfacing the performer\'s stage name (DJ Bongleleh).',
      'Mapped nearby cavern landmarks (Gua Sumur) and cross-correlated business registration pages to recover verified phone records.'
    ],
    screenshots: [],
    findings: [
      'Positive identification of event location: Pertamina Mandalika International Circuit, Indonesia.',
      'Accurate temporal timeline alignment with the Oct 3–5, 2025 official calendar.',
      'Identification of secondary location (Surfers Bar) and final excursion site (Gua Sumur).',
      'Successful entity extraction and telephone contact recovery for the primary associate.'
    ],
    learned: 'Real-world OSINT is about creating an unbroken chain of corroboration: never trusting an unverified narrative, using EXIF for temporal ground truth, and pivoting on unique artifacts to uncover high-confidence intelligence.',
    tools: ['Google Images', 'exifmeta', 'Facebook SOCMINT', 'Public Registries', 'Geographic Mapping'],
    skills: ['OSINT Tradecraft', 'EXIF Metadata Analysis', 'GEOINT Geolocation', 'SOCMINT', 'Entity Resolution', 'Timeline Reconstruction'],
    github: 'https://tryhackme.com/room/missingperson',
    githubLabel: 'TryHackMe Challenge Room',
    report: 'https://tryhackme.com/room/missingperson',
    reportLabel: 'TryHackMe Room Link'
  }
};

/* ==========================================================================
   4. PROJECT CASE STUDY SYSTEM & MODAL LOGIC (INTERACTIVE PIPELINE UPGRADE)
   ========================================================================== */

// Helper to pick contextual icons for pipeline stages
function pickPipelineIcon(name, idx) {
  const t = (name || '').toLowerCase();
  if (t.includes('mongo') || t.includes('database') || t.includes('storage') || t.includes('postgres') || t.includes('atlas') || t.includes('record')) return 'fa-database';
  if (t.includes('crawler') || t.includes('scrape') || t.includes('discovery') || t.includes('queue') || t.includes('browse')) return 'fa-compass';
  if (t.includes('router') || t.includes('agent') || t.includes('supervisor') || t.includes('routing') || t.includes('orchestrat')) return 'fa-diagram-project';
  if (t.includes('model') || t.includes('gemini') || t.includes('llm') || t.includes('ai') || t.includes('cnn') || t.includes('classifier') || t.includes('neural') || t.includes('consensus')) return 'fa-brain';
  if (t.includes('request') || t.includes('user') || t.includes('dashboard') || t.includes('seller') || t.includes('query') || t.includes('client')) return 'fa-file-lines';
  if (t.includes('privacy') || t.includes('security') || t.includes('ldp') || t.includes('guard') || t.includes('ids') || t.includes('sensor') || t.includes('containment') || t.includes('siem') || t.includes('rule')) return 'fa-shield-halved';
  if (t.includes('insight') || t.includes('report') || t.includes('finding') || t.includes('metric') || t.includes('structured') || t.includes('evaluat')) return 'fa-square-check';
  if (t.includes('cron') || t.includes('trigger') || t.includes('schedul') || t.includes('timer')) return 'fa-clock-rotate-left';
  if (t.includes('vector') || t.includes('search') || t.includes('embed') || t.includes('map')) return 'fa-magnifying-glass-chart';
  if (t.includes('worker') || t.includes('pool') || t.includes('run') || t.includes('service') || t.includes('memory') || t.includes('extract') || t.includes('deep')) return 'fa-layer-group';
  
  const fallbackIcons = ['fa-file-lines', 'fa-diagram-project', 'fa-layer-group', 'fa-database', 'fa-square-check', 'fa-cubes'];
  return fallbackIcons[idx % fallbackIcons.length];
}

// Smart headline generator for pipeline steps (never cuts words in half)
function formatStepHeadline(text, fallbackIndex) {
  if (!text || typeof text !== 'string') return `Stage ${String(fallbackIndex + 1).padStart(2, '0')}`;
  
  // Clean prefix if present (e.g. "Step 1: ", "01. ")
  let clean = text.replace(/^(step\s*\d+[:\-.]?|\d+[\-.:)]\s*)/i, '').trim();
  
  // Take first sentence or clause
  const firstSentence = clean.split(/[.;\n]/)[0].trim();
  
  // If it's already reasonably sized (<= 36 chars), return it intact
  if (firstSentence.length <= 36) {
    return firstSentence;
  }
  
  // Otherwise, split on comma or dash if that provides a balanced phrase
  const commaPart = firstSentence.split(/[,—–\-]/)[0].trim();
  if (commaPart.length >= 12 && commaPart.length <= 36) {
    return commaPart;
  }
  
  // Break on word boundary so words are never truncated awkwardly
  const words = firstSentence.split(/\s+/);
  let result = '';
  for (const w of words) {
    if ((result + ' ' + w).trim().length <= 32) {
      result = (result + ' ' + w).trim();
    } else {
      break;
    }
  }
  return result || firstSentence.slice(0, 30);
}

// Helper to retrieve or automatically generate pipeline stages
function getProjectPipeline(data) {
  if (Array.isArray(data.pipeline) && data.pipeline.length > 0) {
    return data.pipeline;
  }

  // Parse architecture string if present
  if (data.architecture && typeof data.architecture === 'string') {
    const lines = data.architecture.split('\n');
    const nodes = [];
    let currentNode = null;

    lines.forEach(line => {
      const match = line.match(/^\s*\[\s*([^\]\n]+)\s*\]/);
      if (match) {
        if (currentNode) nodes.push(currentNode);
        const rawName = match[1].trim();
        const cleanName = rawName.replace(/^Stage \d+:\s*/i, '');
        currentNode = {
          step: String(nodes.length + 1).padStart(2, '0'),
          title: formatStepHeadline(cleanName, nodes.length),
          icon: pickPipelineIcon(cleanName, nodes.length),
          type: 'Pipeline Node',
          desc: '',
          chips: []
        };
      } else if (currentNode && line.trim().startsWith('•')) {
        const bullet = line.trim().replace(/^•\s*/, '');
        if (!currentNode.desc) {
          currentNode.desc = bullet;
        } else {
          currentNode.chips.push(bullet);
        }
      } else if (currentNode && line.trim() && !line.includes('│') && !line.includes('▼') && !line.includes('─') && !line.includes('┌') && !line.includes('└') && !line.includes('├') && !line.includes('┼')) {
        if (!currentNode.desc) {
          currentNode.desc = line.trim();
        }
      }
    });
    if (currentNode) nodes.push(currentNode);

    if (nodes.length >= 2) {
      nodes.forEach(n => {
        if (!n.desc) n.desc = `${n.title} processes and transfers pipeline telemetry to the next execution stage.`;
      });
      return nodes;
    }
  }

  // Fallback to process steps with complete, clean headlines (no word chopping)
  if (Array.isArray(data.process) && data.process.length > 0) {
    return data.process.slice(0, 6).map((proc, idx) => ({
      step: String(idx + 1).padStart(2, '0'),
      title: formatStepHeadline(proc, idx),
      icon: pickPipelineIcon(proc, idx),
      type: `Execution Stage ${idx + 1}`,
      desc: proc,
      chips: (data.tools || []).slice(0, 3)
    }));
  }

  return [];
}

function initProjectCaseStudySystem() {
  const modal = document.getElementById('projectCaseStudyModal');
  const closeBtn = document.getElementById('caseStudyCloseBtn');
  const projectCards = document.querySelectorAll('.project-card');
  const inspectBtns = document.querySelectorAll('.inspect-spec-btn');

  if (!modal) return;

  // Open modal for a specific project (CyberSOC Command Center Archetype)
  const PROJECT_HUD_STATS = {
    'bot-iot-ga-ids': [
      { label: 'CLASSIFICATION ACCURACY', val: '1.00 F1', desc: 'DDoS, DoS, Recon, Theft & Normal' },
      { label: 'DIMENSIONALITY CUT', val: '48.8%', desc: '43 raw features reduced to 22 optimal' },
      { label: 'TEST EVALUATION SIZE', val: '1.10M', desc: 'Rigorous 70/30 stratified test split' },
      { label: 'GA CONVERGENCE', val: 'Gen 21', desc: 'Adaptive early stopping halted search' }
    ],
    'hermes-ids': [
      { label: 'CLASSIFICATION ACCURACY', val: '98.6%', desc: 'Random Forest on 40,009 test samples' },
      { label: 'FALSE POSITIVE RATE', val: '1.4%', desc: 'Strict operational FP minimization' },
      { label: 'HYBRID ENSEMBLE', val: '3 Models', desc: 'XGBoost + 2D CNN + Autoencoder' },
      { label: 'SOC RESPONSE TIME', val: '< 5ms', desc: 'Automated IP firewall blocking' }
    ],
    'rca-engine': [
      { label: 'DIAGNOSTIC ENGINE', val: '50+ Rules', desc: 'Deterministic advertising audit rules' },
      { label: 'DYNAMIC THRESHOLD', val: 'μ + 1.5σ', desc: 'Rolling baseline anomaly detection' },
      { label: 'MULTI-AGENT LLM', val: 'LangGraph', desc: 'Supervisor with Gemini 2.5 Flash' },
      { label: 'BULK MITIGATION', val: '1-Click', desc: 'Auto negative keyword generation' }
    ],
    'mtech-dissertation': [
      { label: 'RECALL RECOVERY', val: '95.8%', desc: 'NDCG@10 recovery under DP noise' },
      { label: 'PRIVACY BOUNDS', val: '(ε, δ)-DP', desc: 'Calibrated Laplace perturbation' },
      { label: 'EDGE CLIENTS', val: '1,000+', desc: 'Zero raw clickstream leakage' },
      { label: 'NOISE RESILIENCE', val: 'View-CL', desc: 'Self-supervised contrastive learning' }
    ],
    'category-mapper': [
      { label: 'CATEGORY COVERAGE', val: '38,000+', desc: 'Canonical hierarchical leaf nodes' },
      { label: 'HYBRID ENGINE', val: 'BM25 + SBERT', desc: 'Exact token + semantic vector index' },
      { label: 'EMBEDDING RECOVERY', val: '384-D', desc: 'Dense cosine similarity retrieval' },
      { label: 'RESPONSE SPEED', val: '12ms', desc: 'Sub-second catalog assignment' }
    ],
    'scraping-engine': [
      { label: 'INGESTION VOLUME', val: '2.5M+', desc: 'Competitor e-commerce catalog URLs' },
      { label: 'ANTI-BOT RESILIENCE', val: '99.4%', desc: 'Cloudflare Turnstile & CAPTCHA bypass' },
      { label: 'THROUGHPUT PIPELINE', val: '850/sec', desc: 'Asynchronous distributed workers' },
      { label: 'DATA INTEGRITY', val: '100%', desc: 'Pydantic strict schema verification' }
    ],
    'text-image-insights': [
      { label: 'MULTIMODAL MODEL', val: 'CLIP ViT', desc: 'Vision + text contrastive embeddings' },
      { label: 'IMAGE-TEXT ALIGNMENT', val: '94.2%', desc: 'Zero-shot cross-modal retrieval' },
      { label: 'INFERENCE LATENCY', val: '18ms', desc: 'TensorRT GPU acceleration' },
      { label: 'INDEX SIZE', val: '500K Items', desc: 'Hierarchical Navigable Small World' }
    ],
    'multimodal-aplus': [
      { label: 'CONTENT GENERATOR', val: 'Gemini 1.5', desc: 'Multimodal vision prompt synthesis' },
      { label: 'COMPLIANCE AUDIT', val: '100%', desc: 'Amazon style & prohibited word filter' },
      { label: 'PRODUCTION PIPELINE', val: 'Full-Stack', desc: 'React + FastAPI + Celery Queue' },
      { label: 'TURNAROUND TIME', val: '< 30s', desc: 'From ASIN intake to structured copy' }
    ],
    'chatbot-rag': [
      { label: 'RETRIEVAL ACCURACY', val: '96.5%', desc: 'Hybrid dense-sparse vector scoring' },
      { label: 'EMBEDDING STORE', val: 'ChromaDB', desc: 'Chunked enterprise compliance docs' },
      { label: 'HALLUCINATION GUARD', val: 'G-Eval', desc: 'Faithfulness & relevance scoring' },
      { label: 'CONVERSATION MEMORY', val: 'Dynamic', desc: 'Token-budgeted sliding context buffer' }
    ],
    'aegis-agent': [
      { label: 'AGENT ARCHITECTURE', val: 'ReAct', desc: 'Autonomous reasoning + action loops' },
      { label: 'TOOL INTEGRATIONS', val: '12 APIs', desc: 'Sandbox shell, web search & DB queries' },
      { label: 'CONTAINMENT PROTOCOL', val: 'Strict', desc: 'Air-gapped safety validation layer' },
      { label: 'DECISION TRACE', val: '100%', desc: 'Full step-by-step audit provenance' }
    ],
    'splunk-siem-lab': [
      { label: 'LOG INGESTION', val: 'Sysmon / Win', desc: 'MITRE ATT&CK mapped telemetry' },
      { label: 'DETECTION COVERAGE', val: '18 Rules', desc: 'Pass-the-Hash, Cobalt Strike, Mimikatz' },
      { label: 'TRIAGE SPEED', val: 'Real-time', desc: 'Splunk search alerts & dashboarding' },
      { label: 'LAB REPRODUCIBILITY', val: 'VirtualBox', desc: 'Active Directory domain simulation' }
    ],
    'dos-attack-simulation': [
      { label: 'ATTACK VECTORS', val: 'SYN & UDP', desc: 'Volumetric flooding telemetry analysis' },
      { label: 'TRAFFIC CAPTURE', val: 'Wireshark', desc: 'Packet forensic PCAP investigation' },
      { label: 'MITIGATION ACL', val: 'iptables', desc: 'Rate-limiting & stateful flow filters' },
      { label: 'RESOURCE PROFILE', val: 'CPU / RAM', desc: 'Kernel socket exhaustion telemetry' }
    ],
    'autopsy-disk-investigation': [
      { label: 'EVIDENCE FORENSICS', val: 'E01 Image', desc: 'NIST CFTT verified disk acquisition' },
      { label: 'ARTIFACT RECOVERY', val: 'Master MFT', desc: 'Deleted file inodes & $LogFile carve' },
      { label: 'TIMELINE INTEGRITY', val: 'MACB', desc: 'Cryptographic MD5/SHA256 verification' },
      { label: 'AUDIT REPORT', val: 'Court-Ready', desc: 'Chain-of-custody documentation' }
    ],
    'osint-missing-person': [
      { label: 'INTELLIGENCE METHOD', val: 'OSINT', desc: 'Open-source footprint triangulation' },
      { label: 'PUBLIC RECORD CHECKS', val: '15+ Sources', desc: 'Social graph & metadata extraction' },
      { label: 'ETHICAL PROTOCOL', val: 'Strict Legal', desc: 'No unauthorized access or intrusion' },
      { label: 'CASE DOSSIER', val: 'Completed', desc: 'Verified chronological activity log' }
    ]
  };

  window.openProjectCaseStudy = function(projectId) {
    const data = PROJECT_CASE_STUDIES[projectId];
    if (!data) {
      console.warn('Case study data not found for:', projectId);
      return;
    }

    const steps = getProjectPipeline(data);

    // 1. Top CyberSOC Telemetry Strip
    const socClassEl = document.getElementById('caseStudySocClassification');
    if (socClassEl) {
      const provStr = (data.provenance || data.category || 'APPLIED CYBER-AI').split('•')[0].trim();
      socClassEl.textContent = provStr.toUpperCase();
    }

    const socSysIdEl = document.getElementById('caseStudySocSysId');
    if (socSysIdEl) {
      socSysIdEl.textContent = projectId.toUpperCase();
    }

    // 2. Hero Header & Tactical Badges
    const catBadge = document.getElementById('caseStudyCategoryBadge');
    if (catBadge) {
      catBadge.textContent = data.category || 'Engineering Spec';
    }

    const provBadge = document.getElementById('caseStudyProvenanceBadge');
    if (provBadge) {
      provBadge.textContent = data.provenance || 'Applied System';
    }

    const statusBadge = document.getElementById('caseStudyStatusBadge');
    if (statusBadge) {
      if (data.provenance && (data.provenance.includes('In Active Development') || data.provenance.includes('Development'))) {
        statusBadge.innerHTML = '<i class="fa-solid fa-flask-vial"></i> Architecture in Active Development';
      } else {
        statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verified Production Architecture';
      }
    }

    const titleEl = document.getElementById('caseStudyTitle');
    if (titleEl) titleEl.textContent = data.title;

    const summaryEl = document.getElementById('caseStudySummary');
    if (summaryEl) summaryEl.textContent = data.summary || data.objective || '';

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

    // 3. Telemetry HUD Metric Grid (4 Glowing KPI Cards)
    const stats = PROJECT_HUD_STATS[projectId] || [
      { label: 'PRIMARY METRIC', val: (data.meta && data.meta[0]) || '100% Verified', desc: 'Core verified benchmark metric' },
      { label: 'PIPELINE PHASES', val: `${steps.length} Stages`, desc: 'Autonomous end-to-end execution' },
      { label: 'TECHNOLOGY STACK', val: `${(data.tools && data.tools.length) || 6} Tools`, desc: 'Frameworks and environments' },
      { label: 'STATUS', val: 'Production', desc: 'Validated & peer-reviewed' }
    ];

    for (let i = 1; i <= 4; i++) {
      const s = stats[i - 1];
      const lbl = document.getElementById(`hudStat${i}Label`);
      const val = document.getElementById(`hudStat${i}Value`);
      const dsc = document.getElementById(`hudStat${i}Desc`);
      if (s) {
        if (lbl) lbl.textContent = s.label;
        if (val) val.textContent = s.val;
        if (dsc) dsc.textContent = s.desc;
      }
    }

    // 4. Objective / Tactical Mission Statement
    const objEl = document.getElementById('caseStudyObjective');
    const objSection = document.getElementById('caseStudyObjectiveSection');
    if (objEl) {
      objEl.textContent = data.objective || data.summary || '';
      if (objSection) {
        objSection.style.display = (data.objective || data.summary) ? 'block' : 'none';
      }
    }

    // 5. Interactive Algorithmic Execution Pipeline
    const archSection = document.getElementById('caseStudyArchSection');
    const kickerTag = document.getElementById('pipelineKickerTag');
    const track = document.getElementById('caseStudyPipelineTrack');
    const detailBadge = document.getElementById('pipelineDetailStepBadge');
    const detailType = document.getElementById('pipelineDetailType');
    const detailTitle = document.getElementById('pipelineDetailTitle');
    const detailDesc = document.getElementById('pipelineDetailDesc');
    const detailChips = document.getElementById('pipelineDetailChips');

    if (archSection && track && steps && steps.length > 0) {
      archSection.style.display = 'block';

      if (kickerTag) {
        const provPrefix = (data.provenance || data.title).split('•')[0].trim().toUpperCase();
        kickerTag.textContent = `${provPrefix} / WORKFLOW PIPELINE`;
      }

      // Render interactive pipeline track
      track.innerHTML = '';
      steps.forEach((step, idx) => {
        const node = document.createElement('div');
        node.className = 'pipeline-step-node';
        node.setAttribute('role', 'button');
        node.setAttribute('tabindex', '0');
        node.setAttribute('aria-label', `Step ${step.step}: ${step.title}`);
        node.dataset.stepIndex = idx;

        node.innerHTML = `
          <div class="pipeline-step-top">
            <span class="pipeline-step-num">${step.step}</span>
            <i class="fa-solid ${step.icon || 'fa-cubes'} pipeline-step-icon"></i>
          </div>
          <div class="pipeline-step-name">${step.title}</div>
        `;

        const activateStep = () => {
          track.querySelectorAll('.pipeline-step-node').forEach(n => n.classList.remove('active'));
          node.classList.add('active');

          if (detailBadge) detailBadge.textContent = `STEP ${step.step}`;
          if (detailType) detailType.textContent = step.type || 'Stage Component';
          if (detailTitle) detailTitle.textContent = step.title;
          if (detailDesc) detailDesc.textContent = step.desc || '';

          if (detailChips) {
            detailChips.innerHTML = '';
            const chipsList = Array.isArray(step.chips) && step.chips.length > 0 
              ? step.chips 
              : (data.tools || []).slice(0, 3);
            chipsList.forEach(c => {
              const chipSpan = document.createElement('span');
              chipSpan.className = 'pipeline-chip';
              chipSpan.textContent = c;
              detailChips.appendChild(chipSpan);
            });
          }
        };

        node.addEventListener('click', activateStep);
        node.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activateStep();
          }
        });

        track.appendChild(node);
      });

      // Activate default step
      const initialIdx = steps.findIndex(s => s.active) !== -1 
        ? steps.findIndex(s => s.active) 
        : 0;
      const initialNode = track.querySelector(`.pipeline-step-node[data-step-index="${initialIdx}"]`);
      if (initialNode) {
        initialNode.click();
      }
    } else if (archSection) {
      archSection.style.display = 'none';
    }

    // 6. System Architecture Topology (ASCII)
    const topologySection = document.getElementById('caseStudyTopologySection');
    const architectureEl = document.getElementById('caseStudyArchitecture');
    if (topologySection && architectureEl) {
      if (data.architecture && data.architecture.trim().length > 0) {
        topologySection.style.display = 'block';
        architectureEl.textContent = data.architecture.trim();
      } else {
        topologySection.style.display = 'none';
      }
    }

    // 7. Evidence Gallery (Screenshots with Click-to-Zoom Lightbox)
    const gallerySection = document.getElementById('caseStudyGallerySection');
    const gallery = document.getElementById('caseStudyGallery');
    if (gallerySection && gallery) {
      gallery.innerHTML = '';
      if (Array.isArray(data.screenshots) && data.screenshots.length > 0) {
        gallerySection.style.display = 'block';
        data.screenshots.forEach(shot => {
          const card = document.createElement('div');
          
          if (shot.isPlaceholder) {
            card.className = 'case-study-thumb-card placeholder-card';
            card.setAttribute('role', 'region');
            card.setAttribute('aria-label', shot.alt || shot.title);

            card.innerHTML = `
              <div class="case-study-thumb-placeholder-box">
                <i class="fa-solid fa-flask-vial case-study-thumb-placeholder-icon"></i>
                <span class="case-study-thumb-placeholder-tag"><i class="fa-solid fa-code"></i> In Active Development</span>
                <span class="case-study-thumb-placeholder-alt">${shot.alt || 'System telemetry and interface artifacts pending completion'}</span>
              </div>
              <div class="case-study-thumb-info">
                <h5 class="case-study-thumb-title">${shot.title}</h5>
                <p class="case-study-thumb-caption">${shot.caption || ''}</p>
              </div>
            `;
          } else {
            card.className = 'case-study-thumb-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View screenshot: ${shot.title}`);

            card.innerHTML = `
              <div class="case-study-thumb-img-wrap">
                <img src="${shot.src}" alt="${shot.title}" loading="lazy" />
                <div class="case-study-thumb-overlay">
                  <i class="fa-solid fa-magnifying-glass-plus"></i>
                  <span>Zoom Telemetry</span>
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
          }

          gallery.appendChild(card);
        });
      } else {
        gallerySection.style.display = 'none';
      }
    }

    // 8. Empirical Findings
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

    // 9. What I Learned & Takeaways
    const learnedEl = document.getElementById('caseStudyLearned');
    if (learnedEl) learnedEl.textContent = data.learned || '';

    // 10. Sidebar Tactical Dossier
    const dossierProvEl = document.getElementById('dossierProvenance');
    if (dossierProvEl) {
      dossierProvEl.textContent = (data.provenance || data.category || 'Applied ML').split('•')[0].trim();
    }
    const dossierStagesEl = document.getElementById('dossierStages');
    if (dossierStagesEl) {
      dossierStagesEl.textContent = `${steps.length} Phases`;
    }

    // Tools & Frameworks
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

    // Skills
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

    // Resources & Deliverables (GitHub, Report / PDF, Documentation)
    const resourcesBlock = document.getElementById('caseStudyResourcesBlock');
    const ghBtn = document.getElementById('caseStudyGithub');
    const ghLabel = document.getElementById('caseStudyGithubLabel');
    if (ghBtn) {
      if (data.github) {
        ghBtn.href = data.github;
        ghBtn.style.display = 'flex';
        if (ghLabel) ghLabel.textContent = data.githubLabel || 'GitHub Repository';
      } else {
        ghBtn.style.display = 'none';
      }
    }

    const reportBtn = document.getElementById('caseStudyReport');
    const reportLabel = document.getElementById('caseStudyReportLabel');
    if (reportBtn) {
      if (data.pdf && data.pdf !== '#') {
        reportBtn.href = data.pdf;
        reportBtn.style.display = 'flex';
        if (reportLabel) reportLabel.textContent = data.pdfLabel || 'Download Technical Report PDF';
      } else if (data.report && data.report !== '#') {
        reportBtn.href = data.report;
        reportBtn.style.display = 'flex';
        if (reportLabel) reportLabel.textContent = data.reportLabel || 'Technical Report / PDF';
      } else {
        reportBtn.style.display = 'none';
      }
    }

    const pdfBtn = document.getElementById('caseStudyPdf');
    const pdfLabel = document.getElementById('caseStudyPdfLabel');
    if (pdfBtn) {
      if (data.pdf && data.report && data.report !== data.pdf && data.report !== '#') {
        pdfBtn.href = data.report;
        pdfBtn.style.display = 'flex';
        if (pdfLabel) pdfLabel.textContent = data.reportLabel || 'Project Documentation';
      } else {
        pdfBtn.style.display = 'none';
      }
    }

    if (resourcesBlock) {
      const hasAnyLink = (data.github || (data.pdf && data.pdf !== '#') || (data.report && data.report !== '#'));
      resourcesBlock.style.display = hasAnyLink ? 'block' : 'none';
    }

    // Engineer's Takeaway Quote
    const takeawayQuote = document.getElementById('caseStudyTakeawayQuote');
    if (takeawayQuote) {
      takeawayQuote.textContent = data.learned 
        ? `"${data.learned}"` 
        : '"Treating optimization as a formal mathematical problem rather than an afterthought ensures scalable, leakage-proof detection under adversarial attack conditions."';
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
  const jumpLinks = document.querySelectorAll('.exp-jump-pill, .exp-bullet-link, .exp-related-link');

  jumpLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const targetId = link.getAttribute('data-target') || (href && href.startsWith('#') ? href.replace('#', '') : null);
      if (!targetId) return;

      const targetCard = document.getElementById(targetId);
      if (!targetCard) return;

      e.preventDefault();

      // If the target project is hidden by active mode tab, make sure its category is active
      const isTargetFeatured = targetCard.getAttribute('data-featured') === 'true';
      const targetCategory = targetCard.getAttribute('data-category');
      const activeTab = document.querySelector('.mode-tab.active');
      const activeMode = activeTab ? activeTab.getAttribute('data-mode') : 'featured';

      const isVisible = (activeMode === 'featured' && isTargetFeatured) ||
                        (activeMode === 'ai' && (targetCategory === 'ai' || targetCategory === 'overlap')) ||
                        (activeMode === 'security' && (targetCategory === 'security' || targetCategory === 'overlap')) ||
                        (activeMode === 'overlap' && targetCategory === 'overlap');

      if (!isVisible) {
        let matchingTab = null;
        if (targetCategory === 'ai') matchingTab = document.querySelector('.mode-tab[data-mode="ai"]');
        else if (targetCategory === 'security') matchingTab = document.querySelector('.mode-tab[data-mode="security"]');
        else if (targetCategory === 'overlap') matchingTab = document.querySelector('.mode-tab[data-mode="overlap"]');

        if (matchingTab) {
          matchingTab.click();
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

/* ==========================================================================
   8. INTERNSHIP DETAILS COLLAPSIBLE TOGGLE
   ========================================================================== */
function initExperienceInternToggle() {
  const toggleBtn = document.getElementById('internToggle');
  const content = document.getElementById('internContent');
  const chevron = document.getElementById('internChevron');
  const label = document.getElementById('internToggleLabel');

  if (!toggleBtn || !content) return;

  const toggle = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      content.style.display = 'none';
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.classList.remove('open');
      if (label) label.textContent = 'Show internship details (4 systems)';
    } else {
      content.style.display = 'block';
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.classList.add('open');
      if (label) label.textContent = 'Hide internship details';
    }
  };

  toggleBtn.addEventListener('click', toggle);
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
}

/* ==========================================================================
   9. DEDICATED PROJECTS PAGE (PROJECTS.HTML) TWO-TIER FILTER SYSTEM
   ========================================================================== */
function initProjectsPageFiltersLegacy() {
  const filterWrapper = document.querySelector('.projects-filter-wrapper');
  if (!filterWrapper) return; // Only execute when on projects.html

  const sectionTabs = filterWrapper.querySelectorAll('.filter-section-tab');
  const capabilityTags = filterWrapper.querySelectorAll('.capability-tag');
  const resultsCountEl = document.getElementById('resultsCount');
  const activeSummaryEl = document.getElementById('activeFilterSummary');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const mobileToggle = document.getElementById('mobileFilterToggle');
  const tagsRow = document.getElementById('tagsFilterRow');
  const mobileCountEl = document.getElementById('mobileActiveTagCount');
  const chevron = document.getElementById('mobileFilterChevron');
  const noResultsBox = document.getElementById('noResultsBox');
  const projectCards = document.querySelectorAll('#archiveCardsGrid .project-card');

  let currentSection = 'all'; // 'all', 'ai', 'security', 'overlap'
  let selectedTags = new Set(); // Set of active tag names

  // Tag to section mapping (tags that apply to each section)
  const TAG_SECTIONS = {
    'LangGraph': ['all', 'ai', 'overlap'],
    'RAG & Agents': ['all', 'ai', 'overlap'],
    'Vector Search': ['all', 'ai'],
    'Computer Vision': ['all', 'ai', 'overlap'],
    'Multimodal LLMs': ['all', 'ai'],
    'Federated Privacy': ['all', 'overlap'],
    'SIEM & SPL': ['all', 'security'],
    'Packet Forensics': ['all', 'security', 'overlap'],
    'DFIR': ['all', 'security'],
    'OSINT': ['all', 'security'],
    'Heuristic Search (GA)': ['all', 'overlap'],
    'Adversarial AI': ['all', 'overlap']
  };

  // Sync state to URL search parameters for shareable links
  function syncUrl() {
    const params = new URLSearchParams();
    if (currentSection !== 'all') {
      params.set('section', currentSection);
    }
    if (selectedTags.size > 0) {
      params.set('tags', Array.from(selectedTags).join(','));
    }
    const query = params.toString() ? '?' + params.toString() : window.location.pathname;
    window.history.replaceState(null, '', query);
  }

  // Update tag accessibility/disabled state based on active section
  function updateTagAvailability() {
    capabilityTags.forEach(tagBtn => {
      const tag = tagBtn.getAttribute('data-tag');
      const validSections = TAG_SECTIONS[tag] || ['all'];
      const isApplicable = validSections.includes(currentSection);

      if (isApplicable) {
        tagBtn.classList.remove('disabled');
        tagBtn.removeAttribute('disabled');
      } else {
        tagBtn.classList.add('disabled');
        tagBtn.setAttribute('disabled', 'true');
        // Unselect if it was selected
        if (selectedTags.has(tag)) {
          selectedTags.delete(tag);
          tagBtn.classList.remove('active');
        }
      }
    });
  }

  // Core filter application
  function applyFilters() {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category'); // 'ai', 'security', 'overlap'
      const rawTags = card.getAttribute('data-tags') || '';
      const cardTags = rawTags.split(',').map(t => t.trim());

      // 1. Section match:
      let sectionMatches = false;
      if (currentSection === 'all') {
        sectionMatches = true;
      } else if (currentSection === 'ai') {
        sectionMatches = (category === 'ai' || category === 'overlap');
      } else if (currentSection === 'security') {
        sectionMatches = (category === 'security' || category === 'overlap');
      } else if (currentSection === 'overlap') {
        sectionMatches = (category === 'overlap');
      }

      // 2. Tag match (OR logic within selected tags as requested!):
      let tagMatches = false;
      if (selectedTags.size === 0) {
        tagMatches = true;
      } else {
        // Does card contain AT LEAST ONE of the selected tags?
        tagMatches = cardTags.some(tag => selectedTags.has(tag));
      }

      const show = sectionMatches && tagMatches;
      if (show) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // Update Result Counter
    if (resultsCountEl) {
      resultsCountEl.textContent = visibleCount;
    }

    // Toggle Empty State Box
    if (noResultsBox) {
      noResultsBox.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Update Mobile Count
    if (mobileCountEl) {
      mobileCountEl.textContent = selectedTags.size;
    }

    // Update Active Filter Summary Text
    if (activeSummaryEl) {
      const sectionNameMap = {
        'all': 'All Systems',
        'ai': 'AI Engineering',
        'security': 'Cybersecurity',
        'overlap': 'AI × Security'
      };
      const sectionLabel = sectionNameMap[currentSection] || 'All Systems';
      if (selectedTags.size === 0) {
        activeSummaryEl.textContent = `${sectionLabel} • All Capabilities`;
      } else {
        const tagsArr = Array.from(selectedTags);
        activeSummaryEl.textContent = `${sectionLabel} • Tags: [${tagsArr.join(' OR ')}]`;
      }
    }

    syncUrl();
  }

  // Section Tab Click Handler
  sectionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const section = tab.getAttribute('data-section') || 'all';
      if (section === currentSection) return;

      currentSection = section;

      sectionTabs.forEach(t => {
        const isCurrent = t.getAttribute('data-section') === section;
        t.classList.toggle('active', isCurrent);
        t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      updateTagAvailability();
      applyFilters();
    });
  });

  // Capability Tag Click Handler (OR Multi-select)
  capabilityTags.forEach(tagBtn => {
    tagBtn.addEventListener('click', () => {
      if (tagBtn.classList.contains('disabled')) return;

      const tag = tagBtn.getAttribute('data-tag');
      if (!tag) return;

      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        tagBtn.classList.remove('active');
      } else {
        selectedTags.add(tag);
        tagBtn.classList.add('active');
      }

      applyFilters();
    });
  });

  // Clear Filters Handler
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentSection = 'all';
      selectedTags.clear();

      sectionTabs.forEach(t => {
        const isAll = t.getAttribute('data-section') === 'all';
        t.classList.toggle('active', isAll);
        t.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });

      capabilityTags.forEach(t => {
        t.classList.remove('active', 'disabled');
        t.removeAttribute('disabled');
      });

      applyFilters();
    });
  }

  // Mobile Filter Collapsible Toggle
  if (mobileToggle && tagsRow) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = tagsRow.classList.toggle('open');
      if (chevron) {
        chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // Restore Filter State from URL Query Parameters (Shareable URLs)
  function initFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const urlSection = params.get('section');
    const urlTags = params.get('tags');

    if (urlSection && ['all', 'ai', 'security', 'overlap'].includes(urlSection)) {
      currentSection = urlSection;
      sectionTabs.forEach(t => {
        const isCurrent = t.getAttribute('data-section') === urlSection;
        t.classList.toggle('active', isCurrent);
        t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });
      updateTagAvailability();
    }

    if (urlTags) {
      const tagList = urlTags.split(',').map(t => decodeURIComponent(t.trim()));
      tagList.forEach(tagName => {
        capabilityTags.forEach(btn => {
          if (btn.getAttribute('data-tag') === tagName && !btn.classList.contains('disabled')) {
            selectedTags.add(tagName);
            btn.classList.add('active');
          }
        });
      });
    }

    applyFilters();
  }

  initFromUrl();
}

/* ==========================================================================
   10. INTELLIGENT PROJECT DISCOVERY
   Weighted, typo-tolerant local search layered on the archive filters.
   ========================================================================== */
function initProjectsPageFilters() {
  const filterWrapper = document.querySelector('.projects-filter-wrapper');
  if (!filterWrapper) return;

  const sectionTabs = Array.from(filterWrapper.querySelectorAll('.filter-section-tab'));
  const capabilityTags = Array.from(filterWrapper.querySelectorAll('.capability-tag'));
  const projectCards = Array.from(document.querySelectorAll('#archiveCardsGrid .project-card'));
  const searchInput = document.getElementById('projectSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const suggestionsBox = document.getElementById('searchSuggestions');
  const resultsCountEl = document.getElementById('resultsCount');
  const activeSummaryEl = document.getElementById('activeFilterSummary');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const mobileToggle = document.getElementById('mobileFilterToggle');
  const tagsRow = document.getElementById('tagsFilterRow');
  const mobileCountEl = document.getElementById('mobileActiveTagCount');
  const chevron = document.getElementById('mobileFilterChevron');
  const noResultsBox = document.getElementById('noResultsBox');

  let currentSection = 'all';
  let selectedTags = new Set();
  let searchQuery = '';
  let activeSuggestion = -1;

  const TAG_SECTIONS = {
    'LangGraph': ['all', 'ai', 'overlap'],
    'RAG & Agents': ['all', 'ai', 'overlap'],
    'Vector Search': ['all', 'ai'],
    'Computer Vision': ['all', 'ai', 'overlap'],
    'Multimodal LLMs': ['all', 'ai'],
    'Federated Privacy': ['all', 'overlap'],
    'SIEM & SPL': ['all', 'security'],
    'Packet Forensics': ['all', 'security', 'overlap'],
    'DFIR': ['all', 'security'],
    'OSINT': ['all', 'security'],
    'Heuristic Search (GA)': ['all', 'overlap'],
    'Adversarial AI': ['all', 'overlap']
  };

  const SYNONYM_GROUPS = [
    ['ai', 'artificial intelligence', 'machine learning', 'ml'],
    ['generative ai', 'genai', 'llm', 'large language model', 'gemini', 'llama'],
    ['agent', 'agents', 'agentic', 'multi agent', 'langgraph', 'supervisor'],
    ['rag', 'retrieval augmented generation', 'semantic retrieval', 'knowledge retrieval'],
    ['vector', 'vector search', 'embedding', 'embeddings', 'pgvector', 'semantic search'],
    ['root cause', 'rca', 'diagnostic', 'diagnostics', 'anomaly investigation'],
    ['cybersecurity', 'cyber security', 'infosec', 'security'],
    ['siem', 'soc', 'splunk', 'threat hunting', 'security monitoring'],
    ['forensics', 'dfir', 'digital forensics', 'file recovery', 'autopsy', 'ftk'],
    ['intrusion detection', 'ids', 'threat detection', 'anomaly detection'],
    ['network', 'packet', 'pcap', 'wireshark', 'tcp ip'],
    ['privacy', 'differential privacy', 'ldp', 'federated learning'],
    ['scraping', 'crawler', 'harvesting', 'extraction', 'zyte'],
    ['database', 'postgresql', 'postgres', 'mongodb', 'redis'],
    ['computer vision', 'vision', 'image analysis', 'multimodal'],
    ['osint', 'geoint', 'socmint', 'open source intelligence']
  ];

  const PROJECT_ALIASES = {
    'rca-engine': 'advertising analytics seller diagnostics business intelligence performance anomaly postgres optimization',
    'mtech-dissertation': 'recommendation recommender sequence privacy research thesis laplace contrastive learning',
    'hermes-ids': 'autonomous containment intrusion detection malware network defense cnn lstm',
    'bot-iot-ga-ids': 'genetic algorithm feature selection bot iot intrusion dataset research',
    'category-mapper': 'taxonomy category mapping semantic similarity ecommerce embeddings',
    'scraping-engine': 'catalog crawler web data collection distributed ingestion automation',
    'text-image-insights': 'product listing content intelligence image text marketplace analytics',
    'multimodal-aplus': 'amazon a plus creative competitor content image generation',
    'chatbot-rag': 'api microservices conversational assistant category mapper product details',
    'aegis-agent': 'guardrails prompt injection pii redaction secure enterprise assistant',
    'splunk-siem-lab': 'soc log monitoring ssh brute force nikto alert dashboard spl',
    'dos-attack-simulation': 'denial service syn udp icmp flood slowloris traffic analysis',
    'autopsy-disk-investigation': 'disk image evidence chain custody deleted file carving hex',
    'osint-missing-person': 'geolocation exif social media investigation entity resolution'
  };

  const STOP_WORDS = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'the', 'to', 'with']);

  const normalize = value => (value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#.]+/g, ' ')
    .trim();

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const held = row[j];
        row[j] = Math.min(
          row[j] + 1,
          row[j - 1] + 1,
          previous + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
        previous = held;
      }
    }
    return row[b.length];
  }

  function isFuzzyMatch(needle, words) {
    if (needle.length < 4) return false;
    const tolerance = needle.length >= 8 ? 2 : 1;
    return words.some(word => Math.abs(word.length - needle.length) <= tolerance && levenshtein(needle, word) <= tolerance);
  }

  function variantsFor(term) {
    const variants = new Set([term]);
    SYNONYM_GROUPS.forEach(group => {
      const normalizedGroup = group.map(normalize);
      if (normalizedGroup.some(item => item === term || item.includes(term) || term.includes(item))) {
        normalizedGroup.forEach(item => variants.add(item));
      }
    });
    return Array.from(variants);
  }

  const searchDocuments = projectCards.map((card, order) => {
    const title = normalize(card.querySelector('.project-title')?.textContent);
    const description = normalize(card.querySelector('.project-desc')?.textContent);
    const tags = normalize(card.getAttribute('data-tags'));
    const projectKey = card.getAttribute('data-project') || '';
    const aliases = normalize(PROJECT_ALIASES[projectKey] || '');
    const body = normalize(card.textContent);
    return {
      card,
      order,
      title,
      description,
      tags,
      aliases,
      body,
      words: new Set(`${title} ${description} ${tags} ${aliases} ${body}`.split(/\s+/).filter(Boolean))
    };
  });

  const suggestionCatalog = Array.from(new Set([
    ...searchDocuments.map(doc => doc.card.querySelector('.project-title')?.textContent.trim()).filter(Boolean),
    ...capabilityTags.map(tag => tag.textContent.trim()),
    'Multi-agent AI', 'PostgreSQL', 'Privacy-preserving ML', 'Splunk SIEM',
    'Digital forensics', 'Computer vision', 'Network security'
  ]));

  function scoreDocument(doc, query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return { score: 0, reasons: [] };
    const terms = normalizedQuery.split(/\s+/).filter(term => term && !STOP_WORDS.has(term));
    const reasons = new Set();
    let score = 0;

    for (const term of terms) {
      const variants = variantsFor(term);
      let best = 0;
      let bestReason = '';

      for (const variant of variants) {
        if (doc.title.includes(variant)) {
          if (18 > best) { best = 18; bestReason = 'title'; }
        } else if (doc.tags.includes(variant)) {
          if (14 > best) { best = 14; bestReason = 'tools'; }
        } else if (doc.aliases.includes(variant)) {
          if (11 > best) { best = 11; bestReason = 'related skill'; }
        } else if (doc.description.includes(variant)) {
          if (8 > best) { best = 8; bestReason = 'description'; }
        } else if (doc.body.includes(variant)) {
          if (4 > best) { best = 4; bestReason = 'case study'; }
        } else if (!variant.includes(' ') && isFuzzyMatch(variant, Array.from(doc.words))) {
          if (2 > best) { best = 2; bestReason = 'close spelling'; }
        }
      }

      if (best === 0) return { score: 0, reasons: [] };
      score += best;
      if (bestReason) reasons.add(bestReason);
    }

    if (doc.title.includes(normalizedQuery)) score += 30;
    if (doc.tags.includes(normalizedQuery)) score += 20;
    return { score, reasons: Array.from(reasons) };
  }

  function sectionMatches(category) {
    if (currentSection === 'all') return true;
    if (currentSection === 'ai') return category === 'ai' || category === 'overlap';
    if (currentSection === 'security') return category === 'security' || category === 'overlap';
    return category === 'overlap';
  }

  function syncUrl() {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (currentSection !== 'all') params.set('section', currentSection);
    if (selectedTags.size) params.set('tags', Array.from(selectedTags).join(','));
    const suffix = params.toString();
    window.history.replaceState(null, '', suffix ? `${window.location.pathname}?${suffix}` : window.location.pathname);
  }

  function updateTagAvailability() {
    capabilityTags.forEach(tagBtn => {
      const tag = tagBtn.getAttribute('data-tag');
      const applicable = (TAG_SECTIONS[tag] || ['all']).includes(currentSection);
      tagBtn.classList.toggle('disabled', !applicable);
      tagBtn.disabled = !applicable;
      if (!applicable) {
        selectedTags.delete(tag);
        tagBtn.classList.remove('active');
        tagBtn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  function updateMatchReason(card, reasons) {
    let reasonEl = card.querySelector('.search-match-reason');
    if (!searchQuery || !reasons.length) {
      reasonEl?.remove();
      return;
    }
    if (!reasonEl) {
      reasonEl = document.createElement('div');
      reasonEl.className = 'search-match-reason';
      const description = card.querySelector('.project-desc');
      description?.insertAdjacentElement('afterend', reasonEl);
    }
    reasonEl.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> Matched in ${reasons.join(', ')}`;
  }

  function applyFilters({ updateUrl = true } = {}) {
    const ranked = searchDocuments.map(doc => ({ ...doc, result: scoreDocument(doc, searchQuery) }));
    if (searchQuery) {
      ranked.sort((a, b) => b.result.score - a.result.score || a.order - b.order);
    } else {
      ranked.sort((a, b) => a.order - b.order);
    }

    let visibleCount = 0;
    ranked.forEach(doc => {
      const category = doc.card.getAttribute('data-category');
      const cardTags = (doc.card.getAttribute('data-tags') || '').split(',').map(tag => tag.trim());
      const tagMatch = selectedTags.size === 0 || cardTags.some(tag => selectedTags.has(tag));
      const searchMatch = !searchQuery || doc.result.score > 0;
      const show = sectionMatches(category) && tagMatch && searchMatch;

      doc.card.style.display = show ? 'flex' : 'none';
      doc.card.style.opacity = show ? '1' : '0';
      doc.card.classList.toggle('search-result-card', Boolean(show && searchQuery));
      updateMatchReason(doc.card, show ? doc.result.reasons : []);
      document.getElementById('archiveCardsGrid')?.appendChild(doc.card);
      if (show) visibleCount++;
    });

    if (resultsCountEl) resultsCountEl.textContent = visibleCount;
    if (noResultsBox) noResultsBox.style.display = visibleCount ? 'none' : 'block';
    if (mobileCountEl) mobileCountEl.textContent = selectedTags.size;
    if (searchClearBtn) searchClearBtn.hidden = !searchQuery;

    const sectionLabels = {
      all: 'All Systems', ai: 'AI Engineering', security: 'Cybersecurity', overlap: 'AI × Security'
    };
    const parts = [sectionLabels[currentSection]];
    if (searchQuery) parts.push(`Search: “${searchQuery}”`);
    if (selectedTags.size) parts.push(Array.from(selectedTags).join(' OR '));
    else parts.push('All Capabilities');
    if (activeSummaryEl) activeSummaryEl.textContent = parts.join(' • ');
    if (updateUrl) syncUrl();
  }

  function renderSuggestions() {
    if (!suggestionsBox || !searchInput) return;
    const query = normalize(searchInput.value);
    if (!query) {
      suggestionsBox.hidden = true;
      suggestionsBox.innerHTML = '';
      return;
    }
    const queryWords = query.split(/\s+/);
    const matches = suggestionCatalog
      .map(label => {
        const normalizedLabel = normalize(label);
        let score = normalizedLabel.includes(query) ? 10 : 0;
        if (!score && queryWords.every(word => isFuzzyMatch(word, normalizedLabel.split(/\s+/)))) score = 4;
        return { label, score };
      })
      .filter(item => item.score)
      .sort((a, b) => b.score - a.score || a.label.length - b.label.length)
      .slice(0, 6);

    suggestionsBox.innerHTML = matches.map((item, index) =>
      `<button type="button" class="search-suggestion" role="option" data-index="${index}" aria-selected="false"><i class="fa-solid fa-arrow-turn-up"></i><span>${item.label}</span></button>`
    ).join('');
    suggestionsBox.hidden = matches.length === 0;
    activeSuggestion = -1;

    suggestionsBox.querySelectorAll('.search-suggestion').forEach(button => {
      button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => {
        searchInput.value = button.textContent.trim();
        searchQuery = searchInput.value.trim();
        suggestionsBox.hidden = true;
        applyFilters();
        searchInput.focus();
      });
    });
  }

  function clearSearch() {
    if (!searchInput) return;
    searchInput.value = '';
    searchQuery = '';
    if (suggestionsBox) suggestionsBox.hidden = true;
    applyFilters();
    searchInput.focus();
  }

  sectionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentSection = tab.getAttribute('data-section') || 'all';
      sectionTabs.forEach(item => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      updateTagAvailability();
      applyFilters();
    });
  });

  capabilityTags.forEach(tagBtn => {
    tagBtn.setAttribute('aria-pressed', 'false');
    tagBtn.addEventListener('click', () => {
      if (tagBtn.disabled) return;
      const tag = tagBtn.getAttribute('data-tag');
      if (selectedTags.has(tag)) selectedTags.delete(tag);
      else selectedTags.add(tag);
      const active = selectedTags.has(tag);
      tagBtn.classList.toggle('active', active);
      tagBtn.setAttribute('aria-pressed', String(active));
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.trim();
    renderSuggestions();
    applyFilters();
  });

  searchInput?.addEventListener('keydown', event => {
    const options = Array.from(suggestionsBox?.querySelectorAll('.search-suggestion') || []);
    if (event.key === 'Escape') {
      if (searchQuery) clearSearch();
      else if (suggestionsBox) suggestionsBox.hidden = true;
      return;
    }
    if (!options.length || !['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowDown') activeSuggestion = (activeSuggestion + 1) % options.length;
    if (event.key === 'ArrowUp') activeSuggestion = (activeSuggestion - 1 + options.length) % options.length;
    if (event.key === 'Enter' && activeSuggestion >= 0) {
      options[activeSuggestion].click();
      return;
    }
    options.forEach((option, index) => {
      const active = index === activeSuggestion;
      option.classList.toggle('active', active);
      option.setAttribute('aria-selected', String(active));
    });
  });

  searchInput?.addEventListener('blur', () => {
    window.setTimeout(() => { if (suggestionsBox) suggestionsBox.hidden = true; }, 120);
  });

  searchClearBtn?.addEventListener('click', clearSearch);

  clearBtn?.addEventListener('click', () => {
    currentSection = 'all';
    selectedTags.clear();
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (suggestionsBox) suggestionsBox.hidden = true;
    sectionTabs.forEach(tab => {
      const active = tab.getAttribute('data-section') === 'all';
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    capabilityTags.forEach(tag => {
      tag.classList.remove('active', 'disabled');
      tag.disabled = false;
      tag.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
  });

  mobileToggle?.addEventListener('click', () => {
    const open = tagsRow?.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(Boolean(open)));
    if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  document.addEventListener('keydown', event => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
    if (event.key === '/' && !isTyping) {
      event.preventDefault();
      searchInput?.focus();
    }
  });

  const params = new URLSearchParams(window.location.search);
  const urlSection = params.get('section');
  const urlTags = params.get('tags');
  const urlQuery = params.get('q') || '';

  if (urlSection && ['all', 'ai', 'security', 'overlap'].includes(urlSection)) currentSection = urlSection;
  if (urlTags) selectedTags = new Set(urlTags.split(',').map(tag => tag.trim()).filter(Boolean));
  searchQuery = urlQuery.trim();
  if (searchInput) searchInput.value = searchQuery;

  sectionTabs.forEach(tab => {
    const active = tab.getAttribute('data-section') === currentSection;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  capabilityTags.forEach(tag => {
    const active = selectedTags.has(tag.getAttribute('data-tag'));
    tag.classList.toggle('active', active);
    tag.setAttribute('aria-pressed', String(active));
  });
  updateTagAvailability();
  applyFilters({ updateUrl: false });
}
