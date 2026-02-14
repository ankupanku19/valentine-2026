import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const envelopeData = [
    { id: 1, label: "Open when you're sad", content: "Remember that you are so loved. By me, by your friends, by your family. This feeling is temporary, but my love for you isn't. Call me. I'm here." },
    { id: 2, label: "Open when you miss me", content: "I miss you too. Probably more. Close your eyes and imagine I'm hugging you right now. I'll be there as soon as I can." },
    { id: 3, label: "Open when you're stressed", content: "Breathe. You've handled everything life has thrown at you so far. You can handle this too. Take a break, drink some water. I'm proud of you." },
    { id: 4, label: "Open when you need a laugh", content: "Remember that time we tried to cook and nearly burned the kitchen down? Yeah. We're a mess, but we're a fun mess." },
];

export default function OpenWhen() {
    const [revealRef, isVisible] = useReveal();
    const [openedId, setOpenedId] = useState(null);

    const toggleEnvelope = (id) => {
        const newOpenedId = openedId === id ? null : id;
        setOpenedId(newOpenedId);

        if (newOpenedId) {
            const envelope = envelopeData.find(e => e.id === id);
            sendActivity("Open When Envelope", `She opened: **${envelope.label}**\n"${envelope.content.substring(0, 50)}..."`);
        }
    };

    return (
        <section ref={revealRef} className="py-24 px-4 max-w-6xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4 inline-block relative">
                    Open When...
                    <Doodle type="underline" className="absolute -bottom-4 left-0 w-full h-4 text-accent-red" />
                </h2>
                <p className="font-typewriter text-ink-600 mt-6 max-w-lg mx-auto">
                    A few reminders for the rainy days, the sunny days, and everything in between.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 px-2">
                {envelopeData.map((env, i) => (
                    <div
                        key={env.id}
                        className={`transition-all duration-700 cursor-pointer group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                        onClick={() => toggleEnvelope(env.id)}
                    >
                        <div className={`relative bg-[#f0e6d2] p-1 shadow-md transition-transform duration-500 ${openedId === env.id ? 'scale-[1.02]' : 'hover:-translate-y-1'}`}>

                            {/* Envelope Flap Effect */}
                            <div className="absolute top-0 left-0 w-full h-0 border-l-[140px] border-r-[140px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#e6dac0] origin-top z-10 filter drop-shadow-sm" />

                            {/* Envelope Body */}
                            <div className="bg-[#f0e6d2] h-48 md:h-56 relative flex items-center justify-center overflow-hidden border border-[#d4c5a5]">

                                {/* Wax Seal */}
                                <div className={`w-12 h-12 rounded-full bg-red-800 absolute top-16 z-20 shadow-md flex items-center justify-center border-2 border-red-900/50 transition-all duration-500 ${openedId === env.id ? 'opacity-0 scale-150' : 'opacity-100'}`}>
                                    <div className="w-8 h-8 rounded-full border border-red-900/30" />
                                </div>

                                {/* Label */}
                                <div className={`absolute bottom-8 font-hand text-xl text-ink-900 z-20 text-center px-4 transition-opacity duration-300 ${openedId === env.id ? 'opacity-0' : 'opacity-80'}`}>
                                    {env.label}
                                </div>

                                {/* Slide-out Letter */}
                                <div className={`absolute inset-2 bg-white p-6 shadow-inner transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${openedId === env.id ? 'translate-y-0 opacity-100 z-30' : 'translate-y-full opacity-0'}`}>
                                    <div className="h-full border-2 border-dashed border-stone-200 p-4 flex flex-col justify-center items-center text-center overflow-y-auto custom-scrollbar">
                                        <p className="font-typewriter text-sm md:text-base leading-relaxed text-ink-900">
                                            "{env.content}"
                                        </p>
                                        <div className="mt-4">
                                            <Doodle type="heart" className="w-6 h-6 text-red-400 opacity-60" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
