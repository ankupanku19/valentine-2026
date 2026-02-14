import { useState, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { sendActivity } from '../utils/webhook';

const notes = [
    "I love how you laugh at your own jokes.",
    "Your voice is my favorite sound.",
    "I'm happier when I'm with you.",
    "You make boring things fun.",
    "I love that we can sit in silence.",
    "You get my weirdness.",
    "I promise to always bring you snacks.",
    "You're my best friend.",
    "I love the way you look at me.",
    "Everything is better with you.",
    "You tolerate my bad singing.",
    "I love our random adventures.",
];

export default function MessageJar() {
    const [revealRef, isVisible] = useReveal();
    const [currentNote, setCurrentNote] = useState(null);
    const [isShaking, setIsShaking] = useState(false);
    const audioRef = useRef(null);

    const pullNote = () => {
        if (isShaking) return;

        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        // Random note logic
        const random = notes[Math.floor(Math.random() * notes.length)];
        setCurrentNote(random);
        sendActivity("Message Jar Opened", `She pulled a note:\n"${random}"`);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 bg-paper-100 flex flex-col items-center overflow-hidden relative">

            {/* Context Header */}
            <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-3xl md:text-5xl text-ink-900 mb-4 transform rotate-1">
                    Take a Note
                </h2>
                <p className="font-typewriter text-ink-600">( click the jar whenever you need a reminder )</p>
            </div>

            {/* Jar Container */}
            <div className={`relative w-64 h-80 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

                {/* The Note Popup */}
                {currentNote && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] z-20 w-56 animate-fade-in-up">
                        <div className="bg-yellow-100 p-4 shadow-lg transform -rotate-2 border border-yellow-200/50 paper-shadow">
                            <div className="w-8 h-8 bg-black/10 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 blur-sm" /> {/* Pin shadow */}
                            <div className="w-3 h-3 bg-red-400 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 border border-red-500 shadow-sm" /> {/* Pin */}
                            <p className="font-hand text-xl text-ink-900 text-center leading-relaxed">
                                "{currentNote}"
                            </p>
                        </div>
                    </div>
                )}

                {/* The Jar Interaction Area */}
                <button
                    onClick={pullNote}
                    className={`w-full h-full relative group cursor-pointer active:scale-95 transition-transform ${isShaking ? 'animate-wiggle' : ''}`}
                >
                    {/* SVG Jar Illustration */}
                    <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-xl filter sepia-[.3]">
                        {/* Glass Jar Body */}
                        <path d="M50 40 L150 40 L160 60 L160 230 Q160 250 140 250 L60 250 Q40 250 40 230 L40 60 Z"
                            fill="rgba(255,255,255,0.4)" stroke="#5a5a5a" strokeWidth="3" />

                        {/* Lid */}
                        <rect x="45" y="20" width="110" height="20" rx="2" fill="#d97757" stroke="#8c3b2b" strokeWidth="2" />
                        <rect x="50" y="15" width="100" height="5" rx="1" fill="#e88c6a" />

                        {/* Reflections */}
                        <path d="M55 70 Q55 200 55 230" stroke="white" strokeWidth="4" opacity="0.4" strokeLinecap="round" fill="none" />
                        <path d="M145 70 Q145 120 145 140" stroke="white" strokeWidth="4" opacity="0.3" strokeLinecap="round" fill="none" />

                        {/* Paper Fragments Inside */}
                        <g transform="translate(60, 180) rotate(-10)">
                            <rect width="30" height="15" fill="#fef3c7" stroke="#d6d3d1" />
                        </g>
                        <g transform="translate(100, 200) rotate(20)">
                            <rect width="30" height="15" fill="#ffedd5" stroke="#fed7aa" />
                        </g>
                        <g transform="translate(80, 220) rotate(5)">
                            <rect width="30" height="15" fill="#e0f2fe" stroke="#bae6fd" />
                        </g>
                        <g transform="translate(120, 170) rotate(-15)">
                            <rect width="30" height="15" fill="#fce7f3" stroke="#fbcfe8" />
                        </g>

                        {/* Label */}
                        <rect x="60" y="100" width="80" height="50" rx="2" fill="#fff9eb" stroke="#d6d3d1" strokeWidth="1" transform="rotate(-1 100 125)" />
                        <text x="100" y="125" textAnchor="middle" fontFamily="Courier Prime, monospace" fontSize="12" fill="#4a4a4a" transform="rotate(-1 100 125)">
                            REASONS
                        </text>
                        <text x="100" y="140" textAnchor="middle" fontFamily="Courier Prime, monospace" fontSize="10" fill="#d93025" transform="rotate(-1 100 125)">
                            ♥
                        </text>
                    </svg>
                </button>
            </div>

            {/* Shelf */}
            <div className="w-full max-w-xl h-4 bg-wood-pattern mt-[-10px] relative z-[-1] rounded-sm shadow-md border-t border-[#8b5a2b]"
                style={{ background: '#a67c52' }}>
                <div className="absolute top-4 left-4 w-full h-4 bg-black/10 blur-md transform skew-x-12" /> {/* Shadow */}
            </div>

        </section>
    );
}
