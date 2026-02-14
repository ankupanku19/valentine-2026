import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const missions = [
    { title: "The Arch", desc: "Arched spine. Chest high. Show me the curve that drives me crazy.", icon: "🏹" },
    { title: "The Grip", desc: "Fingers tangled in the sheets. Knuckles white. Show me what wanting feels like.", icon: "✊" },
    { title: "The Tangle", desc: "Just legs. Tangled in the sheets. Messy, warm, and waiting.", icon: "🦶" },
    { title: "The View", desc: "Camera down your body. What I see when I'm on top of you.", icon: "👀" },
    { title: "The Mess", desc: "Hair wild on the pillow. Eyes closed. The beautiful aftermath.", icon: "😴" },
    { title: "The Trace", desc: "Fingertips tracing your hip bone. Slow. Deliberate. Don't stop.", icon: "point_down" },
    { title: "The Squeeze", desc: "Hand on your thigh. Squeeze marks on skin. Let me see the pressure.", icon: "🤏" },
    { title: "The Crave", desc: "Look up at the camera. That look you give me when you beg.", icon: "🥺" },
    { title: "The Breath", desc: "5 seconds. Chest rising and falling. Heavy breathing. No sound.", icon: "🫁" },
    { title: "The Gap", desc: "On your side. The negative space between your thighs. My favorite place.", icon: "〰️" },
    { title: "The Tease", desc: "Hand hovering just inches away. Not touching. Just the heat.", icon: "✋" },
    { title: "The Flush", desc: "The pink on your chest when you're done. Or when you're just starting.", icon: "🔥" }
];

export default function MidnightHunt() {
    const [revealRef, isVisible] = useReveal();
    const [activeMission, setActiveMission] = useState(null);

    const revealMission = () => {
        // Simple random for now, could be sequential
        const random = missions[Math.floor(Math.random() * missions.length)];
        setActiveMission(random);
        sendActivity("Midnight Hunt Mission", `She is doing: **${random.title}**\n"${random.desc}"`);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 overflow-hidden relative bg-black text-white">
            {/* Dark Texture */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(#111 2px, transparent 2px), linear-gradient(90deg, #111 2px, transparent 2px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className={`text-center mb-16 transition-all duration-700 relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-elemental text-4xl md:text-5xl text-white mb-4 tracking-wider">
                    Midnight Hunt
                </h2>
                <p className="font-typewriter text-gray-400 mt-2">
                    Complete the mission. Send the proof.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center relative z-10 min-h-[400px]">
                {activeMission ? (
                    <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8 rounded-sm shadow-2xl relative animate-fade-in text-center">
                        <div className="text-6xl mb-6">{activeMission.icon}</div>
                        <h3 className="font-elemental text-3xl text-white mb-4 uppercase tracking-widest border-b border-gray-800 pb-4">
                            {activeMission.title}
                        </h3>
                        <p className="font-typewriter text-lg text-gray-300 leading-relaxed mb-8 min-h-[5rem]">
                            {activeMission.desc}
                        </p>

                        <button
                            onClick={revealMission}
                            className="text-xs font-typewriter text-gray-500 hover:text-white uppercase tracking-widest border border-gray-700 px-4 py-2 hover:border-gray-500 transition-colors"
                        >
                            New Assignment
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={revealMission}
                        className="group relative w-64 h-64 bg-gray-900 border-2 border-dashed border-gray-700 rounded-full flex flex-col items-center justify-center hover:border-white transition-colors duration-500"
                    >
                        <Doodle type="star" className="w-16 h-16 text-gray-700 group-hover:text-white transition-colors duration-500 mb-4" />
                        <span className="font-typewriter text-gray-500 group-hover:text-white tracking-widest uppercase">
                            Reveal Mission
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
}
