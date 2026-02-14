import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';

export default function Hero() {
    const [titleRef, isTitleVisible] = useReveal();

    const scrollToContent = () => {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">

            {/* Background Doodles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <Doodle type="star" className="absolute top-1/4 left-10 w-12 h-12 text-ink-400 rotate-12" />
                <Doodle type="circle" className="absolute top-1/3 right-12 w-16 h-16 text-accent-red -rotate-6" />
                <Doodle type="arrow" className="absolute bottom-1/4 left-1/4 w-20 h-20 text-ink-600 rotate-45" />
            </div>

            {/* Crafted By */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 font-typewriter text-xs md:text-sm text-ink-400 opacity-60 tracking-widest uppercase">
                Crafted by Ankit
            </div>

            <div ref={titleRef} className={`relative z-10 text-center px-4 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>

                <h1 className="text-[15vw] md:text-[10rem] font-bold leading-none tracking-tighter text-ink-900 mix-blend-multiply opacity-90 font-marker">
                    <span className="inline-block hover:scale-105 transition-transform duration-300 transform -rotate-2">H</span>
                    <span className="inline-block hover:scale-105 transition-transform duration-300 transform rotate-1 text-accent-red">E</span>
                    <span className="inline-block hover:scale-105 transition-transform duration-300 transform -rotate-1">Y</span>
                </h1>

                <div className="mt-8 relative inline-block">
                    <div className="absolute -inset-2 bg-accent-tape transform -rotate-1 skew-x-2 shadow-sm" />
                    <p className="relative text-xl md:text-3xl font-typewriter text-ink-900 px-4 py-2">
                        Happy Valentine's, Nikku.
                    </p>
                    <Doodle type="underline" className="absolute -bottom-6 left-0 w-full h-6 text-ink-900" />
                </div>
            </div>

            <div className="absolute bottom-12 animate-bounce cursor-pointer" onClick={scrollToContent}>
                <svg className="w-8 h-8 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
