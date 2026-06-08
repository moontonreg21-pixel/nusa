import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SulawesiSelatanDetailProps {
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

export function SulawesiSelatanDetail({ onBack, onViewRecipe }: SulawesiSelatanDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Sulawesi Selatan",
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
      name: "Coto Makassar",
      rating: "4.9",
      description: "Sajian sup legendaris khas Kerajaan Gowa abad ke-16, terdiri dari irisan daging sapi sandung lamur dan jeroan empuk gurih dimasak lama dalam siraman kaldu air tajin pekat bercampur lumatan gilingan kacang tanah goreng melimpah dng 40 rempah herba nusantara.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
      history: "Coto Makassar lahir bergengsi dari dapur istana luhur Kerajaan Gowa pada abad ke-16. Berdasarkan silsilah adat, daging sapi has murni disajikan eksklusif bagi keluarga bangsawan istana, sedangkan bagian usus, paru, babat diolah kreatif bersahaja dng air tajin dan kacang tanah gurih berkalori tinggi bagi prajurit perang tangguh pengembara laut Phinisi.",
      ingredients: [
        "500g Daging sapi sandung lamur murni empuk",
        "500g Jeroan sapi (babat, paru, usus) yang direbus matang halus",
        "2 liter Air tajin (air cucian beras putih organik kedua)",
        "200g Kacang tanah kupas kulit, goreng kering jenuh lalu haluskan blender",
        "4 batang Serai memarkan ikat simpul",
        "3cm Lengkuas memarkan, 2 lembar Daun salam, 2cm Jahe",
        "Bumbu halus wangi: 10 Bawang merah, 6 Bawang putih, 1 sdm Ketumbar sangrai, 1 sdt Jinten sangrai, 1 sdt Merica putih butiran, 1/2 sdt Pala bubuk murni, Garam kasar."
      ],
      cookingSteps: [
        "Rebus daging sapi dan jeroan terpisah di air tajin berlimpah bersama serai, lengkuas memarkan, jahe kasar dan daun salam daun hingga melunak empuk.",
        "Angkat daging dan jeroan yang telah empuk, tiriskan lalu potong-potong berbentuk dadu kecil elok khas sajian coto Makassar.",
        "Tumis racikan bumbu halus wangi dng sesendok minyak kelapa murni hingga matang kering berwarna kuning-cokelat kecokelatan.",
        "Tuangkan bumbu kuning tumis dan gilingan kacang tanah halus ke dalam panci kuah kaldu air tajin selagi mendidih bergelembung hangat. Aduk memutar konstan agar menyatu kental tebal emulsi.",
        "Tata potongan daging sapi dan jeroan dadu di mangkuk kecil, siram dng kuah kaldu kacang coto pekat mendidih.",
        "Sajikan hangat bersama taburan daun bawang iris, seledri, bawang merah goreng, air perasan jeruk nipis masam, ketupat daun kelapa (Buras) dan sambal tauco pedas Makassar."
      ]
    },
    {
      name: "Sop Konro",
      rating: "4.9",
      description: "Sop iga sapi potong tebal berukuran raksasa yang direbus perlahan sangat empuk, disuguhkan berdampingan dng siraman kuah cokelat hitam pekat legendaris beraroma herba dari buah kluwek, ketumbar sangrai, sereh, kayu manis, dan cengkih kering saring.",
      imageUrl: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600",
      history: "Sop Konro berakar dari tradisi luhur perayaan potong kerbau liar suku Bugis-Makassar pegunungan di masa lampau. Awalnya dihidangkan menyajikan iga miring sapi/kerbau (konro) utuh raksasa di atas nampan adat bambu, melambangkan keperkasaan spiritual, ketangguhan fisik dan sambutan mulia menjamu tetua klan.",
      ingredients: [
        "1kg Iga sapi berdaging tebal (tulang konro lebar potongan melintang)",
        "2 liter Air kaldu sapi rebusan murni tangguh",
        "3 buah Kluwek tua grade premium (ambil isinya, rendam air hangat pekat)",
        "2 batang Serai memarkan bagian putihnya, 3cm Lengkuas memarkan",
        "2 butir Cengkih asli Maluku, 2cm Kayu manis pekat aromatik",
        "Bumbu halus coklat hitam: 8 Bawang merah, 4 Bawang putih, 1 sdm Ketumbar bubuk sangrai, 1/2 sdt Pala bubuk, 1 sdt Merica putih butiran, Garam."
      ],
      cookingSteps: [
        "Rebus potongan besar iga sapi dalam panci berisi air murni melimpah bersama serai memarkan, lengkuas memarkan hingga daging melembut melumer lepas dari tulang iganya.",
        "Haluskan bumbu halus coklat bersama daging buah kluwek seduh hangat hingga menyerupai pasta hitam.",
        "Tumis pasta bumbu kluwek tersebut dng minyak kelapa wangi hingga harum pekat kering.",
        "Tuang bumbu kluwek tumisan ke rebusan sisa kaldu iga sapi mendidih di panci. Masukkan butiran cengkih dan kayu manis beraroma manis hangat.",
        "Rebus pelan dng api kompor kecil sedang (simmering) selama 30 menit hingga pigmen kuah hitam kluwek mengkaramelisasi serat luar iga sapi.",
        "Angkat iga sapi beserta siraman kuah hitam tebal, taburi bawang merah goreng garing dan sajikan mendampingi buras hangat."
      ]
    },
    {
      name: "Pallubasa",
      rating: "4.8",
      description: "Sajian boga sup jeroan dan daging sapi empuk khas Makassar, berkuah cokelat pekat gurih berkat limpahan aroma rempah ketumbar dan kelapa parut tua yang disangrai kering giling halus (alas) pecah minyak alami.",
      imageUrl: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=600",
      history: "Meskipun sekilas berpenampilan mirip Coto, Pallubasa terlahir dng latar belakang budaya yang kontras. Pallubasa ('palu' berarti basah/kuah, 'basa' berarti berkuah tebal) dahulu merupakan boga bergizi tinggi terjangkau yang diciptakan para pekerja pelabuhan niaga pesisir Makassar (Paotere) peneman nasi hangat sehabis mengangkut barang.",
      ingredients: [
        "500g Daging sapi has atau daging kelapa sapi, potong dadu tipis",
        "1 liter Air rebusan kaldu sapi pekat kaya murni",
        "5 sdm Kelapa parut tua segar, sangrai wajan tanpa minyak hingga hitam kecokelatan lalu tumbuk halus berlemak minyak (alas)",
        "2 batang Serai memarkan, 1cm Jahe dikepruk lebar",
        "Bumbu halus coklat kayu manis: 8 Bawang merah, 4 Bawang putih, 1 sdm Ketumbar sangrai, 1/2 sdt Jinten, 1/2 sdt Pala bubuk, 3 Cabai merah keriting, Garam murni."
      ],
      cookingSteps: [
        "Rebus potongan daging sapi dalam air kaldu murni hingga serat empuk melembut.",
        "Sangrai parutan kelapa tua di wajan datar logam besi di atas api sedang rendah hingga berubah warna kecokelatan gelap garing menyerbak kelapa parut bakar aromatik.",
        "Ulek tumbuk kelapa sangrai garing selagi hangat sampai berserat halus semi-cair berminyak pekat (disebut Alas oleh warga Makassar asli).",
        "Tumis bumbu halus coklat bersama serai memarkan hingga matang kering harum.",
        "Tuangkan tumisan bumbu harum coklat dan pasta kelapa sangrai alas ke dalam air kaldu rebusan daging sapi mendidih, aduk kencang agar menyerap kental gurih pekat.",
        "Sajikan hangat dalam mangkuk porselen, tambahkan kuning telur bebek/ayam mentah (opsional pendamping Alas) langsung di atas kuah mengepul panas."
      ]
    },
    {
      name: "Es Pisang Ijo",
      rating: "4.8",
      description: "Sajian kudapan pencuci mulut menyegarkan terbuat dari pisang raja manis dibalut balutan adonan tepung beras ketan berwarna hijau pandan suji harum alami, disajikan bersisian dng bubur sumsum putih gurih santan, serutan es pasir murni dan siraman sirup merah DHT legendaris.",
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&q=80&w=600",
      history: "Es Pisang Ijo melambangkan keteduhan jiwa, kelapangan dada, dan kerukunan bersahaja hidup rakyat utama suku Bugis-Makassar. Balutan kulit sutera hijau melambangkan ketulusan hati yang subur menyambut fajar kehidupan baru dng berkah rohani keindahan cita rasa alami.",
      ingredients: [
        "6 buah Pisang raja tua manis kukus matang bersama kulitnya",
        "150g Tepung beras premium lembap, 50g Tepung ketan putih",
        "300ml Air perasan daun suji segar dan pandan wangi (pewarna hijau alam asli)",
        "Bubur Sumsum Sutera: 100g Tepung beras halus, 500ml Santan kelapa sedang murni, daun pandan simpul, sdt Garam.",
        "Es batu parut blender halus, sirup merah DHT khas makassar (manis pisang ambon)."
      ],
      cookingSteps: [
        "Kukus pisang raja utuh beserta kulitnya sampai matang empuk, diamkan dingin lalu kupas kulit pisangnya bersih.",
        "Kulit Hijau: Aduk tepung beras, tepung ketan, sejumput garam halus dan air suji pandan hijau wangi segar. Kukus adonan kulit selama 15 menit sampai liat elastis matang.",
        "Ambil segumpal kecil adonan kulit hijau, pipihkan melebar tipis di atas lembaran plastik yang diolesi minyak kelapa tipis.",
        "Letakkan pisang raja kukus di tengahnya, balut gulung hijau menutup rapat bentuk pisang raja lonjong sempurna.",
        "Kukus pisang hijau tersebut selama 15 menit hingga mengeras kokoh, dinginkan lalu potong menyerong cantik berketebalan 2cm.",
        "Bubur Sumsum: Masak tepung beras dalam santan kelapa sedang, pandan wangi daun di atas api kecil lilin, aduk cepat konstan memutar sampai didih licin meletup empuk.",
        "Sajikan potongan pisang ijo melingkar di atas mangkuk piring, tambahkan bubur sumsum putih lembut bersanding es serut salju pasir, siram melimpah dng sirup merah DHT manis pisang segar."
      ]
    },
    {
      name: "Ikan Bakar Parape",
      rating: "4.8",
      description: "Ikan laut kakap merah segar gemuk yang dibakar harum di atas bara arang kayu batok kelapa kering, disuguhkan berpasangan dng lumatan saus Parape karamel hitam kental manis-asam gurih dari paduan bawang merah giling tebal, perasan asam Jawa pekat, dan gula kelapa bakar.",
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
      history: "Bumbu bawang karamel Parape merupakan salah satu pilar bumbu kharisma utama (Base Parape) yang diciptakan para nelayan Bugis pelaut samudera. Karakter rasanya yang manis-asam hangat melambangkan perlindungan batin kelapangan keluarga di kala kapal Phinisi berlabuh teduh merayakan hasil tangkapan laut murni.",
      ingredients: [
        "1 ekor Ikan Kakap merah atau Baronang segar grade prima seberat 700g, belah punggung melebar",
        "1 sdm Air jeruk nipis murni (pembersih sisa hanyir laut)",
        "Saus Parape: 15 Bawang merah parut kasar giling tebal, 4 siung Bawang putih pedas, 2 sdm Gula kelapa aren sisir, 2 sdm Air asam Jawa kental pekat, 1 sdm Kecap manis hitam kental berkualitas, Garam murni."
      ],
      cookingSteps: [
        "Bersihkan belah punggung ikan kakap murni agar bumbu meresap seimbang. Baluri air perasan jeruk nipis segar murni dan garam laut diamkan 15 menit.",
        "Saus Parape: Tumis gilingan parut kasar bawang merah melimpah bersama bawang putih parut dalam minyak hangat kelapa hingga layu harum menguning kaku kental.",
        "Tambahkan gula aren sisir pekat, air asam Jawa kental pekat, kecap manis hitam dan garam murni. Masak pelan hingga meletup mengental cokelat kehitaman berkilau karamel aromatik.",
        "Bakar ikan kakap di atas panggangan bara kayu kelapa kering sampai putih mengeras beraroma smokey arang keliling.",
        "Sesaat sebelum ikan matang diangkat, sapukan kuas tebal seluruh permukaan belahan ikan dng saus bawang karamel Parape, balik panggang kilat 1 menit hingga saus berkaramel membungkus kulit daging ikan.",
        "Angkat sajikan di nampan kayu beralas daun pisang bersama sambal tomat mentah rawit segar."
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

      {/* 1. South Sulawesi Hero Section with Fort Rotterdam Sunset */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Fort Rotterdam sunset Makassar Sulawesi Selatan" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            BUMI BUGIS - MAKASSAR &bull; NUSA PHINISI
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Sulawesi Selatan Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Menyelami kegagahan sejarah maritim tanah Phinisi Bugis-Makassar, menatapi keindahan panorama senja pesisir Fort Rotterdam Makassar, dan merasakan kemegahan bumbu sup pelaut legendaris Indonesia berskala dunia.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Fort Rotterdam & Phinisi Spirit */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img 
            alt="The structural majesty of Fort Rotterdam" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SEJARAH &amp; kedaulatan laut
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Warisan Fort Rotterdam &amp; Kedaulatan Phinisi
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Fort Rotterdam atau Benteng Ujung Pandang didirikan oleh Raja Gowa Masak ke-9 pada tahun 1545. Berbentuk menyerupai penyu yang merangkak menuju lautan bebas, situs agung ini menyimpan sejuta sejarah kedaulatan militer maritim, perlindungan takhta, dan saksi kesepakatan dagang lintas benua. Semangat pantang menyerah para pelaut tangguh suku Bugis-Makassar dng kapal kayu Phinisi yang mengarungi separuh belahan bumi kini terabadikan luhur di balik dinginnya dinding karang peninggalan purba bersejarah Makassar.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Siri' Na Pacce&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Falsafah Mutlak Menjaga Harga Diri, Kedaulatan, dan Solidaritas Persaudaraan Suku Bugis-Makassar
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Maritim Phinisi
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Kapal pusaka Phinisi dirakit tanpa semen paku logam, cerminan kemurnian ilmu logika geometri luhur nan menyatu dng tatanan ombak air pesisir.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Adat Keramahan Kajang
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Kesahajaan bercermin pada pakaian serba hitam adat Kajang sekilas menyatu dng hutan adat batin, mendasari kemurnian pengolahan rempah mentah boga.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">1545</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                TAHUN DIDIRIKAN BENTENG
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Kedaulatan budaya Phinisi maritim Sulawesi Selatan kini terus hidup berkilau dalam pelestarian pusaka kapal kayu, falsafah Siri' na Pacce, dan nikmatnya kuliner laut nusantara.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. South Sulawesi Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            MAHAKARYA BOGA DINASTI GOWA
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Sulawesi Selatan
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati aroma tebal kentalnya sup kacang sapi Coto, Sop Konro Iga sapi raksasa kluwek, manis dinginnya bubur pisang ijo, serta ikan bakar saus karamel Parape.
          </p>
        </div>

        {/* Bento Grid Layout - Custom styling matching other regions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Coto Makassar Card (Featured - 7 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[0])}
            className="md:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-72 md:h-80 overflow-hidden">
              <img 
                alt="Coto Makassar Daging Sapi" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">PUSAKAN AGUNG ISTANA</span>
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

          {/* Sop Konro Card (5 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[1])}
            className="md:col-span-5 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                alt="Sop Konro Sapi" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">IGA RAKSASA KLOWEK</span>
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

          {/* Pallubasa (6 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[2])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Pallubasa Alas Makassar" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">KELAPA SANGRAI TUMBUK</span>
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

          {/* Es Pisang Ijo (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[3])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Es Pisang Ijo" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">SUTERA PANDAN SEGAR</span>
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

          {/* Ikan Bakar Parape (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[4])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Ikan Bakar Parape" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">KARAMEL BAWANG MERAH</span>
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
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">RESEP ASLI BUGIS-MAKASSAR</span>
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
