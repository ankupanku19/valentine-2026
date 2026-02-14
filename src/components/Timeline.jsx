import { useReveal } from '../hooks/useReveal';

const milestones = [
    { year: '2023', title: 'The Beginning', desc: 'Just two strangers who happened to be at the same place.' },
    { year: '2024', title: 'Becoming Us', desc: 'Late night calls, coffee dates, and realizing I didn\'t want to be anywhere else.' },
    { year: '2025', title: 'Adventures', desc: 'Road trips, bad decisions, and the best memories.' },
    { year: '2026', title: 'Right Now', desc: 'Still my favorite person. Still choosing you.' },
];

export default function Timeline() {
    const [revealRef, isVisible] = useReveal();

    return (
        <section ref={revealRef} className="py-24 px-6 md:px-12 max-w-2xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">How We Got Here</h2>
                <div className="w-16 h-0.5 bg-stone-300 mx-auto" />
            </div>

            <div className="relative border-l-2 border-stone-200 ml-4 md:ml-0 md:pl-8 space-y-12">
                {milestones.map((item, i) => (
                    <div
                        key={i}
                        className={`relative pl-8 md:pl-0 transition-all duration-700 delay-[${i * 100}ms] 
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-100 border-4 border-stone-300 md:-left-[41px]" />

                        <div className="md:flex md:gap-8 items-baseline">
                            <span className="font-cursive text-2xl text-stone-400 shrink-0 mb-2 block md:mb-0 w-24 text-right">
                                {item.year}
                            </span>
                            <div>
                                <h3 className="font-serif text-xl text-stone-800 mb-2">{item.title}</h3>
                                <p className="font-sans text-stone-500 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
