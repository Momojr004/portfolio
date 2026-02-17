
import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

const projects = [
  {
    id: 'sap-station',
    title: 'SAP STATION MANAGER',
    category: 'Digitalisation / B2B',
    description: 'Gestion digitale des franchises de stations-service au Sénégal',
    img: './gallerie/photos/sap-préview.png'
  },
  {
    id: 'ecomed24',
    title: 'ECOMED24 PLATFORM',
    category: 'Santé Numérique / B2B',
    description: 'Écosystème de santé numérique pour l\'Afrique',
    img: './gallerie/photos/ecomed_preview.png'
  },
  {
    id: 'restaurant-manager',
    title: 'RESTAURANT MANAGER',
    category: 'Gestion / B2B',
    description: 'Solution complète de gestion pour restaurants et chaînes',
    img: './gallerie/photos/restaurant_preview.png'
  },
];

export const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { isDark } = useContext(ThemeContext);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className={`py-32 px-6 md:px-20 border-t ${isDark ? 'border-zinc-800/10' : 'border-zinc-200'}`}
    >
      <div className="flex justify-between items-end mb-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-500">Selected Work</h2>
      </div>

      <div className="relative">
        {/* Cursor Image Reveal */}
        <AnimatePresence>
          {hoveredProject !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'fixed',
                left: mouseX,
                top: mouseY,
                x: '-50%',
                y: '-50%',
                width: '400px',
                height: '280px',
                pointerEvents: 'none',
                zIndex: 50,
                overflow: 'hidden',
                borderRadius: '24px'
              }}
              className="shadow-2xl border-4 border-[#CCFF00]/20"
            >
              <img
                src={projects[hoveredProject].img}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative py-12 border-b transition-all ${isDark ? 'border-zinc-800/50' : 'border-zinc-200'} flex flex-col md:flex-row md:items-center justify-between block overflow-hidden`}
            >
              <div className="z-10 transition-transform duration-700 group-hover:translate-x-12">
                <p className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">{project.category}</p>
                <h3 className={`text-5xl md:text-8xl font-black transition-colors duration-300 ${isDark ? 'text-white group-hover:text-[#CCFF00]' : 'text-zinc-900 group-hover:text-[#CCFF00]'
                  }`}>
                  {project.title}
                </h3>
                <p className={`text-lg mt-4 max-w-xl font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {project.description}
                </p>
              </div>

              <div className={`mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-white' : 'text-zinc-900'} mr-10`}>
                <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-45">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
