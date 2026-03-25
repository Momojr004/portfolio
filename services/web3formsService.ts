// Service Web3Forms - Alternative simple à EmailJS
export interface Web3FormData {
    name: string;
    email: string;
    message: string;
}

export interface Web3FormResponse {
    success: boolean;
    message: string;
}

// Clé d'accès Web3Forms (gratuite jusqu'à 250 emails/mois)
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

export const sendWeb3Form = async (data: Web3FormData): Promise<Web3FormResponse> => {
    // Configuration temporaire - à remplacer par vraie clé
    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
        // Simulation pour développement
        console.log('🚀 Web3Forms Simulation Mode Active');
        console.log('📧 Email simulé envoyé avec les données:', {
            ...data,
            timestamp: new Date().toLocaleString('fr-FR'),
        });

        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Email envoyé avec succès (mode simulation)'
        };
    }

    try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);

        // Métadonnées optionnelles
        formData.append('subject', 'Nouveau message depuis votre portfolio');
        formData.append('from_name', 'Portfolio Contact Form');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            return {
                success: true,
                message: 'Email envoyé avec succès!'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Erreur lors de l\'envoi de l\'email'
            };
        }
    } catch (error) {
        console.error('Web3Forms error:', error);
        return {
            success: false,
            message: 'Erreur de connexion. Veuillez réessayer.'
        };
    }
};

// Instructions pour configuration réelle :
/*
1. Aller sur https://web3forms.com/
2. Créer un compte gratuit
3. Obtenir votre Access Key
4. Remplacer "YOUR_WEB3FORMS_ACCESS_KEY" par votre vraie clé
5. Les emails seront automatiquement envoyés vers l'email associé à votre compte Web3Forms
*/