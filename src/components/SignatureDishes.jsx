import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const dish = {
    name: { en: "L'olive du Bled", fr: "L'olive du Bled" },
    nameAr: "زيتونة البلاد",
    category: { en: "Signature Creation", fr: "Création Signature" },
    tagline: { en: "Where Heritage Meets Haute Cuisine", fr: "Là où l'Héritage Rencontre la Haute Cuisine" },
    description: {
        en: "A masterpiece that captures the soul of Morocco glossy olive-shaped delicacies rest upon a bed of traditional Moroccan zellige patterns, shrouded in ethereal wisps of smoke. Each element tells a story of heritage, precision, and artistry.",
        fr: "Un chef-d'œuvre qui capture l'âme du Maroc des délices en forme d'olive reposent sur un lit de motifs zellige marocains traditionnels, enveloppés de volutes de fumée éthérées. Chaque élément raconte une histoire d'héritage, de précision et d'art.",
    },
    inspiration: {
        en: "Born from the olive groves of Morocco, this dish is a tribute to the land that shaped me. The zellige patterns beneath the smoke represent the mosaic of Moroccan culinary tradition intricate, vibrant, and timeless.",
        fr: "Née des oliveraies du Maroc, cette création est un hommage à la terre qui m'a façonné. Les motifs zellige sous la fumée représentent la mosaïque de la tradition culinaire marocaine complexe, vibrante et intemporelle.",
    },
    technique: {
        en: "72-hour olive preparation · hand-painted zellige plate · liquid nitrogen smoke presentation",
        fr: "Préparation de l'olive 72h · assiette zellige peinte à la main · présentation fumée à l'azote liquide"
    },
    ingredients: {
        en: ["Black olive essence", "Olive branch garnish", "Zellige artisan plate", "Liquid nitrogen", "Moroccan heritage spices", "Edible gold leaf"],
        fr: ["Essence d'olive noire", "Garniture branche d'olivier", "Assiette zellige artisanale", "Azote liquide", "Épices marocaines ancestrales", "Feuille d'or comestible"]
    },
    image: "/olive-du-bled.webp",
};

