
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

export const Footer: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <footer className={`py-32 px-6 md:px-20 border-t transition-colors ${isDark ? 'bg-[#0B0B0B] border-zinc-900' : 'bg-[#F5F5F0] border-zinc-200'
      }`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none mb-20"
        >
          LET'S BUILD <br />
          <span className="text-[#F5B731]">VALUE.</span>
        </motion.h2>

        <div className={`w-full flex flex-col md:flex-row justify-between items-center gap-10 border-t pt-20 ${isDark ? 'border-zinc-900' : 'border-zinc-200'
          }`}>
          <div className="text-left">
            <p className={`uppercase tracking-widest font-bold text-xs mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Contact</p>
            <a href="mailto:momo@terangadev.com" className="text-2xl font-black hover:text-[#F5B731] transition-colors">momo@terangadev.com</a>
            <br />
            <a href="mailto:guilganee@gmail.com" className={`text-sm font-bold hover:text-current transition-colors mt-1 inline-block ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>guilganee@gmail.com</a>
          </div>

          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/mouhamed-pouye-753462271/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className={`font-bold uppercase tracking-widest text-xs hover:text-current transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              LinkedIn
            </a>
            <a href="https://github.com/Momojr004" target="_blank" rel="noopener noreferrer" className={`font-bold uppercase tracking-widest text-xs hover:text-current transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              GitHub
            </a>
            <a href="https://www.instagram.com/guilganee" target="_blank" rel="noopener noreferrer" className={`font-bold uppercase tracking-widest text-xs hover:text-current transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Instagram
            </a>
          </div>

          <div className="text-right hidden md:block">
            <p className={`uppercase tracking-widest font-bold text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>© 2026</p>
            <p className="font-bold uppercase">MOUHAMED POUYE</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
