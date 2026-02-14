export default function Doodle({ type, className = "" }) {
    const strokes = {
        star: (
            <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 5 L63 35 L95 35 L68 55 L78 85 L50 65 L22 85 L32 55 L5 35 L37 35 Z" />
            </svg>
        ),
        heart: (
            <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 30 Q30 5 10 30 T50 75 Q70 55 90 30 T50 30" />
            </svg>
        ),
        arrow: (
            <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 50 Q50 20 90 50 M80 35 L90 50 L75 60" />
            </svg>
        ),
        underline: (
            <svg viewBox="0 0 200 20" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M5 10 Q100 20 195 5" />
            </svg>
        ),
        circle: (
            <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M50 10 Q90 10 90 50 Q90 90 50 90 Q10 90 10 50 Q10 10 50 10 M85 45 Q88 48 85 52" />
            </svg>
        )
    };

    return strokes[type] || null;
}
