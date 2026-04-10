import { describe, it, expect } from 'vitest';
import { generatePattern } from './patternLibrary';
import { GRID_SIZE } from './colors';

describe('generatePattern', () => {
  it('returns a 29x29 grid', () => {
    const grid = generatePattern('test');
    expect(grid).toHaveLength(GRID_SIZE);
    grid.forEach((row) => expect(row).toHaveLength(GRID_SIZE));
  });

  it('returns valid hex colors in every cell', () => {
    const grid = generatePattern('santa');
    grid.forEach((row) =>
      row.forEach((cell) => expect(cell).toMatch(/^#[0-9A-Fa-f]{6}$/))
    );
  });

  it('generates santa pattern with red pixels', () => {
    const grid = generatePattern('I want a santa');
    const flat = grid.flat();
    expect(flat).toContain('#E11A2B'); // red
    expect(flat).toContain('#1D1D1B'); // black (belt/boots)
  });

  it('generates heart pattern with red pixels', () => {
    const grid = generatePattern('heart');
    expect(grid.flat()).toContain('#E11A2B');
  });

  it('matches "love" keyword to heart pattern', () => {
    const grid = generatePattern('I love you');
    expect(grid.flat()).toContain('#E11A2B');
  });

  it('generates smiley with yellow and black pixels', () => {
    const grid = generatePattern('smiley face');
    const flat = grid.flat();
    expect(flat).toContain('#F9D529'); // yellow
    expect(flat).toContain('#1D1D1B'); // black eyes/mouth
  });

  it('generates default pattern for unknown keyword', () => {
    // Default pattern uses random color which could be white; just verify grid structure
    const grid = generatePattern('xyz123');
    expect(grid).toHaveLength(29);
    grid.forEach((row) => expect(row).toHaveLength(29));
  });

  it('is case-insensitive', () => {
    const lower = generatePattern('santa');
    const upper = generatePattern('SANTA');
    expect(lower).toEqual(upper);
  });
});
