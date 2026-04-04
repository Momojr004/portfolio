# AUDIT PORTFOLIO — Plan de correction

## 🔴 CRITIQUE — Sécurité

- [x] **S1** — ~~Webhook sans rate-limiting~~ → rate-limit 60s par fichier + HMAC SHA256 dans deploy.php
- [x] **S2** — ~~Email `guilganee@gmail.com` hardcodé~~ → remplacé par variable env
- [x] **S3** — ~~Fichier `public/test-emailjs.js`~~ → supprimé
- [x] **S4** — ~~Liens Instagram avec tracking params~~ → nettoyés

## 🔴 CRITIQUE — SEO & Référencement

- [x] **SEO1** — ~~`BASE_URL = 'https://mohamedpouye.dev'`~~ → corrigé vers `https://momo.terangadev.com`
- [x] **SEO2** — ~~`public/sitemap.xml` pointe vers `mohamedpouye.dev`~~ → corrigé
- [x] **SEO3** — ~~`public/robots.txt` pointe vers le mauvais sitemap~~ → corrigé
- [ ] **SEO4** — SPA React sans pré-rendu (SSR/SSG) = SEO faible
- [x] **SEO5** — ~~Route 404 renvoie HTTP 200~~ → .htaccess ne réécrit que les routes connues, ErrorDocument 404 pour le reste
- [x] **SEO6** — ~~Meta OG/Twitter en double~~ → supprimées de index.html, Helmet gère tout

## 🟠 IMPORTANT — Performance

- [ ] **P1** — Three.js = 318KB gzippé pour un simple cercle photo + sphère transparente
- [x] **P2** — ~~Vidéos 253MB~~ → compressées à 11MB (-96%)
- [x] **P3** — ~~Images PNG doublons~~ → supprimées (uniquement .webp conservés)
- [x] **P4** — ~~CSS dupliqué~~ → nettoyé
- [x] **P5** — ~~Styles inline dans index.html~~ → réduit au critical CSS
- [ ] **P6** — Pas de CDN (assets servis directement depuis O2switch)
- [x] **P7** — ~~Warning build `/index.css`~~ → corrigé, supprimé le link inutile

## 🟠 IMPORTANT — Code mort / Fichiers inutiles

- [x] **D1** — ~~`services/formspreeService.ts`~~ → supprimé
- [x] **D2** — ~~`services/web3FormService.ts`~~ → supprimé
- [x] **D3** — ~~`services/web3formsService.ts`~~ → supprimé
- [x] **D4** — ~~`components/FileUpload.tsx`~~ → supprimé
- [x] **D5** — ~~`utils/fileUtils.ts`~~ → supprimé
- [x] **D6** — ~~`public/_redirects`~~ → supprimé
- [x] **D7** — ~~`mouhamed-photo.jpg`~~ → supprimé (129 octets, corrompu)

## 🟡 MOYEN — Contenu & Pertinence

- [ ] **C1** — Tous les projets datent de 2024 — ajouter projets récents (2025-2026)
- [x] **C2** — ~~URLs live mortes~~ → supprimées (liveUrl: undefined) ou corrigées vers domaines actifs
- [ ] **C3** — Mélange FR/EN incohérent (nav en anglais, contenu en français, SEO cible FR/SN)
- [ ] **C4** — Stats "20+ Clients" et "2 Années" vagues et non vérifiables
- [ ] **C5** — Pas de CV/PDF téléchargeable
- [ ] **C6** — Pas de témoignages clients
- [ ] **C7** — Section "Orchestration de l'IA" sans projet IA démontré

## 🟡 MOYEN — Accessibilité & UX

- [x] **A1** — ~~Navbar transparente~~ → backdrop-blur ajouté
- [x] **A2** — ~~CTA `onClick`~~ → remplacé par `<a>` sémantique
- [x] **A3** — ~~Custom cursor masque le curseur natif~~ → les deux curseurs coexistent, natif visible
- [ ] **A4** — Vidéos sans sous-titres ni description textuelle
- [x] **A5** — ~~Contraste insuffisant text-zinc-400/500~~ → upgradé zinc-500→zinc-400 (dark) + ajout isDark conditionnels partout
- [x] **A6** — ~~Thème non sauvegardé~~ → localStorage implémenté
- [x] **A7** — ~~Thème ne respecte pas `prefers-color-scheme`~~ → détection auto ajoutée

## 🟢 MINEUR — Qualité de code

- [x] **Q1** — ~~Déclarations JSX en double~~ → supprimées
- [x] **Q2** — ~~`useEffect` avec dépendance constante~~ → images déplacées hors du composant, deps correctes
- [x] **Q3** — ~~PWA manifest icônes inexistantes~~ → nettoyé

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
