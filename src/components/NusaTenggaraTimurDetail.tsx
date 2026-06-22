import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NusaTenggaraTimurDetailProps {
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

export function NusaTenggaraTimurDetail({ onBack, onViewRecipe }: NusaTenggaraTimurDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Nusa Tenggara Timur",
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
      name: "Se'i Sapi Kupang",
      rating: "4.9",
      description: "Daging sapi bagian has luar berlemak tipis dibumbui bawang putih kasar dan garam laut, diasap perlahan di atas dahan kayu kosambi wangi kering bersuhu rendah, diselimuti dedaunan kosambi basah segar agar uap harum aromatik mengunci kaldu alami daging.",
      imageUrl: "https://porosnusantara.co.id/wp-content/uploads/2020/04/IMG-20200427-WA0001.jpg",
      history: "Se'i berasal dari bahasa lokal bahasa Rote yang berarti ditarik memanjang secara horizontal. Merupakan teknik kuno pengawetan serta hidangan pusaka leluhur suku pegunungan Timor yang menggunakan dahan kayu Kosambi ('Schleichera oleosa') yang berminyak dan beraroma harum bersanding dng uap tutupan daun kosambi melimpah untuk memberi rona kemerahan alami pada daging awetan peneman perjalanan klan.",
      ingredients: [
        "800g Daging sapi has luar segar (tenderloin/strip) berlemak tipis",
        "5 siung Bawang putih pedas, cincang sangat halus",
        "1 sdm Merica butiran hitam ditumbuk kasar",
        "1 sdm Garam laut kasar alami (Kristal Gurih Kupang)",
        "Dahan kayu Kosambi kering (untuk bahan bakar asap)",
        "Limpahan Daun Kosambi segar bergetah harum (untuk bungkusan uap asap)"
      ],
      cookingSteps: [
        "Sayat tipis memanjang daging sapi searah serat daging dengan ketebalan seragam sekitar 2cm.",
        "Balurkan kombinasi bumbu halus bawang putih cincang, garam kasar, dan merica butiran hitam ke seluruh serat permukaan luar daging. Simpan di kulkas selama 1 jam agar terkunci rapat.",
        "Siapkan alat pengasap atau tungku batu tradisional. Nyalakan dahan kayu Kosambi kering hingga menyisakan bara arang merah membara tanpa menyisakan jilatan api bebas.",
        "Letakkan lembaran kawat di atas tungku dng jarak minimal 25cm dari sebaran bara arang agar daging matang merata berkat uap panas sedang, bukan terpanggang langsung.",
        "Tata daging sapi memanjang di atas kawat, tutupi seluruh permukaan atas daging secara bertumpuk bergumpal dng daun Kosambi segar basah agar asap wangi bersirkulasi perlahan mewarnai daging menjadi kemerahan alami.",
        "Lakukan teknik pengasapan stabil ini selama 45-60 menit hingga daging sapi kering beraroma asap pekat. Iris tipis-tipis menyerong melintang serat, sajikan mendampingi tumis bunga pepaya pahit-gurih dan sambal Lu'at segar pedas asam jeruk nipis."
      ]
    },
    {
      name: "Jagung Bose",
      rating: "4.8",
      description: "Bubur kental bernutrisi tinggi khas tanah Timor, diolah dari biji jagung putih lokal yang dilunakkan (bose) bersama campuran santan kelapa sedang, kacang merah rebus, kacang tanah gurih, dan labu manis.",
      imageUrl: "https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Atambua/o/1724220561730-2031689006-1/eqbzfhue8hgwsjh.jpeg",
      history: "Jagung Bose adalah sumber karbohidrat alternatif pengganti nasi yang sangat historis di kalangan masyarakat pedalaman NTT ketika musim kekeringan meluas. Mengolah biji jagung dng cara ditumbuk dng lesung kayu lambang kebersamaan keluarga, disuguhkan hangat sebagai rasa terima kasih demi menyambut persinggahan tamu agung adat.",
      ingredients: [
        "500g Jagung pulut/putih lokal, hilangkan kulit arinya lalu tumbuk kasar (di-bose)",
        "200g Kacang merah kering, rendam air semalaman hingga lunak",
        "100g Kacang tanah kupas",
        "300g Labu kuning/manis madu, potong dadu sedang",
        "1 liter Santan sedang kelapa dari buah kelapa parut segar",
        "2 lembar Daun salam wangi, Garam laut kasar secukupnya."
      ],
      cookingSteps: [
        "Rebus tumbukan jagung putih bose bersama kacang merah di air mendidih melimpah dalam periuk tanah liat hingga keduanya benar-benar lunak membulat.",
        "Masukkan kacang tanah dan potongan dadu labu kuning manis, masak terus hingga struktur labu mulai lumat kental menyatu dng rebusan jagung.",
        "Tuangkan santan sedang kelapa secara perlahan bersama daun salam dan garam laut kasar agar rasanya gurih pekat meresap.",
        "Aduk perlahan memutar konstan dng api kompor kecil-sedang hingga bubur mengering kental meletup-letup basah.",
        "Angkat hidangkan Jagung Bose hangat bersisian dng Se'i Sapi asap gurih pedas atau sambal teri kacang asin."
      ]
    },
    {
      name: "Katemak",
      rating: "4.7",
      description: "Sup sayuran bening bernutrisi tinggi khas Nusa Tenggara Timur, memadukan kelembutan kacang merah rebus, potongan labu manis madu, daun kelor hutan segar berkhasiat tinggi, bunga pepaya, dan pipilan jagung manis.",
      imageUrl: "https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Kupang/o/1769426169642-Arianto-Y-Selly-2682746972/q2k8hrboni429wu.jpeg",
      history: "Katemak mencerminkan kemampuan luar biasa masyarakat Nusa Tenggara Timur beradaptasi di wilayah kering berbatu kapur dng memetik sayuran liar kaya manfaat medis di pekarangan rumah seperti daun kelor dan labu. Katemak disajikan hangat murni dng cita rasa kaldu yang polos gurih segar tanpa minyak lemak.",
      ingredients: [
        "200g Jagung manis pipilan segar",
        "150g Kacang merah, rebus matang lunak",
        "1 ikat Daun kelor segar (ambil bagian daun mudanya saja)",
        "100g Daun pepaya muda atau bunga pepaya garing, rendam air garam",
        "200g Labu manis, bersihkan kulit lalu potong dadu",
        "Bumbu sederhana sup: 3 siung Bawang merah, 2 siung Bawang putih, garam laut kasar, air kaldu rebusan sayur segar."
      ],
      cookingSteps: [
        "Panaskan 1.5 liter air murni dalam panci hingga mendidih bebatuan.",
        "Rebus bawang merah dan bawang putih iris bersama potongan dadu labu kuning dan jagung manis hingga labu melembut.",
        "Masukkan kacang merah rebus serta sayuran daun pepaya/bunga pepaya garing yang telah dibilas.",
        "Terakhir, sesaat menjelang sup diangkat, masukkan helaian daun kelor segar. Rebus kilat selama 2 menit agar vitamin daun kelor tetap hijau segar prima.",
        "Tambahkan garam laut secukupnya, aduk rata dan sajikan sup Katemak bening hangat menyehatkan lambung."
      ]
    },
    {
      name: "Kopi Bajawa Flores",
      rating: "4.8",
      description: "Seduhan biji kopi Arabika legendaris yang dipetik merah dari perkebunan subur dataran tinggi berpasir vulkanik Bajawa Ngada Flores, menyuguhkan rona rasa tembakau kering berseling keharuman cokelat pahit kental.",
      imageUrl: "https://www.bitkaorigin.com/assets/myback/js/elFinder/files/mengenal-kopi-flores-bajawa-bitkaorigin-2-karakter.jpg",
      history: "Perkebunan Kopi Bajawa berkembang subur di ketinggian 1.000 hingga 1.550 mdpl di dataran berkapur subur kaki Gunung Inerie Flores. Karakteristik rasanya yang kaya akan aroma earthy manis cokelat merupakan kebanggaan pusaka agraris Flobamora yang telah mengantongi sertifikat Indikasi Geografis dan digemari di seluruh kedai kopi dunia.",
      ingredients: [
        "20g Biji kopi Arabika Bajawa Flores (roast profile medium-to-dark)",
        "200ml Air murni berkualitas (panaskan hingga suhu optimal 92°C)"
      ],
      cookingSteps: [
        "Giling biji kopi Bajawa Flores dng tingkat kelembutan medium-coarse (agak kasar berpasir).",
        "Letakkan kertas filter di dripper V60, basahi dng air panas sebentar untuk menghilangkan aroma kertas, lalu buang air cuciannya.",
        "Masukkan bubuk kopi Bajawa ke dalam filter, ratakan permukaannya.",
        "Lakukan proses blooming (pembasahan awal) dng menuangkan 40ml air panas selama 30 detik untuk melepaskan gas karbon dioksida biji kopi.",
        "Tuangkan sisa air panas dalam gerakan melingkar konsentris konstan dari tengah ke arah luar hingga habis menyentuh 200ml.",
        "Tiriskan sajikan Kopi Bajawa Flores hitam murni tanpa gula guna mengecap sensasi aroma karamel cokelat manis-smokey alam Flores."
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

      {/* 1. NTT Hero Section with Landscape Traditional Houses */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img
          alt="Traditional houses of NTT Flores Kupang"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Pulau_Padar_1.jpg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            BUMI FLOBAMORA &bull; CAKRAWALA VOLKANIK
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Nusa Tenggara Timur
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Menapaki keringnya perbukitan sabana vulkanik komodo, menikmati kehangatan eksotisme desa adat leluhur Flores, dan menghirup pekatnya aroma pengasapan kayu kosambi legendaris Se'i Sapi asli nusantara.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Tenun Ikat & Rumah Musalaki */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img
            alt="Intricate patterns of Tenun Ikat NTT textile"
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]"
            src="https://i.pinimg.com/736x/9e/4d/cf/9e4dcf0a30ea06f4c8ad6e47d49033f8.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            GEOMETRIS PURBA &bull; MAHKOTA KEARIFAN
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Pesona Tenun Ikat &amp; Takhta Rumah Musalaki
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Masyarakat Nusa Tenggara Timur melestarikan adat istiadat leluhur dalam helaian benang-benang Tenun Ikat yang ditenun penuh ketekunan bermandikan perasan tanaman pewarna alami. Motif geometris purba, hewan berkarisma spiritual, dan jalinan rumpun kekeluargaan bukan sekadar estetika belaka, melainkan rangkuman status kasta serta doa perlindungan jiwa. Rona-rona warna hangat tenun ikat seiring harmonis dng arsitektur tinggi menjulang berkelokan magis Rumah Musalaki penegak sakral penghubung takdir manusia dng dewa penguasa gunung.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Nekaf Mese Ansaof Mese&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Falsafah Sehati Sejiwa, Solidaritas Kerukunan, dan Kehangatan Suku-Suku Flobamora NTT
            </span>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Kayu Kosambi
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Pemanfaatan dahan kayu dng dedaunan segar tanaman Kosambi dlm teknik se'i, melambangkan harmoni alam pegunungan menjaga ekosistem ketahanan pangan.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Ikatan Adat Sasando
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Petikan dawai luhur alat musik daun lontar Sasando Rote mengumandangkan kemerduan petualangan bahari serta keteguhan jiwa manusia Flobamora.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">FLOBAMORA</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                GABUNGAN ENAM NUSA INDAH
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Seni boga dan tradisi leluhur Nusa Tenggara Timur kini bersinar berkilau abadi di balik pelestarian tenunan pusaka, musik sasando, dan harum asap kayu Kosambi.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. NTT Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            BUMI RASA KOSAMBI FLOBAMORA
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Nusa Tenggara Timur
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Silakan telusuri cita rasa Se'i Sapi aroma kosambi yang orisinal, kelembutan parutan bubur Jagung Bose, kesegaran sup kelor Katemak, serta wangi Kopi Bajawa vulkanik.
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
                <h5 className="font-serif text-base text-primary font-bold">Silsilah &amp; Nilai Adat</h5>
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
