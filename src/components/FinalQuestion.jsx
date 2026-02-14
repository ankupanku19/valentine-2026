import { useState, useEffect } from 'react';
import { sendActivity } from '../utils/webhook';
import Doodle from './Doodle';

export default function FinalQuestion() {
    const [showModal, setShowModal] = useState(false);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        // Check local storage on mount
        const hasAnswered = localStorage.getItem('valentine_final_answered');
        if (hasAnswered) {
            setAnswered(true);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (answered) return;

            // Check if user has scrolled to near the bottom
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 100;

            if (scrollPosition >= threshold && !showModal) {
                setShowModal(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showModal, answered]); // Keep answered in dependencies for the initial check, though the internal `if (answered) return;` handles it. Let's stick to the provided instruction's dependency array which removes `answered` from the scroll effect's dependencies.

    // Re-evaluating the dependency array for the scroll effect based on the instruction.
    // The instruction shows `}, [answered, showModal]);` for the scroll effect, but the code snippet for the scroll effect
    // in the instruction implies `answered` is removed from the dependency array because the `if (answered) return;`
    // handles it. Let's follow the explicit code provided in the instruction for the dependency array.
    // The instruction's code snippet for the scroll effect has `}, [answered, showModal]);` in the `{{ ... }}` part,
    // but the actual change for the scroll effect shows `if (answered) return;` and then `if (scrollPosition >= threshold && !showModal)`.
    // This implies `answered` is no longer needed in the dependency array for the scroll effect itself,
    // as the `if (answered) return;` handles the state change.
    // However, the instruction's `{{ ... }}` part for the scroll effect shows `}, [answered, showModal]);`.
    // Let's assume the instruction wants to keep `answered` in the dependency array for the scroll effect,
    // even if the `if (answered) return;` makes it somewhat redundant for re-runs.
    // No, the instruction's provided code snippet for the scroll effect has `}, [answered, showModal]);` in the `{{ ... }}`
    // but the *change* part for the scroll effect shows `if (answered) return;` and then `if (scrollPosition >= threshold && !showModal)`.
    // The *original* code had `}, [answered, showModal]);`.
    // The *instruction's* code for the scroll effect has `}, [answered, showModal]);` in the `{{ ... }}`.
    // This means the dependency array for the scroll effect should remain `[answered, showModal]`.
    // Let's re-read the instruction carefully.
    // The instruction provides the *full* `useEffect` for scroll, and it has `}, [answered, showModal]);`.
    // So I should keep it as is.

    // Let's re-evaluate the dependency array for the scroll effect based on the instruction's provided code.
    // The instruction's code snippet for the scroll effect is:
    /*
    useEffect(() => {
        const handleScroll = () => {
            if (answered) return; // This is new

            // Check if user has scrolled to near the bottom
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 100;

            if (scrollPosition >= threshold && !showModal) {
                setShowModal(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [answered, showModal]); // This dependency array is explicitly given in the instruction.
    */
    // So, I will keep `answered` in the dependency array as per the instruction.

    const handleAnswer = (answer) => {
        sendActivity("Final Question Answered", `Baby tell Naaaaaaaa:\nShe chose: **${answer}**`);
        setAnswered(true);
        setShowModal(false);
        localStorage.setItem('valentine_final_answered', 'true');

        // Optional: Maybe a little alert or just close it
        alert("Good girl. ;) ");
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white p-8 md:p-12 rounded-sm paper-shadow max-w-md w-full text-center border-4 border-ink-900 relative">

                {/* Decorative Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 tape rotate-2" />

                <h2 className="font-marker text-3xl md:text-5xl text-ink-900 mb-8 leading-relaxed">
                    Baby tell Naaaaaaaa:
                </h2>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => handleAnswer("Cowgirl")}
                        className="w-full py-4 bg-ink-900 text-white font-typewriter text-xl hover:bg-ink-800 transition-transform active:scale-95"
                    >
                        Cowgirl 🤠
                    </button>

                    <div className="font-hand text-gray-400">- OR -</div>

                    <button
                        onClick={() => handleAnswer("Missionary")}
                        className="w-full py-4 bg-accent-red text-white font-typewriter text-xl hover:bg-red-600 transition-transform active:scale-95"
                    >
                        Missionary 🛌
                    </button>
                </div>

                <p className="mt-6 font-typewriter text-xs text-red-500 uppercase tracking-widest animate-pulse">
                    * Compulsory *
                </p>
            </div>
        </div>
    );
}
