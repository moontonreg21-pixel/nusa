import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ProvinceData } from '../types';
import { PROVINCES } from '../data';
import { SocialLinks } from './SocialLinks';

interface HomePageProps {
  onSelectProvince: (province: ProvinceData) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExploreRegions: () => void;
  onAbout: () => void;
}

const monthlyHighlights = [
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

export function HomePage({ onSelectProvince, onExploreRegions, onAbout }: HomePageProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredSlides = useMemo(() => {
    return monthlyHighlights.map((highlight) => ({
      ...highlight,
      province: PROVINCES.find((province) => province.id === highlight.id)
    }));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % featuredSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [featuredSlides.length]);

  const handleNextSlide = () => {
    setActiveSlide((current) => (current + 1) % featuredSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((current) => (current - 1 + featuredSlides.length) % featuredSlides.length);
  };

  return (
    <div className="bg-[#fff8ec] text-[#3a2014] animate-fade-in overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[620px] md:min-h-[690px] overflow-hidden bg-[#120d08]">
        <div className="absolute inset-0">
          <img
            src="/og-image.png"
            alt="Ragam kuliner Indonesia"
            className="h-full w-full object-cover object-center md:object-right brightness-[0.58] contrast-[1.1] saturate-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0906] via-[#120d08]/82 to-[#120d08]/18"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#120d08]/55 via-transparent to-[#120d08]/35"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pt-36 md:pt-40 pb-36"
        >
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-[0.96] drop-shadow-lg">
              Jelajahi<br />Rasa Indonesia
            </h1>
            <p className="font-sans text-lg md:text-xl text-primary font-semibold mt-5">
              Beragam cita rasa dari Sabang sampai Merauke
            </p>
            <p className="font-sans text-sm md:text-base text-white/86 leading-relaxed max-w-xl mt-5">
              Kuliner Indonesia adalah warisan budaya yang kaya akan rempah, tradisi, dan kelezatan yang tak terlupakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 max-w-sm sm:max-w-none">
              <button
                onClick={onExploreRegions}
                className="cursor-pointer inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-black text-on-primary shadow-[0_10px_28px_rgba(233,193,118,0.3)] transition-all hover:brightness-110 active:scale-95"
              >
                Jelajahi Daerah
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <button
                onClick={onAbout}
                className="cursor-pointer inline-flex min-h-12 items-center justify-center rounded-full border border-primary/75 px-7 py-3.5 font-sans text-sm font-bold text-white transition-all hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                Tentang Kami
              </button>
            </div>
          </div>
        </motion.div>

        <div className="absolute -bottom-[1px] left-0 right-0 z-20">
          <svg viewBox="0 0 1440 160" className="block h-[150px] w-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <pattern id="batikWavePattern" patternUnits="userSpaceOnUse" width="420" height="760">
                <image href="/batik-background.jpg" width="420" height="760" preserveAspectRatio="xMidYMid slice" />
                <rect width="420" height="760" fill="#f4eadc" opacity="0.46" />
              </pattern>
            </defs>
            <path d="M0 55C128 142 259 140 431 121C621 100 656 160 842 123C1001 92 1076 13 1206 45C1315 72 1355 28 1440 64V160H0Z" fill="url(#batikWavePattern)" />
            <path d="M0 45C128 132 259 130 431 111C621 90 656 150 842 113C1001 82 1076 3 1206 35C1315 62 1355 18 1440 54" fill="none" stroke="#e9c176" strokeWidth="12" />
            <path d="M0 55C128 142 259 140 431 121C621 100 656 160 842 123C1001 92 1076 13 1206 45C1315 72 1355 28 1440 64" fill="none" stroke="#2d1c12" strokeOpacity="0.78" strokeWidth="4" />
          </svg>
        </div>
      </section>

      {/* Monthly highlight */}
      <section
        className="relative px-6 md:px-12 pb-16 pt-6"
        style={{
          backgroundColor: '#f4eadc',
          backgroundImage: "linear-gradient(rgba(244, 234, 220, 0.46), rgba(244, 234, 220, 0.46)), url('/batik-background.jpg')",
          backgroundPosition: 'top center',
          backgroundSize: '420px auto',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Sorotan Bulan Ini
              </span>
              <div className="h-px flex-1 bg-primary/30"></div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrevSlide}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-primary/35 text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
                aria-label="Sorotan sebelumnya"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button
                onClick={handleNextSlide}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-primary/35 text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
                aria-label="Sorotan berikutnya"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-primary/25 bg-[#14100d] shadow-[0_18px_44px_rgba(48,27,13,0.28)] md:aspect-[21/9]">
            {featuredSlides.map((slide, index) => {
              const isActive = index === activeSlide;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? 'z-10 opacity-100 translate-x-0' : 'z-0 opacity-0 translate-x-6 pointer-events-none'
                    }`}
                >
                  <img
                    src={slide.bannerUrl}
                    alt={slide.title}
                    className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120d08] via-[#120d08]/35 to-[#120d08]/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#120d08]/92 via-[#120d08]/36 to-transparent"></div>

                  <div className="absolute inset-0 flex max-w-3xl flex-col justify-end p-6 text-white md:p-12">
                    <span className="font-sans text-[10px] font-black uppercase tracking-[0.24em] text-primary md:text-xs">
                      Provinsi Pilihan
                    </span>
                    <h2 className="mt-2 font-serif text-3xl font-bold leading-tight md:text-5xl">
                      {slide.title}
                    </h2>
                    <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/82 md:text-base">
                      {slide.desc}
                    </p>
                    <button
                      onClick={() => slide.province && onSelectProvince(slide.province)}
                      className="mt-7 inline-flex min-h-11 w-fit cursor-pointer items-center gap-3 rounded-full bg-primary px-6 font-sans text-xs font-black uppercase tracking-wider text-on-primary transition-all hover:brightness-110 active:scale-95"
                    >
                      {slide.actionLabel}
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {featuredSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${activeSlide === index ? 'w-8 bg-primary' : 'w-2 bg-primary/35 hover:bg-primary/60'
                  }`}
                aria-label={`Buka sorotan ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Region map */}
      <section className="relative overflow-hidden bg-[#14100d] px-6 py-16 text-white md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,rgba(233,193,118,0.16)_1.5px,transparent_1.5px)] bg-[length:42px_42px] opacity-40"></div>
        <img
          src="/siluet-background.png"
          alt=""
          className="pointer-events-none absolute -right-12 bottom-0 hidden w-[360px] opacity-35 drop-shadow-[0_0_18px_rgba(233,193,118,0.12)] lg:block"
          aria-hidden="true"
        />
        <img
          src="/siluet-background.png"
          alt=""
          className="pointer-events-none absolute -left-24 bottom-0 hidden w-[260px] -scale-x-100 opacity-18 lg:block"
          aria-hidden="true"
        />
        <div className="absolute -left-10 bottom-0 hidden h-80 w-80 rounded-full border border-primary/10 lg:block"></div>
        <div className="absolute -left-2 bottom-0 hidden h-64 w-80 border-l border-primary/10 opacity-50 lg:block"></div>
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="text-left lg:col-span-5">

            <h2 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">Kekayaan Rasa Nusantara</h2>
            <p className="mt-6 font-sans text-sm leading-relaxed text-white/82">
              Setiap daerah memiliki keunikan rasa dan tradisi kuliner yang menjadi identitas bangsa.
            </p>
            <button
              onClick={onExploreRegions}
              className="mt-8 cursor-pointer inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 font-sans text-xs font-black text-on-primary transition-all hover:brightness-110 active:scale-95"
            >
              Lihat Semua Daerah
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="relative flex min-h-[300px] items-center justify-center overflow-visible">
              <div
                className="absolute inset-0 bg-[url('/batik-background.jpg')] bg-[length:380px_auto] bg-center opacity-[0.13] mix-blend-screen"
                aria-hidden="true"
              ></div>
              <svg viewBox="0 0 920 360" className="absolute inset-0 h-full w-full text-[#4a2b18] opacity-45" fill="currentColor" aria-hidden="true">
                <path d="M658 70c-38 34-86 31-120 13 9 30 47 55 96 51-46 25-96 18-142-13 35 58 127 61 204 2-25-4-53-10-76-18 34-2 62-15 84-43-16 6-31 8-46 8Z" />
                <path d="M82 286c72-35 143-32 205 2-58-69-162-81-270-38 24 10 46 22 65 36Z" opacity=".65" />
                <path d="M708 264c42-14 88-8 136 18-28-47-95-66-166-36 12 5 22 11 30 18Z" opacity=".55" />
              </svg>
              <img
                src="/logo-removebg-preview.png"
                alt="Nusa Culinary"
                className="relative z-10 w-full max-w-[620px] object-contain drop-shadow-[0_0_28px_rgba(233,193,118,0.22)]"
              />
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-8"
        style={{
          backgroundColor: '#f4eadc',
          backgroundImage: "linear-gradient(rgba(244, 234, 220, 0.34), rgba(244, 234, 220, 0.34)), url('/batik-background.jpg')",
          backgroundPosition: 'center',
          backgroundSize: '420px auto',
        }}
      />

      <footer className="bg-[#11110f] px-6 md:px-12 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl font-bold uppercase tracking-[0.16em] text-primary">
              NUSA CULINARY
            </h2>
            <p className="mt-2 font-sans text-sm tracking-wide text-on-surface-variant">
              Melestarikan Warisan Adat, Merayakan Cita Rasa Autentik Nusantara.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <SocialLinks />
            <p className="font-sans text-xs tracking-wide text-on-surface-variant/70 text-center md:text-right">
              &copy; 2026 NUSA CULINARY. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
