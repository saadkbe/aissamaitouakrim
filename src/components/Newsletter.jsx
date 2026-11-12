import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Newsletter = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="py-16 bg-[#0A0A0A] relative overflow-hidden">
            {/* Ambient gold glow for standout effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(201,169,97,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            </div>
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto rounded-2xl p-10 md:p-14"
                    style={{
                        background: 'linear-gradient(145deg, rgba(201,169,97,0.06) 0%, rgba(201,169,97,0.02) 100%)',
                        border: '1px solid rgba(201,169,97,0.2)',
                        backdropFilter: 'blur(12px)',
                    }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                            style={{ background: 'linear-gradient(135deg, #C9A961, #B8935A)' }}>
                            <FaEnvelope size={24} className="text-black" />
                        </div>
                        <h3 className="font-arabic text-[#C9A961] md:font-bold mb-6 text-center text-6xl md:text-7xl lg:text-8xl" dir="rtl">

                            {t('newsletter.titleArabic')}
                        
</h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t('newsletter.description')}
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('newsletter.emailPlaceholder')}
                            required
                            disabled={status === 'loading' || status === 'success'}
                            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-[#C9A961] focus:bg-white/10 outline-none transition-all disabled:opacity-50 rounded-lg"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="px-8 py-4 font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap rounded-lg text-black"
                            style={{ background: 'linear-gradient(135deg, #C9A961, #B8935A)' }}
                        >
                            {status === 'loading' ? t('newsletter.subscribing') : status === 'success' ? t('newsletter.subscribed') : t('newsletter.subscribe')}
                        </button>
                    </motion.form>

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center flex items-center justify-center gap-2 text-[#C9A961]"
                        >
                            <FaCheckCircle />
                            <span>{t('newsletter.success')}</span>
                        </motion.div>
                    )}

                    <p className="text-center text-gray-600 text-sm mt-6">
                        {t('newsletter.privacy')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
