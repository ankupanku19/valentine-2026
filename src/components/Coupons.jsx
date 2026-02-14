import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const coupons = [
    { id: 1, title: "Yes Day", desc: "For 24 hours, I can't say no to anything you ask. Anything." },
    { id: 2, title: "The Shower", desc: "You, me, hot water, and nowhere to be." },
    { id: 3, title: "Full Body Massage", desc: "Oil, candles, and my hands. Until you fall asleep. (Or don't.)" },
    { id: 4, title: "Dinnerless Date", desc: "We skip the food. We go straight to dessert. You are the dessert." },
    { id: 5, title: "Command Control", desc: "You seek, I obey. One full hour of you telling me exactly what to do." },
    { id: 6, title: "Tech Detox", desc: "Phones in the drawer. Door locked. Music on. Just us." },
];

export default function Coupons() {
    const [revealRef, isVisible] = useReveal();
    const [redeemed, setRedeemed] = useState({});

    const redeem = (id) => {
        if (!redeemed[id]) {
            setRedeemed(prev => ({ ...prev, [id]: true }));
            const coupon = coupons.find(c => c.id === id);
            sendActivity("Coupon Redeemed", `She used: **${coupon.title}**\n"${coupon.desc}"`);
        }
    };

    return (
        <section ref={revealRef} className="py-24 px-4 bg-stone-50 overflow-hidden">
            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4">
                    Love Coupons
                </h2>
                <div className="inline-block bg-accent-tape px-4 py-1 transform -rotate-1 shadow-sm">
                    <p className="font-typewriter text-ink-600">
                        ( valid forever, non-transferable )
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon, i) => (
                    <div
                        key={coupon.id}
                        className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div
                            onClick={() => redeem(coupon.id)}
                            className={`relative bg-[#f8f5f2] border-2 border-dashed border-ink-400 p-6 cursor-pointer group hover:bg-[#fffdfa] transition-colors overflow-hidden ${redeemed[coupon.id] ? 'opacity-70 grayscale' : ''}`}
                        >
                            {/* Ticket Cutouts */}
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-50 rounded-full border-r-2 border-ink-400" />
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-50 rounded-full border-l-2 border-ink-400" />

                            <div className="flex flex-col items-center text-center relative z-10">
                                <span className="font-typewriter text-xs tracking-widest text-ink-400 uppercase mb-2">
                                    Admit One
                                </span>
                                <h3 className="font-marker text-2xl text-ink-900 mb-2 group-hover:scale-105 transition-transform">
                                    {coupon.title}
                                </h3>
                                <p className="font-hand text-lg text-ink-600">
                                    {coupon.desc}
                                </p>
                            </div>

                            {/* Redeemed Stamp Overlay */}
                            {redeemed[coupon.id] && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 animate-wiggle">
                                    <div className="border-4 border-red-600 rounded p-2 transform -rotate-12 opacity-80 mix-blend-multiply">
                                        <span className="font-marker text-2xl text-red-600 uppercase tracking-widest">
                                            REDEEMED
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
