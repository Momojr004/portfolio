
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const AboutPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-[10rem] xl:text-[12rem] font-[900] tracking-[-0.04em] mb-20 leading-[0.75]" style={{ fontFamily: 'Inter, sans-serif' }}>
          PLUS QU'UN <br />
          <span className="text-[#CCFF00] italic">DEV.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {/* Main Photo - Hero Portrait */}
          <motion.div
            className="md:col-span-8 md:row-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group bg-zinc-800"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1519085185758-26987a4b63d9?auto=format&fit=crop&q=80&w=1000"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              alt="Momo Portrait"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <p className="text-xs font-[900] uppercase tracking-[0.3em] opacity-60 mb-2">Creative Spirit</p>
              <h2 className="text-3xl md:text-5xl font-[900] tracking-tight">
                MOUHAMED <span className="text-[#CCFF00]">POUYE</span>
              </h2>
              <p className="text-sm opacity-80 mt-2 font-medium">Business First Developer</p>
            </div>
          </motion.div>

          {/* Vision Block */}
          <motion.div
            className={`md:col-span-4 md:row-span-1 p-8 rounded-[2rem] border flex flex-col justify-center transition-colors ${isDark ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-zinc-200'
              }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xs font-[900] uppercase text-[#CCFF00] mb-4 tracking-[0.3em]">Ma Vision</h3>
            <p className="text-xl font-bold leading-tight">
              "Le <span className="text-[#CCFF00]">code</span> n'est qu'un outil. La solution est dans la compréhension profonde du <span className="italic">problème utilisateur</span>."
            </p>
          </motion.div>

          {/* Stats Block */}
          <motion.div
            className="md:col-span-4 md:row-span-1 bg-[#CCFF00] p-8 rounded-[2rem] text-black flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-[900] tracking-tight">5+</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Années XP</p>
              </div>
              <div>
                <p className="text-3xl font-[900] tracking-tight">20+</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Projets</p>
              </div>
            </div>
          </motion.div>

          {/* Work Photo */}
          <motion.div
            className="md:col-span-3 md:row-span-1 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-zinc-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>

          {/* Story Block */}
          <motion.div
            className="md:col-span-5 md:row-span-1 p-8 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-zinc-800 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h3 className="text-xs font-[900] uppercase text-zinc-400 mb-4 tracking-[0.3em]">Story</h3>
            <p className="text-lg font-medium leading-relaxed">
              Basé entre <strong>Paris</strong> et <strong>Dakar</strong>, je navigue entre la rigueur technique européenne et l'agilité entrepreneuriale africaine.
              <span className="text-[#CCFF00]"> Une perspective unique</span> pour des solutions globales.
            </p>
          </motion.div>

          {/* Hobbies */}
          <motion.div
            className={`md:col-span-4 md:row-span-1 p-8 rounded-[2rem] flex flex-col justify-center transition-colors ${isDark ? 'bg-black text-white border border-zinc-800' : 'bg-zinc-900 text-white'
              }`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h3 className="text-zinc-500 uppercase font-[900] text-xs mb-4 tracking-[0.3em]">Passions</h3>
            <div className="space-y-2">
              <p className="text-2xl font-[900] tracking-tight">🏓 Padel</p>
              <p className="text-2xl font-[900] tracking-tight">🚀 SaaS Hunting</p>
              <p className="text-2xl font-[900] tracking-tight">✈️ Travel</p>
            </div>
          </motion.div>

          {/* Lifestyle Photo */}
          <motion.div
            className="md:col-span-4 md:row-span-1 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-zinc-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&q=80&w=600"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-[#CCFF00] to-[#A3FF00] p-8 rounded-[2rem] text-black flex flex-col justify-center group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => window.location.href = 'mailto:hello@mohamedpouye.com'}
          >
            <h3 className="text-xs font-[900] uppercase opacity-60 mb-4 tracking-[0.3em]">Ready to Build?</h3>
            <p className="text-2xl font-[900] tracking-tight leading-tight">
              LET'S TALK <span className="italic">BUSINESS</span>
            </p>
            <p className="text-sm font-bold opacity-60 mt-2 group-hover:opacity-100 transition-opacity">
              → hello@mohamedpouye.com
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
