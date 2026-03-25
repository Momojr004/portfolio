// Option Formspree - La plus simple de toutes
// 1. Allez sur formspree.io
// 2. Créez un form avec votre email
// 3. Remplacez le formulaire par :

/* 
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Envoyer</button>
</form>
*/

// Ou version fetch API :
export const sendFormspree = async (data: { name: string; email: string; message: string }) => {
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return {
            success: response.ok,
            message: response.ok ? 'Message envoyé !' : 'Erreur d\'envoi'
        };
    } catch (error) {
        return { success: false, message: 'Erreur réseau' };
    }
};