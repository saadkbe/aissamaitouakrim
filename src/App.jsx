import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

// Code-split below-the-fold components to slash initial JS execution & bundle size
const Gallery = lazy(() => import('./components/Gallery'));
const InspirationalVideo = lazy(() => import('./components/InspirationalVideo'));
const About = lazy(() => import('./components/About'));
const Achievements = lazy(() => import('./components/Achievements'));
const SignatureDishes = lazy(() => import('./components/SignatureDishes'));
const Career = lazy(() => import('./components/Career'));
const MotivationalShorts = lazy(() => import('./components/MotivationalShorts'));
const Training = lazy(() => import('./components/Training'));
const Masterclass = lazy(() => import('./components/Masterclass'));
const SocialFeed = lazy(() => import('./components/SocialFeed'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Downloads = lazy(() => import('./components/Downloads'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <LanguageProvider>
      <div className="bg-[#0A0A0A] text-white min-h-screen relative">
        {/* Preloader */}
        <Preloader />

        {/* Custom Cursor (Desktop Only) */}
        <CustomCursor />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Global Animated Gold Circular Light */}
        <motion.div
          className="fixed top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,97,0.06) 0%, rgba(201,169,97,0.03) 40%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: ['0%', '30%', '-20%', '0%'],
            y: ['0%', '-20%', '30%', '0%'],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Second Animated Light */}
        <motion.div
          className="fixed bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,97,0.05) 0%, rgba(201,169,97,0.02) 40%, transparent 70%)',
            filter: 'blur(70px)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: ['0%', '-30%', '20%', '0%'],
            y: ['0%', '20%', '-30%', '0%'],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <Gallery />
            <InspirationalVideo />
            <About />
            <Achievements />
            <SignatureDishes />
            <Career />
            <MotivationalShorts />
            <Training />
            <Masterclass />
            <SocialFeed />
            <Newsletter />
            <Downloads />
            <Contact />
            <Footer />
          </Suspense>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
