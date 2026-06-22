import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface KalimantanTimurDetailProps {
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

export function KalimantanTimurDetail({ onBack, onViewRecipe }: KalimantanTimurDetailProps) {
  const [selectedDish] = useState<Dish | null>(null);

  const setSelectedDish = (dish: Dish | null) => {
    if (dish && onViewRecipe) {
      onViewRecipe({
        name: dish.name,
        provinceName: "Kalimantan Timur",
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
      name: "Nasi Kuning Banjar Haruan Habang",
      rating: "4.7",
      description: "Nasi kuning wangi nan gurih beraroma pandan dan kunyit murni, disajikan mendampingi lauk Ikan Haruan (gabus rawa) Masak Habang—yaitu dimasak karamel lambat dalam racikan cabai merah kering manis bebas pedas khas pesisir Bumi Etam.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVB0qwD7bId6bMySmKuqiqa1oRZm6ZK_WU0KBjpDbRqMEqLnkQD9MAkTkRYvloCjBO1FGDgUiSBQsDfzCGA9MndGBIFMQgOJ0YyxzuLCgeHEWB98FqSwm21ytF3QnVX4gJ3tuP-1SKRFlspgoBm3SMzGiOPazSi_b6Fe-7FHz8cYqmSQ-w9vCrL_Hinr2_qHPwLPjiLb9WhkGuXS0FBNiafvkWWf7yVFRe3OsTsEbZsHwbf3CHzkYGrAgba5R-skXmUi0IkxHIgY0",
      history: "Nasi Kuning Banjar tumbuh berkembang menjadi denyut nadi sarapan wajib utama masyarakat Kalimantan Timur. Pemilihan Ikan Haruan (gabus rawa-rawa pedalaman Kalimantan) yang bertekstur kokoh tebal melambangkan kearifan boga sungai Kalimantan yang kaya mineral dan kalsium tinggi.",
      ingredients: [
        "500g Beras aromatik pilihan, cuci bersih tiriskan",
        "300ml Santan kelapa murni (sedang)",
        "4 sdm Air perasan kunyit tua segar",
        "2 batang Serai memarkan, 3 lembar Daun pandan wangi ikat simpul",
        "Lauk Habang: 4 potong tebal Ikan Haruan (gabus) atau tongkol tebal, goreng matang",
        "Bumbu Masak Habang: 10 Cabai merah kering (rebus dahulu, buang biji giling halus), 8 Bawang merah, 4 Bawang putih, 1.5 sdm Gula aren merah cokelat, Garam murni."
      ],
      cookingSteps: [
        "Didihkan santan kelapa sedang bersama air perasan kunyit tua, serai memarkan, daun pandan pandan wangi, dan garam laut.",
        "Masukkan beras aromatik ke kuah santan kuning mendidih, aron (masak sambil diaduk konstan) hingga cairan santan habis terbalut rata ke butiran beras.",
        "Kukus beras aron kuning harum tersebut dalam kukusan beras tradisional beralas daun pisang selama 30-35 menit hingga matang pulen tanak sempurna.",
        "Bumbu Habang: Blender halus cabai merah kering rebus yang lumat bersama bawang merah-putih. Tumis dalam minyak kelapa melimpah beserta gula aren merah serutan hingga bumbu mengeluarkan minyak mengkilap pekat.",
        "Masukkan potongan ikan gabus/tongkol goreng ke dalam lumatan saus habang pekat tersebut, didihkan dengan api lilin hingga saus menyelimuti tebal permukaan ikan secara dramatis."
      ]
    },
    {
      name: "Ayam Cincane",
      rating: "4.8",
      description: "Ayam kampung muda bakar pusaka khas Kerajaan Kutai Kartanegara. Daging ayam diungkep dengan rempah merah pekat bumbu kencur, jahe, dan terasi udang bakar, kemudian dipanggang di atas bara api kering hingga merona merah arang yang sangar beraroma smokey.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ZMUh_0h5W-zlJK6O_HuovoyyIRJQ18KHVqFsoXeNKpcsXzrxP8TMt7LDJGzrv4vlHcs3RufbJwAQJthJQ30V_k51wewGIeCsKNwwnWpXoDfeHGf8414T2hEb9kpyUeFgPKd4iK0ZRJX1Ka_sn1Q7qoEsbE41x4QxFfe-7LHHb-R8I4HWCGI63bpa4P_TisoEicGx9TxxQxSPYOwtULjVx3e-P4Yk2OINtGYvZdnTzfZUtPwM7xcndn3EhS3p3EPatjho6uC9uIM",
      history: "Ayam Cincane adalah boga kehormatan agung para bangsawan Kutai Kartanegara pada abad lampau. Disajikan istimewa dalam jamuan ritual sakral penobatan, pesta perkawinan ningrat adat, atau penyambutan utusan agung kaisar lintas samudra.",
      ingredients: [
        "1 ekor Ayam kampung muda empuk, belah bagian dada melebar (bekakak)",
        "2 sdm Air asam Jawa kental arum",
        "300ml Santan kelapa cair segar",
        "Bumbu merah halus: 10 Cabai merah keriting, 8 Bawang merah, 4 Bawang putih, 3cm Kencur segar, 2cm Jahe parut, 1 sdt Terasi udang bakar Bontang, Garam, Gula kelapa Jawa gelap."
      ],
      cookingSteps: [
        "Tumis bumbu merah halus hingga menggergaji harum wangi, tuangkan santan cair segar dan siraman air asam Jawa pekat.",
        "Masukkan ayam kampung muda utuh lebar ke dalam tumisan bumbu pedas manis.",
        "Rebus perlahan (ungkep) ayam bersama bumbu merah berkuah tersebut hingga kuah santan terserap habis mengering membalut kulit ayam.",
        "Siapkan arang batok kelapa menyala merah stabil tanpa kobaran api liar.",
        "Bakar ayam kampung ungkep di atas panggangan bara sembari disapu sisa-sisa bumbu merah kasar hingga kecokelatan bintik hitam arang harum menggoda."
      ]
    },
    {
      name: "Gence Ruan",
      rating: "4.8",
      description: "Ikan gabus (Haruan) tebal segar sungai Mahakam yang digarang/dibakar setengah kering di atas bara kayu, lalu disiram dengan limpahan sambal kasar pedas-gourmet berlumur irisan bawang merah besar, minyak kelapa mentah, dan asam Jawa.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIHrbmuelMip9nEwjIH-HSDmBnNe7A6IZw3xqLk9_HRLiEHITE4sqNqFV7tmd5MXeSalQjqUy6ksxayZ4qPAqDdxwGFv-yQ8DdvQ2tNztdRe1T9CI7xPX9zW4-fko6wqBau6d9gJG2TKqNbZiIDvonOz0-NW6lbjhd4A2WfoRElraMVH9E5a8ynQJC3OEOdw1H_JMhbC219L8lLmlb7oaP33PYoIdLBP1arwskHyScBsQhkjmnoJCx1wqqV8TZdUUAewqijVocyzQ",
      history: "Gence Ruan merupakan resep pusaka rahasia pesisir Kutai dan suku Dayak tepi Mahakam. Tradisi mengasap ikan sungai gabus liar bertekstur tebal kering di pinggiran riam lalu menutupinya dengan sambal mentah bawang merah 'gence' adalah bukti luhur harmoni boga sungai Kalimantan.",
      ingredients: [
        "1 ekor Ikan Gabus (Haruan) sungai besar segar bersisik tebal",
        "1 sdm Air asam Jawa kental",
        "Gence Sambal: 12 butir Bawang merah iris kasar lingkaran tebal, 8 Cabai merah keriting tumbuk kasar, 5 Cabai rawit merah pedas, 1 sdt Terasi bakar Kalimantan, Garam, Minyak kelapa tanusan asli."
      ],
      cookingSteps: [
        "Bersihkan ikan gabus liar segar, belah bagian punggung membujur rapi, lumuri dengan garam laut kasar dan air perasan lemon.",
        "Bakar ikan di atas anyaman bambu/besi di atas bara arang kayu hingga matang mengering, namun daging bagian dalam tetap juicy berwarna putih bersih.",
        "Wajan Sambal Gence: Tumis irisan bawang merah tebal, cabai merah keriting tumbuk kasar, dan terasi bakar Bontang dengan kucuran minyak kelapa murni hangat hingga layu semerbak.",
        "Tambahkan air asam Jawa dan gula aren merah sedikit, aduk rata hingga sambal rona kecokelatan mengkilap.",
        "Sajikan ikan gabus bakar hangat mengepul di nampan beralas pisang, tuangi tumpukan sambal gence kasar merah merona royal merata di atas daging ikan."
      ]
    },
    {
      name: "Sate Payau Kalimantan",
      rating: "4.7",
      description: "Sate eksotis legendaris khas hutan pedalaman Kalimantan Timur. Terbuat dari potongan daging has dalam yang sangat empuk, dimarinasi dalam racikan rahasia bumbu ketumbar dan jinten Dayak, lalu dipanggang dahan kelapa menghasilkan cita rasa manis gurih yang sangat autentik.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ8VwuGAigHF7WgjoEcIYdcKKJN1o29rxddpflZu_ALePK9enYi0x7e2nk73FKwftG7t8GmWIr5PtGReNVb-KxzRfX2LWiuBHNlcVJkJG4UYSLVIBCGKn5UFxqoVch96ElHTuj6VVvzlmDv9SvbC5at6uuQnSukJ3Tpc60xlTdfgaFexOs66-L05fwoUdf6ney8hwU1YFqV_MECurTbXYktILvtj5UzJEbM8_yzB5I0wWrsOi5YNU1ejFaU3w-HqN0NDXcn72qZLs",
      history: "Sate Payau mulanya diracik oleh suku Dayak pedalaman pasca kepulangan berburu rusa rimba raya di belantara Borneo. Saat ini, demi menjaga keselarasan adat serta perlindungan fauna langka, boga sate legendaris ini disubstitusi menggunakan daging sapi has dalam prima berlemak tipis dengan bumbu ketumbar jinten orisinal rimba Dayak.",
      ingredients: [
        "500g Daging sapi has dalam kualitas premium (atau rusa budidaya), potong kotak dadu sedang",
        "4 sdm Kecap manis kental gurih",
        "2 sdm Minyak sayur murni",
        "Bumbu halus marinasi rimba: 6 Bawang merah, 3 Bawang putih, 1 sdm Ketumbar murni sangrai, 1/2 sdt Jinten bubuk harum, 1 sdm Gula kelapa parut Jawa, Garam laut."
      ],
      cookingSteps: [
        "Aduk potongan daging sapi has dalam bersih bersama bumbu halus marinasi, kecap manis kental, dan sedikit minyak hingga melumuri setiap keping daging.",
        "Simpan daging termarinasi dalam wadah tertutup di dalam lemari es minimal 1 jam (lebih baik semalaman) agar saripari ketumbar jinten meresap dalam serat.",
        "Tusukkan daging sapi marinasi pada bilah lidi bambu tebal rapat.",
        "Panggang sate payau di atas bara api arang kelapa stabil hangat sembari diolesi uap sisa bumbu kecap manis karamel hingga bumbu matang mengilat harum."
      ]
    },
    {
      name: "Amplang Tenggiri Pesisir",
      rating: "4.7",
      description: "Kerupuk kuku macan ikonik khas pesisir laut Kalimantan Timur. Dibuat menggunakan paduan lumat daging ikan tenggiri segar tangkapan nelayan lokal, dicampur tepung sagu tani murni dan bawang putih gurih bumbu, lalu digoreng garing renyah berongga harum.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQE6g9UklHoefsP7HxDpgcG0Su4cDyl02AUyQvVvBHE2Tbk7UzKWmpUiNTODEbbLqQILVckp5FceiPolGN8-5Zvy0BypoPdy01iIlhtnqSC48ya2ayMpF5vOG7yYqpZ9duNOXK6CVT27viBsctNuoHtoGSM__DBlCnd1mHXOuhPig_V56mCfU8ouV0HK14b6IIdDG-I2KAoK4-_KsMPvFmQiAnipykqfVRQW-pGwE5h3sbfbvP2Z5_AIdqN9qSijeHs2C2mmNvKhI",
      history: "Amplang berdiri tegak sebagai simbol keramahtamahan kuliner pesisir timur pulau Kalimantan. Berlimpahnya komoditi ikan tenggiri segar melahirkan kearifan olahan pengeringan renyah gurih ini sebagai bingkisan erat perekat persaudaraan lintas kepulauan nusantara.",
      ingredients: [
        "300g Daging ikan tenggiri murni segar tanpa duri, blender sangat lumat dingin",
        "300g Tepung sagu tani atau tapioka super premium",
        "2 butir Telur ayam utuh",
        "1 sdm Gula pasir murni, 1 sdt Garam halus, 1 sdt Kaldu jamur gurih murni",
        "Bumbu halus: 4 siung Bawang putih kering, 1 sdt Merica putih butir."
      ],
      cookingSteps: [
        "Uleni daging ikan tenggiri halus dingin bersama telur ayam dan bumbu halus kering bawang putih dalam mangkuk besar hingga adonan mengenyal rata.",
        "Tambahkan tepung sagu tani sedikit demi sedikit sembari diuleni perlahan menggunakan telapak tangan hangat hingga kalis lembut dan tidak lengket.",
        "Ambil segenggam adonan, giling silinder panjang seukuran jari manis lalu potong miring-miring kecil menyerupai kuku macan ikonik.",
        "Sediakan wajan berisi minyak goreng kelapa melimpah dingin (suhu ruang). Masukkan seluruh potongan adonan amplang mentah ke dalam minyak dingin tersebut.",
        "Nyalakan kompor dengan api kecil, biarkan minyak menghangat bertahap sembari adonan diaduk konstan memutar lembut agar amplang mengapung mekar garing merata berongga renyah."
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

      {/* 1. Immersive East Kalimantan Hero Section with Mahakam Sunrise */}
      <section className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
        <img
          alt="Beautiful Mahakam River East Kalimantan Sunrise"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          src="https://www.indonesia.travel/contentassets/4198a723c30b428bb358ccc85a496f3b/sungai-mahakam2.jpg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131311] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#131311]/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 max-w-4xl">
          <span className="font-sans text-xs tracking-[0.3em] text-primary mb-3 uppercase font-bold">
            BUMI ETAM &bull; PUSRA NUSANTARA
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-on-surface font-semibold mb-6 leading-tight tracking-tight">
            Kalimantan Timur
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Menapaki belantara hujan khatulistiwa Borneo yang asri, menyusuri riak legendaris Sungai Mahakam, hingga menyambut masa depan Indonesia gemilang di pelukan Ibu Kota Nusantara (IKN).
          </p>
        </div>
      </section>

      {/* Cultural Divider */}
      <div className="cultural-divider"></div>

      {/* 2. Heritage Section - Warisan Kutai hingga Kemegahan Ibu Kota Nusantara (IKN) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* IKN / Kalimantan Landscape Imagery representation */}
        <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-primary/20 shadow-xl bg-surface-container-low">
          <img
            alt="Ibu Kota Nusantara IKN Garuda Palace representation"
            className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.85] contrast-[1.05]"
            src="https://i.pinimg.com/736x/19/4c/d7/194cd7968785b32052cce8968591d798.jpg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131311]/70 via-[#131311]/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 bg-[#131311]/80 backdrop-blur-md p-4 border border-primary/10 rounded">
            <span className="font-sans text-[10px] tracking-widest font-bold text-primary block uppercase mb-1">PUSAKA ALAM BORNEO</span>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">Letak luhur di mana rempah hutan hutan rimba khatulistiwa dipelihara penuh bakti adat Dayak dan Kutai.</p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase">
            SEJARAH &amp; PERADABAN MASA DEPAN
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Dari Kutai Kartanegara Hingga Ibu Kota Nusantara (IKN)
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-justify">
            Kalimantan Timur adalah untaian sejarah tertua di Nusantara, berakar pada abad ke-4 masehi lewat kemegahan <strong>Kerajaan Kutai Martapura</strong> dengan Prasasti Yupa peninggalan Raja Mulawarman yang menandai dimulainya zaman aksara di Indonesia. Aliran legendaris Sungai Mahakam mengantarkan dinamika asimilasi boga Melayu Kutai, Dayak pedalaman, Banjar, dan Bugis yang legendaris.
          </p>
          <blockquote className="font-serif text-base md:text-lg italic text-primary/90 border-l-2 border-primary pl-6 py-1 my-2">
            &ldquo;Kini, di atas tanah peradaban purba mulia ini, berdiri gagah Ibu Kota Nusantara (IKN) sebagai istana hijau masa depan—sebuah kota pintar lestari (Smart Forest City) yang menyatukan keluhuran budaya nusantara dengan kemandirian global.&rdquo;
            <span className="block font-sans text-[10px] tracking-widest font-bold text-on-surface-variant/40 mt-1 uppercase not-italic">
              - Falsafah Indonesia Sentris &amp; Masa Depan IKN Nusantara
            </span>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                Kutai Melayu &amp; Dayak
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                Asimilasi kuliner agung beraroma jahe-kencur bumbu merah kerajaan Kutai serta kebiasaan mematangkan hidangan dalam lindungan uap bambu suku Dayak.
              </p>
            </div>
            <div className="bg-surface-container-low/40 p-5 rounded-lg border border-primary/5 hover:border-primary/10 transition-colors">
              <span className="font-sans text-xs text-primary font-bold tracking-wider uppercase block mb-1">
                IKN: Kota Rimba Masa Depan
              </span>
              <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed text-justify">
                IKN mewakili visi Indonesia Raya yang lestari serta hijau, memadukan ekosistem rimba tropis purba Borneo dengan arsitektur futuristik Istana Garuda.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-primary font-bold">KUTAI</span>
              <span className="font-sans text-[9px] text-on-surface-variant/70 tracking-widest font-semibold uppercase">
                KERAJAAN TERTUA
              </span>
            </div>
            <div className="w-px h-10 bg-primary/20"></div>
            <div>
              <span className="font-sans text-xs text-on-surface-variant/80 font-medium">
                Bumi Etam kini merajut jembatan waktu emas, merayakan bumbu kuno pusaka dan fajar baru Indonesia Sentris Ibu Kota Nusantara.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="cultural-divider"></div>

      {/* 3. Kalimantan Signature Dishes Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-primary uppercase block mb-2">
            PULANGAN KULINER BUMI ETAM
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Masakan Khas Kalimantan Timur
          </h3>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
            Nikmati mahakarya tradisi boga bercita rasa manis-gurih dan masakan bakaran eksotik beralas daun kelapa yang harum khas Kalimantan Timur.
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
                <h5 className="font-serif text-base text-primary font-bold">Nilai Sejarah &amp; Tradisi</h5>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed text-justify italic bg-primary/5 border-l-2 border-primary/40 pl-4 py-2">
                  &ldquo;{selectedDish.history}&rdquo;
                </p>
              </div>

              {/* Ingredients & Steps split screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-3">
                  <h5 className="font-serif text-base text-primary font-bold">Rincian Bumbu &amp; Takaran</h5>
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
                  <h5 className="font-serif text-base text-primary font-bold">Langkah Pengolahan</h5>
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
