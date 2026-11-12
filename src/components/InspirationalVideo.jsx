import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const InspirationalVideo = () => {
    const { t } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle, #C9A961 0%, transparent 60%)', filter: 'blur(50px)' }}
                />
            </div>

            <div className="container relative z-10">
                {/* Stacked Oversized Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
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
                        {t('inspirationalVideo.label', 'Inspiration')}
                    </motion.span>

                    {/* Oversized title */}
                    <h3 className="font-arabic text-[#C9A961] md:font-bold mb-4 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">
                        {t('inspirationalVideo.titleArabic', 'رحلة سينمائية')}
                    </h3>

                    {/* Centered gold rule */}
                    <motion.div
                        className="h-[1px] mx-auto mb-6"
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }}
                    />

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('inspirationalVideo.description', 'Discover the passion, dedication, and artistry that define the culinary world of Chef Aissam Ait Ouakrim.')}
                    </p>
                </motion.div>

                {/* Video Container with Lazy Load Facade */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto relative group"
                >
                    {/* Glassmorphism Frame / Border */}
                    <div className="absolute -inset-4 md:-inset-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm -z-10 transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-[#C9A961]/20" />
                    
                    {/* Video Player / Lightweight Facade */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-[#C9A961]/40 transition-colors duration-500 bg-black">
                        {isPlaying ? (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube-nocookie.com/embed/5Pmz3Ac_0ok?autoplay=1&rel=0&showinfo=0&iv_load_policy=3&color=white"
                                title="Chef Aissam Culinary Art"
                                frameBorder="0"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <div 
                                onClick={() => setIsPlaying(true)}
                                className="relative w-full h-full cursor-pointer flex items-center justify-center group/play overflow-hidden"
                            >
                                <img
                                    src="https://img.youtube.com/vi/5Pmz3Ac_0ok/maxresdefault.jpg"
                                    alt="Chef Aissam Video Preview"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/play:scale-105 opacity-80"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover/play:bg-black/20 transition-colors duration-300" />
                                
                                {/* Custom Luxury Gold Play Button */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-black/70 border border-[#C9A961] shadow-[0_0_30px_rgba(201,169,97,0.3)] backdrop-blur-md group-hover/play:shadow-[0_0_50px_rgba(201,169,97,0.6)] group-hover/play:border-[#C9A961] transition-all"
                                >
                                    <FaPlay className="text-[#C9A961] text-2xl md:text-3xl ml-1 group-hover/play:text-white transition-colors" />
                                </motion.div>
                            </div>
                        )}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#C9A961] opacity-50 pointer-events-none" />
                    <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#C9A961] opacity-50 pointer-events-none" />
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#C9A961] opacity-50 pointer-events-none" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#C9A961] opacity-50 pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
};

export default InspirationalVideo;
