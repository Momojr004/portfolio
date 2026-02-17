
import React, { useContext, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Sparkles, Zap, Target } from 'lucide-react';
import { ThemeContext } from '../App';

const Home: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const services = [
    {
      title: "Développement Full-Stack",
      desc: "je développe des applications multi plateforme, pensées pour évoluer.",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Business Development",
      desc: "Je transforme une idée en produit viable et vendable.",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Orchestration de l'IA",
      desc: "J'intègre des agents IA utiles, au bon endroit.",
      icon: <Sparkles className="w-8 h-8" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden"
    >
      <Hero />
      {/* Entreprises Section */}
      <section className={`py-24 px-6 md:px-20 ${isDark ? 'bg-zinc-900/30' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-sm font-bold uppercase tracking-[0.4em] mb-16 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}
          >
            Entreprises
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* TerangaDev */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-[2rem] border transition-all hover:border-[#CCFF00] group ${isDark ? 'bg-black border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-[#191A21] rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src="./gallerie/photos/logo_terangaDev.png"
                    alt="TerangaDev Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>TerangaDev</h3>
                  <p className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Co-fondateur, Responsable Qualité & Business Developer</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Digitalisation des PME africaines. Nous remplaçons les solutions archaïques (Excel, bloc-notes) par des <strong className="text-[#CCFF00]">SaaS modernes</strong> et développons des systèmes sur-mesure.
              </p>
              <div className="mt-6">
                <a
                  href="https://terangadev.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CCFF00] font-bold text-sm hover:underline transition-all group-hover:translate-x-1"
                >
                  → Découvrir TerangaDev
                </a>
              </div>
            </motion.div>

            {/* EcoMed24 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-8 rounded-[2rem] border transition-all hover:border-[#CCFF00] group ${isDark ? 'bg-black border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-[#fff] rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src="./gallerie/photos/logo_ecomed.png"
                    alt="EcoMed24 Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>EcoMed24</h3>
                  <p className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Full Stack Developer</p>
                </div>
              </div>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Écosystème de <strong className="text-[#CCFF00]">santé numérique</strong> pour l'Afrique. Téléconsultation, gestion patients, collaboration médicale et digitalisation des flux financiers.
              </p>
              <div className="mt-6">
                <a
                  href="https://www.ecomed24.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CCFF00] font-bold text-sm hover:underline transition-all group-hover:translate-x-1"
                >
                  → Découvrir EcoMed24
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-32 px-6 md:px-20 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <h2 className={`text-sm font-bold uppercase tracking-[0.4em] mb-16 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`p-10 rounded-3xl border-2 transition-all duration-300 transform-gpu cursor-default ${isDark
                ? 'bg-zinc-900/30 border-zinc-800/50 hover:border-[#CCFF00]'
                : 'bg-white border-zinc-100 hover:border-[#CCFF00] shadow-xl shadow-black/5'
                }`}
            >
              <div className="text-[#CCFF00] mb-6 transition-transform group-hover:scale-110">{s.icon}</div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{s.title}</h3>
              <p className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Projects />

      {/* Process Section */}
      <section ref={processRef} className="py-32 px-6 md:px-20 bg-[#CCFF00] text-black relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">MON <br />PROCESS.</h2>
          <div className="space-y-12 relative">
            <motion.div
              style={{ scaleY: lineHeight }}
              className="absolute left-[15px] top-4 w-[2px] h-[80%] bg-black/20 origin-top hidden md:block"
            />

            {[
              { n: "01", t: "Audit & Analyse", d: "Immersion dans vos processus métier et identification des points de digitalisation." },
              { n: "02", t: "Architecture & Dev", d: "Développement avec les dernières technologies (React, Node.js, Cloud)." },
              { n: "03", t: "Déploiement & Support", d: "Mise en production sécurisée et accompagnement utilisateurs." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex gap-8 border-b border-black/10 pb-8 relative"
              >
                <span className="text-2xl font-black bg-[#CCFF00] z-20 h-fit pr-4">{step.n}</span>
                <div>
                  <h4 className="text-3xl font-bold mb-2">{step.t}</h4>
                  <p className="font-medium opacity-60 text-lg">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
