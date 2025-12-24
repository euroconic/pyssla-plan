import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, X, Loader2 } from 'lucide-react';
import { generatePattern } from '../utils/patternLibrary';

const MiniGrid = ({ grid }) => {
    const size = grid.length;
    // SVG rendering for performance in preview
    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full bg-gray-100 rounded-md">
            {grid.map((row, r) =>
                row.map((color, c) => (
                    color !== '#FFFFFF' && <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill={color} />
                ))
            )}
        </svg>
    );
};

const MagicGenerator = ({ onSelectPattern, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [confidence, setConfidence] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedIdeas, setGeneratedIdeas] = useState([]);

    // Browser Speech Recognition Support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (recognition) {
            recognition.continuous = false;
            // Auto-detect language
            recognition.lang = navigator.language || 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event) => {
                const result = event.results[0][0];
                const text = result.transcript;
                const conf = Math.round(result.confidence * 100);

                setTranscript(text);
                setConfidence(conf);
                handleGenerate(text);
            };
        }
    }, []);

    const toggleListening = () => {
        if (!recognition) {
            alert("Browser doesn't support speech recognition. Try Chrome!");
            return;
        }
        if (isListening) recognition.stop();
        else recognition.start();
    };

    const handleGenerate = async (promptText) => {
        setIsGenerating(true);

        // MOCK AI GENERATION
        setTimeout(() => {
            // Generate variants
            const mockPatterns = Array(5).fill(null).map((_, i) => ({
                id: i,
                name: `${promptText} ${i + 1}`,
                grid: generatePattern(promptText),
            }));

            setGeneratedIdeas(mockPatterns);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-between items-center">
                    <h2 className="text-3xl font-black flex items-center gap-2">
                        <Sparkles className="animate-pulse" /> Magic Maker
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full">
                        <X size={32} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center gap-8 flex-1 overflow-y-auto">
                    {/* Microphone */}
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={toggleListening}
                            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isListening
                                    ? 'bg-red-500 animate-pulse scale-110 shadow-red-500/50'
                                    : 'bg-blue-500 hover:scale-105 shadow-blue-500/50'
                                } shadow-2xl`}
                        >
                            <Mic size={64} className="text-white" />
                        </button>
                        <p className="text-xl font-bold text-gray-500">
                            {isListening ? "Listening..." : "Tap & Say Keywords"}
                        </p>
                    </div>

                    {(transcript || isListening) && (
                        <div className="flex flex-col items-center w-full gap-2">
                            <div className="text-2xl font-black text-center text-gray-800 bg-gray-100 p-4 rounded-xl w-full break-words">
                                "{transcript || '...'}"
                            </div>
                            {transcript && (
                                <div className={`text-xs font-bold px-3 py-1 rounded-full ${confidence > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    Accuracy: {confidence}%
                                </div>
                            )}
                        </div>
                    )}

                    {isGenerating && (
                        <div className="flex flex-col items-center text-purple-600">
                            <Loader2 size={48} className="animate-spin" />
                            <p className="font-bold mt-2">Searching internet for patterns...</p>
                        </div>
                    )}

                    {generatedIdeas.length > 0 && !isGenerating && (
                        <div className="w-full">
                            <h3 className="text-lg font-bold text-gray-400 mb-4 uppercase tracking-wider text-center">Found Ideas</h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {generatedIdeas.map((idea) => (
                                    <button
                                        key={idea.id}
                                        onClick={() => onSelectPattern({ grid: idea.grid })}
                                        className="aspect-square rounded-xl bg-gray-50 border-4 border-transparent hover:border-purple-500 hover:scale-105 transition-all flex flex-col items-center justify-between p-2 shadow-sm"
                                    >
                                        <div className="w-full flex-1 mb-2">
                                            <MiniGrid grid={idea.grid} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 text-center truncate w-full">{idea.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MagicGenerator;
