import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const zones = [
    { id: 'heart', label: 'Heart', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'neck', label: 'Neck', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'hand', label: 'Hand', icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11' }
];

export default function TouchConnect() {
    const [revealRef, isVisible] = useReveal();
    const [sending, setSending] = useState(null);

    const sendTouch = (zoneId) => {
        setSending(zoneId);
        setTimeout(() => setSending(null), 1500);

        const zone = zones.find(z => z.id === zoneId);
        sendActivity("Virtual Touch Sent", `She sent a touch to your: **${zone.label}**`);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 bg-ink-900 text-white overflow-hidden relative" id="touch-connect">
            <div className={`text-center mb-16 transition-all duration-700 relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-white mb-4 inline-block relative">
                    Virtual Touch
                </h2>
                <p className="font-typewriter text-gray-400 mt-2">
                    Send a pulse to show where you miss me.
                </p>
            </div>

            <div className="max-w-md mx-auto flex justify-center gap-6 relative z-10">
                {zones.map((zone) => (
                    <button
                        key={zone.id}
                        onClick={() => sendTouch(zone.id)}
                        className={`relative w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${sending === zone.id
                            ? 'border-accent-red bg-accent-red text-white scale-110 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                            : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                            }`}
                    >
                        <svg className={`w-8 h-8 ${sending === zone.id ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={zone.icon} />
                        </svg>
                        <span className="font-typewriter text-xs uppercase tracking-widest">{zone.label}</span>

                        {/* Ripple Effect */}
                        {sending === zone.id && (
                            <>
                                <div className="absolute inset-0 rounded-full border-2 border-accent-red animate-ping-slow" />
                                <div className="absolute inset-0 rounded-full border border-accent-red animate-ping" style={{ animationDelay: '0.2s' }} />
                            </>
                        )}
                    </button>
                ))}
            </div>

            <div className="text-center mt-12 h-6">
                {sending && (
                    <p className="font-typewriter text-accent-red animate-fade-in">
                        Sending warmth to {zones.find(z => z.id === sending)?.label}...
                    </p>
                )}
            </div>
        </section>
    );
}
