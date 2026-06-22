import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { RegionGallery } from './components/RegionGallery';
import { RegionsGridPage } from './components/RegionsGridPage';
import { RegionDetailModal } from './components/RegionDetailModal';
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
import { YouTubeMusicPlayer } from './components/YouTubeMusicPlayer';
import { SocialLinks } from './components/SocialLinks';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'gallery' | 'regions' | 'about' | 'yogyakarta' | 'bali' | 'kaltim' | 'papua' | 'jabar' | 'aceh' | 'sumbar' | 'sulsel' | 'maluku' | 'ntt' | 'province-detail' | 'recipe-detail'>('home');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);
  const [prevViewForRecipe, setPrevViewForRecipe] = useState<string>('gallery');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [musicStarted, setMusicStarted] = useState<boolean>(false);

  // Clear any existing light theme class & cache
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.removeItem('nusa-theme');
  }, []);

  const handleNavTransition = (view: 'home' | 'gallery' | 'regions' | 'about' | 'yogyakarta' | 'bali' | 'kaltim' | 'papua' | 'jabar' | 'aceh' | 'sumbar' | 'sulsel' | 'maluku' | 'ntt' | 'province-detail' | 'recipe-detail') => {
    if (view === 'home') {
      setSelectedProvince(null);
      setSelectedRecipe(null);
      setPrevViewForRecipe('regions');
      setSearchQuery('');
    }
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

  const musicEnabledViews = [
    'gallery',
    'regions',
    'about',
    'yogyakarta',
    'bali',
    'kaltim',
    'papua',
    'jabar',
    'aceh',
    'sumbar',
    'sulsel',
    'maluku',
    'ntt',
    'province-detail',
    'recipe-detail'
  ];
  const shouldPlayMusic = musicStarted && musicEnabledViews.includes(activeView);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col justify-between selection:bg-primary selection:text-on-primary">
      {shouldPlayMusic && (
        <YouTubeMusicPlayer />
      )}

      {/* 1. Header */}
      <Header 
        onNavClick={handleNavTransition} 
        activeView={activeView} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

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
              <HomePage
                onSelectProvince={handleSelectProvince}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onExploreRegions={() => {
                  setMusicStarted(true);
                  handleNavTransition('regions');
                }}
                onAbout={() => handleNavTransition('about')}
              />
            </motion.div>
          )}

          {activeView === 'regions' && (
            <motion.div
              key="regions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <RegionsGridPage
                onSelectProvince={handleSelectProvince}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onBack={() => handleNavTransition('regions')}
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
                onVideoPlay={() => setMusicStarted(false)}
                onBack={() => {
                  if (prevViewForRecipe === 'recipe-detail' || !prevViewForRecipe) {
                    handleNavTransition('regions');
                  } else {
                    handleNavTransition(prevViewForRecipe as any);
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Recipe Card / Regional Detail Modal */}
      <RegionDetailModal 
        province={selectedProvince} 
        onClose={() => setSelectedProvince(null)} 
        onViewRecipe={handleViewRecipe}
      />

      {/* 4. Footer */}
      {activeView !== 'home' && (
      <footer className="bg-surface border-t border-primary/10">
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

          <div className="flex flex-col items-center gap-3 md:items-end">
            <SocialLinks />
            <p className="font-sans text-[10px] tracking-wider text-on-surface-variant/50 text-center md:text-right">
              &copy; 2026 NUSA CULINARY. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
