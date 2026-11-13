# Portfolio updates on the latest GitHub design - November 2026

## Source and preservation

The checkout was fast-forwarded to GitHub main commit `ba795d9` (`rca update`), including the newer `structure change` and `sticky split project section` revisions. The earlier local work is preserved in Git stash `Backup approved portfolio content before updating to GitHub ba795d9` and a separate temporary ZIP. TODO inputs remain intact.

The content updates were reapplied to this newer source. The homepage hero, sticky split showcase, archive's sticky search/filter explorer, theme controls, responsive layouts, and redesigned case-study HUD, pipeline, resources, gallery and dossier are preserved. No changes were pushed or published.

## Content and navigation

- Homepage: four highlighted projects, with RCA first and the merged marketplace platform second, as requested. The existing sticky split design and card styling remain.
- Archive: 11 unique projects, six featured metadata entries, 7 AI/overlap, 8 security/overlap and 4 overlap projects. The merged platform is second in the default archive ordering as well.
- One canonical Marketplace Category Intelligence case study replaces scraper, taxonomy, multimodal insight and API entries. Their four historical anchors remain inside the combined card on both pages; old case-study keys resolve to the same modal.
- Internship foundation is distinguished from full-time monthly automation and expansion to nine marketplaces. Offline statistical/Gemini preparation writes monthly JSONB columns; online FastAPI services retrieve precomputed insights for MSC IQ.
- RCA describes 30 completed diagnostics across Marketing, Orders, Business and Inventory, using Python analytical evidence gathering, AI root-cause reasoning and typed seller reports. Read-only refers specifically to PostgreSQL table access.
- The upstream 28-diagnostic/six-domain snapshot was superseded by the explicit November owner-approved facts in this task. No unsupported diagnostic names or updated accuracy measurements were invented. The historical 50+ rule figure remains excluded pending verification.
- Query/evidence-fetch latency is identified as over 60 seconds to under 7 seconds (88%+), separately from complete AI answer latency.

## Files changed

| File | Changes |
| --- | --- |
| `index.html` | Preserved the latest page shell and showcase; updated experience bullets, canonical links, RCA facts, four highlights and the platform's second position. |
| `projects.html` | Preserved the latest explorer and modal structure; merged the four related cards, updated counts and RCA copy, retained legacy anchors, and added batch capability filters. |
| `script.js` | Preserved the latest theme, fuzzy search, suggestions, result ranking, project status, HUD and dossier rendering. Added the canonical case study, backward-compatible aliases, evidence-grounded RCA, verified HUD values, diagrams/details, filtered direct-link reveal and keyboard/focus support. |
| `style.css` | Retained the latest stylesheet. Extended existing curated-card selectors to include the new highlight and added styles scoped to the merged diagrams, anchors and case-study details. |
| `README.md` | Updated flagship narratives, architecture diagrams, source/design provenance, links and validation commands. |
| `work-experience/kas-global-commerce-master-record.md` | Updated the existing dossier with chronology, platform boundaries, metrics, evidence-grounded RCA, STAR stories and role-specific summaries. |
| `docs/` | Editable Mermaid architecture sources and optional compact resume LaTeX variants. |
| `assets/resumes/` | Preserved the two primary GitHub PDFs' two-page designs and links while correcting their experience/RCA text. Retained the additional one-page AI-security variant. |
| `tests/` | Updated integrity and browser checks for the latest design, four highlights, second position, search, themes, legacy links and responsive behavior. |

## Validation

- `node --check script.js`: passed.
- `node --test tests/portfolio.test.mjs`: eight tests passed, covering unique counts, aliases, local links/media and architecture boundaries.
- `node tests/browser-check.mjs`: passed on both pages, including search by legacy component terms, typo matching, shareable filters, direct links, keyboard controls, screenshot zoom, Escape and focus restoration.
- Compared computed layout properties with the fetched GitHub baseline at 390px, 768px and 1440px: header, hero, sticky showcase, archive sidebar and results layout match.
- Light/dark themes, the four-card metric HUD, dossier and existing modal shell remain functional. The new diagrams fit tested phone/tablet/desktop widths and were visually inspected.
- The latest responsive timeline is horizontal at 1024px/1440px and stacked at 390px/768px, with no overflow. Its existing breakpoint is preserved.
- Both primary resumes retain two pages, their existing link counts and surrounding role headings. Replacements fit the original paragraph areas, all inserted glyphs were checked, and updated pages were visually inspected.
- Browser QA blocked external font/icon CDNs for deterministic local checks; external CDN availability was not verified.
- `git diff --check`: passed.

Run design comparison checks with a local server for the fetched baseline and `DESIGN_BASELINE_URL` set to that server's address. The regular browser checks need only the updated local site and a dedicated Chrome debugging session; see README.
