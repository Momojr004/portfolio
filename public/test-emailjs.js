// Test script pour vérifier la configuration EmailJS
// Ajoutez ce code dans la console du navigateur pour tester

const testEmailJS = () => {
  
  // Vérifer les variables d'environnement
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  
  if (serviceId === 'service_example' || templateId === 'template_example' || publicKey === 'example_key') {
    return false;
  }
  
  if (serviceId && templateId && publicKey) {
    return true;
  }
  
  return false;
};

// Exporter pour utilisation dans la console
window.testEmailJS = testEmailJS;