import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BaliDetailProps {
  onBack: () => void;
  onAskAI: (query: string) => void;
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

export function BaliDetail({ onBack, onAskAI, onViewRecipe }: BaliDetailProps) {
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
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzbWFMQVFomUvm67o1KRtFglhoRoU6Z9mTPOqTFN7CEE-VTT0A6CEY3HOUXQTkyZYus-LRriXgS4Np0Hq7FcO1RHGKPM7eXpIViWwilRYmK-dvlMHDnrgIKD7DoKtcZvVFe5bgiwg9ZwYF8_Nuy-pSOmCpHQOYn4yQCZq6gzR7zM0Wg6tr11D4YWPVc70LtPTpVTk8p-M0s2z75Uz1KueAe4xy_4RflPlT5VtjCN4iP9Swe9_273KEBTBAfpvHUfJjeEGotdrS0k0",
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
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeLnDeshdTyzEsmeVvDaZf78QGrE_IcVonodamvL-4AC8tgmpLnFMwBvYcn2tkqCkz4n6tjSXfFdZCRrSiK8lRq5GKVYCD_dqpMxYw0D-7sCxDQdmFN5RwmTVTB_pMkWyQ9wWM5D32qBnC9afNqsNS-tgO9LsdDz4uATj8CeCMWdCyOXtJLHLUAe0gKkEnHCfHXQuhYjUfAJM4hp92f3YYxgdc0KMm8vt_b-Wz2rJjx3ajo77J6HfKu9kjzCKGQTohv7hSrBUXV0c",
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
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl4g61lym0sTJVMkyuT_jz95RW9GRucIo41vQ8kFJbKvW3AU2h6XpinvrwWYzViXiE7avof--IKcgi5oPZI36dcbwiMNVOoHTeTliqT2UPqrv8yLaajp1x1Erz1dE72fFoqaW2FY21WdR6QU3kHlptV4w9QrgKPbK9BaLVRE0_tQjEWCm4T1vKP5PJdwpN1gu72yU22IJNLb4cjFG-QxjU-r-kTs4umqZvyXt2uyPwRhjA9XNKHIAth7fSYzUmx4o0bDBlDNKggWQ",
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
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkChzGOcODwbcdBGC_yL_VhrVsAoKc4WNU_uLMTaPegumvaoqbdp3xbEEwu7tTFGzBXesSzrG3R2G5c2a7XnYF7GqCCtv_fvT8oBoi0L5u6TCLF6v71bGDw-lhgzHBcLD1AJlDzzaGhs7fmH_zkU9scK94tn0PKi6xkotic37Eu89i1tuo_B52sjWOVQ8MQHwAvyLDpzDn0ZkupXHlXFr2PhZH7VamQmv4n_piJge8M_DiemO6wvfts-gTJqU0jm5vj8sL8V6Wh4",
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
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvyTuOmKkB9cOKWQolEoNZdtChiCMrZUQrwdoNjuvLv3JwhJDY-b8BAe3_2OzQ7_SGyWIca1kcBaWUU0TzQ1uKKtDp1WuMGDSF2FQbsS-Fq_JO3f2E6c1qhsm6B4tKqmATHY9K-WITtDk_mViIrZay0DVE0D63puP6cg70RF9yUmEynQQYMhjoP6JDIQ0HLq0-djGLapNyzt0-rqQz_L5WrlHAmg7qsa-cU3wBhKKuoh19HUdqMzDD7eRs-0GDe9zHds-LRVH8okM",
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

      {/* 1. Immersive Bali Hero Section with Lake Beratan Temple */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Pura Ulun Danu Beratan Temple Bali" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0WMdW_TnGi7vQlMtMXneCa1HKgr5JE0IISStI4TxaxR0CnPW5VMv-KsMFaKUpbylm6EwL8JYSB0Yf2bIFEU1dZ63iM_kW2BAV9RXO2PUKNjZ20Ah2WXQ8SS9apxpUn3XsJdX5ZEtWrq0fRGk2FM80b04X2NCKgGkOOL_kFrRJsVMWPj22hkT-J53Ib8XKhe15MBu05nEZvN0qyO-FRPGx5WC2WZkwWfU4IXrHuBuxXUI6koxzgDt7wugUmIfzMjFJENDMQetyMdg" 
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1OHQvedsRzskVYzIZUC5qWM3xUYYtJuMFu6y9ym2VbXz2odj2VqPI6kIdgi9MT-I7I94JaxdjWl8WGfFlGjrEKvLlsWAHqWkgMJ1JwUYBAfYshdciCz6-pLAYeubMeSuHpD8FviJrkPet1Wdm1GsGNLSNC32U8MpdZff0sktnI5GHQDq34ef3q13fFg6bkTmtr8Gjp5Bf9kNY9oVweCzv9234qoybhGKtiiAaWSv3lNqejqF9vTrVg1FMK7gC3DhuPSsMAjx_DPA"
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
          
          {/* Ayam Betutu Card (Featured - 8 Cols width / Row span 2) */}
          <div 
            onClick={() => setSelectedDish(dishes[0])}
            className="md:col-span-8 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-72 md:h-96 overflow-hidden">
              <img 
                alt="Ayam Betutu Bali" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">TERFAVORIT</span>
                <h4 className="font-serif text-2xl md:text-3xl text-on-surface font-bold mt-1">{dishes[0].name}</h4>
              </div>
            </div>
            <div className="p-6">
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed text-justify mb-5 line-clamp-3">
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

          {/* Sate Lilit Card (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[1])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-64 md:h-[24rem] overflow-hidden">
              <img 
                alt="Sate Lilit" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">WANGI SERAI</span>
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

          {/* Babi Guling (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[2])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Babi Guling" 
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

          {/* Lawar (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[3])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Lawar" 
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

          {/* Nasi Campur Bali (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[4])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Nasi Campur Bali" 
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
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">WARISAN ADAT DEWATA</span>
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
