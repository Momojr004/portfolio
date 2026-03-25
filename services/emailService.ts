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
    attachments?: File[];
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
            console.log('📧 Mode SIMULATION - Email qui serait envoyé:');
            console.log('👤 Nom:', formData.fullName);
            console.log('📮 Email:', formData.email);
            console.log('💬 Message:', formData.message);

            if (formData.attachments && formData.attachments.length > 0) {
                console.log('📎 Fichiers attachés:');
                formData.attachments.forEach((file, index) => {
                    console.log(`  ${index + 1}. ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
                });
            }

            console.log('🔑 Pour activer l\'envoi réel: ajoutez vos clés EmailJS dans .env.local');

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
                to_email: 'guilganee@gmail.com', // Email de réception
                sent_at: new Date().toLocaleString('fr-FR'),
                site_url: import.meta.env.VITE_SITE_URL || 'http://localhost:3005'
            };

            // Gestion des fichiers attachés (EmailJS supporte les attachments)
            if (formData.attachments && formData.attachments.length > 0) {
                formData.attachments.forEach((file, index) => {
                    templateParams[`attachment_${index + 1}`] = file;
                });

                templateParams.has_attachments = 'true';
                templateParams.attachments_count = formData.attachments.length;
                templateParams.attachments_list = formData.attachments
                    .map((file, index) => `${index + 1}. ${file.name} (${(file.size / 1024).toFixed(2)} KB)`)
                    .join('\n');
            }

            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );

            console.log('✅ EmailJS Success:', response);

            return {
                success: true,
                message: 'Message envoyé avec succès ! Je vous répondrai dans les 24h.'
            };

        } catch (error) {
            console.error('❌ EmailJS Error:', error);

            return {
                success: false,
                message: 'Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement.',
                error
            };
        }
    }

    // Helper pour vérifier le statut de la configuration
    getConfigurationStatus(): { configured: boolean; message: string } {
        if (this.isConfigured) {
            return {
                configured: true,
                message: 'EmailJS configuré et prêt'
            };
        }

        return {
            configured: false,
            message: 'EmailJS en mode simulation. Configurez les variables d\'environnement pour l\'envoi réel.'
        };
    }
}

// Instance singleton
export const emailService = new EmailService();

// Export par défaut
export default emailService;