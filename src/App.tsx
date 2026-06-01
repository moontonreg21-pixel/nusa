import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { RegionGallery } from './components/RegionGallery';
import { RegionDetailModal } from './components/RegionDetailModal';
import { AICulinaryExpert } from './components/AICulinaryExpert';
import { AboutUs } from './components/AboutUs';
import { YogyakartaDetail } from './components/YogyakartaDetail';
import { BaliDetail } from './components/BaliDetail';
import { KalimantanTimurDetail } from './components/KalimantanTimurDetail';
import { DynamicProvinceDetail } from './components/DynamicProvinceDetail';
import { PapuaDetail } from './components/PapuaDetail';
import { JawaBaratDetail } from './components/JawaBaratDetail';
import { SumateraBaratDetail } from './components/SumateraBaratDetail';
import { AcehDetail } from './components/AcehDetail';
import { SulawesiSelatanDetail } from './components/SulawesiSelatanDetail';
import { MalukuDetail } from './components/MalukuDetail';
import { NusaTenggaraTimurDetail } from './components/NusaTenggaraTimurDetail';
import { ProvinceData } from './types';
import { RecipeDetailView, RecipeDetail } from './components/RecipeDetailView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'gallery' | 'ai-chat' | 'about' | 'yogyakarta' | 'bali' | 'kaltim' | 'papua' | 'jabar' | 'aceh' | 'sumbar' | 'sulsel' | 'maluku' | 'ntt' | 'province-detail' | 'recipe-detail'>('home');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);
  const [prevViewForRecipe, setPrevViewForRecipe] = useState<string>('gallery');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // To handle initial query pass for the AI chat panel
  const [passInitialQuery, setPassInitialQuery] = useState<string>('');

  // Clear any existing light theme class & cache
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.removeItem('nusa-theme');
  }, []);

  const handleNavTransition = (view: 'home' | 'gallery' | 'ai-chat' | 'about' | 'yogyakarta' | 'bali' | 'kaltim' | 'papua' | 'jabar' | 'aceh' | 'sumbar' | 'sulsel' | 'maluku' | 'ntt' | 'province-detail' | 'recipe-detail') => {
    setActiveView(view);
    // Auto-scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProvince = (province: ProvinceData) => {
    if (province.id === 'yogyakarta') {
      handleNavTransition('yogyakarta');
    } else if (province.id === 'bali') {
      handleNavTransition('bali');
    } else if (province.id === 'kaltim') {
      handleNavTransition('kaltim');
    } else if (province.id === 'papua') {
      handleNavTransition('papua');
    } else if (province.id === 'jabar') {
      handleNavTransition('jabar');
    } else if (province.id === 'aceh') {
      handleNavTransition('aceh');
    } else if (province.id === 'sumbar') {
      handleNavTransition('sumbar');
    } else if (province.id === 'sulsel') {
      handleNavTransition('sulsel');
    } else if (province.id === 'maluku') {
      handleNavTransition('maluku');
    } else if (province.id === 'ntt') {
      handleNavTransition('ntt');
    } else {
      setSelectedProvince(province);
      handleNavTransition('province-detail');
    }
  };

  const handleViewRecipe = (recipe: RecipeDetail) => {
    setPrevViewForRecipe(activeView);
    setSelectedRecipe(recipe);
    setSelectedProvince(null); // Close the modal if open
    handleNavTransition('recipe-detail');
  };

  const handleAskAIChef = (query: string) => {
    setSelectedProvince(null); // Close modal
    setPassInitialQuery(query);
    setActiveView('ai-chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col justify-between selection:bg-primary selection:text-on-primary">
      {/* 1. Header */}
      {activeView !== 'home' && (
        <Header 
          onNavClick={handleNavTransition} 
          activeView={activeView} 
        />
      )}

      {/* 2. Core Screen Views */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Home Hero visuals */}
              <HomeHero 
                onStartExploration={() => {
                  handleNavTransition('gallery');
                }} 
              />
            </motion.div>
          )}

          {activeView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <RegionGallery 
                onSelectProvince={handleSelectProvince} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </motion.div>
          )}

          {activeView === 'ai-chat' && (
            <motion.div
              key="ai-chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AICulinaryExpert 
                initialQuery={passInitialQuery} 
                onClearInitialQuery={() => setPassInitialQuery('')}
              />
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AboutUs />
            </motion.div>
          )}

          {activeView === 'yogyakarta' && (
            <motion.div
              key="yogyakarta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <YogyakartaDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'bali' && (
            <motion.div
              key="bali"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BaliDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'kaltim' && (
            <motion.div
              key="kaltim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <KalimantanTimurDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'papua' && (
            <motion.div
              key="papua"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PapuaDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'jabar' && (
            <motion.div
              key="jabar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <JawaBaratDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'aceh' && (
            <motion.div
              key="aceh"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AcehDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'sumbar' && (
            <motion.div
              key="sumbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SumateraBaratDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'sulsel' && (
            <motion.div
              key="sulsel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SulawesiSelatanDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'maluku' && (
            <motion.div
              key="maluku"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MalukuDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'ntt' && (
            <motion.div
              key="ntt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <NusaTenggaraTimurDetail 
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'province-detail' && selectedProvince && (
            <motion.div
              key="province-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DynamicProvinceDetail 
                provinceId={selectedProvince.id}
                onBack={() => handleNavTransition('gallery')}
                onAskAI={handleAskAIChef}
                onViewRecipe={handleViewRecipe}
              />
            </motion.div>
          )}

          {activeView === 'recipe-detail' && selectedRecipe && (
            <motion.div
              key="recipe-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <RecipeDetailView 
                recipe={selectedRecipe}
                onBack={() => {
                  if (prevViewForRecipe === 'recipe-detail' || !prevViewForRecipe) {
                    handleNavTransition('gallery');
                  } else {
                    handleNavTransition(prevViewForRecipe as any);
                  }
                }}
                onAskAI={handleAskAIChef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Recipe Card / Regional Detail Modal */}
      <RegionDetailModal 
        province={selectedProvince} 
        onClose={() => setSelectedProvince(null)} 
        onAskAI={handleAskAIChef}
        onViewRecipe={handleViewRecipe}
      />

      {/* 4. Floating AI Chef Chat Bubble */}
      {activeView !== 'ai-chat' && activeView !== 'home' && (
        <motion.button
          id="floating-chat-bubble"
          onClick={() => handleNavTransition('ai-chat')}
          initial={{ scale: 0, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 30 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-on-primary shadow-[0_8px_24px_rgba(233,193,118,0.25)] hover:shadow-[0_12px_32px_rgba(233,193,118,0.40)] border border-primary/20 cursor-pointer group"
          title="Tanya AI Koki"
        >
          {/* Active AI online blinking indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-surface"></span>
          </span>
          
          {/* Crossed spoon and fork icon SVG */}
          <svg 
            className="w-5.5 h-5.5 text-on-primary group-hover:rotate-12 transition-transform duration-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Spoon */}
            <path d="M17 4 C15.5 4 14.5 5.5 14.5 7 C14.5 8.5 15.5 9.5 17 9.5 C18.5 9.5 19.5 8.5 19.5 7 C19.5 5.5 18.5 4 17 4 Z" fill="currentColor" />
            <path d="M15.5 8.5 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Fork */}
            <path d="M7 6 L7 10 M5 6 L5 10 M9 6 L9 10 M5 10 C5 11.5 6 12.5 7.5 12.5 C9 12.5 10 11.5 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7.5 12 L17 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Hover helper text tooltip */}
          <span className="absolute right-14 scale-0 group-hover:scale-100 origin-right transition-all duration-200 bg-surface-container border border-primary/20 text-on-surface-variant text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap select-none pointer-events-none">
            Tanya AI Koki
          </span>
        </motion.button>
      )}

      {/* 5. Footer */}
      {activeView !== 'home' && (
        <footer className="bg-surface border-t border-primary/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Logo and quote */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="font-serif text-xl font-bold text-primary tracking-widest uppercase mb-1">
                NUSA CULINARY
              </h2>
              <p className="text-on-surface-variant/80 text-xs tracking-wider">
                Melestarikan Warisan Adat, Merayakan Cita Rasa Autentik Nusantara.
              </p>
            </div>

            {/* Copyright description */}
            <p className="font-sans text-[10px] tracking-wider text-on-surface-variant/50 text-center md:text-right">
              &copy; 2026 NUSA CULINARY. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
