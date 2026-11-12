import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaNewspaper, FaTv, FaGlobe, FaMicrophone } from 'react-icons/fa';

const pressItems = [
    {
        id: 1,
        type: "Print",
        publication: "Le Monde",
        title: { en: "Rising Star of Moroccan Gastronomy", fr: "Étoile Montante de la Gastronomie Marocaine" },
        excerpt: { en: "Chef Aissam Ait Ouakrim brings a fresh perspective to traditional Moroccan cuisine, blending heritage with innovation...", fr: "Le Chef Aissam Ait Ouakrim apporte un regard nouveau sur la cuisine marocaine traditionnelle, alliant héritage et innovation..." },
        date: "2024-03-15",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 2,
        type: "TV",
        publication: "France 24",
        title: { en: "Bocuse d'Or Journey: From Morocco to Lyon", fr: "Aventure Bocuse d'Or : Du Maroc à Lyon" },
        excerpt: { en: "An exclusive interview with Chef Aissam about his experience competing at the world's most prestigious culinary competition...", fr: "Une interview exclusive avec le Chef Aissam sur son expérience lors du concours culinaire le plus prestigieux au monde..." },
        date: "2024-02-20",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 3,
        type: "Online",
        publication: "Eater",
        title: { en: "10 Chefs Redefining North African Cuisine", fr: "10 Chefs qui Redéfinissent la Cuisine Nord-Africaine" },
        excerpt: { en: "Featured among the top chefs bringing Moroccan flavors to the global stage with modern techniques...", fr: "Parmi les meilleurs chefs qui font rayonner les saveurs marocaines sur la scène mondiale avec des techniques modernes..." },
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 4,
        type: "Print",
        publication: "Gault & Millau",
        title: { en: "Grand Chef de Demain 2017", fr: "Grand Chef de Demain 2017" },
        excerpt: { en: "Recognized as one of the most promising young chefs, showcasing exceptional talent and creativity...", fr: "Reconnu comme l'un des jeunes chefs les plus prometteurs, faisant preuve d'un talent et d'une créativité exceptionnels..." },
        date: "2023-11-25",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 5,
        type: "TV",
        publication: "2M Maroc",
        title: { en: "Culinary Excellence at Conrad Rabat", fr: "Excellence Culinaire au Conrad Rabat" },
        excerpt: { en: "Behind the scenes at one of Morocco's most prestigious hotels with Chef Aissam Ait Ouakrim...", fr: "Dans les coulisses de l'un des hôtels les plus prestigieux du Maroc avec l'Chef Aissam Ait Ouakrim..." },
        date: "2023-10-15",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 6,
        type: "Online",
        publication: "Fine Dining Lovers",
        title: { en: "The Art of Moroccan Pastilla", fr: "L'Art de la Pastilla Marocaine" },
        excerpt: { en: "A deep dive into the traditional dish that won hearts at Bocuse d'Or Africa...", fr: "Une immersion dans le plat traditionnel qui a conquis les cœurs au Bocuse d'Or Afrique..." },
        date: "2023-09-05",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 7,
        type: "Print",
        publication: "La Liste",
        title: { en: "Prix Authenticité 2024 Winner", fr: "Lauréat du Prix Authenticité 2024" },
        excerpt: { en: "Awarded for exceptional dedication to preserving culinary heritage while pushing boundaries...", fr: "Primé pour son dévouement exceptionnel à la préservation du patrimoine culinaire tout en repoussant les limites..." },
        date: "2023-08-20",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
        link: "#",
    },
    {
        id: 8,
        type: "Radio",
        publication: "France Inter",
        title: { en: "Moroccan Flavors in Fine Dining", fr: "Saveurs Marocaines en Gastronomie" },
        excerpt: { en: "Radio interview discussing the evolution of Moroccan cuisine in luxury hospitality...", fr: "Interview radio sur l'évolution de la cuisine marocaine dans l'hôtellerie de luxe..." },
        date: "2023-07-10",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop",
        link: "#",
    }
];

