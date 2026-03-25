
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { TiltCard } from '../components/TiltCard';
import TechIcon from '../components/TechIcon';
import { Layers, Code2, Cpu, Globe, Rocket, Terminal, Database, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const techGroups = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-6 h-6" />,
    items: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Flutter", logo: "https://cdn.simpleicons.org/flutter/02569B" },
      { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "shadcn/ui", logo: "https://cdn.simpleicons.org/shadcnui/white" },
      { name: "Bootstrap", logo: "https://cdn.simpleicons.org/bootstrap/7952B3" },
      { name: "Ant Design", logo: "https://cdn.simpleicons.org/antdesign/0170FE" }
    ]
  },
  {
    title: "Backend & API",
    icon: <Code2 className="w-6 h-6" />,
    items: [
      { name: "Laravel", logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
      { name: "NestJS", logo: "https://cdn.simpleicons.org/nestjs/E0234E" },
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express.js", logo: "https://cdn.simpleicons.org/express/white" },
      { name: "PHP", logo: "https://cdn.simpleicons.org/php/777BB4" },
      { name: "Eloquent ORM", logo: "https://cdn.simpleicons.org/laravel/FF2D20" }
    ]
  },
  {
    title: "Database & Storage",
    icon: <Database className="w-6 h-6" />,
    items: [
      { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "SQLite", logo: "https://cdn.simpleicons.org/sqlite/003B57" },
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" }
    ]
  },
  {
    title: "Business & Tools",
    icon: <Rocket className="w-6 h-6" />,
    items: [
      { name: "Laravel Sanctum", logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
      { name: "TanStack Query", logo: "https://cdn.simpleicons.org/reactquery/FF4154" },
      { name: "Vite", logo: "https://cdn.simpleicons.org/vite/646CFF" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "JWT", logo: "https://cdn.simpleicons.org/jsonwebtokens/white" },
      { name: "Swagger", logo: "https://cdn.simpleicons.org/swagger/85EA2D" },
      { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" }
    ]
  }
];

const secondaryIcons = [
  "Laravel", "Flutter", "NestJS", "MySQL", "PostgreSQL", "Vite", "Docker", "AWS", "TypeScript", "PHP", "Tailwindcss", "Git", "Bootstrap", "Antdesign", "Express", "Postman", "Figma", "Swagger"
];

const StackPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <SEO
        title="Stack Technique - Mouhamed Pouye"
        description="Stack technique de Mouhamed Pouye : React, Laravel, Flutter, NestJS, PostgreSQL, AWS. Technologies orientées business pour la digitalisation des PME africaines."
        keywords="stack technique, react, laravel, flutter, nestjs, postgresql, mongodb, aws, docker, tailwind css, développeur full-stack dakar"
      />
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
              className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter leading-none mb-10"
            >
              ENGINEERING <br /> <span className="text-[#F5B731]">STACK.</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`text-xl md:text-3xl max-w-3xl font-medium leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
            >
              Stack orientée business : Laravel pour la robustesse backend, React/Flutter pour l'UX, et des bases de données adaptées aux besoins africains.
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
                  <TechIcon
                    name={icon}
                    fallbackUrl={`https://cdn.simpleicons.org/${icon.toLowerCase()}/${isDark ? '666666' : '333333'}`}
                    size={24}
                    className="grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-sm font-bold uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 group-hover:text-[#F5B731] transition-all">
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
                  ? 'bg-zinc-900/40 border-zinc-800/50 hover:border-[#F5B731]/50'
                  : 'bg-white border-zinc-100 hover:border-[#F5B731]'
                  }`}>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-[#F5B731] rounded-2xl text-black shadow-[0_0_20px_rgba(245, 183, 49,0.2)]">
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
                        whileHover={{ scale: 1.05, borderColor: "#F5B731" }}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all cursor-default ${isDark
                          ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-[#F5B731]'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-black'
                          }`}
                      >
                        <TechIcon
                          name={tech.name}
                          fallbackUrl={tech.logo}
                          size={16}
                          className={`transition-all duration-300 group-hover:scale-110 ${tech.name === 'shadcn/ui' || tech.name === 'Eloquent ORM' || tech.name === 'Laravel Sanctum' || tech.name === 'Express.js' || tech.name === 'JWT' ? 'invert opacity-80' : ''}`}
                        />
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 pointer-events-none group-hover:bg-[#F5B731]/5 transition-colors duration-500 rounded-[3rem]" />
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B731] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5B731] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />

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
    </>
  );
};

export default StackPage;
