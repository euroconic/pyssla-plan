# Release Log: Pyssla Plan

---

## v1.0.0 - 2026-04-10 - MVP Release

**Built by**: Andrew Tomin with Claude Code
**Test artwork by**: Arthur (7 y.o.)

### What shipped

**Core Drawing Engine**
- Pencil, Eraser, Fill Bucket tools with click-and-drag support
- Smart Pencil: clicking a cell that already matches your selected color auto-erases it
- 15-color palette matching official IKEA Pyssla bead colors (10 standard + 5 pastels)
- Undo support with 50-step history buffer
- Clear board with confirmation dialog

**Board System**
- Large Square (29x29) - matches IKEA large pegboard
- Blue Square (18x18) - matches IKEA small pegboard
- Board switching with confirmation (clears current design)

**File Operations**
- Save as `.pyssla` file (JSON format) with pattern name as filename
- Load `.pyssla` or `.json` files with auto-detection of board size
- Pattern name stored in file, restored on load

**Pattern Naming**
- Editable pattern name above the canvas
- Inline editing with pencil icon, confirm with Enter or checkmark
- Name flows to save filename and print document title

**1:1 Scale Printing**
- CSS print rules enforce exact 5mm cell dimensions
- Hides all UI chrome in print view
- Document title set to pattern name for browser PDF filename
- Guide borders for pegboard overlay alignment

**Default Example**
- App loads with Arthur's Creation - a pattern made by a 7-year-old (person + sun + tree)
- Demonstrates the tool's output to first-time users

**Header & Attribution**
- Author links: Substack, Telegram (productiz), LinkedIn, GitHub

**Test Suite**
- 32 tests across 4 test files using Vitest + React Testing Library
- Coverage: utilities (colors, pattern generation), App component (render, interactions, save), Grid component (paint, erase, smart pencil, drag, undo)

**Infrastructure**
- Vite 7 build system with React 19
- Tailwind CSS 3 with custom IKEA color palette
- ESLint 9 flat config
- Static SPA - no backend required

### What changed from initial prototype

| Before | After |
|--------|-------|
| Magic Maker (mock AI voice-to-pattern) | Removed - not production-ready |
| No undo | 50-step undo history |
| No pattern naming | Editable name with pencil icon |
| Generic timestamp filenames | Pattern name as filename |
| Print broken (CSS `div { display: block }` killed grid) | Print working with preserved grid layout |
| No tests | 32 tests, Vitest configured |
| 2-column color palette in narrow sidebar | 3-column palette in wider sidebar |
| Empty grid on load | Arthur's example pattern as default |

### Known limitations

- No redo (only undo)
- Fill bucket paints single cell, not flood fill
- Pattern generation in `patternLibrary.js` is mock/keyword-based, not real AI
- No offline-first caching (works offline after load, but no service worker)
- Print scale depends on browser's CSS unit rendering

### File format spec (v1)

```json
{
  "grid": [["#FFFFFF", "#E11A2B", ...], ...],
  "boardId": "large",
  "name": "Arthur's Creation",
  "version": 1
}
```

### Test commands

```bash
npm test          # Single run (vitest run)
npm run test:watch # Watch mode (vitest)
npm run build     # Production build
npm run lint      # ESLint check
```
