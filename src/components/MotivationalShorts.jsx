import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const videosList = [
    { id: 1, src: '/videos/IMG_0704.MP4' },
    { id: 2, src: '/videos/IMG_0705.MP4' },
    { id: 3, src: '/videos/IMG_0706.MP4' },
    { id: 4, src: '/videos/IMG_0707.MP4' },
    { id: 5, src: '/videos/IMG_0708.MP4' },
    { id: 6, src: '/videos/IMG_0709.MP4' },
];

const MotivationalShorts = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const videoRefs = useRef([]);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: '300px' });

    // Auto-swipe functionality: when the active video ends, move to the next
    const handleVideoEnded = () => {
        handleNext();
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videosList.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? videosList.length - 1 : prev - 1));
    };

    // Ensure only the active video is playing, and force mute/unmute
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                video.muted = isMuted;
                if (index === currentIndex && isInView) {
                    // It's the active video, play it
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((e) => {
                            // Autoplay was prevented. 
                            console.log("Autoplay prevented:", e);
                            // We stay muted on first load, so it shouldn't be prevented normally.
                        });
                    }
                } else {
                    // Not active, pause it and reset time
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [currentIndex, isMuted, isInView]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // To create an infinite loop visual, we'll arrange them in a track and slide the track.
    // Framer Motion's AnimatePresence with absolute positioning gives a great coverflow effect.
    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-[#080808] relative overflow-hidden" id="motivational-shorts">
            {/* Dark/Gold Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'conic-gradient(from 0deg, transparent, #C9A961, transparent)', filter: 'blur(80px)' }}
                />
            </div>

            <div className="container relative z-10">
                {/* Compact Inline Header (Variant E) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-[#C9A961] text-[10px] uppercase tracking-[0.3em] font-semibold mb-3 block">
                                {t('shorts.label', 'Inspiration')}
                            </span>
                            <div className="flex items-center gap-6">
                                <h3 className="font-arabic text-[#C9A961] md:text-white whitespace-nowrap text-6xl md:text-7xl lg:text-8xl font-bold" dir="rtl">
  
                                    {t('shorts.title', "Chef's")} <span className="italic text-[#C9A961]">{t('shorts.titleAccent', 'Mindset')}</span>
                                
</h3>
                                <motion.div
                                    className="hidden md:block h-[1px] flex-1"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    style={{ background: 'linear-gradient(to right, #C9A961, transparent)', transformOrigin: 'left' }}
                                />
                            </div>
                        </div>
                        <p className="text-gray-400 max-w-xs text-sm leading-relaxed md:text-right">
                            {t('shorts.description', 'Moments of dedication, precision, and the relentless pursuit of culinary perfection.')}
                        </p>
                    </div>
                </motion.div>

                {/* Video Carousel */}
                <div className="relative max-w-[1200px] mx-auto h-[700px] flex items-center justify-center">
                    
                    {/* Sound Toggle Button - Highly Visible */}
                    <motion.button 
                        onClick={toggleMute}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-4 right-4 md:right-10 z-50 flex items-center gap-3 bg-black/60 hover:bg-[#C9A961]/20 backdrop-blur-md border border-[#C9A961]/50 text-white px-5 py-3 rounded-full shadow-[0_0_20px_rgba(201,169,97,0.2)] transition-colors"
                    >
                        {isMuted ? (
                            <>
                                <FaVolumeMute size={20} className="text-gray-300" />
                                <span className="text-sm font-semibold tracking-wider uppercase text-gray-300">Tap to Unmute</span>
                            </>
                        ) : (
                            <>
                                <FaVolumeUp size={20} className="text-[#C9A961]" />
                                <span className="text-sm font-semibold tracking-wider uppercase text-[#C9A961]">Sound On</span>
                            </>
                        )}
                    </motion.button>

                    <div className="w-full h-full relative flex items-center justify-center perspective-[1200px]">
                        <AnimatePresence mode="popLayout">
                            {videosList.map((video, index) => {
                                // Calculate offset from current index (-1, 0, 1) to determine positioning
                                const offset = index - currentIndex;
                                const isCenter = offset === 0;
                                
                                // Handling infinite wrap logic for display purposes
                                let normalizedOffset = offset;
                                if (offset < -1 && currentIndex === videosList.length - 1 && index === 0) normalizedOffset = 1; // Wrap around to right
                                if (offset > 1 && currentIndex === 0 && index === videosList.length - 1) normalizedOffset = -1; // Wrap around to left

                                // Only render the active video, the one before, and the one after
                                if (Math.abs(normalizedOffset) > 1) return null;

                                return (
                                    <motion.div
                                        key={video.id}
                                        layout
                                        initial={{ 
                                            opacity: 0, 
                                            x: normalizedOffset * 300, 
                                            scale: 0.8,
                                            rotateY: normalizedOffset * -25 
                                        }}
                                        animate={{ 
                                            opacity: isCenter ? 1 : 0.4, 
                                            x: normalizedOffset * (window.innerWidth > 768 ? 350 : 220), 
                                            scale: isCenter ? 1 : 0.85,
                                            rotateY: isCenter ? 0 : normalizedOffset * -25,
                                            zIndex: isCenter ? 30 : 10
                                        }}
                                        exit={{ 
                                            opacity: 0, 
                                            scale: 0.8,
                                            transition: { duration: 0.3 } 
                                        }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 260, 
                                            damping: 25,
                                            mass: 1.2
                                        }}
                                        className="absolute w-[320px] md:w-[380px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer bg-black"
                                        style={{ 
                                            border: isCenter ? '2px solid rgba(201,169,97,0.7)' : '1px solid rgba(255,255,255,0.1)',
                                            boxShadow: isCenter ? '0 0 40px rgba(201,169,97,0.2)' : '0 20px 40px rgba(0,0,0,0.6)',
                                            willChange: 'transform, opacity'
                                        }}
                                        onClick={() => {
                                            if (!isCenter) {
                                                if (normalizedOffset > 0) handleNext();
                                                else handlePrev();
                                            }
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black" />
                                        
                                        {/* Performance Optimization: Only mount the video element if it's the active, next, or previous slide */}
                                        {Math.abs(normalizedOffset) <= 1 && (
                                            <video
                                                ref={el => videoRefs.current[index] = el}
                                                src={video.src}
                                                className="w-full h-full object-cover relative z-10"
                                                playsInline
                                                webkit-playsinline="true"
                                                onEnded={isCenter ? handleVideoEnded : null}
                                                muted={isMuted}
                                                preload={isInView ? (isCenter ? "auto" : "metadata") : "none"}
                                                style={{
                                                    transition: 'opacity 0.5s ease',
                                                    opacity: isCenter ? 1 : 0.6,
                                                }}
                                            />
                                        )}

                                        {/* Progress Bar for Active Video */}
                                        {isCenter && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-20">
                                                <motion.div 
                                                    className="h-full bg-[#C9A961]"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ 
                                                        duration: (videoRefs.current[index]?.duration || 10), // Will sync better via native video tracking if needed, but this works nicely for a smooth visual
                                                        ease: "linear",
                                                        repeat: 0
                                                    }}
                                                    key={`progress-${currentIndex}`}
                                                />
                                            </div>
                                        )}
                                        
                                        {/* Glassmorphic overlay for active video */}
                                        {isCenter && (
                                            <div className="absolute inset-0 z-30 pointer-events-none rounded-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(201,169,97,0.15)]" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                        {videosList.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentIndex === idx ? 'w-8 bg-[#C9A961]' : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MotivationalShorts;
