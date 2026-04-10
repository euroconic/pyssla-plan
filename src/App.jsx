import React, { useState, useRef } from 'react';
import { Palette, Eraser, PaintBucket, Undo, Trash2, FolderOpen, Save, Grid3X3, Maximize, Pencil, Check } from 'lucide-react';
import Grid from './components/Grid';
import { PYSSLA_COLORS, GRID_SIZE as DEFAULT_SIZE } from './utils/colors';
import { DEFAULT_PATTERN } from './utils/defaultPattern';

const track = (event, value) => {
  if (window.clarity) window.clarity('set', event, value || 'true');
};

const BOARDS = [
  { id: 'large', name: 'Large Square (29x29)', size: 29, icon: <Maximize size={20} /> },
  { id: 'small', name: 'Blue Square (18x18)', size: 18, icon: <Grid3X3 size={20} />, color: 'bg-blue-100 text-blue-700' },
];

function App() {
  const [selectedColor, setSelectedColor] = useState(PYSSLA_COLORS[0].hex);
  const [tool, setTool] = useState('pencil'); // pencil, eraser, bucket
  const [currentBoard, setCurrentBoard] = useState(BOARDS[0]);
  const [patternName, setPatternName] = useState('Arthur\'s Creation');
  const [isEditingName, setIsEditingName] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const historyRef = useRef([]);
  const MAX_UNDO = 50;

  // Lifted Grid State — default loads Arthur's example pattern
  const [grid, setGrid] = useState(DEFAULT_PATTERN);

  const handleGridChange = (newGrid) => {
    historyRef.current.push(grid);
    if (historyRef.current.length > MAX_UNDO) historyRef.current.shift();
    setCanUndo(true);
    setGrid(newGrid);
  };

  const handleUndo = () => {
    if (historyRef.current.length === 0) return;
    const prev = historyRef.current.pop();
    setCanUndo(historyRef.current.length > 0);
    setGrid(prev);
  };

  const handleBoardChange = (board) => {
    if (board.id === currentBoard.id) return;
    if (window.confirm('Changing board size will clear your current design. Continue?')) {
      setCurrentBoard(board);
      setGrid(Array(board.size).fill(null).map(() => Array(board.size).fill('#FFFFFF')));
      setPatternName('Untitled');
      historyRef.current = [];
      setCanUndo(false);
      track('board_change', board.name);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the whole design?')) {
      track('clear_board');
      historyRef.current.push(grid);
      setCanUndo(true);
      setGrid(Array(currentBoard.size).fill(null).map(() => Array(currentBoard.size).fill('#FFFFFF')));
      setPatternName('Untitled');
    }
  };

  const handleSave = () => {
    track('save_pattern', patternName);
    const data = JSON.stringify({ grid, boardId: currentBoard.id, name: patternName, version: 1 });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${patternName || 'Untitled'}.pyssla`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLoadTrigger = () => {
    fileInputRef.current.click();
  };

  const handleLoadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.grid && Array.isArray(data.grid)) {
          // Determine board size from loaded grid
          const loadedSize = data.grid.length;
          const matchedBoard = BOARDS.find(b => b.size === loadedSize) || { id: 'custom', name: 'Custom', size: loadedSize };

          setCurrentBoard(matchedBoard);
          setGrid(data.grid);
          if (data.name) setPatternName(data.name);
          historyRef.current = [];
          setCanUndo(false);
          track('load_pattern', data.name || 'unnamed');
        } else {
          alert('Invalid file format');
        }
      } catch {
        alert('Error loading file');
      }
    };
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-blue-50 relative">
      {/* Header */}
      <header className="bg-white p-4 shadow-md flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 animate-pulse"></div>
          <h1 className="text-2xl font-black tracking-tight text-blue-600">Pyssla Plan</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>by Andrew Tomin</span>
          <a href="https://andrewtomin.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Substack</a>
          <a href="https://t.me/productiz" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Telegram</a>
          <a href="https://www.linkedin.com/in/andrew-tomin-senior-product-manager/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">LinkedIn</a>
          <a href="https://github.com/euroconic" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLoadFile}
            className="hidden"
            accept=".pyssla,.json"
          />
          <button
            onClick={handleLoadTrigger}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-sm flex items-center gap-2"
          >
            <FolderOpen size={18} /> Load
          </button>
          <button
            onClick={() => {
              track('print_pattern', patternName);
              const prev = document.title;
              document.title = patternName || 'Untitled';
              window.print();
              document.title = prev;
            }}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-sm hidden md:block"
          >
            Print
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-yellow-400 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-sm flex items-center gap-2"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-0">

        {/* Left Toolbar (Palette & Tools) */}
        <aside className="w-full md:w-80 bg-white shadow-lg z-20 flex flex-col p-4 md:h-full overflow-y-auto order-2 md:order-1">

          {/* Board Selector */}
          <div className="mb-6 bg-gray-50 p-3 rounded-xl">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Board Size</h3>
            <div className="flex gap-2">
              {BOARDS.map(board => (
                <button
                  key={board.id}
                  onClick={() => handleBoardChange(board)}
                  className={`flex-1 p-2 rounded-lg text-sm font-bold flex flex-col items-center gap-1 transition-all border-2 ${currentBoard.id === board.id
                    ? (board.id === 'small' ? 'bg-blue-500 border-blue-600 text-white' : 'bg-gray-800 border-gray-900 text-white')
                    : 'bg-white border-transparent text-gray-500 hover:bg-gray-100'
                    }`}
                >
                  {board.icon}
                  {board.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="flex gap-2 mb-6 justify-center md:justify-start">
            <button
              onClick={() => setTool('pencil')}
              className={`p-3 rounded-xl transition-all ${tool === 'pencil' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Pencil"
            >
              <Palette size={24} />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-3 rounded-xl transition-all ${tool === 'eraser' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Eraser"
            >
              <Eraser size={24} />
            </button>
            <button
              onClick={() => setTool('bucket')}
              className={`p-3 rounded-xl transition-all ${tool === 'bucket' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Fill Bucket"
            >
              <PaintBucket size={24} />
            </button>
            <button
              onClick={handleUndo}
              className={`p-3 rounded-xl transition-all ${canUndo ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
              title="Undo"
            >
              <Undo size={24} />
            </button>
            <button
              onClick={handleClear}
              className="p-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
              title="Clear Board"
            >
              <Trash2 size={24} />
            </button>
          </div>

          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 text-center md:text-left">Bead Colors</h3>

          {/* Color List */}
          <div className="grid grid-cols-5 md:grid-cols-3 gap-3 pb-24 md:pb-0">
            {PYSSLA_COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => {
                  setSelectedColor(color.hex);
                  setTool('pencil');
                }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-4 transition-transform hover:scale-110 active:scale-90 ${selectedColor === color.hex ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent shadow-sm'}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

        </aside>

        {/* Center Canvas */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4 overflow-auto touch-pan-x touch-pan-y relative order-1 md:order-2">
          {/* Editable Pattern Name */}
          <div className="flex items-center gap-2 mb-3">
            {isEditingName ? (
              <>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={patternName}
                  onChange={(e) => setPatternName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingName(false); }}
                  className="text-lg font-bold text-gray-700 bg-white border-2 border-blue-400 rounded-lg px-3 py-1 outline-none focus:border-blue-600"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="p-1 rounded-lg hover:bg-green-100 text-green-600 transition-colors"
                  title="Confirm name"
                >
                  <Check size={18} />
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-gray-700">{patternName}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit name"
                >
                  <Pencil size={16} />
                </button>
              </>
            )}
          </div>
          <div className="bg-white p-4 rounded-xl shadow-2xl">
            <Grid
              grid={grid}
              onGridChange={handleGridChange}
              selectedColor={selectedColor}
              tool={tool}
            />
          </div>
        </div>

      </main>

    </div>
  );
}

export default App;
