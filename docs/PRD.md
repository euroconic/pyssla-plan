# Product Requirements Document: Pyssla Plan

**Product**: Pyssla Plan
**Author**: Andrew Tomin
**Version**: 1.0
**Date**: 2026-04-10
**Status**: MVP Shipped

---

## 1. Problem Statement

Kids aged 4-10 who play with IKEA Pyssla (or Hama) beads lack a digital tool to plan patterns before placing physical beads. Current workflow: kids either copy paper templates or freestyle on the pegboard - both lead to wasted beads, frustration from mistakes, and no way to save/share designs.

Existing competitors (Hama Universe, Perlypop) are either ad-heavy, locked behind paywalls, or don't support 1:1 physical printing.

## 2. Target Users

| Segment | Description |
|---------|-------------|
| **Primary** | Children aged 4-10, guided by parents |
| **Secondary** | Parents/caregivers who facilitate bead activities |
| **Tertiary** | Teachers, therapists using beads for motor skill development |

## 3. Product Vision

A kid-friendly, zero-friction pattern builder that bridges digital creativity with physical crafting. No accounts, no ads, no dark patterns. Open the browser and start drawing.

**Design principles**:
- Healthy Kid design: no addictive mechanics, no engagement traps
- Physical-first: digital planning serves the physical activity, not replaces it
- Neuro-developmental scaffolding: supports pincer grasp, visuospatial reasoning, executive function

## 4. Functional Requirements

### 4.1 Drawing Tools (MVP - Shipped)

| Feature | Description | Status |
|---------|-------------|--------|
| **Pencil** | Click/drag to paint cells with selected color | Shipped |
| **Eraser** | Click/drag to remove color (set to white) | Shipped |
| **Smart Pencil** | Click on cell already matching selected color toggles to erase | Shipped |
| **Fill Bucket** | Click to fill a single cell (no flood fill) | Shipped |
| **Undo** | Reverts last drawing action, up to 50 steps | Shipped |
| **Clear Board** | Resets entire grid to white (with confirmation) | Shipped |

### 4.2 Color Palette (MVP - Shipped)

15 colors matching official IKEA Pyssla bead set:
- 10 standard: Red, Blue, Green, Yellow, Black, White, Brown, Orange, Purple, Pink
- 5 pastels: Pastel Pink, Pastel Blue, Pastel Green, Pastel Yellow, Pastel Purple

### 4.3 Board Sizes (MVP - Shipped)

| Board | Dimensions | Maps to |
|-------|-----------|---------|
| Large Square | 29x29 | IKEA large pegboard |
| Blue Square | 18x18 | IKEA small pegboard |

### 4.4 Pattern Naming (MVP - Shipped)

- Editable pattern name displayed above the grid
- Pencil icon to enter edit mode, Enter or checkmark to confirm
- Name carries through to save (filename) and print (document title)
- Defaults to "Arthur's Creation" with example pattern on first load
- Resets to "Untitled" on board change or clear

### 4.5 Save/Load (MVP - Shipped)

| Feature | Description |
|---------|-------------|
| **Save** | Downloads `.pyssla` file (JSON) named after the pattern |
| **Load** | Opens `.pyssla` or `.json` file, restores grid + board size + name |
| **File format** | `{ grid: string[][], boardId: string, name: string, version: 1 }` |

### 4.6 Print (MVP - Shipped)

- 1:1 scale printing: each cell renders at exactly 5mm (matching physical bead pitch)
- Print hides all UI chrome (header, sidebar, FAB)
- Document title set to pattern name for PDF filename
- Light guide borders on each cell for pegboard overlay

### 4.7 Default Example Pattern (MVP - Shipped)

- App loads with a pre-made pattern by Arthur (7 y.o.) as showcase
- Demonstrates a person figure + sun + tree composition

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Performance** | <1s initial load, instant drawing response |
| **Accessibility** | Touch-friendly cells, responsive layout (mobile + desktop) |
| **Privacy** | Zero data collection. No analytics, no cookies, no accounts |
| **Offline** | Fully functional offline after initial load (static SPA) |
| **Browser support** | Chrome, Safari, Firefox, Edge (latest 2 versions) |

## 6. Tech Stack

- React 19, Vite 7, Tailwind CSS 3
- No backend, no database, no auth
- Static SPA deployable to any CDN (Vercel, Netlify, GitHub Pages)

## 7. Out of Scope (v1)

- User accounts and cloud storage
- Real AI pattern generation (current patternLibrary.js is a placeholder)
- Flood fill (bucket currently fills single cell only)
- Redo functionality
- Multi-board / pegboard linking
- Gallery/community features
- Multilingual UI
- Mobile native app

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to first drawing | <10 seconds | Manual testing |
| Print accuracy | 1:1 physical match on A4 paper | Physical verification |
| Save/Load round-trip | Lossless | Automated test |
| Test coverage | 32 tests passing | `npm test` |

## 9. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Print scale varies by browser | Wrong physical size | CSS `5mm` units + print-color-adjust |
| Large grids slow on mobile | Poor UX on phones | Responsive cell sizing, touch optimized |
| .pyssla format changes | Can't load old files | Version field in file format |
