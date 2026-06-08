import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MalukuDetailProps {
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

export function MalukuDetail({ onBack, onViewRecipe }: MalukuDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Maluku",
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
      name: "Ikan Kuah Pala Banda",
      rating: "4.9",
      description: "Sajian boga laut segar kakap putih dalam siraman kuah asam-pedas segar aromatik, dimasak dng keunikan parutan buah pala segar asli kepulauan Banda, cengkih harum, serai wangi memarkan, dan rajangan lengkuas saring.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEH0s2j9W9SKeCaPu4TG2vtiIutjkH8UtKV0l75scVwMps0fQDkKNu80ZVX4FdREYbgokWShn8RZccQNrj3-7JtGqAm_97Md463-dr_R1AYnTUH__z39SKIpcrB2L2cDqPUA5UqQV216H89q3qMFVW2v_sKqhAq740VfenYnWIpI9w0nwQ_ZwHdRMXlSWduEZoejXD4AqYCIQPdIS958RWjj2YfSLZDbplRd-P1KSRrye9EPYrUJMPF8nSdWmlUmZEyNIl_6ykXN4",
      history: "Kepulauan Banda di Maluku sempat diguncangkan oleh perebutan jalur perdagangan maritim dunia oleh kolonial Eropa karena buah pala Banda bernilai setara emas murni di abad pertengahan. Kuliner legendaris ini memadukan kesegaran kakap laut tangkapan nelayan Banda dng keharuman magis buah pala segar dan cengkih, melambangkan kemewahan cita rasa pusaka nusa rempah nusantara.",
      ingredients: [
        "600g Ikan kakap putih segar (atau ikan baronang), bersihkan potong tebal",
        "2 buah Pala Banda segar, belah ambil daging buahnya dan iris tipis sekali",
        "5 kuntum Cengkeh kering asli kepulauan Banda",
        "1 liter Air kaldu boga laut murni",
        "2 batang Serai memarkan, 3cm Lengkuas memarkan, 2cm Kunyit dibakar murni",
        "Bumbu halus merah: 8 Bawang merah, 4 Bawang putih, 4 Cabai merah keriting, 2cm Jahe segar, 1 sdt Garam murni."
      ],
      cookingSteps: [
        "Lumuri belahan ikan kakap dng air perasan jeruk lemon cina segar dan garam laut selama 15 menit agar sisa aroma hanyir air laut lenyap.",
        "Tumis bumbu halus merah bersama serai memarkan, lengkuas memarkan, dan kunyit bakar di minyak kelapa hangat hingga harum pekat menguap kering.",
        "Tuangkan air kaldu boga laut murni ke dalam tumisan bumbu, aduk rata lalu didihkan dng api sedang.",
        "Masukkan potongan tipis daging buah pala Banda segar serta kuntum cengkeh kering aromatik Banda langsung ke dalam kuah mendidih tajam.",
        "Masukkan potongan ikan kakap putih segar ke kuah mendidih, kecilkan api kompor agar daging ikan matang lembut koloid dng sari pala terserap sempurna.",
        "Sajikan Ikan Kuah Pala Banda panas menguap bersama sepiring nasi hangat di atas pincuk daun pisang."
      ]
    },
    {
      name: "Papeda & Ikan Kuah Kuning",
      rating: "4.8",
      description: "Sagu mentah murni dng air mendidih membentuk gumpalan bening kenyal transparan (papeda), disajikan serentak bersama siraman kuah kuning ikan tuna segar yang kaya akan jahe, serai, daun kemangi hutan wangi dan jeruk lemon cina kasturi.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQwLv1J3l2tnMuOvnXcntYTv6tVoQq001M1EHEEXfvv5Nx46YgZOd1EqMS4e9J4YGyNzXkq00iaNXK5wPPjri25yMkhwxjU2XELmnS9OaeOTQMUTJ3-qDQezInTRzmzDqiIW2TlffCcTMDGi95CO4dK5XQXooorBr8PRIxsPQBWRfHOwQeuD7KvJGCrv5qJjuNzqnQbcV-q2Wnn1QlQuPpB-J0wmU1LFZqfjL_3_pCdERxiMXCSvGwlw07smRzX3FLnJ1fpmwhVjo",
      history: "Sagu merupakan representasi mutlak dari sendi ketahanan pangan, jiwa adat, dan kebersamaan peradaban seluruh suku Maluku. Hidangan Papeda yang dikosumsi bersama menggunakan sepasang garpu bambu 'gata-gata' melambangkan perdamaian klan adat, disandingkan kuah ikan kuning hangat sebagai ekspresi luhur rasa syukur atas kedaulatan laut biru melimpah.",
      ingredients: [
        "250g Tepung Sagu murni Ambon/Maluku basah",
        "1000ml Air murni yang baru mendidih tinggi",
        "500g Daging Ikan tuna merah segar Ambon potong dadu tebal lebar",
        "1 sdm Air perasan lemon cina kasturi",
        "1 genggam Daun kemangi hutan wangi segar",
        "Bumbu halus kuning kunyit: 8 Bawang merah, 4 Bawang putih, 3 butir Kemiri sangrai, 3cm Kunyit dibakar murni, 2cm Jahe dikepruk halus, Garam."
      ],
      cookingSteps: [
        "Larutkan tepung sagu murni dng segelas air suhu ruang dalam piring gaba-gaba tradisional Ambon.",
        "Siram larutan sagu bertahap dng air yang benar-benar mendidih meletup sambil diputar adem konstan searah jarum jam hingga warna berganti dari putih keruh menjadi bening mengilat kenyal kental, dinginkan.",
        "Ikan Kuah Kuning: Tumis bumbu halus kuning bersama sereh dan jahe memarkan hingga harum kuning menguap segar.",
        "Tuang air kaldu boga laut secukupnya, didihkan kuah bumbu kuning tersebut.",
        "Masukkan potongan daging ikan tuna segar Ambon, kecilkan api kompor masak 15 menit. Masukkan pucuk daun kemangi hutan dan perasan lemon cina sesaat sebelum matang diangkat.",
        "Gulung Papeda menggunakan stik kayu basah, letakkan di piring dng guyuran kuah ikan kuning hangat bersama daging ikan tuna empuk gurih."
      ]
    },
    {
      name: "Gohu Ikan (Indonesian Sashimi)",
      rating: "4.9",
      description: "Sajian kuliner ikan tuna merah mentah khas Ternate Maluku, dipotong dadu kecil bersih, dilumuri perasan air lemon cina segar jeruk kasturi, garam laut kasar, tuangan minyak kelapa murni panas berasap, taburan cacahan kacang kenari Maluku panggang garing.",
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
      history: "Gohu Ikan terkenal luas di penjuru samudera sebagai sashimi legendaris autentik Indonesia dari tanah Maluku Utara. Terlahir dari kemurnian samudra Maluku yang dipenuhi tuna merah segar liar. Menyuguhkan tuna mentah segar beraroma lemon cina lumat kacang kenari melambangkan keselarasan ekosistem laut, kesehatan alami serta kebebasan murni para pelaut adat kepulauan.",
      ingredients: [
        "300g Daging ikan Tuna merah segar murni berpotongan dadu sasimi kecil",
        "2 sdm Air perasan jeruk lemon cina kasturi orisinil",
        "2 siung Bawang merah iris sangat tipis halus",
        "3 buah Cabai rawit merah lokal, rajang kecil melingkar",
        "3 sdm Minyak kelapa murni (VCO) yang dipanaskan tinggi",
        "2 sdm Kacang kenari Maluku kupas panggang garing lalu rajang kasar garing, daun kemangi segar pucuk."
      ],
      cookingSteps: [
        "Letakkan irisan kotak dadu ikan tuna merah segar lap bersih di wadah kayu, bungkus dng es serut agar beku segar alami.",
        "Kucuri air jeruk lemon cina segar dan garam laut murni di atas potongan tuna mentah tersebut. Aduk merata lalu diamkan 5 menit hingga warna tuna berubah merah keputihan pucat (proses pasturisasi asam alami).",
        "Taburkan rajangan bawang merah kupas halus, irisan cabai rawit merah pedas, dan pucuk daun kemangi segar di atas tuna.",
        "Panaskan minyak kelapa murni dalam sendok sayur besi hingga mendesis panas berasap tipis.",
        "Tuangkan minyak kelapa panas mendayung langsung di atas tumpukan bawang merah kemangi agar mengeluarkan uap harum wangi menyatu dng daging ikan tuna.",
        "Taburkan rajangan garing kacang kenari panggang gurih, aduk melingkar merata dan sajikan segar dingin."
      ]
    },
    {
      name: "Nasi Kelapa Ambon",
      rating: "4.7",
      description: "Nasi gurih aromatik Ambon Maluku, diaron bersama santan kelapa tua murni dng air kelapa muda manis, disuguhkan berpasangan dng limpahan bumbu kelapa sangrai ulek pedas gurih serta sisa taburan ikan teri asin garing.",
      imageUrl: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=600",
      history: "Nasi Kelapa Ambon merupakan akulturasi tradisi kuliner Ambon yang dikitari oleh hutan nyiur pohon kelapa subur melambai menatap luasnya batas samudera. Sajian ini melambangkan kesuburan hasil bumi, serta kehangatan batin para mama Ambon menjaga nyala pusaka api keluarga tetap menyala.",
      ingredients: [
        "400g Beras pulen segar aromatik, cuci bersih tiriskan kering",
        "200ml Santan kelapa kental tua murni",
        "200ml Air kelapa muda manis orisinil",
        "2 lembar Daun salam, 1 batang Serai memarkan, Kaldu saringan garam laut.",
        "Lauk: kelapa setengah tua parut disangrai dng ulekan cabai rawit bawang aromatik merah bersanding ikan teri putih garing asin."
      ],
      cookingSteps: [
        "Rebus santan kental, air kelapa muda manis, garam laut murni, daun salam, serta serai memarkan hingga mendidih harum di kuali besi.",
        "Masukkan beras pulen, aron (masak sambil diaduk perlahan kencang) hingga seluruh cairan kelapa terabsorsi sempurna ke gembung butir beras.",
        "Susun nasi aron beraroma kelapa tersebut dalam dandang kukusan mendidih beralas daun pisang.",
        "Kukus di uap air membubung panas selama 30 menit hingga tanak matang pulen gurih.",
        "Sajikan di atas piring anyaman bambu beralas daun pisang murni bersama topping kelapa parut pedas sangrai harum serta taburan ikan teri garing asin beras."
      ]
    },
    {
      name: "Halua Kenari",
      rating: "4.8",
      description: "Jajanan manis legendaris pusaka Maluku, terbuat dari parutan tebal kacang kenari segar hutan Banda dibalut lumatan saus karamel gula aren Ambon yang kenyal, garing renyah dan ditaburi butiran wijen putih wangi.",
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&q=80&w=600",
      history: "Pohon Kenari merupakan pohon purba raksasa pelindung utama rimbunnya perkebunan pala di kepulauan Banda Maluku sejak masa prasejarah kuno. Halua Kenari hadir sebagai simbol manisnya tali persaudaraan Bugis-Maluku sejati, disuguhkan di sela piring keramik menjamu silahturahmi kerabat saat panen agung buah pala.",
      ingredients: [
        "250g Kacang kenari Maluku kupas, sangrai garing garing kecokelatan potong kasar",
        "150g Gula aren merah pekat murni Ambon (sisir gumpal tebal coklat)",
        "50ml Air murni, sejumput Garam kasar laut, 1 sdm Wijen putih sangrai wangi."
      ],
      cookingSteps: [
        "Sangrai biji kacang kenari kupas di wajan pelan dng api kompor kecil sedang sampai harum kuning kecokelatan kaku garing kering.",
        "Masak gula aren sisir merah pekat dng air dan sejumput garam murni di wajan tebal hingga mendidih larut bergelembung tebal mengental meregang benang gula lengket.",
        "Masukkan parutan kacang kenari panggang garing kasar ke dalam kuali karamel gula aren pekat secara serentak cepat, aduk mengunci merata.",
        "Tuang adonan karamel kenari dng cepat selagi panas ke atas lembaran loyang datar beralas plastik tahan panas pekat berminyak tipis.",
        "Ratakan dng ketebalan 1.5cm, taburi taburan biji wijen putih sangrai, potong persegi 4x4cm selagi adonan hangat agak lunak lentur, biarkan dingin padat mengeras garing kenyal renyah."
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

      {/* 1. Maluku Hero Section with Banda Neira Landscape */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Fort Belgica and Gunung Api Banda Neira Maluku" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEH0s2j9W9SKeCaPu4TG2vtiIutjkH8UtKV0l75scVwMps0fQDkKNu80ZVX4FdREYbgokWShn8RZccQNrj3-7JtGqAm_97Md463-dr_R1AYnTUH__z39SKIpcrB2L2cDqPUA5UqQV216H89q3qMFVW2v_sKqhAq740VfenYnWIpI9w0nwQ_ZwHdRMXlSWduEZoejXD4AqYCIQPdIS958RWjj2YfSLZDbplRd-P1KSRrye9EPYrUJMPF8nSdWmlUmZEyNIl_6ykXN4" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            KEPULAUAN REMPAH &bull; RATNA MUTU MANIKAM
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Maluku Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Menjelajahi pesisir teluk Banda Neira berlatar kegagahan Gunung Api laut biru jernih, mengagumi sisa benteng Belgica pertahanan takhta rempah dunia purba, serta merayakan kesegaran boga laut murni rasa pala Banda keemasan.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Fort Belgica & Spice Islands */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img 
            alt="The majestic design of Fort Belgica Banda Neira" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEH0s2j9W9SKeCaPu4TG2vtiIutjkH8UtKV0l75scVwMps0fQDkKNu80ZVX4FdREYbgokWShn8RZccQNrj3-7JtGqAm_97Md463-dr_R1AYnTUH__z39SKIpcrB2L2cDqPUA5UqQV216H89q3qMFVW2v_sKqhAq740VfenYnWIpI9w0nwQ_ZwHdRMXlSWduEZoejXD4AqYCIQPdIS958RWjj2YfSLZDbplRd-P1KSRrye9EPYrUJMPF8nSdWmlUmZEyNIl_6ykXN4"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SEJARAH BARISTA DUNIA &bull; BENTENG PUSAKA
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Kemegahan Fort Belgica &amp; Kejayaan Rempah Banda
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Fort Belgica didirikan oleh VOC Belanda di atas bukit kasta agung Banda Neira pada tahun 1611 di atas sisa benteng pertahanan Kerajaan Portugis. Benteng berbentuk segi lima Pentagon besar yg megah ini dirancang khusus mengawasi monopoli buah pala dan kelancaran pelayaran kapal layar niaga global ke seluruh penjuru Eropa dan Asia. Berdiri gagah menghadapi pasang laut biru Maluku, situs pusaka ini merupakan simbol kemewahan mutlak sejarah nusantara pemicu pelayaran penjelajahan samudera modern dunia.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Siwalima&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Prinsip Kebersamaan, Harmoni Adat, Swadaya Demokratis Rakyat Maluku Bersatu Padu
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Kenari Raksasa
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Asosiasi tumbuh rimbun pohon kenari tinggi menaungi bibit vegetasi kelembutan buah pala Banda, mewakili perlindungan agung seimbang alam raya.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Musik Tradisi Tifa
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Tari cakalele, tari saureka-reka dan ketukan kulit tifa Ambon wujud berkobarnya keberanian, kelembutan batin, kesenian luhur Maluku yang asri.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">1611</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                TAHUN BELGICA PECAH SEJARAH
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Kemegahan budaya Siwalima Maluku kini berputar berkemilau abadi di balik pelestarian pusaka pala Banda, tarian adat melek jati diri, dan gurih pedasnya kuliner Ambon.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. Maluku Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            KASTA BOGA SPICE ISLANDS MALUKU
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Maluku
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati cita karsa saringan kuah Pala Banda kering, kelembutan sagu Papeda, cita rasa Sashimi tuna herba Gohu Ikan, gurihnya Nasi Kelapa serta manis legitnya Halua Kenari.
          </p>
        </div>

        {/* Bento Grid Layout - Custom styling matching other regions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Ikan Kuah Pala Banda Card (Featured - 7 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[0])}
            className="md:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-72 md:h-80 overflow-hidden">
              <img 
                alt="Ikan Kuah Pala Banda" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">KASTA EMAS REMPAH</span>
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

          {/* Papeda & Ikan Kuah Kuning Card (5 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[1])}
            className="md:col-span-5 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                alt="Papeda Ikan Kuah Kuning" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">KEAGUNAN SAGU ALAM</span>
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

          {/* Gohu Ikan (6 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[2])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Gohu Ikan Tuna Mentah" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">SASHIMI INDONESIA</span>
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

          {/* Nasi Kelapa (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[3])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Nasi Kelapa Ambon" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">NASI GURIH NYIUR PESISIR</span>
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

          {/* Halua Kenari (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[4])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Halua Kenari Gula Aren" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">KENARI HUJAN AREN</span>
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
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">RESEP ASLI KEPULAUAN REMPAH</span>
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
