import React, { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  onNavClick: (view: 'home' | 'gallery' | 'regions' | 'about' | 'yogyakarta' | 'bali' | 'kaltim' | 'papua' | 'jabar' | 'aceh' | 'sumbar' | 'sulsel' | 'maluku' | 'ntt' | 'province-detail') => void;
  activeView: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ onNavClick, activeView, searchQuery, setSearchQuery }: HeaderProps) {
  const isHome = activeView === 'home';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearchOpen(true);
    if (searchQuery.trim()) {
      onNavClick('regions');
    }
  };

  return (
    <header className={`${isHome ? 'absolute bg-transparent border-transparent shadow-none' : 'sticky bg-surface/90 backdrop-blur-md border-primary/10 shadow-[0_4px_30px_rgba(233,193,118,0.02)]'} top-0 border-b z-40 transition-all duration-300 w-full`}>
      <div className="flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-7xl mx-auto">
        {/* Logo and Name */}
        <div 
          onClick={() => onNavClick('home')} 
          className="flex items-center cursor-pointer select-none group"
          id="brand-logo"
        >
          <img
            src="/logo.png"
            alt="Nusa Culinary"
            className="h-10 w-auto max-w-[180px] object-contain transition-opacity duration-300 group-hover:opacity-90 md:h-12 md:max-w-[230px]"
          />
        </div>

        {/* Central Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavClick('home')}
            className={`font-sans text-sm transition-all duration-300 relative py-2 ${
              activeView === 'home' 
                ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                : `${isHome ? 'text-white' : 'text-on-surface-variant'} hover:text-primary`
            }`}
          >
            Beranda
          </button>
          <button 
            onClick={() => onNavClick('regions')}
            className={`font-sans text-sm transition-all duration-300 relative py-2 ${
              activeView === 'regions'
                ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                : `${isHome ? 'text-white' : 'text-on-surface-variant'} hover:text-primary`
            }`}
          >
            Daerah
          </button>
          <button 
            onClick={() => onNavClick('about')}
            className={`font-sans text-sm transition-all duration-300 relative py-2 ${
              activeView === 'about'
                ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                : `${isHome ? 'text-white' : 'text-on-surface-variant'} hover:text-primary`
            }`}
          >
            Tentang
          </button>
        </nav>

        {/* Header Search */}
        <form
          onSubmit={handleSearchSubmit}
          className={`group relative flex h-10 items-center overflow-hidden rounded-full border border-primary/60 text-primary transition-all duration-300 ${
            isSearchOpen ? 'w-[210px] bg-[#13110e]/85 md:w-[260px]' : 'w-10 bg-transparent hover:bg-primary/10'
          }`}
          id="btn-jelajah"
        >
          {isSearchOpen && (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onBlur={() => {
                if (!searchQuery.trim()) {
                  setIsSearchOpen(false);
                }
              }}
              className="h-full min-w-0 flex-1 bg-transparent pl-4 pr-10 font-sans text-xs font-semibold text-white outline-none placeholder:text-white/55"
              placeholder="Cari makanan atau daerah..."
            />
          )}
          <button
            type={isSearchOpen ? 'submit' : 'button'}
            onClick={() => {
              if (!isSearchOpen) {
                setIsSearchOpen(true);
              }
            }}
            className={`grid h-10 w-10 shrink-0 cursor-pointer place-items-center transition-colors ${
              isSearchOpen ? 'absolute right-0 top-0 hover:bg-primary/10' : ''
            }`}
            aria-label="Cari makanan atau daerah"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </form>
      </div>
    </header>
  );
}
