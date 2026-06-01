import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PapuaDetailProps {
  onBack: () => void;
  onAskAI: (query: string) => void;
  onViewRecipe?: (recipe: any) => void;
}

interface Dish {
  name: string;
  rating: string;
  category: string;
  description: string;
  imageUrl: string;
  history: string;
  ingredients: string[];
  cookingSteps: string[];
}

export function PapuaDetail({ onBack, onAskAI, onViewRecipe }: PapuaDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);
  const [activeTab, setActiveTab] = useState<'recipe' | 'philosophy'>('recipe');
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Papua",
        imageUrl: dish.imageUrl,
        rating: dish.rating,
        description: dish.description,
        history: dish.history,
        ingredients: dish.ingredients,
        cookingSteps: dish.cookingSteps
      });
    }
  };

  const PapuaIcons = [
    {
      id: "cendrawasih",
      name: "Burung Cendrawasih",
      tagline: "The Bird of Paradise",
      desc: "Simbol kemewahan alam, keindahan surgawi, dan maskot kehormatan sakral adat masyarakat Papua.",
      svgPath: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.62-.515-8.127-1.458" />
        </svg>
      )
    },
    {
      id: "tifa",
      name: "Tifa Papua",
      tagline: "Genggaman Jiwa Seni",
      desc: "Alat musik perkusi pukul pemersatu adat setempat yang mengiringi senandungan doa, tawa kegembiraan, dan ritual tumpah darah.",
      svgPath: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      id: "honai",
      name: "Rumah Honai",
      tagline: "Poros Suku Pegunungan",
      desc: "Rumah beratap jerami melingkar kokoh tanpa jendela yang melestarikan rasa hangat keluarga dan ketahanan hidup di dataran tinggi dingin.",
      svgPath: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L20.25 13.5m-16.5 0h16.5m-16.5 0v6.75A2.25 2.25 0 006 22.5h12a2.25 2.25 0 002.25-2.25V13.5m-10.5-6v15" />
        </svg>
      )
    },
    {
      id: "asmat",
      name: "Ukiran Kayu Asmat",
      tagline: "Simbol Penghubung Leluhur",
      desc: "Mahakarya seni ukir magis bernilai mistis tinggi sebagai bentuk penghormatan sakral terhadap arwah leluhur suku pesisir.",
      svgPath: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" />
        </svg>
      )
    }
  ];

  const dishes: Dish[] = [
    {
      name: "Papeda & Ikan Kuah Kuning",
      rating: "4.9",
      category: "Makanan Utama",
      description: "Paduan kelembutan bubur pati sagu murni hangat yang kenyal transparan dengan kuah kakap kuning segar gurih yang sarat rempah kunyit tua dan aroma harum daun kemangi hutan.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQwLv1J3l2tnMuOvnXcntYTv6tVoQq001M1EHEEXfvv5Nx46YgZOd1EqMS4e9J4YGyNzXkq00iaNXK5wPPjri25yMkhwxjU2XELmnS9OaeOTQMUTJ3-qDQezInTRzmzDqiIW2TlffCcTMDGi95CO4dK5XQXooorBr8PRIxsPQBWRfHOwQeuD7KvJGCrv5qJjuNzqnQbcV-q2Wnn1QlQuPpB-J0wmU1LFZqfjL_3_pCdERxiMXCSvGwlw07smRzX3FLnJ1fpmwhVjo",
      history: "Sagu merupakan representasi spiritual dari 'Ibu Bumi' bagi masyarakat adat Papua. Teknik mengolah sagu basah menjadi Papeda berlendir kenyal hangat melambangkan kedaulatan pangan lokal yang telah menjaga keselamatan marga dari kelaparan selama ribuan tahun lamanya.",
      ingredients: [
        "250g Tepung Sagu basah murni (tanpa fermentasi)",
        "1 liter Air putih pegunungan mendidih",
        "500g Kepala dan badan Ikan Kakap Merah segar tangkapan",
        "4 batang Serai memarkan, 3 lembar Daun jeruk purut",
        "1 genggam Daun kemangi segar pegunungan",
        "Bumbu halus kuning: 10 Bawang merah, 5 Bawang putih, 4cm Kunyit bakar murni, 3cm Jahe rimba, 4 butir Kemiri sangrai, Garam laut murni."
      ],
      cookingSteps: [
        "Papeda: Larutkan tepung sagu murni dengan 150ml air mineral dingin dalam sebuah wadah gerabah kayu (helai) tebal.",
        "Siram bertahap larutan sagu dingin tersebut dengan 850ml air mendidih murni sambil diaduk sangat cepat searah jarum jam hingga adonan berubah transparan kenyal mulus berlendir.",
        "Kuah Kuning: Tumis bumbu halus kuning bersama serai memarkan dan daun jeruk purut hingga menebar aroma segar kunyit sejati.",
        "Tuang air hangat secukupnya, didihkan kuah bumbu di atas kompor hingga meletup.",
        "Masukkan potongan ikan kakap merah segar laut. Masak dengan api terkontrol hingga serat ikan melembut matang gurih, lalu matikan api langsung setelah memasukkan kemangi rimba."
      ]
    },
    {
      name: "Ikan Bakar Manokwari",
      rating: "4.8",
      category: "Sajian Laut",
      description: "Ikan tongkol atau kuwe segar pesisir Papua yang dibakar murni tanpa bumbu kecap manis, disajikan istimewa dengan lumuran sambal kasar bawang merah mentah dan cabai rawit pedas menggetarkan lidah.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
      history: "Sajian khas pesisir Teluk Cendrawasih Papua Barat, khususnya Manokwari. Hidangan ini dinikmati turun-temurun oleh suku Arfak sebagai representasi kesederhanaan boga bahari yang mengandalkan kemurnian rasa manis asli ikan segar hasil laut.",
      ingredients: [
        "1 ekor Ikan Kakap atau Tongkol besar segar",
        "2 sdm Air perasan jeruk nipis alami",
        "1 sdt Garam laut kasar",
        "Bahan Sambal Ulek Gence: 15 butir Bawang merah kecil iris kasar, 12 Cabai rawit merah segar pegunungan, 1 sendok makan minyak kelapa tanusan matang, Garam secukupnya."
      ],
      cookingSteps: [
        "Kerat-kerat vertikal kedua sisi kulit ikan, lalu lumuri merata dengan jeruk nipis dan garam kasar. Istirahatkan selama 15 menit agar meresap.",
        "Siapkan arang kelapa menyala merah merona. Bersihkan tatakan kawat panggang.",
        "Panggang ikan di atas bara arang tanpa bumbu olesan apa pun agar aroma arang berpadu dengan gurih manis alami lemak ikan.",
        "Tumbuk kasar cabai rawit merah dan bawang merah mentah di atas cobek batu besar. Tuang sedikit minyak kelapa panas hangat.",
        "Angkat ikan bakar kering bersolek debu arang garing tersebut, letakkan di talam kayu, lalu balur merata dengan siraman sambal ulek bawang kasar mentah pedas manis."
      ]
    },
    {
      name: "Sate Ulat Sagu Barapen",
      rating: "4.8",
      category: "Kearifan Hutan",
      description: "Protein hewani terbaik dan paling bergizi dari jantung pohon sagu busuk di pedalaman. Dibakar dengan rapi di atas arang batok, menyemburkan tekstur lumer (juicy) manis gurih mentega alami.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8tTIq3K7LVnut3OJtc8QKKLRX7K6cxB5mkRKeaiP8eZGCJczypGG3_qWBcO-6kFTPM1Z5u5tkheeAJ9-fjaetvWR4Fd-zmem3C5N0Eg-AOI--Fck8vaXGnWadYNo1_aBCYCXb5LKSgRrZfmwxT2jcqiG53iqEx_n2TJxG3FEgVzguRncw6Rcs2wJZ34NKyu0p0eshQZCHWH2tu5gXGgnI4rZakgVjYx3L3d0qZ9TE1iOke7ETkn5IcpI_i4dd7S26PaC9Ax604hI",
      history: "Suku Kamoro dan suku Kombai di pedalaman rimbun Papua mengagungkan ulat sagu sebagai sumber suplemen energi alami murni dari hutan bapak moyang. Protein bebas kolesterol jahat ini hanya diambil secukupnya dari sisa pembabatan hutan sagu lestari.",
      ingredients: [
        "20 butir Ulat Sagu segar ukuran gembung sehat",
        "Garam laut secukupnya",
        "Tusuk bambu tipis lembut rindang",
        "Pelepah pisang atau daun jati penutup panggang"
      ],
      cookingSteps: [
        "Cuci bersih ulat sagu segar hasil panen rawa pohon sagu lapuk.",
        "Tusukkan berderet rapi pada tusuk bambu secara melintang.",
        "Lumuri setitik garam laut kering murni di permukaan kulitnya.",
        "Panggang sate ulat sagu di atas arang kayu hutan kecil. Balik berkala hingga permukaannya garing keemasan kecokelatan mengeluarkan cairan lemak minyak kelapa harum alami.",
        "Sajikan garing lumer selagi hangat sebagai pemicu stamina tubuh yang luar biasa."
      ]
    },
    {
      name: "Udang Selingkuh Sentani",
      rating: "4.8",
      category: "Air Tawar",
      description: "Udang galah air tawar endemik dengan capit kokoh menyerupai kepiting (sehingga dijuluki 'selingkuh' oleh warga setempat) yang ditumis lumer bumbu mentega lada hitam.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqtNY5WznNwpdiguBbzdegozXFa0fCbU1ailWsOZn8g8VusRseYiO6ZS7xDLLrOqkkEMVFOcuNriG2hWtrEnlH_r3PJmEaue0V1XdRrPn3HFyc2GebA62Nrw0_7MRrcyphSWI6b6DSL3zLkTi3Sbp-XBBfIjNMehFuWzAVyTWI2yf9EqeURh1x1iuA1GDzJGcCkTWr5eb9XMWzqja9-evPSGmrb2fAVYKEeiHyfRBNjGLTYFg6zaRcojC2fmsvh9_qTdU_vAzDN0c",
      history: "Udang ajaib ini hidup subur di perairan tawar Danau Sentani, Jayapura, dan kawasan gletser dingin Lembah Baliem. Dinamakan selingkuh karena keunikan fisik kawin silang fiktif antara tubuh tebal udang galah dan kekuatan sepasang capit besi kepiting.",
      ingredients: [
        "500g Udang Selingkuh segar (atau udang galah capit biru)",
        "3 sdm Mentega padat murni",
        "1/2 butir Bawang bombay iris tipis",
        "3 siung Bawang putih cincang halus",
        "2 sdm Saus tiram, 2 sdm Kecap manis hitam kental",
        "1 sdt Merica lada hitam ulek kasar, 1 sdm asam Jawa encer."
      ],
      cookingSteps: [
        "Cuci bersih udang galah sentani, buang sungutnya, kerat bagian punggung sedikit.",
        "Tumis bawang putih cincang dan bawang bombay dengan mentega cair meleleh sampai wangi layu.",
        "Masukkan udang selingkuh utuh, masak hingga capit dan kulit berubah warna jingga merah marun garing mekar meliuk.",
        "Tambahkan saus tiram, lada hitam tumbuk kasar, kecap manis hitam kental, garam, dan perasan air asam Jawa hangat.",
        "Masak dengan api melenting sedang hingga bumbu terserap mengering membalut rata permukaan cangkang capit udang. Sajikan panas mendayu."
      ]
    },
    {
      name: "Kue Lontar Papua",
      rating: "4.9",
      category: "Kudapan Manis",
      description: "Pai susu legendaris khas bumi Papua yang bercangkang renyah garing dengan isian custard telur susu murni yang sangat lembut, legit, lumer, dan manis memanjakan jiwa.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAysc2rOprmo-VJtHB_0IcXchSPYAn-vAdGn9E4Bp1pNuNj06aBlmgczrvs7kmBWeKRyURCprtZQqNh9uX5aqkOchiHm5R6GEetnL0kZsfLt_lw5qJQEWHeT6hIpp8VXVqHRUJ3i9bexrs_MYYy1mdjIQL7QnkmuWVc7D_umW-5SLSpUU_3BIB_h1xSkekPAKAOI7lxXW-H09uA2C6SEQyLHxBYDp5K_9gR5vbYeXYsqf_g7JGOgFphsmtxxseXPK3AjuySbAMH-BA",
      history: "Kue Lontar lahir dari jejak peninggalan pendudukan kolonial Belanda di timur Indonesia abad lampau (awalnya bernama 'Rondo' atau 'Lontart' yang mengadopsi rupa 'milktert' kue susu Belanda). Diolah penuh keramahtamahan lokal menggunakan wadah piring berbahan keramik khusus bermotif ikan atau daun.",
      ingredients: [
        "Cangkang (Kulit): 150g Tepung terigu protein sedang, 100g Mentega dingin beku, 1 butir Kuning telur, 1 sdm Gula es.",
        "Custard Isian (Susu): 5 butir Kuning telur bebek/ayam berkualitas, 1/2 kaleng Susu kental manis putih, 250ml Air hangat kuku, 1 sdt Ekstrak vanili murni."
      ],
      cookingSteps: [
        "Buat Adonan Cangkang: Aduk tepung terigu dengan mentega beku parut kasar menggunakan garpu dingin hingga membentuk remah-remah.",
        "Masukkan kuning telur dan gula es, bulatkan padat lalu gilas bundar tipis setebal 0.5cm.",
        "Letakkan adonan kulit pai lurus di atas piring lontar keramik bermotif tradisional yang telah dioles margarin, tekan-tekan rapi pinggirannya.",
        "Buat Custard Isian: Campur rata kuning telur, susu kental manis, air hangat, vanili murni. Saring adonan isi minimal 3 kali agar mulus mulus tanpa gelembung udara.",
        "Tuangkan adonan susu ke dalam piring cangkang pai, lalu panggang dalam oven api kecil bersuhu 140 derajat Celcius selama 60-70 menit hingga adonan isi memadat set lumer kenyal custard."
      ]
    }
  ];

  const handleAskAIChef = (dish: Dish, topic: string) => {
    let query = "";
    if (topic === "veg") {
      query = `Halo Chef, bagaimana cara menyiasati hidangan tradisional khas Papua "${dish.name}" agar ramah bagi seorang vegetarian tanpa menghilangkan aroma dan esensi laut atau rempah autentiknya?`;
    } else if (topic === "spices") {
      query = `Halo Chef, tolong jelaskan rincian rahasia bumbu bumbu pusaka "${dish.name}" khas Papua. Bagaimana teknik mengolah bahan sagu dan ikan segar agar rasanya bisa begitu merasuk ke dalam serat terdalam?`;
    } else {
      query = `Bagaimana rahasia penyajian terbaik hidangan "${dish.name}" khas Papua agar cita rasanya sama indahnya seperti masakan rumahan autentik di perkampungan raja ampat?`;
    }
    onAskAI(query);
  };

  return (
    <div className="bg-pattern min-h-screen py-10 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 text-on-surface">
      {/* Back navigation button */}
      <motion.button 
        id="back-to-gallery-papua"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="self-start flex items-center gap-2 text-primary hover:text-primary-fixed font-sans text-xs tracking-widest font-bold uppercase cursor-pointer py-2 px-4 border border-primary/20 hover:border-primary/50 bg-[#131311]/60 backdrop-blur rounded"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Kembali ke Galeri
      </motion.button>

      {/* 1. Stunning Papua Landscape Hero Section */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Papua Pristine Raja Ampat Misty Landscape" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc7rOxEyENw4Mp1pqjKq3yT-i3Iwyb7o7fnCf3kmXCbWPklCfEZmbsty_NzP93PLk8umyNW0XVBcmv55H8hC5FpGBKX53RO2rxBwic2Vdf2VyYEf87xMWXi4ylydnC3RESdEOKYrEqVIHYL7_WqUxLuZEa18tDCfzksJdYCjdp1oy2iG8YVKX1R81bwB6JBgyPm7b5H9HXaR-dBnYA4t40641jEguzRUdHGQRXi0DCejOnxOEjDPwvYXiP8gkwTjhNGVuOmhRQNDI"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl animate-fade-in">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold text-shadow">
            TIMUR INDONESIA &bull; SURGA KATULISTIWA
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Papua: Bumi Cendrawasih
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed text-shadow-sm">
            Terselimuti misteri dan kemegahan alam liar purba. Dari rimbunnya belantara rawa sagu raksasa, puncak salju abadi Mandala Jayawijaya, hingga simfoni terumbu karang laut perawan Raja Ampat yang tersohor di pelukan samudera dunia.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. PAPUAN ICONOGRAPHY SYSTEM (Gambar Ikon Papua) */}
      <section className="flex flex-col gap-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-1">
            SIMBOL WARISAN LESTARI
          </span>
          <h3 className="font-serif text-3xl text-on-surface font-bold tracking-tight">
            Ikon Tradisional Tanah Pusaka
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Sorotan empat elemen visual utama tradisi luhur Papua yang melukiskan jembatan spiritual, kemandirian adat, dan kecintaan dalam merayakan indahnya alam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PapuaIcons.map((icon) => (
            <motion.div
              key={icon.id}
              whileHover={{ y: -6, borderColor: 'var(--color-primary)' }}
              onHoverStart={() => setHoveredIcon(icon.id)}
              onHoverEnd={() => setHoveredIcon(null)}
              className="bg-surface-container-low/40 p-6 rounded-xl border border-primary/10 hover:bg-surface-container-low/80 transition-all duration-300 flex flex-col items-center text-center gap-4 relative group"
            >
              <div className="w-20 h-20 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary">
                {icon.svgPath}
              </div>
              <div>
                <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold text-primary block mb-1">
                  {icon.tagline}
                </span>
                <h4 className="font-serif text-lg text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {icon.name}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant/80 leading-relaxed text-center">
                  {icon.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 3. HISTORICAL SECTION (Historial & Filosofi Adat) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low/50">
          <img 
            alt="Warga Papua Tradisional Hutan Sagu" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.75]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9qkSPxYoQy2snMpq1Y_-NWpw2r7T5UaML7PXVn97pFWeTFNxWojMkNtGFvx9d78z9x46C34EgU0o2KIdBBRUXzcp3mWF2NNWE-OX-0roNnD7utx-1aAf9Y-4-v0v9V9U2fRK9K8_shsbA4ueGPLPjxfTqBmwIcN8sIkUXULsNogt_kPdzOJICBKRtQ_Aut5qHMEDA6aC9D8Z6tKt8kAYeUcY1iX1juWygEqiAbhnc_-rIuYNGaOzXrtYB6SundqZshHTcjozJw0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/60 via-transparent to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            FILOSOFI, RASA, &amp; SEJARAH PURBA
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Kisah Hidup Adat Bakar Batu &amp; Sagu
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Sejarah boga Papua berjalan selaras dengan kebiasaan berburu dan meramu yang menghormati kemurnian hutan. Bagi masyarakat adat Papua Barat dan Pegunungan Tengah, hutan kelapa sagu dan tanah ulayat adalah lambang seorang rahim ibu. Pembagian makanan seimbang murni bersumber dari apa yang alam tawarkan hari itu.
          </p>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Salah satu ritus bersejarah paling suci adalah <strong>Bakar Batu (Barapen)</strong>. Bukan sekadar teknik memasak dengan batuan pegunungan panas berpanggang alang-alang, upacara akbar ini melambangkan rekonsiliasi sengketa antar klan suku, penebusan sumpah damai, pernikahan adat agung, serta rasa terima kasih tak tepermanai terhadap hasil bumi pertiwi.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/95 border-l-2 border-primary pl-6 py-1 my-2 leading-relaxed">
            &ldquo;Hutan adalah mama kandung kami yang tak pernah berhenti memberi air susu berupa kelopak sagu dan mengalirkan aliran jernih sungai tawar Sentani.&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Falsafah Ketahanan Pangan Adat Papua
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kedaulatan Sagu Ekologis
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Hutan rawa sagu liar Papua merupakan benteng penyerap karbon organik tertinggi di Asia Pasifik secara ekologis dunia, menjadikannya pilar pangan berkelanjutan paling ramah iklim.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Solidaritas Barapen
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Segala bentuk hewan, umbi-umbian hias, keladi liar, dimasukkan merata ke dalam lapisan jerami untuk dicicipi bersama oleh niniak-mamak, kerabat adat, maupun sanak desa tanpa kasta sepeser pun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 4. MASAKAN KHAS PAPUA (Traditional Dishes Bento Grid) */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            RESEP KULINER TIMUR
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Pusaka Khas Papua
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Klik pada salah satu hidangan di bawah ini untuk melihat takaran bumbu autentik, langkah pembuatan tradisional, cerita sejarah adat, serta panduan bantuan AI koki kami.
          </p>
        </div>

        {/* Bento Grid Layout - 5 dishes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {dishes.map((dish, idx) => {
            let gridColClass = "md:col-span-6";
            if (idx === 0) gridColClass = "md:col-span-8";
            else if (idx === 1) gridColClass = "md:col-span-4";
            else if (idx === 2) gridColClass = "md:col-span-4";
            else if (idx === 3) gridColClass = "md:col-span-4";
            else if (idx === 4) gridColClass = "md:col-span-4";

            return (
              <motion.div
                key={dish.name}
                onClick={() => {
                  setSelectedDish(dish);
                  setActiveTab('recipe');
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`${gridColClass} group relative rounded-xl overflow-hidden cursor-pointer border border-primary/15 hover:border-primary/40 transition-colors shadow-lg bg-surface-container-low h-[380px]`}
              >
                <img 
                  alt={dish.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" 
                  src={dish.imageUrl} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-[#000000]/40 to-[#000000]/10"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-primary/20 backdrop-blur-md border border-primary/40 px-2.5 py-1 rounded text-primary flex items-center gap-1 font-sans text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[10px] font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span>{dish.rating}</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-on-surface flex items-center gap-1 font-sans text-[9px] font-bold">
                    <span>{dish.category}</span>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-primary/80 mb-1.5 font-bold uppercase block">
                    KULINER TRADISIONAL PAPUA
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {dish.name}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed line-clamp-2 max-w-xl group-hover:text-on-surface transition-colors duration-300">
                    {dish.description}
                  </p>
                  
                  <div className="flex items-center gap-1.5 mt-4 text-[9px] sm:text-[10px] font-bold tracking-wider text-primary uppercase">
                    <span>Lihat Resep &amp; Kisah Adat</span>
                    <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 5. SPICES AND GEOGRAPHY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            RASA PENYOKONG REMPAH
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Esensi Rempah Tanah Papua
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Rasa autentik sajian timur fajar lahir dari pemanfaatan komoditi tanaman lokal alami yang tumbuh liar di lereng-lereng teduh pegunungan, lembah sungai, serta pinggiran hutan hujan tropis basah:
          </p>
          
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-4 p-4 rounded-xl border border-primary/10 bg-surface-container-low/40 hover:bg-surface-container-low/75 transition-colors">
              <div className="w-10 h-10 shrink-0 rounded-full border border-primary/25 bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div>
                <h4 className="font-sans text-xs text-primary font-bold tracking-wide uppercase mb-1">
                  Kunyit Tua Merauke
                </h4>
                <p className="font-sans text-xs text-on-surface-variant/80 leading-relaxed text-justify">
                  Rimpang ruji kunyit tua berwarna oranye kemerahan menyala melimpah zat kurkumin alami, ragi warna utama penyaji Ikan Kuah Kuning.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl border border-primary/10 bg-surface-container-low/40 hover:bg-surface-container-low/75 transition-colors">
              <div className="w-10 h-10 shrink-0 rounded-full border border-primary/25 bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div>
                <h4 className="font-sans text-xs text-primary font-bold tracking-wide uppercase mb-1">
                  Jahe Pegunungan Papua
                </h4>
                <p className="font-sans text-xs text-on-surface-variant/80 leading-relaxed text-justify">
                  Jahe liar pedas menyengat yang melunakkan serat bau amis olahan ikan kakap pesisir teluk Mansinam peninggalan purba.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl border border-primary/10 bg-surface-container-low/40 hover:bg-surface-container-low/75 transition-colors">
              <div className="w-10 h-10 shrink-0 rounded-full border border-primary/25 bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div>
                <h4 className="font-sans text-xs text-primary font-bold tracking-wide uppercase mb-1">
                  Kemangi Hutan Lebar
                </h4>
                <p className="font-sans text-xs text-on-surface-variant/80 leading-relaxed text-justify">
                  Dedaunan herba berhelai lebar wangi mint citrus tanah pegunungan basah penyubur aroma murni sepiring kuah sup ikan kuning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low/50">
          <img 
            alt="Danau Sentani Landscape" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJvgVf2kyBQsWip8tEZvAQREscacUsbNYgfEQS3WqIpyGjZ13pTo2Nj-PJNtzbyAcxXV8VI0W6MncivrB96PujL49jV98r_daG4sJQUEfvgdpDCn39yc4rs_IZgmJtKlv4nKjiHaEpZ_XA6R7PSw8tjvh9ZF1TZC7o3BMjCpz48PQcsJ28I2oC7xVn3KkOc_g-EA2Xi20B7xever52mP0dfnMzrCLSnCjSC2-JmZXBuSlmHondVMRf8i6AwvM7SVKME3Jy99wL-P0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13110e]/60 to-transparent"></div>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 6. ARTS & SITE ATTRACTIONS AREA */}
      <section className="bg-surface-container-low/50 border border-primary/15 rounded-2xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <span className="font-sans text-xs tracking-[0.25em] font-bold text-primary uppercase block">
            PANGGUNG TRADISI &amp; GERAK JIWA
          </span>
          <h4 className="font-serif text-2xl md:text-3xl font-bold text-on-surface">
            Tari Yospan Kegembiraan
          </h4>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant/90 leading-relaxed text-justify">
            Tarian persahabatan rakyat Papua Barat yang mengekspresikan sukaria pertemanan tanpa sekat suku. Dikombinasikan dengan detak gerak kaki meloncat kencang seirama ketukan dawai gitar kentrung ganda dan tabuhan perkusi tifa bambu.
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center border-t md:border-t-0 md:border-l border-primary/10 pt-6 md:pt-0 md:pl-10">
          <span className="font-sans text-xs tracking-[0.25em] font-bold text-primary uppercase block">
            POROS ALAM SANUBARI
          </span>
          <h4 className="font-serif text-2xl md:text-3xl font-bold text-on-surface">
            Danau Sentani Jayapura
          </h4>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant/90 leading-relaxed text-justify">
            Danau vulkanik luas legendaris berketinggian rimbun di lereng suaka alam Gunung Cycloop Jayapura. Menjadi sumbu budidaya udang selingkuh air tawar serta rumah panggung kayu lestari suku adat pesisir danau.
          </p>
        </div>
      </section>

      {/* 7. MODAL UNTUK INTERAKSI DETAIL MAKANAN */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0e0c]/95 overflow-y-auto backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4 }}
              className="relative bg-surface border border-primary/20 w-full max-w-5xl rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(233,193,118,0.15)] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 z-55 w-10 h-10 rounded-full bg-surface-lowest/80 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95 cursor-pointer"
                aria-label="Tutup Detail"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Left Column: Image */}
              <div className="md:col-span-5 relative bg-[#13110e] flex flex-col h-full min-h-[300px] md:min-h-0 md:max-h-[90vh]">
                <div className="relative h-full w-full">
                  <img 
                    className="w-full h-full object-cover absolute inset-0" 
                    src={selectedDish.imageUrl} 
                    alt={selectedDish.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13110e]/40 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded">
                    <span className="font-sans text-[10px] tracking-widest font-extrabold text-primary uppercase">
                      RESEP TRADISIONAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Recipe tabs */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col overflow-y-auto md:max-h-[85vh]" style={{ scrollbarWidth: 'thin' }}>
                <div className="mb-6">
                  <span className="font-sans text-[11px] tracking-widest font-bold text-primary uppercase">
                    KULINER TRADISIONAL PAPUA
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
                    {selectedDish.name}
                  </h2>
                </div>

                {/* Tabs button */}
                <div className="flex border-b border-primary/15 gap-6 mb-6 font-sans text-xs tracking-widest font-bold">
                  <button 
                    onClick={() => setActiveTab('recipe')}
                    className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === 'recipe' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/60 hover:text-primary'}`}
                  >
                    RESEP & BAHAN
                  </button>
                  <button 
                    onClick={() => setActiveTab('philosophy')}
                    className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === 'philosophy' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/60 hover:text-primary'}`}
                  >
                    NILAI HISTORIS
                  </button>
                </div>

                {/* Tab content */}
                <div className="flex-grow">
                  {activeTab === 'recipe' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <h4 className="font-serif text-sm text-primary font-bold tracking-wide mb-3">
                          Bahan-Bahan Esensial
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {selectedDish.ingredients.map((ing) => (
                            <li 
                              key={ing}
                              className="font-sans text-xs text-on-surface-variant leading-relaxed flex items-start gap-2.5 py-1"
                            >
                              <span className="material-symbols-outlined text-primary text-xs mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                                done
                              </span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-primary/10 pt-5">
                        <h4 className="font-serif text-sm text-primary font-bold tracking-wide mb-4">
                          Langkah Pembuatan Tradisional
                        </h4>
                        <ol className="flex flex-col gap-4">
                          {selectedDish.cookingSteps.map((step, sIdx) => (
                            <li 
                              key={sIdx}
                              className="font-sans text-xs text-on-surface-variant leading-relaxed flex gap-4 items-start"
                            >
                              <span className="w-5 h-5 rounded-full border border-primary/35 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span className="text-justify">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'philosophy' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <h4 className="font-serif text-sm text-primary font-bold tracking-wide mb-1">
                        Kisah Asimilasi &amp; Penilaian Adat
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify">
                        {selectedDish.history}
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant/80 border-l border-primary/25 pl-4 py-1 italic text-justify">
                        Sebagai warisan takbenda timur nusantara, proses merebus, mengasap, maupun mendinginkan sajian ini melukiskan rukun dan kepedulian bersama warga perkampungan adat Papua.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
