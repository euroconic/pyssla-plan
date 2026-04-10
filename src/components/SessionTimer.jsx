import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const RECOMMENDED_MINUTES = 30;

const SessionTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = Math.min(seconds / (RECOMMENDED_MINUTES * 60), 1);
  const overLimit = seconds >= RECOMMENDED_MINUTES * 60;
  const nearLimit = minutes >= RECOMMENDED_MINUTES - 5 && !overLimit;

  const handleReset = () => {
    setSeconds(0);
    setRunning(true);
    setDismissed(false);
  };

  const color = overLimit
    ? 'text-red-600 bg-red-50 border-red-200'
    : nearLimit
      ? 'text-orange-600 bg-orange-50 border-orange-200'
      : 'text-gray-600 bg-white border-gray-200';

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${color}`}>
      <Timer size={14} className={overLimit ? 'animate-pulse' : ''} />
      <span className="font-bold tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
      <span className="text-gray-400">/ {RECOMMENDED_MINUTES}m</span>

      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${overLimit ? 'bg-red-500' : nearLimit ? 'bg-orange-400' : 'bg-green-400'}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <button
        onClick={() => setRunning(!running)}
        className="p-1 rounded hover:bg-gray-100 transition-colors"
        title={running ? 'Pause timer' : 'Resume timer'}
      >
        {running ? <Pause size={12} /> : <Play size={12} />}
      </button>
      <button
        onClick={handleReset}
        className="p-1 rounded hover:bg-gray-100 transition-colors"
        title="Reset timer"
      >
        <RotateCcw size={12} />
      </button>

      {overLimit && !dismissed && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 border border-red-200 rounded-xl p-3 shadow-lg w-64 z-50">
          <p className="text-sm text-red-700 font-semibold">Time to take a break!</p>
          <p className="text-xs text-red-600 mt-1">
            You've been planning for {minutes} minutes. Print your pattern and switch to the pegboard!
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="mt-2 text-xs text-red-500 hover:text-red-700 font-bold"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionTimer;
