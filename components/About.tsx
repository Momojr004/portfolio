
import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-[#0B0B0B]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
          className="md:col-span-8 bg-zinc-900/50 p-12 rounded-3xl border border-zinc-800/50 backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Loin du cliché du développeur isolé. Entrepreneur avec vision. Tech, Business et Humain au même endroit.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            Je ne vends pas des lignes de code, je construis des leviers de croissance. Chaque décision technique est dictée par la viabilité du produit final.
          </p>
        </motion.div>

        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: true }}
          className="md:col-span-4 bg-[#CCFF00] p-12 rounded-3xl flex flex-col justify-end"
        >
          <p className="text-[#0B0B0B] text-6xl font-black leading-none mb-4">7+</p>
          <p className="text-[#0B0B0B] font-bold uppercase tracking-widest text-sm">Années d'Expérience</p>
        </motion.div>

        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
          className="md:col-span-4 bg-zinc-900/50 p-12 rounded-3xl border border-zinc-800/50 flex flex-col gap-8"
        >
          <div className="h-1 bg-[#CCFF00] w-full opacity-20" />
          <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-500">Approche</h3>
          <p className="text-2xl font-bold">Zéro jargon. Résultat concret. Scalabilité native.</p>
        </motion.div>

        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
          className="md:col-span-8 bg-zinc-900/50 p-12 rounded-3xl border border-zinc-800/50 flex flex-col justify-center"
        >
          <div className="flex flex-wrap gap-4">
             {["Architecture", "SaaS", "AI Agents", "FinTech", "Web3"].map(tag => (
               <span key={tag} className="px-6 py-3 border border-zinc-700 rounded-full text-sm font-bold uppercase tracking-wider text-zinc-300">
                 {tag}
               </span>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