const PressMedia = () => {
    const { language, t } = useLanguage();
    const lang = language === 'fr' ? 'fr' : 'en';

    const mediaTypes = [
        { key: "all", name: t('press.categories.all'), icon: FaGlobe, filter: "All" },
        { key: "print", name: t('press.categories.print'), icon: FaNewspaper, filter: "Print" },
        { key: "tv", name: t('press.categories.tv'), icon: FaTv, filter: "TV" },
        { key: "online", name: t('press.categories.online'), icon: FaGlobe, filter: "Online" },
        { key: "radio", name: t('press.categories.radio'), icon: FaMicrophone, filter: "Radio" },
    ];

    const [selectedType, setSelectedType] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredItems = selectedType === "All"
        ? pressItems
        : pressItems.filter(item => item.type === selectedType);

    return (
        <section className="section-padding bg-[#0A0A0A] relative overflow-hidden">

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <motion.div className="w-12 h-[1px] bg-[#C9A961]" initial={{ width: 0 }} whileInView={{ width: 48 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} />
                        <span className="text-[#C9A961] text-xs uppercase tracking-[0.2em] font-medium">{t('press.label')}</span>
                        <motion.div className="w-12 h-[1px] bg-[#C9A961]" initial={{ width: 0 }} whileInView={{ width: 48 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} />
                    </div>
                    <h3 className="font-arabic text-[#C9A961] md:font-bold mb-6 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                        {t('press.titleArabic')}
                    
</h3>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        {t('press.description')}
                    </p>
                </motion.div>

                {/* Media Type Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {mediaTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <motion.button
                                key={type.key}
                                onClick={() => setSelectedType(type.filter)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${selectedType === type.filter
                                    ? 'bg-[#C9A961] text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {type.name}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Press Items Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.article
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group relative bg-[#111111] border border-white/10 hover:border-[#C9A961]/50 transition-all duration-500 overflow-hidden cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img src={item.image} alt={item.title[lang]}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 bg-[#C9A961] text-black px-3 py-1 text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
                                        {item.type === "Print" && <FaNewspaper />}
                                        {item.type === "TV" && <FaTv />}
                                        {item.type === "Online" && <FaGlobe />}
                                        {item.type === "Radio" && <FaMicrophone />}
                                        {item.type}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[#C9A961] text-sm font-semibold uppercase tracking-wide">{item.publication}</span>
                                        <span className="text-gray-600 text-xs">
                                            {new Date(item.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-display text-white mb-3 group-hover:text-[#C9A961] transition-colors line-clamp-2">
                                        {item.title[lang]}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                                        {item.excerpt[lang]}
                                    </p>
                                    <div className="flex items-center gap-2 text-[#C9A961] text-xs uppercase tracking-wider font-semibold">
                                        <span>{t('press.readArticle')}</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C9A961]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
                    <p className="text-gray-400 mb-6">
                        {lang === 'fr' ? 'Pour les demandes presse et les kits médias' : 'For press inquiries and media kits'}
                    </p>
                    <a href="#contact" className="inline-block bg-[#C9A961] text-black px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-[#B8935A] transition-colors">
                        {lang === 'fr' ? 'Contacter les Relations Médias' : 'Contact Media Relations'}
                    </a>
                </motion.div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#111111] border border-[#C9A961]/30 max-w-3xl w-full"
                        >
                            <div className="relative h-80">
                                <img src={selectedItem.image} alt={selectedItem.title[lang]} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                                <button onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-[#C9A961] text-black px-4 py-1 text-xs uppercase tracking-wider font-semibold">{selectedItem.type}</span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(selectedItem.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <h3 className="text-[#C9A961] text-lg font-semibold mb-2">{selectedItem.publication}</h3>
                                <h3 className="md:font-arabic text-[#C9A961] text-white mb-6 text-6xl md:text-7xl lg:text-8xl font-bold" dir="rtl">
  {selectedItem.title[lang]}
</h3>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8">{selectedItem.excerpt[lang]}</p>
                                <a href={selectedItem.link} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#C9A961] text-black px-6 py-3 text-sm uppercase tracking-wider font-semibold hover:bg-[#B8935A] transition-colors">
                                    {t('press.readArticle')}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PressMedia;
