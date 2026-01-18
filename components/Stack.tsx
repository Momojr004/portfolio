
import React from 'react';
import { motion } from 'framer-motion';

const skills = ["React", "Node.js", "AI Agents", "AWS", "Three.js", "Next.js", "Python", "Docker", "TypeScript", "TailwindCSS"];

export const Stack: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B0B0B] overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center text-7xl md:text-[10rem] font-black italic opacity-10"
        >
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="flex items-center gap-10">
              {skill}
              <div className="w-6 h-6 bg-[#CCFF00] rounded-full" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
