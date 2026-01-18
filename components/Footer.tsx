
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

export const Footer: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <footer className={`py-32 px-6 md:px-20 border-t transition-colors ${
      isDark ? 'bg-[#0B0B0B] border-zinc-900' : 'bg-[#F5F5F0] border-zinc-200'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h2 
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none mb-20"
        >
          LET'S BUILD <br />
          <span className="text-[#CCFF00]">VALUE.</span>
        </motion.h2>

        <div className={`w-full flex flex-col md:flex-row justify-between items-center gap-10 border-t pt-20 ${
          isDark ? 'border-zinc-900' : 'border-zinc-200'
        }`}>
          <div className="text-left">
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-xs mb-4">Contact</p>
            <a href="mailto:hello@momo.tech" className="text-2xl font-black hover:text-[#CCFF00] transition-colors">hello@momo.tech</a>
          </div>

          <div className="flex gap-8">
            {["LinkedIn", "Twitter", "GitHub", "Instagram"].map(social => (
              <a key={social} href="#" className="font-bold uppercase tracking-widest text-xs text-zinc-500 hover:text-current transition-colors">
                {social}
              </a>
            ))}
          </div>

          <div className="text-right hidden md:block">
            <p className="text-zinc-500 uppercase tracking-widest font-bold text-xs">© 2024</p>
            <p className="font-bold uppercase">MOUHAMED POUYE</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
