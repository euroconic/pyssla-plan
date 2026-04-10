# Architecture: Pyssla Plan

## Overview

Pyssla Plan is a client-side React SPA with zero backend dependencies. All state lives in the browser. The app can be deployed as static files to any CDN.

```
Browser
  |
  +-- index.html (Vite entry)
        |
        +-- main.jsx (React mount)
              |
              +-- App.jsx (state hub)
                    |
                    +-- Grid.jsx (drawing canvas)
```

## Component Architecture

### App.jsx - State Hub (288 lines)

All application state is lifted here. No Context, no Redux - plain `useState` + `useRef`.

**State:**
| Variable | Type | Purpose |
|----------|------|---------|
| `grid` | `string[][]` | 2D array of hex colors (29x29 or 18x18) |
| `selectedColor` | `string` | Current brush color hex |
| `tool` | `string` | Active tool: `pencil`, `eraser`, `bucket` |
| `currentBoard` | `object` | `{ id, name, size, icon }` |
| `patternName` | `string` | User-editable pattern name |
| `isEditingName` | `boolean` | Name input visibility toggle |

**Refs:**
| Ref | Purpose |
|-----|---------|
| `fileInputRef` | Hidden file input for Load |
| `nameInputRef` | Name text input for focus |
| `historyRef` | Undo stack (array of grid snapshots, max 50) |

**Data flow:**
```
User action -> App handler -> setGrid() -> Grid re-renders
                    |
                    +-> historyRef.push(previousGrid)
```

### Grid.jsx - Drawing Canvas (92 lines)

Pure rendering + input handling. No state except a `dragAction` ref for tracking mouse drag.

**Rendering:** CSS Grid with `gridTemplateColumns: repeat(size, minmax(0, 1fr))`. Each cell is a `<div>` with inline `backgroundColor`.

**Input model:**
```
mouseDown on cell
  -> determine action (paint/erase based on tool + smart pencil logic)
  -> store in dragAction ref
  -> apply to cell

mouseEnter on cell (while dragging)
  -> apply same action

mouseUp / mouseLeave on grid container
  -> clear dragAction ref
```

**Smart Pencil logic:** When tool is `pencil` and the clicked cell already has the selected color, the action flips to `erase`. This reduces toolbar clicks for kids.

**Bucket tool:** Applies selected color to the clicked cell. No drag - action completes on mouseDown.

## Utility Modules

### utils/colors.js

Exports:
- `PYSSLA_COLORS`: Array of 15 `{ name, hex }` objects matching IKEA bead colors
- `GRID_SIZE`: Default board size constant (29)

### utils/defaultPattern.js

Exports:
- `DEFAULT_PATTERN`: 29x29 grid array - Arthur's example pattern loaded on first visit

### utils/patternLibrary.js

Mock pattern generator (not used in current UI after Magic Maker removal). Exports `generatePattern(keyword)` which matches keywords like "santa", "heart", "smile" to hardcoded patterns.

## File Format (.pyssla)

JSON file with schema:
```json
{
  "grid": [["#FFFFFF", ...], ...],
  "boardId": "large" | "small",
  "name": "Pattern Name",
  "version": 1
}
```

Save: `JSON.stringify()` -> `Blob` -> `URL.createObjectURL()` -> download link click
Load: `FileReader.readAsText()` -> `JSON.parse()` -> validate `data.grid` is array -> set state

## Undo System

Stack-based, stored in `historyRef` (useRef, not useState - avoids re-renders on push).

```
[draw action]
  -> push current grid to historyRef.current
  -> if length > 50, shift oldest
  -> setGrid(newGrid)

[undo]
  -> pop from historyRef.current
  -> setGrid(popped)

[board change / file load]
  -> historyRef.current = []  (reset)

[clear board]
  -> push current grid (clear is undoable)
```

## Print System

Defined in `index.css` `@media print` rules:

1. Hide all chrome: `header`, `aside`, `.fixed` -> `display: none`
2. Reset layout: `body`, `main` -> `display: block`, white background, no margins
3. Preserve grid: `.inline-grid` keeps its CSS Grid display (critical - earlier bug had `div { display: block }` which broke this)
4. Enforce 5mm cells: `.inline-grid > div` -> `width: 5mm; height: 5mm`
5. Force colors: `print-color-adjust: exact; -webkit-print-color-adjust: exact`
6. Guide borders: `border: 0.1mm solid #ddd` on each cell

Before calling `window.print()`, the app temporarily sets `document.title` to the pattern name so browsers use it as the PDF filename.

## Styling

Tailwind CSS 3 with custom color tokens in `tailwind.config.js`:
```
pyssla-red, pyssla-blue, pyssla-green, pyssla-yellow,
pyssla-black, pyssla-white, pyssla-brown, pyssla-orange,
pyssla-purple, pyssla-pink
```

Layout: Flexbox-based responsive design. Sidebar left on desktop (`md:flex-row`), stacks below on mobile (`flex-col`).

## Test Architecture

Vitest + jsdom + React Testing Library. Config in `vite.config.js` `test` block.

```
src/
  test/setup.js              # @testing-library/jest-dom import
  utils/colors.test.js       # 4 tests - palette validation
  utils/patternLibrary.test.js # 8 tests - pattern generation
  App.test.jsx               # 11 tests - integration (render, interactions, save)
  components/Grid.test.jsx   # 9 tests - drawing logic
```

Run: `npm test` (single), `npm run test:watch` (dev)

## Build & Deploy

- `npm run build` -> Vite produces `dist/` with hashed assets
- Static output, no SSR, no API routes
- Deploy target: Vercel (or any static host)
- No environment variables required
