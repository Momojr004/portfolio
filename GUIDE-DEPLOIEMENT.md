# Guide de déploiement — Portfolio React sur O2switch avec CI/CD

> Ce document décrit le processus complet pour déployer un portfolio React (Vite) sur un hébergement mutualisé O2switch, avec un pipeline CI/CD automatisé via webhook GitHub.

---

## Table des matières

1. [Prérequis](#1-prérequis)
2. [Configuration du serveur O2switch](#2-configuration-du-serveur-o2switch)
3. [Cloner le repo et installer Node.js](#3-cloner-le-repo-et-installer-nodejs)
4. [Premier build manuel](#4-premier-build-manuel)
5. [Déploiement vers public_html](#5-déploiement-vers-public_html)
6. [Configuration Apache (.htaccess)](#6-configuration-apache-htaccess)
7. [Sous-domaine et SSL](#7-sous-domaine-et-ssl)
8. [CI/CD — Script de déploiement automatique](#8-cicd--script-de-déploiement-automatique)
9. [CI/CD — Webhook PHP](#9-cicd--webhook-php)
10. [CI/CD — Configuration du webhook GitHub](#10-cicd--configuration-du-webhook-github)
11. [Vérification et debug](#11-vérification-et-debug)
12. [Résumé de l'architecture](#12-résumé-de-larchitecture)

---

## 1. Prérequis

| Élément | Détails |
|---|---|
| Hébergement | O2switch (mutualisé, cPanel) |
| Accès | Terminal cPanel (pas SSH direct si bloqué par le réseau) |
| Repo GitHub | `https://github.com/Momojr004/portfolio.git` (public) |
| Domaine | `momo.terangadev.com` (sous-domaine) |
| Stack | React 19 + Vite 6 + TypeScript |

### Informations serveur O2switch

```
Serveur     : vermont.o2switch.net
cPanel      : https://vermont.o2switch.net:2083
Utilisateur : sc3emlc9189
Home        : /home3/sc3emlc9189/
public_html : /home3/sc3emlc9189/public_html/
```

> **Note :** Le port SSH 22 peut être bloqué selon votre réseau local. Dans ce cas, utiliser le **Terminal cPanel** (cPanel → Avancé → Terminal).

---

## 2. Configuration du serveur O2switch

### Accéder au terminal

1. Se connecter à cPanel : `https://vermont.o2switch.net:2083`
2. Aller dans **Avancé → Terminal**
3. Vous êtes dans `/home3/sc3emlc9189/`

### Vérifier l'environnement

```bash
# Vérifier la version de PHP
php -v

# Vérifier si git est disponible
git --version

# Vérifier l'espace disque
df -h ~
```

---

## 3. Cloner le repo et installer Node.js

### Installer nvm + Node.js

O2switch n'a pas Node.js par défaut. On installe via **nvm** :

```bash
# Installer nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Recharger le profil
source ~/.bashrc

# Installer Node.js LTS
nvm install 20
nvm use 20
nvm alias default 20

# Vérifier
node -v   # → v20.x.x
npm -v    # → 10.x.x
```

### Cloner le repository

```bash
cd ~
git clone https://github.com/Momojr004/portfolio.git
cd portfolio
```

### Installer les dépendances

```bash
npm install

# Terser est nécessaire pour la minification Vite
npm install terser --save-dev
```

---

## 4. Premier build manuel

```bash
cd ~/portfolio
npm run build
```

Le build génère le dossier `dist/` contenant :
- `index.html` — point d'entrée SPA
- `assets/` — JS, CSS, images (noms hashés pour le cache)

Vérifier que le build est OK :

```bash
ls -la dist/
# Vous devez voir index.html et le dossier assets/
```

---

## 5. Déploiement vers public_html

Copier le contenu de `dist/` vers `public_html/` avec rsync :

```bash
rsync -av --delete \
  --exclude 'webhook/' \
  --exclude '.htaccess' \
  --exclude '.well-known/' \
  --exclude 'cgi-bin/' \
  ~/portfolio/dist/ ~/public_html/
```

### Exclusions importantes

| Dossier/Fichier | Raison de l'exclusion |
|---|---|
| `webhook/` | Contient `deploy.php`, ne doit pas être écrasé |
| `.htaccess` | Configuration Apache personnalisée |
| `.well-known/` | Utilisé par Let's Encrypt / AutoSSL |
| `cgi-bin/` | Dossier système Apache |

---

## 6. Configuration Apache (.htaccess)

Créer/éditer `~/public_html/.htaccess` :

```apache
# Apache SPA routing — seules les routes connues retournent HTTP 200
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Fichiers/dossiers réels → servir directement
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d [OR]
  RewriteCond %{REQUEST_FILENAME} -l
  RewriteRule . - [L]

  # Routes SPA connues → index.html (HTTP 200)
  RewriteRule ^$ /index.html [L]
  RewriteRule ^(work|stack|about|contact)/?$ /index.html [L]
  RewriteRule ^project/.+$ /index.html [L]
</IfModule>

# Routes inconnues → HTTP 404 réel avec le contenu React
ErrorDocument 404 /index.html

# Compression Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml application/xml
  AddOutputFilterByType DEFLATE application/font-woff application/font-woff2
</IfModule>

# Cache des assets statiques
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
  ExpiresByType application/json "access plus 1 week"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Headers de cache et sécurité
<IfModule mod_headers.c>
  # HTML — jamais mis en cache (le SPA a besoin d'un index.html frais)
  <FilesMatch "\.(html)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
  </FilesMatch>

  # Assets hashés (immutables)
  <FilesMatch "\.(js|css|woff2|webp|png|jpg|jpeg|svg|mp4)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # En-têtes de sécurité
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
```

> **⚠️ Important :** Ce fichier est exclu du rsync. Toute modification doit être copiée **manuellement** sur le serveur.

---

## 7. Sous-domaine et SSL

### Créer le sous-domaine

1. cPanel → **Domaines** → **Créer un nouveau domaine**
2. Domaine : `momo.terangadev.com`
3. Racine : `public_html` (même dossier que le domaine principal)

### Activer SSL (HTTPS)

1. cPanel → **Sécurité** → **SSL/TLS Status**
2. Cliquer **Run AutoSSL**
3. Attendre ~5 minutes que le certificat Let's Encrypt soit généré
4. Vérifier : `https://momo.terangadev.com` doit afficher le cadenas

---

## 8. CI/CD — Script de déploiement automatique

Créer `~/deploy.sh` sur le serveur :

```bash
#!/bin/bash
set -e

# Charger nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd ~/portfolio

# Récupérer les derniers changements
git pull origin main

# Installer les dépendances (si package.json a changé)
npm install --production=false

# Build
npm run build

# Déployer vers public_html
rsync -av --delete \
  --exclude 'webhook/' \
  --exclude '.htaccess' \
  --exclude '.well-known/' \
  --exclude 'cgi-bin/' \
  ~/portfolio/dist/ ~/public_html/

echo "Deploy complete: $(date)"
```

Rendre le script exécutable :

```bash
chmod +x ~/deploy.sh
```

### Tester le script manuellement

```bash
bash ~/deploy.sh
```

---

## 9. CI/CD — Webhook PHP

Créer le dossier et le fichier sur le serveur :

```bash
mkdir -p ~/public_html/webhook
```

Créer `~/public_html/webhook/deploy.php` :

```php
<?php
/**
 * GitHub Webhook Handler — Déclencheur de déploiement
 * Rate-limité à 1 déploiement par 60 secondes.
 */

// --- Configuration ---
$secret       = getenv('GITHUB_WEBHOOK_SECRET') ?: 'VOTRE_SECRET_ICI';
$deployScript = '/home3/sc3emlc9189/deploy.sh';
$logFile      = '/home3/sc3emlc9189/deploy.log';
$rateLimitFile = __DIR__ . '/.last_deploy';
$rateLimitSeconds = 60;

// --- Rate limiting (basé sur fichier) ---
if (file_exists($rateLimitFile)) {
    $lastDeploy = (int) file_get_contents($rateLimitFile);
    if (time() - $lastDeploy < $rateLimitSeconds) {
        http_response_code(429);
        $wait = $rateLimitSeconds - (time() - $lastDeploy);
        echo json_encode(['error' => 'Rate limited', 'retry_after' => $wait]);
        exit;
    }
}

// --- Vérifier la méthode HTTP ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// --- Vérifier la signature GitHub (HMAC SHA256) ---
$payload   = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if (empty($signature)) {
    http_response_code(403);
    echo json_encode(['error' => 'Missing signature']);
    exit;
}

$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid signature']);
    exit;
}

// --- Vérifier le type d'événement ---
$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? '';
if ($event === 'ping') {
    echo json_encode(['message' => 'pong']);
    exit;
}

if ($event !== 'push') {
    http_response_code(200);
    echo json_encode(['message' => 'Ignored event: ' . $event]);
    exit;
}

// --- Vérifier la branche (main uniquement) ---
$data = json_decode($payload, true);
$ref  = $data['ref'] ?? '';

if ($ref !== 'refs/heads/main') {
    echo json_encode(['message' => 'Ignored branch: ' . $ref]);
    exit;
}

// --- Enregistrer le timestamp (rate limit) ---
file_put_contents($rateLimitFile, (string) time());

// --- Exécuter le déploiement ---
$timestamp = date('Y-m-d H:i:s');
$output    = [];
$returnVar = 0;

exec("bash $deployScript 2>&1", $output, $returnVar);

$logEntry = "[$timestamp] Deploy triggered by push to main\n"
          . "Exit code: $returnVar\n"
          . implode("\n", $output)
          . "\n---\n";

file_put_contents($logFile, $logEntry, FILE_APPEND);

http_response_code($returnVar === 0 ? 200 : 500);
echo json_encode([
    'status'    => $returnVar === 0 ? 'success' : 'failed',
    'exit_code' => $returnVar,
    'timestamp' => $timestamp
]);
```

### Sécurité du webhook

| Protection | Mécanisme |
|---|---|
| Authentification | Signature HMAC SHA256 (secret partagé GitHub ↔ serveur) |
| Rate limiting | 1 requête / 60s (fichier `.last_deploy`) |
| Filtrage branch | Seuls les push sur `main` déclenchent le build |
| Filtrage événement | Seul l'événement `push` est traité |
| Méthode HTTP | POST uniquement |

---

## 10. CI/CD — Configuration du webhook GitHub

1. Aller sur le repo GitHub → **Settings** → **Webhooks** → **Add webhook**
2. Remplir :

| Champ | Valeur |
|---|---|
| Payload URL | `https://momo.terangadev.com/webhook/deploy.php` |
| Content type | `application/json` |
| Secret | Le même secret que dans `deploy.php` |
| Events | `Just the push event` |
| Active | ✅ Coché |

3. Cliquer **Add webhook**
4. GitHub envoie immédiatement un événement `ping` — vérifier que la réponse est `200 OK`

---

## 11. Vérification et debug

### Vérifier les logs de déploiement

```bash
# Voir les derniers déploiements
cat ~/deploy.log

# Suivre en temps réel
tail -f ~/deploy.log
```

### Tester le webhook manuellement

Depuis votre machine locale (remplacer `YOUR_SECRET`) :

```bash
curl -X POST https://momo.terangadev.com/webhook/deploy.php \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: ping" \
  -H "X-Hub-Signature-256: sha256=$(echo -n '{}' | openssl dgst -sha256 -hmac 'YOUR_SECRET' | awk '{print $2}')" \
  -d '{}'
```

### Problèmes courants

| Problème | Solution |
|---|---|
| `403 Invalid signature` | Vérifier que le secret est identique dans GitHub et `deploy.php` |
| `429 Rate limited` | Attendre 60 secondes ou supprimer `~/public_html/webhook/.last_deploy` |
| Build échoue (node not found) | Vérifier que `deploy.sh` charge bien nvm (`source $NVM_DIR/nvm.sh`) |
| Pages blanches après deploy | Vérifier que `.htaccess` est en place dans `public_html/` |
| CSS/JS 404 | Vérifier que `rsync` a bien copié `dist/assets/` |
| SSH bloqué | Utiliser le Terminal cPanel au lieu de SSH |

---

## 12. Résumé de l'architecture

```
┌──────────────────────────────────────────────────────────┐
│                     DÉVELOPPEUR LOCAL                     │
│                                                          │
│  code → git commit → git push origin main                │
└──────────────┬───────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│                        GITHUB                            │
│                                                          │
│  Reçoit le push → déclenche le webhook POST              │
│  → https://momo.terangadev.com/webhook/deploy.php        │
└──────────────┬───────────────────────────────────────────┘
               │  POST + signature HMAC SHA256
               ▼
┌──────────────────────────────────────────────────────────┐
│                    SERVEUR O2SWITCH                       │
│                                                          │
│  deploy.php                                              │
│    ├─ Vérifie la signature                               │
│    ├─ Vérifie le rate-limit (60s)                        │
│    ├─ Vérifie la branche (main)                          │
│    └─ Exécute deploy.sh                                  │
│                                                          │
│  deploy.sh                                               │
│    ├─ git pull origin main                               │
│    ├─ npm install                                        │
│    ├─ npm run build                                      │
│    └─ rsync dist/ → public_html/                         │
│                                                          │
│  public_html/                                            │
│    ├─ index.html          (SPA entry point)              │
│    ├─ assets/             (JS/CSS hashés, immutables)    │
│    ├─ gallerie/           (photos/vidéos)                │
│    ├─ .htaccess           (routing SPA + cache + sécu)   │
│    └─ webhook/deploy.php  (webhook handler)              │
└──────────────────────────────────────────────────────────┘
```

### Flux de déploiement complet

1. `git push origin main` depuis le PC local
2. GitHub envoie un POST signé au webhook
3. `deploy.php` vérifie la signature et le rate-limit
4. `deploy.sh` est exécuté : pull → install → build → rsync
5. Le site est mis à jour en ~1-2 minutes
6. Le résultat est logué dans `~/deploy.log`

---

## Fichiers clés sur le serveur

| Fichier | Chemin | Rôle |
|---|---|---|
| Code source | `~/portfolio/` | Repository git cloné |
| Script deploy | `~/deploy.sh` | Script bash de build + rsync |
| Log deploy | `~/deploy.log` | Historique des déploiements |
| Site web | `~/public_html/` | Fichiers servis par Apache |
| Webhook | `~/public_html/webhook/deploy.php` | Handler GitHub |
| Config Apache | `~/public_html/.htaccess` | Routing SPA + cache + sécurité |
| Node.js | `~/.nvm/` | Node.js installé via nvm |
