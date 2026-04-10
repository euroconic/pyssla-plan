# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pyssla Plan is a kid-friendly pattern builder for IKEA Pyssla/Hama beads. React SPA with drawing tools, 1:1 scale printing, save/load as `.pyssla` (JSON) files, and undo support. All client-side, no backend.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run lint` — ESLint (flat config, ESLint 9)
- `npm run preview` — Serve production build locally
- `npm test` — Run Vitest (single run)
- `npm run test:watch` — Vitest in watch mode

## Architecture

**State lives in App.jsx** — grid (2D hex array), selectedColor, tool (`pencil`/`eraser`/`bucket`), board config, patternName, undo history. All state lifted to App and passed down as props.

**Two components:**
- `Grid.jsx` — Interactive drawing canvas using CSS Grid. Handles mouse/touch drag with a `dragAction` ref. Smart pencil: clicking the already-selected color toggles eraser mode.
- `App.jsx` — Orchestrates everything: toolbar, color palette, board selector, save/load/print, editable pattern name, undo.

**Key utilities:**
- `utils/colors.js` — `PYSSLA_COLORS` (15 official IKEA colors + pastels), `GRID_SIZE` constant (29)
- `utils/defaultPattern.js` — Arthur's example pattern loaded on first visit
- `utils/patternLibrary.js` — Deterministic pattern generators (santa, heart, smile). Not used in UI, kept for potential future use.

**Undo system** — `historyRef` (useRef) stores up to 50 grid snapshots. Push on every grid change, pop on undo. Resets on board switch/file load. Clear is undoable.

**Print system** — `index.css` `@media print` rules enforce 5mm cells for 1:1 physical pegboard overlay. Hides all UI chrome. Document title set to pattern name before print for PDF filename.

**File format** — `.pyssla` files are JSON: `{ version, boardId, name, grid (2D hex array) }`.

## Tech Stack

React 19 + Vite 7 + Tailwind CSS 3 + Lucide icons. JSX (no TypeScript). No state management library — plain hooks. Vitest + React Testing Library for tests.

## Tailwind Config

Custom `pyssla-*` colors defined in `tailwind.config.js` matching the physical bead palette. Content scans `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`.

## Test Structure

32 tests across 4 files:
- `src/utils/colors.test.js` — palette validation
- `src/utils/patternLibrary.test.js` — pattern generation
- `src/App.test.jsx` — integration (render, interactions, save)
- `src/components/Grid.test.jsx` — drawing logic (paint, erase, smart pencil, drag)

## Known Gaps

- `generatePattern()` in patternLibrary.js is a mock — real AI generation not implemented
- No redo (only undo)
- Fill bucket paints single cell, not flood fill
- No backend, no auth, no cloud storage
