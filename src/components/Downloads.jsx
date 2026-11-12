import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf, FaImage, FaFileArchive } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const downloads = [
    {
        id: 1,
        title: "Signature Recipe Collection",
        description: "Exclusive recipes from Chef Aissam's signature Moroccan-French fusion dishes",
        icon: FaFilePdf,
        fileSize: "3.8 MB",
        format: "PDF",
        link: "#"
    },
];

const Downloads = () => {
    const { t } = useLanguage();
    return (
        <section className="py-14 bg-[#0A0A0A]">
            <div className="container">
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
                                {t('downloads.label', 'Resources')}
                            </span>
                            <div className="flex items-center gap-6">
                                <h3 className="font-arabic text-[#C9A961] md:whitespace-nowrap text-6xl md:text-7xl lg:text-8xl font-bold" dir="rtl">
  {t('downloads.titleArabic')}
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
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs md:text-right">
                            {t('downloads.description')}
                        </p>
                    </div>
                </motion.div>

                <div className="max-w-xl mx-auto">
                    {downloads.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.a
                                key={item.id}
                                href={item.link}
                                download
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="group bg-[#111111] border border-white/10 hover:border-[#C9A961]/50 p-6 transition-all duration-300 block"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#C9A961]/10 group-hover:bg-[#C9A961] text-[#C9A961] group-hover:text-white rounded-sm flex items-center justify-center transition-all duration-300">
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-display text-lg mb-2 group-hover:text-[#C9A961] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-3">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-600">
                                            <span className="bg-white/5 px-2 py-1">{item.format}</span>
                                            <span>{item.fileSize}</span>
                                        </div>
                                    </div>
                                    <div className="text-[#C9A961] group-hover:translate-x-1 transition-transform">
                                        <FaDownload size={20} />
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Downloads;
