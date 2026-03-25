# 📧 Configuration EmailJS avec Attachments

## ✅ Service configuré : `service_y44zzvz`

Votre service EmailJS est prêt ! Il ne reste plus qu'à configurer le **template** et la **clé publique**.

---

## 🎯 Étapes de Configuration Complète

### 1. **Configuration du Template EmailJS**

1. **Aller sur** : https://dashboard.emailjs.com/admin/templates
2. **Créer un nouveau template**
3. **Copier ce template avec support d'attachments** :

```html
Nouveau message depuis le portfolio de Mouhamed Pouye

De: {{from_name}} ({{from_email}})
Envoyé le: {{sent_at}}

MESSAGE:
{{message}}

{{#has_attachments}}
FICHIERS JOINTS ({{attachments_count}}):
{{attachments_list}}
{{/has_attachments}}

---
Envoyé depuis: {{site_url}}
```

4. **Sauvegarder** et noter l'ID du template (ex: `template_abc123`)

### 2. **Récupérer la Clé Publique**

1. **Aller sur** : https://dashboard.emailjs.com/admin/account
2. **Copier** la Public Key (ex: `abcd1234567890`)

### 3. **Configuration Locale (.env.local)**

Mettre à jour votre fichier `.env.local` :

```env
# EmailJS Configuration - PRODUCTION
VITE_EMAILJS_SERVICE_ID=service_y44zzvz
VITE_EMAILJS_TEMPLATE_ID=template_VOTRE_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=VOTRE_PUBLIC_KEY

# Site URL
VITE_SITE_URL=http://localhost:3003
```

---

## 🎨 **Fonctionnalités Disponibles**

### ✅ **Types de fichiers supportés :**
- **PDF** : `.pdf`
- **Word** : `.doc`, `.docx` 
- **Texte** : `.txt`
- **Images** : `.jpg`, `.png`

### 📊 **Limites :**
- **3 fichiers maximum** par email
- **5MB par fichier**
- **10MB total** par envoi

### 🎯 **Interface utilisateur :**
- ✅ **Drag & Drop** pour upload
- ✅ **Validation temps réel**
- ✅ **Prévisualisation** des fichiers
- ✅ **Gestion d'erreurs** complète
- ✅ **Animations** fluides

---

## 🧪 **Test Immédiat**

1. **Lancer** le portfolio : `npm run dev`
2. **Ouvrir** : http://localhost:3003
3. **Aller** sur Contact
4. **Remplir** le formulaire
5. **Ajouter** un fichier PDF/Word
6. **Envoyer** → Vérifier la console pour les logs

---

## 🔧 **Template EmailJS Avancé (Optionnel)**

Pour un template plus stylé avec HTML :

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #CCFF00;">Nouveau Contact Portfolio</h2>
  
  <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
    <h3>👤 Informations du contact</h3>
    <p><strong>Nom:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Date:</strong> {{sent_at}}</p>
  </div>
  
  <div style="background: #fff; padding: 20px; border-left: 4px solid #CCFF00;">
    <h3>💬 Message</h3>
    <p>{{message}}</p>
  </div>
  
  {{#has_attachments}}
  <div style="background: #e8f4f8; padding: 20px; margin: 20px 0;">
    <h3>📎 Fichiers joints ({{attachments_count}})</h3>
    <pre>{{attachments_list}}</pre>
  </div>
  {{/has_attachments}}
  
  <hr style="margin: 30px 0;">
  <p style="color: #666; text-align: center;">
    Envoyé depuis <a href="{{site_url}}">le portfolio de Mouhamed Pouye</a>
  </p>
</div>
```

---

## 🚀 **Status : PRÊT À UTILISER**

- ✅ **Service ID** : Configuré
- ⚠️ **Template ID** : À configurer  
- ⚠️ **Public Key** : À configurer
- ✅ **Upload fichiers** : Opérationnel
- ✅ **Interface** : Complete

**Temps restant** : ~5 minutes pour finir la configuration ! 🎉