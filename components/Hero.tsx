
import React, { useContext, lazy, Suspense } from 'react';
import { motion, Variants, BezierDefinition } from 'framer-motion';
import { ThemeContext } from '../App';

// Lazy load Three.js (~300KB) — ne charge que quand le composant Hero est visible
const Experience3D = lazy(() => import('./Experience3D').then(m => ({ default: m.Experience3D })));

export const Hero: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item: Variants = {
    hidden: { y: 100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1] as BezierDefinition
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center px-6 md:px-20 overflow-hidden pt-32 pb-20">
      <div className="w-full md:w-3/5 z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="text-[#F5B731] font-bold tracking-widest mb-4 uppercase">
            Mouhamed Pouye — MOMO
          </motion.p>
          <motion.h1
            variants={item}
            className={`text-4xl sm:text-5xl lg:text-[4rem] xl:text-[5rem] font-[900] leading-[0.8] tracking-[-0.04em] mb-8 ${isDark ? 'text-white' : 'text-zinc-800'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            JE PARLE BUSINESS<br />
            <span className="text-[#F5B731]">AVANT DE PARLER</span><br />
            <span className="italic">CODE.</span>
          </motion.h1>
          <motion.p
            variants={item}
            className={`text-xl md:text-2xl max-w-xl font-[600] leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}
          >
            Développeur Full-Stack & Entrepreneur Tech
          </motion.p>
          <motion.p
            variants={item}
            className={`text-2xl sm:text-3xl lg:text-[2rem] max-w-xl font-[800] leading-relaxed ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}
          >
            Co-fondateur <strong className="text-[#F5B731]">TerangaDev</strong> & Full Stack Developer <strong className="text-[#F5B731]">EcoMed24</strong>. <br />
          </motion.p>
          <motion.p
            variants={item}
            className={`text-xl md:text-2xl max-w-xl font-medium leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
          >
            Développeur orienté produit, pas juste lignes de code. Je transforme des idées claires en applications rentables.
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full md:w-2/5 h-[50vh] md:h-[70vh]">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#F5B731]/30 rounded-full" />
              <div className="w-20 h-20 border-4 border-[#F5B731] border-t-transparent rounded-full animate-spin absolute inset-0" />
            </div>
          </div>
        }>
          <Experience3D />
        </Suspense>
      </div>
    </section>
  );
};