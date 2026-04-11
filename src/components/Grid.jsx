import React, { useRef } from 'react';

const Grid = ({ grid, onGridChange, selectedColor, tool }) => {
    // We use dragAction to track the state of the current stroke: 'paint' or 'erase'
    const dragAction = useRef(null);
    const size = grid.length;

    const handleMouseDown = (row, col) => {
        // 1. Bucket is immediate, no drag
        if (tool === 'bucket') {
            updateCell(row, col, selectedColor);
            return;
        }

        // 2. Determine Action for this stroke
        let action = 'paint'; // Default

        if (tool === 'eraser') {
            action = 'erase';
        } else {
            // Smart Pencil: Toggle logic
            // If the cell is ALREADY the selected color, this click/drag becomes an ERASE action.
            // Otherwise, it's a paint action.
            const currentCellColor = grid[row][col];
            if (currentCellColor === selectedColor) {
                action = 'erase';
            }
        }

        dragAction.current = action;
        applyAction(row, col, action);
    };

    const handleMouseEnter = (row, col) => {
        // Only continue if we are currently dragging (mouse is down)
        if (dragAction.current) {
            applyAction(row, col, dragAction.current);
        }
    };

    const handleMouseUp = () => {
        dragAction.current = null;
    };

    const applyAction = (row, col, action) => {
        const targetColor = action === 'erase' ? '#FFFFFF' : selectedColor;
        updateCell(row, col, targetColor);
    };

    const updateCell = (row, col, color) => {
        // Optimization: Don't trigger update if color is unchanged
        if (grid[row][col] === color) return;

        const newGrid = [...grid];
        newGrid[row] = [...grid[row]];
        newGrid[row][col] = color;
        onGridChange(newGrid);
    };

    return (
        <div
            className="inline-grid gap-[1px] bg-gray-300 border-4 border-gray-400 rounded-lg shadow-xl"
            style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                touchAction: 'none'
            }}
            // Attach handlers to the container to catch mouse up/leave globally if possible, 
            // but usually for grid drawing, attachment to container is good for Leave.
            // But for individual cells we need Enter.
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
        >
            {grid.map((row, rIndex) => (
                row.map((color, cIndex) => (
                    <div
                        key={`${rIndex}-${cIndex}`}
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 cursor-pointer hover:opacity-90 transition-opacity duration-75"
                        style={{ backgroundColor: color }}
                        onMouseDown={(e) => {
                            e.preventDefault(); // Prevent text selection/drag weirdness
                            handleMouseDown(rIndex, cIndex);
                        }}
                        onMouseEnter={() => handleMouseEnter(rIndex, cIndex)}
                    />
                ))
            ))}
        </div>
    );
};

export default Grid;
