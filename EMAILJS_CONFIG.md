# 📧 Configuration EmailJS - Guide complet

## ✅ Étapes à suivre (5 minutes)

### 1. Créer un compte EmailJS
- Allez sur **https://emailjs.com**
- Cliquez "Sign Up" et créez un compte GRATUIT
- Confirmez votre email

### 2. Ajouter un service email
- Dans le dashboard, cliquez **"Email Services"**
- Cliquez **"Add New Service"** 
- Choisissez **Gmail** (ou votre fournisseur)
- Suivez les étapes pour connecter votre compte `guilganee@gmail.com`
- **Notez le Service ID** (ex: `service_abcd123`)

### 3. Créer un template d'email
- Allez dans **"Email Templates"**
- Cliquez **"Create New Template"**
- **Template ID se génère automatiquement** (ex: `template_xyz789`)

#### Template à copier-coller :

**Sujet :**
```
✉️ Nouveau message de {{from_name}} - Portfolio
```

**Corps du message :**
```
Bonjour Mouhamed,

Vous avez reçu un nouveau message via votre portfolio :

👤 Nom: {{from_name}}
📧 Email: {{from_email}}
📅 Date: {{sent_at}}

💬 Message:
{{message}}

---
📍 Origine: {{site_url}}

Vous pouvez répondre directement à cet email.

Bonne journée ! 
```

- Cliquez **"Save"**

### 4. Récupérer les clés
- **Service ID**: Notez depuis "Email Services" 
- **Template ID**: Notez depuis "Email Templates"
- **Public Key**: Allez dans "Account" → "General" → **"Public Key"**

### 5. Mettre à jour votre .env.local
Remplacez dans le fichier `.env.local` :

```bash
VITE_EMAILJS_SERVICE_ID=service_VOTRE_SERVICE_ID_ICI
VITE_EMAILJS_TEMPLATE_ID=template_VOTRE_TEMPLATE_ID_ICI  
VITE_EMAILJS_PUBLIC_KEY=VOTRE_PUBLIC_KEY_ICI
```

## 🎯 Variables utilisées dans le code :
- `{{from_name}}` = Nom du visiteur
- `{{from_email}}` = Email du visiteur  
- `{{message}}` = Message du visiteur
- `{{sent_at}}` = Date/heure d'envoi
- `{{site_url}}` = URL de votre portfolio

## ✨ Test
1. Sauvegardez le fichier `.env.local`
2. Le serveur va redémarrer automatiquement
3. Allez sur `/contact` et testez le formulaire
4. Vous devriez recevoir l'email sur `guilganee@gmail.com` !

## 🚨 Dépannage
- **"Mode simulation"** = Clés pas encore configurées
- **Erreur 401** = Public Key incorrecte
- **Erreur 404** = Service ID ou Template ID incorrect
- **Pas d'email reçu** = Vérifiez vos spams

## 💰 Limites gratuites :
- ✅ **200 emails/mois**
- ✅ **2 services email** 
- ✅ **3 templates**
- ✅ Parfait pour un portfolio !