import React from 'react';

interface HeaderProps {
  onNavClick: (view: 'home' | 'gallery' | 'ai-chat' | 'about' | 'yogyakarta' | 'bali' | 'kaltim' | 'papua' | 'jabar' | 'aceh' | 'sumbar' | 'sulsel' | 'maluku' | 'ntt' | 'province-detail') => void;
  activeView: string;
}

export function Header({ onNavClick, activeView }: HeaderProps) {
  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 border-b border-primary/10 shadow-[0_4px_30px_rgba(233,193,118,0.02)] z-40 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-7xl mx-auto">
        {/* Logo and Name */}
        <div 
          onClick={() => onNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer select-none group"
          id="brand-logo"
        >
          {/* Custom SVG logo mimicking the uploaded image layout */}
          <div className="flex items-center gap-3">
            {/* Indonesia Map Silhouette SVG in golden cream */}
            <svg 
              className="w-16 md:w-20 h-auto text-primary/70 group-hover:text-primary transition-colors duration-300 filter drop-shadow-[0_0_2px_rgba(233,193,118,0.1)]" 
              viewBox="0 0 110 50" 
              fill="currentColor"
              aria-hidden="true"
            >
              {/* Sumatra */}
              <path d="M5,10 C10,13 18,22 23,28 C25,31 22,34 18,34 C12,34 8,24 4,14 C3,11 4,9 5,10 Z" opacity="0.8" />
              {/* Java */}
              <path d="M22,39 C28,40 38,41 45,42 C48,42 46,45 42,45 C35,45 25,43 21,41 C20,40 21,39 22,39 Z" opacity="0.8" />
              {/* Kalimantan */}
              <path d="M34,14 C38,12 45,15 48,19 C50,22 47,27 43,28 C38,29 33,25 32,21 C31,17 32,15 34,14 Z" opacity="0.8" />
              {/* Sulawesi */}
              <path d="M58,16 C60,15 62,17 61,19 C59,20 56,22 56,24 C57,26 60,25 61,26 C62,27 60,29 58,29 C56,29 54,27 54,25 C53,24 53,22 55,21 C57,20 58,18 58,16 Z" opacity="0.8" />
              <path d="M60,19 C63,18 64,20 62,22 C60,24 58,25 58,23 C58,21 59,20 60,19 Z" opacity="0.8" />
              {/* Papua */}
              <path d="M85,25 C92,20 98,22 104,26 C105,27 103,29 99,29 C95,29 92,33 90,36 C89,37 87,35 87,33 C87,30 84,28 85,25 Z" opacity="0.8" />
              {/* Small details / islands */}
              <circle cx="48" cy="43" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="51" cy="44" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="55" cy="44" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="59" cy="44" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="65" cy="44" r="1.3" opacity="0.8" fill="currentColor"/>
              <circle cx="70" cy="43" r="1.3" opacity="0.8" fill="currentColor"/>
              <circle cx="78" cy="41" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="72" cy="22" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="77" cy="18" r="0.9" opacity="0.8" fill="currentColor"/>
              <circle cx="75" cy="29" r="1.1" opacity="0.8" fill="currentColor"/>
              <circle cx="79" cy="27" r="1.1" opacity="0.8" fill="currentColor"/>
            </svg>

            {/* Vertical space divider */}
            <div className="h-8 w-px bg-primary/20"></div>

            {/* Brand text + crossed cutlery in gold */}
            <div className="flex flex-col justify-center select-none">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="font-serif text-sm md:text-base text-primary font-bold tracking-[0.16em] leading-none">
                  NUSA
                </span>
                
                {/* Crossed spoon and fork icon SVG */}
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Spoon */}
                  <path d="M17 4 C15.5 4 14.5 5.5 14.5 7 C14.5 8.5 15.5 9.5 17 9.5 C18.5 9.5 19.5 8.5 19.5 7 C19.5 5.5 18.5 4 17 4 Z" fill="currentColor" />
                  <path d="M15.5 8.5 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  {/* Fork */}
                  <path d="M7 6 L7 10 M5 6 L5 10 M9 6 L9 10 M5 10 C5 11.5 6 12.5 7.5 12.5 C9 12.5 10 11.5 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7.5 12 L17 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-serif text-[9px] md:text-xs text-primary/80 font-medium tracking-[0.2em] mt-0.5 uppercase leading-none">
                CULINARY
              </span>
            </div>
          </div>
        </div>

        {/* Central Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavClick('home')}
            className={`font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${
              activeView === 'home' 
                ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full" 
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            BERANDA
          </button>
          <span className="text-primary/20 text-xs">|</span>
          <button 
            onClick={() => onNavClick('gallery')}
            className={`font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${
              activeView === 'gallery'
                ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            DAERAH
          </button>
          <span className="text-primary/20 text-xs">|</span>
          <button 
            onClick={() => onNavClick('about')}
            className={`font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${
              activeView === 'about'
                ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            TENTANG KAMI
          </button>
        </nav>

        {/* Call to Action Button */}
        <button 
          onClick={() => onNavClick('gallery')}
          className="cursor-pointer font-sans text-[10px] md:text-xs tracking-[0.15em] font-semibold uppercase text-primary border border-primary/30 px-4 md:px-6 py-2.5 hover:bg-primary/10 active:scale-95 transition-all duration-200"
          id="btn-jelajah"
        >
          JELAJAH DAERAH
        </button>
      </div>
    </header>
  );
}

