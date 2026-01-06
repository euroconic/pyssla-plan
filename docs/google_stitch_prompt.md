# Google Stitch Prompt: Pyssla Plan App

**Role:** Expert UI/UX Designer & Frontend Developer specialized in Kid-Friendly Interfaces.

**Goal:** Create a vibrant, playful, and responsive web application interface for "Pyssla Plan," a bead pattern creator for children.

**Tech Stack:** React, Tailwind CSS, Lucide React (for icons).

## Design Aesthetics
*   **Theme:** "Creative Playground". Use bright, primary colors reminiscent of LEGO or IKEA Pyssla beads (Red, Blue, Yellow, Green).
*   **Vibe:** Playful, rounded, bouncy, and safe.
*   **Typography:** Use a chubby, readable font like 'Nunito' or 'Comic Neue' (via Google Fonts). Large text sizes.
*   **Layout:** Spacious, large touch targets (min 48px), optimized for Tablets (iPad) and Desktop.

## Core Interface Elements

### 1. The Header (Top Bar)
*   **Logo:** Colorful text "Pyssla Plan" with a bead icon.
*   **Actions:** simple "Print" button and "Save" button.

### 2. The Main Workspace (Split View)
*   **Left Side (Desktop) / Bottom (Mobile): The Toolbar**
    *   **Palette:** a vertical scrollable list of circular color swatches. **CRITICAL**: Use ONLY these specific colors (Standard Pyssla colors):
        *   Red (#E11A2B), Blue (#005CB9), Green (#00904A), Yellow (#F9D529), Black (#1D1D1B), White (#FFFFFF), Brown (#794528), Orange (#F28020), Purple (#972D7F), Pink (#E65F8E).
    *   **Tools:** Large buttons for "Pencil" (Draw), "Eraser" (Clear), "Bucket" (Fill), "Undo". Use Lucide icons.
*   **Center: The Bead Grid**
    *   A centered card containing a 29x29 grid.
    *   Each cell should remain square.
    *   Background of grid: subtle light gray checkerboard to indicate "empty".

### 3. The "Magic Idea" Section (Top or Floating FAB)
*   A prominent, magical-looking button labeled "Make an Idea for Me!".
*   **Modal/Overlay:** When clicked, shows a large Microphone icon (Voice Input) and a text box.
*   **Result Area:** A horizontal scrollable row showing 5 placeholder "Generated Pattern" cards.

## Behavior Requirements
*   The layout must be responsive. On mobile, the Palette moves to the bottom.
*   All buttons must have a `:hover` transform (scale 1.05) and `:active` (scale 0.95) effect ("bouncy" feel).
