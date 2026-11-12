import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

/* ── Data ── */
const certifications = [
    {
        title: "Institut Lenôtre",
        desc: "Advanced Pastry & Baking",
        year: "2010",
        location: "Paris, France",
        category: "Pastry Arts",
    },
    {
        title: "Michelin Training",
        desc: "Frédéric Anton (3★ Michelin)",
        year: "2011",
        location: "Paris, France",
        category: "Michelin",
    },
    {
        title: "Institut Paul Bocuse",
        desc: "Culinary Arts & Management",
        year: "2012",
        location: "Lyon, France",
        category: "Culinary Excellence",
    },
    {
        title: "Michelin Training",
        desc: "Jean-Baptiste Natali (1★ Michelin)",
        year: "2013",
        location: "France",
        category: "Michelin",
    },
    {
        title: "Master Management",
        desc: "Européen en Stratégie",
        year: "2014",
        location: "Morocco",
        category: "Business",
    },
    {
        title: "HACCP Certification",
        desc: "Food Safety & Hygiene",
        year: "2015",
        location: "International",
        category: "Food Safety",
    },
];

/* ── Timeline Entry ── */
function TimelineEntry({ cert, index, isLast }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
        >
            {/* Connector line top */}
            {index > 0 && (
                <div className="w-[1px] h-10 md:h-14" style={{ background: 'linear-gradient(to bottom, rgba(201,169,97,0.15), rgba(201,169,97,0.4))' }} />
            )}

            {/* Year node */}
            <motion.div
                className="relative z-10 flex items-center justify-center mb-5"
                whileInView={{ scale: [0.6, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 + 0.2 }}
            >
                <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xs md:text-sm font-bold tracking-wider"
                    style={{
                        background: 'linear-gradient(135deg, rgba(201,169,97,0.15), rgba(201,169,97,0.05))',
                        border: '2px solid rgba(201,169,97,0.4)',
                        color: '#C9A961',
                        boxShadow: '0 0 24px rgba(201,169,97,0.12)',
                    }}
                >
                    {cert.year}
                </div>
            </motion.div>

            {/* Content */}
            <div className="text-center max-w-lg mx-auto px-4 mb-6 group">
                <span
                    className="inline-block text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full mb-4"
                    style={{ color: '#C9A961', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}
                >
                    {cert.category}
                </span>

                <h3 className="text-xl md:text-3xl font-display text-white mb-2 leading-tight group-hover:text-[#C9A961] transition-colors duration-300">
                    {cert.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{cert.desc}</p>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 uppercase tracking-widest">
                    <svg className="w-3 h-3 text-[#C9A961]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{cert.location}</span>
                </div>

                <div className="h-[1px] mx-auto mt-5" style={{ width: 50, background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }} />
            </div>
        </motion.div>
    );
}
const Training = () => {
    const { t } = useLanguage();

    return (
        <section id="training" className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.04) 0%, transparent 70%)' }} />

            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20 md:mb-28"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-10 bg-[#C9A961]" />
                        <span className="text-[#C9A961] text-xs uppercase tracking-[0.3em] font-semibold">
                            {t('training.label')}
                        </span>
                        <div className="h-[1px] w-10 bg-[#C9A961]" />
                    </div>

                    <h3 className="font-arabic text-[#C9A961] md:font-bold mb-6 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                        {t('training.titleArabic')}
                    
</h3>

                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                        {t('training.description')}
                    </p>
                </motion.div>

                {/* ── Timeline ── */}
                <div className="relative">
                    {certifications.map((cert, index) => (
                        <TimelineEntry
                            key={index}
                            cert={cert}
                            index={index}
                            isLast={index === certifications.length - 1}
                        />
                    ))}
                </div>

                {/* ── Bottom Summary Stats ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {[
                        { number: "6", labelKey: "training.stats.certifications" },
                        { number: "3", labelKey: "training.stats.michelinStars" },
                        { number: "4", labelKey: "training.stats.countries" },
                        { number: "15+", labelKey: "training.stats.yearsTraining" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -3, borderColor: 'rgba(201,169,97,0.3)' }}
                            className="text-center p-8 rounded-2xl transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <div className="text-4xl md:text-5xl font-black mb-2 text-white" style={{ fontFamily: 'serif' }}>
                                {stat.number}
                            </div>
                            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C9A961] font-semibold">
                                {t(stat.labelKey)}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Training;
