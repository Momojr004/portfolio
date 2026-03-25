
import React, { useContext, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ThemeContext } from '../App';
import { Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import SEO from '../components/SEO';
import { TiltCard } from '../components/TiltCard';

const ContactPage: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <>
      <SEO
        title="Contact - Mouhamed Pouye"
        description="Contactez Mouhamed Pouye pour vos projets de développement web. Disponible sur Paris et Dakar pour créer des solutions innovantes."
        keywords="contact, mouhamed pouye, développeur freelance, projet web, collaboration, paris, dakar"
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
                <p className="font-bold">Paris / Dakar <br /> Remote Friendly</p>
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
                    className="text-xs font-black uppercase tracking-widest underline decoration-[#CCFF00] underline-offset-8"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Nom complet</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className={`w-full bg-transparent border-b-2 py-4 outline-none transition-colors font-bold text-xl ${isDark ? 'border-zinc-800 focus:border-[#CCFF00]' : 'border-zinc-100 focus:border-black'
                        }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Email professionnel</label>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      className={`w-full bg-transparent border-b-2 py-4 outline-none transition-colors font-bold text-xl ${isDark ? 'border-zinc-800 focus:border-[#CCFF00]' : 'border-zinc-100 focus:border-black'
                        }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Votre Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Parlez-moi de votre vision..."
                      className={`w-full bg-transparent border-b-2 py-4 outline-none transition-colors font-bold text-xl resize-none ${isDark ? 'border-zinc-800 focus:border-[#CCFF00]' : 'border-zinc-100 focus:border-black'
                        }`}
                    />
                  </div>

                  <button
                    disabled={formState === 'sending'}
                    type="submit"
                    className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${isDark ? 'bg-white text-black hover:bg-[#CCFF00]' : 'bg-black text-white hover:bg-[#CCFF00] hover:text-black'
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
