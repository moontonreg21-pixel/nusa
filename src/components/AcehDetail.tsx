import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AcehDetailProps {
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

export function AcehDetail({ onBack, onViewRecipe }: AcehDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Aceh",
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
      name: "Mie Aceh Special",
      rating: "4.9",
      description: "Simfoni rempah dalam balutan mie kuning tebal basah dengan kuah kari kental berempah tajam khas tanah Rencong, disuguhkan berpasangan dengan kepiting, udang windu segar, atau irisan daging sapi empuk melumer di lidah dng emping melinjo renyah.",
      imageUrl: "/regions/aceh-mie-aceh.jpg",
      history: "Mie Aceh merupakan cerminan akulturasi asimilasi budaya sejarah pelabuhan niaga strategis Selat Malaka di masa lampau. Kuah kari berempah tebal melambangkan pengaruh boga India, pemakaian mi kuning tebal dipengaruhi boga Tionghoa, serta lauk pauk kambing/sapi merepresentasikan pengaruh cita rasa Timur Tengah.",
      ingredients: [
        "400g Mi kuning basah tebal (mie kuning Aceh)",
        "150g Daging sapi has atau udang segar kupas",
        "750ml Air kaldu sapi hangat berkualitas tinggi",
        "50g Kol segar iris tipis, 50g Taoge segar muda",
        "2 sdm Kecap manis kental, 1 sdm Kecap asin",
        "2 batang Daun bawang iris kasar, 2 tangkai Seledri rajang halus",
        "Bumbu halus kering: 6 Cabai merah keriting, 5 Bawang merah, 3 Bawang putih, 1 sdt Ketumbar bubuk, 1/2 sdt Jinten sangrai, 3 butir Kapulaga, 2cm Kunyit bakar, 1 sdt Garam laut."
      ],
      cookingSteps: [
        "Panaskan sedikit minyak goreng kelapa dalam wajan tebal. Tumis bumbu halus kering hingga mengeluarkan minyak aromatik harum semerbak.",
        "Masukkan potongan daging sapi atau udang windu, tumis merata hingga warna daging berubah kecokelatan.",
        "Tuangkan air kaldu sapi hangat perlahan, didihkan dng api sedang hingga daging empuk sari menyerap.",
        "Tambahkan irisan kol, taoge segar, kecap manis kental, kecap asin, serta sebagian rajangan daun bawang. Masak sebentar saja.",
        "Masukkan mie Aceh kuning tebal basah. Aduk konstan merata dengan api sedang tinggi hingga mi menyerap sari kuah kari kental pekat.",
        "Sajikan panas-panas beralas daun pisang bersama taburan bawang merah goreng garing, kerupuk emping melinjo, dan acar asam bawang cabai rawit hijau."
      ]
    },
    {
      name: "Sate Matang",
      rating: "4.8",
      description: "Sate daging sapi atau kambing berlemak muda empuk khas kota Matang Glumpang Dua, dimarinasi dng ketumbar dan serai, garing panggang arang kelapa, disuguhkan berpasangan dng saus kacang cokelat kental manis-gurih serta semangkuk soto kuah kaldu sapi hangat beraroma pekat kapulaga.",
      imageUrl: "/regions/aceh-sate-matang.jpeg",
      history: "Sate Matang legendaris ini mulai berkembang luas sejak dekade 1970-an di daerah Bireuen. Kombinasi sate kering harum disandingkan dng kuah kaldu soto berempah kental menggambarkan sifat ketangguhan tekad serta ketulusan hangat persaudaraan masyarakat Aceh menyambut kerabat jauh.",
      ingredients: [
        "500g Daging sapi has dalam atau kambing muda, potong dadu",
        "100g Lemak sapi/kambing muda gurih (pemberian aroma juicy)",
        "Bumbu halus marinasi: 1 sdm Ketumbar sangrai, 1 batang Serai cincang bagian putih, 4 Bawang merah, 3 Bawang putih, 2cm Jahe parut halus, 1 sdm Gula kelapa, Garam.",
        "Saus Kacang: 150g Kacang tanah goreng haluskan ulek, 1 sdm Gula aren, air kaldu rempah.",
        "Kuah Soto Pendamping: Air rebusan tulang sapi mendidih diisi kapulaga, cengkeh pepak, serai memarkan, kayu manis."
      ],
      cookingSteps: [
        "Aduk potongan daging sapi dan lemak dalam lumatan bumbu halus marinasi dan santan kental selama 40 menit di dalam lemari es hingga serat melembut.",
        "Tusukkan potongan daging dan lemak silih berganti pada tusuk bambu tebal.",
        "Bakar sate di atas bara api kering arang batok kelapa hangat sembari disapu sisa bumbu marinasi hingga karamel cokelat matang berkilau harum.",
        "Saus Kacang: Tumis kacang giling bersama gula aren, garam laut, dan sedikit sisa air kaldu rempah sapi hingga pecah minyak cokelat kekuningan.",
        "Sajikan sate panas mengepul disiram saus kacang gurih pekat bersama semangkuk soto kuah sapi hangat yang kaya rempah tajam."
      ]
    },
    {
      name: "Ayam Tangkap",
      rating: "4.8",
      description: "Ayam kampung muda gurih empuk yang dipotong kecil garing, dimarinasi bumbu ketumbar jinten kunyit matang, lalu digoreng garing renyah bersama tumpukan royal daun temuru (daun kari), helai daun pandan wangi, dan irisan cabai hijau pedas yang menghasilkan wewangian alam herba yang eksotis.",
      imageUrl: "/regions/aceh-ayam-tangkap.jpg",
      history: "Ayam Tangkap menggambarkan kearifan suku Aceh pesisir yang rimbun dng tanaman herba penyembuh alami khasiat hutan. Daun temuru (salam koja) dipercaya melancarkan pembuluh darah dan membuang angin, berpadu dng daging ayam garing untuk bekal prajurit perang Sultan Samudra Pasai.",
      ingredients: [
        "1 ekor Ayam kampung muda empuk, bersihkan lalu potong kecil 4cm (bekakak)",
        "20 lembar Daun temuru (daun kari/salam koja) utuh segar",
        "6 lembar Daun pandan wangi, potong menyerong 2cm",
        "4 buah Cabai hijau lokal utuh",
        "Bumbu ungkep marinasi: 8 Bawang merah parut kasar, 4 Bawang putih parut, 2cm Kunyit bakar, 1 sdm Ketumbar bubuk murni, 1 sdt Garam laut, air asam jeruk nipis."
      ],
      cookingSteps: [
        "Lumuri ayam kampung muda dng air jeruk nipis. Uleni dng bumbu ungkep marinasi halus hingga rata menutup serat kulit ayam, diamkan 30 menit.",
        "Panaskan minyak kelapa melimpah dalam wajan bermassa berat (deep frying) hingga benar-benar bersuhu panas tinggi.",
        "Goreng ayam kampung ungkep tersebut dalam rendaman minyak panas sampai setengah matang garing.",
        "Sesaat sebelum ayam diangkat mematang, sebar helai daun temuru, potongan daun pandan wangi, dan cabai hijau utuh langsung ke minyak mendidih bersama ayam.",
        "Goreng berkelanjutan hingga dedaunan wangi berubah garing crispy hijau transparan kecokelatan halus, serta kulit ayam matang cokelat emas renyah.",
        "Angkat seluruh komponen secara serentak dng saringan, tiriskan minyaknya, sajikan hangat dng timbunan garing dedaunan wangi herba di atasnya."
      ]
    },
    {
      name: "Kuah Pliek U",
      rating: "4.7",
      description: "Sup sayur sayuran pegunungan yang sangat kaya rasa rempah, terbuat dari paduan buah melinjo, kacang panjang, labu air, buah rimbang dng kucuran santan dan Pliek U (ampas kelapa fermentasi sisa perasan minyak kelapa murni) yang mendatangkan aroma pekat gurih asam unik bergizi tanah rencong.",
      imageUrl: "/regions/aceh-kuah-pliek-u.jpg",
      history: "Kuah Pliek U merupakan mahakarya kuliner adat yang menjadi lambang kekompakan masyarakat agraris Aceh. Pengolahan kelapa fermentasi berhari-hari (Pliek U) adalah bentuk pelestarian pangan tanpa sisa, merepresentasikan rasa syukur luhur mendalam atas kerimbunan hasil bumi nusa Serambi Mekkah.",
      ingredients: [
        "100g Pliek U murni kualitas prima, ulek halus peras air hangat",
        "150ml Santan kelapa kental segar",
        "50g Buah melinjo muda, 50g Buat daun melinjo segar",
        "50g Kacang panjang potong, 1 buah Terong hijau bulat iris tipis",
        "Bumbu halus kuah: 8 Cabai merah keriting, 6 Bawang merah, 3 Bawang putih, 2cm Jahe parut, 2cm Kunyit dibakar, 1 batang Serai memarkan, 2 lembar Daun jeruk purut."
      ],
      cookingSteps: [
        "Rendam gilingan Pliek U dalam segelas air hangat, saring saripatinya dng kain bersih, ambil cairannya dan buang ampas berserat kasarnya.",
        "Didihkan air saripati Pliek U dan kuah santan kelapa dalam panci bersama bumbu halus kuning, serai memarkan, dan daun jeruk purut.",
        "Masukkan bahan sayuran bertekstur keras: buah melinjo muda dan terong hijau, rebus pelan hingga melembut separuh matang.",
        "Tambahkan bahan sayuran hijau daun melinjo segar dan potongan kacang panjang, bumbui garam murni.",
        "Didihkan bumbu kuah Pliek U di atas api lilin terkecil hingga seluruh serat sayur layu matang menyerap pekatnya rasa kelapa fermentasi purba asri."
      ]
    },
    {
      name: "Timphan",
      rating: "4.8",
      description: "Kudapan kue basah tradisional bertekstur legit kenyal, terbuat dari adonan tepung ketan putih dicampur labu tanah kuning lumat manis, diberi isian srikaya telur kelapa wangi pandan adat, dibungkus melingkar daun pisang muda berminyak lalu dikukus semerbak wangi.",
      imageUrl: "/regions/aceh-timphan.jpg",
      history: "Kue Timphan menempati status adat wajib pelengkap kemeriahan hari raya suci Idul Fitri maupun Idul Adha di Aceh. Terdapat ungkapan cinta rakyat Aceh: 'Uroe goet Buluen goet Timphan ma peugoet' yang berarti Hari baik, Bulan baik, Timphan buatan ibu menyambut kedatangan sanak saudara seiman.",
      ingredients: [
        "250g Tepung ketan putih premium murni",
        "150g Labu kuning (atau pisang raja), kukus empuk lalu haluskan lumat panas",
        "3 sdm Santan kelapa kental hangat",
        "Isi Srikaya: 2 kuning telur kocok, 100g Gula aren, 100ml Santan kental, daun pandan simpul wangi",
        "Daun pisang muda sikat bersih (pembungkus prima), olesan minyak kelapa tipis."
      ],
      cookingSteps: [
        "Isi Srikaya: Rebus kocokan kuning telur, santan kental, gula aren bubuk dan daun pandan wangi dng api kecil tim sambil diaduk konstan hingga mengental padat berbutir legit srikaya, dinginkan.",
        "Uleni tepung ketan murni bersama labu kuning kukus lumat dan siraman santan kelapa kental hangat perlahan hingga adonan halus kalis lentur elastis tidak menempel wadah.",
        "Rentangkan selembar daun pisang muda segar, sapukan minyak kelapa tipis.",
        "Ambil segenggam kecil adonan ketan labu, hamparkan pipih tipis di atas daun pisang.",
        "Sendokkan pasta srikaya manis ke tengah, gulung cubit daun pisang membungkus silinder rapi kencang.",
        "Susun kue timphan di panci kukusan, kukus di atas uap air mendidih tinggi selama 20-25 menit hingga aroma wangi daun pisang muda menguap manis matang."
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

      {/* 1. Aceh Hero Section with Baiturrahman Grand Mosque */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img 
          alt="Baiturrahman Grand Mosque Banda Aceh" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]" 
          src="/regions/aceh-baiturrahman-aerial.jpg" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            SERAMBI MEKKAH &bull; SEGARA UTAMA
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Aceh Exploration
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Menelusuri perbatasan nusantara di mana pesona spiritualtas kubah Baiturrahman berpadu agung dengan keanggunan kepulauan hijau, serta nikmatnya aroma seduhan bubuk rempah pusaka melintasi abad sejarah dunia.
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Baiturrahman Mosque & Acehnese History */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img 
            alt="The majestic structure of Baiturrahman Grand Mosque" 
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8] contrast-[1.1]" 
            src="/regions/aceh-baiturrahman-sunset.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/50 to-transparent"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SEJARAH &amp; PERADABAN ISLAMI
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Menelusuri Histori Baiturrahman Grand Mosque
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Masjid Raya Baiturrahman didirikan pertama kali oleh Sultan Iskandar Muda pada tahun 1612. Bangunan agung ini dng megah memadukan arsitektur kolonial Mughal India, kubah hitam pekat khas Kesultanan Turki Utsmani, serta keindahan pelataran marmer putih luas laksana Madinah. Berdiri tegap menghadapi cobaan tsunami dahsyat abad lalu, monumen legendaris ini adalah simbol mutlak kekuatan rohani, keluhuran peradaban, dan kehormatan abadi rakyat Serambi Mekkah.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Adat Bak Po Teumeureuhom, Hukom Bak Syiah Kuala&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Falsafah Luhur Harmonisasi Antara Hukum Syariat dan Adat Istiadat Suku Aceh
            </span>
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kearifan Kedai Gayo
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Ritual menuang kopi saring (kopi khop) melambangkan musyawarah bersahaja, memadukan cita rasa pekat biji kopi arabika Gayo dng keakraban sapa batin boga.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Penghormatan Ranup
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Tari meuseukat dan persembahan daun sirih (ranup lampuan) mencerminkan ketulusan mulia menyambut tamu kasta agung yang menapaki bumi tanah rencong.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">1612</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                TAHUN PELETAKAN BATU
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Baiturrahman Grand Mosque Banda Aceh kini berdiri megah memancarkan kedaulatan, pusat spiritualitas, dan mercusuar pusaka kebudayaan Aceh yang agung mendunia.
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
            WARISAN RASA TANAH RENCONG
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Aceh
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati kelezatan rempah-rempah yang tajam berani, kesegaran dedaunan temuru garing, serta paduan manis legitnya kue srikaya timphan yang legendaris.
          </p>
        </div>

        {/* Bento Grid Layout - Custom styling matching other regions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Mie Aceh Card (Featured - 7 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[0])}
            className="md:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-72 md:h-80 overflow-hidden">
              <img 
                alt="Mie Aceh Special Curry" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">KARI REMPAH PEKAT</span>
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

          {/* Sate Matang Card (5 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[1])}
            className="md:col-span-5 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                alt="Sate Matang Soto Sapi" 
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
                <span className="font-sans text-[10px] tracking-widest text-primary uppercase font-bold">KOMBINASI GOURMET</span>
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

          {/* Ayam Tangkap (6 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[2])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Ayam Tangkap Garing Rempah" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">AROMATIK HERBAL</span>
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

          {/* Kuah Pliek U (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[3])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Kuah Pliek U Aceh" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">KARYA FERMENTASI</span>
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

          {/* Timphan (4 Cols width) */}
          <div 
            onClick={() => setSelectedDish(dishes[4])}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low/30 border border-primary/5 hover:border-primary/25 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                alt="Timphan Labu Srikaya" 
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
                <span className="font-sans text-[9px] tracking-widest text-primary uppercase font-bold">JAJANAN HARI RAYA</span>
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
                <span className="font-sans text-[9px] tracking-widest font-bold text-primary uppercase">RESEP ASLI MEKKAH BARU</span>
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
                        <span className="text-primary text-[10px] mt-1 select-none">âœ¦</span>
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

