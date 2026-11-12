import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaHeart } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { useLanguage } from '../contexts/LanguageContext';
import img1 from '../assets/media__1772489646598.webp';
import img2 from '../assets/media__1772489674572.webp';
import img3 from '../assets/media__1772489707436.webp';
import img4 from '../assets/media__1772489690225.webp';
import img5 from '../assets/media__1772489741918.webp';

const POSTS = [
  {
    url: 'https://www.instagram.com/p/DM8hD9hOMxL/',
    image: img2,
    caption: 'La Pastilla au Pigeon · 24 couches de perfection ✨',
    likes: '3.4K',
    tag: 'Popular',
  },
  {
    url: 'https://www.instagram.com/p/DMadceHpyBV/',
    image: img3,
    caption: "Tagine d\'agneau · Tradition & innovation réunies 🫙",
    likes: '4.2K',
    tag: 'Trending',
  },
  {
    url: 'https://www.instagram.com/p/DBsJLSuIhJh/',
    image: img5,
    caption: "Panna Cotta au Safran · L\'orient rencontre l\'occident 🌙",
    likes: '3.7K',
    tag: 'Featured',
  },
];

/* ─── Single Instagram Card ─── */
function InstaCard({ post, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden cursor-pointer block group h-full"
      style={{ borderRadius: 16 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Always-on dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%),
            radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)
          `,
        }}
      />

      {/* Gold shimmer overlay on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, rgba(201,169,97,0.2) 0%, transparent 50%, rgba(201,169,97,0.08) 100%)',
        }}
      />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[16px]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ boxShadow: 'inset 0 0 0 1px rgba(201,169,97,0.4)' }}
      />

      {/* Top row: Instagram icon + tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <motion.div
          className="flex items-center justify-center rounded-full"
          animate={{ opacity: hovered ? 1 : 0.6, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 32, height: 32,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <FaInstagram className="text-white" size={14} />
        </motion.div>

        {post.tag && (
          <motion.span
            className="text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full text-white"
            animate={{ opacity: hovered ? 1 : 0.8 }}
            style={{
              background: 'rgba(201,169,97,0.85)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {post.tag}
          </motion.span>
        )}
      </div>

      {/* Bottom content - slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        <motion.div
          className="flex items-center gap-2 mb-2"
          animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <FaHeart size={11} className="text-[#C9A961]" />
          <span className="text-white text-xs font-semibold">{post.likes}</span>
          <div className="flex-1" />
          <motion.div
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <HiArrowUpRight size={14} className="text-[#C9A961]" />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-white/90 text-xs leading-relaxed line-clamp-2"
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ fontWeight: 400 }}
        >
          {post.caption}
        </motion.p>

        <motion.div
          className="mt-3 h-[2px] rounded-full origin-left"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: 'linear-gradient(90deg, #C9A961, rgba(201,169,97,0.2))' }}
        />
      </div>
    </motion.a>
  );
}

/* ─── Main Section ─── */
const SocialFeed = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0A0A0A', paddingTop: 120, paddingBottom: 120 }}
    >
      {/* ── Ambient background effects ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,97,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(220,39,67,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      <div className="container relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Instagram badge */}
          <motion.div
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, rgba(240,148,51,0.12), rgba(220,39,67,0.12))',
              border: '1px solid rgba(240,148,51,0.2)',
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #bc1888)' }}
            >
              <FaInstagram className="text-white" size={14} />
            </div>
            <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">
              @aissam_ait_ouakrim
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="font-arabic text-[#C9A961] text-6xl md:text-7xl lg:text-8xl font-bold mb-3" dir="rtl">
            {t('social.titleArabic')}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {t('social.description')}
          </p>
        </motion.div>

        {/* ── Magazine Grid ── */}
        <div
          className="grid gap-3 md:gap-4 max-w-5xl mx-auto"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '400px',
          }}
        >
          <div className="col-span-3 md:col-span-1 row-span-1">
            <InstaCard post={POSTS[0]} index={0} />
          </div>
          <div className="col-span-3 md:col-span-1 row-span-1">
            <InstaCard post={POSTS[1]} index={1} />
          </div>
          <div className="col-span-3 md:col-span-1 row-span-1">
            <InstaCard post={POSTS[2]} index={2} />
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center mt-16"
        >
          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm mb-10">
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,97,0.3))' }} />
            <FaInstagram className="text-[#C9A961]/40" size={16} />
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(201,169,97,0.3))' }} />
          </div>

          <motion.a
            href="https://www.instagram.com/aissam_ait_ouakrim/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(240,148,51,0.15), rgba(220,39,67,0.15))',
              border: '1px solid rgba(240,148,51,0.3)',
              color: '#fff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f09433, #e6683c, #dc2743)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(220,39,67,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(240,148,51,0.15), rgba(220,39,67,0.15))';
              e.currentTarget.style.borderColor = 'rgba(240,148,51,0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaInstagram size={16} />
            Follow on Instagram
            <HiArrowUpRight size={14} />
          </motion.a>

          <p className="text-gray-600 text-[11px] uppercase tracking-[0.2em] mt-4">
            Discover more culinary moments
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialFeed;
