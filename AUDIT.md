# AUDIT PORTFOLIO — Plan de correction

## 🔴 CRITIQUE — Sécurité

- [ ] **S1** — Webhook sans rate-limiting (`deploy.php` sur le serveur)
- [ ] **S2** — Email `guilganee@gmail.com` hardcodé dans `services/emailService.ts:79` (visible dans le bundle JS)
- [ ] **S3** — Fichier `public/test-emailjs.js` déployé en production (potentielles clés exposées)
- [ ] **S4** — Liens Instagram avec paramètres de tracking personnels dans `pages/ContactPage.tsx` et `components/Footer.tsx`

## 🔴 CRITIQUE — SEO & Référencement

- [ ] **SEO1** — `BASE_URL = 'https://mohamedpouye.dev'` dans `components/SEO.tsx` → doit être `https://momo.terangadev.com`
- [ ] **SEO2** — `public/sitemap.xml` pointe vers `mohamedpouye.dev` partout
- [ ] **SEO3** — `public/robots.txt` pointe vers le mauvais sitemap
- [ ] **SEO4** — SPA React sans pré-rendu (SSR/SSG) = SEO faible
- [ ] **SEO5** — Route 404 renvoie HTTP 200 au lieu de 404 réel (`App.tsx`)
- [ ] **SEO6** — Meta OG/Twitter en double entre `index.html` et `components/SEO.tsx` (Helmet)

## 🟠 IMPORTANT — Performance

- [ ] **P1** — Three.js = 318KB gzippé pour un simple cercle photo + sphère transparente
- [ ] **P2** — Vidéos MP4 dans dist (261MB total !). Externaliser sur CDN ou compresser
- [ ] **P3** — Images en double format (.png ET .webp). Supprimer les .png inutiles
- [ ] **P4** — CSS dupliqué dans `src/index.css` (blocs écrits 2 fois : `::selection`, scrollbar, `@keyframes noise`)
- [ ] **P5** — `index.html` contient ~80 lignes de styles inline qui sont aussi dans `index.css`
- [ ] **P6** — Pas de CDN (assets servis directement depuis O2switch)
- [ ] **P7** — Warning build `/index.css doesn't exist at build time` — import `./src/index.css` dans `index.tsx` résolu au runtime

## 🟠 IMPORTANT — Code mort / Fichiers inutiles

- [ ] **D1** — `services/formspreeService.ts` jamais importé → supprimer
- [ ] **D2** — `services/web3FormService.ts` jamais importé → supprimer
- [ ] **D3** — `services/web3formsService.ts` jamais importé (doublon de D2) → supprimer
- [ ] **D4** — `components/FileUpload.tsx` jamais importé → supprimer
- [ ] **D5** — `utils/fileUtils.ts` utilisé uniquement par FileUpload (mort aussi) → supprimer
- [ ] **D6** — `public/_redirects` fichier Netlify/Vercel, inutile sur O2switch → supprimer
- [ ] **D7** — `mouhamed-photo.jpg` (129 octets) probablement corrompu/placeholder → vérifier et supprimer

## 🟡 MOYEN — Contenu & Pertinence

- [ ] **C1** — Tous les projets datent de 2024 — ajouter projets récents (2025-2026)
- [ ] **C2** — URLs live des projets probablement mortes (`sap-station-demo.mohamedpouye.dev`, etc.)
- [ ] **C3** — Mélange FR/EN incohérent (nav en anglais, contenu en français, SEO cible FR/SN)
- [ ] **C4** — Stats "20+ Clients" et "2 Années" vagues et non vérifiables
- [ ] **C5** — Pas de CV/PDF téléchargeable
- [ ] **C6** — Pas de témoignages clients
- [ ] **C7** — Section "Orchestration de l'IA" sans projet IA démontré

## 🟡 MOYEN — Accessibilité & UX

- [ ] **A1** — Navbar transparente illisible en scroll sur certaines sections (ex: section jaune)
- [ ] **A2** — CTA "About" utilise `onClick` + `window.location.href` au lieu d'un `<a>` (`AboutPage.tsx`)
- [ ] **A3** — Custom cursor masque le curseur natif (gêne les utilisateurs non-tech)
- [ ] **A4** — Vidéos sans sous-titres ni description textuelle
- [ ] **A5** — Contraste insuffisant en mode light (`text-zinc-400`/`text-zinc-500` sur `bg-zinc-50`)
- [ ] **A6** — Thème non sauvegardé en `localStorage` (reset à chaque rechargement)
- [ ] **A7** — Thème ne respecte pas `prefers-color-scheme` (force dark par défaut)

## 🟢 MINEUR — Qualité de code

- [ ] **Q1** — Déclarations JSX en double dans `components/Experience3D.tsx` (`declare global` + `declare module`)
- [ ] **Q2** — `useEffect` avec dépendance constante dans `pages/AboutPage.tsx`
- [ ] **Q3** — PWA manifest référence des icônes inexistantes (`favicon-32x32.png`, `apple-touch-icon.png`)

---

## Ordre de correction recommandé

1. **SEO1 + SEO2 + SEO3** — Corriger le domaine partout
2. **D1-D7** — Supprimer les fichiers morts
3. **S2 + S3 + S4** — Nettoyage sécurité
4. **P4 + P5 + P7** — CSS dupliqué et fix build
5. **P3** — Supprimer les PNG doublons
6. **P2** — Externaliser/compresser les vidéos
7. **SEO6** — Nettoyer les meta en double dans index.html
8. **A1 + A6 + A7** — Navbar backdrop + thème localStorage
9. **A2 + A5** — Fixes accessibilité
10. **Q1 + Q2 + Q3** — Nettoyage code mineur
11. **C1-C7** — Améliorations contenu (à traiter au fil du temps)
12. **SEO4 + P1 + P6 + S1** — Optimisations infra (SSR, CDN, rate-limit)
