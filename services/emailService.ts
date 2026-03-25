import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_example',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_example',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'example_key'
};

// Interface pour les données du formulaire
export interface ContactFormData {
    fullName: string;
    email: string;
    message: string;
}

// Interface pour la réponse
export interface EmailResponse {
    success: boolean;
    message: string;
    error?: any;
}

class EmailService {
    private isConfigured: boolean;

    constructor() {
        this.isConfigured = this.validateConfiguration();

        if (this.isConfigured) {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        }
    }

    private validateConfiguration(): boolean {
        const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

        // Vérifier si on a de vraies clés (pas les exemples)
        const hasRealKeys =
            serviceId !== 'service_example' &&
            templateId !== 'template_example' &&
            publicKey !== 'example_key' &&
            serviceId && templateId && publicKey;

        if (!hasRealKeys) {
            console.warn('⚠️ EmailJS: Configuration manquante. Ajoutez vos clés dans .env.local');
            console.warn('📧 Mode simulation activé - vérifiez la console pour voir les données.');
        }

        return hasRealKeys;
    }

    async sendContactForm(formData: ContactFormData): Promise<EmailResponse> {
        // Si EmailJS n'est pas configuré, simuler l'envoi
        if (!this.isConfigured) {


            // Simulation d'un délai réseau
            await new Promise(resolve => setTimeout(resolve, 1500));

            return {
                success: true,
                message: 'Message envoyé avec succès ! (Mode simulation - configurez EmailJS pour l\'envoi réel)'
            };
        }

        try {
            // Préparer les données pour le template EmailJS
            const templateParams: any = {
                from_name: formData.fullName,
                from_email: formData.email,
                message: formData.message,
                to_email: 'guilganee@gmail.com', // Email de réception - VÉRIFIER QUE C'EST CORRECT !
                sent_at: new Date().toLocaleString('fr-FR'),
                site_url: import.meta.env.VITE_SITE_URL || 'http://localhost:3005'
            };

            // Tentative d'envoi avec EmailJS et retry automatique
            let lastError;
            const maxRetries = 2;

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {

                    const response = await emailjs.send(
                        EMAILJS_CONFIG.serviceId,
                        EMAILJS_CONFIG.templateId,
                        templateParams
                    );

                    // Vérifications du statut de réponse
                    if (response.status === 200 || response.text === 'OK') {

                        return {
                            success: true,
                            message: 'Message envoyé avec succès ! Je vous répondrai dans les 24h.'
                        };
                    } else {
                        console.warn(`⚠️ EmailJS Response douteuse (tentative ${attempt}):`, response);
                        lastError = new Error(`Réponse inattendue: ${response.status}`);
                    }

                } catch (error: any) {
                    lastError = error;
                    console.error(`❌ EmailJS Erreur (tentative ${attempt}):`, {
                        message: error.message,
                        status: error.status,
                        text: error.text,
                        attempt: attempt
                    });

                    // Attendre avant retry (sauf dernière tentative)
                    if (attempt < maxRetries) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                    }
                }
            }

            // Si toutes les tentatives ont échoué
            console.error('❌ EmailJS: Toutes les tentatives ont échoué:', lastError);

            return {
                success: false,
                message: 'Erreur lors de l\'envoi après plusieurs tentatives. Veuillez réessayer ou me contacter directement.',
                error: lastError
            };
        } catch (error: any) {
            console.error('❌ Erreur générale EmailJS:', error);
            return {
                success: false,
                message: 'Erreur technique inattendue. Veuillez réessayer plus tard.',
                error: error
            };
        }
    }
}

// Instance singleton
export const emailService = new EmailService();

// Export par défaut
export default emailService;