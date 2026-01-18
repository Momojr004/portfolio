CAHIER DES CHARGES TECHNIQUE & CRÉATIF
Projet : Portfolio "Site of the Day" Awwwards Client : Mouhamed Pouye (Momo) Vision : "Business First, Code Second"

1. VISION & OBJECTIFS
Créer une expérience web immersive qui positionne Momo non pas comme un simple exécutant technique, mais comme un partenaire stratégique. Le site doit rompre avec les clichés du développeur (pas de code matrix, pas de setup gaming sombre) pour aller vers une esthétique Agence / Architecture / Produit.

Target : Fondateurs, Startups, Décideurs Business.

Message Clé : "Je transforme des idées claires en applications rentables."

Tone of Voice : Confiant, Direct, Sans Jargon, Humain.

2. DIRECTION ARTISTIQUE (UI/UX)
A. Le Style : "Swiss Brutalism Meets High-Tech"
Minimalisme Musclé : Des typographies énormes, des grilles structurées, beaucoup d'espace négatif.

Atmosphère : Premium, Sérieuse, mais "Smooth".

B. Palette de Couleurs & Thèmes
Le site possède deux modes distincts avec un accent commun.

Accent Color (La Marque) : #CCFF00 (Vert Acide / Lime Digital).

Dark Mode (Défaut) :

Fond : #0B0B0B (Noir Profond, presque éteint).

Texte : #FFFFFF (Blanc Pur) et #A1A1A1 (Gris Acier).

Light Mode (Toggle) :

Fond : #F5F5F0 (Beige Sable / Papier "Off-White").

Texte : #1A1A1A (Noir Charbon).

Note : L'accent Vert Acide doit rester vibrant sur le beige.

C. Typographie
Titres (Headings) : Inter (ou Grotesk), Weight: Black (900). Tight tracking (lettres serrées).

Corps (Body) : Inter, Weight: Regular/Medium. Très lisible.

D. Le "Wow Factor" (Micro-interactions)
Custom Cursor : Un cercle qui suit la souris, change de taille sur les liens, et inverse les couleurs du texte survolé (mix-blend-mode: difference).

Noise Overlay : Un grain subtil animé sur tout le site pour texture "Film/Cinéma".

Smooth Scroll : Utilisation de Lenis pour un défilement soyeux.

3. ARCHITECTURE TECHNIQUE
Framework : React 19 (Structure Next.js App Router recommandée).

Styling : Tailwind CSS (pour la rapidité et le responsive).

Animations : Framer Motion (Transitions de pages, apparitions textes).

3D / WebGL : React Three Fiber (@react-three/fiber, @react-three/drei).

Navigation : React Router (SPA) avec transitions fluides (AnimatePresence).

4. SPÉCIFICATIONS FONCTIONNELLES (PAGE PAR PAGE)
A. GLOBAL (Header & Footer)
Navbar : Flottante ou fixe. Logo "MOMO." à gauche. Liens (Home, Work, Stack, About) au centre. Toggle "Soleil/Lune" à droite + Bouton CTA "Contact".

Footer : Enorme Typo "LET'S BUILD VALUE." Lien mail direct. Liens sociaux minimalistes.

B. PAGE D'ACCUEIL (HOME)
Hero Section :

Gauche : Titre Massif "JE PARLE BUSINESS AVANT DE PARLER CODE."

Droite (3D) : "The Crystal Orb". Un icosaèdre ou sphère en verre réfractif (transparent, pas noir) qui tourne lentement. À l'intérieur du verre : Une photo portrait de Momo.

Services (Expertise) : 3 Cartes (Product, Fullstack, AI). Interaction : Bordure devient verte + léger lift au survol.

Selected Work (Teaser) : Liste des projets. Au survol du titre, une image de prévisualisation apparaît.

Process : 3 Étapes (Discovery, Build, Scale) reliées par une ligne qui se dessine au scroll.

C. PAGE PROJETS (WORK)
Concept : "Cinematic Gallery".

Contenu : Grille déstructurée de cartes (Décalage gauche/droite).

Cards : Au lieu d'images fixes, utilisation de balises <video autoplay loop muted>.

État repos : Noir & Blanc + Assombri.

État survol : Couleurs vives + Zoom léger + Curseur "View Case".

Navigation : Clic sur une carte = Transition fluide vers la page Détail.

D. PAGE DÉTAIL PROJET (CASE STUDY)
Header : Vidéo full-width immersive.

Infos : Colonne gauche (Client, Rôle, Stack). Colonne Droite (Challenge, Solution).

Galerie : Screenshots ou démos interactives.

Navigation : Bouton "Next Project" en bas. Bouton "Back to Projects" qui renvoie bien à /work.

E. PAGE STACK (TECH)
Layout : Grille bento de cartes (Frontend, Backend, AI, DevOps).

Design :

Ajout des icônes SVG (React, Node, AWS, etc.) pour chaque techno.

Effet 3D : Effet "Tilt" (Inclinaison) sur les cartes au mouvement de la souris (Glare effect).

Marquee : Bandeau défilant infini sous le titre avec les outils secondaires.

F. PAGE À PROPOS (ABOUT)
Concept : "The Human Behind the Code".

Structure : Masonry Grid / Bento Grid (Mélange photos & textes).

Contenu :

Photo principale (Lifestyle/Pro).

Bloc "Stats" (Années d'XP).

Bloc "Story" (Philosophie Business).

Photos secondaires (Passions, Setup, Sport) pour humaniser.

5. PERFORMANCE & SEO
Lazy Loading : Les vidéos et la 3D ne doivent pas bloquer le chargement initial.

SEO : Balises Meta dynamiques pour chaque page (Titre, Description).

Responsivité : Le site doit être parfait sur Mobile (La 3D passe en arrière-plan ou se simplifie, les grilles passent en 1 colonne).

Ce document est la source de vérité pour la suite du développement.