import { useEffect, useState, useCallback } from 'react';
import { useSwipe } from '../hooks/useSwipe';

export default function GalleryViewer({ images, currentIndex, onClose, onNavigate }) {
    const [show, setShow] = useState(false);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleClose = useCallback(() => {
        setShow(false);
        setTimeout(onClose, 300);
    }, [onClose]);

    const goTo = useCallback((dir) => {
        if (transitioning) return;
        const next = currentIndex + dir;
        if (next < 0 || next >= images.length) return;
        setTransitioning(true);
        onNavigate(next);
        setTimeout(() => setTransitioning(false), 300);
    }, [currentIndex, images.length, onNavigate, transitioning]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowLeft') goTo(-1);
            if (e.key === 'ArrowRight') goTo(1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleClose, goTo]);

    // Touch swipe
    const swipeHandlers = useSwipe(
        () => goTo(1),   // swipe left = next
        () => goTo(-1),  // swipe right = prev
    );

    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'
                }`}
            {...swipeHandlers}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={handleClose} />

            {/* Close button */}
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
          flex items-center justify-center text-white/80 transition-all active:scale-90"
                aria-label="Close gallery"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
                <span className="text-white/60 text-sm font-sans font-medium">
                    {currentIndex + 1} / {images.length}
                </span>
            </div>

            {/* Navigation arrows (desktop) */}
            {currentIndex > 0 && (
                <button
                    onClick={() => goTo(-1)}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 
            hover:bg-white/20 items-center justify-center text-white/80 transition-all active:scale-90"
                    aria-label="Previous"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}
            {currentIndex < images.length - 1 && (
                <button
                    onClick={() => goTo(1)}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 
            hover:bg-white/20 items-center justify-center text-white/80 transition-all active:scale-90"
                    aria-label="Next"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Image */}
            <div className="relative z-10 w-full max-w-4xl px-4 md:px-16">
                <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className={`w-full max-h-[80vh] object-contain rounded-xl transition-all duration-300 ${transitioning ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
                        }`}
                />
                <p className="text-center text-white/50 text-sm font-sans mt-4">
                    {images[currentIndex].alt}
                </p>
            </div>
        </div>
    );
}
