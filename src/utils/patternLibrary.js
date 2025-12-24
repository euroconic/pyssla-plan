import { GRID_SIZE, PYSSLA_COLORS } from './colors';

// Helper to get color values
const C = {
    Red: '#E11A2B',
    Blue: '#005CB9',
    Green: '#00904A',
    Yellow: '#F9D529',
    Black: '#1D1D1B',
    White: '#FFFFFF',
    Brown: '#794528',
    PastelYellow: '#FDF3B4'
};

const createEmptyGrid = () => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(C.White));

const drawRect = (grid, r, c, w, h, color) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (r + i < GRID_SIZE && c + j < GRID_SIZE) grid[r + i][c + j] = color;
        }
    }
};

const drawPixel = (grid, r, c, color) => {
    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) grid[r][c] = color;
};

export const generatePattern = (keyword) => {
    const grid = createEmptyGrid();
    const center = Math.floor(GRID_SIZE / 2);
    const key = keyword.toLowerCase();

    if (key.includes('santa')) {
        const cx = 14;
        const top = 4;
        // Simple Santa
        drawRect(grid, top, cx, 2, 1, C.Red); // Hat tip
        drawRect(grid, top + 1, cx - 1, 4, 1, C.Red);
        drawRect(grid, top + 2, cx - 2, 6, 1, C.Red); // Hat Base
        drawRect(grid, top + 3, cx - 1, 4, 3, C.PastelYellow); // Face
        drawPixel(grid, top + 4, cx - 1 + 1, C.Blue); // Eye
        drawPixel(grid, top + 4, cx - 1 + 2, C.Blue); // Eye
        drawRect(grid, top + 6, cx - 2, 6, 2, C.Red); // Body
        drawRect(grid, top + 8, cx - 2, 6, 1, C.Black); // Belt
        drawPixel(grid, top + 8, cx, C.Yellow); // Buckle
        drawRect(grid, top + 9, cx - 1, 1, 3, C.Red); // Leg L
        drawRect(grid, top + 9, cx + 2, 1, 3, C.Red); // Leg R
        drawRect(grid, top + 12, cx - 2, 2, 1, C.Black); // Boot L
        drawRect(grid, top + 12, cx + 2, 2, 1, C.Black); // Boot R
        return grid;
    }

    if (key.includes('heart') || key.includes('love')) {
        const color = C.Red;
        for (let i = 0; i < 6; i++) {
            drawPixel(grid, center - 2, center - 4 + i, color); drawPixel(grid, center - 2, center + 1 + i, color);
            drawPixel(grid, center - 3, center - 5 + i, color); drawPixel(grid, center - 3, center + 2 + i, color);
        }
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 16 - r * 2; c++) drawPixel(grid, center - 1 + r, center - 7 + r + c, color);
        }
        return grid;
    }

    if (key.includes('smile') || key.includes('face')) {
        const color = C.Yellow;
        const black = C.Black;
        for (let r = -8; r <= 8; r++) {
            for (let c = -8; c <= 8; c++) {
                if (r * r + c * c <= 64) drawPixel(grid, center + r, center + c, color);
            }
        }
        drawPixel(grid, center - 3, center - 3, black); drawPixel(grid, center - 3, center + 3, black);
        drawPixel(grid, center + 3, center - 4, black); drawPixel(grid, center + 4, center - 3, black);
        drawPixel(grid, center + 4, center - 2, black); drawPixel(grid, center + 4, center - 1, black);
        drawPixel(grid, center + 4, center, black); drawPixel(grid, center + 4, center + 1, black);
        return grid;
    }

    // Default: Random Art
    const color = PYSSLA_COLORS[Math.floor(Math.random() * PYSSLA_COLORS.length)].hex;
    for (let r = center - 5; r <= center + 5; r++) {
        drawPixel(grid, r, r, color);
        drawPixel(grid, r, GRID_SIZE - 1 - r, color);
        drawPixel(grid, r, center, color);
        drawPixel(grid, center, r, color);
    }
    return grid;
};
