
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ThemeContext } from '../App';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  // Données des projets réels
  const projectsData: Record<string, any> = {
    'sap-station': {
      title: 'SAP STATION MANAGER',
      year: '2024',
      client: 'Franchise Stations-Service Sénégal',
      role: 'Frontend Developer (Prestataire)',
      stack: ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'AWS'],
      desc: 'Digitalisation complète du processus de gestion d\'une franchise de station-service basée au Sénégal. Interface de gestion des ventes, stocks, employés et rapports financiers.',
      solution: 'Architecture React modulaire avec API Laravel pour gérer les opérations quotidiennes : ventes de carburant, gestion des stocks, suivi des employés, et génération de rapports en temps réel.',
      video: '/gallerie/vidéos/sap-demo.mp4',
      liveUrl: 'https://sap-station-demo.mohamedpouye.dev',
      features: ['Gestion des ventes', 'Suivi des stocks', 'Tableau de bord admin', 'Rapports financiers'],
      galleryImages: ['/gallerie/photos/sap_001.png', '/gallerie/photos/sap_002.png']
    },
    'ecomed24': {
      title: 'ECOMED24 PLATFORM',
      year: '2024',
      client: 'EcoMed24',
      role: 'Full Stack Developer',
      stack: ['Node.js', 'React', 'MySQL', 'AWS'],
      desc: 'Écosystème de santé numérique multidisciplinaire pour les professionnels de santé en Afrique.',
      solution: 'Plateforme intégrée avec téléconsultation, gestion des dossiers patients, collaboration entre professionnels et digitalisation des flux financiers.',
      video: '/gallerie/vidéos/demo_ecomed24.mp4',
      liveUrl: 'https://ecomed24.com',
      features: ['Téléconsultation', 'Dossiers patients', 'Collaboration médicale', 'Flux financiers'],
      galleryImages: ['/gallerie/photos/ecomed_001.png', '/gallerie/photos/ecomed_002.png']
    },
    'restaurant-manager': {
      title: 'RESTAURANT MANAGER',
      year: '2024',
      client: 'Chaînes de Restaurants',
      role: 'Full Stack Developer (100%)',
      stack: ['Flutter', 'NestJS', 'PostgreSQL', 'MongoDB'],
      desc: 'Application complète de gestion pour restaurants avec interface de supervision pour propriétaires et console admin.',
      solution: 'Architecture hybride avec base de données mixte, gestion des abonnements, et tableau de bord multi-niveaux pour gérants et propriétaires.',
      video: '/gallerie/vidéos/demo_restaurant.mp4',
      liveUrl: 'https://restaurant-manager-demo.mohamedpouye.dev',
      features: ['Gestion commandes', 'Supervision multi-restaurants', 'Console admin', 'Gestion abonnements'],
      galleryImages: ['/gallerie/photos/restau_001.png', '/gallerie/photos/restau_002.png']
    },
    'khayroukoum': {
      title: 'KHAYROUKOUM',
      year: '2024',
      client: 'Projets Humanitaires',
      role: 'Architecte Full Stack',
      stack: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'SQLite/MySQL'],
      desc: 'Plateforme web complète dédiée à la gestion des projets d\'accès à l\'eau potable en milieu rural.',
      solution: 'Architecture MVC moderne avec Laravel 12 et React 18.3, utilisant Eloquent ORM et Laravel Sanctum pour l\'authentification. Interface construite avec shadcn/ui et TanStack Query pour une gestion d\'état optimisée.',
      video: '/gallerie/vidéos/demo_khayroukoum.mp4',
      liveUrl: 'https://khayroukoum.org',
      features: ['Gestion projets hydrauliques', 'Suivi financements', 'Rôles avancés', 'API REST documentée'],
      galleryImages: ['/gallerie/photos/khayroukoum001.png', '/gallerie/photos/khayroukoum002.png']
    }
  };

  const project = projectsData[id || ''] || {
    title: 'PROJECT NOT FOUND',
    year: '2024',
    client: 'Unknown',
    role: 'Developer',
    stack: [],
    desc: 'Projet non trouvé.',
    solution: '',
    video: '',
    features: [],
    galleryImages: []
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
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </button>
        <span className="text-xs font-bold opacity-40 uppercase tracking-[0.2em]">Case Study / {project.year}</span>
      </div>

      {/* Hero Video Section */}
      <div className="w-full h-[70vh] bg-zinc-900 mb-20 overflow-hidden relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          className="w-full h-full object-contain opacity-90"
          onError={(e) => {
            console.error('Erreur de chargement vidéo:', project.video);
            e.currentTarget.style.display = 'none';
            // Afficher le fallback en cas d'erreur
            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-content');
            if (fallback) fallback.classList.remove('hidden');
          }}
          onLoadedData={(e) => {
            // Masquer le fallback quand la vidéo se charge
            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-content');
            if (fallback) fallback.classList.add('hidden');
            // Accélérer la vidéo à x2
            e.currentTarget.playbackRate = 2;
          }}
        >
          <source src={project.video} type="video/mp4" />
          <source src={project.video} type="video/webm" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>

        {/* Fallback image si vidéo ne charge pas - masqué par défaut */}
        <div className="fallback-content absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-400 mb-4">Aperçu du projet</p>
            <div className="w-32 h-32 bg-[#CCFF00] rounded-2xl flex items-center justify-center">
              <span className="text-black font-black text-4xl">{project.title.charAt(0)}</span>
            </div>
          </div>
        </div>

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
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>Client</h4>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{project.client}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>Mon Rôle</h4>
            <p className="text-lg font-bold text-[#CCFF00]">{project.role}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>Stack Technique</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s: string) => (
                <span key={s} className={`px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-wider ${isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-300 text-zinc-700'}`}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>Fonctionnalités Clés</h4>
            <ul className="space-y-2">
              {project.features.map((feature: string) => (
                <li key={feature} className={`flex items-center gap-2 text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.a
            href={project.liveUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all cursor-pointer"
          >
            Voir le Live <ExternalLink size={14} />
          </motion.a>
        </div>

        {/* Content Area */}
        <div className="md:col-span-8">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-none ${isDark ? 'text-white' : 'text-zinc-900'}`}
          >
            {project.title}
          </motion.h1>

          <div className={`space-y-10 text-xl md:text-2xl font-medium leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className={`text-white ${isDark ? '' : 'text-zinc-900'}`}
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
            {project.galleryImages.map((imageSrc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl overflow-hidden bg-zinc-900 aspect-video"
              >
                <img
                  src={imageSrc}
                  alt={`${project.title} - Screenshot ${index + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
