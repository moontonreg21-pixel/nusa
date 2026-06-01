import React from 'react';
import { motion } from 'motion/react';

export function AboutUs() {
  return (
    <div className="bg-pattern py-16 px-6 md:px-12 max-w-5xl mx-auto animate-fade-in flex flex-col gap-12">
      {/* 1. Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-3">
          NILAI &amp; VISI KAMI
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight tracking-tight mb-6">
          Tentang Nusa Culinary
        </h2>
        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Nusa Culinary hadir sebagai jembatan yang menghubungkan bumbu pusaka masa lalu dengan kebiasaan memasak modern, menjaga keautentikan rasa tetap lestari melintasi zaman.
        </p>
      </section>

      {/* Cultural Divider layout */}
      <div className="cultural-divider"></div>

      {/* 2. Hero Brand Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-surface-container-low/40 p-6 md:p-10 border border-primary/10 rounded-lg">
        <div className="md:col-span-5 relative aspect-square rounded-md overflow-hidden border border-primary/20">
          <img 
            className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3hXXnYl94aQKPH5Qiu0rNiU5z4xoi5ogEWQwEgYHWgy77HfGs5H27ouFotX1w6DNbk_8cAnT6GnjFmeBbKD7hZfJhBK1-foKr4Mu1exOQZmqGDs1pLryX3btFbUZ_wBzkbGTl1JvjIan2DJffTul0eqmtY0PlRzDcWKuZCr5ubMz-s38P7HSmS068qltZlSGyO2lSGw7MlIGN5Ed3fBQ0RKIWMbPILnJLMl2JsGub6OfjnsCCjwcYiHaWYqDFRGsoCaPmZK9vUj8" 
            alt="Ulekan bumbu rempah tradisional"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent"></div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-4">
          <h3 className="font-serif text-2xl text-primary font-bold">
            Menyelami Akar Rasa Indonesia
          </h3>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed text-justify">
            Indonesia adalah untaian zamrud khatulistiwa yang dianugerahi kekayaan tanah vulkanis yang subur. Dari situlah, ribuan jenis rempah dan bahan makanan lahir, melahirkan khazanah kuliner tradisional terluas di dunia.
          </p>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed text-justify">
            Setiap hidangan tradisional di Indonesia menyimpan cerita tersendiri—mencerminkan adat istiadat, falsafah gotong royong, hingga asimilasi lintas bangsa yang berlabuh di pelabuhan niaga Nusantara. Nusa Culinary mendokumentasikan nilai-nilai adat ini agar tidak lekang oleh gelombang globalisasi.
          </p>
        </div>
      </section>

      {/* 3. Three Pillars Section */}
      <section className="flex flex-col gap-8">
        <h3 className="font-serif text-2xl md:text-3xl text-on-surface text-center font-semibold">
          Tiga Pilar Utama Kami
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-surface-container-low/30 border border-primary/5 hover:border-primary/20 p-6 rounded-lg transition-all duration-300 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined font-semibold">auto_stories</span>
            </div>
            <h4 className="font-serif text-lg text-primary font-semibold">
              Eksplorasi Autentik
            </h4>
            <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
              Menyajikan resep-resep tradisional dari berbagai provinsi dengan rincian bumbu aromatik, takaran asli, serta instruksi langkah demi langkah yang menghargai nilai sejarah peninggalan leluhur.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-surface-container-low/30 border border-primary/5 hover:border-primary/20 p-6 rounded-lg transition-all duration-300 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined font-semibold">soup_kitchen</span>
            </div>
            <h4 className="font-serif text-lg text-primary font-semibold">
              Kecerdasan Memasak
            </h4>
            <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
              Menerapkan teknologi pemrosesan bahasa untuk merekayasa asisten kuliner AI berpengetahuan koki tingkat tinggi, siap membimbing Anda mengolah rendang, melilit sate, hingga menggulung papeda secara langsung.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-surface-container-low/30 border border-primary/5 hover:border-primary/20 p-6 rounded-lg transition-all duration-300 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined font-semibold">diversity_3</span>
            </div>
            <h4 className="font-serif text-lg text-primary font-semibold">
              Luhurnya Komunitas
            </h4>
            <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
              Mendalami nilai-nilai sosiologis dari sajian seperti tradisi ngayah di Bali hingga filosofi Kalio Minang, menanamkan rasa kebersamaan, apresiasi boga, serta rasa syukur atas karunia keanekaragaman Nusantara.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Beautiful closing quote */}
      <section className="text-center py-8 px-6 bg-primary/5 border border-primary/10 rounded-lg max-w-2xl mx-auto my-4 flex flex-col items-center">
        <span className="material-symbols-outlined text-primary text-3xl mb-3 select-none">format_quote</span>
        <blockquote className="font-serif text-base md:text-lg italic text-on-surface-variant max-w-sm mb-4">
          &ldquo;Memasak makanan leluhur adalah laku menghormati tanah air dan melestarikan ingatan sejarah ke lidah generasi penerus.&rdquo;
        </blockquote>
        <span className="font-sans text-[10px] tracking-widest font-bold text-primary uppercase">
          - NUSA CULINARY
        </span>
      </section>
    </div>
  );
}
