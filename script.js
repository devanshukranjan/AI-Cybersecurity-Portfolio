/**
 * DEVANSHU KUMAR RANJAN — UNIFIED PORTFOLIO JAVASCRIPT
 * Handles mode switching, interactive technical specs modal, copy features, and nav telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModeSwitcher();
  initTechnicalModal();
  initCopyButtons();
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
          // AI mode shows 'ai' and 'overlap'
          if (cardCategory === 'ai' || cardCategory === 'overlap') {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        } else if (selectedMode === 'security') {
          // Security mode shows 'security' and 'overlap'
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
   3. TECHNICAL SPECIFICATIONS MODAL / ARCHITECTURE DRAWER
   ========================================================================== */
const TECHNICAL_SPECS_DATA = {
  'rca-engine': {
    title: 'Root Cause Analysis (RCA) Diagnostic Engine',
    subtitle: 'Sole Owner (Research to Production) — KAS Global Commerce / My Seller Central',
    badge: 'Production GenAI & Diagnostic Engine',
    badgeClass: 'badge-ai',
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
    details: [
      '<strong>Algorithmic Innovation:</strong> Dynamic per-account threshold calculation replaces rigid static rules, eliminating false positives during normal seasonal sales fluctuations.',
      '<strong>Negative Keyword Safeguard:</strong> Implemented mathematical guardrails preventing over-blocking of profitable parent broad-match terms.',
      '<strong>Multilingual Intent Routing:</strong> Built Hinglish regex and semantic fallback classifiers correctly routing natural vernacular seller queries.',
      '<strong>Roadmap:</strong> 7 diagnostics live in Marketing; 16 diagnostics designed for Orders, Business, and Inventory domains.'
    ]
  },
  'mtech-dissertation': {
    title: 'Privacy-Preserving Federated Sequential Recommendation',
    subtitle: 'M.Tech Master Thesis Research — NIT Patna (CGPA: 9.06/10)',
    badge: 'Research Innovation & Mathematical Rigor',
    badgeClass: 'badge-overlap',
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
    details: [
      '<strong>Mathematical Vulnerability Addressed:</strong> Centralized sequential recommendation leaks temporal user trajectory and location fingerprints. Traditional DP mechanisms suffer from extreme utility degradation.',
      '<strong>Mechanism Replacement:</strong> Discovered instability in the Exponential Mechanism for item sampling and replaced it with a calibrated <strong>Laplace perturbation mechanism</strong>, preventing divergent client gradients.',
      '<strong>View-CL Innovation:</strong> Developed View-based Contrastive Learning to recover latent sequential signals even when item representations are masked under strict $\\epsilon$-differential privacy.',
      '<strong>Confidentiality Notice:</strong> Master Thesis manuscript and defense slide deck are under academic review. Full dissertation available upon verified academic or recruiter request.'
    ]
  },
  'splunk-siem': {
    title: 'Splunk SIEM Enterprise SOC Lab & Real Attack Detection',
    subtitle: '3-VM Virtualized Security Operations Environment',
    badge: 'SOC Operations & Threat Hunting',
    badgeClass: 'badge-security',
    architecture: `
┌───────────────────────────┐         ┌───────────────────────────┐
│     ATTACKER MACHINE      │         │     PROTECTED TARGET      │
│     (Kali Linux VM)       │         │  (Ubuntu Server 22.04 VM) │
│                           │         │                           │
│ • Hydra: SSH Brute-Force  │────────▶│ • Apache2 Web Server      │
│   (600+ failed attempts)  │         │ • OpenSSH Service         │
│ • Nikto: Web Scan (404s)  │         │ • Splunk Universal Fwd    │
└───────────────────────────┘         └─────────────┬─────────────┘
                                                    │ Real-time Port 9997
                                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ SPLUNK ENTERPRISE INDEXER & SEARCH HEAD (VM 3)                  │
│                                                                 │
│  Custom SPL Threat Hunting Queries:                             │
│  1. SSH Brute-Force Detection:                                  │
│     index=security sourcetype=auth "Failed password"            │
│     | stats count by src_ip, user                               │
│     | where count > 10                                          │
│                                                                 │
│  2. Web Vulnerability Scanner Burst:                            │
│     index=web sourcetype=access_combined status=404             │
│     | bucket _time span=1m | stats count by _time, clientip     │
│     | where count > 50                                          │
│                                                                 │
│  Multi-Panel Security Dashboard & Real-Time Alert Triggers     │
└─────────────────────────────────────────────────────────────────┘`,
    details: [
      '<strong>Simulated Scenarios:</strong> Executed distributed dictionary attacks with Hydra generating 600+ failed authentication logs; ran automated web crawlers with Nikto targeting hidden directories.',
      '<strong>Detection Engineering:</strong> Authored custom SPL rules isolating rapid credential stuffing and scanning heuristics, correlating source IP reputations.',
      '<strong>Alerting & Dashboarding:</strong> Configured automated trigger conditions notifying on anomalous threshold breaches with visualized attack progression charts.'
    ]
  },
  'category-mapper': {
    title: 'High-Scale Taxonomy Vector Search & Category Mapping Pipeline',
    subtitle: 'FastAPI, OpenAI Embeddings, PostgreSQL & pgvector (IVFFLAT)',
    badge: 'Distributed Systems & Vector DB',
    badgeClass: 'badge-ai',
    architecture: `
[ Raw Taxonomy CSV (Amazon/Walmart/ONDC) ]
           │
           ▼
[ build_cleaned_breadcrumbs.py ]
    • Stopword elimination & delimiter normalization
    • Segment hierarchy preservation
           │
           ▼
[ OpenAI text-embedding-3-large (3,072 Dims) ]
    • Batch embedding generation with checkpointing & resume logic
           │
           ▼
[ PostgreSQL Database with pgvector Extension ]
    • Schema: (id, input_id, breadcrumb, cleaned_breadcrumb, breadcrumb_embedding)
    • IVFFLAT Indexing: CREATE INDEX USING ivfflat (vector_cosine_ops) WITH (lists=100)
           │
           ▼
[ FastAPI Retrieval API (/api/v1/category-mapper) ]
    • Executes cosine similarity (<=> operator)
    • Sub-50ms Approximate Nearest Neighbor (ANN) query execution`,
    details: [
      '<strong>Performance Scale:</strong> Handled multi-gigabyte category taxonomies (over 100K+ taxonomy paths), enabling cross-marketplace breadcrumb alignment.',
      '<strong>Multimodal Vision Mapping:</strong> Built complementary vision-retrieval endpoint using Gemini image labeling concatenated with query vectors.',
      '<strong>Production Resiliency:</strong> Checkpointing mechanism ensures zero data loss during multi-hour bulk embedding ingestion jobs.'
    ]
  }
};

function initTechnicalModal() {
  const modalBackdrop = document.getElementById('techModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const inspectBtns = document.querySelectorAll('.inspect-spec-btn');

  if (!modalBackdrop) return;

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const specKey = btn.getAttribute('data-spec');
      const data = TECHNICAL_SPECS_DATA[specKey];

      if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalSubtitle').textContent = data.subtitle;
        
        const badgeEl = document.getElementById('modalBadge');
        badgeEl.textContent = data.badge;
        badgeEl.className = `project-type-badge ${data.badgeClass}`;

        document.getElementById('modalArchitecture').textContent = data.architecture.trim();

        const detailsList = document.getElementById('modalDetailsList');
        detailsList.innerHTML = '';
        data.details.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = item;
          detailsList.appendChild(li);
        });

        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
  });
}

/* ==========================================================================
   4. COPY BUTTONS & UTILITIES
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
