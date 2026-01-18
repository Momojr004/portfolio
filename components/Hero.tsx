
import React, { useContext } from 'react';
import { motion, Variants, BezierDefinition } from 'framer-motion';
import { Experience3D } from './Experience3D';
import { ThemeContext } from '../App';

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
          <motion.p variants={item} className="text-[#CCFF00] font-bold tracking-widest mb-4 uppercase">
            Mouhamed Pouye — MOMO
          </motion.p>
          <motion.h1
            variants={item}
            className={`text-6xl lg:text-[9rem] xl:text-[11rem] font-[900] leading-[0.8] tracking-[-0.04em] mb-8 ${isDark ? 'text-white' : 'text-zinc-900'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            JE PARLE <br />
            <span className="text-[#CCFF00]">BUSINESS</span> <br />
            AVANT <br />
            <span className="italic">CODE.</span>
          </motion.h1>
          <motion.p
            variants={item}
            className={`text-xl md:text-2xl max-w-xl font-medium leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            Je transforme des idées claires en applications rentables. <br />
            <strong className="text-[#CCFF00]">Architecture, IA & Vision Produit.</strong>
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full md:w-2/5 h-[50vh] md:h-[70vh]">
        <Experience3D />
      </div>
    </section>
  );
};