import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ProvinceData } from '../types';
import { PROVINCES } from '../data';
import { motion } from 'motion/react';

interface RegionGalleryProps {
  onSelectProvince: (province: ProvinceData) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TERRITORIES = ['SEMUA', 'SUMATERA', 'JAWA', 'SULAWESI', 'BALI', 'KALIMANTAN', 'NUSA TENGGARA', 'MALUKU', 'PAPUA'];

export function RegionGallery({ onSelectProvince, searchQuery, setSearchQuery }: RegionGalleryProps) {
  const [selectedTerritory, setSelectedTerritory] = useState<string>('SEMUA');
  const galleryRef = useRef<HTMLDivElement>(null);

  // Filter provinces based on search query AND territory button
  const filteredProvinces = useMemo(() => {
    return PROVINCES.filter(p => {
      const matchesTerritory = selectedTerritory === 'SEMUA' || p.territory === selectedTerritory;
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(q) ||
        p.dishName.toLowerCase().includes(q) ||
        p.territory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
        p.history.toLowerCase().includes(q);

      return matchesTerritory && matchesSearch;
    });
  }, [selectedTerritory, searchQuery]);

  // Featured provinces slideshow state & metadata
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredSlides = useMemo(() => {
    const ids = ['bali', 'sumbar', 'yogyakarta', 'papua'];
    const provinces = ids.map(id => PROVINCES.find(p => p.id === id)).filter(Boolean) as ProvinceData[];
    
    const highlights = [
      {
        id: 'bali',
        name: 'Bali',
        title: 'Bali: Pulau Dewata',
        desc: 'Bukan sekadar destinasi, melainkan simfoni rasa kuliner agung. Dari gurihnya Babi Guling hingga harum rempah base genep dan kelapa parut Sate Lilit gurih nan legendaris.',
        bannerUrl: '/regions/bali.jpg',
        actionLabel: 'JELAJAHI BALI'
      },
      {
        id: 'sumbar',
        name: 'Sumatera Barat',
        title: 'Sumatera Barat: Bumi Minangkabau',
        desc: 'Rumah bagi rendang pusaka yang diakui dunia. Racikan bumbu rempah kelapa karamel hitam, berpadu keagungan budaya adat Minang dalam kesabaran waktu membakar rasa emas.',
        bannerUrl: '/regions/sumatera-barat.jpg',
        actionLabel: 'JELAJAHI SUMBAR'
      },
      {
        id: 'yogyakarta',
        name: 'Yogyakarta',
        title: 'Yogyakarta: Istana Budaya',
        desc: 'Manis gurih Gudeg Jogja bercerita tentang kesabaran leluhur dalam harmoni rasa. Olahan tulus nangka muda, santan tua kelapa gurih, serta manis madu gula aren Mataram.',
        bannerUrl: '/regions/yogyakarta.jpg',
        actionLabel: 'JELAJAHI JOGJA'
      },
      {
        id: 'papua',
        name: 'Papua',
        title: 'Papua: Bumi Cendrawasih',
        desc: 'Eksotisme rasa di timur nusantara terpancar dalam sepiring Papeda Kuah Kuning segar. Kelembutan sagu berpadu kuah rempah murni aromatik, melambangkan kemurnian alam rimba luas.',
        bannerUrl: '/regions/papua.jpg',
        actionLabel: 'JELAJAHI PAPUA'
      }
    ];

    return highlights.map(hl => {
      const p = provinces.find(x => x.id === hl.id);
      return {
        ...p,
        ...hl,
        provObj: p
      };
    });
  }, []);

  // Autoplay the highlight slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % featuredSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + featuredSlides.length) % featuredSlides.length);
  };

