
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';
import { Moon, Sun } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

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

      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-20 py-8 flex justify-between items-center pointer-events-auto">
        <Link to="/" className={`text-xl font-black transition-colors ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          MOMO<span className="text-[#CCFF00]">.</span>
        </Link>

        <div className="flex items-center gap-6 md:gap-12">
          <div className="flex gap-4 md:gap-8" role="navigation" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-[#CCFF00] focus-visible:outline-2 focus-visible:outline-[#CCFF00] ${isDark ? 'text-white' : 'text-zinc-900'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
              className={`p-2 rounded-full border transition-all focus-visible:outline-2 focus-visible:outline-[#CCFF00] ${isDark ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : 'border-zinc-300 text-zinc-900 hover:bg-black hover:text-white'
                }`}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <Link
              to="/contact"
              aria-label="Aller à la page de contact"
              className="px-3 md:px-6 py-2 border border-[#CCFF00] rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
            >
              <span className="hidden sm:inline">Contact</span>
              <span className="sm:hidden">•</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
