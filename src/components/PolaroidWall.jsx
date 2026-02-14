import { useState, useRef } from 'react';
import { galleryImages } from '../data/valentineDays';

export default function PolaroidWall() {
    // Generate random rotation and position for each photo once
    const positions = useRef(galleryImages.map(() => ({
        rotation: Math.random() * 12 - 6,
        x: Math.random() * 30 - 15,
        y: Math.random() * 30 - 15,
    })));

    const [zIndices, setZIndices] = useState(galleryImages.map((_, i) => i + 10));

    const bringToFront = (index) => {
        setZIndices(prev => {
            const newIndices = [...prev];
            const maxZ = Math.max(...newIndices);
            newIndices[index] = maxZ + 1;
            return newIndices;
        });
    };

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="py-16 md:py-24 overflow-hidden">
            <div className="text-center mb-12 px-4">
                <h2 className="font-marker text-3xl md:text-5xl text-ink-900 mb-4 transform -rotate-2">
                    Our Messy Memories
                </h2>
                <div className="inline-block bg-accent-tape px-4 py-1 transform rotate-1 shadow-sm">
                    <p className="font-typewriter text-sm md:text-base text-ink-600">
                        ( drag them around... just kidding, click them! )
                    </p>
                </div>
            </div>

            {/* Mobile View: Horizontal Scroll */}
            <div className="md:hidden flex overflow-x-auto gap-6 px-8 pb-12 w-full no-scrollbar">
                {galleryImages.map((img, i) => (
                    <div
                        key={img.id}
                        className="shrink-0"
                        onClick={() => setSelectedImage(img)}
                    >
                        <div className="bg-white p-3 pb-10 paper-shadow w-64">
                            <div className="bg-gray-100 overflow-hidden mb-3">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <p className="font-hand text-2xl text-ink-900 text-center">
                                {img.alt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-sm w-full bg-white p-4 pb-12 rounded-sm shadow-2xl transform rotate-1">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full text-ink-900 font-bold border-2 border-ink-900 flex items-center justify-center shadow-lg z-10"
                        >
                            X
                        </button>
                        <div className="bg-gray-100 overflow-hidden mb-4 flex items-center justify-center">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />
                        </div>
                        <p className="font-hand text-3xl text-ink-900 text-center">
                            {selectedImage.alt}
                        </p>
                    </div>
                </div>
            )}


            {/* Desktop View: Scattered Wall */}
            <div
                className="hidden md:block relative w-full max-w-5xl mx-auto"
                style={{ height: `${Math.ceil(galleryImages.length / 3) * 250 + 100}px` }}
            >
                {galleryImages.map((img, i) => (
                    <div
                        key={img.id}
                        onClick={() => bringToFront(i)}
                        className="absolute cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-0"
                        style={{
                            zIndex: zIndices[i],
                            left: `${(i % 3) * 30 + 5}%`,
                            top: `${Math.floor(i / 3) * 250}px`,
                            transform: `translate(${positions.current[i].x}px, ${positions.current[i].y}px) rotate(${positions.current[i].rotation}deg)`
                        }}
                    >
                        <div className="bg-white p-4 pb-12 paper-shadow w-64">
                            {/* Tape element */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 tape transform -rotate-1" />

                            <div className="bg-gray-100 overflow-hidden mb-4 border border-gray-100">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <p className="font-hand text-2xl text-ink-900 text-center transform -rotate-1">
                                {img.alt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