  // Handling carousel arrow scroll logic
  const handleScrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -344, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 344, behavior: 'smooth' });
    }
  };

  return (
    <div id="jelajahi-section" className="bg-pattern py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* 1. Header & Search Section */}
      <section className="mb-20 text-center animate-fade-in">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight tracking-tight mb-6">
          Jelajahi Nusantara
        </h2>
        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          Ekspedisi kuliner melintasi ribuan pulau, mengungkap rahasia bumbu warisan dan cita rasa autentik dari setiap sudut Indonesia.
        </p>

        {/* Input search bar */}
        <div className="max-w-xl mx-auto relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors duration-300">
            search
          </span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              // Reset category to "SEMUA" automatically to ensure comprehensive global search
              if (query.trim() !== "") {
                setSelectedTerritory("SEMUA");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && filteredProvinces.length > 0) {
                // Instantly open the first matching province detail on Enter
                onSelectProvince(filteredProvinces[0]);
              }
            }}
            className="w-full bg-surface-container/60 border-b border-primary/40 focus:border-primary focus:ring-0 text-on-surface py-4 pl-14 pr-10 transition-all duration-300 outline-none placeholder:text-on-surface-variant/40 rounded-t-md text-sm tracking-wide"
            placeholder="Cari daerah, masakan, rempah atau bahan..."
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary text-on-surface-variant/75 text-sm transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Quick Island Segment Controls */}
        <div className="flex flex-wrap gap-2 justify-center mt-8 max-w-3xl mx-auto">
          {TERRITORIES.map((terr) => (
            <button
              key={terr}
              onClick={() => setSelectedTerritory(terr)}
              className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
                selectedTerritory === terr
                  ? 'bg-primary text-on-primary font-semibold shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary border border-primary/10'
              }`}
            >
              {terr}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Province of the Month (Featured Carousel) */}
      <section className="mb-24 animate-fade-in relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-grow">
            <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
              SOROTAN BULAN INI
            </span>
            <div className="h-px flex-grow bg-primary/20"></div>
          </div>
          
          {/* Quick arrows for featured slide */}
          <div className="flex gap-2 ml-4">
            <button 
              onClick={handlePrevSlide}
              className="cursor-pointer w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:bg-primary/5 active:scale-90 transition-all"
              title="Sebelumnya"
              id="featured-prev-btn"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button 
              onClick={handleNextSlide}
              className="cursor-pointer w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary/70 hover:text-primary hover:bg-primary/5 active:scale-90 transition-all"
              title="Berikutnya"
              id="featured-next-btn"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="relative w-full rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-colors duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.4)] aspect-[16/9] md:aspect-[21/9]">
          
          {/* Sliding wrapper */}
          {featuredSlides.map((slide, idx) => {
            const isActive = idx === activeSlide;
            return (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-4 pointer-events-none z-0'
                }`}
              >
                <div className="w-full h-full relative group">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                    src={slide.bannerUrl} 
                    alt={`${slide.name} sorotan mulia`} 
                  />
                  
                  {/* Overlay with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/50 md:via-surface/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-transparent to-transparent"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-3xl">
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-primary mb-2 uppercase font-bold">
                      PROVINSI PILIHAN
                    </span>
                    <h3 className="font-serif text-2xl md:text-4xl text-on-surface mb-3 font-semibold group-hover:text-primary transition-colors duration-300">
                      {slide.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant line-clamp-3 md:line-clamp-2 max-w-xl mb-6 md:mb-8 leading-relaxed">
                      {slide.desc}
                    </p>
                    <button 
                      onClick={() => slide.provObj && onSelectProvince(slide.provObj)}
                      className="cursor-pointer self-start px-6 md:px-8 py-3 bg-primary text-on-primary font-sans text-xs tracking-widest font-bold hover:brightness-110 transition-all active:scale-95 uppercase shadow-lg"
                    >
                      {slide.actionLabel}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slideshow dot indicators */}
        <div className="flex justify-center gap-1.5 mt-4 z-20">
          {featuredSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${
                idx === activeSlide ? 'w-6 bg-primary' : 'w-1.5 bg-primary/20 hover:bg-primary/45'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Cultural Divider Custom Component */}
      <div className="cultural-divider mb-24"></div>

      {/* 3. Province Grid (Galleries) */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h4 className="font-serif text-2xl md:text-3xl text-on-surface font-semibold tracking-wide">
              {searchQuery ? "Hasil Pencarian" : "Pusaka Kuliner Daerah"}
            </h4>
            <p className="font-sans text-sm text-on-surface-variant/80 mt-1">
              {searchQuery 
                ? `Menampilkan ${filteredProvinces.length} hasil untuk "${searchQuery}"`
                : "Pilih destinasi Anda untuk memulai perjalanan rasa."}
            </p>
          </div>
          
          {/* Slider controls */}
          <div className="flex gap-3">
            <button 
              onClick={handleScrollLeft}
              className="w-10 h-10 rounded-full border border-primary/25 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 hover:border-primary active:scale-95"
              aria-label="Scroll link left"
            >
              <span className="material-symbols-outlined text-sm font-semibold">arrow_back</span>
            </button>
            <button 
              onClick={handleScrollRight}
              className="w-10 h-10 rounded-full border border-primary/25 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 hover:border-primary active:scale-95"
              aria-label="Scroll link right"
            >
              <span className="material-symbols-outlined text-sm font-semibold">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Dynamic empty state */}
        {filteredProvinces.length === 0 ? (
          <div className="text-center py-20 bg-surface-container/20 rounded-xl border border-primary/5">
            <span className="material-symbols-outlined text-primary/40 text-5xl mb-3">question_mark</span>
            <h5 className="font-serif text-lg text-primary">Tidak Ada Hasil</h5>
            <p className="font-sans text-sm text-on-surface-variant max-w-sm mx-auto mt-1">
              Tidak dapat menemukan pusaka kuliner untuk kata kunci "{searchQuery}". Silakan coba kata kunci lain.
            </p>
          </div>
        ) : (
          /* Cards Grid Scroller Container */
          <div 
            ref={galleryRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProvinces.map((prov, index) => (
              <motion.div 
                key={prov.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                onClick={() => onSelectProvince(prov)}
                className="group cursor-pointer bg-surface-container-low/40 rounded-lg p-3 hover:bg-surface-container/50 border border-primary/5 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(233,193,118,0.08)] snap-start shrink-0 w-[280px] sm:w-[320px]"
              >
                {/* Culinary Image Area */}
                <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-4 border border-primary/10">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={prov.imageUrl} 
                    alt={prov.dishName} 
                    loading="lazy"
                  />
                  {/* Subtle Gradient vignette on images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating Territory Ribbon */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-surface-dim/80 backdrop-blur-sm px-2.5 py-1 rounded">
                    <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      eco
                    </span>
                    <span className="font-sans text-[8px] tracking-[0.15em] font-extrabold text-primary uppercase">
                      {prov.territory}
                    </span>
                  </div>
                </div>

                {/* Info Text Area */}
                <h5 className="font-serif text-lg text-on-surface group-hover:text-primary transition-colors duration-300 font-semibold mb-1">
                  {prov.name}
                </h5>
                <h6 className="font-sans text-xs text-primary font-medium tracking-wide mb-2">
                  {prov.dishName}
                </h6>
                <p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {prov.description}
                </p>
                
                {/* Visual anchor at the card bottom */}
                <div className="flex items-center gap-1.5 mt-4 text-[10px] text-primary/60 font-semibold tracking-wider group-hover:text-primary transition-colors duration-300 uppercase">
                  <span>Lihat Resep & Budaya</span>
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
