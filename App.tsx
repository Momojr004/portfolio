
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectDetails from './pages/ProjectDetails';
import WorkPage from './pages/WorkPage';
import StackPage from './pages/StackPage';
import ContactPage from './pages/ContactPage';

// Theme Context
export const ThemeContext = createContext({ isDark: true, toggleTheme: () => { } });

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/stack" element={<StackPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

const Layout = () => {
  const [isDark, setIsDark] = useState(true);
  useSmoothScroll();

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    document.body.className = isDark ? 'theme-dark' : 'theme-light';
    document.body.style.backgroundColor = isDark ? '#0B0B0B' : '#F5F5F0';
    document.body.style.color = isDark ? '#FFFFFF' : '#1A1A1A';
    document.body.style.fontFamily = 'Inter, sans-serif';
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`relative min-h-screen flex flex-col transition-colors duration-500`}>
        {/* Noise Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.02] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            animation: 'noise 0.2s infinite'
          }}
        />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
};

export default App;
