import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Stub window.confirm to always accept
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  it('renders header with title', () => {
    render(<App />);
    expect(screen.getByText('Pyssla Plan')).toBeInTheDocument();
  });

  it('renders author links', () => {
    render(<App />);
    expect(screen.getByText('by Andrew Tomin')).toBeInTheDocument();
    expect(screen.getByText('Substack')).toHaveAttribute('href', 'https://andrewtomin.substack.com/');
    expect(screen.getByText('Telegram')).toHaveAttribute('href', 'https://t.me/productiz');
    expect(screen.getByText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/andrew-tomin-senior-product-manager/');
    expect(screen.getByText('GitHub')).toHaveAttribute('href', 'https://github.com/euroconic');
  });

  it('renders Load, Print, and Save buttons', () => {
    render(<App />);
    expect(screen.getByText('Load')).toBeInTheDocument();
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders all 15 color buttons', () => {
    render(<App />);
    expect(screen.getByTitle('Red')).toBeInTheDocument();
    expect(screen.getByTitle('Blue')).toBeInTheDocument();
    expect(screen.getByTitle('Pastel Purple')).toBeInTheDocument();
  });

  it('renders board selector with two boards', () => {
    render(<App />);
    expect(screen.getByText('Large Square (29x29)')).toBeInTheDocument();
    expect(screen.getByText('Blue Square (18x18)')).toBeInTheDocument();
  });

  it('renders tool buttons', () => {
    render(<App />);
    expect(screen.getByTitle('Pencil')).toBeInTheDocument();
    expect(screen.getByTitle('Eraser')).toBeInTheDocument();
    expect(screen.getByTitle('Fill Bucket')).toBeInTheDocument();
    expect(screen.getByTitle('Clear Board')).toBeInTheDocument();
  });

  it('starts with 29x29 grid (841 cells)', () => {
    const { container } = render(<App />);
    const gridContainer = container.querySelector('.inline-grid');
    expect(gridContainer.children).toHaveLength(29 * 29);
  });

  it('switches to 18x18 grid on board change', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByText('Blue Square (18x18)'));
    const gridContainer = container.querySelector('.inline-grid');
    expect(gridContainer.children).toHaveLength(18 * 18);
  });

  it('clears grid when Clear Board is clicked', () => {
    const { container } = render(<App />);
    // Paint a cell first
    const cells = container.querySelector('.inline-grid').children;
    fireEvent.mouseDown(cells[0]);
    expect(cells[0].style.backgroundColor).not.toBe('rgb(255, 255, 255)');

    // Clear
    fireEvent.click(screen.getByTitle('Clear Board'));
    // All cells should be white after clear
    const updatedCells = container.querySelector('.inline-grid').children;
    expect(updatedCells[0].style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('clicking a color selects it and switches to pencil tool', () => {
    render(<App />);
    // Switch to eraser first
    fireEvent.click(screen.getByTitle('Eraser'));
    // Click a color
    fireEvent.click(screen.getByTitle('Blue'));
    // Tool should switch back to pencil (pencil button gets ring class)
    expect(screen.getByTitle('Pencil').className).toContain('ring-2');
  });

  it('Save button triggers download', () => {
    const mockUrl = 'blob:test';
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const clickSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'a') {
        const el = origCreateElement('a');
        el.click = clickSpy;
        return el;
      }
      return origCreateElement(tag);
    });

    render(<App />);
    fireEvent.click(screen.getByText('Save'));
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
