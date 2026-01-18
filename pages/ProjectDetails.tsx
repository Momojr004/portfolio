
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Simulated project data (Dans un vrai projet, on fetcherait par ID ici)
  const project = {
    title: id?.replace('-', ' ').toUpperCase() || "PROJECT DETAILS",
    year: "2024",
    client: "Global Tech Solutions",
    stack: ["React", "Node.js", "OpenAI", "AWS"],
    desc: "Une solution innovante conçue pour répondre aux défis spécifiques du secteur, alliant une expérience utilisateur fluide à une infrastructure technique robuste.",
    solution: "Mise en place d'une architecture modulaire permettant une scalabilité horizontale et une intégration poussée d'algorithmes d'optimisation en temps réel.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-business-charts-and-graphs-close-up-1558-large.mp4"
  };

  const handleBack = () => {
    // Si on a un historique (on vient de /work), on y retourne, sinon on force /work
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/work');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      <div className="px-6 md:px-20 mb-12 flex justify-between items-center">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:text-[#CCFF00] transition-all cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Projects
        </button>
        <span className="text-xs font-bold opacity-40 uppercase tracking-[0.2em]">Case Study / {project.year}</span>
      </div>

      {/* Hero Video Section */}
      <div className="w-full h-[70vh] bg-zinc-900 mb-20 overflow-hidden relative">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src={project.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
      </div>

      <div className="px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
        {/* Info Sidebar */}
        <div className="md:col-span-4 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Client</h4>
            <p className="text-2xl font-bold">{project.client}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Stack Technique</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(s => (
                <span key={s} className="px-4 py-2 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all"
          >
            Voir le Live <ExternalLink size={14}/>
          </motion.button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-none"
          >
            {project.title}
          </motion.h1>
          
          <div className="space-y-10 text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-white"
            >
              {project.desc}
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {project.solution}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden bg-zinc-900 aspect-video"
            >
              <img src="https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden bg-zinc-900 aspect-video"
            >
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
