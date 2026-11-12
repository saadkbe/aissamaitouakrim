import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import galleryImg1 from '../assets/gallery_dish_1.webp';
import galleryImg2 from '../assets/gallery_dish_2.webp';
import galleryImg3 from '../assets/gallery_dish_3.webp';
import galleryImg4 from '../assets/gallery_dish_4.webp';
import galleryImg5 from '../assets/gallery_dish_5.webp';

const dishes = [
    {
        img: galleryImg1,
        title: "Chocolate Mousse",
        desc: "Silky chocolate mousse with cocoa crumble and edible violet, accented with caramelized fruit on a sculpted white plate.",
        season: "Winter",
        technique: "Pastry Art",
    },
    {
        img: galleryImg2,
        title: "Floral Infusion",
        desc: "A stunning composition of edible flowers and berry spheres in a golden saffron broth, served amid theatrical dry-ice clouds.",
        season: "Spring",
        technique: "Molecular Gastronomy",
    },
    {
        img: galleryImg3,
        title: "Garden Tartare",
        desc: "Delicate cucumber ribbons and fresh dill atop a tartare base, presented on an artisanal geometric glass plate.",
        season: "Summer",
        technique: "Contemporary Plating",
    },
    {
        img: galleryImg4,
        title: "Moroccan Star",
        desc: "A signature cocktail crowned with a geometric Moroccan star pattern in cocoa, celebrating heritage through craft.",
        season: "All Seasons",
        technique: "Mixology Art",
    },
    {
        img: galleryImg5,
        title: "Truffle Spirale",
        desc: "Chocolate spiral tart with whole black truffle and gold-flecked crumble bold earthy elegance in every layer.",
        season: "Autumn",
        technique: "Fine Pastry",
    },
];

/* Duplicate the array for seamless looping */
const track = [...dishes, ...dishes, ...dishes];

function MarqueeTrack({ items, direction = 'left', speed = 50, onItemClick }) {
    const [paused, setPaused] = useState(false);
    const dur = `${Math.round((items.length / 3) * speed)}s`;

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="flex gap-6"
                style={{
                    width: 'max-content',
                    animation: `marquee-${direction} ${dur} linear infinite`,
                    animationPlayState: paused ? 'paused' : 'running',
                }}
            >
                {items.map((dish, i) => (
                    <motion.div
                        key={i}
                        className="relative flex-shrink-0 cursor-pointer group"
                        style={{ width: 380, height: 320 }}
                        onClick={() => onItemClick(dish)}
                        whileHover={{ scale: 1.04, zIndex: 10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Image */}
                        <img
                            src={dish.img}
                            alt={dish.title}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                            style={{ transition: 'filter 0.4s ease' }}
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 rounded-xl transition-opacity duration-400"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
                            }}
                        />

                        {/* Gold border on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{ border: '1px solid rgba(201,169,97,0.5)' }}
                        />

                        {/* Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                            <div className="flex gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm"
                                    style={{ color: '#C9A961', background: 'rgba(201,169,97,0.15)', border: '1px solid rgba(201,169,97,0.3)' }}>
                                    {dish.season}
                                </span>
                                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm"
                                    style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                    {dish.technique}
                                </span>
                            </div>
                            <h3 className="text-white font-black text-xl leading-tight" style={{ fontFamily: 'serif' }}>
                                {dish.title}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const Gallery = () => {
    const [selectedDish, setSelectedDish] = useState(null);
    const { t } = useLanguage();

    return (
        <section id="galerie" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
            {/* Keyframe styles */}
            <style>{`
                @keyframes marquee-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                @keyframes marquee-right {
                    0%   { transform: translateX(calc(-100% / 3)); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Subtle ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full opacity-[0.06]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(ellipse, #C9A961, transparent 65%)', filter: 'blur(60px)' }}
                />
            </div>

            <div className="relative z-10">
                {/* Header inside container */}
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16 relative"
                    >
                        {/* Floating watermark number */}
                        <motion.span
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[240px] font-black select-none pointer-events-none leading-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.1 }}
                            style={{ fontFamily: 'serif', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,97,0.06)' }}
                        >
                            01
                        </motion.span>

                        {/* Pill badge label */}
                        <motion.span
                            className="inline-block text-[10px] uppercase tracking-[0.3em] font-semibold px-4 py-1.5 rounded-full mb-8"
                            style={{ color: '#C9A961', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            {t('gallery.label')}
                        </motion.span>

                        <h3 className="font-arabic text-[#C9A961] md:font-bold mb-6 text-center relative z-10 text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                            {t('gallery.titleArabic')}
                        
</h3>

                        {/* Centered gold rule */}
                        <motion.div
                            className="h-[1px] mx-auto mb-6"
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }}
                        />

                        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed relative z-10">
                            {t('gallery.description')}
                        </p>
                    </motion.div>
                </div>

                {/* ── Single row infinite scroll full bleed ── */}
                <div
                    className="relative"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
                    }}
                >
                    <MarqueeTrack items={track} direction="left" speed={55} onItemClick={setSelectedDish} />
                </div>

                {/* Hover hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-xs uppercase tracking-[0.25em] mt-10"
                    style={{ color: 'rgba(201,169,97,0.35)' }}
                >
                    Hover to pause · Click to explore
                </motion.p>

                {/* CTA */}
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a href="#contact" className="btn-primary">
                            {t('gallery.cta')}
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* ── Detail Modal ── */}
            <AnimatePresence>
                {selectedDish && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)' }}
                        onClick={() => setSelectedDish(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.92, y: 30 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
                            style={{ background: '#0A0A0A', border: '1px solid rgba(201,169,97,0.2)' }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Gold top bar */}
                            <div className="h-[2px]" style={{ background: 'linear-gradient(to right, transparent, #C9A961 30%, rgba(201,169,97,0.3) 70%, transparent)' }} />

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Image side */}
                                <div className="relative h-64 md:h-full overflow-hidden">
                                    <img
                                        src={selectedDish.img}
                                        alt={selectedDish.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0"
                                        style={{ background: 'linear-gradient(to right, transparent 60%, #0A0A0A 100%)' }} />
                                </div>

                                {/* Content side */}
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="flex gap-2 mb-5">
                                        <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full"
                                            style={{ color: '#C9A961', background: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.25)' }}>
                                            {selectedDish.season}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full"
                                            style={{ color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                            {selectedDish.technique}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'serif' }}>
                                        {selectedDish.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {selectedDish.desc}
                                    </p>

                                    <div className="pt-5 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">{t('gallery.chefNote')}</p>
                                        <p className="text-sm text-gray-500 italic">
                                            "Every plate is a canvas technique is the brushstroke, passion is the colour."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Close */}
                            <button
                                onClick={() => setSelectedDish(null)}
                                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors"
                                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
