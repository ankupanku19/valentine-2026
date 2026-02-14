import { useEffect, useState } from 'react';

export default function DayDetail({ day, onClose }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 glass-dark" />

            {/* Modal card */}
            <div
                className={`relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-cream-50 shadow-2xl transition-all duration-300 ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center 
            text-blush-500 hover:text-blush-700 transition-colors
            active:scale-90"
                    aria-label="Close"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <div className={`w-full aspect-[4/3] rounded-t-3xl bg-gradient-to-br ${day.color} flex items-center justify-center relative overflow-hidden`}>
                    <img
                        src={day.image}
                        alt={day.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    {/* Fallback emoji if image fails */}
                    <span className="absolute text-7xl opacity-30 pointer-events-none">{day.emoji}</span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{day.emoji}</span>
                        <div>
                            <h3 className="font-serif text-2xl font-semibold text-blush-800">
                                {day.name}
                            </h3>
                            <p className="text-xs text-blush-400 font-sans">{day.date}, 2026</p>
                        </div>
                    </div>

                    <div className="w-12 h-0.5 rounded-full bg-blush-200 mb-5" />

                    <p className="font-sans text-[15px] leading-[1.75] text-blush-700/90">
                        {day.fullText}
                    </p>

                    <div className="mt-6 text-right">
                        <span className="font-cursive text-lg text-blush-400">— with love ♥</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
