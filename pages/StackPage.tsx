
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { TiltCard } from '../components/TiltCard';
import { Layers, Code2, Cpu, Globe, Rocket, Terminal, Database, ShieldCheck } from 'lucide-react';

const techGroups = [
  {
    title: "Frontend Engineering",
    icon: <Globe className="w-6 h-6" />,
    items: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Three.js", logo: "https://cdn.simpleicons.org/threedotjs/white" }
    ]
  },
  {
    title: "Backend & Systems",
    icon: <Code2 className="w-6 h-6" />,
    items: [
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/05998B" },
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" }
    ]
  },
  {
    title: "AI & Automation",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/412991" },
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/white" },
      { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/white" },
      { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      { name: "Agents", logo: "https://cdn.simpleicons.org/anthropic/white" }
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: <Layers className="w-6 h-6" />,
    items: [
      { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/white" },
      { name: "Terraform", logo: "https://cdn.simpleicons.org/terraform/7B42BC" },
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/white" }
    ]
  }
];

const secondaryIcons = [
  "Figma", "Stripe", "Docker", "Git", "Kubernetes", "Sentry", "Postman", "Linux", "MongoDB", "Slack", "Discord", "Vite"
];

const StackPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none mb-10"
          >
            ENGINEERING <br /> <span className="text-[#CCFF00]">STACK.</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-xl md:text-3xl max-w-3xl font-medium leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            Je choisis les outils non pas par tendance, mais pour leur capacité à résoudre des problèmes d'affaires complexes à l'échelle.
          </motion.p>
        </header>

        {/* Marquee Défilant */}
        <div className="mb-32 py-10 border-y border-zinc-800/50 relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10" />
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center whitespace-nowrap"
          >
            {[...secondaryIcons, ...secondaryIcons, ...secondaryIcons].map((icon, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <img
                  src={`https://cdn.simpleicons.org/${icon.toLowerCase()}/${isDark ? '666666' : '333333'}`}
                  alt={icon}
                  className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-sm font-bold uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 group-hover:text-[#CCFF00] transition-all">
                  {icon}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {techGroups.map((group, idx) => (
            <TiltCard key={group.title} intensity={12} className="h-full">
              <div className={`p-10 md:p-12 rounded-[3rem] border-2 transition-colors relative group h-full ${isDark
                  ? 'bg-zinc-900/40 border-zinc-800/50 hover:border-[#CCFF00]/50'
                  : 'bg-white border-zinc-100 hover:border-[#CCFF00]'
                }`}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-[#CCFF00] rounded-2xl text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                    {group.icon}
                  </div>
                  <h2 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {group.title}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {group.items.map(tech => (
                    <motion.span
                      key={tech.name}
                      whileHover={{ scale: 1.05, borderColor: "#CCFF00" }}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all cursor-default ${isDark
                          ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-[#CCFF00]'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-black'
                        }`}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className={`w-4 h-4 ${tech.name === 'Next.js' || tech.name === 'GitHub' || tech.name === 'Three.js' ? 'invert opacity-80' : ''}`}
                      />
                      {tech.name}
                    </motion.span>
                  ))}
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 pointer-events-none group-hover:bg-[#CCFF00]/5 transition-colors duration-500 rounded-[3rem]" />
              </div>
            </TiltCard>
          ))}
        </div>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`mt-40 p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden group ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          {/* Subtle animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CCFF00] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />

          <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9] relative z-10">
            "PAS DE DETTE <br /> TECHNIQUE. <br /> JUSTE DE LA VALEUR."
          </h2>
          <p className="text-sm md:text-xl opacity-60 max-w-2xl mx-auto uppercase font-black tracking-[0.3em] leading-relaxed relative z-10">
            Chaque architecture est pensée pour être maintenable, scalable et orientée vers l'utilisateur final.
          </p>
        </motion.section>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
};

export default StackPage;
