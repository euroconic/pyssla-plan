import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Grid from './Grid';

const makeGrid = (size = 5, fill = '#FFFFFF') =>
  Array(size).fill(null).map(() => Array(size).fill(fill));

describe('Grid', () => {
  it('renders correct number of cells', () => {
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={makeGrid(5)} onGridChange={onGridChange} selectedColor="#E11A2B" tool="pencil" />
    );
    const gridEl = container.querySelector('.inline-grid');
    expect(gridEl.children).toHaveLength(25);
  });

  it('paints a cell on mouseDown with pencil tool', () => {
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={makeGrid(3)} onGridChange={onGridChange} selectedColor="#E11A2B" tool="pencil" />
    );
    const cells = container.querySelector('.inline-grid').children;
    fireEvent.mouseDown(cells[0]);
    expect(onGridChange).toHaveBeenCalledTimes(1);

    const newGrid = onGridChange.mock.calls[0][0];
    expect(newGrid[0][0]).toBe('#E11A2B');
  });

  it('erases a cell on mouseDown with eraser tool', () => {
    const grid = makeGrid(3);
    grid[0][0] = '#E11A2B'; // pre-paint
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={grid} onGridChange={onGridChange} selectedColor="#E11A2B" tool="eraser" />
    );
    const cells = container.querySelector('.inline-grid').children;
    fireEvent.mouseDown(cells[0]);
    expect(onGridChange).toHaveBeenCalledTimes(1);

    const newGrid = onGridChange.mock.calls[0][0];
    expect(newGrid[0][0]).toBe('#FFFFFF');
  });

  it('smart pencil: clicking already-selected color erases', () => {
    const grid = makeGrid(3);
    grid[1][1] = '#E11A2B'; // cell already has selected color
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={grid} onGridChange={onGridChange} selectedColor="#E11A2B" tool="pencil" />
    );
    // Click cell [1][1] which is at index 4 (row 1, col 1 in a 3x3)
    const cells = container.querySelector('.inline-grid').children;
    fireEvent.mouseDown(cells[4]);
    expect(onGridChange).toHaveBeenCalledTimes(1);

    const newGrid = onGridChange.mock.calls[0][0];
    expect(newGrid[1][1]).toBe('#FFFFFF');
  });

  it('does not trigger update if cell color is unchanged', () => {
    // Use eraser on a white cell (already white) — no change expected
    const grid2 = makeGrid(3); // all white
    const onGridChange2 = vi.fn();
    const { container: container2 } = render(
      <Grid grid={grid2} onGridChange={onGridChange2} selectedColor="#E11A2B" tool="eraser" />
    );
    fireEvent.mouseDown(container2.querySelector('.inline-grid').children[0]);
    // Erasing a white cell = no change
    expect(onGridChange2).not.toHaveBeenCalled();
  });

  it('supports drag painting across cells', () => {
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={makeGrid(3)} onGridChange={onGridChange} selectedColor="#005CB9" tool="pencil" />
    );
    const cells = container.querySelector('.inline-grid').children;
    fireEvent.mouseDown(cells[0]);
    fireEvent.mouseEnter(cells[1]);
    fireEvent.mouseEnter(cells[2]);
    // Should have 3 calls: mouseDown on cell 0, mouseEnter on cells 1 and 2
    expect(onGridChange).toHaveBeenCalledTimes(3);
  });

  it('stops painting on mouseUp', () => {
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={makeGrid(3)} onGridChange={onGridChange} selectedColor="#005CB9" tool="pencil" />
    );
    const gridEl = container.querySelector('.inline-grid');
    const cells = gridEl.children;
    fireEvent.mouseDown(cells[0]);
    fireEvent.mouseUp(gridEl);
    fireEvent.mouseEnter(cells[1]);
    // Only 1 call from the initial mouseDown, mouseEnter after mouseUp should not paint
    expect(onGridChange).toHaveBeenCalledTimes(1);
  });

  it('bucket tool paints without drag', () => {
    const onGridChange = vi.fn();
    const { container } = render(
      <Grid grid={makeGrid(3)} onGridChange={onGridChange} selectedColor="#00904A" tool="bucket" />
    );
    const cells = container.querySelector('.inline-grid').children;
    fireEvent.mouseDown(cells[4]); // center cell
    expect(onGridChange).toHaveBeenCalledTimes(1);

    const newGrid = onGridChange.mock.calls[0][0];
    expect(newGrid[1][1]).toBe('#00904A');
  });
});
