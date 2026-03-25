
import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';
import { Moon, Sun } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Fermer le menu quand on change de page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Work' },
    { path: '/stack', label: 'Stack' },
    { path: '/about', label: 'About' },
  ];

  return (
    <>
      {/* Skip link pour navigation clavier */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-20 py-6 md:py-8 flex justify-between items-center pointer-events-auto">
        <Link to="/" className={`text-xl font-black transition-colors z-[110] ${isDark ? 'text-white' : isOpen ? 'text-white' : 'text-zinc-900'}`}>
          MOMO<span className="text-[#F5B731]">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-8" role="navigation" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`nav-link text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-[#F5B731] focus-visible:outline-2 focus-visible:outline-[#F5B731] ${isActive ? 'text-[#F5B731]' : isDark ? 'text-white' : 'text-zinc-900'}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="block h-[2px] bg-[#F5B731] mt-1 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
              className={`p-2 rounded-full border transition-all focus-visible:outline-2 focus-visible:outline-[#F5B731] ${isDark ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : 'border-zinc-300 text-zinc-900 hover:bg-black hover:text-white'}`}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <Link
              to="/contact"
              aria-label="Aller à la page de contact"
              className="px-6 py-2 border border-[#F5B731] rounded-full text-xs font-bold uppercase tracking-widest text-[#F5B731] hover:bg-[#F5B731] hover:text-black transition-all focus-visible:outline-2 focus-visible:outline-[#F5B731]"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          className="md:hidden z-[110] flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
        >
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px] bg-white' : isDark ? 'bg-white' : 'bg-zinc-900'}`} />
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : isDark ? 'bg-white' : 'bg-zinc-900'}`} />
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px] bg-white' : isDark ? 'bg-white' : 'bg-zinc-900'}`} />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] bg-black flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8" role="navigation" aria-label="Navigation mobile">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-black uppercase tracking-tight transition-colors ${isActive ? 'text-[#F5B731]' : 'text-white hover:text-[#F5B731]'}`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="block h-[3px] bg-[#F5B731] mt-2 rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-8 py-3 border-2 border-[#F5B731] rounded-full text-sm font-black uppercase tracking-widest text-[#F5B731] hover:bg-[#F5B731] hover:text-black transition-all"
                >
                  Contact
                </Link>
              </motion.div>

              {/* Theme toggle */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (navItems.length + 1) * 0.08 }}
                onClick={toggleTheme}
                aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
                className="mt-6 p-3 rounded-full border border-zinc-700 text-white hover:bg-white hover:text-black transition-all"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </nav>

            {/* Email footer dans le menu mobile */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 text-xs font-bold uppercase tracking-widest text-zinc-500"
            >
              momo@terangadev.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
