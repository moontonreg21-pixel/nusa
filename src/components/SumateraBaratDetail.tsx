import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SumateraBaratDetailProps {
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

export function SumateraBaratDetail({ onBack, onAskAI, onViewRecipe }: SumateraBaratDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Sumatera Barat",
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
      name: "Rendang Daging",
      rating: "5.0",
      description: "Sajian lambang kehormatan adat berupa potongan daging sapi paha berkualitas tinggi yang dimasak lambat (slow-cooked) selama 8 jam dengan limpahan santan kelapa tua pekat dan 15 bumbu rempah rahasia dari dataran tinggi Solok hingga berona cokelat gelap kehitaman pecah minyak harum luar biasa.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlsjFG2dEcrh5KF2cN3RNiPp3UZ3RTOxD21KjGTd5oCqRaOgctJc_j4-ZZWF6ebz7jBlRgm_mi0qSlAnkH_kdbE-h6NJIgiWSM3SwlLSwNjRLRgXX5TjLtq9ms5yrUa5dngbH8330mSsGTmq7IOMqd_ppAVByFwPLjzXfwLJbBGHtaCUVMUAzt8SUN5PMkesxfXbFpoahhLvMSiSGidbQv-DnkO1JlcryZMNSnexrhe4GZXlMjaU0-PXZz-hE4d4aHcyS7fj1aNcE",
      history: "Rendang menempati kasta tertinggi dalam adat Minangkabau. Hidangan ini melambangkan kekeluargaan dan mufakat: 'dagiang' (daging sapi) sebagai lambang Niniak Mamak (tetua adat), 'karambil' (kelapa) sebagai kaum intelektual (Cadiak Pandai), 'lado' (cabai) sebagai alim ulama pendidik moral, dan bumbu pelengkap sebagai representasi masyarakat Minang nan bersatu padu.",
      ingredients: [
        "1kg Daging sapi paha (gandik) segar, potong searah serat",
        "1000ml Santan kelapa tua murni kental dan berminyak",
        "1000ml Santan kelapa encer sisa perasan",
        "2 lembar Daun kunyit raja, robek lalu ikat simpul",
        "5 lembar Daun jeruk purut buang tulang daun",
        "2 batang Serai muda, memarkan aromanya",
        "1 butir Asam kandis kering",
        "Bumbu halus prima: 150g Cabai merah keriting, 15 Bawang merah, 8 Bawang putih, 3cm Jahe parut, 3cm Lengkuas, 1 sdm Ketumbar bubuk sangrai, 1/2 sdt Pala bubuk, 1/2 sdt Jinten bubuk."
      ],
      cookingSteps: [
        "Rebus santan encer bersama bumbu halus kuning, daun kunyit, daun jeruk purut, serai memarkan, dan asam kandis di kuali besi tebal sambil diturun-naikkan bertahap agar gelembung minyak kelapa meluncur alami.",
        "Setelah santan mendidih mengental kemerahan, masukkan potongan daging sapi gandik. Aduk perlahan dengan api sedang hingga kuah menyusut menjadi kecokelatan (fase Kalio).",
        "Tuangkan santan kental murni bertahap sembari mengecilkan api kompor ke tingkat minimum.",
        "Masak terus dengan tingkat kesabaran tinggi hingga kelapa mengalami karamelisasi berwarna cokelat gelap kehitaman pecah minyak.",
        "Aduk sesekali dengan spatula kayu searah agar serat daging tidak hancur. Daging akan menghitam pekat mengering dengan serpihan bumbu aromatik murni."
      ]
    },
    {
      name: "Sate Padang",
      rating: "4.8",
      description: "Potongan daging dan lidah sapi yang gurih empuk, dibakar harum di atas bara kelapa kering kemudian diselimuti siraman saus bumbu kental berwarna kuning kecokelatan yang dipenuhi aroma jinten, ketumbar, merica, dan kapulaga, lalu dimahkotai bawang goreng merah renyah.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEifsy0Ycnlku9Q9ux847_QrgknZhI3ujrtHH0K4zariAHDgw7M-bbdEA8AkEXvD-xgDWOhEfvV6v5qzQ5HiLEVNqeQlwL-kRRfe5UcE7J9jOnYc-DVxVa3odBLFjSN421BcEdAn336NXWP-PB-0qdmpw05XyZsAeuL-Xgm-QkqICbFmsmkR49_T_oQY3t2ZJprb49VYcd1kePBodtiDctHcV9-iHKNJ6jGZJvMAwKtHVFjyOxuRcfS9u6rcm8OJe79mRiXmry4f8",
      history: "Sate Padang merupakan asimilasi bumbu kari pedagang India muslim dan kearifan kuliner Padang Panjang serta Pariaman sejak berabad silam. Disajikan hangat beralas daun pisang murni di atas pincuk bambu melambangkan penghargaan tinggi suku Minang menjamu tamu.",
      ingredients: [
        "600g Daging sapi has dalam atau lidah sapi empuk, potong dadu tipis",
        "600ml Kaldu sapi pekat hasil rebusan daging utama",
        "60g Tepung beras (sebagai pengental kuah mutlak)",
        "2 batang Serai memarkan, 4 lembar Daun jeruk purut, 1 lembar Asam kandis",
        "Bumbu halus kuning: 10 Bawang merah, 5 Bawang putih, 1 sdm Ketumbar sangrai, 2cm Kunyit tua bakar, 1 sdy Merica putih butir, 1/2 sdt Jinten, 3 butir Kapulaga, Garam."
      ],
      cookingSteps: [
        "Rebus daging sapi atau lidah hingga lunak dalam air secukupnya. Angkat tiriskan daging lalu iris kotak kecil, simpan sisa kuah kaldu murninya.",
        "Tumis bumbu halus kuning berempah hingga kering harum di wajan, masukkan ke dalam air rebusan kaldu sapi tadi dan didihkan bersama serai dan daun jeruk.",
        "Larutkan tepung beras dalam sedikit air dingin, lalu tuang pelan-pelan ke kaldu bumbu mendidih sambil diaduk konstan memutar hingga kuah meletup-letup kental mengkilap.",
        "Tusukkan potongan daging/lidah sapi ke lidi bambu, panggang sangat singkat di atas bara api kering untuk mendatangkan efek smokey arang.",
        "Sajikan sate dalam piring beralas daun pisang, siram dengan kuah kental kuning berempah hangat, dan taburkan bawang merah goreng garing."
      ]
    },
    {
      name: "Ayam Pop",
      rating: "4.8",
      description: "Ayam kampung muda gurih pucat mentega tanpa kulit, direbus matang dalam ungkepan bumbu air kelapa muda manis, bawang putih parut, serai wangi, lalu digoreng sangat cepat (celup kejap) di dalam minyak kelapa panas murni.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbinzxKYS-QdfVLaYIkPxrdVLh_j96x2s3PjdBODjYRKzSv5VallwsARW6EzLIzxqEVHBYGKunRHbq1_CdkTKF6QzczutWpV8fYBFi1s-aj8GILP01DAG58IZq530Tm6HSu8B9R7OkHxe9hcinuNITHMD6utRuMVBz5UEKSlsm-ahawalFpodfs7_lcjW3Ld9s6GONui21HWMvWZWcZBzMawvDrbJzb472yi9riKydPCTVQtrvvE5An3vudGVCzb1_5CygP8suLF8",
      history: "Ayam Pop diciptakan oleh salah satu rumah makan legendaris di Kota Bukittinggi sekitar tahun 1960. Namanya melambangkan kepopuleran lagu-lagu pop masa itu, menyajikan alternatif boga ayam non-pedas yang bertekstur sangat juicy dan empuk melumer di lidah.",
      ingredients: [
        "1 ekor Ayam kampung muda, belah empat kupas kulitnya bersih",
        "500ml Air kelapa muda segar murni",
        "5 siung Bawang putih kering, parut halus sekali",
        "2 batang Serai memarkan, 3 lembar Daun jeruk purut",
        "Minyak kelapa murni (untuk teknik flash-fry)",
        "Sambal cocol merah: 6 Cabai merah keriting rebus, 4 Bawang merah, 1 Tomat merah rebus, 1 sdt Garam, 1 sdt Air jeruk nipis."
      ],
      cookingSteps: [
        "Ungkep/rebus belahan daging ayam kampung dalam panci tertutup berisi air kelapa muda segar bersama bawang putih parut, garam murni, daun jeruk, dan serai hingga air menyerap menyusut habis dan serat daging ayam melunak sempurna.",
        "Angkat tiriskan ayam, pastikan permukaannya bebas dari tumpukan bumbu basah.",
        "Panaskan minyak kelapa melimpah dalam wajan. Masukkan ayam ungkep, goreng sangat cepat (hanya 10-15 detik) untuk mempertahankan warna pucat mentega alaminya tanpa membuatnya mengeras.",
        "Ulek halus seluruh bahan sambal merah rebus, lalu tumis sebentar dengan minyak bekas menggoreng ayam, kucuri air jeruk nipis asam manis.",
        "Sajikan Ayam Pop hangat mendampingi sambal merah cocol asam gurih dan rebusan pucuk daun singkong muda."
      ]
    },
    {
      name: "Nasi Kapau",
      rating: "4.8",
      description: "Sajian nasi rames autentik khas nagari Kapau dengan tumpukan gulai bersantan tebal, gulai nangka koloid, gulai tunjang (urat kaki sapi kenyal), sambal cabai hijau petai segar, dan sisa taburan teri Medan renyah bergizi.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPHHD5DyVGGq5IQZmkaouaIjqxobWfVBOHR-eHKSRpC16cEuGFPJOGpB5arKlHh3sH8E3954ZvAn2f9IeDwmhqYEJ_Ad8DB4ZNrx4KflBoafGyc20m-zyE_2x2H7tgYOLQmYOGGHULy2GjGbCQUoVVMYjNPUx4Ib7ErGg0kc4XauCdWEd2R8uOM_T-tVSv4bmTAimpsPqM0L2_rAkD2WiAQOFUvVj1EpKwAX1NVe7DlPrR4DJ4f1Bqx90UpjmuE9dtJwN4S3akn0w",
      history: "Nasi Kapau adalah lambang kemandirian tinggi para bundo kanduang nagari Kapau, Agam. Dahulu dijajakan oleh para Uni di pasar tradisional saat para suaminya merantau jauh. Keunikan penyajian menggunakan sendok kayu bersayap panjang adalah ciri khas yang dijaga luhur turun-temurun.",
      ingredients: [
        "Nasi putih pulen hangat aromatik",
        "Gulai Kapau: 300g Nangka muda potong, 200ml Santan kental, sayur rebung asam kering, lembaran kol kol manis",
        "Lauk Utama: 300g Tunjang (urat sapi kenyal) masak bumbu gulai merah pekat",
        "Sambal Cabuok: ulekan kasar cabai hijau lokal, minyak kelapa, petai belah segar."
      ],
      cookingSteps: [
        "Masak Gulai Kapau khas dengan merendam potongan nangka muda, kol manis, dan rebung asam pelan dalam santan berbumbu merah kunyit hingga kuah berminyak gurih.",
        "Gulai Tunjang: Rebus kikil/urat sapi dalam rebusan santan gulai merah kaya pala kapulaga hingga mengenyal empuk koloid.",
        "Gelarkan helai daun pisang hutan di atas piring, sendokkan nasi putih hangat mengepul.",
        "Tata sayur gulai Kapau, tambahkan potongan tunjang empuk bergizi, kucurkan sambal hijau petai gurih, dan taburi ikan teri garing asin."
      ]
    },
    {
      name: "Teh Talua",
      rating: "4.8",
      description: "Minuman kesehatan pusaka penambah stamina legendaris khas Minang, terbuat dari kuning telur ayam kampung atau bebek segar yang dikocok kuat bersama gula aren halus hingga membusa krem tebal, disiram seduhan teh hitam pekat mendidih, menghasilkan gradasi 5 lapis warna visual yang cantik.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVB4mMFGcVWt2karU8MztryrydTMsNMJTpcEo1lX3fSCdFyZtDpT8URXWnPexs2JMVLRn-DFv5tQpEt17yVgtf2FkFBMd88q1BC67iW5-rtTn9nIf5-tKmIpQP2BnLDkoU1nyVr6w7tULCMWXMXqC2YYBE38kwSM3MJ6vivqqSDdvBjaUddUYm7e_c_I56b8_9rzFYW53Ie3ZZaukXCiUjSOYqgyXVyN-U2BCMXkhT-LeMSjNv0Y6SMgSM-AN5GXkwCu2byRSN8D0",
      history: "Teh Talua dahulu kala merupakan minuman kehormatan eksklusif yang hanya boleh dinikmati oleh para tetua adat (Niniak Mamak) atau saudagar kaya nagari Minang saat rapat adat luhur di balairung Keraton. Kini ia menjadi perekat solidaritas sosial masyarakat di kedai kopi hangat malam hari.",
      ingredients: [
        "1 butir Kuning telur bebek murni (pilih yang segar & merah)",
        "1 sdm Gula kelapa saring halus atau gula aren cair pekat",
        "200ml Teh hitam kering beraroma pekat, seduh mendidih pekat",
        "1 slice Jeruk nipis lokal segar (untuk pemangkas aroma hanyir telur)"
      ],
      cookingSteps: [
        "Pisahkan kuning telur bebek segar dari putihnya, letakkan dalam gelas kaca tebal bening.",
        "Tambahkan gula aren sisir halus, lalu kocok sekuat tenaga menggunakan lidi bambu melingkar tradisional (singkek) atau garpu hingga telur larut sepenuhnya, mengental kaku berwarna krem pucat.",
        "Seduh teh hitam pekat dengan air yang benar-benar dalam titik didih puncak.",
        "Tuangkan air teh mendidih secara perlahan memutar menyusuri dinding gelas agar telur matang ter-pasturisasi bertahap dan membentuk 5 lapisan gradasi warna legendaris.",
        "Sajikan mendampingi irisan jeruk nipis segar di piring kecil tatakan gelas untuk dikucurkan sesaat sebelum diminum."
      ]
    }
  ];

  return (
    <div className="bg-pattern min-h-screen py-10 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 text-on-surface">
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

      {/* 1. West Sumatra Hero Section with Rumah Gadang */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Rumah Gadang Minangkabau Sumatera Barat" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi73bYfLKYOLJ-ItGoTD9ETVMxiQhhRzv-VN-8ZQSIosYaueTfEIslBkgZuR6P5wGc7_zuWtTnqCOPs2mhPfFCHRfJw7VV9tdK_hBupA0e0SaGt6A4odOTw_QsRtUg0qMc4xEvZNMtaW_o9WlfTY3abeQXf5LJcyCksmCOTVwVpgNtkhSZLx5B7tMZuj2Qsmja2289sEN-vdzdx-ZLpmT4vbd-VOGfCiyTEUUcfA_Xw_JY_G6soKtnT5y94PHRm80i13gLpl8eSQw" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            RANAH MINANGKABAU
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Sumatera Barat Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Menelusuri pesona alam daratan tinggi pegunungan Bukit Barisan yang hijau asri, melintasi mahakarya arsitektur Rumah Gadang meliuk tajam, serta merayakan rahasia kedalaman bumbu rempah pusaka terlezat dunia.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Rumah Gadang & Minang Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img 
            alt="Intricate carvings of Rumah Gadang" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWNmF8s-AX8IXIf8bGAIWNxWTkI9tvNvRhxCiRDYrDXF_Eqij8btmMT-VoHtC7ow8ua4pckWF2hj_N5O9hIFsfGMatOEdfGlUnpWSH2TkuV3zb-i-A94v6Srwm0Is8unUo07V3l9gnJwnfsyu9wFrFrsDhfy6dZV6YYpgip1T6kje50wYsh_Exv1NTpyBedGjZd8mBYXQGdG-tEzNm9yuMc2jvZ0aeJiu1uG_XN1t0mnwmkhhBeUWMjm50kz827kNbAASyTRZwpVU"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            FILOSOFI &amp; LANDMARK
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Kemegahan Rumah Gadang &amp; Filosofi Minang
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Rumah Gadang dengan atap melengkung tajam menyerupai tanduk kerbau (gonjong) melambangkan kemenangan luhur dan ketinggian derajat budi pekerti adat. Setiap jengkal dinding kayunya dihiasi ukiran floral bercat emas dan merah tua yang diukir penuh ketelitian tinggi. Keanggunan fisik ini selaras dengan falsafah hidup Minangkabau yang berlandaskan tatanan alam semesta dan keselarasan relasi manusia.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Adat Basandi Syarak, Syarak Basandi Kitabullah&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Landasan Utama Penyatuan Adat Minang nan Islami dan Selaras Alam
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Alam Semesta
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                &ldquo;Alam Takambang Jadi Guru&rdquo;—falsafah luhur menempatkan alam sebagai guru kebatinan sejati, mendasari kekayaan bumbu rempah mentah khas Minang.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kasta Tertinggi Hidup
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Perlindungan klan matrilineal berpusat pada rumah gadang, memperkokoh peran penting wanita (Bundo Kanduang) sebagai ratu kemegahan sejarah.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">SUMBAR</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                PUSAT ADAT MINANG
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Pusaka budaya legendaris Minangkabau kini terus hidup benderang dalam rajutan adat luhur, seni petuah, dan keagungan sajian kuliner berskala dunia.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. West Sumatra Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            MAHAKARYA BOGA BUKIT BARISAN
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Sumatera Barat
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati kelezatan rempah-rempah dataran tinggi Minang yang bergelora, diakui secara global sebagai puncak cita rasa yang melumerkan selera.
          </p>
        </div>

        {/* Bento Grid Layout - Custom styling matching other regions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Rendang Card (Featured - 7 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[0])}
            className="md:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-72 md:h-80 overflow-hidden">
              <img 
                alt="Rendang Daging Sapi Minangkabau" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">KASTA TERTINGGI BUMBU</span>
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

          {/* Sate Padang Card (5 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[1])}
            className="md:col-span-5 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                alt="Sate Padang Lidah Sapi Legendaris" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">ASIMILASI KARI KUNO</span>
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

          {/* Ayam Pop (6 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[2])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Ayam Pop Bukittinggi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[2].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-0.5 font-sans text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[2].rating} Rating
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4">
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">RESEP ISTIMEWA</span>
                <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">{dishes[2].name}</h5>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between gap-3">
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 md:line-clamp-3">{dishes[2].description}</p>
              <span className="text-primary font-sans text-[9px] tracking-widest font-bold uppercase flex items-center gap-1.5 mt-2">
                Lihat Resep <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Nasi Kapau (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[3])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Nasi Kapau Bukittinggi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[3].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-0.5 font-sans text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[3].rating} Rating
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4">
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">KULINER ASLI NAGARI</span>
                <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">{dishes[3].name}</h5>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between gap-3">
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 md:line-clamp-3">{dishes[3].description}</p>
              <span className="text-primary font-sans text-[9px] tracking-widest font-bold uppercase flex items-center gap-1.5 mt-2">
                Lihat Resep <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Teh Talua (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[4])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Teh Talua Minang" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={dishes[4].imageUrl} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-0.5 font-sans text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {dishes[4].rating} Rating
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-[#131311]/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4">
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">MINUMAN ADAT KHAS</span>
                <h5 className="font-serif text-lg text-on-surface font-bold group-hover:text-primary transition-colors mb-1">{dishes[4].name}</h5>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between gap-3">
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 md:line-clamp-3">{dishes[4].description}</p>
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
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">RESEP ASLI MINANGKABAU</span>
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
