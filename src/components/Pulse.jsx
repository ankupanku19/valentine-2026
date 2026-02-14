import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const signals = [
    { type: "Audio", text: "Record a 10-second voice note. Just breathing. Slow, deep, and close to the mic." },
    { type: "Visual", text: "Go to the mirror. Take a photo of your lips. Just your lips. Make me want to kiss the screen." },
    { type: "Imagination", text: "Close your eyes. Imagine my hand on the back of your neck. Text me exactly how it feels." },
    { type: "Action", text: "Find a piece of ice. Run it down your neck. Send me a photo of the goosebumps." },
    { type: "Audio", text: "Whisper my name three times into a voice note. Each time softer than the last." },
    { type: "Message", text: "What are you wearing right now? Describe the texture against your skin. Be specific." },
    { type: "Visual", text: "Low light. Silhouette only. Show me the curve of your waist or shoulder." },
    { type: "Imagination", text: "If I were in the room right now, and we couldn't speak, what would we do first?" },
    { type: "Action", text: "Put on headphones. Play *our song*. Don't do anything else for 3 minutes. Just feel it." },
    { type: "Visual", text: "Send me a photo of your view right now. Let me see the world through your eyes." },
    { type: "Audio", text: "Tell me your favorite memory of us. But whisper it like it's a secret." },
    { type: "Message", text: "Type out a text you almost sent me once but didn't. Send it now." }
];

export default function Pulse() {
    const [revealRef, isVisible] = useReveal();
    const [activeSignal, setActiveSignal] = useState(null);
    const [isPulsing, setIsPulsing] = useState(false);

    const sendPulse = () => {
        setIsPulsing(true);
        setActiveSignal(null);

        // Simulate a "connection" delay
        setTimeout(() => {
            const random = signals[Math.floor(Math.random() * signals.length)];
            setActiveSignal(random);
            setIsPulsing(false);
            sendActivity("Pulse Signal Sent", `She received: **${random.type}**\n"${random.text}"`);
        }, 1500);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-stone-50 to-white">
            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4 tracking-tight">
                    P U L S E
                </h2>
                <p className="font-typewriter text-ink-500 text-sm tracking-widest uppercase">
                    Distance is just a number. Connection is a signal.
                </p>
            </div>

            <div className="max-w-md mx-auto relative min-h-[400px] flex flex-col items-center justify-center">

                {/* The Heartbeat Visual */}
                <div className="relative mb-12 group cursor-pointer" onClick={sendPulse}>
                    <div className={`absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 transition-all duration-1000 ${isPulsing ? 'animate-ping scale-150' : 'group-hover:opacity-30'}`} />
                    <div className={`relative w-32 h-32 md:w-40 md:h-40 border-2 border-red-500 rounded-full flex items-center justify-center transition-all duration-300 ${isPulsing ? 'scale-90 border-red-400' : 'hover:scale-105'}`}>
                        <Doodle type="heart" className={`w-16 h-16 text-red-600 transition-transform duration-1000 ${isPulsing ? 'animate-pulse scale-125' : ''}`} />
                    </div>
                </div>

                {/* The Signal Display */}
                <div className={`text-center transition-all duration-500 ${activeSignal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {activeSignal && (
                        <div className="bg-white p-8 border border-stone-200 shadow-xl rounded-sm max-w-sm mx-auto relative">
                            {/* Decorative tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-red-100/50 transform -rotate-2" />

                            <span className="font-typewriter text-xs text-red-400 tracking-widest uppercase block mb-4">
                                {activeSignal.type} Signal
                            </span>
                            <p className="font-hand text-2xl text-ink-900 leading-relaxed">
                                {activeSignal.text}
                            </p>
                        </div>
                    )}

                    {!activeSignal && !isPulsing && (
                        <p className="font-typewriter text-ink-400 text-xs animate-pulse">
                            Tap the heart to sync...
                        </p>
                    )}

                    {isPulsing && (
                        <p className="font-typewriter text-ink-400 text-xs">
                            Searching for frequency...
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
