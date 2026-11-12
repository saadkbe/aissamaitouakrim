import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Sample searchable content (in real implementation, this would search actual content)
    const searchableContent = [
        { type: 'Dish', title: 'Moroccan Lamb Tagine', section: 'Signature Dishes' },
        { type: 'Dish', title: 'Pigeon Pastilla', section: 'Signature Dishes' },
        { type: 'Achievement', title: "Champion d'Afrique", section: 'Achievements' },
        { type: 'Achievement', title: 'Finaliste Monde Bocuse d\'Or', section: 'Achievements' },
        { type: 'Career', title: 'Chef - Conrad Rabat', section: 'Career' },
        { type: 'Press', title: 'Rising Star of Moroccan Gastronomy', section: 'Press & Media' },
    ];

    useEffect(() => {
        // Listen for Cmd/Ctrl + K
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (query.trim()) {
            const filtered = searchableContent.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.type.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A961] text-gray-400 hover:text-white transition-all duration-300 rounded-sm"
            >
                <FaSearch size={14} />
                <span className="text-sm">Search</span>
                <span className="hidden md:block text-xs bg-white/10 px-2 py-0.5 rounded">
                    ⌘K
                </span>
            </button>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: -20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-[#1A1A1A] border border-[#C9A961]/30 overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-4 p-6 border-b border-white/10">
                                <FaSearch className="text-[#C9A961]" size={20} />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search dishes, achievements, career..."
                                    autoFocus
                                    className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-600"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {results.length > 0 ? (
                                    <div className="p-4">
                                        {results.map((result, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 group"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs uppercase tracking-wider text-[#C9A961] font-semibold">
                                                                {result.type}
                                                            </span>
                                                            <span className="text-xs text-gray-600">•</span>
                                                            <span className="text-xs text-gray-500">
                                                                {result.section}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-white group-hover:text-[#C9A961] transition-colors">
                                                            {result.title}
                                                        </h4>
                                                    </div>
                                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#C9A961] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : query.trim() ? (
                                    <div className="p-12 text-center text-gray-500">
                                        No results found for "{query}"
                                    </div>
                                ) : (
                                    <div className="p-12 text-center text-gray-600">
                                        <p className="mb-2">Start typing to search...</p>
                                        <p className="text-sm">Try searching for dishes, achievements, or career highlights</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-4">
                                    <span>Press <kbd className="bg-white/10 px-2 py-1 rounded">ESC</kbd> to close</span>
                                </div>
                                <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Search;
