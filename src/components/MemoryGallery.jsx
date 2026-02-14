import { useState } from 'react';
import { galleryImages } from '../data/valentineDays';
import GalleryViewer from './GalleryViewer';
import { useReveal } from '../hooks/useReveal';

export default function MemoryGallery() {
    const [viewerIndex, setViewerIndex] = useState(null);
    const [revealRef, isVisible] = useReveal();

    return (
        <section className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto" ref={revealRef}>
            {/* Header */}
            <div
                className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
            >
                <p className="font-cursive text-blush-400 text-base md:text-lg mb-2">Our</p>
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-blush-800 tracking-tight">
                    Memories
                </h2>
                <p className="mt-3 text-sm text-blush-400/80 font-sans max-w-sm mx-auto">
                    A collection of moments that make everything worth it
                </p>
            </div>

            {/* Masonry grid */}
            <div
                className={`columns-2 md:columns-3 gap-3 md:gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
            >
                {galleryImages.map((img, index) => (
                    <GalleryItem
                        key={img.id}
                        image={img}
                        index={index}
                        onClick={() => setViewerIndex(index)}
                    />
                ))}
            </div>

            {/* Fullscreen viewer */}
            {viewerIndex !== null && (
                <GalleryViewer
                    images={galleryImages}
                    currentIndex={viewerIndex}
                    onClose={() => setViewerIndex(null)}
                    onNavigate={setViewerIndex}
                />
            )}
        </section>
    );
}

function GalleryItem({ image, index, onClick }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <button
            onClick={onClick}
            className="block mb-3 md:mb-4 w-full rounded-2xl overflow-hidden relative group 
        cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400
        active:scale-[0.98] transition-transform"
        >
            <div
                className={`${image.height === 'tall' ? 'aspect-[3/4]' : 'aspect-square'
                    } bg-blush-100 rounded-2xl overflow-hidden`}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                />

                {/* Loading shimmer */}
                {!loaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blush-100 via-blush-50 to-blush-100 animate-pulse" />
                )}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl flex items-end p-3">
                <span className="text-white text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    {image.alt}
                </span>
            </div>
        </button>
    );
}
