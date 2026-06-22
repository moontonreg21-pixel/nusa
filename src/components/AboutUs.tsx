import React from 'react';
import { motion } from 'motion/react';

export function AboutUs() {
  return (
    <div className="batik-cream-bg animate-fade-in text-[#3a2014]">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 md:px-12">
        {/* 1. Page Header */}
        <section className="text-center max-w-3xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-3">
            NILAI &amp; VISI KAMI
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight tracking-tight mb-6">
            Tentang Nusa Culinary
          </h2>
          <p className="font-sans text-base md:text-lg text-[#4a3429] max-w-2xl mx-auto leading-relaxed">
            Nusa Culinary hadir sebagai jembatan yang menghubungkan bumbu pusaka masa lalu dengan kebiasaan memasak modern, menjaga keautentikan rasa tetap lestari melintasi zaman.
          </p>
        </section>

        {/* Cultural Divider layout */}
        <div className="cultural-divider"></div>

        {/* 2. Hero Brand Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/82 p-6 md:p-10 border border-[#b7802f]/35 rounded-lg shadow-[0_14px_34px_rgba(48,27,13,0.12)]">
          <div className="md:col-span-5 relative aspect-square rounded-md overflow-hidden border border-primary/20">
            <img
              className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]"
              src="https://light-black-wui5vqph.edgeone.dev/login.jpeg"
              alt="Ulekan bumbu rempah tradisional"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent"></div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-4">
            <h3 className="font-serif text-2xl text-[#7a4d12] font-bold">
              Menyelami Akar Rasa Indonesia
            </h3>
            <p className="font-sans text-sm font-medium text-[#2f2118] leading-relaxed text-justify">
              Indonesia adalah untaian zamrud khatulistiwa yang dianugerahi kekayaan tanah vulkanis yang subur. Dari situlah, ribuan jenis rempah dan bahan makanan lahir, melahirkan khazanah kuliner tradisional terluas di dunia.
            </p>
            <p className="font-sans text-sm font-medium text-[#2f2118] leading-relaxed text-justify">
              Setiap hidangan tradisional di Indonesia menyimpan cerita tersendiri—mencerminkan adat istiadat, falsafah gotong royong, hingga asimilasi lintas bangsa yang berlabuh di pelabuhan niaga Nusantara. Nusa Culinary mendokumentasikan nilai-nilai adat ini agar tidak lekang oleh gelombang globalisasi.
            </p>
          </div>
        </section>

        {/* 3. Three Pillars Section */}
        <section className="flex flex-col gap-8">
          <h3 className="font-serif text-2xl md:text-3xl text-[#3a2014] text-center font-semibold">
            Tiga Pilar Utama Kami
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white/84 border border-[#b7802f]/35 hover:border-[#9b6219]/55 p-6 rounded-lg transition-all duration-300 flex flex-col gap-3 shadow-[0_10px_24px_rgba(48,27,13,0.1)]">
              <div className="w-10 h-10 rounded-full bg-[#7a4d12]/10 border border-[#7a4d12]/30 flex items-center justify-center text-[#7a4d12] mb-2">
                <span className="material-symbols-outlined font-semibold">auto_stories</span>
              </div>
              <h4 className="font-serif text-lg text-[#7a4d12] font-bold">
                Eksplorasi Autentik
              </h4>
              <p className="font-sans text-xs font-medium text-[#2f2118] leading-relaxed text-justify">
                Menyajikan resep-resep tradisional dari berbagai provinsi dengan rincian bumbu aromatik, takaran asli, serta instruksi langkah demi langkah yang menghargai nilai sejarah peninggalan leluhur.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/84 border border-[#b7802f]/35 hover:border-[#9b6219]/55 p-6 rounded-lg transition-all duration-300 flex flex-col gap-3 shadow-[0_10px_24px_rgba(48,27,13,0.1)]">
              <div className="w-10 h-10 rounded-full bg-[#7a4d12]/10 border border-[#7a4d12]/30 flex items-center justify-center text-[#7a4d12] mb-2">
                <span className="material-symbols-outlined font-semibold">soup_kitchen</span>
              </div>
              <h4 className="font-serif text-lg text-[#7a4d12] font-bold">
                Panduan Memasak
              </h4>
              <p className="font-sans text-xs font-medium text-[#2f2118] leading-relaxed text-justify">
                Menyusun panduan memasak yang jelas, runtut, dan mudah diikuti agar setiap pengunjung dapat mengolah rendang, melilit sate, hingga menggulung papeda dengan percaya diri di dapur.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/84 border border-[#b7802f]/35 hover:border-[#9b6219]/55 p-6 rounded-lg transition-all duration-300 flex flex-col gap-3 shadow-[0_10px_24px_rgba(48,27,13,0.1)]">
              <div className="w-10 h-10 rounded-full bg-[#7a4d12]/10 border border-[#7a4d12]/30 flex items-center justify-center text-[#7a4d12] mb-2">
                <span className="material-symbols-outlined font-semibold">diversity_3</span>
              </div>
              <h4 className="font-serif text-lg text-[#7a4d12] font-bold">
                Luhurnya Komunitas
              </h4>
              <p className="font-sans text-xs font-medium text-[#2f2118] leading-relaxed text-justify">
                Mendalami nilai-nilai sosiologis dari sajian seperti tradisi ngayah di Bali hingga filosofi Kalio Minang, menanamkan rasa kebersamaan, apresiasi boga, serta rasa syukur atas karunia keanekaragaman Nusantara.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Beautiful closing quote */}
        <section className="text-center py-8 px-6 bg-white/84 border border-[#b7802f]/35 rounded-lg max-w-2xl mx-auto my-4 flex flex-col items-center shadow-[0_10px_24px_rgba(48,27,13,0.1)]">
          <span className="material-symbols-outlined text-[#7a4d12] text-3xl mb-3 select-none">format_quote</span>
          <blockquote className="font-serif text-base md:text-lg italic font-medium text-[#2f2118] max-w-sm mb-4">
            &ldquo;Memasak makanan leluhur adalah laku menghormati tanah air dan melestarikan ingatan sejarah ke lidah generasi penerus.&rdquo;
          </blockquote>
          <span className="font-sans text-[10px] tracking-widest font-bold text-[#7a4d12] uppercase">
            - NUSA CULINARY
          </span>
        </section>
      </div>
    </div>
  );
}
