import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const pleasures = [
    { id: 'neck', label: 'Neck Kisses', desc: 'Slow, lingering, wet' },
    { id: 'hair', label: 'Hair Play', desc: 'Gentle pulling, stroking' },
    { id: 'waist', label: 'Waist Grabbing', desc: 'Pulling me closer, holding tight' },
    { id: 'ear', label: 'Ear Whispers', desc: 'Soft words, warm breath' },
    { id: 'thigh', label: 'Thigh Tracing', desc: 'Fingertips only, teasing' },
    { id: 'eye', label: 'Eye Contact', desc: 'Intense, silent staring' },
    { id: 'massage', label: 'Shoulder Rubs', desc: 'Releasing tension, caring' },
    { id: 'hand', label: 'Hand Holding', desc: 'Intertwined fingers, squeezing' }
];

export default function PleasurePreferences() {
    const [revealRef, isVisible] = useReveal();
    const [selections, setSelections] = useState({});

    const toggleSelection = (id) => {
        setSelections(prev => {
            const newState = { ...prev, [id]: !prev[id] };
            const item = pleasures.find(p => p.id === id);

            if (newState[id]) {
                sendActivity("Pleasure Preference Selected", `She likes: **${item.label}**\n"${item.desc}"`);
            } else {
                sendActivity("Pleasure Preference Deselected", `She removed: **${item.label}**`);
            }
            return newState;
        });
    };

    return (
        <section ref={revealRef} className="py-24 px-4 relative overflow-hidden bg-paper-100">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform rotate-180">
                <Doodle type="squiggle" className="w-64 h-64 text-ink-900" />
            </div>

            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4 inline-block relative">
                    Soft Spots
                    <Doodle type="heart" className="absolute -bottom-8 -right-8 w-12 h-12 text-accent-red transform rotate-12" />
                </h2>
                <p className="font-typewriter text-ink-600 mt-4 max-w-md mx-auto">
                    Tell me where you melt.
                </p>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {pleasures.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleSelection(item.id)}
                        className={`group p-6 rounded-sm paper-shadow border-2 text-left transition-all duration-300 relative overflow-hidden ${selections[item.id]
                            ? 'bg-ink-900 border-ink-900 transform scale-[1.02]'
                            : 'bg-white border-ink-900 hover:border-accent-red'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <h3 className={`font-marker text-xl ${selections[item.id] ? 'text-white' : 'text-ink-900'}`}>
                                {item.label}
                            </h3>
                            <div className={`w-6 h-6 border-2 flex items-center justify-center transition-colors ${selections[item.id] ? 'border-accent-red bg-accent-red' : 'border-ink-300'
                                }`}>
                                {selections[item.id] && (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <p className={`font-typewriter text-sm ${selections[item.id] ? 'text-gray-300' : 'text-ink-500'} relative z-10`}>
                            {item.desc}
                        </p>
                    </button>
                ))}
            </div>


        </section>
    );
}
