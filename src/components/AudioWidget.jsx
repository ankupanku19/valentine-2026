import { useState, useRef, useEffect, useCallback } from 'react';

export default function AudioWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);
    const fadeRef = useRef(null);

    // Initialize audio element
    useEffect(() => {
        const audio = new Audio('/music/background.mp3');
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const fadeAudio = useCallback((targetVolume, duration = 800) => {
        if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

        const audio = audioRef.current;
        if (!audio) return;

        const startVolume = audio.volume;
        const diff = targetVolume - startVolume;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            audio.volume = startVolume + diff * eased;

            if (progress < 1) {
                fadeRef.current = requestAnimationFrame(step);
            }
        }
        fadeRef.current = requestAnimationFrame(step);
    }, []);

    const togglePlay = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!hasInteracted) setHasInteracted(true);

        if (isPlaying) {
            fadeAudio(0, 600);
            setTimeout(() => audio.pause(), 650);
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                fadeAudio(0.35, 1000);
                setIsPlaying(true);
            } catch (e) {
                console.log('Audio playback prevented:', e.message);
            }
        }
    }, [isPlaying, hasInteracted, fadeAudio]);

    return (
        <button
            onClick={togglePlay}
            className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full 
        glass shadow-lg shadow-blush-200/20 
        transition-all duration-300 
        hover:shadow-xl hover:shadow-blush-200/30 hover:-translate-y-0.5
        active:scale-95
        ${isPlaying ? 'ring-2 ring-blush-300/40' : ''}`}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
            {/* Pulse ring when playing */}
            {isPlaying && (
                <span className="absolute inset-0 rounded-full border border-blush-300/30 animate-pulse-soft pointer-events-none" />
            )}

            {/* Icon */}
            <span className="relative w-5 h-5 flex items-center justify-center text-blush-600">
                {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </span>

            {/* Label */}
            <span className="text-xs font-sans font-medium text-blush-600 pr-1">
                {isPlaying ? 'Playing' : 'Music'}
            </span>

            {/* Equalizer bars when playing */}
            {isPlaying && (
                <span className="flex items-end gap-[2px] h-3">
                    {[0, 150, 300].map((delay) => (
                        <span
                            key={delay}
                            className="w-[3px] bg-blush-400 rounded-full"
                            style={{
                                animation: 'pulse-soft 0.8s ease-in-out infinite',
                                animationDelay: `${delay}ms`,
                                height: '60%',
                            }}
                        />
                    ))}
                </span>
            )}
        </button>
    );
}
