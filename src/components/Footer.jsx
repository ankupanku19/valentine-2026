import { useReveal } from '../hooks/useReveal';

export default function Footer() {
    const [revealRef, isVisible] = useReveal();

    return (
        <footer
            ref={revealRef}
            className={`py-16 md:py-20 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
        >
            <div className="px-6">
                {/* Heart accent */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="block w-16 h-px bg-blush-200/60" />
                    <span className="text-blush-300 animate-heartbeat inline-block">♥</span>
                    <span className="block w-16 h-px bg-blush-200/60" />
                </div>

                {/* Message */}
                <p className="font-cursive text-2xl md:text-3xl text-blush-500 mb-3">
                    Happy Valentine's Day, Nikita
                </p>
                <p className="font-sans text-sm text-blush-400/70 max-w-xs mx-auto leading-relaxed">
                    Made with love, intention, and every feeling words can't quite capture.
                </p>

                {/* Year */}
                <p className="mt-8 text-[11px] text-blush-300/50 font-sans tracking-wider uppercase">
                    February 2026
                </p>
            </div>
        </footer>
    );
}
