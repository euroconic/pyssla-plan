# Implementation Plan - Pyssla Plan App

# Goal Description
Build a specialized web application for kids to create IKEA Pyssla bead patterns.
**Key Differentiator:** strictly constrained to the actual IKEA Pyssla color palette (unlike generic apps with 100+ colors), ensuring kids can actually build what they design with the beads they have.
**Target Audience:** Kids (Simple UI, large touch targets, no login required).

## User Review Required
> [!IMPORTANT]
> **Tech Stack Selection:** Proposing **Vite + React** for the interactive grid state management. This is more robust than Vanilla JS for a complex drawing app.
> **Palette Constraint:** The app will default to the standard IKEA Pyssla Mixed Tub colors (approx 15 colors).

## Proposed Changes
### core Application Structure
#### [NEW] [Project Scaffolding]
*   Initialize `vite` project in the workspace.
*   Setup basic layout (Canvas area, Toolbar, Color Picker).
*   **Responsive Design:** Use CSS Grid/Flexbox to ensure the layout adapts to smaller screens (mobile/tablet). Hide non-essential UI on small screens if necessary.
*   **AI Integration:** Setup API handlers for Image Generation.

### Feature: AI Pattern Generator (Minimum Flow)
#### [NEW] [VoiceInputComponent]
*   Big Microphone Button.
*   Uses **Web Speech API** for Speech-to-Text (Browser native, free).
*   Text Input fallback.

#### [NEW] [PatternGenerator]
*   Logic: Input -> Image Gen API (e.g. OpenAI DALL-E 2/3 or similar) -> Request "Pixel art, simple, white background".
*   **Quantization:** Receive image -> Resize to 29x29 -> Map pixels to nearest IKEA Pyssla color.
*   **Selection UI:** Display 5 generated variants. User clicks one -> Loads into Grid Editor.

### Feature: Bead Grid & Editor
#### [NEW] [GridComponent]
*   Interactive Grid.
*   **Board Selector:** feature to switch between board sizes/shapes.
    *   Large Square (29x29) - Standard IKEA.
    *   Small Square (15x15).
    *   (Future) Shapes like Heart/Circle.
*   Zoom/Pan capabilities (Critical for mobile small screens).
*   **Touch Support:** Implement logic to distinguish between "scrolling" and "drawing". Likely prevent default touch actions on the grid area.
*   Tools: Pencil, Eraser, Bucket Fill.

### Feature: Pyssla Palette
#### [NEW] [ColorManager]
*   Hardcoded RGB/Hex values for official IKEA Pyssla colors:
    *   Brights: Red, Blue, Green, Yellow, Orange, Purple, Pink, Black, White, Brown
    *   Pastels: Pastel Pink, Pastel Blue, Pastel Green, etc.

### Feature: Export & Print
### Feature: Export & Print
#### [NEW] [ExportUtils]
*   **Killer Feature:** "Real-size Print". Generate an image/PDF where beads are exactly 5mm, allowing the physical pegboard to be placed on top of the printout.
*   **Data Schema (PostgreSQL):**
    ```sql
    table patterns {
      id: uuid (pk),
      name: text,
      author_name: text, -- e.g. "Leo (Age 6)"
      grid_data: jsonb,
      board_type: text,
      tags: text[],
      
      -- Social Metrics 🚀
      views: int default 0,
      downloads: int default 0,
      remixes: int default 0, -- "Reused for own building"
      likes: int default 0,
      
      created_at: timestamp
    }
    ```
*   **Social UI:**
    *   **Badges:** Show "🔥 500 Downloads" or "♻️ 20 Remixes" on cards.
    *   **Author Credit:** "Created by [Name]" prominently displayed.
    *   **Remix Flow:** When a user clicks a community design, we increment `views`. If they edit and save, we increment `remixes` on the original.color preservation. (User asked for Excel/XML -> explain JSON is the modern equivalent for web apps).

## Verification Plan
### Automated Tests
*   `npm run test` (if unit tests are added for logic).
*   `npm run build` to verify production assets.

### Manual Verification
1.  **Grid Interaction:** Verify clicking cells changes colors correctly.
2.  **Palette Check:** Ensure colors match "real world" Pyssla beads visually.
3.  **Print Test:** (User Action) Print a generated pattern and verify it aligns with a physical 5mm pegboard (Standard Pyssla/Hama Midi size).
