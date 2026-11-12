import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="bg-[#0A0A0A] border-t border-white/5">
            <div className="container py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-display text-white mb-4 tracking-wider">
                            AISSAM AIT OUAKRIM
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A961] mb-6 font-medium">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-3">
                            {
                                [
                                    { label: t('nav.about'), href: '#parcours' },
                                    { label: t('nav.gallery'), href: '#galerie' },
                                    { label: t('nav.contact'), href: '#contact' }
                                ].map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            className="text-gray-400 hover:text-[#C9A961] transition-colors text-sm"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul >
                    </div >

                    {/* Social & Contact */}
                    < div >
                        <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A961] mb-6 font-medium">{t('footer.connect')}</h4>
                        <div className="flex items-center gap-4 mb-6">
                            <a
                                href="https://instagram.com/aissam_ait_ouakrim"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#C9A961] hover:bg-[#C9A961] text-white hover:text-white transition-all duration-300"
                            >
                                <FaInstagram size={16} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#C9A961] hover:bg-[#C9A961] text-white hover:text-white transition-all duration-300"
                            >
                                <FaLinkedin size={16} />
                            </a>
                        </div>
                        <a
                            href="mailto:contact@aissam.com"
                            className="text-gray-400 hover:text-[#C9A961] transition-colors text-sm"
                        >
                            contact@aissam.com
                        </a>
                    </div >
                </div >

                {/* Divider */}
                < div className="w-full h-[1px] bg-white/5 mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-center gap-4 text-xs text-gray-500 text-center">
                    <p className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        <strong className="text-white font-medium">&copy; {currentYear} Aissam Ait Ouakrim. {t('footer.rights')}</strong>
                        <span className="text-white/20 hidden sm:inline">|</span> 
                        <span className="flex items-center gap-1">
                            Created by <span className="text-[#C9A961] font-bold tracking-wide">Eensell</span>
                        </span>
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="hover:text-[#C9A961] transition-colors uppercase tracking-wider">
                            {t('footer.privacy')}
                        </a>
                        <a href="#" className="hover:text-[#C9A961] transition-colors uppercase tracking-wider">
                            {t('footer.terms')}
                        </a>
                    </div>
                </div>
            </div >
        </footer >
    );
};

export default Footer;
