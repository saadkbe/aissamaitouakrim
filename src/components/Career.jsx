import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import hotelUm6p from '../assets/hotel_um6p_1772489114081.webp';
import hotelConrad from '../assets/hotel_conrad_1772489127587.webp';
import hotelMarchica from '../assets/hotel_marchica_1772489139941.webp';
import hotelPalaisSoleiman from '../assets/hotel_palais_soleiman_1772489153956.webp';
import hotelCesar from '../assets/hotel_cesar_1772489169097.webp';
import hotelFourSeasons from '../assets/hotel_four_seasons_1772489186467.webp';
import hotelKenzi from '../assets/hotel_kenzi_1772489199244.webp';
import hotelLamiral from '../assets/hotel_lamiral_1772489213634.webp';
import hotelPalmeraie from '../assets/hotel_palmeraie_1772489225910.webp';

/* ── Career data ── */
const career = [
    {
        role: "Chef",
        place: "UM6P – Université Mohammed VI Polytechnique",
        subPlace: "School of Hospitality Business & Management",
        year: "2025",
        period: "Jan 2025 – Present",
        desc: {
            en: "Chef of SHBM, managing two restaurants (The 5th & Rihla), one coffee shop (ness-ness), and full banquet operations for Morocco's leading polytechnic university.",
            fr: "Chef du SHBM, gérant deux restaurants (The 5th & Rihla), un coffee shop (ness-ness), et les opérations banquet complètes de la principale université polytechnique du Maroc.",
        },
        team: "35+",
        outlets: "3 Outlets + Banquet",
        type: { en: "Educational Leadership", fr: "Leadership Éducatif" },
        highlight: true,
        icon: "🎓",
        image: hotelUm6p,
    },
    {
        role: "Chef",
        place: "Conrad Rabat Arzana",
        subPlace: "Hilton Group 5★ Luxury Opening",
        year: "2022–2024",
        period: "Aug 2022 – Sep 2024",
        desc: {
            en: "Grand opening of a 120-suite 5-star flagship hotel. Led four restaurants, three bars, and banquet commanding the largest culinary brigade of his career.",
            fr: "Grande ouverture d'un hôtel phare 5 étoiles de 120 suites. Manage quatre restaurants, trois bars et le banquet la plus grande brigade culinaire de sa carrière.",
        },
        team: "65+",
        outlets: "4 Restaurants · 3 Bars",
        type: { en: "Hotel Opening", fr: "Ouverture d'Hôtel" },
        highlight: false,
        icon: "🏨",
        image: hotelConrad,
    },
    {
        role: "Chef",
        place: "Marchica Lagoon Resort",
        subPlace: "La Mamounia Group 5★ Opening",
        year: "2019–2022",
        period: "Feb 2019 – Aug 2022",
        desc: {
            en: "Opened this 93-suite 5-star lagoon resort. Managed three restaurants, two bars, and a private beach operation on the shores of the Mediterranean.",
            fr: "Ouverture de ce complexe lagune 5 étoiles de 93 suites. Gère trois restaurants, deux bars et une opération de plage privée sur les rives de la Méditerranée.",
        },
        team: "45+",
        outlets: "3 Restaurants · 2 Bars + Beach",
        type: { en: "Hotel Opening", fr: "Ouverture d'Hôtel" },
        highlight: false,
        icon: "🌊",
        image: hotelMarchica,
    }
];

/* ── 3-D tilt hook ── */
function useTilt(intensity = 6) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 180, damping: 22 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 180, damping: 22 });

    const handleMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return { ref, rotateX, rotateY, handleMove, handleLeave };
}

/* ── Animated count-up hook ── */
function useCountUp(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const num = parseInt(target);
        if (isNaN(num)) { setCount(target); return; }
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * num));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

