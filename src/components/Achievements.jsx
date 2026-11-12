import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const awardsData = [
    {
        title: "Champion d'Afrique",
        org: "Bocuse d'Or Africa",
        year: "2018",
        category: { en: "Competition", fr: "Compétition" },
        description: {
            en: "African Champion representing Morocco with culinary excellence on the continental stage",
            fr: "Champion d'Afrique représentant le Maroc avec excellence culinaire sur la scène continentale",
        },
        rank: "1st",
        accentColor: "#C9A961",
        glowColor: "rgba(201,169,97,0.35)",
    },
    {
        title: "Finaliste Monde",
        org: "Bocuse d'Or Lyon",
        year: "2019",
        category: { en: "Competition", fr: "Compétition" },
        description: {
            en: "World Finalist ranking 21st globally among the world's best chefs",
            fr: "Finaliste Mondial classé 21ème parmi les meilleurs chefs du monde",
        },
        rank: "21st",
        accentColor: "#C9A961",
        glowColor: "rgba(201,169,97,0.3)",
    },
    {
        title: "Grand Chef de Demain",
        org: "Gault & Millau",
        year: "2017",
        category: { en: "Recognition", fr: "Reconnaissance" },
        description: {
            en: "Recognized as a Grand Chef of Tomorrow by the renowned Gault & Millau guide",
            fr: "Reconnu comme Grand Chef de Demain par le prestigieux guide Gault & Millau",
        },
        rank: "Future",
        accentColor: "#C9A961",
        glowColor: "rgba(201,169,97,0.3)",
    },
    {
        title: "Prix Authenticité",
        org: "La Liste",
        year: "2024",
        category: { en: "Recognition", fr: "Reconnaissance" },
        description: {
            en: "Awarded for Authenticity & Craftsmanship in preserving culinary heritage",
            fr: "Récompensé pour l'Authenticité & l'Artisanat dans la préservation du patrimoine culinaire",
        },
        rank: "Gold",
        accentColor: "#C9A961",
        glowColor: "rgba(201,169,97,0.3)",
    },
    {
        title: "Médaille d'Or",
        org: "La Toque d'Or Paris",
        year: "2016",
        category: { en: "Competition", fr: "Compétition" },
        description: {
            en: "Gold Medal at the prestigious La Toque d'Or Paris international competition",
            fr: "Médaille d'Or à la prestigieuse compétition internationale La Toque d'Or Paris",
        },
        rank: "Gold",
        accentColor: "#C9A961",
        glowColor: "rgba(201,169,97,0.3)",
    },
    {
        title: "Chef",
        org: "Conrad Rabat Arzana",
        year: "2022–2024",
        category: { en: "Leadership", fr: "Leadership" },
        description: {
            en: "Led culinary operations at 5-star luxury hotel commanding 65+ chefs",
            fr: "Dirige les opérations culinaires d'un hôtel de luxe 5 étoiles avec 65+ chefs",
        },
        rank: "5★",
        accentColor: "#C9A961",
        glowColor: "rgba(201,169,97,0.3)",
    },
];

/* 3-D tilt card hook */
function useTilt() {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return { ref, rotateX, rotateY, handleMove, handleLeave };
}