const SignatureDishes = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { language, t } = useLanguage();
    const lang = language === 'fr' ? 'fr' : 'en';

    return (
        <section id="dishes" className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
                    style={{ background: 'radial-gradient(circle, #C9A961, transparent 65%)', filter: 'blur(100px)', opacity: 0.07 }}
                />
            </div>

            <div className="container relative z-10 py-24 md:py-32 lg:py-40 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Stacked Oversized Header (Variant D) */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-24"
                >
                    {/* Pill badge label */}
                    <motion.span
                        className="inline-block text-[10px] uppercase tracking-[0.3em] font-semibold px-4 py-1.5 rounded-full mb-8"
                        style={{ color: '#C9A961', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        {t('dishes.label')}
                    </motion.span>

                    <h3 className="font-arabic text-[#C9A961] md:font-bold mb-4 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                        {t('dishes.titleArabic')}
                    
</h3>

                    {/* Centered gold rule */}
                    <motion.div
                        className="h-[1px] mx-auto"
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }}
                    />
                </motion.div>

                {/* Main dish showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Dish image left side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group cursor-pointer"
                        onClick={() => setModalOpen(true)}
                    >
                        {/* Outer glow ring */}
                        <motion.div
                            className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background: 'radial-gradient(circle, rgba(201,169,97,0.12) 0%, transparent 70%)',
                                filter: 'blur(30px)',
                            }}
                        />

                        {/* Image container */}
                        <div className="relative overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(201,169,97,0.15)' }}>
                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 z-20 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(to right, #C9A961, transparent)' }} />
                                <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: 'linear-gradient(to bottom, #C9A961, transparent)' }} />
                            </div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 z-20 pointer-events-none">
                                <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ background: 'linear-gradient(to left, #C9A961, transparent)' }} />
                                <div className="absolute bottom-0 right-0 h-full w-[1px]" style={{ background: 'linear-gradient(to top, #C9A961, transparent)' }} />
                            </div>

                            <motion.img
                                src={dish.image}
                                alt={dish.name[lang]}
                                loading="lazy"
                                decoding="async"
                                className="w-full aspect-square object-cover"
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            />

                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* View details prompt */}
                            <motion.div
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md z-20"
                                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,169,97,0.4)' }}
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ scale: 1.05 }}
                                animate={{ opacity: 0 }}
                                whileInView={{ opacity: 0 }}
                            >
                                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#C9A961' }}>
                                    {t('dishes.viewDetails')}
                                </span>
                            </motion.div>
                            <div
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md z-20 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,169,97,0.4)' }}
                            >
                                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#C9A961' }}>
                                    {t('dishes.viewDetails')}
                                </span>
                                <svg className="w-3.5 h-3.5" style={{ color: '#C9A961' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dish info right side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col"
                    >
                        {/* Category badge */}
                        <motion.span
                            className="inline-flex self-start text-[11px] uppercase tracking-[0.3em] font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm mb-6"
                            style={{ color: '#C9A961', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.25)' }}
                        >
                            {dish.category[lang]}
                        </motion.span>

                        {/* Arabic name */}
                        <p className="font-arabic text-xl mb-2" dir="rtl" style={{ color: 'rgba(201,169,97,0.6)' }}>
                            {dish.nameAr}
                        </p>

                        {/* Dish name */}
                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-2" style={{ fontFamily: 'serif' }}>
                            {dish.name[lang]}
                        </h3>

                        {/* Tagline */}
                        <p className="text-sm uppercase tracking-[0.25em] mb-8" style={{ color: '#C9A961' }}>
                            {dish.tagline[lang]}
                        </p>

                        {/* Decorative line */}
                        <motion.div
                            className="h-[1px] mb-8"
                            initial={{ width: 0 }}
                            whileInView={{ width: '40%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{ background: 'linear-gradient(to right, #C9A961, transparent)' }}
                        />

                        {/* Description */}
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8" style={{ maxWidth: 520 }}>
                            {dish.description[lang]}
                        </p>

                        {/* Ingredients */}
                        <div className="mb-8">
                            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: '#C9A961' }}>
                                {t('dishes.ingredients')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {dish.ingredients[lang].map((ing, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 + 0.3 }}
                                        className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
                                        style={{ background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)', color: 'rgba(201,169,97,0.85)' }}
                                    >
                                        {ing}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Technique */}
                        <div className="mb-10">
                            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold mb-2" style={{ color: '#C9A961' }}>
                                {t('dishes.technique')}
                            </h4>
                            <p className="text-gray-500 text-sm italic">{dish.technique[lang]}</p>
                        </div>

                        {/* CTA button */}
                        <motion.button
                            onClick={() => setModalOpen(true)}
                            className="self-start group/btn flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500"
                            style={{
                                background: 'linear-gradient(135deg, rgba(201,169,97,0.15), rgba(201,169,97,0.05))',
                                border: '1px solid rgba(201,169,97,0.3)',
                            }}
                            whileHover={{ scale: 1.03, borderColor: 'rgba(201,169,97,0.6)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-sm uppercase tracking-[0.2em] font-medium" style={{ color: '#C9A961' }}>
                                {t('dishes.viewDetails')}
                            </span>
                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" style={{ color: '#C9A961' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                    className="mt-20 h-[1px] mx-auto"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,97,0.3), transparent)', transformOrigin: 'center', maxWidth: 600 }}
                />
            </div>

            {/* Full detail modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setModalOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(16px)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            onClick={e => e.stopPropagation()}
                            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl"
                            style={{ background: '#0A0A0A', border: '1px solid rgba(201,169,97,0.2)' }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Modal image */}
                                <div className="relative overflow-hidden rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none">
                                    <img src={dish.image} alt={dish.name[lang]} loading="lazy" decoding="async" className="w-full h-full object-cover min-h-[400px]" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]/40 hidden md:block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:hidden" />
                                </div>

                                {/* Modal content */}
                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <button onClick={() => setModalOpen(false)}
                                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors hover:bg-white/10"
                                        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <span className="text-[11px] uppercase tracking-[0.3em] font-semibold px-3 py-1 rounded-full self-start mb-5"
                                        style={{ background: 'rgba(201,169,97,0.12)', color: '#C9A961', border: '1px solid rgba(201,169,97,0.3)' }}>
                                        {dish.category[lang]}
                                    </span>

                                    <p className="font-arabic text-lg mb-1" dir="rtl" style={{ color: 'rgba(201,169,97,0.7)' }}>{dish.nameAr}</p>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-1" style={{ fontFamily: 'serif' }}>{dish.name[lang]}</h2>
                                    <p className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: '#C9A961' }}>{dish.tagline[lang]}</p>

                                    <div className="h-[1px] mb-6" style={{ background: 'linear-gradient(to right, rgba(201,169,97,0.4), transparent)', width: '50%' }} />

                                    <p className="text-gray-300 leading-relaxed mb-8">{dish.description[lang]}</p>

                                    <div className="mb-6">
                                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: '#C9A961' }}>{t('dishes.inspiration')}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed italic">"{dish.inspiration[lang]}"</p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: '#C9A961' }}>{t('dishes.technique')}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{dish.technique[lang]}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: '#C9A961' }}>{t('dishes.ingredients')}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {dish.ingredients[lang].map((ing, i) => (
                                                <span key={i} className="text-xs px-4 py-2 rounded-full"
                                                    style={{ background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)', color: 'rgba(201,169,97,0.85)' }}>
                                                    {ing}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SignatureDishes;
