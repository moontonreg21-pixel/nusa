import React, { useState } from 'react';
import { ProvinceData } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface RegionDetailModalProps {
  province: ProvinceData | null;
  onClose: () => void;
  onViewRecipe: (recipe: any) => void;
}

export function RegionDetailModal({ province, onClose, onViewRecipe }: RegionDetailModalProps) {
  if (!province) return null;

  const [activeTab, setActiveTab] = useState<'recipe' | 'philosophy'>('recipe');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0e0c]/90 overflow-y-auto backdrop-blur-sm">
        {/* Modal card outer wrap */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4 }}
          className="relative bg-surface border border-primary/20 w-full max-w-5xl rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(233,193,118,0.15)] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
        >
          {/* Close trigger anchor */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-55 w-10 h-10 rounded-full bg-surface-lowest/80 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95"
            aria-label="Tutup Detail"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {/* Left Column: Image Area */}
          <div className="md:col-span-5 relative bg-surface-lowest flex flex-col h-full min-h-[300px] md:min-h-0 md:max-h-[90vh]">
            <div className="relative h-full w-full">
              <img 
                className="w-full h-full object-cover absolute inset-0" 
                src={province.imageUrl} 
                alt={province.dishName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/40 via-transparent to-transparent"></div>
              
              {/* Territory label floating badge */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded">
                <span className="font-sans text-[10px] tracking-widest font-extrabold text-primary uppercase">
                  {province.territory}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Complete detail view logs */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col overflow-y-auto md:max-h-[85vh]" style={{ scrollbarWidth: 'thin' }}>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="font-sans text-[11px] tracking-widest font-bold text-primary uppercase">
                  KULINER PUSAKA • {province.name}
                </span>
                <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
                  {province.dishName}
                </h2>
              </div>
              <button 
                onClick={() => {
                  onViewRecipe({
                    name: province.dishName,
                    provinceName: province.name,
                    imageUrl: province.imageUrl,
                    description: province.description,
                    history: province.history,
                    ingredients: province.ingredients,
                    cookingSteps: province.recommendedRecipe.steps,
                    prepTime: province.recommendedRecipe.prepTime,
                    cookTime: province.recommendedRecipe.cookTime,
                    servings: province.recommendedRecipe.servings
                  });
                }}
                className="cursor-pointer shrink-0 flex items-center justify-center gap-1.5 bg-primary text-on-primary py-2.5 px-5 rounded font-sans text-[10px] tracking-widest font-extrabold hover:brightness-110 active:scale-95 transition-all uppercase shadow-md"
              >
                <span className="material-symbols-outlined text-xs">open_in_new</span>
                Halaman Resep Penuh
              </button>
            </div>

            {/* Quick specifications banner */}
            <div className="grid grid-cols-3 gap-3 bg-surface-container-low/40 p-4 border border-primary/10 rounded-md mb-6 text-center text-xs">
              <div>
                <div className="text-primary font-bold flex justify-center items-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  <span>Persiapan</span>
                </div>
                <span className="text-on-surface-variant font-medium">{province.recommendedRecipe.prepTime}</span>
              </div>
              <div className="border-x border-primary/10">
                <div className="text-primary font-bold flex justify-center items-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined text-xs">restaurant_menu</span>
                  <span>Memasak</span>
                </div>
                <span className="text-on-surface-variant font-medium">{province.recommendedRecipe.cookTime}</span>
              </div>
              <div>
                <div className="text-primary font-bold flex justify-center items-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined text-xs">group</span>
                  <span>Porsi</span>
                </div>
                <span className="text-on-surface-variant font-medium">{province.recommendedRecipe.servings}</span>
              </div>
            </div>

            {/* Tab Controllers */}
            <div className="flex border-b border-primary/10 mb-6 font-sans text-xs tracking-wider">
              <button 
                onClick={() => setActiveTab('recipe')}
                className={`pb-3 pr-6 font-bold uppercase transition-all duration-300 relative ${
                  activeTab === 'recipe' 
                    ? 'text-primary' 
                    : 'text-on-surface-variant/60 hover:text-primary'
                }`}
              >
                Resep Masak
                {activeTab === 'recipe' && (
                  <div className="absolute bottom-0 left-0 right-6 h-0.5 bg-primary"></div>
                )}
              </button>
              
              <button 
                onClick={() => setActiveTab('philosophy')}
                className={`pb-3 px-6 font-bold uppercase transition-all duration-300 relative ${
                  activeTab === 'philosophy' 
                    ? 'text-primary' 
                    : 'text-on-surface-variant/60 hover:text-primary'
                }`}
              >
                Sejarah &amp; Filosofi
                {activeTab === 'philosophy' && (
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-primary"></div>
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-grow">
              {activeTab === 'recipe' ? (
                <div className="animate-fade-in">
                  {/* Ingredients Check-list */}
                  <h4 className="font-serif text-lg text-primary mb-3">
                    Bahan-Bahan Rempah Masakan:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 font-sans text-xs text-on-surface-variant leading-relaxed">
                    {province.ingredients.map((ing, idx) => (
                      <li 
                        key={idx}
                        onClick={() => toggleIngredient(idx)}
                        className={`flex items-start gap-2 p-1.5 cursor-pointer rounded hover:bg-surface-container-low transition-colors select-none ${
                          checkedIngredients[idx] ? 'line-through opacity-50 text-on-surface-variant/50' : ''
                        }`}
                      >
                        <span className="material-symbols-outlined text-primary text-sm mt-0.5" style={{ fontVariationSettings: checkedIngredients[idx] ? "'FILL' 1" : "'FILL' 0" }}>
                          {checkedIngredients[idx] ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Steps detailed lists */}
                  <h4 className="font-serif text-lg text-primary mb-3">
                    Langkah-Langkah Pembuatan:
                  </h4>
                  <ol className="flex flex-col gap-4 font-sans text-xs text-on-surface-variant leading-relaxed">
                    {province.recommendedRecipe.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 p-2 bg-surface-container-lowest/50 rounded-md border border-primary/5">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 text-primary font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="animate-fade-in font-sans text-xs text-on-surface-variant leading-relaxed">
                  <h4 className="font-serif text-lg text-primary mb-3">
                    Asal-Usul &amp; Filosofi Tradisional
                  </h4>
                  <p className="mb-4 text-justify leading-relaxed whitespace-pre-line text-sm text-[#d1c5b4]">
                    {province.history}
                  </p>
                  
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-md mt-6 flex gap-3.5 items-start">
                    <span className="material-symbols-outlined text-primary text-2xl mt-0.5">info</span>
                    <div>
                      <h5 className="text-primary font-bold text-xs mb-1 uppercase tracking-wider">Keaslian Bumbu Rempah</h5>
                      <p className="text-[11px] leading-relaxed">
                        Masakan Tradisional Nusa Tenggara Timur mau pun seluruh Indonesia terkenal kaya akan ragi lokal dan keautentikan bahan baku segar. Menghargai dan mengeksplorasi rempah lokal membina kelestarian pusaka boga leluhur kita.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
