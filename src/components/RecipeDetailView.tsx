import React, { useState } from 'react';
import { motion } from 'motion/react';

export interface RecipeDetail {
  name: string;
  provinceName: string;
  imageUrl: string;
  rating?: string;
  description: string;
  history: string;
  ingredients: string[];
  cookingSteps: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
}

interface RecipeDetailViewProps {
  recipe: RecipeDetail;
  onBack: () => void;
  onAskAI: (query: string) => void;
}

export function RecipeDetailView({ recipe, onBack, onAskAI }: RecipeDetailViewProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const speakWithAIChef = () => {
    const query = `Halo Chef, tolong ajari saya panduan langkah demi langkah yang interaktif dan komprehensif untuk memasak hidangan ${recipe.name} khas ${recipe.provinceName}. Berikan tips-tips eksklusif koki bintang lima agar masakan saya beraroma autentik dan bumbunya benar-benar meresap!`;
    onAskAI(query);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 animate-fade-in text-on-surface">
      {/* Back Button and Navigation Path */}
      <div className="flex items-center gap-2 mb-8 text-xs font-sans text-on-surface-variant">
        <button 
          onClick={onBack}
          className="cursor-pointer flex items-center gap-1.5 text-primary hover:text-primary-light font-bold uppercase transition-colors"
        >
          <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
          <span>Kembali</span>
        </button>
        <span className="text-on-surface-variant/40">•</span>
        <span className="uppercase tracking-widest">{recipe.provinceName}</span>
        <span className="text-on-surface-variant/40">•</span>
        <span className="text-primary tracking-wider font-semibold uppercase">{recipe.name}</span>
      </div>

      {/* Grid Layout: Left Side Info & Right Side Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column (5 Cols) - Visual Hero & Ingredients */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Main Hero Image Panel */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary/20 bg-surface-container-low shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.name} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent"></div>
            
            {recipe.rating && (
              <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1.5 font-sans text-[10px] tracking-wider font-black rounded-full flex items-center gap-1 shadow-2xl">
                <span className="material-symbols-outlined text-[11px] leading-none text-on-primary font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{recipe.rating} RATING</span>
              </div>
            )}

            <div className="absolute bottom-4 left-6 z-10">
              <span className="font-sans text-[9px] tracking-[0.25em] font-black text-primary uppercase">CITA RASA LEGENDARIS</span>
              <h2 className="font-serif text-2xl font-bold text-on-surface mt-1">{recipe.name}</h2>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="grid grid-cols-3 gap-2 bg-surface-container-low/40 p-4 border border-primary/10 rounded-xl text-center text-xs">
            <div className="py-1">
              <div className="text-primary font-bold flex justify-center items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">Persiapan</span>
              </div>
              <span className="text-on-surface-variant font-medium font-sans text-[11px]">{recipe.prepTime || '15 Menit'}</span>
            </div>
            <div className="border-x border-primary/10 py-1">
              <div className="text-primary font-bold flex justify-center items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm">restaurant_menu</span>
                <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">Memasak</span>
              </div>
              <span className="text-on-surface-variant font-medium font-sans text-[11px]">{recipe.cookTime || '45 Menit'}</span>
            </div>
            <div className="py-1">
              <div className="text-primary font-bold flex justify-center items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm">group</span>
                <span className="font-sans text-[10px] tracking-wider uppercase font-semibold">Porsi</span>
              </div>
              <span className="text-on-surface-variant font-medium font-sans text-[11px]">{recipe.servings || '4-5 Porsi'}</span>
            </div>
          </div>

          {/* Silsilah / History block */}
          <div className="bg-primary/5 border-l-2 border-primary/40 p-6 rounded-r-xl">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-[11px] uppercase mb-2 font-sans">
              <span className="material-symbols-outlined text-sm font-semibold">history_edu</span>
              <span>Filosofi &amp; Silsilah</span>
            </div>
            <p className="font-serif text-xs md:text-sm text-on-surface-variant leading-relaxed text-justify italic">
              &ldquo;{recipe.history}&rdquo;
            </p>
          </div>

          {/* Checklist Ingredients block */}
          <div className="bg-surface-container-low/20 border border-primary/10 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif text-lg text-primary font-bold">
                Bahan &amp; Rampah Utama
              </h4>
              <span className="font-sans text-[9px] text-on-surface-variant/60 tracking-wider uppercase font-medium">
                Saran Takaran Autentik
              </span>
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant/80 mb-4">
              Sentuh bahan di bawah ini untuk mencentang bumbu yang sudah Anda persiapkan di dapur:
            </p>
            <ul className="flex flex-col gap-2 font-sans text-xs text-on-surface-variant leading-relaxed">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <li 
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-start gap-2.5 p-2 md:p-2.5 cursor-pointer rounded-lg hover:bg-primary/5 transition-colors select-none border border-transparent ${
                      isChecked ? 'bg-primary/5 line-through opacity-50 text-on-surface-variant/60' : 'bg-surface-container-low/40 border-primary/5'
                    }`}
                  >
                    <span 
                      className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0 transition-all duration-300"
                      style={{ fontVariationSettings: isChecked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {isChecked ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <span>{ing}</span>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Right Column (7 Cols) - Detailed Preparation Steps */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          
          {/* Header Title Information */}
          <div className="border-b border-primary/10 pb-6 mb-2">
            <span className="font-sans text-xs tracking-[0.3em] font-extrabold text-primary uppercase block mb-2">
              PANDUAN MEMASAK UTAMA
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
              Tata Cara &amp; Proses Memasak
            </h1>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-2 text-justify">
              Ikuti setiap tahapan langkah pembuatan koki legendaris berikut secara cermat demi melahirkan kelezatan kuliner pusaka yang seimbang, presisi, dan harum memikat jiwa.
            </p>
          </div>

          {/* Interactive Steps Card list */}
          <div className="flex flex-col gap-4">
            {recipe.cookingSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 md:p-6 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                    isActive 
                      ? 'bg-primary/5 border-primary shadow-[0_4px_16px_rgba(233,193,118,0.1)]' 
                      : 'bg-surface-container-low/30 border-primary/10 hover:border-primary/20'
                  }`}
                >
                  {/* Step list tag index circle */}
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold tracking-wider font-sans text-xs shrink-0 border transition-colors ${
                    isActive 
                      ? 'bg-primary text-on-primary border-primary' 
                      : 'bg-surface-container/50 text-primary border-primary/20'
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Step textual logs */}
                  <div className="flex flex-col gap-1.5 flex-grow">
                    <span className="font-sans text-[10px] tracking-widest font-black text-primary uppercase">
                      LANGKAH {idx + 1}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-on-surface leading-relaxed text-justify">
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Interactive Assistant Call Action Block */}
          <div className="mt-8 p-6 md:p-8 bg-surface-container-low/50 border border-primary/25 rounded-2xl flex flex-col items-center gap-5 text-center shadow-md">
            <span className="material-symbols-outlined text-primary text-3xl font-semibold animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
              temp_preferences_custom
            </span>
            <div className="max-w-md">
              <h5 className="font-serif text-lg text-on-surface font-bold">
                Butuh Bimbingan Interaktif Langsung?
              </h5>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed mt-2">
                Jangan khawatir tentang takaran bumbu atau suhu api! Koki asisten AI handal kami siap menuntun Anda memasak hidangan <strong>{recipe.name}</strong> ini secara interaktif di dapur tiap detik Anda melangkah.
              </p>
            </div>
            
            <button 
              onClick={speakWithAIChef}
              className="cursor-pointer w-full bg-primary text-on-primary font-sans text-xs tracking-widest font-extrabold py-3.5 rounded-lg active:scale-95 transition-all shadow-[0_4px_15px_rgba(233,193,118,0.25)] hover:shadow-[0_8px_25px_rgba(233,193,118,0.4)] text-center uppercase"
            >
              Pandu Saya dengan AI Koki
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