function AwardCard({ award, index }) {
    const [hovered, setHovered] = useState(false);
    const { ref, rotateX, rotateY, handleMove, handleLeave } = useTilt();
    const { language } = useLanguage();
    const lang = language === 'fr' ? 'fr' : 'en';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { handleLeave(); setHovered(false); }}
            className="relative"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative h-full"
            >
                {/* Glow behind card */}
                <motion.div
                    className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: `radial-gradient(ellipse at 50% 60%, ${award.glowColor}, transparent 70%)` }}
                />

                {/* Card body */}
                <div className="relative rounded-2xl overflow-hidden h-full"
                    style={{
                        background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 100%)',
                        border: '1px solid rgba(201,169,97,0.15)',
                    }}
                >
                    {/* Animated shimmer border on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(201,169,97,0.5) 0%, transparent 40%, transparent 60%, rgba(201,169,97,0.3) 100%)',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor',
                            padding: '1px',
                            borderRadius: '1rem',
                        }}
                    />

                    {/* Spotlight sweep on hover */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        animate={{ opacity: hovered ? 1 : 0, x: hovered ? '100%' : '-100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{
                            background: 'linear-gradient(105deg, transparent 30%, rgba(201,169,97,0.08) 50%, transparent 70%)',
                        }}
                    />

                    {/* Top section with icon + index */}
                    <div className="relative p-8 pb-4">
                        {/* Index number watermark */}
                        <span className="absolute top-4 right-6 text-7xl font-black text-white/[0.03] select-none pointer-events-none leading-none"
                            style={{ fontFamily: 'serif' }}>
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Category pill */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 rounded-full"
                                style={{
                                    color: '#C9A961',
                                    background: 'rgba(201,169,97,0.1)',
                                    border: '1px solid rgba(201,169,97,0.2)',
                                }}>
                                {award.category[lang]}
                            </span>
                            <motion.div
                                className="h-[1px] flex-1"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                style={{ background: 'linear-gradient(to right, rgba(201,169,97,0.4), transparent)', transformOrigin: 'left' }}
                            />
                        </div>

                        {/* Decorative mark */}
                        <motion.div
                            className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-lg"
                            animate={{ scale: hovered ? 1.1 : 1 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(201,169,97,0.18), rgba(201,169,97,0.04))',
                                border: '1px solid rgba(201,169,97,0.25)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#C9A961" fillOpacity="0.9" />
                            </svg>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            className="text-2xl font-black text-white mb-1 leading-tight"
                            animate={{ color: hovered ? '#C9A961' : '#ffffff' }}
                            transition={{ duration: 0.3 }}
                            style={{ fontFamily: 'serif' }}
                        >
                            {award.title}
                        </motion.h3>

                        {/* Org */}
                        <p className="text-sm font-medium tracking-wide mb-4" style={{ color: 'rgba(201,169,97,0.7)' }}>
                            {award.org}
                        </p>

                        {/* Description always visible, subtle */}
                        <p className="text-sm leading-relaxed text-gray-500">
                            {award.description[lang]}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="mx-8 h-[1px]" style={{ background: 'linear-gradient(to right, rgba(201,169,97,0.3), transparent)' }} />

                    {/* Footer */}
                    <div className="flex items-center justify-between px-8 py-5">
                        <div className="flex items-center gap-3">
                            {/* Animated dot */}
                            <motion.div
                                className="w-2 h-2 rounded-full"
                                animate={{ scale: hovered ? [1, 1.5, 1] : 1, opacity: hovered ? 1 : 0.5 }}
                                transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
                                style={{ background: '#C9A961' }}
                            />
                            <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
                                {award.year}
                            </span>
                        </div>
                        <motion.span
                            className="text-xs font-black tracking-widest px-3 py-1 rounded-full"
                            animate={{
                                background: hovered
                                    ? 'linear-gradient(135deg, #C9A961, #F5E6C8)'
                                    : 'rgba(201,169,97,0.08)',
                                color: hovered ? '#000000' : '#C9A961',
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ border: '1px solid rgba(201,169,97,0.3)' }}
                        >
                            {award.rank}
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const Achievements = () => {
    const { t } = useLanguage();

    return (
        <section id="achievements" className="section-padding bg-[#0A0A0A] relative overflow-hidden">
            {/* Ambient background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle, #C9A961 0%, transparent 70%)', filter: 'blur(100px)' }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                    style={{ background: 'radial-gradient(circle, #C9A961 0%, transparent 70%)', filter: 'blur(80px)' }}
                />

            </div>

            <div className="container relative z-10">
                {/* Split Dramatic Header (Variant C) */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end">
                        {/* Left side: label + title + Arabic */}
                        <div className="md:col-span-8 relative">
                            {/* Large watermark number */}
                            <span className="absolute -top-8 -left-2 text-[140px] md:text-[200px] font-black leading-none select-none pointer-events-none"
                                style={{ fontFamily: 'serif', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,97,0.05)' }}>
                                02
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
                                {t('achievements.label')}
                            </motion.span>

                            <h3 className="font-arabic text-[#C9A961] md:font-bold mt-3 relative z-10 text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                                {t('achievements.titleArabic')}
                            
</h3>
                        </div>

                        {/* Right side: description + vertical accent */}
                        <div className="md:col-span-4 relative pl-6 md:pl-8">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px]"
                                style={{ background: 'linear-gradient(to bottom, #C9A961, rgba(201,169,97,0.1))' }} />
                            <p className="text-gray-400 text-base leading-relaxed">
                                {t('achievements.description')}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {awardsData.map((award, index) => (
                        <AwardCard key={index} award={award} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
