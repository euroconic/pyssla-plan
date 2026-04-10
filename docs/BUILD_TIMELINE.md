# Build Timeline: Pyssla Plan

How a bedtime idea became a shipped product in two sessions.

---

## The Origin

My son Arthur (7) loves IKEA Pyssla beads. Every weekend we'd sit at the table, he'd freestyle patterns on the pegboard, run out of beads halfway, get frustrated, and start over. I thought: what if he could plan the pattern digitally first, print it 1:1, and lay it under the pegboard as a guide?

I searched for existing tools. Found Hama Universe (ad-heavy, no print), Perlypop (paywalled), a few dead web apps. Nothing that was free, clean, kid-safe, and printable at real bead scale.

So I decided to build it.

---

## Phase 1: Prototype (December 24, 2025)

**Christmas Eve. Single evening session.**

| Time | What happened |
|------|--------------|
| 19:10 | First commit. React + Vite + Tailwind scaffolding. Basic grid canvas, color palette with 15 official IKEA Pyssla colors, pencil/eraser/bucket tools |
| 19:20 | Board selector (29x29 large, 18x18 small) and 1:1 scale print CSS with 5mm cells. Core value prop working: draw a pattern, hit print, get a physical template |
| ~20:00 | Added Magic Maker - experimental voice-to-pattern feature using Web Speech API. Mock pattern generation (keyword matching, not real AI). Fun demo, not production-ready |

**Result**: Working prototype. Draw, switch boards, print at real scale. Arthur tested it and made his first digital pattern (a person with a sun and a tree).

---

## Phase 2: Research & Documentation (January 7, 2026)

**Two weeks later. Product thinking session.**

Wrote 13 research docs covering the product from every angle:

| Document | Purpose |
|----------|---------|
| Product Vision | Neuro-developmental goals: pincer grasp, visuospatial reasoning, executive function |
| Product Manifesto | Ethical design principles for kids - no dark patterns, no engagement traps |
| Implementation Plan | Feature roadmap and technical priorities |
| Competitor Review | Hama Universe, Perlypop, and other tools benchmarked |
| Growth Strategy | Zero-budget user acquisition tactics |
| Monetization Strategy | Sustainable revenue models that respect kids |
| Neuro Impact Analysis | Neuroscience research backing the pedagogical approach |
| Product Health Check | Quality metrics and readiness assessment |
| Deployment Guide | How to deploy as static SPA |
| Walkthrough | End-user guide |

**Result**: Full product context documented. The project sat waiting for the right moment to ship.

---

## Phase 3: Ship It (April 10, 2026)

**Single evening session. ~2.5 hours. Idea to live URL.**

Built with Claude Code (Opus 4.6). Every feature below was implemented, tested, and deployed in this session:

| Time | What shipped |
|------|-------------|
| 21:00 | Session start. Created CLAUDE.md for AI context. Opened dev server |
| 21:05 | Widened sidebar, 3-column color palette. Added author attribution links (Substack, Telegram, LinkedIn, GitHub) |
| 21:10 | Removed Magic Maker - mock AI wasn't production quality, cut it |
| 21:15 | Fixed print bug: CSS `div { display: block !important }` was killing the grid layout in print view. Root-caused and fixed |
| 21:20 | Set up Vitest + React Testing Library. Wrote 32 tests across 4 files (utilities, App integration, Grid component) |
| 21:30 | Added editable pattern name with pencil icon above canvas. Name flows to save filename and print document title |
| 21:35 | Loaded Arthur's original pattern as the default example for new visitors |
| 21:40 | Wired up Undo button - 50-step history buffer using useRef |
| 21:45 | Pattern name used as download filename and print document title |
| 21:50 | Wrote PRD, Release Log, and Architecture docs |
| 22:00 | Created clean GitHub repo (euroconic/pyssla-plan). Configured Vite base path for GitHub Pages |
| 22:05 | Added GitHub Actions workflow (lint + test + build + deploy). Pushed. Site live at euroconic.github.io/pyssla-plan |
| 22:10 | Integrated Microsoft Clarity analytics - heatmaps, session recordings, custom event tags (save, load, print, board change, clear, rename) |
| 22:15 | Privacy & Safety modal: COPPA/GDPR compliance, age guidance, physical safety warnings, trademark disclaimers |
| 22:20 | Added screen time health section: WHO/AAP research on gadget harm, age-based limits table |
| 22:30 | Session timer in header: 30-minute recommended limit, progress bar, break reminder popup |
| 22:35 | Published to Substack |

**Result**: Live product at https://euroconic.github.io/pyssla-plan/

---

## By the Numbers

| Metric | Value |
|--------|-------|
| Time from idea to first prototype | 1 evening (Dec 24, 2025) |
| Time from prototype to shipped product | 1 evening (Apr 10, 2026) |
| Total active build time | ~5 hours across 2 sessions |
| Gap between sessions | 3.5 months (research + life) |
| Lines of application code | ~600 (App + Grid + Timer + Legal) |
| Tests | 32 passing |
| Dependencies | 3 runtime (React, React DOM, Lucide icons) |
| Backend | None. Static SPA |
| Cost | $0 (GitHub Pages hosting, Clarity analytics) |
| AI tooling | Claude Code (Opus 4.6) for Phase 3 |

---

## What Made It Work

1. **Cut scope ruthlessly.** Removed Magic Maker instead of polishing a demo feature. Shipped what works.
2. **Physical-first design.** The app exists to get kids OFF the screen. Timer, break reminders, and 15-30 min session guidance reinforce this.
3. **Real user testing from day 1.** Arthur's pattern from the prototype became the default example in the shipped product.
4. **AI-assisted development.** Phase 3 (ship session) was pair-programmed with Claude Code. Every feature went through lint + test + build before commit. Zero rollbacks.
5. **Documentation as product.** Research docs from Phase 2 informed every decision in Phase 3 - from the privacy modal to the screen time limits.

---

## What's Next

See [PRD.md](PRD.md) section 7 (Out of Scope) for the full list. Top candidates:

- Flood fill (bucket currently fills single cell)
- Redo support
- More board shapes (hexagonal, rectangular)
- Real AI pattern generation (replace the mock)
- PWA / offline support with service worker
- Community gallery for sharing patterns
