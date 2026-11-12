import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useLanguage } from '../contexts/LanguageContext';

/* ─── Compact Language Toggle ─── */
const LangToggle = ({ language, toggleLanguage }) => (
  <motion.button
    onClick={toggleLanguage}
    whileTap={{ scale: 0.92 }}
    aria-label="Toggle language"
    className="relative flex items-center rounded-full overflow-hidden cursor-pointer select-none"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(201,169,97,0.15)',
      padding: '2px',
    }}
  >
    {[
      { code: 'en', flag: 'https://flagcdn.com/us.svg', label: 'EN' },
      { code: 'fr', flag: 'https://flagcdn.com/fr.svg', label: 'FR' },
    ].map(({ code, flag, label }) => {
      const active = language === code;
      return (
        <div
          key={code}
          className="relative flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-300"
          style={{
            background: active ? 'rgba(201,169,97,0.15)' : 'transparent',
            opacity: active ? 1 : 0.4,
          }}
        >
          <img src={flag} alt={label} className="w-3.5 h-2.5 object-cover rounded-sm" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white">{label}</span>
        </div>
      );
    })}
  </motion.button>
);

/* ─── Nav link ─── */
function NavLink({ href, children, index, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative group text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300 py-1"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index + 0.2, duration: 0.4 }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#C9A961] group-hover:w-full transition-all duration-300 ease-out" />
    </motion.a>
  );
}

/* ─── Main Navbar ─── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
  });

  const navItems = [
    { key: 'about', href: '#parcours' },
    { key: 'achievements', href: '#achievements' },
    { key: 'dishes', href: '#dishes' },
    { key: 'career', href: '#career' },
    { key: 'gallery', href: '#galerie' },
    { key: 'training', href: '#training' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <>
      {/* ── SINGLE STICKY NAVBAR ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(10,10,10,0.85)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
            backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(201,169,97,0.08)' : '1px solid transparent',
          }}
        >
          <div
            className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between"
            style={{ height: scrolled ? 56 : 64 }}
          >
            {/* ── LOGO ── */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/logo.svg"
                alt="Aissam Ait Ouakrim"
                className="transition-all duration-500"
                style={{ height: scrolled ? 36 : 42, width: 'auto' }}
              />
              <div className="hidden sm:flex flex-col justify-center">
                <span className="text-white font-bold tracking-[0.15em] text-[14px] uppercase leading-none mb-[4px]">Aissam</span>
                <span className="text-[#C9A961] font-medium tracking-[0.2em] text-[9px] uppercase leading-none">Ait Ouakrim</span>
              </div>
            </a>

            {/* ── DESKTOP NAV LINKS (centered) ── */}
            <div className="hidden lg:flex items-center gap-7">
              {navItems.map((item, i) => (
                <NavLink key={item.key} href={item.href} index={i}>
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}
            </div>

            {/* ── RIGHT ACTIONS ── */}
            <div className="hidden lg:flex items-center gap-2">
              <LangToggle language={language} toggleLanguage={toggleLanguage} />

              <div className="h-4 w-[1px] bg-white/8 mx-1.5" />

              <a
                href="https://www.instagram.com/aissam_ait_ouakrim/"
                target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-[#C9A961] transition-colors duration-300"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-[#C9A961] transition-colors duration-300"
              >
                <FaLinkedin size={13} />
              </a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="ml-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300"
                style={{
                  color: '#C9A961',
                  border: '1px solid rgba(201,169,97,0.3)',
                  background: 'rgba(201,169,97,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(201,169,97,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(201,169,97,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(201,169,97,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(201,169,97,0.3)';
                }}
              >
                {language === 'fr' ? 'Contact' : 'Book'}
              </motion.a>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <motion.button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><HiX size={22} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><HiMenuAlt3 size={22} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── FULL-SCREEN MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: '#0A0A0A' }}
          >
            <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, #C9A961, transparent)' }} />

            <div className="flex-1 flex flex-col justify-center px-10 py-20">
              <nav className="flex flex-col gap-1 mb-12">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4 }}
                    className="group flex items-center gap-4 py-4 border-b transition-all duration-300"
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <span className="text-[10px] text-[#C9A961]/40 font-mono w-6 tabular-nums">0{i + 1}</span>
                    <span className="text-3xl font-black text-white group-hover:text-[#C9A961] transition-colors duration-200 tracking-tight"
                      style={{ fontFamily: 'serif' }}>
                      {t(`nav.${item.key}`)}
                    </span>
                    <motion.span
                      className="ml-auto text-[#C9A961] opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >→</motion.span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between"
              >
                <LangToggle language={language} toggleLanguage={toggleLanguage} />
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/aissam_ait_ouakrim/" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#C9A961] transition-colors">
                    <FaInstagram size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#C9A961] transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </motion.div>

              <p className="font-arabic text-6xl font-bold mt-10 text-right select-none"
                style={{ color: 'rgba(201,169,97,0.05)' }} dir="rtl">
                عيسام آيت أوقريم
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