/* ── Floating particles background ── */
function FloatingParticles() {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.15 + 0.05,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: '#C9A961',
                    }}
                    animate={{
                        y: [0, -80, -160, -80, 0],
                        x: [0, 30, -20, 10, 0],
                        opacity: [0, p.opacity, p.opacity, p.opacity, 0],
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

/* ── Horizontal Timeline Node ── */
function TimelineNode({ item, index, isActive, onClick, totalItems }) {
    return (
        <motion.button
            onClick={onClick}
            className="relative flex flex-col items-center group cursor-pointer flex-shrink-0"
            style={{ minWidth: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
        >
            {/* Year label */}
            <motion.span
                className="text-xs font-bold mb-3 tracking-wider transition-all duration-300"
                animate={{
                    color: isActive ? '#C9A961' : 'rgba(150,150,150,0.5)',
                    scale: isActive ? 1.1 : 1,
                }}
            >
                {item.year}
            </motion.span>

            {/* Node circle */}
            <motion.div
                className="relative z-10 rounded-full flex items-center justify-center"
                animate={{
                    width: isActive ? 48 : 32,
                    height: isActive ? 48 : 32,
                    background: isActive
                        ? 'linear-gradient(135deg, #C9A961, #F5E6C8)'
                        : 'linear-gradient(135deg, rgba(201,169,97,0.15), rgba(201,169,97,0.05))',
                    border: isActive
                        ? '2px solid rgba(201,169,97,0.8)'
                        : '1px solid rgba(201,169,97,0.2)',
                    boxShadow: isActive
                        ? '0 0 0 6px rgba(201,169,97,0.15), 0 0 30px rgba(201,169,97,0.3), 0 4px 20px rgba(0,0,0,0.3)'
                        : '0 0 0 0px transparent',
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="text-sm" style={{ filter: isActive ? 'none' : 'grayscale(100%) opacity(0.4)' }}>
                    {item.icon}
                </span>
            </motion.div>

            {/* Active pulse ring */}
            {isActive && (
                <motion.div
                    className="absolute top-[22px] rounded-full"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    style={{
                        width: 48, height: 48,
                        border: '1px solid rgba(201,169,97,0.4)',
                    }}
                />
            )}
        </motion.button>
    );
}

/* ── Stat Card ── */
function StatCard({ value, label, delay, inView }) {
    const numericValue = parseInt(value);
    const suffix = isNaN(numericValue) ? '' : value.replace(String(numericValue), '');
    const count = useCountUp(numericValue || 0, 1800, inView);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className="relative group text-center p-8 rounded-2xl overflow-hidden"
            style={{
                background: 'linear-gradient(145deg, rgba(201,169,97,0.06), rgba(255,255,255,0.02))',
                border: '1px solid rgba(201,169,97,0.12)',
                backdropFilter: 'blur(12px)',
            }}
        >
            {/* Hover glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(201,169,97,0.15), transparent 70%)' }}
            />
            {/* Shimmer border */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(135deg, rgba(201,169,97,0.4) 0%, transparent 40%, transparent 60%, rgba(201,169,97,0.2) 100%)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                    borderRadius: 'inherit',
                }}
            />
            <div className="relative z-10">
                <motion.div
                    className="text-5xl font-black mb-2"
                    style={{ color: '#C9A961', fontFamily: 'serif' }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {isNaN(numericValue) ? value : `${count}${suffix}`}
                </motion.div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-medium">{label}</div>
            </div>
        </motion.div>
    );
}


/* ══════════════════════════════════════════
   ██  Main Career Component
   ══════════════════════════════════════════ */
const Career = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { language, t } = useLanguage();
    const lang = language === 'fr' ? 'fr' : 'en';
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
    const timelineScrollRef = useRef(null);
    const { ref: cardRef, rotateX, rotateY, handleMove, handleLeave } = useTilt(4);

    const selected = career[selectedIndex];

    /* Keyboard navigation */
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(career.length - 1, prev + 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(0, prev - 1));
        }
    }, []);

    /* Auto-scroll timeline to center active node */
    useEffect(() => {
        if (!timelineScrollRef.current) return;
        const container = timelineScrollRef.current;
        const activeNode = container.children[selectedIndex];
        if (!activeNode) return;
        const scrollTo = activeNode.offsetLeft - container.offsetWidth / 2 + activeNode.offsetWidth / 2;
        container.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }, [selectedIndex]);

    /* Handle swipe gesture for mobile */
    const handleDragEnd = (event, info) => {
        const threshold = 50; // swipe threshold in pixels
        if (info.offset.x < -threshold) {
            // swiped left -> next card
            setSelectedIndex(prev => Math.min(career.length - 1, prev + 1));
        } else if (info.offset.x > threshold) {
            // swiped right -> previous card
            setSelectedIndex(prev => Math.max(0, prev - 1));
        }
    };

    return (
        <section
            id="career"
            className="py-24 md:py-36 bg-[#0A0A0A] relative overflow-hidden"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{ outline: 'none' }}
        >
            {/* ── Background atmosphere ── */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-[-200px] right-[-100px] w-[900px] h-[900px] rounded-full opacity-[0.05]"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle, #C9A961, transparent 65%)', filter: 'blur(100px)' }}
                />
                <motion.div
                    className="absolute bottom-[-150px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-[0.04]"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
                    style={{ background: 'radial-gradient(circle, #C9A961, transparent 70%)', filter: 'blur(80px)' }}
                />
                <FloatingParticles />
            </div>

            <div className="container relative z-10">

                {/* ── Split Dramatic Header (Variant C) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end">
                        {/* Left side: label + title + Arabic */}
                        <div className="md:col-span-8 relative">
                            {/* Large watermark number */}
                            <span className="absolute -top-8 -left-2 text-[140px] md:text-[200px] font-black leading-none select-none pointer-events-none"
                                style={{ fontFamily: 'serif', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,97,0.05)' }}>
                                03
                            </span>

                            {/* Pill badge */}
                            <motion.span
                                className="inline-block text-[10px] uppercase tracking-[0.3em] font-semibold px-4 py-1.5 rounded-full mb-6 relative z-10"
                                style={{ color: '#C9A961', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                            >
                                {t('career.label')}
                            </motion.span>

                            <h3 className="font-arabic text-[#C9A961] md:font-bold mt-3 relative z-10 text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                                {t('career.titleArabic')}
                            
</h3>
                        </div>

                        {/* Right side: description + vertical accent */}
                        <div className="md:col-span-4 relative pl-6 md:pl-8">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px]"
                                style={{ background: 'linear-gradient(to bottom, #C9A961, rgba(201,169,97,0.1))' }} />
                            <p className="text-gray-500 text-base leading-relaxed">
                                {t('career.description')}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── Horizontal Timeline Ribbon ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative mb-16"
                >
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
                    <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

                    {/* Horizontal connecting line */}
                    <div className="absolute left-0 right-0 top-[52px] h-[1px]"
                        style={{ background: 'linear-gradient(to right, transparent 5%, rgba(201,169,97,0.15) 15%, rgba(201,169,97,0.15) 85%, transparent 95%)' }} />

                    {/* Animated progress line */}
                    <motion.div
                        className="absolute top-[52px] left-0 h-[2px] rounded-full"
                        animate={{ width: `${((selectedIndex) / (career.length - 1)) * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ background: 'linear-gradient(to right, rgba(201,169,97,0.2), #C9A961)' }}
                    />

                    {/* Scrollable node container */}
                    <div
                        ref={timelineScrollRef}
                        className="flex items-start gap-4 md:gap-6 py-4 px-12 overflow-x-auto no-scrollbar justify-between"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {career.map((item, index) => (
                            <TimelineNode
                                key={index}
                                item={item}
                                index={index}
                                isActive={selectedIndex === index}
                                onClick={() => setSelectedIndex(index)}
                                totalItems={career.length}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* ── Detail Card with 3D tilt ── */}
                <div className="relative" style={{ perspective: 1200 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(6px)' }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                ref={cardRef}
                                onMouseMove={handleMove}
                                onMouseLeave={handleLeave}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                style={{ rotateX, rotateY, transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <div
                                    className="relative rounded-3xl overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(160deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
                                        border: '1px solid rgba(201,169,97,0.15)',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,97,0.08) inset',
                                    }}
                                >
                                    {/* Gold shimmer top bar */}
                                    <div className="h-[2px] w-full"
                                        style={{ background: 'linear-gradient(to right, transparent 10%, #C9A961 35%, rgba(201,169,97,0.4) 65%, transparent 90%)' }} />

                                    {/* Main content grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                                        {/* Left: Large visual area */}
                                        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[450px] overflow-hidden">
                                            <img
                                                src={selected.image}
                                                alt={selected.place}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover"
                                                style={{ opacity: 0.35 }}
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0"
                                                style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.9) 100%)' }} />
                                            <div className="absolute inset-0 hidden lg:block"
                                                style={{ background: 'linear-gradient(to right, transparent 50%, #0d0d0d 100%)' }} />

                                            {/* Big chapter number */}
                                            <div className="absolute top-8 left-8 lg:top-10 lg:left-10">
                                                <motion.div
                                                    key={selectedIndex}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.1 }}
                                                    className="mb-2"
                                                >
                                                    <span className="text-8xl lg:text-9xl font-black leading-none"
                                                        style={{
                                                            fontFamily: 'serif',
                                                            color: 'transparent',
                                                            WebkitTextStroke: '1px rgba(201,169,97,0.2)',
                                                        }}>
                                                        {String(selectedIndex + 1).padStart(2, '0')}
                                                    </span>
                                                </motion.div>
                                            </div>

                                            {/* Icon + type badge at bottom */}
                                            <div className="absolute bottom-8 left-8 lg:bottom-10 lg:left-10 flex items-center gap-3">
                                                <motion.div
                                                    key={`icon-${selectedIndex}`}
                                                    initial={{ scale: 0, rotate: -90 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.15, type: 'spring' }}
                                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(201,169,97,0.2), rgba(201,169,97,0.05))',
                                                        border: '1px solid rgba(201,169,97,0.3)',
                                                        backdropFilter: 'blur(10px)',
                                                    }}
                                                >
                                                    {selected.icon}
                                                </motion.div>
                                                <motion.span
                                                    key={`type-${selectedIndex}`}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.25 }}
                                                    className="text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-2 rounded-full"
                                                    style={{
                                                        color: '#C9A961',
                                                        background: 'rgba(201,169,97,0.1)',
                                                        border: '1px solid rgba(201,169,97,0.2)',
                                                        backdropFilter: 'blur(8px)',
                                                    }}
                                                >
                                                    {selected.type[lang]}
                                                </motion.span>
                                            </div>
                                        </div>

                                        {/* Right: Content area */}
                                        <div className="lg:col-span-7 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                                            {/* Period */}
                                            <motion.div
                                                key={`period-${selectedIndex}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.05 }}
                                                className="flex items-center gap-3 mb-6"
                                            >
                                                <span className="text-xs uppercase tracking-[0.25em] font-bold"
                                                    style={{ color: '#C9A961' }}>
                                                    {selected.period}
                                                </span>
                                                {selected.highlight && (
                                                    <motion.span
                                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold"
                                                        style={{ color: '#000', background: 'linear-gradient(135deg, #C9A961, #F5E6C8)' }}
                                                    >
                                                        Current
                                                    </motion.span>
                                                )}
                                            </motion.div>

                                            {/* Place */ }
                                            <motion.h3
                                                key={`place-${selectedIndex}`}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.15 }}
                                                className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2"
                                                style={{ fontFamily: 'var(--font-display, serif)' }}
                                            >
                                                {selected.place}
                                            </motion.h3>
                                            {selected.subPlace && (
                                                <motion.p
                                                    key={`sub-${selectedIndex}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.4, delay: 0.2 }}
                                                    className="text-sm uppercase tracking-[0.15em] mb-6"
                                                    style={{ color: 'rgba(201,169,97,0.85)' }}
                                                >
                                                    {selected.subPlace}
                                                </motion.p>
                                            )}

                                            {/* Gold divider */}
                                            <motion.div
                                                key={`div-${selectedIndex}`}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="h-[1px] mb-6"
                                                style={{ background: 'linear-gradient(to right, #C9A961, rgba(201,169,97,0.1))', transformOrigin: 'left' }}
                                            />

                                            {/* Description */}
                                            <motion.p
                                                key={`desc-${selectedIndex}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.25 }}
                                                className="text-gray-400 leading-relaxed text-base md:text-lg mb-8"
                                            >
                                                {selected.desc[lang]}
                                            </motion.p>

                                            {/* Stats row */}
                                            <motion.div
                                                key={`stats-${selectedIndex}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="grid grid-cols-2 gap-4"
                                            >
                                                <div className="rounded-xl p-5"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(201,169,97,0.08), rgba(201,169,97,0.02))',
                                                        border: '1px solid rgba(201,169,97,0.12)',
                                                    }}>
                                                    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-2 font-medium">
                                                        {t('career.teamSize')}
                                                    </div>
                                                    <div className="text-2xl md:text-3xl font-black" style={{ color: '#C9A961', fontFamily: 'serif' }}>
                                                        {selected.team}
                                                    </div>
                                                </div>
                                                <div className="rounded-xl p-5"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(201,169,97,0.08), rgba(201,169,97,0.02))',
                                                        border: '1px solid rgba(201,169,97,0.12)',
                                                    }}>
                                                    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-2 font-medium">
                                                        {t('career.operations')}
                                                    </div>
                                                    <div className="text-xl md:text-2xl font-black leading-tight" style={{ color: '#C9A961', fontFamily: 'serif' }}>
                                                        {selected.outlets}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Bottom gold bar */}
                                    <div className="h-[1px] w-full"
                                        style={{ background: 'linear-gradient(to right, transparent 10%, rgba(201,169,97,0.1) 30%, rgba(201,169,97,0.1) 70%, transparent 90%)' }} />
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── Navigation Controls ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between mt-8 px-2"
                >
                    <button
                        onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                        disabled={selectedIndex === 0}
                        className="flex items-center gap-3 group transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                        style={{ color: 'rgba(201,169,97,0.7)' }}
                        onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.color = '#C9A961')}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,169,97,0.7)'}
                    >
                        <motion.div
                            whileHover={{ x: -4 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                                border: '1px solid rgba(201,169,97,0.2)',
                                background: 'rgba(201,169,97,0.05)',
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.div>
                        <span className="uppercase tracking-[0.2em] text-xs font-medium hidden md:inline">{t('career.previous')}</span>
                    </button>

                    {/* Progress bar */}
                    <div className="flex items-center gap-1.5">
                        {career.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setSelectedIndex(i)}
                                animate={{
                                    width: i === selectedIndex ? 28 : 6,
                                    height: 6,
                                    background: i === selectedIndex
                                        ? 'linear-gradient(to right, #C9A961, #F5E6C8)'
                                        : 'rgba(201,169,97,0.15)',
                                    borderRadius: 20,
                                }}
                                whileHover={{ background: i === selectedIndex ? '#C9A961' : 'rgba(201,169,97,0.35)' }}
                                transition={{ duration: 0.35 }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setSelectedIndex(Math.min(career.length - 1, selectedIndex + 1))}
                        disabled={selectedIndex === career.length - 1}
                        className="flex items-center gap-3 group transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                        style={{ color: 'rgba(201,169,97,0.7)' }}
                        onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.color = '#C9A961')}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,169,97,0.7)'}
                    >
                        <span className="uppercase tracking-[0.2em] text-xs font-medium hidden md:inline">{t('career.next')}</span>
                        <motion.div
                            whileHover={{ x: 4 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                                border: '1px solid rgba(201,169,97,0.2)',
                                background: 'rgba(201,169,97,0.05)',
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.div>
                    </button>
                </motion.div>

                {/* ── Stats row with count-up ── */}
                <div ref={statsRef} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-5">
                    <StatCard value="19+" label={t('career.stats.years')} delay={0} inView={statsInView} />
                    <StatCard value="9" label={t('career.stats.establishments')} delay={0.12} inView={statsInView} />
                    <StatCard value="65+" label={t('career.stats.maxTeam')} delay={0.24} inView={statsInView} />
                    <StatCard value="3★" label={t('career.stats.michelin')} delay={0.36} inView={statsInView} />
                </div>
            </div>

            {/* Hide scrollbar CSS */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
};

export default Career;
