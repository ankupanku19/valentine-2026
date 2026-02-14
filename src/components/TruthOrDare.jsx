import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Doodle from './Doodle';
import { sendActivity } from '../utils/webhook';

const truths = [
    "What's one thing you've imagined doing to me but haven't said out loud?",
    "If I were in the room right now, fully naked, what is the first thing you'd do?",
    "What is the dirtiest dream you've ever had about us?",
    "What's a part of my body you are secretly obsessed with?",
    "Describe exactly how you want me to touch you tonight.",
    "What's a fantasy you have that you think is 'too much'?",
    "When was the last time you touched yourself thinking of me?",
    "If you could control my body for 10 minutes, what would you make me do?",
    "What's the loudest you've ever moaned? Recreate it for me.",
    "Do you prefer it rough and fast, or slow and agonizing?",
    "What's an outfit of mine you want to rip off me?",
    "Tell me a secret about your body that only I should know."
];

const dares = [
    "Lift your top slowly. Reveal your bare chest to the camera. Don't show your face, just your breasts.",
    "Unbutton your pants and push them down to your hips. Show me the curve of your waist and stomach.",
    "Pull your clothes aside to expose one thigh. Run your nails down the skin until you leave a trail.",
    "Tease your nipples until they are hard. Then pull down your top and send a close-up photo of them.",
    "Lie on your bed and expose your stomach. Trace a circle around your belly button and film it.",
    "Send a photo of your bare hips. Make the lighting dim and moody so I have to squint to see the curves.",
    "Squeeze your breasts together with your hands. Send a photo of the cleavage and your grip.",
    "Pull your top up just enough to show the undercurve of your breasts. Tease me without showing everything.",
    "Run an ice cube over your nipples. Send a photo of them reacting to the cold."
];

export default function TruthOrDare() {
    const [revealRef, isVisible] = useReveal();
    const [flipped, setFlipped] = useState(false);
    const [cardContent, setCardContent] = useState("");
    const [cardType, setCardType] = useState(null); // 'truth' or 'dare'
    const [turns, setTurns] = useState(0);
    const MAX_TURNS = 2;

    const pickCard = (type) => {
        if (turns >= MAX_TURNS) return;

        setFlipped(false);
        setTimeout(() => {
            const list = type === 'truth' ? truths : dares;
            const random = list[Math.floor(Math.random() * list.length)];
            setCardContent(random);
            setCardType(type);
            setCardType(type);
            setFlipped(true);
            setTurns(prev => prev + 1);
            sendActivity(`Truth or Dare: ${type.toUpperCase()}`, `She got:\n"${random}"`);
        }, 200);
    };

    const resetGame = () => {
        setTurns(0);
        setFlipped(false);
        setCardContent("");
        setCardType(null);
    };

    return (
        <section ref={revealRef} className="py-24 px-4 overflow-hidden relative">
            <div className="absolute top-10 left-10 opacity-10 pointer-events-none">
                <Doodle type="heart" className="w-64 h-64 text-red-900" />
            </div>

            <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-marker text-4xl md:text-5xl text-ink-900 mb-4">
                    Truth or Dare?
                </h2>

                <p className="font-typewriter text-ink-600 mt-2">
                    2 Turns. No backing out.
                </p>

                <div className="w-24 h-1 bg-ink-900 mx-auto transform -rotate-2 mt-4" />
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Controls */}
                <div className="flex flex-col gap-6 justify-center items-center md:items-end">
                    {turns < MAX_TURNS ? (
                        <>
                            <button
                                onClick={() => pickCard('truth')}
                                className="w-48 py-4 bg-white border-2 border-ink-900 paper-shadow font-typewriter text-xl text-ink-900 hover:-translate-y-1 hover:bg-blue-50 transition-all flex items-center justify-between px-6 group"
                            >
                                <span>TRUTH</span>
                                <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">?</span>
                            </button>

                            <div className="font-hand text-ink-400 text-lg">- OR -</div>

                            <button
                                onClick={() => pickCard('dare')}
                                className="w-48 py-4 bg-ink-900 border-2 border-ink-900 paper-shadow text-white font-typewriter text-xl hover:-translate-y-1 hover:bg-ink-800 transition-all flex items-center justify-between px-6 group"
                            >
                                <span>DARE</span>
                                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">!</span>
                            </button>
                            <p className="font-typewriter text-xs text-gray-400 mt-2">
                                Turns left: {MAX_TURNS - turns}
                            </p>
                        </>
                    ) : (
                        <div className="text-center md:text-right">
                            <h3 className="font-marker text-2xl text-accent-red mb-2">Limit Reached</h3>
                            <button
                                onClick={resetGame}
                                className="text-sm font-typewriter text-gray-400 hover:text-ink-900 underline"
                            >
                                Play Again
                            </button>
                        </div>
                    )}
                </div>

                {/* The Card Display */}
                <div className="perspective-1000 h-64 w-full md:w-80 mx-auto relative">
                    <div className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>

                        {/* Front (Back of card when flipped) - The "Question Mark" side */}
                        <div className="absolute inset-0 backface-hidden bg-paper-100 border-2 border-ink-400 rounded-xl paper-shadow flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(#4a4a4a 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                            />
                            <span className="font-marker text-8xl text-ink-200">?</span>
                        </div>

                        {/* Back (Visible Content) */}
                        <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl paper-shadow border-2 flex flex-col items-center justify-center p-6 text-center ${cardType === 'truth' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
                            <span className={`font-typewriter text-xs tracking-widest uppercase mb-4 ${cardType === 'truth' ? 'text-blue-400' : 'text-red-400'}`}>
                                {cardType}
                            </span>
                            <p className="font-hand text-xl md:text-2xl text-ink-900 leading-normal">
                                {cardContent}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
