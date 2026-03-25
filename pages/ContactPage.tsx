
import React, { useContext, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ThemeContext } from '../App';
import { Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import SEO from '../components/SEO';
import { TiltCard } from '../components/TiltCard';
import emailService, { ContactFormData } from '../services/emailService';

const ContactPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMessage('');

    // Récupérer les données du formulaire
    const formData = new FormData(e.currentTarget);
    const contactData: ContactFormData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const result = await emailService.sendContactForm(contactData);

      if (result.success) {
        setFormState('success');
        (e.target as HTMLFormElement).reset();
        return;
      }

      setFormState('error');
      setErrorMessage('Échec de l\'envoi. Veuillez réessayer ou me contacter directement par email.');
    } catch (error) {
      console.error('Contact form error:', error);
      setFormState('error');
      setErrorMessage('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <>
      <SEO
        title="Contact - Mouhamed Pouye"
        description="Contactez Mouhamed Pouye pour vos projets de développement web. Disponible pour créer des solutions innovantes."
        keywords="contact, mouhamed pouye, développeur freelance, projet web, collaboration"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-40 pb-20 px-6 md:px-20 min-h-screen"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left Column: Content */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12"
              >
                SAY <br /> <span className="text-[#CCFF00]">HELLO.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <p className={`text-xl md:text-2xl font-medium max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Une idée ? Un projet complexe ? Ou simplement envie de parler business & tech ? Discutons-en.
                </p>

                <div className="space-y-4">
                  <a href="mailto:guilganee@gmail.com" className="group flex items-center gap-4 text-2xl md:text-3xl font-black hover:text-[#CCFF00] transition-colors">
                    guilganee@gmail.com
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Location</p>
                <p className="font-bold">Dakar, Sénégal <br /> Remote Friendly</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Socials</p>
                <div className="flex flex-col gap-1">
                  <a href="https://www.linkedin.com/in/mouhamed-pouye-753462271/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#CCFF00] transition-colors">LinkedIn</a>
                  <a href="https://github.com/Momojr004" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#CCFF00] transition-colors">GitHub</a>
                  <a href="https://www.instagram.com/guilganee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#CCFF00] transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}

          <div className="relative">
            <TiltCard className={`p-8 md:p-12 rounded-[3rem] border-2 transition-colors relative ${isDark ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white border-zinc-100'
              }`}>
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-[#CCFF00] rounded-full flex items-center justify-center mx-auto text-black">
                    <Send size={32} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Message Reçu !</h3>
                  <p className="text-zinc-500 font-medium">Je reviens vers vous dans les prochaines 24 heures.</p>
                  <button
                    onClick={() => setFormState('idle')}
                    aria-label="Envoyer un autre message"
                    className="text-xs font-black uppercase tracking-widest underline decoration-[#CCFF00] underline-offset-8 focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : formState === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto text-white">
                    <Send size={32} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Erreur d'envoi</h3>
                  <p className="text-zinc-500 font-medium">{errorMessage}</p>
                  <button
                    onClick={() => setFormState('idle')}
                    aria-label="Réessayer l'envoi"
                    className="text-xs font-black uppercase tracking-widest underline decoration-red-500 underline-offset-8 focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    Réessayer
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Nom complet</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      type="text"
                      placeholder="John Doe"
                      aria-describedby="fullName-error"
                      className={`w-full bg-transparent border-b-2 py-4 outline-none transition-colors font-bold text-xl focus-visible:outline-2 focus-visible:outline-[#CCFF00] ${isDark ? 'border-zinc-800 focus:border-[#CCFF00]' : 'border-zinc-100 focus:border-black'
                        }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Email professionnel</label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="john@company.com"
                      aria-describedby="email-error"
                      className={`w-full bg-transparent border-b-2 py-4 outline-none transition-colors font-bold text-xl focus-visible:outline-2 focus-visible:outline-[#CCFF00] ${isDark ? 'border-zinc-800 focus:border-[#CCFF00]' : 'border-zinc-100 focus:border-black'
                        }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Parlez-moi de votre vision..."
                      aria-describedby="message-error"
                      className={`w-full bg-transparent border-b-2 py-4 outline-none transition-colors font-bold text-xl resize-none focus-visible:outline-2 focus-visible:outline-[#CCFF00] ${isDark ? 'border-zinc-800 focus:border-[#CCFF00]' : 'border-zinc-100 focus:border-black'
                        }`}
                    />
                  </div>

                  <button
                    disabled={formState === 'sending'}
                    type="submit"
                    aria-label={formState === 'sending' ? 'Envoi du message en cours' : 'Envoyer le message'}
                    className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 focus-visible:outline-2 focus-visible:outline-[#CCFF00] disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-white text-black hover:bg-[#CCFF00]' : 'bg-black text-white hover:bg-[#CCFF00] hover:text-black'
                      }`}
                  >
                    {formState === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                    <Send size={14} />
                  </button>
                </form>
              )}
            </TiltCard>

            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#CCFF00] rounded-full blur-[100px] opacity-20 -z-10" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;
