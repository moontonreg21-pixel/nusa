import React from 'react';
import { motion } from 'motion/react';

interface HomeHeroProps {
  onStartExploration: () => void;
}

export function HomeHero({ onStartExploration }: HomeHeroProps) {
  return (
    <section className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden py-16 bg-[#131311]">
      {/* Background with Ambient Overlay and Parallax feeling */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover brightness-[0.38] contrast-[1.15]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3hXXnYl94aQKPH5Qiu0rNiU5z4xoi5ogEWQwEgYHWgy77HfGs5H27ouFotX1w6DNbk_8cAnT6GnjFmeBbKD7hZfJhBK1-foKr4Mu1exOQZmqGDs1pLryX3btFbUZ_wBzkbGTl1JvjIan2DJffTul0eqmtY0PlRzDcWKuZCr5ubMz-s38P7HSmS068qltZlSGyO2lSGw7MlIGN5Ed3fBQ0RKIWMbPILnJLMl2JsGub6OfjnsCCjwcYiHaWYqDFRGsoCaPmZK9vUj8" 
          alt="Indonesian rice terraces at dawn" 
        />
        {/* Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131311]/50 via-transparent to-[#131311]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#131311_95%)]"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Mini label indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 text-xs tracking-[0.25em] text-primary uppercase font-medium"
        >
          <span>&bull;</span>
          EKSPEDISI WARISAN KULINER
          <span>&bull;</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary text-glow font-bold leading-tight tracking-tight mb-8 max-w-3xl"
        >
          Selamat Datang di <br />
          <span className="text-white">Nusa Culinary</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-on-surface-variant/90 italic tracking-wide max-w-2xl mb-12"
        >
          &ldquo;Menjelajahi Kekayaan dan Harmoni Cita Rasa Nusantara&rdquo;
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto relative z-10"
        >
          <button 
            id="start-explore-btn"
            onClick={onStartExploration}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-on-primary font-sans text-xs sm:text-sm tracking-[0.25em] font-bold uppercase shadow-[0_4px_25px_rgba(233,193,118,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            MULAI EKSPLORASI
          </button>
        </motion.div>
      </div>

      {/* Indonesia Map Silhouette SVG in golden cream at the bottom of the section */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[700px] lg:w-[900px] h-auto text-primary/10 pointer-events-none select-none z-0">
        <svg 
          className="w-full h-auto filter drop-shadow-[0_0_8px_rgba(233,193,118,0.05)]" 
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
      </div>
    </section>
  );
}
