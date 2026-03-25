// Service Web3Forms - Alternative ultra-rapide à EmailJS avec support des fichiers
export interface Web3FormData {
    name: string;
    email: string;
    message: string;
    attachments?: File[];
}

export const sendWeb3Form = async (data: Web3FormData) => {
    const formData = new FormData();

    // Clé publique Web3Forms depuis l'environnement
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_KEY_HERE' || accessKey === 'demo-web3forms-key' || accessKey === 'votre_cle_web3forms_ici') {
        // MODE DÉMO : Simulation complète avec affichage détaillé


        if (data.attachments && data.attachments.length > 0) {
            data.attachments.forEach((file, index) => {

            });
        }


        // Simulation d'un délai réseau réaliste
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            success: true,
            message: '✅ Mode démo activé ! Consultez la console pour voir ce qui serait envoyé. Configurez Web3Forms pour l\'envoi réel.'
        };
    }

    formData.append('access_key', accessKey);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('redirect', 'false');
    formData.append('from_name', data.name);
    formData.append('subject', `Portfolio - Message de ${data.name}`);

    // 📎 SUPPORT DES FICHIERS ATTACHÉS
    // Web3Forms: champ "attachment" (un seul fichier supporté en gratuit, max 10MB)
    if (data.attachments && data.attachments.length > 0) {
        const totalSize = data.attachments.reduce((sum, f) => sum + f.size, 0);

        // Web3Forms accepte UN fichier via le champ "attachment"
        // Pour plusieurs fichiers, on envoie le premier et on liste les autres dans le message
        formData.append('attachment', data.attachments[0]);

        if (data.attachments.length > 1) {
            const otherFiles = data.attachments.slice(1)
                .map((f, i) => `${i + 2}. ${f.name} (${(f.size / 1024).toFixed(2)} KB)`)
                .join('\n');
            formData.set('message', `${data.message}\n\n--- Fichiers supplémentaires (non joints) ---\n${otherFiles}`);
        }
    }

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        return {
            success: result.success,
            message: result.success
                ? 'Message envoyé avec succès avec fichier(s) !'
                : `Erreur Web3Forms: ${result.message || 'Erreur inconnue'}`
        };
    } catch (error) {
        console.error('❌ Web3Forms erreur réseau:', error);
        return {
            success: false,
            message: 'Erreur réseau'
        };
    }
};