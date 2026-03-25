// Test script pour vérifier la configuration EmailJS
// Ajoutez ce code dans la console du navigateur pour tester

const testEmailJS = () => {
  console.log('🧪 Test de configuration EmailJS...');
  
  // Vérifer les variables d'environnement
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  console.log('Service ID:', serviceId ? '✅ Configuré' : '❌ Manquant');
  console.log('Template ID:', templateId ? '✅ Configuré' : '❌ Manquant');
  console.log('Public Key:', publicKey ? '✅ Configuré' : '❌ Manquant');
  
  if (serviceId === 'service_example' || templateId === 'template_example' || publicKey === 'example_key') {
    console.log('⚠️ Vous utilisez encore les valeurs d\'exemple !');
    console.log('👉 Remplacez les valeurs dans .env.local');
    return false;
  }
  
  if (serviceId && templateId && publicKey) {
    console.log('🎉 Configuration EmailJS correcte !');
    console.log('🧪 Testez maintenant le formulaire de contact');
    return true;
  }
  
  console.log('❌ Configuration incomplète');
  console.log('📖 Voir EMAILJS_CONFIG.md pour les étapes');
  return false;
};

// Exporter pour utilisation dans la console
window.testEmailJS = testEmailJS;