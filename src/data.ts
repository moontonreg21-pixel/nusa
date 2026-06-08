import { ProvinceData } from './types';

export const PROVINCES: ProvinceData[] = [
  {
    id: "aceh",
    name: "Aceh",
    territory: "SUMATERA",
    description: "Kekayaan rempah tanah Rencong dalam setiap suapan Mie Aceh.",
    dishName: "Mie Aceh",
    imageUrl: "/regions/aceh-baiturrahman-aerial.jpg",
    ingredients: [
      "400g mi kuning tebal basah",
      "150g daging sapi, potong dadu",
      "750ml kaldu sapi murni",
      "50g taoge segar kualitas terbaik",
      "50g kol, iris tipis memanjang",
      "2 sendok makan kecap manis",
      "1 sendok makan kecap asin",
      "2 batang daun bawang, iris kasar",
      "2 batang seledri, iris halus",
      "Bumbu halus: 6 cabai merah keriting, 5 bawang merah, 3 bawang putih, 1 sdt ketumbar bubuk, 1/2 sdt jinten, 3 kapulaga, 1 tangkai kelabet, 2cm kunyit bakar."
    ],
    history: "Mie Aceh mencerminkan pengaruh lintas budaya yang membentuk masyarakat Aceh di pelabuhan niaga masa lalu. Kuah kari kental berempah kuat dipengaruhi oleh pengaruh India, sementara pemakaian mie kuning dipengaruhi budaya Tiongkok. Penggunaan daging sapi atau kambing menunjukkan cita rasa masakan Timur Tengah.",
    recommendedRecipe: {
      prepTime: "20 mnt",
      cookTime: "15 mnt",
      servings: "2 Porsi",
      steps: [
        "Panaskan sedikit minyak, tumis bumbu halus di dalam wajan (lebih baik wajan tanah liat/wajan tebal) hingga menebarkan aroma harum khas tanah Rencong.",
        "Masukkan potongan daging sapi, aduk rata hingga warna daging berubah kecokelatan dan bumbu meresap sempurna.",
        "Tuang air kaldu sapi hangat sedikit demi sedikit. Masak hingga daging melunak dan kuah berempah mulai mengental berkilau.",
        "Tambahkan kol, taoge, kecap manis, kecap asin, serta sebagian daun bawang. Masak sebentar hingga layu.",
        "Masukkan mi kuning basah tebal. Aduk perlahan dengan api sedang hingga mi menyerap sari-sari bumbu kari.",
        "Angkat dan sajikan panas-panas dengan taburan seledri, bawang goreng khas, emping renyah, dan acar bawang merah cabai rawit hijau."
      ]
    }
  },
  {
    id: "sumbar",
    name: "Sumatera Barat",
    territory: "SUMATERA",
    description: "Mahakarya Rendang yang diakui dunia dari Minangkabau.",
    dishName: "Rendang Daging",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Istano_Pagaruyuang.jpg/250px-Istano_Pagaruyuang.jpg",
    ingredients: [
      "1kg daging sapi paha (gandik/grade terbaik)",
      "1000ml santan kelapa tua murni sangat kental",
      "1000ml santan kelapa encer",
      "2 lembar daun kunyit, robek dan ikat simpul",
      "5 lembar daun jeruk purut buang tulang daunnya",
      "2 batang serai memarkan aroma tajam",
      "1 lembar asam kandis",
      "Bumbu halus prima: 150g cabai merah keriting, 15 bawang merah, 8 bawang putih, 3cm jahe parut, 3cm lengkuas, 1 sdm ketumbar bubuk sangrai, 1/2 sdt pala bubuk, 1/2 sdt jinten bubuk."
    ],
    history: "Rendang menempati status tertinggi dalam tradisi boga Minangkabau. Secara adat melambangkan kebersamaan: 'dagiang' (daging sapi) sebagai lambang Niniak Mamak (tetua adat), 'karambil' (kelapa) sebagai kaum intelektual, 'lado' (cabai) sebagai alim ulama pendidik akhlak, dan bumbu pelengkap sebagai keseluruhan masyarakat Minang nan bersatu.",
    recommendedRecipe: {
      prepTime: "30 mnt",
      cookTime: "4 jam",
      servings: "8 Porsi",
      steps: [
        "Rebus santan encer bersama bumbu halus parut, daun kunyit, daun jeruk purut, serai, dan asam kandis di dalam wajan tebal tradisional (kuali besi) sambil diturun-naikkan agar minyak kelapa meluncur keluar.",
        "Setelah santan mendidih kental dan mengeluarkan sedikit minyak kemilau, masukkan potongan daging sapi paha searah serat agar tidak mudah hancur.",
        "Kecilkan api kompor ke tingkat minimum. Masak terus sambil sesekali diaduk lembut hingga warna kuah menyusut menjadi cokelat kemerahan (fase Kalio).",
        "Tuang santan kental murni secara bertahap. Teruskan memasak dengan kesabaran tinggi hingga kelapa ter-karamelisasi berwarna cokelat gelap kehitaman pecah minyak.",
        "Daging sapi akan menjadi hitam pekat dan bumbu mengering menjadi serpihan bumbu minyak kelapa harum khas Minang autentik.",
        "Angkat rendang orisinal ini dan dinginkan. Rendang paling lezat dikonsumsi sehari setelah proses memasak."
      ]
    }
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    territory: "JAWA",
    description: "Manisnya harmoni Gudeg di kota yang sarat tradisi.",
    dishName: "Gudeg Jogja",
    imageUrl: "/regions/yogyakarta.jpg",
    ingredients: [
      "1kg nangka muda (tewel), potong kotak sedang",
      "5 butir telur bebek, rebus matang lalu kupas kulit",
      "1000ml santan kental murni",
      "250g gula merah Jawa kelapa asli (warna gelap)",
      "10 lembar daun jati muda (pemberi rona merah kecokelatan)",
      "5 lembar daun salam tua",
      "3cm lengkuas memarkan",
      "Bumbu halus madu: 12 bawang merah, 6 bawang putih, 6 butir kemiri sangrai, 1 sdm ketumbar bubuk murni, 1 sdm garam laut."
    ],
    history: "Gudeg telah diolah sejak masa pembabatan Alas Mentaok untuk pembangunan Kerajaan Mataram Islam di abad ke-16. Nangka muda melimpah diawetkan dalam periuk tanah liat besar. Waktu masak lambat melambangkan karakter luhur Jawa yang penuh ketepatan, kesabaran (sabar narimo), dan keselarasan.",
    recommendedRecipe: {
      prepTime: "25 mnt",
      cookTime: "8 jam",
      servings: "6 Porsi",
      steps: [
        "Gunakan periuk tanah liat (kendil) agar rasa tanah liat menguap alami. Alasi dasar kendil dengan daun jati muda dan daun salam berlimpah.",
        "Tata potongan nangka muda setengah bagian, letakkan bumbu halus manis, telur bebek rebus, dan gula kelapa gelap, lalu tutup kembali dengan sisa nangka muda.",
        "Tuangkan santan kelapa murni secara perlahan hingga merendam seluruh tumpukan nangka muda.",
        "Tutup bagian atas dengan daun jati lagi, kemudian tutup rapat kendil dengan clay cover.",
        "Masak di atas api kecil arang (jika memungkinkan) selama minimal 8 jam hingga air meresap habis dan telur serta nangka berubah cokelat kemerahan gelap mengkilap khas Gudeg Kering Jogja.",
        "Sajikan mendampingi nasi hangat, opor ayam, krecek pedas gurih, dan areh santan kental gurih."
      ]
    }
  },
  {
    id: "sulsel",
    name: "Sulawesi Selatan",
    territory: "SULAWESI",
    description: "Gurihnya Coto Makassar, warisan pelaut tangguh.",
    dishName: "Coto Makassar",
    imageUrl: "/regions/sulawesi-selatan.jpg",
    ingredients: [
      "500g daging sapi sandung lamur",
      "500g jeroan sapi (babat/paru/jantung) rebus matang",
      "2 liter air tajin (air cucian beras putih bersih kedua)",
      "200g kacang tanah kupas kulit, goreng lalu blender halus",
      "5 batang serai, memarkan bagian putihnya",
      "3cm lengkuas memarkan",
      "2 lembar daun salam",
      "Bumbu halus tumis: 10 bawang merah, 6 bawang putih, 1 sdm ketumbar bubuk, 1 sdt jinten bubuk sangrai, 1 sdt merica butiran, 1/2 sdt pala bubuk."
    ],
    history: "Coto Makassar lahir dari dapur istana Kerajaan Gowa pada abad ke-16. Daging sandung lamur murni disajikan bagi para bangsawan istana, sedangkan bagian jeroan diolah kreatif oleh masyarakat kelas pekerja pesisir bersama kacang tanah dan air tajin, menciptakan sajian pemersatu penuh energi pelaut Makassar.",
    recommendedRecipe: {
      prepTime: "20 mnt",
      cookTime: "50 mnt",
      servings: "5 Porsi",
      steps: [
        "Rebus daging sapi dan jeroan di dalam air tajin (air cucian beras kedua) bersama serai, lengkuas, jahe, dan daun salam hingga empuk.",
        "Angkat daging dan jeroan yang telah empuk, tiriskan lalu potong berbentuk dadu kecil khas coto.",
        "Tumis bumbu halus dengan sedikit minyak kelapa hingga wangi kering, masukkan ke dalam air rebusan kaldu tadi.",
        "Masukkan kacang tanah halus ke dalam kuah kaldu selagi mendidih. Aduk konstan agar kacang melarut merata, menciptakan tekstur kental berlemak.",
        "Masukkan kembali potongan daging dan jeroan sapi dadu, masak dengan api kecil selama 15 menit agar meresap.",
        "Sajikan hangat dalam mangkuk coto kecil tanah liat bersama irisan daun bawang, seledri, bawang merah goreng, perasan jeruk nipis, sambal tauco tajam, dan ketupat daun kelapa (Buras)."
      ]
    }
  },
  {
    id: "jabar",
    name: "Jawa Barat",
    territory: "JAWA",
    description: "Kesegaran bumi Parahyangan dalam balutan Sate Maranggi.",
    dishName: "Sate Maranggi",
    imageUrl: "/regions/jawa-barat.jpg",
    ingredients: [
      "600g daging sapi bagian has dalam, potong dadu 2cm",
      "100g lemak sapi muda, potong kecil-kecil",
      "5 sendok makan kecap manis hitam kental berkualitas",
      "2 sdm air asam Jawa pekat",
      "3 lembar daun pepaya remas kasar (pelunak daging alami)",
      "Bumbu rendaman manis: 2 sdm ketumbar bubuk murni, 1 sdm gula merah sisir, 8 bawang merah, 4 bawang putih, 2cm lengkuas parut, 1cm jahe."
    ],
    history: "Sate Maranggi Purwakarta merupakan buah asimilasi budaya kuliner antara pendatang Tionghoa (menggunakan teknik marinasi rempah manis khas) dan kearifan bumi suku Sunda Jawa Barat, berakulturasi menjadi hidangan sate daging sapi halal legendaris yang kaya ketumbar murni.",
    recommendedRecipe: {
      prepTime: "15 mnt",
      cookTime: "10 mnt",
      servings: "4 Porsi",
      steps: [
        "Bungkus potongan daging sapi dan lemak dalam remasan daun pepaya selama 25 menit agar enzim papain melunakkan serat daging tanpa merusak tekstur alaminya.",
        "Haluskan bumbu rendaman manis, campur dengan kecap manis dan air asam Jawa pekat.",
        "Keluarkan daging dari daun pepaya, campur dengan bumbu rendaman rempah manis tersebut. Diamkan dalam kulkas selama 30 menit agar meresap.",
        "Tusuk daging sapi bergantian dengan lemak sapi pada tusuk sate bambu (format tradisional: 3 potongan daging sapi dan 1 potongan lemak manis di tengah).",
        "Bakar sate di atas bara api arang batok kelapa sambil diolesi sisa bumbu kecap manis hingga kecokelatan harum berkaramel.",
        "Sajikan Sate Maranggi bersama sambal tomat mentah segar yang diulek kasar (irisan tomat segar, cabai rawit pedas, jeruk limau harum) serta ketan bakar tradisional Sunda."
      ]
    }
  },
  {
    id: "papua",
    name: "Papua",
    territory: "PAPUA",
    description: "Eksotisme Papeda dan Ikan Kuah Kuning dari timur fajar.",
    dishName: "Papeda & Ikan Kuah Kuning",
    imageUrl: "/regions/papua.jpg",
    ingredients: [
      "250g tepung sagu murni kualitas premium",
      "1000ml air mendidih murni",
      "1 sdm perasan jeruk nipis",
      "500g ikan kakap merah segar atau ikan tongkol",
      "1 lembar daun kunyit ukuran kecil",
      "2 batang serai memarkan",
      "1 genggam daun kemangi segar wangi hutan",
      "Bumbu halus kuning: 8 bawang merah, 4 bawang putih, 3 biji kemiri, 3cm kunyit bakar murni, 2cm jahe segar."
    ],
    history: "Sagu merupakan jiwa pangan serta pilar kehidupan bagi masyarakat adat Papua. Proses merebus sagu murni menjadi Papeda yang kenyal transparan melambangkan rasa syukur yang mendalam atas pemeliharaan Sang Pencipta terhadap kemakmuran hutan Papua, selalu dinikmati bersama ikan kuah kuning hangat.",
    recommendedRecipe: {
      prepTime: "20 mnt",
      cookTime: "20 mnt",
      servings: "3 Porsi",
      steps: [
        "Untuk Papeda: Larutkan tepung sagu murni dengan 200ml air dingin, tambahkan garam dapur dan perasan jeruk nipis dalam wadah mangkuk kayu atau keramik.",
        "Siram bertahap larutan sagu dengan 800ml air yang baru saja mendidih sambil diaduk konstan searah jarum jam hingga warna berganti dari keruh menjadi mengilap bening berlendir kenyal.",
        "Untuk Ikan Kuah Kuning: Tumis bumbu halus kuning bersama serai, daun jeruk, dan daun kunyit hingga menebar aroma segar kuning kunyit murni kuno.",
        "Tuangkan air hangat secukupnya, didihkan kuah bumbu kuning tersebut.",
        "Masukkan potongan ikan kakap merah segar, kecilkan api kompor agar ikan matang lembut. Tambahkan daun kemangi wangi menjelang diangkat.",
        "Sajikan Papeda kenyal hangat dengan menggulungnya menggunakan sepasang sumpit bambu khusus (gata-gata), tuangi ikan kuah kuning segar berlimpah."
      ]
    }
  },
  {
    id: "maluku",
    name: "Maluku",
    territory: "MALUKU",
    description: "Jejak Kepulauan Rempah dalam Ikan Kuah Pala Banda.",
    dishName: "Ikan Kuah Pala Banda",
    imageUrl: "/regions/maluku.jpg",
    ingredients: [
      "600g ikan kakap putih segar (atau kerapu)",
      "2 buah pala Banda segar, belah ambil daging buahnya dan iris tipis",
      "5 kuntum cengkeh kering asli kepulauan Banda",
      "1 batang serai muda cincang halus",
      "3cm lengkuas memarkan",
      "2cm kunyit bakar",
      "1 liter air kaldu seafood murni",
      "Bumbu halus: 6 bawang merah, 4 bawang putih, 4 cabai merah keriting, 1cm jahe segar."
    ],
    history: "Kepulauan Banda di Maluku pernah menjadi pusat perebutan monopoli rempah dunia oleh kolonial Eropa karena buah pala berharga setara emas murni. Kuliner legendaris ini memadukan kemurnian pala Banda dan cengkeh segar, menghasilkan kuah ikan asam pedas beraroma magis rempah kepulauan Maluku.",
    recommendedRecipe: {
      prepTime: "20 mnt",
      cookTime: "25 mnt",
      servings: "3 Porsi",
      steps: [
        "Lumuri ikan kakap putih segar dengan garam laut dan air jeruk nipis selama 15 menit agar sisa aroma amis lenyap diganti kesegaran lemon.",
        "Tumis bumbu halus bersama serai memarkan, lengkuas parut, dan kunyit bakar hingga harum semerbak.",
        "Tuangkan air kaldu seafood segar ke dalam tumisan bumbu, aduk rata dan panaskan hingga mendidih.",
        "Masukkan potongan daging buah pala Banda segar yang diiris tipis beserta cengkeh cengkih kering Banda. Inilah rahasia aroma purba kuah tersebut.",
        "Masukkan ikan kakap putih, cabai rawit utuh, dan masak di atas api kecil sedang agar saripati pala terserap ke dalam serat ikan.",
        "Sajikan kuah pala Banda kering ini dengan sepiring nasi hangat, sangat seimbang menutup rasa pedas asam segar pala."
      ]
    }
  },
  {
    id: "kaltim",
    name: "Kalimantan Timur",
    territory: "KALIMANTAN",
    description: "Keaslian rasa pesisir dalam Nasi Kuning Banjar yang khas.",
    dishName: "Nasi Kuning Banjar Haruan Habang",
    imageUrl: "/regions/kalimantan-timur.jpg",
    ingredients: [
      "500g beras aromatik cuci bersih",
      "1 sdm air kunyit kental hasil parutan kunyit tua murni",
      "500ml santan kelapa sedang dari kelapa parut manual",
      "2 batang serai memarkan bagian bawah",
      "3 lembar daun pandan wangi ikat simpul",
      "1 sdt garam laut prima",
      "Ikan lauk pendamping: Ikan Haruan (gabus) dipotong tebal, bumbu masak habang (cabai merah kering direbus lalu digiling halus bersama bawang merah bawang putih serta gula merah merah)."
    ],
    history: "Nasi Kuning Banjar tumbuh populer di Kalimantan Timur. Memakai lauk wajib berupa Ikan Haruan (gabus rawa pedalaman Kalimantan) yang bertekstur kokoh tebal, dimasak saus karamel merah pekat bumbu masak habang yang manis dan beraroma harum kencur serta asam Jawa.",
    recommendedRecipe: {
      prepTime: "25 mnt",
      cookTime: "30 mnt",
      servings: "4 Porsi",
      steps: [
        "Rebus santan kelapa hangat bersama perasan air kunyit murni, serai memarkan, daun pandan simpul, dan garam laut hingga harum mendidih.",
        "Masukkan beras aromatik, aron (masak sambil diaduk perlahan) hingga seluruh cairan santan kelapa terserap rata ke dalam struktur beras gembung.",
        "Kukus beras aron kuning wangi tersebut di dalam kukusan tradisional beralas daun pisang selama 30 menit hingga matang pulen tanak.",
        "Untuk Masak Habang: Tumis bumbu cabai merah kering giling dengan minyak kelapa melimpah bersama gula aren merah pekat hingga bumbu menguap mengkilap (tidak pedas).",
        "Masukkan ikan Haruan goreng setengah matang ke dalam saus merah habang tersebut, masak perlahan hingga saus merasuk merona merah pekat kehitaman.",
        "Sajikan seporsi Nasi Kuning Banjar hangat bergizi tinggi bersama baluran lauk Haruan Habang manis gurih yang menawan."
      ]
    }
  },
  {
    id: "ntt",
    name: "Nusa Tenggara Timur",
    territory: "NUSA TENGGARA",
    description: "Aroma asap Se'i Sapi yang legendaris dari tanah Flobamora.",
    dishName: "Se'i Sapi NTT",
    imageUrl: "/regions/nusa-tenggara-timur.jpg",
    ingredients: [
      "800g daging sapi bagian khas luar lemak tipis (tenderloin/strip)",
      "Bumbu marinasi daging: 4 siung bawang putih cincang sangat halus, 1 sdm merica bubuk hitam murni, 1 sdm garam laut kasar.",
      "Daun Kosambi segar penutup bara dahan Kosambi kering (wajib untuk aroma autentik)."
    ],
    history: "Se'i merupakan salah satu mahakarya pengawetan daging pusaka NTT asli Kupang. Kata se'i diambil dari dialek lokal yang berati ditarik memanjang secara horizontal. Teknik memasak warisan Flobamora diasap dengan bahan api kayu Kosambi kering dan ditutupi dengan lembaran daun Kosambi segar agar uap asap terkunci sempurna.",
    recommendedRecipe: {
      prepTime: "25 mnt",
      cookTime: "1 jam",
      servings: "4 Porsi",
      steps: [
        "Sayat tipis memanjang daging sapi searah serat daging dengan ketebalan merata sekitar 2cm.",
        "Baluri potongan daging sapi memanjang tadi dengan campuran bawang putih cincang halus, garam laut, dan merica bubuk hitam. Dinginkan dalam lemari es selama 1 jam agar meresap.",
        "Siapkan panggangan asap tradisional. Bakar kayu kosambi kering hingga menyisakan arang merah bara tanpa ada nyala api bebas.",
        "Letakkan daging sapi di atas rak kawat berjarak minimal 25cm dari bara arang kosambi agar panas asap yang mematangkan, bukan api langsung.",
        "Tutup seluruh permukaan daging sapi dengan limpahan daun kosambi segar agar uap hangat kosambi bersirkulasi mematangkan daging sembari memberi rona warna merah muda alami.",
        "Lakukan teknik pengasapan stabil ini selama 45-60 menit hingga daging sapi kering beraroma asap pekat. Iris tipis-tipis melintang dan sajikan bersama sambal Lu'at asam pedas mentah daun kemangi."
      ]
    }
  },
  {
    id: "bali",
    name: "Bali",
    territory: "BALI",
    description: "Perpaduan mistis bumbu rempah dalam sebatang Sate Lilit.",
    dishName: "Sate Lilit Ikan Tenggiri",
    imageUrl: "/regions/bali.jpg",
    ingredients: [
      "500g daging ikan tenggiri giling super halus dingin",
      "5 sdm kelapa parut muda gurih",
      "4 sendok makan santan kelapa sangat kental",
      "12 batang serai ukuran besar bulat wangi (sebagai pengganti tusuk kayu)",
      "2 lembar daun jeruk iris sangat halus memanjang",
      "Bumbu halus Base Genep Bali: 8 bawang merah, 4 bawang putih, 3 kencur sejati, 2cm jahe, 2cm kunyit bakar, 2cm lengkuas muda, 1 sdt ketumbar bubuk sangrai, 3 butir kemiri goreng, 1 sdt terasi panggang Bali."
    ],
    history: "Sate Lilit sarat akan luhurnya gotong-royong ('ngayah') dalam tradisi banjar pura adat Bali. Dahulu dibuat bersama-sama oleh kaum pria Bali menjelang perayaan sakral pura. Gerakan mengaduk melilitkan adonan bumbu pusaka Base Genep ke ujung batang serai memerlukan kelembutan yang melambangkan kebersamaan nan harmonis.",
    recommendedRecipe: {
      prepTime: "20 mnt",
      cookTime: "12 mnt",
      servings: "4 Porsi",
      steps: [
        "Tumis racikan bumbu halus Base Genep Bali hingga mengering matang harum di wajan, angkat lalu dinginkan sebentar.",
        "Campurkan daging ikan tenggiri giling dingin dengan kelapa parut muda, daun jeruk yang diiris sangat halus, santan kental murni, dan tumisan bumbu Base Genep dingin tadi di dalam mangkuk dingin.",
        "Uleni adonan ikan tenggiri lembut kelapa tersebut hingga rata bersatu sampai adonan lengket mulus kalis.",
        "Ambil segenggam kecil adonan ikan (sekitar 40g), lilitkan perlahan sambil dikepal lembut memanjang menempel pada ujung batang serai besar yang bersih.",
        "Panggang sate lilit serai di atas bara api arang kelapa atau pan anti lengket yang diolesi minyak kelapa murni tipis hingga berubah kuning keemasan kecokelatan matang.",
        "Sajikan sate lilit Bali hangat legendaris ini dengan aroma serai bersama nasi putih pulen hangat dan sambal matah Bali segar minyak kelapa sawit pusaka."
      ]
    }
  }
];
