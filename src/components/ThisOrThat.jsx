import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const pairs = [
    { left: "Lights On", right: "Pitch Black" },
    { left: "Slow & Sensual", right: "Rough & Urgent" },
    { left: "Morning Cuddles", right: "Late Night Touches" },
    { left: "My Hands", right: "My Lips" },
    { left: "Eye Contact", right: "Blindfolded" },
    { left: "Massage", right: "Scratching" },
    { left: "Whispering", right: "Moaning" },
    { left: "Teasing", right: "Pleasing" },
    { left: "Shower Together", right: "Bed Together" },
    { left: "Against the Wall", right: "On the Sheets" },
    { left: "Neck Kisses", right: "Thigh Bites" },
    { left: "You on Top", right: "Me on Top" }
];

export default function ThisOrThat() {
    const [revealRef, isVisible] = useReveal();
    const [selections, setSelections] = useState({});

    const select = (index, side) => {
        setSelections(prev => ({
            ...prev,
            [index]: side
        }));

        const pair = pairs[index];
        const choice = side === 'left' ? pair.left : pair.right;
        sendActivity("This or That Choice", `Between **${pair.left}** and **${pair.right}**,\nShe chose: **${choice}**`);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 bg-paper-100 overflow-hidden relative">
            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4 inline-block relative">
                    This or That?
                    <Doodle type="star" className="absolute -top-6 -left-8 w-8 h-8 text-accent-red" />
                </h2>
                <p className="font-typewriter text-ink-600 mt-2">
                    Pick your poison.
                </p>
            </div>

            <div className="max-w-xl mx-auto space-y-4">
                {pairs.map((pair, index) => (
                    <div key={index} className="flex paper-shadow bg-white rounded-sm overflow-hidden border border-gray-200 relative">
                        {/* VS Divider */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 flex items-center justify-center">
                            <div className="bg-white px-2 font-typewriter text-xs text-gray-400">vs</div>
                        </div>

                        <button
                            onClick={() => select(index, 'left')}
                            className={`flex-1 py-6 text-center transition-all duration-300 ${selections[index] === 'left'
                                ? 'bg-ink-900 text-white font-marker text-xl'
                                : 'hover:bg-gray-50 text-ink-600 font-typewriter'
                                }`}
                        >
                            {pair.left}
                        </button>

                        <button
                            onClick={() => select(index, 'right')}
                            className={`flex-1 py-6 text-center transition-all duration-300 ${selections[index] === 'right'
                                ? 'bg-accent-red text-white font-marker text-xl'
                                : 'hover:bg-gray-50 text-ink-600 font-typewriter'
                                }`}
                        >
                            {pair.right}
                        </button>
                    </div>
                ))}
            </div>


        </section>
    );
}
