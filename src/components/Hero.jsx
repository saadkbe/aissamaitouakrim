import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// Import our ultra-premium cinematic background
import heroBg from '../assets/media__1772494489495.webp';

const TAGLINES = [
    { en: 'African Champion · Bocuse d\'Or', fr: 'Champion d\'Afrique · Bocuse d\'Or' },
    { en: 'Culinary Visionary', fr: 'Visionnaire Culinaire' },
    { en: 'Moroccan Soul · French Mastery', fr: 'Âme Marocaine · Maîtrise Française' },
    { en: 'Chef', fr: 'Chef' },
];

/* ── Sparkle Particles ── */
function SparkleParticles() {
    const particles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        twinkle: Math.random() * 2 + 1.5,
    })), []);

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: `radial-gradient(circle, rgba(201,169,97,0.9) 0%, rgba(201,169,97,0.3) 50%, transparent 100%)`,
                        boxShadow: `0 0 ${p.size * 2}px rgba(201,169,97,0.4)`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0.3, 1, 0],
                        scale: [0.5, 1.2, 0.8, 1, 0.5],
                        y: [0, -20, -40, -60, -80],
                        x: [0, Math.random() * 20 - 10, Math.random() * 10 - 5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

const Hero = () => {
    const { language, t } = useLanguage();
    const lang = language === 'fr' ? 'fr' : 'en';
    const [taglineIdx, setTaglineIdx] = useState(0);

    const { scrollY } = useScroll();

    // Subtle parallax effect on scroll
    const textY = useTransform(scrollY, [0, 800], [0, 150]);
    const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        const id = setInterval(() => setTaglineIdx((i) => (i + 1) % TAGLINES.length), 4500);
        return () => clearInterval(id);
    }, []);

    // Letter animation for first name
    const firstNameLetters = 'AISSAM'.split('');
    const lastNameLetters = 'Ait Ouakrim'.split('');

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden bg-[#050505]">

            {/* ── Cinematic Background ── */}
            <motion.div
                className="absolute inset-0 z-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <img
                    src={heroBg}
                    alt="Chef Aissam Culinary Art"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            {/* Continuous subtle breathing effect (Ken Burns) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                animate={{ scale: 1.02 }}
                transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear", delay: 1.5 }}
            >
                <img
                    src={heroBg}
                    alt="Fine Dining Atmosphere"
                    className="w-full h-full object-cover object-center opacity-20 mix-blend-screen"
                />
            </motion.div>

            {/* ── Circular Black Vignette Gradient ── */}
            <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, transparent 15%, rgba(5,5,5,0.3) 35%, rgba(5,5,5,0.7) 55%, rgba(5,5,5,0.92) 75%, #050505 100%)',
                }} />

            {/* Extra dark overlay layer */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/25" />

            {/* Top gradient for nav */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none opacity-90" />

            {/* Bottom gradient to seamlessly blend into next section */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />

            {/* ── Sparkle Particles ── */}
            <SparkleParticles />

            {/* ── MAIN CONTENT (Minimal, High-End) ── */}
            <div className="relative z-30 h-full flex flex-col items-center justify-center pt-20 pb-16">

                <motion.div
                    className="flex flex-col items-center text-center px-4"
                    style={{ y: textY, opacity: textOpacity }}
                >
                    {/* Small preamble */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A961]" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C9A961]" style={{ fontFamily: 'var(--font-body)' }}>
                            {t('hero.cta1', "Chef")}
                        </span>
                        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A961]" />
                    </motion.div>

                    {/* ── Creative Chef Name Treatment ── */}
                    <div className="flex flex-col items-center mb-6">
                        {/* AISSAM — Letter-by-letter stagger animation */}
                        <motion.div
                            className="flex items-center justify-center overflow-hidden mb-1 md:mb-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } }
                            }}
                        >
                            {firstNameLetters.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block text-white"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                                        fontWeight: 300,
                                        letterSpacing: '0.25em',
                                        lineHeight: 1,
                                        textShadow: '0 10px 60px rgba(0,0,0,0.9)',
                                    }}
                                    variants={{
                                        hidden: { opacity: 0, y: 50, rotateX: -90 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            rotateX: 0,
                                            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                                        },
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Decorative double line between names */}
                        <motion.div
                            className="flex items-center gap-4 my-2 md:my-3"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
                        >
                            <div className="w-16 md:w-24 h-[0.5px]" style={{ background: 'linear-gradient(to right, transparent, #C9A961)' }} />
                            <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ background: 'radial-gradient(circle, #C9A961, rgba(201,169,97,0.3))' }}
                                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <div className="w-16 md:w-24 h-[0.5px]" style={{ background: 'linear-gradient(to left, transparent, #C9A961)' }} />
                        </motion.div>

                        {/* AIT OUAKRIM — Flowing italic, letter stagger */}
                        <motion.div
                            className="flex items-center justify-center overflow-hidden"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.05, delayChildren: 1.5 } }
                            }}
                        >
                            {lastNameLetters.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(2rem, 5.5vw, 5rem)',
                                        fontWeight: 300,
                                        fontStyle: 'italic',
                                        letterSpacing: '0.12em',
                                        lineHeight: 1.1,
                                        background: 'linear-gradient(135deg, #C9A961 0%, #F5E6C8 40%, #C9A961 70%, #B8935A 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: 'none',
                                    }}
                                    variants={{
                                        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0px)',
                                            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                                        },
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Subtle glow behind the name */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse, rgba(201,169,97,0.08) 0%, transparent 60%)',
                                filter: 'blur(40px)',
                            }}
                            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>

                    {/* Flowing abstract underline */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                        className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C9A961]/60 to-transparent mb-10"
                    />

                    {/* Changing Elegant Taglines */}
                    <div className="h-6 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={taglineIdx}
                                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="text-xs md:text-sm text-gray-300 font-light tracking-[0.3em] uppercase"
                            >
                                {TAGLINES[taglineIdx][lang]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Scroll / Discover Element ── */}
                <motion.div
                    className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-6 z-30"
                    style={{ opacity: textOpacity }}
                >
                    <motion.a
                        href="#about"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 2.5 }}
                        className="group flex flex-col items-center gap-4 cursor-pointer"
                    >
                        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 group-hover:text-[#C9A961] transition-colors duration-500">
                            {t('hero.scroll', "Discover")}
                        </span>

                        {/* Minimalist vertical line scroll indicator */}
                        <div className="relative h-20 w-[1px] bg-white/10 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A961]"
                                animate={{ y: ['-100%', '200%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
