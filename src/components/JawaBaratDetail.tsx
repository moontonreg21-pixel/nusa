import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface JawaBaratDetailProps {
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

export function JawaBaratDetail({ onBack, onViewRecipe }: JawaBaratDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Jawa Barat",
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
      name: "Sate Maranggi Purwakarta",
      rating: "4.9",
      description: "Sate daging sapi has dalam berlemak yang khas dengan marinasi bumbu ketumbar, lengkuas parut, dan gula aren manis. Dibakar di atas bara api hingga membentuk rasa karamelisasi manis-gurih yang meresap mendalam, disajikan bersama sambal tomat mentah segar yang pedas asam menggugah selera.",
      imageUrl: "https://i.pinimg.com/736x/f3/7d/92/f37d92290f0444bc7392788cc88b23d3.jpg",
      history: "Sate Maranggi melambangkan kebersamaan masyarakat pedesaan Jawa Barat. Kuliner legendaris ini merupakan buah asimilasi budaya kuliner antara pendandang Tionghoa (yang mengandalkan rempah manis pekat) bersama kearifan lokal suku Sunda peternak sapi di kawasan Purwakarta dan Cianjur sejak abad ke-18.",
      ingredients: [
        "600g Daging sapi bagian has dalam empuk, potong dadu 2cm",
        "100g Lemak sapi muda gurih, potong kotak kecil",
        "5 sdm Kecap manis hitam kental berkualitas",
        "3 lembar Daun pepaya segar (untuk membungkus & melunakkan daging)",
        "2 sdm Air asam Jawa pekat murni",
        "Bumbu rendaman manis: 2 sdm Ketumbar sangrai, 1 sdm Gula aren sisir, 8 Bawang merah, 4 Bawang putih, 2cm Lengkuas muda parut, 1cm Jahe segar, 1 sdt Garam laut."
      ],
      cookingSteps: [
        "Cuci bersih daging dan tiriskan. Bungkus potongan daging sapi dan lemak dalam remasan daun pepaya selama 25 menit agar tekstur daging menjadi empuk berkat enzim papain alami.",
        "Haluskan seluruh bahan bumbu rendaman manis dalam cobek atau blender, lalu tuang kecap manis serta air asam Jawa murni.",
        "Keluarkan daging dari daun pepaya, campurkan dengan bumbu marinasi manis tersebut merata. Diamkan di kulkas selama 30 menit.",
        "Tusuk daging sapi dan potongan lemak selang-seling pada tusuk sate bambu (3 potong daging empuk dan 1 potong lemak di tengah untuk menghasilkan aroma juicy).",
        "Bakar sate di atas bara api arang batok kelapa sambil sesekali diolesi sisa bumbu kecap manis hingga matang kecokelatan merona karamel harum.",
        "Sajikan hangat bersama nasi timbel atau ketan bakar, serta ulekan sambal tomat mentah (tomat segar, cabai rawit merah pedas, garam, dan limau)."
      ]
    },
    {
      name: "Karedok Parahyangan",
      rating: "4.8",
      description: "Sajian selada mentah (raw salad) khas Sunda warisan leluhur berupa potongan sayuran kebun yang segar (kacang panjang, kol, taoge, timun, dan daun kemangi) lalu diselimuti bumbu kacang tanah gilas yang beraroma kencur segar dan asam Jawa hangat.",
      imageUrl: "https://i.pinimg.com/736x/0f/62/99/0f62993a509a380e2c216d4b21740727.jpg",
      history: "Karedok mencerminkan filosofi hidup suku Sunda yang mandiri dan selaras dengan alam (Tatar Sunda). Menurut sejarah, karedok pada awalnya disajikan sebagai hidangan kehormatan menyambut kunjungan Bupati Sumedang Larang di Kampung Karedok di pesisir Sungai Cimanuk abad silam.",
      ingredients: [
        "100g Kacang panjang muda, iris tipis mentah sekitar 1cm",
        "100g Kol kol manis segar, iris kasar memanjang",
        "50g Taoge segar muda, cuci bersih mentah",
        "2 buah Mentimun lokal segar, belah lalu iris tipis",
        "1 ikat Daun kemangi segar wangi (surawung)",
        "2 buah Terong gelatik bundar hijau, iris tipis",
        "Saus Kacang Kencur: 150g Kacang tanah goreng, 3cm Kencur segar muda beraroma kuat, 1 sdm Gula aren sisir halus, 1 sdm Air asam Jawa pekat, 1 sdt Terasi udang bakar, 3 Cabai rawit (sesuai selera), 1/2 sdt Garam laut."
      ],
      cookingSteps: [
        "Siapkan cobek batu tradisional. Haluskan cabai rawit pedas, kencur segar muda, terasi bakar, garam laut, dan gula aren hingga larut halus.",
        "Masukkan kacang tanah goreng hangat, ulek bertahap hingga hancur halus dan merata.",
        "Tuang air asam Jawa pekat dan sedikit air matang hangat secara perlahan sambil diulek berputar sampai saus kacang berubah menjadi cairan kental cokelat mengkilap.",
        "Masukkan seluruh sayuran mentah segar yang telah dicuci bersih dan diiris langsung ke dalam cobek berisi saus kacang.",
        "Aduk perlahan sayuran mentah menggunakan sutil atau ulekan batu hingga seluruh permukaan sayur terbalut saus kacang kencur.",
        "Sajikan seketika di atas piring beralas daun pisang bersama taburan bawang goreng dan kerupuk kaleng aci renyah gurih."
      ]
    },
    {
      name: "Nasi Liwet Sunda",
      rating: "4.8",
      description: "Nasi aromatik yang dimasak tradisional di dalam panci besi tebal (kastrol) bersama bawang merah utuh, serai, daun salam, cabai rawit merah segar, berkilau minyak dari tumisan bumbu, lalu ditaburi garing renyahnya ikan jambal roti atau teri medan goreng.",
      imageUrl: "https://i.pinimg.com/736x/c2/25/d4/c225d4fb4ba1595ae8e06fe3c5abeb05.jpg",
      history: "Nasi Liwet Sunda bermula dari taktik bekal makan para petani komunal (botram) saat pergi menggarap ladang sawah di pegunungan Parahyangan. Kastrol diletakkan langsung di atas kayu bakar sawah sambil menunggu beras matang tanak menjadi nasi wangi gurih.",
      ingredients: [
        "500g Beras putih aromatik kualitas pulen, cuci bersih",
        "600ml Air kaldu hangat (atau air matang murni)",
        "10 butir Bawang merah kecil, kupas utuh kulitnya",
        "2 batang Serai muda bagian putih, memarkan aromanya",
        "4 lembar Daun salam tua wangi hutan",
        "50g Ikan teri Medan atau asin jambal roti garing",
        "10 butir Cabai rawit merah utuh segar",
        "2 sdm Minyak kelapa / minyak goreng biasa untuk menumis"
      ],
      cookingSteps: [
        "Panaskan minyak kelapa di dasar panci besi kastrol. Tumis bawang merah utuh kencang bersama serai memarkan, daun salam hingga layu menebar aroma wangi.",
        "Masukkan beras putih aromatik yang sudah bersih ke dalam kastrol besi, aduk pelan dng tumisan bumbu selama 1 menit.",
        "Tuang air kaldu hangat gurih, beri garam laut secukupnya. Pastikan air merendam setinggi 1 buku jari di atas beras.",
        "Tutup rapat kastrol, jerang di atas kompor dengan api sedang hingga didihan air mulai menyusut menyerap ke dalam beras gembung.",
        "Setelah air menyusut setengah bagian, masukkan teri Medan goreng guring dan cabai rawit utuh di atas permukaan nasi (pencipta rasa pedas uap).",
        "Kecilkan api kompor hingga menjadi api lilin terkecil, pasang tutup kastrol sekencang mungkin. Kukus tanak selama 20 menit hingga matang sempurna dan dasar kastrol membentuk kerak nasi kecokelatan gurih garing."
      ]
    },
    {
      name: "Batagor Bandung",
      rating: "4.7",
      description: "Jajanan ikonik kota kembang berupa adonan kenyal bakso daging ikan tenggiri yang dibalut kulit pangsit atau tahu putih tebal, digoreng garing renyah (crispy) dalam rendaman minyak panas, disajikan hangat dengan siraman bumbu kacang gurih manis-pedas dan kucuran jeruk limau harum segar.",
      imageUrl: "https://i.pinimg.com/736x/4f/84/f5/4f84f503b71441fd31d55fb5ba85c3c3.jpg",
      history: "Batagor (Bakso Tahu Goreng) lahir di tengah maraknya kuliner kreatif kreasi pedagang kaki lima kota Bandung sekitar dekade 1970-an. Merupakan buah asimilasi adat masakan tahu Tionghoa bersama bumbu saus kacang kental bersahaja khas Sunda melahirkan boga populer.",
      ingredients: [
        "250g Daging ikan tenggiri giling super halus (dalam kondisi dingin)",
        "100g Tepung sagu tani murni berkualitas tinggi",
        "1 butir Telur ayam ras segar kupas",
        "5 buah Tahu putih tebal, potong belah diagonal menjadi segitiga",
        "15 lembar Kulit pangsit garing renyah",
        "2 batang Daun bawang bawang iris sangat halus",
        "Saus Kacang: 150g Kacang tanah goreng, 3 siung Bawang putih, 4 Cabai merah keriting goreng, 3 sdm Gula kelapa sisir, 2 sdm Air asam Jawa, Kecap manis berkualitas, Jeruk limau."
      ],
      cookingSteps: [
        "Uleni daging ikan tenggiri giling dingin bersama telur ayam segar, daun bawang cincang halus, garam murni hancur, merica bubuk sampai pekat lengket menyatu.",
        "Masukkan tepung sagu tani murni sedikit demi sedikit sembari diaduk lembut memutar menggunakan spatula kayu agar hasil adonan bakso ikan tidak keras.",
        "Ambil potongan tahu putih diagonal segitiga, korek sedikit isi tengahnya, lalu isikan adonan ikan tenggiri kenyal tersebut ke sela-sela tahu rukun.",
        "Letakkan sesendok adonan ikan di atas selembar kulit pangsit, cubit ujung-ujung kulit ke atas mengapit adonan.",
        "Panaskan minyak kelapa melimpah dalam wajan (deep fry) dengan api sedang. Goreng tahu ikan dan pangsit ikan hingga merekah garing berwarna cokelat keemasan matang.",
        "Tiriskan batagor garing, potong kasar dng gunting, lalu siram dng bumbu kacang kental hangat, kecap manis harum, dan kucuran jeruk limau segar mentah."
      ]
    }
  ];

  return (
    <div className="batik-dark-bg min-h-screen py-10 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 text-on-surface">
      {/* Back button */}
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

      {/* 1. West Java Hero Section with Gedung Sate */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img
          alt="Gedung Sate Bandung Jawa Barat"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          src="https://i.pinimg.com/736x/f6/33/69/f633691873f6169f2a11ef8e759ea1d0.jpg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            SUNDA PARAHYANGAN
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Jawa Barat Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Temukan kesegaran alam bumi tanah Pasundan, tempat keindahan pegunungan hijau bertemu dengan kehangatan sapa batin budaya Sunda yang luhur ramah, serta nikmatnya ragam hidangan bumbu rempah pusaka melintasi generasi.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Gedung Sate & Sundanese History */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img
            alt="Kemegahan Gedung Sate Bandung"
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]"
            src="https://i.pinimg.com/736x/06/d9/bf/06d9bffff82ba41d80af874c378439aa.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SEJARAH &amp; LANDMARK
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Menelusuri Histori & Landmark Gedung Sate
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Gedung Sate didirikan pada tahun 1920 yang dirancang oleh arsitek terkemuka asal Belanda, J. Gerber. Bangunan anggun ini memadukan kemegahan gaya Renaisans Italia, tata atap pura khas Bali, serta ornamen stupa Candi Borobudur Hindu-Budha. Menara puncak gedung dihiasi ornamen menusuk bersimbol tusuk sate dengan 6 buah jambu air sebagai representasi modal pembangunan 6 juta gulden kala itu, menjadikannya monumen bersejarah utama Tatar Pasundan.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Someah Hade ka Semah&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Falsafah Hidup Keramahan Hangat Suku Sunda Menjamu Tamu
            </span>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Lalapan Hijau
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Keharmonisan rohani tercermin dalam boga Sunda yang menjunjung tinggi keasrian sayur mentah pembawa energi klorofil murni dan ketenangan batin.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kekeluargaan Botram
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Seni bersantap lesehan di atas hamparan helai daun pisang hutan memanjang, menyatukan kasta, menghapus sekat sosial, dan menumbuhkan kasih sayang silih asih.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">1920</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                TAHUN PELETAKAN BATU
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Gedung Sate Bandung kini berdiri megah sebagai simbol kedaulatan, pusat kepemimpinan, dan pesona pusaka kebudayaan Jawa Barat yang agung.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. West Java Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            KULINER LEGENDARIS PASUNDAN
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Jawa Barat
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati kelezatan warisan tatar Sunda yang berciri khas kesegaran lalap alami, harum aroma kencur, serta paduan manis gurihnya bumbu maranggi yang legendaris.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {dishes.map((dish, index) => (
            <div
              key={dish.name}
              onClick={() => setSelectedDish(dish)}
              className={`group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between ${index === 0 ? 'md:col-span-8' : 'md:col-span-4'}`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? 'h-72 md:h-96' : index === 1 ? 'h-64 md:h-[24rem]' : 'h-56'}`}>
                <img
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={dish.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/20 to-transparent"></div>
                {index < 2 && (
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">
                      {index === 0 ? 'KULINER UNGGULAN' : 'KULINER PILIHAN'}
                    </span>
                    <h4 className={`font-serif text-on-surface font-bold mt-1 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-2xl'}`}>
                      {dish.name}
                    </h4>
                  </div>
                )}
              </div>
              <div className={`${index < 2 ? 'p-6' : 'p-5'} flex-grow flex flex-col justify-between gap-3`}>
                <div>
                  {index >= 2 && (
                    <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">
                      {dish.name}
                    </h5>
                  )}
                  <p className={`font-sans text-xs text-on-surface-variant leading-relaxed ${index < 2 ? 'text-justify mb-5 line-clamp-3' : 'line-clamp-2'}`}>
                    {dish.description}
                  </p>
                </div>
                {index < 2 ? (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedDish(dish);
                    }}
                    className={index === 0
                      ? 'bg-primary text-on-primary px-5 py-2 font-sans text-[10px] font-bold tracking-wider hover:brightness-110 rounded transition-all uppercase self-start'
                      : 'text-primary font-sans text-[10px] font-bold tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all uppercase self-start'}
                  >
                    {index === 0 ? 'LIHAT RESEP' : 'EKSPLORASI RESEP'}
                    {index === 1 && <span className="material-symbols-outlined text-[10px]">arrow_forward</span>}
                  </button>
                ) : (
                  <span className="text-primary font-sans text-[9px] tracking-widest font-bold uppercase flex items-center gap-1.5 mt-2">
                    Lihat Resep <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
                  </span>
                )}
              </div>
            </div>
          ))}
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
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">KULINER NUSANTARA</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-on-surface">{selectedDish.name}</h3>
              </div>
              {/* Banner Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-primary/10">
                <img src={selectedDish.imageUrl} alt={selectedDish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              {/* History / Nilai Adat */}
              <div className="flex flex-col gap-2">
                <h5 className="font-serif text-base text-primary font-bold">Silsilah & Nilai Adat</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify italic bg-primary/5 border-l-2 border-primary/40 pl-4 py-2">
                  &ldquo;{selectedDish.history}&rdquo;
                </p>
              </div>

              {/* Ingredients & Steps split screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-3">
                  <h5 className="font-serif text-base text-primary font-bold">Bumbu Esensial</h5>
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
                  <h5 className="font-serif text-base text-primary font-bold">Tata Cara Memasak</h5>
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
