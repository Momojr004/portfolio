
import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  // Carrousel Portrait
  const [currentPortrait, setCurrentPortrait] = useState(0);
  const portraitImages = [
    '/gallerie/photos/momo_portrait.webp',
    '/gallerie/photos/momo_portrait-02.webp'
  ];

  // Carrousel Workspace
  const [currentWorkspace, setCurrentWorkspace] = useState(0);
  const workspaceImages = [
    '/gallerie/photos/momo_workspace01.webp',
    '/gallerie/photos/momo_workspace02.webp',
    '/gallerie/photos/momo_workspace03.webp'
  ];

  // Effet pour le carrousel portrait
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPortrait((prev) => (prev + 1) % portraitImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [portraitImages.length]);

  // Effet pour le carrousel workspace
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkspace((prev) => (prev + 1) % workspaceImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [workspaceImages.length]);

  return (
    <>
      <SEO
        title="À Propos - Mouhamed Pouye"
        description="Découvrez le parcours de Mouhamed Pouye, développeur Full-Stack passionné. De son expérience technique à sa vision du développement web moderne."
        keywords="mouhamed pouye, développeur, parcours, expérience, compétences, about, à propos"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="pt-40 pb-20 px-6 md:px-20"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] xl:text-[10rem] font-[900] tracking-[-0.04em] mb-20 leading-[0.75]" style={{ fontFamily: 'Inter, sans-serif' }}>
            ENTREPRENEUR <br />
            <span className="text-[#CCFF00] italic">AVANT TOUT.</span>
          </h1>

          {/* Section Philosophie & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 mt-32">
            <motion.div
              className={`p-12 rounded-[3rem] ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-[900] uppercase text-[#CCFF00] mb-6 tracking-[0.3em]">Philosophie</h2>
              <h3 className={`text-3xl md:text-4xl font-[900] leading-tight mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                ENTREPRENEUR <span className="text-[#CCFF00]">AVANT</span> DÉVELOPPEUR
              </h3>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Contrairement aux développeurs qui codent d'abord, je pense <strong>business first</strong>.
                Logique métier, modèle économique, pénétration de marché... puis code.
                Je ne suis pas dans ma bulle geek, je comprends les enjeux réels.
              </p>
            </motion.div>

            <motion.div
              className="p-12 rounded-[3rem] bg-gradient-to-br from-[#CCFF00] to-[#A3FF00] text-black"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-[900] uppercase opacity-60 mb-6 tracking-[0.3em]">Vision 5-10 ans</h2>
              <h3 className="text-3xl md:text-4xl font-[900] leading-tight mb-6">
                TRANSFORMER L'<span className="italic">AFRIQUE</span>
              </h3>
              <p className="text-lg leading-relaxed font-medium">
                Être l'entreprise qui révolutionne la gestion des PME africaines.
                Plusieurs SaaS utilisés partout en Afrique. Un acteur principal de la transformation digitale du continent.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[200px] md:auto-rows-[300px]">
            {/* Main Photo - Hero Portrait Carousel */}
            <motion.div
              className="md:col-span-8 md:row-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group bg-zinc-800"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OptimizedImage
                src={portraitImages[currentPortrait]}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                alt="Mouhamed Pouye Portrait"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />

              {/* Indicateurs */}
              <div className="absolute top-6 right-6 flex gap-2 z-20">
                {portraitImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPortrait === index ? 'bg-[#CCFF00]' : 'bg-white/30'
                      }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="text-xs font-[900] uppercase tracking-[0.3em] opacity-60 mb-2">Co-fondateur TerangaDev</p>
                <h2 className="text-3xl md:text-5xl font-[900] tracking-tight">
                  MOUHAMED <span className="text-[#CCFF00]">POUYE</span>
                </h2>
                <p className="text-sm opacity-80 mt-2 font-medium">Entrepreneur • Full Stack Developer</p>
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
                  <p className="text-3xl font-[900] tracking-tight">20+</p>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Clients TerangaDev</p>
                </div>
                <div>
                  <p className="text-3xl font-[900] tracking-tight">2</p>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Années</p>
                </div>
              </div>
            </motion.div>

            {/* Work Photo Carousel */}
            <motion.div
              className="md:col-span-3 md:row-span-1 rounded-[2rem] overflow-hidden relative group bg-zinc-800"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <OptimizedImage
                src={workspaceImages[currentWorkspace]}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                alt="Workspace"
                width={600}
                height={400}
              />

              {/* Indicateurs pour workspace */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                {workspaceImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentWorkspace === index ? 'bg-[#CCFF00]' : 'bg-white/40'
                      }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Story Block */}
            <motion.div
              className="md:col-span-5 md:row-span-1 p-8 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-zinc-800 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h3 className="text-xs font-[900] uppercase text-zinc-400 mb-4 tracking-[0.3em]">Parcours</h3>
              <p className="text-lg font-medium leading-relaxed">
                <strong>ESTM</strong> → Freelance → <strong>Incubation CONCREE</strong> → Co-fondateur TerangaDev.
                <span className="text-[#CCFF00]"> De développeur à entrepreneur</span>, avec une mission : digitaliser l'Afrique.
              </p>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              className="md:col-span-12 md:row-span-1 bg-gradient-to-br from-[#CCFF00] to-[#A3FF00] p-8 rounded-[2rem] text-black flex flex-col justify-center group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => window.location.href = 'mailto:momo@terangadev.com'}
            >
              <h3 className="text-xs font-[900] uppercase opacity-60 mb-4 tracking-[0.3em]">Ready to Build?</h3>
              <p className="text-2xl font-[900] tracking-tight leading-tight">
                LET'S TALK <span className="italic">BUSINESS</span>
              </p>
              <p className="text-sm font-bold opacity-60 mt-2 group-hover:opacity-100 transition-opacity">
                → momo@terangadev.com
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
