import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const { t } = useLanguage();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        { icon: FaEnvelope, label: 'Email', value: 'contact@aissam.com', href: 'mailto:contact@aissam.com' },
        { icon: FaPhone, label: 'Phone', value: '+212 660-171702', href: 'tel:+212660171702' },
        { icon: FaInstagram, label: 'Instagram', value: '@aissam_ait_ouakrim', href: 'https://instagram.com/aissam_ait_ouakrim' },
        { icon: FaLinkedin, label: 'LinkedIn', value: 'Aissam Ait Ouakrim', href: 'https://linkedin.com' },
    ];

    return (
        <section id="contact" className="section-padding bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C9A961]/5 blur-[120px] pointer-events-none" />

            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-[#C9A961]" />
                        <span className="text-[#C9A961] text-xs uppercase tracking-[0.2em] font-medium">
                            {t('contact.label')}
                        </span>
                        <div className="w-12 h-[1px] bg-[#C9A961]" />
                    </div>
                    <h3 className="font-arabic text-[#C9A961] mb-4 md:text-center text-6xl md:text-7xl lg:text-8xl font-bold" dir="rtl">
  {t('contact.titleArabic')}
</h3>
                    
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('contact.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >


                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="w-14 h-14 border border-white/10 flex items-center justify-center group-hover:border-[#C9A961] group-hover:bg-[#C9A961] transition-all duration-300">
                                        <item.icon className="text-white group-hover:text-[#0D0D0D] transition-colors" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{item.label}</span>
                                        <span className="text-white group-hover:text-[#C9A961] transition-colors">{item.value}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-[#0A0A0A] p-8 border border-white/5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">{t('contact.formName')} *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-[#C9A961] outline-none transition-colors placeholder:text-gray-600"
                                    placeholder={t('contact.formNamePlaceholder')}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">{t('contact.formEmail')} *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-[#C9A961] outline-none transition-colors placeholder:text-gray-600"
                                    placeholder={t('contact.formEmailPlaceholder')}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">{t('contact.formSubject')} *</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-[#C9A961] outline-none transition-colors placeholder:text-gray-600"
                                placeholder={t('contact.formSubjectPlaceholder')}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">{t('contact.formMessage')} *</label>
                            <textarea
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-[#C9A961] outline-none transition-colors resize-none placeholder:text-gray-600"
                                placeholder={t('contact.formMessagePlaceholder')}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-secondary w-full md:w-auto">
                            {t('contact.submit')}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
