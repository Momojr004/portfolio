
import React, { useState, createContext, useContext, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

// Code splitting avec React.lazy
const Home = React.lazy(() => import('./pages/Home'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProjectDetails = React.lazy(() => import('./pages/ProjectDetails'));
const WorkPage = React.lazy(() => import('./pages/WorkPage'));
const StackPage = React.lazy(() => import('./pages/StackPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Composant de chargement
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative">
      <div className="w-12 h-12 border-t-2 border-[#CCFF00] border-solid rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-t-2 border-[#CCFF00]/20 border-solid rounded-full animate-spin animation-delay-75"></div>
    </div>
  </div>
);

// Theme Context
export const ThemeContext = createContext({ isDark: true, toggleTheme: () => { } });

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          {/* Page 404 */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h1 className="text-6xl font-black text-[#CCFF00] mb-4">404</h1>
                <p className="text-xl text-zinc-400 mb-8">Page non trouvée</p>
                <a href="/" className="px-6 py-3 bg-[#CCFF00] text-black font-bold rounded-full hover:bg-[#B8E600] transition-colors">
                  Retour à l'accueil
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
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
        <main id="main-content" className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
