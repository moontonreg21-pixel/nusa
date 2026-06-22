import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BaliDetailProps {
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

export function BaliDetail({ onBack, onViewRecipe }: BaliDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Bali",
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
      name: "Ayam Betutu",
      rating: "4.9",
      description: "Ayam utuh yang dibalut dengan Base Genep (bumbu rempah lengkap khas Bali) dan minyak kelapa murni, dibungkus pelepah pinang atau daun pisang, lalu dipanggang/dikukus perlahan selama berjam-jam hingga dagingnya lembut terlepas dari tulang.",
      imageUrl: "https://i.pinimg.com/736x/7b/d4/7e/7bd47ea0ce92314b5e61681e6c62baa5.jpg",
      history: "Ayam Betutu merupakan kuliner ritual keagamaan Hindu Bali yang sakral. Awalnya disajikan khusus sebagai persembahan (banten) dalam upacara adat, hidangan ini melambangkan rasa syukur atas kesuburan tanah serta harmoni energi alam.",
      ingredients: [
        "1 ekor Ayam kampung utuh, bersihkan rongga dalamnya",
        "3 sdm Minyak kelapa murni (tanusan asli Bali)",
        "Daun pisang tua atau pelepah pinang untuk membungkus",
        "Base Genep Halus: 10 Bawang merah, 5 Bawang putih, 4 Cabai merah besar, 10 Cabai rawit, 3 Kemiri sangrai, 2 cm Kunyit, 2 cm Jahe, 2 cm Kencur, 2 cm Lengkuas, 1 sdt Terasi bakar, 1 sdm Ketumbar bubuk murni, 1/2 sdt Jinten, Garam."
      ],
      cookingSteps: [
        "Lumuri ayam kampung luar dalam dengan garam dan air perasan jeruk nipis, diamkan 15 menit lalu bilas.",
        "Campurkan Base Genep halus dengan minyak kelapa murni, aduk rata.",
        "Balurkan sebagian besar bumbu ke seluruh permukaan luar ayam dan masukkan sebagian bumbu ke dalam rongga perut ayam.",
        "Bungkus ayam rapat-rapat dalam beberapa lapis daun pisang tua, ikat kencang dengan tali bambu.",
        "Kukus bungkusan ayam selama 2 jam, lalu panggang di atas bara api arang sekam selama 1 jam hingga bumbu meresap kering sempurna."
      ]
    },
    {
      name: "Sate Lilit",
      rating: "4.8",
      description: "Sate khas Bali yang terbuat dari adonan ikan laut atau ayam cincang yang dicampur kelapa parut memanjang, santan kental, dan Base Genep wangi, lalu dililitkan pada batang serai segar sebelum dipanggang di atas bara arang kelapa.",
      imageUrl: "https://i.pinimg.com/1200x/3f/50/59/3f505998dd576a87af8b20311fa78061.jpg",
      history: "Sate Lilit secara sosiologis mencerminkan falsafah kegotongroyongan dan persatuan masyarakat Bali. Lilitan adonan yang erat melambangkan ikatan adat krama Bali yang kokoh, sedangkan tusuk serai melambangkan wewangian alam penyucian diri.",
      ingredients: [
        "400g Daging ikan tenggiri halus (bisa diganti ayam cincang)",
        "100g Kelapa parut setengah tua (parut memanjang)",
        "50ml Santan kental murni",
        "12 batang Serai tebal pendek (untuk tusukan sate)",
        "Bumbu Base Genep halus: bawang merah, bawang putih, cabai, kemiri, kunyit, kencur, jahe, ketumbar, garam murni."
      ],
      cookingSteps: [
        "Campur daging ikan/ayam halus, kelapa parut, santan kental, dan Base Genep dalam wadah mangkuk besar.",
        "Uleni adonan sembari sedikit ditekan hingga bertekstur kalis dan mudah dibentuk.",
        "Ambil segenggam kecil adonan, tempelkan lalu lilitkan rapat-rapat mengitari bagian pangkal batang serai.",
        "Panggang sate di atas bara api arang kelapa yang membara tenang sembari sesekali dibolak-balik hingga kuning kecokelatan aromatik."
      ]
    },
    {
      name: "Babi Guling",
      rating: "4.9",
      description: "Daging babi panggang khas Bali yang sangat ikonik. Babi utuh diisi dengan campuran bumbu Base Gede lengkap serta daun ketela di dalamnya, lalu digulingkan manual di atas api terbuka hingga kulitnya renyah keemasan (crackling) dan dagingnya luar biasa lembut.",
      imageUrl: "https://inivie.com/_next/image?url=https%3A%2F%2Fblog.inivie.com%2Fwp-content%2Fuploads%2F2025%2F02%2FArtboard-13-20-1-1024x683.jpg&w=1080&q=75",
      history: "Babi Guling pada mulanya adalah sajian istimewa dalam upacara keagamaan Hindu Bali seperti upacara potong gigi (Mepandes) atau pernikahan besar. Kulit renyah mengkilap keemasan melambangkan kemakmuran dan kesucian niat sesaji.",
      ingredients: [
        "1 unit Pork loin dengan kulit tebal (versi rumahan praktis)",
        "2 ikat Daun singkong muda, rebus setengah matang",
        "Bumbu Base Gede melimpah: bawang merah, bawang putih, lengkuas, kunyit parut, kencur, cabai, terasi, ketumbar, merica hitam, minyak kelapa asli."
      ],
      cookingSteps: [
        "Tusuk-tusuk permukaan luar kulit babi dengan jarum jahit/garpu secara merata agar tidak menggelembung berlebihan saat dipanggang.",
        "Lumuri bagian daging bagian dalam dengan bumbu Base Gede lengkap melimpah.",
        "Letakkan daun singkong rebus yang telah dicampur sisa bumbu di tengah daging, gulung kencang lalu ikat rapat menggunakan tali kasur.",
        "Olesi kulit luar babi dengan minyak kelapa dan sedikit kunyit cair agar menghasilkan rona kuning mengkilat.",
        "Panggang dalam oven dengan suhu tinggi 200°C selama 30 menit awal untuk kerenyahan maksimal kulit, lalu turunkan suhu ke 160°C selama 1.5 jam hingga daging matang juicy."
      ]
    },
    {
      name: "Lawar Bali",
      rating: "4.8",
      description: "Hidangan tradisional Bali berupa campuran sayuran cincang (seperti kacang panjang rebus atau nangka muda), kelapa parut, serta bumbu Base Genep wangi dan daging cincang berlumur air jeruk purut segar.",
      imageUrl: "https://i.pinimg.com/1200x/62/b6/1e/62b61eade5b9e250c372112ed5b721a6.jpg",
      history: "Tradisi 'Ngelawar' adalah aktivitas meracik Lawar bersama yang wajib dilakukan oleh kaum pria Bali menjelang upacara adat besar. Kegiatan ini memupuk semangat kebersamaan (ngayah) demi menjaga kerukunan adat banjar.",
      ingredients: [
        "200g Kacang panjang, iris bulat tipis, rebus sebentar",
        "100g Kelapa parut sangrai sebentar",
        "150g Daging ayam rebus, suwir halus lalu cincang",
        "2 sdm Air jeruk purut",
        "Bumbu halus: bawang merah, bawang putih, kencur, kunyit, ketumbar bubuk, bawang goreng remah, sedikit terasi bakar."
      ],
      cookingSteps: [
        "Tumis bumbu halus dengan minyak kelapa murni hingga matang harum, matikan api.",
        "Dalam wadah baskom, masukkan kacang panjang rebus, kelapa parut, daging ayam cincang, dan bumbu halus tumis.",
        "Aduk rata menggunakan tangan kosong (lebih autentik) sembari diremas pelan agar bumbu menyatu sempurna.",
        "Kucuri air jeruk purut segar dan taburi dengan irisan bawang merah goreng renyah sebelum dihidangkan."
      ]
    },
    {
      name: "Nasi Campur Bali",
      rating: "4.9",
      description: "Miniatur festival rasa Bali dalam satu piring harmoni. Nasi putih hangat disajikan lengkap bersama porsi kecil Ayam Betutu, Sate Lilit, Lawar kacang panjang, kacang tanah goreng renyah, telur rebus bumbu Bali, dan pedasnya Sambal Matah segar.",
      imageUrl: "https://i.pinimg.com/1200x/f0/36/d3/f036d3b57e3a3255a3333a031abd1e32.jpg",
      history: "Nasi Campur mencerminkan kehidupan masyarakat Bali sehari-hari yang merangkum berbagai elemen rasa (manis, asin, pedas, gurih, kelat) dalam keserasian hidup berdampingan, selaras dengan falsafah keseimbangan kosmis Jawa-Bali.",
      ingredients: [
        "Nasi putih pulen hangat aromatik pandan",
        "Suwiran Ayam Betutu, tusuk Sate Lilit matang, sesendok Lawar Bali",
        "Sambal Matah: iris halus cabai rawit merah, bawang merah, serai bagian putih, daun jeruk, siram minyak kelapa mendidih dan terasi.",
        "Kacang tanah goreng, telur bumbu genep setengah belah."
      ],
      cookingSteps: [
        "Tata nasi putih hangat berbentuk kerucut tumpeng kecil di tengah piring beralas daun pisang.",
        "Sandingkan suwiran Ayam Betutu pedas di satu sisi, diiringi Lawar segar di sisi lainnya.",
        "Sematkan batang Sate Lilit yang masih mengepul wangi di tepian piring.",
        "Lengkapi dengan taburan kacang tanah goreng renyah serta sesendok penuh Sambal Matah wangi segar di atas keliling nasi."
      ]
    }
  ];

  return (
    <div className="batik-dark-bg min-h-screen py-10 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 text-on-surface">
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

      {/* 1. Immersive Bali Hero Section with Lake Beratan Temple */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img
          alt="Pura Ulun Danu Beratan Temple Bali"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          src="https://upload.wikimedia.org/wikipedia/commons/7/74/Pura_Ulundanu_Bedugul_di_pagi_hari.jpg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold text-shadow">
            KOSMIS, INDAH, SAKRAL
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Bali Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed text-shadow-sm">
            Sebuah simfoni rempah yang lahir dari pelukan tradisi leluhur dan kesucian ritual spiritual Hindu Dewata, di mana setiap hidangan disajikan sebagai bentuk persembahan yang suci bagi alam dan pencipta.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Warisan Luhur Tri Hita Karana & Subak */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img
            alt="Lush green Balinese rice terraces"
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]"
            src="https://i.pinimg.com/736x/fa/7e/e6/fa7ee6b2ab08b2b8fc927265a70536fc.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SPIRITUALITAS &amp; HARMONI
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Filosofi Tri Hita Karana &amp; Subak
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Bagi masyarakat Bali, pangan bukan sekadar santapan fisik, melainkan simpul suci kehidupan. Landasan boga Bali bersandar erat pada filsafat <strong>Tri Hita Karana</strong>—tiga sumber keharmonisan yang mutlak antara manusia dengan Sang Pencipta (Parhyangan), sesama manusia (Pawongan), dan lingkungannya (Palemahan).
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Sistem irigasi Subak yang ikonik mendatangkan air secara adil, menyucikan padi sebagai dewi kesuburan Sri, menyelaraskan bumi manusia dengan surga.&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Warisan Dunia UNESCO Warisan Subak Bali
            </span>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Adat Genep
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Base Genep menggabungkan empat elemen tanaman—akar, batang, buah, dan dedaunan aromatik—mencerminkan perpaduan seimbang kekuatan penjuru mata angin kosmis.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Seni Ngayah &amp; Tradisi
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Meramu sesaji Lawar bersama-sama di bale banjar memupuk jiwa kebersamaan dan pengabdian tulus sesama krama Bali yang mengakar lintas generasi.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">UNESCO</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                PENGAKUAN DUNIA
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Seni memasak tradisional Bali adalah laku kebajikan, merayakan karunia tanah magis Dewata ke dalam setiap suap hidangan penuh makna.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. Bali Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            SIMFONI RASA PULAU DEWATA
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Bali
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati keajaiban bumbu Base Genep wangi dan kelembutan olahan boga laut beralas pisang yang eksotis, diolah penuh bakti seni koki tradisional Bali.
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
                <h5 className="font-serif text-base text-primary font-bold">Keagungan Adat &amp; Budaya</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify italic bg-primary/5 border-l-2 border-primary/40 pl-4 py-2">
                  &ldquo;{selectedDish.history}&rdquo;
                </p>
              </div>

              {/* Ingredients & Steps split screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-3">
                  <h5 className="font-serif text-base text-primary font-bold">Rincian Bahan &amp; Bumbu</h5>
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
                  <h5 className="font-serif text-base text-primary font-bold">Instruksi Memasak</h5>
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
