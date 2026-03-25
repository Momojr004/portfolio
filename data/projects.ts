// Types pour les projets
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    img: string;
}

export interface WorkProject {
    id: string;
    title: string;
    category: string;
    description: string;
    video: string;
}

export interface ProjectDetails extends Project {
    year: string;
    client: string;
    role: string;
    stack: string[];
    desc: string;
    solution: string;
    video: string;
    liveUrl?: string;
    features: string[];
    galleryImages: string[];
}

// Données des projets pour la liste (utilisé dans Projects.tsx, WorkPage.tsx)
export const projects: Project[] = [
    {
        id: 'sap-station',
        title: 'SAP STATION MANAGER',
        category: 'Digitalisation / B2B',
        description: 'Gestion digitale des franchises de stations-service au Sénégal',
        img: '/gallerie/photos/sap-preview.webp'
    },
    {
        id: 'ecomed24',
        title: 'ECOMED24 PLATFORM',
        category: 'Santé Numérique / B2B',
        description: 'Écosystème de santé numérique pour l\'Afrique',
        img: '/gallerie/photos/ecomed_preview.webp'
    },
    {
        id: 'restaurant-manager',
        title: 'RESTAURANT MANAGER',
        category: 'Gestion / B2B',
        description: 'Solution complète de gestion pour restaurants et chaînes',
        img: '/gallerie/photos/restaurant_preview.webp'
    },
    {
        id: 'khayroukoum',
        title: 'KHAYROUKOUM',
        category: 'Humanitaire / B2B',
        description: 'Plateforme web dédiée à la gestion des projets d\'accès à l\'eau potable',
        img: '/gallerie/photos/preview_khayroukoum.webp'
    }
];

// Données détaillées des projets (utilisé dans ProjectDetails.tsx)
export const projectsData: Record<string, ProjectDetails> = {
    'sap-station': {
        id: 'sap-station',
        title: 'SAP STATION MANAGER',
        category: 'Digitalisation / B2B',
        description: 'Gestion digitale des franchises de stations-service au Sénégal',
        img: '/gallerie/photos/sap-preview.webp',
        year: '2024',
        client: 'Franchise Stations-Service Sénégal',
        role: 'Frontend Developer (Prestataire)',
        stack: ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'AWS'],
        desc: 'Digitalisation complète du processus de gestion d\'une franchise de station-service basée au Sénégal. Interface de gestion des ventes, stocks, employés et rapports financiers.',
        solution: 'Architecture React modulaire avec API Laravel pour gérer les opérations quotidiennes : ventes de carburant, gestion des stocks, suivi des employés, et génération de rapports en temps réel.',
        video: '/gallerie/vidéos/sap-demo.mp4',
        liveUrl: 'https://sap-station-demo.mohamedpouye.dev',
        features: ['Gestion des ventes', 'Suivi des stocks', 'Tableau de bord admin', 'Rapports financiers'],
        galleryImages: ['/gallerie/photos/sap_001.webp', '/gallerie/photos/sap_002.webp']
    },
    'ecomed24': {
        id: 'ecomed24',
        title: 'ECOMED24 PLATFORM',
        category: 'Santé Numérique / B2B',
        description: 'Écosystème de santé numérique pour l\'Afrique',
        img: '/gallerie/photos/ecomed_preview.webp',
        year: '2024',
        client: 'EcoMed24',
        role: 'Full Stack Developer',
        stack: ['Node.js', 'React', 'MySQL', 'AWS'],
        desc: 'Écosystème de santé numérique multidisciplinaire pour les professionnels de santé en Afrique.',
        solution: 'Plateforme intégrée avec téléconsultation, gestion des dossiers patients, collaboration entre professionnels et digitalisation des flux financiers.',
        video: '/gallerie/vidéos/demo_ecomed24.mp4',
        liveUrl: 'https://ecomed24.com',
        features: ['Téléconsultation', 'Dossiers patients', 'Collaboration médicale', 'Flux financiers'],
        galleryImages: ['/gallerie/photos/ecomed_001.webp', '/gallerie/photos/ecomed_002.webp']
    },
    'restaurant-manager': {
        id: 'restaurant-manager',
        title: 'RESTAURANT MANAGER',
        category: 'Gestion / B2B',
        description: 'Solution complète de gestion pour restaurants et chaînes',
        img: '/gallerie/photos/restaurant_preview.webp',
        year: '2024',
        client: 'Chaînes de Restaurants',
        role: 'Full Stack Developer (100%)',
        stack: ['Flutter', 'NestJS', 'PostgreSQL', 'MongoDB'],
        desc: 'Application complète de gestion pour restaurants avec interface de supervision pour propriétaires et console admin.',
        solution: 'Architecture hybride avec base de données mixte, gestion des abonnements, et tableau de bord multi-niveaux pour gérants et propriétaires.',
        video: '/gallerie/vidéos/demo_restaurant.mp4',
        liveUrl: 'https://restaurant-manager-demo.mohamedpouye.dev',
        features: ['Gestion commandes', 'Supervision multi-restaurants', 'Console admin', 'Gestion abonnements'],
        galleryImages: ['/gallerie/photos/restau_001.webp', '/gallerie/photos/restau_002.webp']
    },
    'khayroukoum': {
        id: 'khayroukoum',
        title: 'KHAYROUKOUM',
        category: 'Humanitaire / B2B',
        description: 'Plateforme web dédiée à la gestion des projets d\'accès à l\'eau potable',
        img: '/gallerie/photos/preview_khayroukoum.webp',
        year: '2024',
        client: 'Projets Humanitaires',
        role: 'Architecte Full Stack',
        stack: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'SQLite/MySQL'],
        desc: 'Plateforme web complète dédiée à la gestion des projets d\'accès à l\'eau potable en milieu rural.',
        solution: 'Architecture MVC moderne avec Laravel 12 et React 18.3, utilisant Eloquent ORM et Laravel Sanctum pour l\'authentification. Interface construite avec shadcn/ui et TanStack Query pour une gestion d\'état optimisée.',
        video: '/gallerie/vidéos/demo_khayroukoum.mp4',
        liveUrl: 'https://khayroukoum.org',
        features: ['Gestion projets hydrauliques', 'Suivi financements', 'Rôles avancés', 'API REST documentée'],
        galleryImages: ['/gallerie/photos/khayroukoum001.webp', '/gallerie/photos/khayroukoum002.webp']
    }
};

// Helper pour récupérer un projet par ID
export const getProjectById = (id: string): ProjectDetails | null => {
    return projectsData[id] || null;
};

// Helper pour récupérer tous les projets
export const getAllProjects = (): Project[] => {
    return projects;
};

// Helper pour récupérer les projets avec vidéos (WorkPage)
export const getWorkProjects = (): WorkProject[] => {
    return Object.values(projectsData).map(project => ({
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        video: project.video
    }));
};