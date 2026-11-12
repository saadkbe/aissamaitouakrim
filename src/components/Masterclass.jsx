import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import heroImg from '../assets/masterclass_cover_new_4k_1772493504408.webp';

const COURSE_URL = 'https://mentorclassacademy.com/mentor/10';

const MODULES = [
    { num: '01', title: { en: 'Moroccan Heritage', fr: 'Héritage Marocain' }, desc: { en: 'Discover the depth of Moroccan culinary traditions and spice mastery.', fr: 'Découvrez la profondeur des traditions culinaires marocaines et la maîtrise des épices.' } },
    { num: '02', title: { en: 'French Precision', fr: 'Précision Française' }, desc: { en: 'Master French techniques that elevate every dish to fine-dining excellence.', fr: 'Maîtrisez les techniques françaises qui élèvent chaque plat.' } },
    { num: '03', title: { en: 'Fusion Innovation', fr: 'Innovation Fusion' }, desc: { en: 'Learn to blend traditions with modern creativity and innovative plating.', fr: 'Apprenez à fusionner les traditions avec une créativité moderne.' } },
    { num: '04', title: { en: 'Signature Recipes', fr: 'Recettes Signature' }, desc: { en: 'Step-by-step guides to Chef Aissam\'s award-winning signature dishes.', fr: 'Guides étape par étape des plats signatures primés du Chef Aissam.' } },
];

const FEATURES = [
    { icon: '🎬', label: { en: 'HD Video Lessons', fr: 'Cours Vidéo HD' } },
    { icon: '📖', label: { en: 'Exclusive Recipes', fr: 'Recettes Exclusives' } },
    { icon: '🏆', label: { en: 'Pro Techniques', fr: 'Techniques Pro' } },
    { icon: '🌍', label: { en: 'Anytime, Anywhere', fr: 'Partout, À Tout Moment' } },
];

const Masterclass = () => {
    const { language } = useLanguage();
    const lang = language === 'fr' ? 'fr' : 'en';
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '10%']);

    return (
        <section ref={containerRef} className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(201,169,97,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(120,80,200,0.04), transparent 70%)', filter: 'blur(60px)' }} />
            </div>

            <div className="container relative z-10">

                {/* ────── SECTION HEADER ────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-10 bg-[#C9A961]" />
                        <span className="text-[#C9A961] text-xs uppercase tracking-[0.3em] font-semibold">
                            {lang === 'fr' ? 'Formation' : 'Education'}
                        </span>
                        <div className="h-[1px] w-10 bg-[#C9A961]" />
                    </div>

                    <h3 className="font-arabic text-[#C9A961] sm:md:text-white leading-tight md:leading-none mb-4 text-6xl md:text-7xl lg:text-8xl font-bold" dir="rtl">
  
                        MentorClass{' '}
                        <span className="italic text-[#C9A961]">Academy</span>
                    
</h3>
                </motion.div>

                {/* ────── HERO BANNER ────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden mb-20"
                    style={{ border: '1px solid rgba(201,169,97,0.15)' }}
                >
                    {/* Image with parallax */}
                    <div className="relative h-[520px] sm:h-[480px] md:h-[520px] overflow-hidden">
                        <motion.img
                            src={heroImg}
                            alt="Masterclass The Taste of Good Things"
                            className="w-full h-full object-cover"
                            style={{ y: imgY, scale: 1.05 }}
                        />
                        {/* Gradient overlays */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0A0A 5%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.4) 100%)' }} />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, transparent 70%)' }} />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-14">


                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 max-w-2xl"
                            style={{ fontFamily: 'serif', lineHeight: 1.1 }}
                        >
                            {lang === 'fr' ? 'Le Goût des' : 'The Taste of'}{' '}
                            <span className="text-[#C9A961]">{lang === 'fr' ? 'Bonnes Choses' : 'Good Things'}</span>
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                            className="text-gray-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
                        >
                            {lang === 'fr'
                                ? 'Dans cette MentorClass, le Chef Aissam partage son parcours unique et ses recettes innovantes. Apprenez à combiner les traditions marocaines et françaises avec modernité.'
                                : 'In this MentorClass, award-winning Chef Aissam shares his unique journey and innovative recipes. Learn to combine Moroccan-French traditions with modernity using simple and creative techniques.'}
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.a
                                href={COURSE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(201,169,97,0.35)' }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black rounded-full"
                                style={{ background: 'linear-gradient(135deg, #C9A961 0%, #E5D5A8 50%, #C9A961 100%)', backgroundSize: '200% 200%' }}
                            >
                                {lang === 'fr' ? 'S\'inscrire Maintenant' : 'Enroll Now'}
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="https://mentorclassacademy.com/mentorclass/10"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.04, borderColor: 'rgba(201,169,97,0.6)' }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white rounded-full"
                                style={{ border: '1px solid rgba(201,169,97,0.3)', background: 'rgba(201,169,97,0.06)', backdropFilter: 'blur(10px)' }}
                            >
                                {lang === 'fr' ? 'Voir les Détails' : 'View Details'}
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ────── FEATURES ROW ────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                >
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4, borderColor: 'rgba(201,169,97,0.3)' }}
                            className="text-center p-6 rounded-2xl transition-all"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
                        >
                            <div className="text-3xl mb-3">{f.icon}</div>
                            <p className="text-sm font-semibold text-white tracking-wide">{f.label[lang]}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ────── MODULES ────── */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-4 mb-5">
                            <div className="w-10 h-[1px] bg-[#C9A961]" />
                            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A961] font-semibold">
                                {lang === 'fr' ? 'Programme' : 'Curriculum'}
                            </span>
                            <div className="w-10 h-[1px] bg-[#C9A961]" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'serif' }}>
                            {lang === 'fr' ? 'Ce Que Vous Apprendrez' : 'What You\'ll Learn'}
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                        {MODULES.map((mod, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -3, borderColor: 'rgba(201,169,97,0.3)' }}
                                className="group p-7 rounded-2xl transition-all cursor-default"
                                style={{ background: 'rgba(201,169,97,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                <div className="flex items-start gap-5">
                                    <span className="text-3xl font-black group-hover:text-[#C9A961] transition-colors"
                                        style={{ color: 'rgba(201,169,97,0.2)', fontFamily: 'serif' }}>
                                        {mod.num}
                                    </span>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#C9A961] transition-colors">
                                            {mod.title[lang]}
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{mod.desc[lang]}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ────── BOTTOM CTA ────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                >
                    <motion.a
                        href={COURSE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(201,169,97,0.3)' }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-black rounded-full"
                        style={{ background: 'linear-gradient(135deg, #C9A961 0%, #E5D5A8 50%, #C9A961 100%)' }}
                    >
                        {lang === 'fr' ? 'Commencer Votre MentorClass' : 'Start Your MentorClass'}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                    </motion.a>
                    <p className="text-gray-600 text-xs mt-4 tracking-wide uppercase">
                        {lang === 'fr' ? 'Powered by MentorClass Academy' : 'Powered by MentorClass Academy'}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Masterclass;
