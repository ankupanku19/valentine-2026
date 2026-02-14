import { useReveal } from '../hooks/useReveal';

export default function LoveLetter() {
    const [revealRef, isVisible] = useReveal();

    return (
        <section className="py-24 px-4 bg-stone-50" ref={revealRef}>
            <div className="max-w-2xl mx-auto">
                <div
                    className={`relative bg-[#fffdfa] p-6 md:p-16 paper-shadow transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 rotate-1' : 'opacity-0 translate-y-12 rotate-0'
                        }`}
                    style={{
                        backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)',
                        backgroundSize: '100% 1.5em',
                    }}
                >
                    {/* Tape effect */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 tape rotate-2" />

                    <div className="font-typewriter text-lg md:text-xl leading-[1.5em] text-ink-900 space-y-6">
                        <p>Hey Nikita,</p>

                        <p>
                            I was trying to write something perfect. Something poetic. But that felt fake.
                            The truth is simpler.
                        </p>

                        <p>
                            You are my favorite part of every day. Even the boring ones. Even the stressful ones.
                            Just knowing you're there makes the noise of the world a little quieter.
                        </p>

                        <p>
                            I don't love you because of some grand reason. I just do. Because you're you.
                            Because of how you laugh when you're tired. Because of how you look at me.
                        </p>

                        <p>
                            Happy Valentine's Week. Thanks for being my person.
                        </p>

                        <div className="pt-8 text-right">
                            <p className="mr-8 font-hand text-xl text-ink-600">Always,</p>
                            <p className="font-marker text-4xl text-ink-900 mt-2 transform -rotate-2 inline-block border-b-2 border-accent-red/30 pb-1">
                                Ankit
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

