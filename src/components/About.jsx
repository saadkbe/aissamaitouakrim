import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import chefPortrait from '../assets/chef_portrait_enhanced.webp';
import chefPhoto1 from '../assets/chef_photo_1.webp';
import chefPhoto2 from '../assets/chef_photo_2.webp';
import chefPhoto3 from '../assets/chef_photo_3.webp';
import chefPhoto4 from '../assets/chef_photo_4.webp';

const stats = [
    { number: "25+", labelKey: "about.stats.years" },
    { number: "65", labelKey: "about.stats.chefs" },
    { number: "5+", labelKey: "about.stats.openings" },
    { number: "20+", labelKey: "about.stats.awards" }
];

const galleryImages = [
    { src: chefPortrait, alt: "Chef Aissam Portrait" },
    { src: chefPhoto1, alt: "Chef Aissam Outdoor" },
    { src: chefPhoto2, alt: "Chef Aissam with Award" },
    { src: chefPhoto3, alt: "Chef Aissam at Beach" },
    { src: chefPhoto4, alt: "Chef Aissam Professional" }
];

/* ── Circular Rotating Stamp SVG Component ── */
const RotatingStamp = () => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C9A961]/20 shadow-2xl"
    >
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-[#C9A961] opacity-90 fill-current">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text>
                <textPath href="#circlePath" startOffset="0%" className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'serif' }}>
                    &bull; 25 Years of Excellence &bull; Master Chef
                </textPath>
            </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#C9A961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        </div>
    </motion.div>
);

const About = () => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <section id="parcours" className="py-24 md:py-36 bg-[#0A0A0A] relative overflow-hidden">
            {/* ── Ambient Background Glows ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gold Glow Top Left */}
                <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#C9A961]/5 rounded-full blur-[100px]" />
                {/* Red/Crimson Glow matching Moroccan Flag Center Right */}
                <div className="absolute top-[30%] -right-[15%] w-[800px] h-[800px] bg-[#dc2743]/5 rounded-full blur-[150px]" />
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── Stacked Oversized Header (Variant D) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-20 md:mb-32"
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
                        {t('about.label')}
                    </motion.span>

                    {/* Oversized title */}
                    <h3 className="font-arabic text-[#C9A961] md:font-bold mb-6 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                        {t('about.titleArabic')}
                    
</h3>
                </motion.div>


                {/* ── Main Layout: Cinematic Split ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

                    {/* Left Column: Image Gallery (Takes up 5 cols) */}
                    <div className="lg:col-span-5 relative order-2 lg:order-1">

                        {/* Main Featured Image Wrapper */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl p-2 md:p-3 mb-6"
                            style={{
                                background: 'linear-gradient(145deg, rgba(201,169,97,0.1), rgba(0,0,0,0.4))',
                                border: '1px solid rgba(201,169,97,0.15)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            {/* Inner Image Mask */}
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] w-full bg-[#0A0A0A]">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImage}
                                        src={galleryImages[selectedImage].src}
                                        alt={galleryImages[selectedImage].alt}
                                        loading="lazy"
                                        decoding="async"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                {/* Permanent vignette overlay inside image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Floating Rotating Stamp (Absolute positioned, breaks out of the box) */}
                            <div className="absolute -bottom-10 -right-6 md:-right-10 z-20 hidden sm:block">
                                <RotatingStamp />
                            </div>
                        </motion.div>

                        {/* Thumbnail Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex justify-center md:justify-start gap-3 sm:gap-4 overflow-x-auto pb-4 hide-scrollbar"
                        >
                            {galleryImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 group
                                        ${selectedImage === index ? 'ring-2 ring-[#C9A961] ring-offset-2 ring-offset-[#0A0A0A]' : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'}
                                    `}
                                >
                                    <img src={image.src} alt="Thumbnail view" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 bg-[#C9A961]/20 transition-opacity duration-300 ${selectedImage === index ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
                                </button>
                            ))}
                        </motion.div>
                    </div>


                    {/* Right Column: Bio Content & Stats (Takes up 7 cols, offset by 1 on large screens) */}
                    <div className="lg:col-span-6 lg:col-start-7 text-white order-1 lg:order-2 flex flex-col justify-center">

                        {/* Glassmorphic Text Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative p-8 md:p-12 rounded-3xl mb-12"
                            style={{
                                background: 'linear-gradient(145deg, rgba(20,20,20,0.6), rgba(10,10,10,0.8))',
                                border: '1px solid rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(30px)',
                            }}
                        >
                            {/* Decorative Top Left Corner Accent */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#C9A961]/40 rounded-tl-3xl opacity-50 pointer-events-none" />

                            <div className="space-y-6 lg:space-y-8 relative z-10">
                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                                    <span className="text-5xl md:text-6xl text-[#C9A961] font-display float-left mr-4 mt-2 leading-none">R</span>
                                    {t('about.description1').slice(1)}
                                </p>
                                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                    {t('about.description2')}
                                </p>
                                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                    {t('about.description3')}
                                </p>
                            </div>

                            {/* Stylized Chef Signature equivalent */}
                            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="font-display text-[#C9A961] text-3xl opacity-80" style={{ fontFamily: 'var(--font-arabic)' }}>
                                    عصام أيت وكريم
                                </span>
                                <div className="text-right">
                                    <span className="block text-white font-bold tracking-widest text-sm uppercase">Aissam Ait Ouakrim</span>
                                    <span className="text-[#C9A961] text-xs uppercase tracking-[0.2em]">Chef</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Premium Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4 md:gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="group relative p-6 md:p-8 rounded-2xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C9A961]/30 transition-all duration-500 hover:-translate-y-1"
                                >
                                    {/* Hover Glow Background */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: 'radial-gradient(circle at top right, rgba(201,169,97,0.1), transparent 70%)' }} />

                                    <span className="block text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-[#C9A961] transition-colors duration-500" style={{ fontFamily: 'serif' }}>
                                        {stat.number}
                                    </span>
                                    <div className="w-8 h-[1px] bg-[#C9A961]/30 mb-3 group-hover:w-12 group-hover:bg-[#C9A961] transition-all duration-500" />
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                                        {t(stat.labelKey)}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* ── Global Styles for this section only ── */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default About;
