import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PROVINCES } from '../data';
import { ProvinceData } from '../types';

interface RegionsGridPageProps {
  onSelectProvince: (province: ProvinceData) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TERRITORIES = ['SEMUA', 'SUMATERA', 'JAWA', 'SULAWESI', 'BALI', 'KALIMANTAN', 'NUSA TENGGARA', 'MALUKU', 'PAPUA'];

export function RegionsGridPage({ onSelectProvince, searchQuery, setSearchQuery }: RegionsGridPageProps) {
  const [selectedTerritory, setSelectedTerritory] = useState('SEMUA');

  const filteredProvinces = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PROVINCES.filter((province) => {
      const matchesTerritory = selectedTerritory === 'SEMUA' || province.territory === selectedTerritory;
      const matchesSearch =
        !query ||
        province.name.toLowerCase().includes(query) ||
        province.dishName.toLowerCase().includes(query) ||
        province.dishNames.some((dishName) => dishName.toLowerCase().includes(query)) ||
        province.territory.toLowerCase().includes(query) ||
        province.description.toLowerCase().includes(query) ||
        province.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)) ||
        province.history.toLowerCase().includes(query);

      return matchesTerritory && matchesSearch;
    });
  }, [searchQuery, selectedTerritory]);

  return (
    <div className="batik-cream-bg animate-fade-in text-[#3a2014]">
      <section className="px-4 pb-14 pt-24 md:px-10 md:pb-16 md:pt-28">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-serif text-5xl font-bold leading-tight text-primary md:text-6xl lg:text-7xl">
            Jelajahi Nusantara
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-[#4a3429] md:text-lg">
            Ekspedisi kuliner melintasi ribuan pulau, mengungkap rahasia bumbu warisan dan cita rasa autentik dari setiap sudut Indonesia.
          </p>

          <div className="group relative mx-auto mt-10 max-w-3xl">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary/60 transition-colors group-focus-within:text-primary">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                if (event.target.value.trim()) {
                  setSelectedTerritory('SEMUA');
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && filteredProvinces.length > 0) {
                  onSelectProvince(filteredProvinces[0]);
                }
              }}
              className="h-14 w-full rounded-t-md border-0 border-b border-primary/45 bg-white/70 pl-14 pr-12 font-sans text-sm text-[#3a2014] outline-none transition-colors placeholder:text-[#7a665b]/70 focus:border-primary"
              placeholder="Cari daerah, masakan, rempah atau bahan..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a665b] transition-colors hover:text-primary"
                aria-label="Hapus pencarian"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {TERRITORIES.map((territory) => (
              <button
                key={territory}
                type="button"
                onClick={() => setSelectedTerritory(territory)}
                className={`min-h-8 rounded-full px-4 font-sans text-[10px] font-black uppercase tracking-wider transition-all ${
                  selectedTerritory === territory
                    ? 'bg-primary text-on-primary shadow-[0_8px_20px_rgba(233,193,118,0.18)]'
                    : 'border border-primary/25 bg-white/55 text-[#5a463a] hover:border-primary/45 hover:text-[#3a2014]'
                }`}
              >
                {territory}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-14">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              DAERAH NUSANTARA
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#3a2014] md:text-4xl">
              {searchQuery ? 'Hasil Pencarian' : 'Pusaka Kuliner Daerah'}
            </h2>
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-[#4a3429]">
              {searchQuery
                ? `Menampilkan ${filteredProvinces.length} hasil untuk "${searchQuery}".`
                : 'Pilih daerah untuk melihat pusaka kuliner, cerita budaya, dan resep khasnya.'}
            </p>
          </div>
          <div className="self-start rounded border border-primary/45 bg-white/75 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#3a2014] shadow-[0_8px_18px_rgba(48,27,13,0.08)] sm:self-auto">
            {filteredProvinces.length} Daerah
          </div>
        </div>

        {filteredProvinces.length === 0 ? (
          <div className="rounded-lg border border-primary/20 bg-white/55 px-6 py-16 text-center shadow-[0_12px_30px_rgba(48,27,13,0.08)]">
            <span className="material-symbols-outlined mb-3 text-5xl text-primary/45">search_off</span>
            <h3 className="font-serif text-2xl font-bold text-primary">Tidak Ada Hasil</h3>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm leading-relaxed text-[#4a3429]">
              Coba pakai nama daerah, makanan, rempah, atau bahan yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredProvinces.map((province, index) => (
              <motion.button
                key={province.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.28) }}
                onClick={() => onSelectProvince(province)}
                className="group cursor-pointer overflow-hidden rounded-lg border border-primary/20 bg-white/78 text-left shadow-[0_12px_28px_rgba(48,27,13,0.1)] transition-all duration-300 hover:border-primary/45 hover:bg-white/90 hover:shadow-[0_14px_34px_rgba(48,27,13,0.16)] active:scale-[0.99]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-lowest">
                  <img
                    src={province.imageUrl}
                    alt={province.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
                  <div className="absolute left-3 top-3 rounded bg-surface/80 px-2 py-1 backdrop-blur-sm border border-primary/15">
                    <span className="font-sans text-[8px] font-black uppercase tracking-[0.16em] text-primary">
                      {province.territory}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-serif text-xl font-bold text-on-surface transition-colors group-hover:text-primary">
                      {province.name}
                    </h3>
                    <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-widest text-primary">
                      {province.dishName}
                    </p>
                  </div>
                </div>
                <div className="flex min-h-[116px] flex-col justify-between gap-4 p-4">
                  <p className="line-clamp-3 font-sans text-xs leading-relaxed text-[#4a3429]">
                    {province.description}
                  </p>
                  <span className="inline-flex items-center gap-1 font-sans text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                    Buka Daerah
                    <span className="material-symbols-outlined text-[11px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
