
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
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-20 py-8 flex justify-between items-center pointer-events-auto">
      <Link to="/" className={`text-xl font-black transition-colors ${isDark ? 'text-white' : 'text-zinc-900'}`}>
        MOMO<span className="text-[#CCFF00]">.</span>
      </Link>

      <div className="flex items-center gap-6 md:gap-12">
        <div className="flex gap-4 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                location.pathname === item.path 
                ? 'text-[#CCFF00]' 
                : (isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black')
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${
              isDark ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : 'border-zinc-300 text-zinc-900 hover:bg-black hover:text-white'
            }`}
          >
            {isDark ? <Sun size={14}/> : <Moon size={14}/>}
          </button>

          <Link 
            to="/contact"
            className="hidden md:block px-6 py-2 border border-[#CCFF00] rounded-full text-xs font-bold uppercase tracking-widest text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
