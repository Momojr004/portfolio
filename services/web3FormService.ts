// Service Web3Forms - Alternative ultra-rapide à EmailJS
export interface Web3FormData {
    name: string;
    email: string;
    message: string;
}

export const sendWeb3Form = async (data: Web3FormData) => {
    const formData = new FormData();

    // Clé publique Web3Forms (gratuit, pas de config)
    formData.append('access_key', 'YOUR_ACCESS_KEY_HERE');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('redirect', 'false');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        return {
            success: result.success,
            message: result.success
                ? 'Message envoyé avec succès !'
                : 'Erreur lors de l\'envoi'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Erreur réseau'
        };
    }
};