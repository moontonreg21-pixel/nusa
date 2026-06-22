import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXTRA_PROVINCES_DETAILS, ExtraDish } from '../extraDishesData';

interface DynamicProvinceDetailProps {
  provinceId: string;
  onBack: () => void;
  onViewRecipe?: (recipe: any) => void;
}

export function DynamicProvinceDetail({ provinceId, onBack, onViewRecipe }: DynamicProvinceDetailProps) {
  const detail = EXTRA_PROVINCES_DETAILS[provinceId];
  const [selectedDish] = useState<ExtraDish | null>(null);

  const setSelectedDish = (dish: ExtraDish | null) => {
    if (dish && onViewRecipe && detail) {
      onViewRecipe({
        name: dish.name,
        provinceName: detail.title,
        imageUrl: dish.imageUrl,
        rating: dish.rating,
        description: dish.description,
        history: dish.history,
        ingredients: dish.ingredients,
        cookingSteps: dish.cookingSteps
      });
    }
  };
  const [activeTab, setActiveTab] = useState<'recipe' | 'philosophy'>('recipe');

  if (!detail) {
    return (
      <div className="batik-dark-bg min-h-screen py-20 text-center flex flex-col justify-center items-center">
        <h3 className="font-serif text-2xl text-primary font-bold mb-4">Wilayah Tidak Ditemukan</h3>
        <button 
          onClick={onBack}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded hover:brightness-110 active:scale-95 transition-all text-xs tracking-widest uppercase"
        >
          Kembali ke Galeri
        </button>
      </div>
    );
  }

  return (
    <div className="batik-dark-bg min-h-screen py-10 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 text-on-surface">
      {/* Back Button */}
      <motion.button 
        id={`back-to-gallery-${provinceId}`}
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="self-start flex items-center gap-2 text-primary hover:text-primary-fixed font-sans text-xs tracking-widest font-bold uppercase cursor-pointer py-2 px-4 border border-primary/20 hover:border-primary/50 bg-[#131311]/60 backdrop-blur rounded"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Kembali ke Galeri
      </motion.button>

      {/* 1. Immersive Hero Section */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt={detail.title} 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src={detail.heroImageUrl} 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold text-shadow">
            {detail.subtitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            {detail.title}
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed text-shadow-sm">
            {detail.philosophyDesc.slice(0, 160)}... Temukan simfoni resep rahasia masa lampau dan petualangan rasa di bawah pelukan sejarah adat istiadat setempat.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low/60">
          <img 
            alt="Pemandangan Seni & Tradisi Daerah" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src={detail.dishes[1]?.imageUrl || detail.heroImageUrl}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            FILOSOFI & KEARIFAN PANGAN
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            {detail.philosophyTitle}
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            {detail.philosophyDesc}
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2 leading-relaxed">
            &ldquo;{detail.quote}&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - {detail.quoteAuthor}
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                {detail.subKeyAdat}
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                {detail.subKeyAdatDesc}
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                {detail.subKeyNgayah}
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                {detail.subKeyNgayahDesc}
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center shrink-0">
              <span className="block font-serif text-xl sm:text-2xl text-primary font-bold">{detail.unescoLabel}</span>
              <span className="font-sans text-[8px] sm:text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                STATUS ADAT
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                {detail.unescoQuote}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. Signature Dishes Bento Grid */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            FESTIVAL RASA MAKANAN DAERAH
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Pusaka {detail.title.split(': ')[1] || detail.title}
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Klik hidangan di bawah ini untuk melihat detail resep autentik, takaran bumbu rempah pusaka, dan nilai historisnya secara langsung.
          </p>
        </div>

        {/* Bento Grid Layout - 4 dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detail.dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              onClick={() => setSelectedDish(dish)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative h-[320px] cursor-pointer overflow-hidden rounded-xl border border-primary/10 bg-surface-container-low/30 shadow-md transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/45 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <span className="font-sans text-[10px] tracking-[0.2em] text-primary/80 mb-1.5 font-bold uppercase block">
                  KULINER HIDANGAN PILIHAN
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {dish.name}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 max-w-xl group-hover:text-on-surface transition-colors duration-300">
                  {dish.description}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-[9px] sm:text-[10px] font-bold tracking-wider text-primary uppercase">
                  <span>Lihat Resep &amp; Kisah Adat</span>
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                    arrow_right_alt
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 4. Spices and Botanical Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            REMPAH UTAMA PEMBENTUK RASA
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Rogo Segoro: Esensi Bumbu Autentik
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Cita rasa sejati boga daerah terbentuk dari kebiasaan botani pusaka yang terbaring melimpah di bawah naungan iklim khatulistiwa. Berikut adalah tiga rempah utama penyokong keharuman masakan di wilayah ini:
          </p>
          
          <div className="flex flex-col gap-4 mt-2">
            {detail.spices.map((spice) => (
              <div 
                key={spice.name}
                className="flex gap-4 p-4 rounded-xl border border-primary/10 bg-surface-container-low/40 hover:bg-surface-container-low/75 transition-colors"
              >
                <div className="w-10 h-10 shrink-0 rounded-full border border-primary/25 bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                </div>
                <div>
                  <h4 className="font-sans text-xs text-primary font-bold tracking-wide uppercase mb-1">
                    {spice.name}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify">
                    {spice.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low/60">
          <img 
            alt="Authentic Indonesian spices bundle" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src={detail.dishes[0]?.imageUrl || detail.heroImageUrl}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13110e]/60 to-transparent"></div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 5. Arts & Landscapes Area */}
      <section className="bg-surface-container-low/50 border border-primary/15 rounded-2xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <span className="font-sans text-xs tracking-[0.25em] font-bold text-primary uppercase block">
            TONTONAN WARISAN SENI & BUDAYA
          </span>
          <h4 className="font-serif text-2xl md:text-3xl font-bold text-on-surface">
            {detail.dance}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed text-justify">
            {detail.danceDesc}
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center border-t md:border-t-0 md:border-l border-primary/10 pt-6 md:pt-0 md:pl-10">
          <span className="font-sans text-xs tracking-[0.25em] font-bold text-primary uppercase block">
            SITUS BUDAYA TERKAIT
          </span>
          <h4 className="font-serif text-2xl md:text-3xl font-bold text-on-surface">
            {detail.site}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed text-justify">
            {detail.siteDesc}
          </p>
        </div>
      </section>

      {/* 6. Signature Interactive Dishes Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0e0c]/90 overflow-y-auto backdrop-blur-sm animate-fade-in">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4 }}
              className="relative bg-surface border border-primary/20 w-full max-w-5xl rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(233,193,118,0.15)] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 z-55 w-10 h-10 rounded-full bg-surface-lowest/80 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95 cursor-pointer"
                aria-label="Tutup Detail"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Left Column: Image */}
              <div className="md:col-span-5 relative bg-[#13110e] flex flex-col h-full min-h-[300px] md:min-h-0 md:max-h-[90vh]">
                <div className="relative h-full w-full">
                  <img 
                    className="w-full h-full object-cover absolute inset-0" 
                    src={selectedDish.imageUrl} 
                    alt={selectedDish.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13110e]/40 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded">
                    <span className="font-sans text-[10px] tracking-widest font-extrabold text-primary uppercase">
                      PILIHAN UTAMA
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Recipe tabs */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col overflow-y-auto md:max-h-[85vh]" style={{ scrollbarWidth: 'thin' }}>
                <div className="mb-6">
                  <span className="font-sans text-[11px] tracking-widest font-bold text-primary uppercase">
                    KULINER PUSAKA DAERAH
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
                    {selectedDish.name}
                  </h2>
                </div>

                {/* Tabs button */}
                <div className="flex border-b border-primary/15 gap-6 mb-6 font-sans text-xs tracking-widest font-bold">
                  <button 
                    onClick={() => setActiveTab('recipe')}
                    className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === 'recipe' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/60 hover:text-primary'}`}
                  >
                    RESEP & BAHAN
                  </button>
                  <button 
                    onClick={() => setActiveTab('philosophy')}
                    className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === 'philosophy' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/60 hover:text-primary'}`}
                  >
                    NILAI SEJARAH
                  </button>
                </div>

                {/* Tab content */}
                <div className="flex-grow">
                  {activeTab === 'recipe' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <h4 className="font-serif text-sm text-primary font-bold tracking-wide mb-3">
                          Bahan-Bahan Esensial
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {selectedDish.ingredients.map((ing) => (
                            <li 
                              key={ing}
                              className="font-sans text-xs text-on-surface-variant leading-relaxed flex items-start gap-2.5 py-1"
                            >
                              <span className="material-symbols-outlined text-primary text-xs mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                                done
                              </span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-primary/10 pt-5">
                        <h4 className="font-serif text-sm text-primary font-bold tracking-wide mb-4">
                          Langkah Pembuatan Karamelisasi
                        </h4>
                        <ol className="flex flex-col gap-4">
                          {selectedDish.cookingSteps.map((step, sIdx) => (
                            <li 
                              key={sIdx}
                              className="font-sans text-xs text-on-surface-variant leading-relaxed flex gap-4 items-start"
                            >
                              <span className="w-5 h-5 rounded-full border border-primary/35 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span className="text-justify">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'philosophy' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <h4 className="font-serif text-sm text-primary font-bold tracking-wide mb-1">
                        Kisah Asimilasi &amp; Tradisi Adat
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify">
                        {selectedDish.history}
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant/80 border-l border-primary/25 pl-4 py-1 italic text-justify">
                        Sebagai bagian dari pusaka takbenda, teknik mengolah sajian ini diturunkan secara turun-temurun sebagai bagian dari kehormatan diri keluarga dalam melestarikan karunia kearifan boga nusantara.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
