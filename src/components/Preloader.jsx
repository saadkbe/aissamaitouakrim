import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fast, snappy preloader that never keeps the user waiting
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 150);
                    return 100;
                }
                return prev + 25;
            });
        }, 40);

        const handleLoad = () => {
            setProgress(100);
            setIsLoading(false);
        };

        if (document.readyState === 'complete') {
            const timer = setTimeout(() => {
                setProgress(100);
                setIsLoading(false);
            }, 300);
            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        } else {
            window.addEventListener('load', handleLoad, { once: true });
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center pointer-events-none"
                >
                    <div className="text-center">
                        {/* Logo/Brand */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="mb-8"
                        >
                            <h1 className="font-display text-5xl md:text-6xl text-white mb-2">
                                Aissam
                            </h1>
                            <p className="text-[#C9A961] text-xs uppercase tracking-[0.3em]">
                                Chef
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="w-48 h-0.5 bg-white/10 mx-auto overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#C9A961] to-[#B8935A]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.15 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
