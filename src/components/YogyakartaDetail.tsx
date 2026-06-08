import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface YogyakartaDetailProps {
  onBack: () => void;
  onViewRecipe?: (recipe: any) => void;
}

interface Dish {
  name: string;
  rating: string;
  description: string;
  imageUrl: string;
  history: string;
  ingredients: string[];
  cookingSteps: string[];
}

export function YogyakartaDetail({ onBack, onViewRecipe }: YogyakartaDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "DI Yogyakarta",
        imageUrl: dish.imageUrl,
        rating: dish.rating,
        description: dish.description,
        history: dish.history,
        ingredients: dish.ingredients,
        cookingSteps: dish.cookingSteps
      });
    }
  };

  const dishes: Dish[] = [
    {
      name: "Gudeg Jogja",
      rating: "4.9",
      description: "Kelembutan nangka muda yang dimasak perlahan dalam kendil tanah liat dengan gula merah asli dan santan kental, menghasilkan rona cokelat legendaris dan rasa manis gurih yang medok.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe6rRGV1szwOA6vqxnhBXupwcrJCKuzI_walLcV5ctpMpV1oULQF5dAtr7PE0vU9HtRc7fneSt0BCXpp30Gh_DHQbkaLjwKQ7Wca3FiBEzqu919GFxTkVErmORRfBpvXg_67kHUQcNCoYCIA9gHk7ILg6cv_a1g93Sl_Yyv71t3Y1LVfdN__bo_065ILBO-lXjOolFpBy85t3der5V9cwjbfUmKzplsSS1Y500Mk-doK9C_zBe0PBNi3PhTSNUady2B6sLs3LOfA4",
      history: "Gudeg telah diolah sejak abad ke-16 bertepatan dengan pembangunan Kerajaan Mataram Islam di Alas Mentaok. Hidangan ini melambangkan ketenangan, kesabaran (sabar narimo), dan ketekunan masyarakat Jawa karena proses memasaknya yang memakan waktu hingga puluhan jam.",
      ingredients: [
        "1 kg Nangka muda (tewel), potong kotak sedang",
        "5 butir Telur bebek, rebus matang lalu kupas",
        "1 liter Santan kental murni",
        "250g Gula merah Jawa kelapa asli (rona gelap)",
        "10 lembar Daun jati muda (untuk pewarna merah kecokelatan)",
        "5 lembar Daun salam tua, 3cm Lengkuas memarkan",
        "Bumbu halus: 12 Bawang merah, 6 Bawang putih, 6 Kemiri sangrai, 1 sdm Ketumbar bubuk murni, 1 sdm Garam laut."
      ],
      cookingSteps: [
        "Tempatkan daun jati muda di dasar kendil tanah liat, lapisi dengan daun salam dan lengkuas.",
        "Tata potongan nangka muda, telur bebek rebus, bumbu halus, dan gula merah secara bersalang-seling.",
        "Tuangkan santan kental perlahan hingga seluruh bahan terendam.",
        "Tutup bagian atas kendil dengan sisa daun jati, lalu tutup dengan penutup kendil rapat-rapat.",
        "Masak di atas api arang kecil selama minimal 8 jam hingga santan meresap kering dan nangka empuk berwarna kemerahan gelap."
      ]
    },
    {
      name: "Sate Klatak",
      rating: "4.8",
      description: "Sate kambing muda legendaris khas Pleret, Bantul. Dagingnya hanya diberi garam laut, ditusuk menggunakan jeruji besi sepeda, lalu dibakar di atas arang terbuka untuk menghasilkan sate yang juicy dengan kuah gulai gurih pendamping.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDmbZlftlPMdNjgw2Aa2-t7WLhBWnjhQVBRCUy7DpOoYMhLQRt8Vax8XVTzcAqtrg0K9i7InFtmewk6rhP3Czcy1ltgIY3SKxjY0IQvJm1yvbBfH0rSInmZSE-pnoUebVUj1y6ZapbD9P8uuc0a2qOp8SxuRt_5O9guXpEVLF8267NMxvpedgsz_cdVJT8hw-xlj0mHIZwzh46xaMEdmCy0Vb15kQEC1CfIwPHrMiI3LPwS11GPTlE0gAcRPeJJUBX0wqQjPDB_zk",
      history: "Penggunaan jeruji besi sepeda bukan sekadar estetika, melainkan teknik hantaran panas yang cerdas. Besi menghantarkan panas langsung ke bagian dalam daging, membuat sate kambing matang merata di dalam sembari tetap empuk (juicy) di luar.",
      ingredients: [
        "500g Daging kambing muda, potong dadu agak besar",
        "1/2 sdt Garam laut kasar (untuk melumuri)",
        "1 sdm Mentega cair",
        "Jeruji besi sepeda bersih untuk tusukan",
        "Kuah Gulai Pendamping: santan encer, bumbu kari lengkap (bawang merah, bawang putih, kemiri, cengkeh, kayu manis, jinten, kunyit)."
      ],
      cookingSteps: [
        "Tusuk potongan daging kambing muda ke jeruji besi sepeda yang telah dibersihkan.",
        "Lumuri daging kambing secara merata hanya dengan garam laut dan sedikit mentega cair.",
        "Bakar di atas bara api arang kayu sampai kecokelatan merata. Jeruji besi akan panas dan mematangkan bagian dalam sate.",
        "Sajikan hangat-hangat bersama siraman kuah gulai kambing yang kaya rempah dan irisan cabai rawit hijau."
      ]
    },
    {
      name: "Bakpia Pathok",
      rating: "4.7",
      description: "Kue kering bulat berisi kacang hijau manis bertekstur kulit luar renyah (flaky) dan isi lembut, menjadi buah tangan nomor satu yang merepresentasikan sejarah panjang harmoni budaya di Yogyakarta.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGkZaSS8r8HYKFuUW102YmVzLgvdwHvvhuxrgJWNmjKOQ5Qx7uqd1ifmcTJNtvp2cGA78jz-vJ7TQTUbvmJPaI7bSBBxs4pFmu_8zISf2w2hp37r70bc8Wfsenu57YUzlqbw3uODMsw2dv4r1I9iMpeXUKIzCeRiz2-pqAOtn9M9hjBLYEvbG3eNWeCmmA5hIoSNwQg4r7ZunG--DYbOFnRClSz2TVMoqarYjacOkw27SQlCnIwVScb8DiUeX2_AKQ9yY858neGUU",
      history: "Bakpia berasal dari Tionghoa (bernama 'Tou Pia' berarti pia kacang hijau) yang diperkenalkan di kampung Pathok Yogyakarta sekitar awal abad ke-20. Kini ia bertransformasi menjadi ikon jajanan tradisional Jawa yang dicintai seluruh golongan.",
      ingredients: [
        "250g Tepung terigu protein sedang",
        "150g Kacang hijau kupas (kukus, haluskan dengan gula dan sedikit minyak)",
        "100ml Air hangat",
        "50ml Minyak kelapa / minyak sayur",
        "1 sdm Gula pasir, 1/2 sdt Garam"
      ],
      cookingSteps: [
        "Buat adonan kulit berlapis (adonan tepung terigu dengan minyak dan sedikit air), gilas tipis, lipat beberapa kali untuk efek renyah berlayer.",
        "Ambil sebulatan kecil adonan kulit, beri isian pasta kacang hijau manis hangat yang sudah dihaluskan.",
        "Bentuk bulat agak pipih rapat sempurna.",
        "Panggang di atas loyang datar dengan suhu sedang atau di atas wajan besi cor datar tradisional hingga kedua permukaannya kuning kecokelatan."
      ]
    },
    {
      name: "Mangut Lele",
      rating: "4.8",
      description: "Masakan rumahan legendaris berupa ikan lele yang terlebih dahulu diasap menggunakan sabut kelapa hingga harum kering, kemudian dimasak dalam kuah santan kuning-oranye yang pedas membakar beraroma kencur segar.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFzpxptBK6ckTBKVTFg_VLKrjH8Tu-R9zb6yNKoCkC4hTqbAEEMbzuhqrBgl1IcN0u7sz4PQI0LZt1A6SbPsZWBU8ZuFJX2Rfo6xUIambINtLnbqjV77096lG_FJ8Kha_pjji9-Od_RA4LJeSHselWwn5vjk-xakgWa31rHL8txQfveBaGqEgmHtB-qi5Oy-OIH-B6_5zekM0Uaa6hSA3KPVANqIj1ouDDUF84aetVx2LzvntI5XMXNZzQAbvr7Wk1ihM5aBuPfdI",
      history: "Makanan ini sangat populer di kawasan perdesaan Yogyakarta. Pengasapan lele adalah kearifan lokal untuk mengawetkan ikan air tawar pasca panen sekaligus memberi aroma smokey yang unik yang tidak dapat ditiru oleh teknik memasak modern.",
      ingredients: [
        "4 ekor Ikan lele asap sabut kelapa",
        "500ml Santan sedang",
        "2 batang Serai memarkan, 3 lembar Daun jeruk",
        "10 Lindung cabai rawit merah utuh (untuk sensasi pedas)",
        "Bumbu halus: 6 Bawang merah, 3 Bawang putih, 3cm Kencur, 2cm Kunyit, 3 kemiri, 1 sdt garam laut."
      ],
      cookingSteps: [
        "Tumis bumbu halus, serai, daun jeruk, dan lengkuas hingga wangi pekat.",
        "Tuangkan santan, aduk konstan bertahap agar santan tidak pecah.",
        "Masukkan cabai rawit utuh ke dalam rebusan santan kuning mendidih.",
        "Masukkan lele asap. Kecilkan api dan biarkan mendidih perlahan selama 15 menit agar bumbu meresap ke dalam daging lele beraroma asap.",
        "Angkat dan sajikan hangat berkuah kemerahan."
      ]
    },
    {
      name: "Jadah Tempe",
      rating: "4.6",
      description: "Kombinasi cemilan tradisional khas lereng Gunung Merapi: Jadah (ketan kukus gurih berlumat kelapa) disiram dengan tempe bacem legit yang empuk manis hitam pekat. Dinikmati secara bersamaan dalam gigitan tunggal.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1j1Jss2SD1ohpAqzQkSz5wttRVlj7WgOkS3wQpJBS4M5rU_QTMvftXgb0USNmezSThZf2ddKKq9KVtjyBMekxYCxF3lboFvZifU8GEXVlIbXSX62Ie0W8w9bJiNQ7BnR0WsLIKfLmKqG7iw_nFpuLYCvzsxjPJfg3LhKQyDp6K419lbebkRHFBwnhpFk5gmVgDOUC6wT7GcRfif-Fh928M-9K9PxVdZW8pnv6H5LBWoae831zAY2H2R5Rsn2A4Tl0sy4fEaLmuc",
      history: "Jadah Tempe mulai terkenal luas sejak tahun 1950-an ketika diperkenalkan di Kaliurang dan menjadi cemilan favorit Sri Sultan Hamengkubuwono IX. Gabungan rasa gurih lemak ketan dan manis legit tempe bacem menciptakan sensasi rasa umami tradisional Jawa.",
      ingredients: [
        "300g Beras ketan (rendam 2 jam, kukus matang)",
        "150g Kelapa parut muda (untuk campuran jaddah)",
        "10 buah Tempe tebal",
        "Air kelapa (untuk merebus baceman tempe)",
        "Bumbu bacem: bawang merah, bawang putih, ketumbar, gula merah sisir hitam, asam Jawa, daun salam."
      ],
      cookingSteps: [
        "Jadah: Tumbuk ketan hangat kukus bersama kelapa parut dan sedikit garam hingga lumat padat, lalu bentuk persegi/lonjong pipih.",
        "Bacem tempe: Rebus tempe dalam bumbu bacem dan air kelapa selama minimal 1 jam dengan api kecil hingga air menyusut kering habis dan bumbu meresap dalam tempe.",
        "Goreng tempe bacem sebentar saja dalam minyak hangat agar tampak basah berkilau.",
        "Sajikan jadah gurih dan tempe bacem bersamaan, jepit tempe di atas jadah mirip burger tradisional."
      ]
    }
  ];

  return (
    <div className="bg-pattern min-h-screen py-10 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 text-on-surface">
      {/* Back navigation dynamic trigger */}
      <motion.button 
        id="back-to-home-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="self-start flex items-center gap-2 text-primary hover:text-primary-fixed font-sans text-xs tracking-widest font-bold uppercase cursor-pointer py-2 px-4 border border-primary/20 hover:border-primary/50 bg-[#131311]/60 backdrop-blur rounded"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Kembali ke Galeri
      </motion.button>

      {/* 1. Misty Yogyakarta Hero Section */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Yogyakarta Misty Landscape" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8raGnYwVqzg9uRoegr0nAGzH4KtjLa0T_I4r5Srir-BPyJulEU0HMqxwXQaIp1AuTzst3DIDCCR0GaTGdxsel_IrDsQ5WjEQVZdehuCGjaGjd7Byp7ep3lfS483dJ9vF6WO71xnMnL_8RPhJIVoacIpZfybH-I05EqGZxTSKUl2gKsyBnXOQMdDHEpctjgnwQh07K8wU4cwy_y3_Vu0tzkfcCgSZEDdNa8EAC0XURa-ARx-f26Fm3p6BCH_QfbJzcyU7SPVTJ0uU" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            ISTIMEWA &amp; SAKRAL
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Yogyakarta Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Temukan harmoni seni, tradisi luhur, dan kemegahan sejarah di Kota Gudeg. Dari pelataran Keraton yang teduh hingga asimilasi rasa yang melahirkan boga Mataram termasyhur melintasi zaman.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Warisan Agung Kasultanan */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img 
            alt="Keraton Yogyakarta Hall" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACs2m74KkNSPJj-P2XuI59mHbMTgLPybV_tWK5lCnr0c_9funnxRCnp_Z4Ffswz9GI5T7__ZFkHN63cOPdHgOqeJLIeg3BJbZgkOlesQelRbZLV1Ao2e1N3X1rUTeN1i5nCHcFSvO0AK_gbas1iMll813lnxAzuneXGi3R9ZukNdDromB7otK9MeYwNjUja-jsFc_LzbJ4NK10NFIpckxeIzAdSJDzBC6hHMpnmj7oJYcuh-dhYe-ZUuMXVtmpBOjrAN_h2SKTeNc"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SEJARAH &amp; TRADISI
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Warisan Agung Kasultanan Yogyakarta
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Keraton Ngayogyakarta Hadiningrat didirikan oleh Susuhunan Hamengkubuwono I pada tahun 1755 pasca Perjanjian Giyanti. Lebih dari sekadar istana fisik, Keraton Yogyakarta adalah penjaga pusaka spiritual serta poros filosofi kosmologis peradaban Jawa Mataram yang luhur.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Manunggaling Kawula Gusti&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Prinsip Keharmonisan Rakyat dan Pemimpin Mataram
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Filosofi Mataram
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Keharmonisan sejati yang tercermin dalam integrasi kehidupan religius, adat istiadat sehari-hari, hingga kehalusan tutur kata bahasa.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Pusat Kesenian Agung
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Rumah pelestarian wayang kulit purwa, tari kraton kasepuhan klasik, seni membatik tulis, hingga ketukan sakral gamelan pusaka pusaran dunia.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">1755</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                TAHUN DIANGKAT
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Ngayogyakarta Hadiningrat kini terus hidup menjaga nyala api peradaban adat nusantara tetap benderang.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. Yogyakarta Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            CITRA RASA KERATON
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Yogyakarta
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati mahakarya tradisi boga bercita rasa manis gurih medok khas bumi Mataraman yang legendaris, diakui melintasi benua.
          </p>
        </div>

        {/* Bento Grid Layout - Custom styling matching the provided prototype */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Gudeg Card (Featured - 7 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[0])}
            className="md:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-72 md:h-80 overflow-hidden">
              <img 
                alt="Gudeg Jogja" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[0].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 font-sans text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <span className="material-symbols-outlined text-xs leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[0].rating} RATING
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">LEGENDARIS</span>
                <h4 className="font-serif text-2xl text-on-surface font-bold mt-1">{dishes[0].name}</h4>
              </div>
            </div>
            <div className="p-6">
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify mb-5 line-clamp-3">
                {dishes[0].description}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDish(dishes[0]);
                  }}
                  className="bg-primary text-on-primary px-5 py-2 font-sans text-[10px] font-bold tracking-wider hover:brightness-110 rounded transition-all uppercase"
                >
                  LIHAT RESEP
                </button>
              </div>
            </div>
          </div>

          {/* Sate Klatak Card (5 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[1])}
            className="md:col-span-5 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                alt="Sate Klatak" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[1].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 font-sans text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <span className="material-symbols-outlined text-xs leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[1].rating} RATING
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">KULINER KHAS</span>
                <h4 className="font-serif text-2xl text-on-surface font-bold mt-1">{dishes[1].name}</h4>
              </div>
            </div>
            <div className="p-6">
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify mb-5 line-clamp-3">
                {dishes[1].description}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDish(dishes[1]);
                }}
                className="text-primary font-sans text-[10px] font-bold tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all uppercase"
              >
                EKSPLORASI RESEP <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Bakpia Pathok (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[2])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Bakpia" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[2].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-0.5 font-sans text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[2].rating}
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between gap-3">
              <div>
                <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">{dishes[2].name}</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2">{dishes[2].description}</p>
              </div>
              <span className="text-primary font-sans text-[9px] tracking-widest font-bold uppercase flex items-center gap-1.5 mt-2">
                Lihat Resep <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Mangut Lele (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[3])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Mangut Lele" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[3].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-0.5 font-sans text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[3].rating}
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between gap-3">
              <div>
                <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">{dishes[3].name}</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2">{dishes[3].description}</p>
              </div>
              <span className="text-primary font-sans text-[9px] tracking-widest font-bold uppercase flex items-center gap-1.5 mt-2">
                Lihat Resep <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Jadah Tempe (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[4])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Jadah Tempe" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[4].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-0.5 font-sans text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[4].rating}
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between gap-3">
              <div>
                <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">{dishes[4].name}</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2">{dishes[4].description}</p>
              </div>
              <span className="text-primary font-sans text-[9px] tracking-widest font-bold uppercase flex items-center gap-1.5 mt-2">
                Lihat Resep <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Interactive Cooking Recipe Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0e0c]/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-container-low border border-primary/20 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-xl p-6 md:p-8 shadow-2xl relative flex flex-col gap-6"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors w-8 h-8 rounded-full bg-surface-container/30 flex items-center justify-center border border-primary/10 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>

              {/* Title Header */}
              <div className="flex flex-col gap-1 pr-6">
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">RESEP PUSAKA MATARAM</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-on-surface">{selectedDish.name}</h3>
                <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span>{selectedDish.rating} Rating</span>
                </div>
              </div>

              {/* Banner Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-primary/10">
                <img src={selectedDish.imageUrl} alt={selectedDish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              {/* History / Nilai Adat */}
              <div className="flex flex-col gap-2">
                <h5 className="font-serif text-base text-primary font-bold">Luhurnya Tradisi</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify italic bg-primary/5 border-l-2 border-primary/40 pl-4 py-2">
                  &ldquo;{selectedDish.history}&rdquo;
                </p>
              </div>

              {/* Ingredients & Steps split screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-3">
                  <h5 className="font-serif text-base text-primary font-bold">Rincian Bumbu</h5>
                  <ul className="flex flex-col gap-2">
                    {selectedDish.ingredients.map((ing, i) => (
                      <li key={i} className="font-sans text-xs text-on-surface-variant flex items-start gap-2">
                        <span className="text-primary text-[10px] mt-1 select-none">✦</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <h5 className="font-serif text-base text-primary font-bold">Langkah Pembuatan</h5>
                  <ol className="flex flex-col gap-3">
                    {selectedDish.cookingSteps.map((step, i) => (
                      <li key={i} className="font-sans text-xs text-on-surface-variant flex gap-3 items-start">
                        <span className="w-5 h-5 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] border border-primary/20">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed text-justify">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
