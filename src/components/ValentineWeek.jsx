import { useState, useRef } from 'react';
import { valentineDays } from '../data/valentineDays';
import DayCard from './DayCard';
import DayDetail from './DayDetail';
import { useReveal } from '../hooks/useReveal';

export default function ValentineWeek() {
    const [selectedDay, setSelectedDay] = useState(null);
    const scrollRef = useRef(null);
    const [revealRef, isVisible] = useReveal();

    return (
        <section className="py-20 md:py-28 relative" ref={revealRef}>
            {/* Section header */}
            <div
                className={`text-center px-6 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
            >
                <p className="font-cursive text-blush-400 text-base md:text-lg mb-2">Seven Days of</p>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-blush-800 tracking-tight">
                    Valentine Week
                </h2>
                <p className="mt-3 text-sm text-blush-400 font-sans">
                    Swipe to explore each day →
                </p>
            </div>

            {/* Horizontal card carousel */}
            <div
                ref={scrollRef}
                className={`flex gap-4 overflow-x-auto snap-x-mandatory px-6 pb-6 scrollbar-none transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                style={{ scrollbarWidth: 'none' }}
            >
                {/* Left spacer for centering first card */}
                <div className="shrink-0 w-0 md:w-[calc(50vw-200px)]" />

                {valentineDays.map((day, index) => (
                    <DayCard
                        key={day.id}
                        day={day}
                        index={index}
                        onClick={() => setSelectedDay(day)}
                    />
                ))}

                {/* Right spacer */}
                <div className="shrink-0 w-0 md:w-[calc(50vw-200px)]" />
            </div>

            {/* Detail view */}
            {selectedDay && (
                <DayDetail day={selectedDay} onClose={() => setSelectedDay(null)} />
            )}
        </section>
    );
}
