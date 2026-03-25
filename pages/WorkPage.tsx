
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import SEO from '../components/SEO';
import OptimizedVideo from '../components/OptimizedVideo';
import { getWorkProjects } from '../data/projects';

const projects = getWorkProjects();

const WorkPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <SEO
        title="Projets - Mouhamed Pouye"
        description="Découvrez les projets de Mouhamed Pouye : SAP Station Manager, EcoMed24, Restaurant Manager. Solutions web innovantes et performantes."
        keywords="projets, portfolio, réalisations, sap station manager, ecomed24, restaurant manager, web development"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-40 pb-40 px-6 md:px-20"
      >
        <div className="max-w-7xl mx-auto mb-32">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none mb-10"
          >
            SELECTED <br /> <span className="text-[#CCFF00]">WORKS.</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-xl md:text-2xl max-w-2xl font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}
          >
            De la digitalisation des PME africaines aux plateformes de santé numérique, découvrez des solutions qui transforment les secteurs traditionnels.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-40 gap-x-20">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className={`group relative ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <Link to={`/project/${project.id}`} className="block">
                <div className="relative aspect-[16/10] md:aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-zinc-900 mb-8 transform-gpu shadow-2xl">
                  {/* Overlay pour le contraste initial */}
                  <div className="absolute inset-0 bg-black/10 z-10 transition-opacity group-hover:opacity-0" />

                  <OptimizedVideo
                    src={project.video}
                    autoPlay={true}
                    className="w-full h-full object-contain grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out transform-gpu"
                    poster={project.img}
                  />

                  {/* Badge catégorie flottant */}
                  <div className="absolute top-8 left-8 z-20 overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="inline-block px-4 py-2 bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg"
                    >
                      {project.category}
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500 font-mono text-sm">0{idx + 1}</span>
                    <div className={`h-[1px] flex-grow transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${isDark ? 'bg-[#CCFF00]' : 'bg-black'}`} />
                  </div>
                  <h3 className={`text-4xl md:text-6xl font-black tracking-tighter transition-all duration-500 group-hover:translate-x-4 ${isDark ? 'text-white group-hover:text-[#CCFF00]' : 'text-zinc-900 group-hover:text-black'}`}>
                    {project.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-60 text-center">
          <p className={`text-sm font-bold uppercase tracking-[0.5em] mb-8 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Prêt pour le prochain ?</p>
          <Link
            to="/"
            className={`text-3xl md:text-5xl font-black underline decoration-[#CCFF00] decoration-4 underline-offset-8 hover:text-[#CCFF00] transition-colors ${isDark ? 'text-white' : 'text-zinc-900'}`}
          >
            RETOUR À L'ACCUEIL
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default WorkPage;
