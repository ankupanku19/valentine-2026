export default function DayCard({ day, index, onClick }) {
    return (
        <button
            onClick={onClick}
            className="group snap-center shrink-0 w-[260px] md:w-[300px] rounded-3xl glass p-6 flex flex-col items-start gap-4 
        cursor-pointer transition-all duration-300 
        hover:shadow-lg hover:shadow-blush-200/40 hover:-translate-y-1
        active:scale-[0.97] active:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Emoji + Day number */}
            <div className="flex items-center justify-between w-full">
                <span className="text-4xl">{day.emoji}</span>
                <span className="text-xs font-sans font-medium text-blush-400 bg-blush-100 rounded-full px-3 py-1">
                    Day {day.id}
                </span>
            </div>

            {/* Day info */}
            <div className="text-left">
                <h3 className="font-serif text-xl font-semibold text-blush-800 group-hover:text-blush-600 transition-colors">
                    {day.name}
                </h3>
                <p className="text-xs text-blush-400 font-sans mt-1">{day.date}</p>
            </div>

            {/* Short text */}
            <p className="text-sm text-blush-600/80 font-sans leading-relaxed line-clamp-2">
                {day.shortText}
            </p>

            {/* Read more indicator */}
            <div className="flex items-center gap-2 mt-auto">
                <span className="text-xs text-blush-400 font-medium font-sans group-hover:text-blush-500 transition-colors">
                    Read more
                </span>
                <svg
                    className="w-3.5 h-3.5 text-blush-400 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>

            {/* Accent line at bottom */}
            <div
                className={`w-full h-0.5 rounded-full bg-gradient-to-r ${day.color} opacity-40 group-hover:opacity-80 transition-opacity`}
            />
        </button>
    );
}
