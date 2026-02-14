import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

// Spicier, No-Video Challenges
const challenges = [
    { text: "Lie on your back", sub: "and slowly run your hands from your thighs up to your chest. Film it." },
    { text: "Press your lips", sub: "close to the microphone. Whisper what you would do to me if I was there." },
    { text: "Stand in front of a mirror", sub: "and take a photo of your reflection. Look messy and beautiful." },
    { text: "Squeeze your thighs", sub: "tighter together. Imagine it's me between them. Send a photo of the tension." },
    { text: "Pull down your top", sub: "just enough to reveal your cleavage/chest. Don't show everything. Tease me." },
    { text: "Send a voice note", sub: "of you just breathing. Start slow, then make it faster." },
    { text: "Lick your lips", sub: "slowly while looking into the camera. Make me want to kiss you." },
    { text: "Touch yourself", sub: "through your clothes. Record a 5-second video of your hand moving." },
    { text: "Bite your finger", sub: "gently, then pull it away slowly. Maintain eye contact with the camera." },
    { text: "Arch your back", sub: "and take a photo of the curve of your body from the side." },
    { text: "Unbutton top button", sub: "of your pants. Slide your hand inside just an inch. Snap the pic." },
    { text: "Trace a line", sub: "down your neck with one finger. Imagine it's my tongue." },
    { text: "Send a photo", sub: "of your bare legs tangled in the sheets." },
    { text: "Close your eyes", sub: "and stroke your neck. Record a video of your face as you do it." }
];

export default function DiceGame() {
    const [revealRef, isVisible] = useReveal();
    const [rolling, setRolling] = useState(false);
    const [result, setResult] = useState({ text: "Roll", sub: "the dice" });
    const [turns, setTurns] = useState(0);
    const MAX_TURNS = 2;

    const rollDice = () => {
        if (turns >= MAX_TURNS) return;

        setRolling(true);
        let lastRandom = null;
        let counter = 0;
        const interval = setInterval(() => {
            const random = challenges[Math.floor(Math.random() * challenges.length)];
            setResult(random);
            lastRandom = random;

            counter++;
            if (counter > 10) {
                clearInterval(interval);
                setRolling(false);
                setTurns(prev => prev + 1);

                if (lastRandom) {
                    sendActivity("Dice Rolled", `She got: **${lastRandom.text}**\n"${lastRandom.sub}"`);
                }
            }
        }, 100);
    };

    const resetGame = () => {
        setTurns(0);
        setResult({ text: "Roll", sub: "the dice" });
    };

    return (
        <section ref={revealRef} className="py-24 px-4 overflow-hidden relative">
            <div className="absolute top-10 right-10 opacity-10 pointer-events-none transform rotate-45">
                <Doodle type="star" className="w-48 h-48 text-ink-900" />
            </div>

            <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4">
                    Intimacy Dice
                </h2>
                <p className="font-typewriter text-ink-600 mt-2">
                    2 Turns. Make them count.
                </p>
            </div>

            <div className="flex flex-col items-center gap-8 relative z-10">
                {/* Dice Result Container */}
                <div className="relative">
                    <div className={`w-80 h-80 md:w-96 md:h-96 bg-white rounded-sm paper-shadow border-4 border-ink-900 flex flex-col items-center justify-center p-8 text-center transition-transform duration-200 ${rolling ? 'animate-wiggle' : 'hover:scale-105'}`}>

                        {/* Tape Effect */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 tape rotate-2" />

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-marker text-3xl md:text-4xl text-ink-900 leading-tight">
                                    {result.text}
                                </h3>
                            </div>

                            <div className="w-16 h-1 bg-accent-red mx-auto rounded-full" />

                            <div>
                                <p className="font-typewriter text-lg md:text-xl text-ink-600">
                                    {result.sub}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Button Group / Game Over Status */}
                    <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-full text-center">
                        {turns < MAX_TURNS ? (
                            <button
                                onClick={rollDice}
                                disabled={rolling}
                                className="px-8 py-3 bg-ink-900 text-white font-marker text-xl rounded-sm shadow-xl hover:bg-ink-800 transition-colors whitespace-nowrap"
                            >
                                {rolling ? "Rolling..." : `Roll (${MAX_TURNS - turns} left)`}
                            </button>
                        ) : (
                            <div className="animate-fade-in bg-white/90 p-4 rounded-sm border-2 border-accent-red shadow-lg backdrop-blur-sm -mt-4">
                                <p className="font-marker text-xl text-accent-red mb-2">
                                    Limit Reached
                                </p>
                                <p className="font-typewriter text-sm text-ink-600 mb-3">
                                    Now... act on it.
                                </p>
                                <button
                                    onClick={resetGame}
                                    className="text-xs font-typewriter text-gray-400 hover:text-ink-900 underline"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
