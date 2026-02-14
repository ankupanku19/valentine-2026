import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const locations = [
    "In a candlelit cabin while a storm rages outside",
    "On a secluded rooftop under the infinite stars",
    "In a warm bath filled with rose petals and steam",
    "On a private balcony at midnight",
    "In a silk-sheeted bed with no alarms set",
    "Against the wall in a locked, soundproof room",
    "Hidden away in a blanket fort, skin to skin",
    "In the backseat of a car, parked somewhere dark"
];

const acts = [
    "giving you a slow, deep oil massage",
    "tracing every inch of your skin with ice",
    "whispering dirty secrets against your neck",
    "undressing you slowly, worshipping every layer",
    "blindfolding you and teasing your other senses",
    "feeding you strawberries and chocolate by hand",
    "worshipping your body until you can't speak",
    "holding you down and taking control"
];

const moods = [
    "with soft jazz playing in the background.",
    "while the rain hammers against the glass.",
    "in complete, heavy, desperate silence.",
    "with only the moonlight touching our skin.",
    "without rushing a single delicious moment.",
    "until we both are breathless and shaking.",
    "ignoring the rest of the world completely."
];

export default function FantasyGenerator() {
    const [revealRef, isVisible] = useReveal();
    const [scenario, setScenario] = useState(null);
    const [generating, setGenerating] = useState(false);

    const generate = () => {
        setGenerating(true);
        let count = 0;
        const interval = setInterval(() => {
            const tempLoc = locations[Math.floor(Math.random() * locations.length)];
            const tempAct = acts[Math.floor(Math.random() * acts.length)];
            const tempMood = moods[Math.floor(Math.random() * moods.length)];

            setScenario({ loc: tempLoc, act: tempAct, mood: tempMood });
            count++;

            if (count > 15) {
                clearInterval(interval);
                setGenerating(false);

                // Track the final result
                sendActivity("Fantasy Date Generated", `She got:\n**Location**: ${tempLoc}\n**Activity**: ${tempAct}\n**Vibe**: ${tempMood}`);
            }
        }, 100);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 bg-paper-200 overflow-hidden relative">
            <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4 inline-block relative">
                    Our Future Date
                    <Doodle type="star" className="absolute -top-6 -left-8 w-8 h-8 text-accent-red" />
                </h2>
                <p className="font-typewriter text-ink-600 mt-2">
                    Let fate decide our next perfect moment.
                </p>
            </div>

            <div className="max-w-md mx-auto paper-shadow bg-white p-8 rounded-sm border-2 border-ink-900 relative">
                {/* Visual "Ticket" look */}
                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-paper-200 rounded-full" />
                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-paper-200 rounded-full" />

                <div className="space-y-6 text-center">
                    <div>
                        <p className="font-typewriter text-xs text-gray-500 uppercase tracking-widest mb-1">Location</p>
                        <p className="font-marker text-2xl text-ink-900 min-h-[2rem]">{scenario?.loc || "???"}</p>
                    </div>
                    <div className="w-full h-px bg-gray-200" />
                    <div>
                        <p className="font-typewriter text-xs text-gray-500 uppercase tracking-widest mb-1">Activity</p>
                        <p className="font-marker text-2xl text-ink-900 min-h-[2rem]">{scenario?.act || "???"}</p>
                    </div>
                    <div className="w-full h-px bg-gray-200" />
                    <div>
                        <p className="font-typewriter text-xs text-gray-500 uppercase tracking-widest mb-1">Vibe</p>
                        <p className="font-marker text-2xl text-accent-red min-h-[2rem]">{scenario?.mood || "???"}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={generate}
                        disabled={generating}
                        className="w-full py-3 bg-ink-900 text-white font-typewriter uppercase tracking-widest hover:bg-ink-800 transition-colors disabled:opacity-50"
                    >
                        {generating ? "Dreaming..." : "Generate Date"}
                    </button>
                </div>
            </div>
        </section>
    );
}
