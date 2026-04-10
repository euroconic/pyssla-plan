import { describe, it, expect } from 'vitest';
import { PYSSLA_COLORS, GRID_SIZE } from './colors';

describe('PYSSLA_COLORS', () => {
  it('has 15 colors (10 standard + 5 pastels)', () => {
    expect(PYSSLA_COLORS).toHaveLength(15);
  });

  it('each color has name and hex', () => {
    PYSSLA_COLORS.forEach((color) => {
      expect(color).toHaveProperty('name');
      expect(color).toHaveProperty('hex');
      expect(color.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('has no duplicate hex values', () => {
    const hexes = PYSSLA_COLORS.map((c) => c.hex);
    expect(new Set(hexes).size).toBe(hexes.length);
  });

  it('includes white (#FFFFFF) for eraser compatibility', () => {
    expect(PYSSLA_COLORS.some((c) => c.hex === '#FFFFFF')).toBe(true);
  });
});

describe('GRID_SIZE', () => {
  it('defaults to 29 (large IKEA board)', () => {
    expect(GRID_SIZE).toBe(29);
  });
});
