import { ProvinceData } from './types';

export interface ExtraDish {
  name: string;
  rating: string;
  description: string;
  imageUrl: string;
  history: string;
  ingredients: string[];
  cookingSteps: string[];
}

export interface ExtraProvinceDetail {
  provinceId: string;
  title: string;
  subtitle: string;
  heroImageUrl: string;
  philosophyTitle: string;
  philosophyDesc: string;
  quote: string;
  quoteAuthor: string;
  subKeyAdat: string;
  subKeyAdatDesc: string;
  subKeyNgayah: string;
  subKeyNgayahDesc: string;
  unescoLabel: string;
  unescoQuote: string;
  dishes: ExtraDish[];
  spices: { name: string; desc: string }[];
  dance: string;
  danceDesc: string;
  site: string;
  siteDesc: string;
}

export const EXTRA_PROVINCES_DETAILS: Record<string, ExtraProvinceDetail> = {
  aceh: {
    provinceId: "aceh",
    title: "Aceh: Serambi Mekkah",
    subtitle: "RASA REMPAH KUAT DI TANAH RENCONG",
    heroImageUrl: "/regions/aceh-baiturrahman-aerial.jpg",
    philosophyTitle: "Filosofi Peumulia Jamee & Tradisi Meurami",
    philosophyDesc: "Bagi masyarakat Aceh, menjamu tamu (Peumulia Jamee) adalah kewajiban adat dan keagamaan yang sakral. Kuliner Aceh dicirikan oleh kombinasi bumbu rempah-rempah basah yang kaya dan kuat, seperti kelapa gongseng (u deuluek), ketumbar, merica, dan kapulaga. Hidangan dimasak bersama-sama dalam kuali tanah liat besar (belanga) pada tradisi kuah beulangong untuk merayakan kebersamaan, rasa syukur, serta gotong royong warga.",
    quote: "Adat bak Po Teumeureuhom, Hukom bak Syiah Kuala, Kanun bak Putroe Phang, Reusam bak Bentara.",
    quoteAuthor: "Hukum Adat Pusaka Singkil & Syiah Kuala",
    subKeyAdat: "Bumbu Kari Tanah Rencong",
    subKeyAdatDesc: "Kombinasi harmonis antara cengkeh, kayu manis, pekak, kapulaga, dan daun koja tanah Aceh yang menghasilkan aroma kari purba dengan pengaruh Timur Tengah, India, dan Tiongkok.",
    subKeyNgayah: "Seni Meurami & Memasak Belanga",
    subKeyNgayahDesc: "Aktivitas memasak bersama dalam satu kuali besi tradisional besar saat menyambut hari perayaan besar Islam, memupuk solidaritas ukhuwah islamiyah perdamaian.",
    unescoLabel: "WARISAN BUDAYA TAKBENDA",
    unescoQuote: "Tradisi adat memasak Kuah Beulangong melambangkan kemuliaan sosial, kepedulian terhadap duafa, dan keberhasilan tani.",
    dishes: [
      {
        name: "Mie Aceh Daging",
        rating: "4.9",
        description: "Mie kuning basah tebal khas Aceh yang disiram kuah kari kental kecokelatan yang harum rempah pedas, ditumis bersama potongan empuk daging sapi, taburan bawang goreng seledri, kerupuk emping renyah, dan acar bawang merah segar.",
        imageUrl: "/regions/aceh-mie-aceh.jpg",
        history: "Mencerminkan sejarah pelabuhan niaga Aceh kuno. Mie kuning dipengaruhi kebiasaan Tiongkok, kuah kari kental dipengaruhi rempah India, dan penggunaan daging sapi mencerminkan kesukaan masyarakat Timur Tengah.",
        ingredients: [
          "400g mi kuning basah tebal",
          "150g daging sapi paha, potong dadu",
          "700ml kaldu sapi hangat",
          "50g kol iris tipis, 50g taoge segar",
          "Bumbu halus kari: 6 cabai merah keriting, 5 bawang merah, 3 bawang putih, 1 sdt ketumbar bubuk, 1/2 sdt jinten, 3 kapulaga, 1 tangkai kelabet, 2cm kunyit."
        ],
        cookingSteps: [
          "Tumis bumbu halus kari di wajan tebal dengan minyak kelapa hingga wangi luar biasa.",
          "Masukkan potongan daging sapi, tumis rata hingga permukaan luar berubah warna kecokelatan.",
          "Tuang kaldu sapi hangat. Masak dengan air mendidih kecil hingga daging sapi melunak empuk.",
          "Masukkan kol, taoge, daun bawang, sebagian kecap asin, ketumbar bubuk, aduk rata.",
          "Masukkan mi kuning tebal. Aduk dengan api sedang hingga mi menyerap sari-sari bumbu kari kental. Sajikan bersama emping dan acar."
        ]
      },
      {
        name: "Ayam Tangkap",
        rating: "4.8",
        description: "Potongan ayam kampung muda yang digoreng garing dalam tumpukan bumbu rempah dedaunan aromatik melimpah (daun koja/temurui dan daun pandan) yang kering garing kriuk gurih aromatik.",
        imageUrl: "/regions/aceh-ayam-tangkap.jpg",
        history: "Ayam Tangkap lahir dari tradisi makan bersama masyarakat pedesaan Aceh Besar. Nama 'tangkap' melambangkan kebiasaan memotong ayam peliharaan segar di kebun ketika ada sanak keluarga yang datang bertamu.",
        ingredients: [
          "1 ekor ayam kampung muda, potong 24 bagian kecil",
          "10 tangkai daun temurui (koja/kari), petik daunnya",
          "5 lembar daun pandan wangi, iris kasar seukur jari",
          "3 sdm air asam Jawa, garam murni",
          "Bumbu halus marinasi: 5 bawang putih, 3 kunyit bakar, 2cm jahe, air lemon segar."
        ],
        cookingSteps: [
          "Lumuri ayam yang dipotong kecil dengan garam air asam Jawa dan bumbu halus marinasi. Marinasi minimal 30 menit.",
          "Panaskan minyak kelapa melimpah dalam wajan dalam (teknik deep fry).",
          "Masukkan potongan ayam ke dalam minyak sangat panas. Goreng setengah matang.",
          "Masukkan daun temurui (daun koja) dan irisan daun pandan secara royal langsung ke dalam penggorengan ayam.",
          "Goreng terus hingga rempah dedaunan kering renyah berwarna hijau tua gelap dan daging ayam matang garing keemasan. Sajikan hangat."
        ]
      },
      {
        name: "Kuah Pliek U",
        rating: "4.7",
        description: "Gulai sayur khas Aceh yang rasanya asam, gurih, dan segar unik dengan bahan utama 'Pliek U' (ampas kelapa sisa pembuatan minyak kelapa tradisional/cliek u yang dibusukkan lalu difermentasi).",
        imageUrl: "/regions/aceh-kuah-pliek-u.jpg",
        history: "Kuah Pliek U merupakan sup legendaris peninggalan nenek moyang di pesisir utara Aceh yang mencerminkan pemanfaatan arif buah kelapa kelapa secara total tanpa ada limbah terbuang sia-sia.",
        ingredients: [
          "150g Pliek U kualitas terbaik (haluskan, saring dengan air hangat)",
          "100g buah melinjo beserta daun melinjo muda",
          "100g kacang panjang, potong kecil, 50g nangka muda cincang",
          "500ml santan kelapa sedang gurih",
          "Irisan tipis rempah aromatik: 2 batang serai, 3 lembar daun jeruk jeruk purut, 5 cabai rawit hijau."
        ],
        cookingSteps: [
          "Hancurkan pliek u kering, seduh air hangat lalu peras berulang kali dan saring ampasnya.",
          "Rebus bumbu perasan pliek u ini bersama nangka muda, kacang panjang, dan buah melinjo hingga melunak setengah matang.",
          "Tambahkan santan, serai, daun jeruk purut, dan bumbu halus gulai khas Aceh.",
          "Didihkan dengan api sedang sembari terus diaduk lembut agar kelapa santan tidak pecah.",
          "Masukkan sisa sayuran hijau (daun melinjo), cabai rawit hijau, dan udang cincang (jika suka) hingga matang wangi asam segar."
        ]
      },
      {
        name: "Kue Timphan",
        rating: "4.8",
        description: "Kue basah tradisional manis khas Aceh berbahan dasar tepung ketan dengan adonan labu kuning atau pisang raja, diisi srikaya manis kelapa parut mentega, dibungkus daun pisang muda lalu dikukus hingga kenyal harum.",
        imageUrl: "/regions/aceh-timphan.jpg",
        history: "Timphan adalah sajian wajib agung pada hari raya Idul Fitri maupun Idul Adha di Aceh. Ada pepatah: 'Lhee tingkat geutanyoe udep, tabayeuet adat mumat timphan' melambangkan kebersamaan lebaran belum komplet tanpa kue ini.",
        ingredients: [
          "250g tepung ketan putih murni",
          "200g labu kuning, kukus lumatkan halus",
          "2 sdm minyak kelapa segar untuk olesan daun",
          "Daun pisang muda pembalut yang bersih fleksibel",
          "Srikaya Isian: 3 kuning telur bebek, 100ml santan pekat, 120g gula aren, selai pandan."
        ],
        cookingSteps: [
          "Adonan Kulit: Campur tepung ketan hangat dengan labu kuning yang telah dilumatkan hingga kalis tidak lengket di tangan.",
          "Adonan Isi: Kocok kuning telur bebek bersama santan kental dan gula aren sisir halus hingga mengental di atas panci uap air (tim).",
          "Olesi daun pisang muda dengan minyak kelapa murni agar tidak lengket kelak.",
          "Ambil adonan kulit ketan lebarkan tipis bulat, beri sesendok pasta srikaya di tengahnya, gulung memanjang.",
          "Bungkus gulungan kue rapat dalam daun pisang muda lalu rapi-rapi kukus selama 20 menit hingga matang kenyal harum aromatik daun pisang."
        ]
      }
    ],
    spices: [
      { name: "Asam Sunti", desc: "Belimbing wuluh yang digarami lalu dijemur kering perlahan di bawah terik matahari hingga berubah warna cokelat pekat asam segar, rahasia rasa asam khas dalam bumbu Aceh." },
      { name: "Ketumbar Gayo", desc: "Ketumbar aromatik dataran tinggi yang disangrai kering sebelum dihaluskan, pemberi kuah aroma harum kari legendaris." },
      { name: "Daun Temurui", desc: "Sering dikenal sebagai daun koja/kari tanah Aceh yang memberikan aroma citrus-tanah yang khas pada Ayam Tangkap dan Mie Aceh." }
    ],
    dance: "Tari Saman Gayo Lues",
    danceDesc: "Tari tepukan dada berderet harmonis sangat cepat yang melambangkan kebersamaan islami dan ketangkasan fisik yang diakui dunia resmi UNESCO.",
    site: "Masjid Raya Baiturrahman",
    siteDesc: "Masjid ikonik abad ke-17 di Banda Aceh yang teguh berdiri tegak lurus menjadi saksi bisu kekuatan spiritual dan keteguhan iman serambi Mekkah."
  },
  sumbar: {
    provinceId: "sumbar",
    title: "Sumatera Barat: Minangkabau",
    subtitle: "RASA REMPAH KARAMEL DARI DAPUR DUNIA",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoOqtKJkISKamFTHGPJX0AV13gwXX1jd8gVDVVZdNhqHZOmOUB-QdvtW1l2IvxaB1eVeFqj5CeFmLNU9cDNoNkR6sSD-PTEE4KteXpPIGB5d1-zh9hdJnqkvIh8a3vEYeHzj09ZAW_k9kv4fNsWJpjJCl91h1VkALYE4NO1BdNrINikW6_oXNKb4QU2DGNDPf12PXXRuXa5ESIcAF2JAT496PHYijUjM9s8_w6_Noiy3S1RoAwjmohKssI-Qe8nAHrMUfb9OVCrqA",
    philosophyTitle: "Filosofi Bajamba & Kearifan Rasa Tradisi Minang",
    philosophyDesc: "Dapur Minangkabau tersohor di kancah global lewat mahakarya kuliner berbumbu tebal dengan teknik memasak karamelisasi minyak kelapa bertahap. Tradisi makan bersama yang agung (Makan Bajamba) melambangkan persamaan derajat tanpa kasta di hadapan tetua adat, alim ulama, dan pemimpin kaum. Makanan Minangkabau didominasi oleh cabai merah, santan murni kental kelapa tua, serta daun kunyit kental beraroma tajam.",
    quote: "Adat basandi syarak, syarak basandi Kitabullah. Alam takambang jadi guru.",
    quoteAuthor: "Falsafah Hidup Adat Minangkabau",
    subKeyAdat: "Pecah Minyak Karambil Tua",
    subKeyAdatDesc: "Teknik memanaskan kuah santan kelapa tua secara lambat hingga ia pecah membentuk minyak rona kemilau emas kemerahan, dasar mutlak kelezatan bumbu kalio masakan rumah.",
    subKeyNgayah: "Makan Bajamba Kebersamaan",
    subKeyNgayahDesc: "Menikmati aneka pangan pusaka dalam satu piring melingkar besar (talam) dengan posisi duduk bersila yang menjunjung tinggi kebersamaan adat luhur.",
    unescoLabel: "WARISAN DUNIA RESMI",
    unescoQuote: "Rendang dinobatkan sebagai salah satu makanan terlezat di dunia karena filosofi rasa, teknik pengawetan alami, kemandirian pangan.",
    dishes: [
      {
        name: "Rendang Daging Sapi",
        rating: "4.9",
        description: "Potongan daging sapi khas gandik pilihan yang dimasak lambat bersama santan kelapa pekat dan racikan bumbu halus berhari-hari hingga cairan menyusut berganti warna menjadi cokelat gelap kehitaman berkaramel kering nan harum luar biasa.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoOqtKJkISKamFTHGPJX0AV13gwXX1jd8gVDVVZdNhqHZOmOUB-QdvtW1l2IvxaB1eVeFqj5CeFmLNU9cDNoNkR6sSD-PTEE4KteXpPIGB5d1-zh9hdJnqkvIh8a3vEYeHzj09ZAW_k9kv4fNsWJpjJCl91h1VkALYE4NO1BdNrINikW6_oXNKb4QU2DGNDPf12PXXRuXa5ESIcAF2JAT496PHYijUjM9s8_w6_Noiy3S1RoAwjmohKssI-Qe8nAHrMUfb9OVCrqA",
        history: "Rendang melambangkan musyawarah mufakat masyarakat Minang. Empat unsur bumbu menandakan rukun kebersamaan adat yang harmonis.",
        ingredients: [
          "1kg daging sapi paha (gandik/grade terbaik)",
          "1000ml santan kelapa tua murni sangat kental",
          "daun kunyit kental, daun jeruk purut, serai memarkan",
          "Bumbu halus prima: 150g cabai merah keriting, 15 bawang merah, 8 bawang putih, 3cm jahe parut, 3cm lengkuas, 1 sdm ketumbar bubuk sangrai, 1/2 sdt pala bubuk, 1/2 sdt jinten bubuk."
        ],
        cookingSteps: [
          "Rebus santan bersama bumbu halus parut, daun kunyit, daun jeruk purut, serai di kuali besi tebal.",
          "Setelah santan mendidih kental dan mengeluarkan sedikit minyak kemilau, masukkan potongan daging sapi.",
          "Kecilkan api kompor ke tingkat minimum. Masak terus sambil sesekali diaduk lembut hingga warna kuah menyusut menjadi cokelat kemerahan (fase Kalio).",
          "Teruskan memasak hingga kelapa ter-karamelisasi berwarna cokelat gelap kehitaman pecah minyak.",
          "Daging sapi akan menjadi hitam pekat dan bumbu mengering menjadi serpihan bumbu minyak kelapa harum khas Minang autentik."
        ]
      },
      {
        name: "Sate Padang",
        rating: "4.8",
        description: "Tusukan sate berbahan lidah atau daging sapi empuk yang dibakar bumbu rempah kuning kunyit kental, lalu disiram saus kental berempah pedas hangat yang dipenuhi bawang goreng renyah di atas ketupat.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_QOSNIuVq7v7vYLltfiFNT1VJVRshVhdXxfO6gnHOeLfNd1vtJ-jvc8Jpgx_bjWY5W1WPXlFPYpUnA9uD7f9zN609kOQ-TzW9QTsMq6_zC76tg-FugpBqF1Wx5_eKY6NXbbZPRrvWLIzwe82h8spqvFp_K4tY0Ow7_GclW3LQy0xOu6yuOVg0KHrp3IbDWdPsE2Wl1IvwWrvwJE0lnK-N73fLFKGrEi7sY2A2KtKzcOTv_RtGpQlK97KziHHo9DeBqoKHtb87Rig",
        history: "Sate Padang lahir dari asimilasi kearifan saus kari kental India-muslim di pesisir barat Sumatra Barat yang digabungkan bersama tradisi membakar daging lokal masyarakat Padang Panjang.",
        ingredients: [
          "500g lidah sapi atau daging gandik sapi, rebus empuk potong dadu",
          "50g tepung beras (pengental saus)",
          "1 liter kaldu rebusan lidah",
          "2 batang daun bawang iris kasar, serai, jahe, asam kandis",
          "Bumbu halus sate: 8 bawang merah, 4 bawang putih, 3cm kunyit segar bakar, 2cm lengkuas, 1 sdm ketumbar, 1/2 sdt merica, jinten."
        ],
        cookingSteps: [
          "Rebus daging/lidah sapi bersama bumbu halus sate kuning hingga meresap empuk, tiriskan lalu tusuk ke batang lidi.",
          "Rebus sisa kaldu kuning bumbu tadi kembali ke kompor.",
          "Larutkan tepung beras dengan sedikit air dingin, tuang ke dalam kaldu kuning mendidih, aduk cepat hingga kuah berubah kental meletup-letup.",
          "Bakar sate lidah di atas bara arang kelapa sebentar hingga wangi cokelat smokey.",
          "Tata ketupat di piring daun, beri sate lidah bakar, lalu siram saus kuning kental hangat melimpah serta taburan bawang merah goreng madu."
        ]
      },
      {
        name: "Dendeng Balado",
        rating: "4.8",
        description: "Irisan tipis daging sapi has dalam yang direbus empuk bumbu ketumbar, lalu digeprek tipis (tokok), digoreng garing, dan dilumuri sambal cabai merah besar tumbuk kasar yang segar asam berminyak kelapa.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl4g61lym0sTJVMkyuT_jz95RW9GRucIo41vQ8kFJbKvW3AU2h6XpinvrwWYzViXiE7avof--IKcgi5oPZI36dcbwiMNVOoHTeTliqT2UPqrv8yLaajp1x1Erz1dE72fFoqaW2FY21WdR6QU3kHlptV4w9QrgKPbK9BaLVRE0_tQjEWCm4T1vKP5PJdwpN1gu72yU22IJNLb4cjFG-QxjU-r-kTs4umqZvyXt2uyPwRhjA9XNKHIAth7fSYzUmx4o0bDBlDNKggWQ",
        history: "Dendeng balado berasal dari taktik kuno mengawetkan daging bekal merantau para pemuda Minang melintasi pegunungan Bukit Barisan yang keras.",
        ingredients: [
          "600g daging sapi has dalam, iris melintang serat tipis",
          "4 bawang putih geprek, 1 sdm ketumbar bubuk murni, air asam jawa",
          "Sambal Balado Kasar: 150g cabai merah kriting besar patah kasar, 10 bawang merah iris kasar, 2 tomat merah kecil, perasan jeruk nipis."
        ],
        cookingSteps: [
          "Rebus sayatan tipis daging sapi bersama bawang putih geprek, ketumbar, garam murni hingga empuk lalu angkat.",
          "Pukul lembut (tokok) setiap daging rebus dengan palu kayu/ulekan hingga melebar tipis tanpa hancur seratnya.",
          "Goreng daging tokok tipis dalam minyak kelapa panas sebentar saja hingga garing kecokelatan kering, tiriskan garing.",
          "Ulek kasar cabai merah besar dan bawang merah. Tumis dalam sisa minyak goreng daging hingga layu wangi tidak bau langu kompor.",
          "Tambahkan perasan jeruk nipis dan garam laut. Siramkan sambal balado berminyak kasar tersebut memenuhi tumpukan daging dendeng garing."
        ]
      },
      {
        name: "Soto Padang Garing",
        rating: "4.7",
        description: "Soto kuah bening sapi beraroma kapulaga pekak pala yang sangat harum, diisi potongan daging sapi goreng garing (crispy), soun sutera, perkedel kentang lembut, kerupuk merah khas Minang, dan sambal cabai giling pedas.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
        history: "Soto Padang mencerminkan kearsipan boga sup rempah tinggi protein peninggalan pesisir barat, biasanya disantap saat cuaca sejuk pegunungan Minang melingkupi perkampungan.",
        ingredients: [
          "500g daging sapi gandik rebus empuk",
          "1.5 liter kaldu sapi murni (sisa rebusan daging)",
          "Satu bungkus rempah soto: 2 pekak, 3 cengkeh, 1 kayu manis, 3 kapulaga, serai daun jeruk",
          "Bahan Pelengkap: soun direndam air hangat, perkedel kentang goreng, kerupuk merah, bawang goreng segar.",
          "Bumbu halus kuah: 8 bawang merah, 4 bawang putih, 2cm jahe, 2cm kunyit bakar, 1 sdt merica."
        ],
        cookingSteps: [
          "Iris tipis daging sapi yang telah direbus empuk, lalu goreng kering garing di minyak panas hingga menjadi renyah (crispy beef strip), sisihkan.",
          "Didihkan kaldu sapi murni bersama rempah soto utuh (pekak, kapulaga, kayu manis) dan daun jeruk purut.",
          "Tumis bumbu halus kuah soto soto Padang hingga wangi matang kering, masukkan dalam kaldu mendidih.",
          "Tata soun sutera, potongan perkedel kentang gurih, dan potongan daging sapi goreng garing di dasar mangkuk.",
          "Siram kuah soto bening berempah panas mendidih di atasnya, beri kerupuk merah remuk, perasan jeruk nipis, dan saus sambal asri."
        ]
      }
    ],
    spices: [
      { name: "Pekak / Bunga Lawang", desc: "Rempah aromatik kering berbentuk bintang yang memberi keharuman rempah manis legendaris dalam rendang dan soto." },
      { name: "Asam Kandis", desc: "Kulit buah yang dikeringkan berasal dari pohon garcinia, pembawa sentuhan rasa asam segar buah alami tanpa merusak warna kuah gulai." },
      { name: "Daun Kunyit Tua", desc: "Daun beraroma tajam harum herbal yang wajib disobek dan diikat simpul dalam pengolahan gulai kari Minangkabau asli." }
    ],
    dance: "Tari Piring Meriah Beling",
    danceDesc: "Tarian dinamis memegang piring kaca dengan jentikan cincin perak sambil melompat di atas pecahan beling tajam tanpa terluka sedikit pun adat.",
    site: "Istano Basa Pagaruyung",
    siteDesc: "Istana megah kayu jati dengan arsitektur atap gonjong khas tanduk kerbau yang melambangkan kekuasaan kebesaran kerajaan rukun adat Minangkabau kuno."
  },
  sulsel: {
    provinceId: "sulsel",
    title: "Sulawesi Selatan: Makassar",
    subtitle: "GURIH GOURMET DARI PESISIR PELAUT TANGGUH",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
    philosophyTitle: "Filosofi Siri' Na Pacce & Karakter Boga Bugis-Makassar",
    philosophyDesc: "Kuliner Bugis-Makassar adalah buah ketangguhan pelaut Phinisi mengarungi laut lepas samudera. Karakter boga Sulawesi Selatan berciri rasa gurih kental berlemak, hangat bumbu jinten merica, serta pemanfaatan bagian jeroan dan daging secara mandiri bermartabat. Hal ini melambangkan prinsip sosiologis adat siri' na pacce (kehormatan diri dan rasa kemanusiaan mendalam) yang membentuk jalinan kuat antar kerabat.",
    quote: "Kualleangi Tallanga na Toalia. Sekali layar terkembang, surut kita berpantang.",
    quoteAuthor: "Semboyan Keteguhan Pelaut Makassar Bugis",
    subKeyAdat: "Kuah Kacang Air Tajin",
    subKeyAdatDesc: "Rahasia kental gurih semerbak kuah Coto yang menggunakan air cuci beras kedua (air tajin) murni yang direbus bersama gilingan kacang tanah sangrai murni.",
    subKeyNgayah: "Seni Meramu Tupat Burasa",
    subKeyNgayahDesc: "Membuat buras (ketupat pipih santan berbalut ganda daun pisang) bersama-sama sanak saudara untuk menyambut Idul Fitri dalam kehangatan rumpun keluarga pesisir.",
    unescoLabel: "PROSES CAGAR BUDAYA",
    unescoQuote: "Perahu Pinisi dan teknik mengarungi laut laut nusantara beriringan dengan taktik pengawetan pakan kering bergizi tinggi nelayan Makassar.",
    dishes: [
      {
        name: "Coto Makassar Tanah Paseng",
        rating: "4.9",
        description: "Sup daging sandung lamur dan jeroan sapi pilihan yang direbus kuah air tajin gurih tebal yang dipadukan kacang tanah sangrai halus, jahe lengkuas harum, disajikan hangat dengan taburan daun bawang bawang goreng madu.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
        history: "Mula-mula diracik di lingkungan istana Kerajaan Gowa abad ke-16 bagi kaum bangsawan pelindung daulat nusantara, lalu menyebar dinikmati meluas sebagai hidangan penyuplai energi nelayan.",
        ingredients: [
          "500g daging sapi has luar gembung",
          "500g jeroan sapi (babat, paru, usus) bersih, rebus terpisah",
          "2 liter air tajin murni kualitas baik",
          "200g kacang tanah sangrai kupas, giling halus blender kering",
          "Bumbu halus: 10 bawang merah, 5 bawang putih, 1 sdm ketumbar, 1 sdt jinten sangrai, 1 sdt merica butir."
        ],
        cookingSteps: [
          "Didihkan air tajin bersama serai, lengkuas memarkan, daun salam, dan jahe.",
          "Masukkan daging sapi, rebus hingga empuk saring busanya.",
          "Tumis bumbu halus dengan sedikit minyak sampai matang harum kering, masukkan ke panci air tajin mendidih.",
          "Tuang gilingan kacang tanah goreng halus, aduk rata hingga kaldu berubah kental berkilauan rasa.",
          "Potong kecil dadu daging jeroan sapi, tata di mangkuk tanah liat kecil, siram kuah coto kental mendidih aromatik."
        ]
      },
      {
        name: "Sop Konro",
        rating: "4.9",
        description: "Potongan iga sapi jumbo berdaging tebal yang empuk, disajikan berkuah cokelat kehitaman pekat beraroma khas buah kluwak tanah, bumbu kapulaga, cengkeh wangi, dan serutan bawang goreng royal murni.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFzpxptBK6ckTBKVTFg_VLKrjH8Tu-R9zb6yNKoCkC4hTqbAEEMbzuhqrBgl1IcN0u7sz4PQI0LZt1A6SbPsZWBU8ZuFJX2Rfo6xUIambINtLnbqjV77096lG_FJ8Kha_pjji9-Od_RA4LJeSHselWwn5vjk-xakgWa31rHL8txQfveBaGqEgmHtB-qi5Oy-OIH-B6_5zekM0Uaa6hSA3KPVANqIj1ouDDUF84aetVx2LzvntI5XMXNZzQAbvr7Wk1ihM5aBuPfdI",
        history: "Sop Konro adalah kuliner pusaka yang awalnya berbahan dasar iga kerbau jantan yang dipotong saat acara kenduri adat pembersihan diri suku Bugis-Makassar kuno.",
        ingredients: [
          "1kg iga sapi (ribs) potong tebal berisi",
          "3 buah kluwek kualitas prima (seduh air panas ambil daging hitamnya)",
          "1 kayu manis, 3 cengkeh, 4 kapulaga utuh aromatik",
          "daun bawang iris kasar, minyak kelapa",
          "Bumbu halus sup: 8 bawang merah, 5 bawang putih, 3 kemiri sangrai, 2cm jahe, 2cm kunyit, 1 sdt ketumbar."
        ],
        cookingSteps: [
          "Rebus iga sapi dlm air melimpah bersama kayu manis, cengkeh, serai, daun salam hingga empuk terkelupas tulang.",
          "Tumis bumbu halus sup bersama pasta hitam kluwek hingga harum semerbak kuno matang.",
          "Tuangkan tumisan bumbu hitam kluwek tersebut ke panci rebusan iga sapi mendidih.",
          "Kecilkan api kompor biar bumbu menyerap ke dalam serat iga sapi tebal minimal 30 menit.",
          "Sajikan Sop Konro hitam pekat melimpah di piring lebar lengkap dng jeruk nipis hangat sambal giling pedas buras."
        ]
      },
      {
        name: "Pallubasa Makassar",
        rating: "4.8",
        description: "Sup daging sapi segar yang mirip dengan coto tetapi memiliki kuah yang lebih gurih tebal berkat campuran kelapa parut sangrai garing (alas) dan kuning telur ayam kampung mentah (tolo') yang diletakkan di atas kuah panas mendidih.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
        history: "Pallubasa adalah panganan rakyat jelata makassar kuno. Jeroan dan tulang dibuang oleh bangsawan diolah kreatif bersama kelapa parut gongseng beralaskan kelezatan mandiri.",
        ingredients: [
          "500g daging sapi has dalam potong tipis dadu",
          "70g kelapa setengah tua parut, sangrai kering berubah kecokelatan halus (alas)",
          "1 butir telur ayam kampung mentah per porsi",
          "Bumbu halus soto: 8 bawang merah, 4 bawang putih, 4 cabai merah kriting, 2 kemiri, 2cm jahe, 1 sdt jenten."
        ],
        cookingSteps: [
          "Goreng kelapa parut di wajan kering tanpa minyak (sangrai) hingga warna cokelat emas tua pekat, haluskan hingga berminyak.",
          "Rebus daging sapi bersama serai di kuah mendidih air kelapa.",
          "Tumis bumbu halus kuning merah hingga matang, masukkan ke panci daging sapi.",
          "Masukkan gilingan kelapa sangrai cokelat (alas) ke panci rebusan, aduk rata kuah kental beraroma kelapa bakar manis.",
          "Sajikan panas di mangkuk, pecahkan satu kuning telur bebek/ayam kampung di tengah sup panas. Nikmati dng buras hangat."
        ]
      },
      {
        name: "Pisang Epe Karim",
        rating: "4.7",
        description: "Pisang kepok setengah matang yang dipanggang datar di atas arang, dijepit/dikempa (epe) hingga pipih rata, dipanggang lagi hingga kecokelatan, lalu disiram saus gula kelapa merah kental beraroma durian/nangka manis.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADzjxRwGtkDzPlNh-BSEcHVrZ-UnqMdLS7MZs0vMADigKgTSkvKNhiOOleB2j_YHyLSUR-NMLeYV2f7_itVyu0E0caGKYn3caJcILhx7u9Vz4KPktkAYFZezAjJyqIOs-3CrPu4AholClh1WcwolLx_NzlkbAvieB33buLbWBsPOFd6TxplHRaaRi9WKhMGLJ_rIc4PG0JxCXjxgtYR_933z98IrWqICA86peIT0SKMsMmPvcrC8Eraasa_wK7oyw7uqCT-DteVkc",
        history: "Pisang Epe adalah teman berkumpul terfavorit di sepanjang perbatasan pantai Losari Makassar sembari menikmati deburan ombak dan megahnya fajar tenggelam jingga.",
        ingredients: [
          "1 sisir Pisang Kepok setengah matang kupas",
          "2 sdm margarin cair pelapis panggang",
          "Saus manis karamel: 200g gula aren merah tua, 100ml air bersih, 2 lembar daun pandan simpul, potongan nangka muda manis."
        ],
        cookingSteps: [
          "Bakar pisang kepok utuh di atas panggangan bara kompor kelapa hingga agak harum layu.",
          "Letakkan pisang bakar di atas papan kayu bersih, jepit perlahan/kempa dengan alat kayu datar hingga pisang pipih tipis padat.",
          "Olesi pisang pipih dengan margarin, panggang kembali di panggangan arang hingga kedua bilah permukaan kering garing berwarna cokelat karamel.",
          "Rebus gula aren merah bersama potongan nangka muda dan pandan wangi hingga kental berminyak wangi manis.",
          "Tata pisang epe pipih di piring, siram kuah nangka gula kelapa kental harum melimpah. Sajikan renyah hangat."
        ]
      }
    ],
    spices: [
      { name: "Kluwek / Pucung", desc: "Biji buah hitam pekat beraroma khas yang direbus matang untuk memberi kuah Sop Konro rasa kacang bersahaja pekat unik." },
      { name: "Alas (Kelapa Gongseng)", desc: "Kelapa parut yang disangrai lama tanpa minyak hingga cokelat keemasan tua dan mengeluarkan minyak kelapa harum khas Sulawesi Selatan." },
      { name: "Jinten Putih Makassar", desc: "Jinten kering yang disangrai harum sebelum ditumbuk, bumbu inti pemberi aroma hangat pada kuah Coto asli." }
    ],
    dance: "Tari Pakarena Kipas",
    danceDesc: "Tari gemulai anggun para gadis Makassar memegang kipas dengan ekspresi tenang sejati, kontras dng tabuhan alat musik genderang gendang karas sangat cepat dinamis.",
    site: "Benteng Rotterdam (Fort Rotterdam)",
    siteDesc: "Benteng pertahanan Kerajaan Gowa-Tallo abad ke-17 di pinggir pantai Makassar berbentuk penyu kokoh yang melambangkan kekuasaan maritim tangguh pesisir."
  },
  jabar: {
    provinceId: "jabar",
    title: "Jawa Barat: Sunda Parahyangan",
    subtitle: "KESEGARAN ALAM BUMI TANAH PASUNDAN",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_QOSNIuVq7v7vYLltfiFNT1VJVRshVhdXxfO6gnHOeLfNd1vtJ-jvc8Jpgx_bjWY5W1WPXlFPYpUnA9uD7f9zN609kOQ-TzW9QTsMq6_zC76tg-FugpBqF1Wx5_eKY6NXbbZPRrvWLIzwe82h8spqvFp_K4tY0Ow7_GclW3LQy0xOu6yuOVg0KHrp3IbDWdPsE2Wl1IvwWrvwJE0lnK-N73fLFKGrEi7sY2A2KtKzcOTv_RtGpQlK97KziHHo9DeBqoKHtb87Rig",
    philosophyTitle: "Filosofi Lalapan & Kearifan Rasa Parahyangan",
    philosophyDesc: "Kuliner Tatar Sunda dihiasi oleh kedekatan spiritual nan luhur kepada kelestarian alam hayati pegunungan (Parahyangan). Filosofi boga Sunda mengutamakan kesegaran mentah lalapan liar, keasaman mangga jeruk kecap manis, serta pedasnya sambal terasi ulek segar. Hidangan Sunda berasa jujur, tidak merusak cita rasa bahan alami, mendatangkan kedamaian batin serta kebersamaan kekeluargaan lewat botram (makan lesehan beralas daun pisang gundul panjang).",
    quote: "Someah Hade ka Semah. Ramah tamah dan luhur budi pekerti dalam menjamu tamu.",
    quoteAuthor: "Falsafah Luhur Kehidupan Suku Sunda",
    subKeyAdat: "Enzim Daun Pepaya Pelunak Sate",
    subKeyAdatDesc: "Kearifan lokal membungkus potongan daging sapi dalam remasan helai daun pepaya kering agar enzim papain melunakkan daging alami tanpa bumbu kimiawi modern.",
    subKeyNgayah: "Seni Botram Silih Asih",
    subKeyNgayahDesc: "Menata nasi liwet hangat panjang di atas helai daun pisang hutan utuh, disantap melingkar lestari bersama-sama segenap warga perkampungan parahyangan.",
    unescoLabel: "SUAKA ALAM NUSANTARA",
    unescoQuote: "Hutan hujan tropis Jawa Barat mendukung budidaya sayuran liar herbal mentah lalap yang bernilai gizi dan antibiotik tinggi.",
    dishes: [
      {
        name: "Sate Maranggi Purwakarta",
        rating: "4.9",
        description: "Tusukan daging sapi has dalam berlemak yang dimarinasi bumbu pekat ketumbar manis kental, dibakar harum karamel di atas arang batok, disajikan bersama irisan sambal tomat segar yang pedas menggelegar.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_QOSNIuVq7v7vYLltfiFNT1VJVRshVhdXxfO6gnHOeLfNd1vtJ-jvc8Jpgx_bjWY5W1WPXlFPYpUnA9uD7f9zN609kOQ-TzW9QTsMq6_zC76tg-FugpBqF1Wx5_eKY6NXbbZPRrvWLIzwe82h8spqvFp_K4tY0Ow7_GclW3LQy0xOu6yuOVg0KHrp3IbDWdPsE2Wl1IvwWrvwJE0lnK-N73fLFKGrEi7sY2A2KtKzcOTv_RtGpQlK97KziHHo9DeBqoKHtb87Rig",
        history: "Buah asimilasi harmonis abad ke-18 antara teknik marinasi manis pedagang Tiongkok penganut asimilasi islam dng tradisi sate gembala lokal Purwakarta Cianjur.",
        ingredients: [
          "600g daging sapi bagian has dalam empuk, potong dadu sedang",
          "100g lemak sapi muda gurih",
          "5 sdm kecap manis kental hitam",
          "daun pepaya pembungkus, air asam Jawa pekat",
          "Bumbu rendaman sate: 2 sdm ketumbar bubuk sangrai, 1 sdm gula merah sisir, 8 bawang merah, 4 bawang putih, 2cm lengkuas parut, jahe."
        ],
        cookingSteps: [
          "Bungkus potongan daging bersama lemak dalam remasan daun pepaya selama 25 menit biar empuk.",
          "Haluskan bumbu rendaman sate, campur dng kecap manis dan air asam Jawa murni.",
          "Keluarkan daging sapi dari bungkusan daun pepaya. Baluri daging dng bumbu rendam manis tadi di mangkuk 30 menit.",
          "Tusuk selang-seling daging dan kemilau lemak tebal pada tusukan bambu sate.",
          "Bakar sate di atas bara api arang batok kelapa hangat sampai berubah warna cokelat karamel harum mengilat, hidangkan dng sambal tomat mentah."
        ]
      },
      {
        name: "Karedok Parahyangan",
        rating: "4.8",
        description: "Mahakarya selada sayur mentah (raw salad) khas Sunda peninggalan leluhur. Campuran kacang panjang, kol, taoge, timun segar yang disiram saus bumbu kacang tanah giling kencur merah basah prima kental pedas gurig.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkChzGOcODwbcdBGC_yL_VhrVsAoKc4WNU_uLMTaPegumvaoqbdp3xbEEwu7tTFGzBXesSzrG3R2G5c2a7XnYF7GqCCtv_fvT8oBoi0L5u6TCLF6v71bGDw-lhgzHBcLD1AJlDzzaGhs7fmH_zkU9scK94tn0PKi6xkotic37Eu89i1tuo_B52sjWOVQ8MQHwAvyLDpzDn0ZkupXHlXFr2PhZH7VamQmv4n_piJge8M_DiemO6wvfts-gTJqU0jm5vj8sL8V6Wh4",
        history: "Karedok awalnya disajikan sebagai hidangan kehormatan menyambut bupati Sumedang Larang yang mengunjungi pesisir sungai Cimanuk, menyiratkan kearifan botani Sunda.",
        ingredients: [
          "100g kacang panjang muda iris bulat tipis mentah",
          "100g kol gurih iris kasar, 50g taoge segar cuci bersih mentah",
          "2 ketimun kecil segar rapi potong kecil",
          "Saus Kacang Kencur: 150g kacang tanah goreng, 3cm kencur segar muda wangi, 1 sdm air asam Jawa, 1 sdm gula aren sisir, terasi bakar, garam."
        ],
        cookingSteps: [
          "Gunakan ulekan batu tradisional (cobek). Ulek cabai, terasi bakar, kencur segar, garam dan gula aren hingga hancur halus.",
          "Masukkan kacang tanah goreng hangat, ulek bertahap kasar sambil dikucuri air asam Jawa hangat sampai saus mengental pekat.",
          "Masukkan sayuran mentah (kacang panjang iris, daun kemangi, kol iris, timun iris, terong bulat kecil) langsung ke cobek batu.",
          "Aduk sayuran mentah dng saus kacang kencur di cobek menggunakan centong atau ulekan kayu secara santun hingga menyelimuti sayuran.",
          "Sajikan segar di wadah piring beralas daun pisang bersama taburan bawang goreng dan kerupuk aci renyah."
        ]
      },
      {
        name: "Nasi Liwet Sunda Sundulan",
        rating: "4.8",
        description: "Nasi aromatik gurih kelapa yang dimasak tradisional dalam kastrol besi tebal bersama sereh, daun salam, bawang merah utuh, cabai rawit merah segar, dan bertaburkan garing asin renyah ikan jambal roti/teri Medan goreng garing.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjcdO9IaHBaPBKLOOgcORvNF1mr2WwbIlGg4aPON-xxkFzzKMcRQT95U9zChELszomMV5Su4IQeCWM1B8O4c7OmBHMG0pXdREhW0Z35wyMieDsOjDrIX5LWHboyMWW2OAuM7hYXAM-KjdweJ6Rik30eRDWu4L7qrZ2lpAJA2HKAataFhzr1-kk3wyQXdpvzKjwVBUiOBaHFB-ugikqTgyrOj9ng1E9_N7KvURXiyS6SBG2iywDDUsjjOVj1ca6G-U1Z5ld6NRP80",
        history: "Nasi Liwet Sunda adalah taktik bekal petani penggarap sawah Parahyangan. Kastrol besi diletakkan langsung di atas kayu bakar di petak sawah sambil terus diawasi menyusutnya air.",
        ingredients: [
          "500g beras putih aromatik cuci bersih",
          "600ml air kaldu atau air bersih secukupnya",
          "10 butir bawang merah kecil kupas utuh bakar sebentar",
          "2 batang serai memarkan, 4 lembar daun salam tua",
          "50g teri Medan/ikan asin jambal roti garing goreng garing, cabai rawit utuh."
        ],
        cookingSteps: [
          "Masukkan beras bersih ke dalam kastrol besi liwet atau rice cooker tebal.",
          "Tata serai memarkan, daun salam tua, dan bawang merah utuh kupas di atas permukaan beras.",
          "Tuangkan air hangat, bumbui dengan sedikit garam laut halus murni, pasang kompor api sedang.",
          "Setelah air menyusut setengah bagian, masukkan taburan garing teri Medan goreng, cabai rawit hijau merah berguguran di atas nasi.",
          "Tutup panci sangat rapat. Kecilkan api kompor sekecil mungkin (lilin). Kukus tanak selama 20 menit hingga terbentuk kerak nasi kering tipis gurih di dasar kastrol."
        ]
      },
      {
        name: "Batagor Prima",
        rating: "4.7",
        description: "Adonan kenyal bakso ikan tenggiri yang dimasukkan ke dalam tahu putih tebal atau kulit pangsit, digoreng garing renyah (crispy), dipotong kasar lalu disiram saus kacang kental manis manis jeruk purut.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjcdO9IaHBaPBKLOOgcORvNF1mr2WwbIlGg4aPON-xxkFzzKMcRQT95U9zChELszomMV5Su4IQeCWM1B8O4c7OmBHMG0pXdREhW0Z35wyMieDsOjDrIX5LWHboyMWW2OAuM7hYXAM-KjdweJ6Rik30eRDWu4L7qrZ2lpAJA2HKAataFhzr1-kk3wyQXdpvzKjwVBUiOBaHFB-ugikqTgyrOj9ng1E9_N7KvURXiyS6SBG2iywDDUsjjOVj1ca6G-U1Z5ld6NRP80",
        history: "Batagor (Bakso Tahu Goreng) lahir di kota kembang Bandung sekitar dekade 1970-an akibat asimilasi jajanan tahu Tionghoa dng bumbu kecap manis kacang khas Sunda jajanan kaki lima.",
        ingredients: [
          "250g daging ikan tenggiri giling super halus",
          "100g tepung sagu tani murni",
          "1 butir telur ayam ras segar, tahu putih tebal belah diagonal",
          "Kulit pangsit garing, minyak kelapa",
          "Saus Kacang: 150g kacang tanah goreng, 3 bawang putih, cabai rawit kering, kecap manis kecap, perasan jeruk limau."
        ],
        cookingSteps: [
          "Campur daging ikan tenggiri giling dng telur ayam, garam kasar, merica, aduk rata.",
          "Masukkan tepung sagu tani murni bertahap sambil diuleni lembut memakai sendok kayu.",
          "Isikan adonan ikan kenyal ke sela-sela tahu belah diagonal kasar atau ke kulit pangsit tipis.",
          "Goreng dalam wajan berisi minyak kelapa melimpah bersuhu sedang hingga tahu dan pangsit merekah cokelat garing renyah keemasan.",
          "Potong batagor garing dng gunting besar, tuang bumbu kacang hangat kental manis kecap perasan jeruk limau."
        ]
      }
    ],
    spices: [
      { name: "Kencur Madu", desc: "Rempah rimpang putih kecil beraroma segar tajam medis pembuka urat rasa, rahasia keharuman utama bumbu Karedok dan seblak." },
      { name: "Ketumbar Garut", desc: "Biji ketumbar sangrai tradisional yang memberi aroma lada rempah manis berkaramel cokelat keemasan pada Sate Maranggi." },
      { name: "Daun Salam Tua", desc: "Helai daun kering pembawa aroma segar hutan pegunungan basah dalam kastrol kuah nasi liwet tradisi Sunda." }
    ],
    dance: "Tari Jaipong Karawang",
    danceDesc: "Tarian Sunda dinamis berdenyut energik memadukan gerakan pencak silat, ketukan kendil kencang, raga tawa ceria suku pasundan.",
    site: "Kawah Putih Ciwidey",
    siteDesc: "Kawah vulkanik belerang putih kehijauan magis di dataran tinggi pegunungan Bandung Selatan, melambangkan keindahan murni eksotika vulkanik Parahyangan."
  },
  papua: {
    provinceId: "papua",
    title: "Papua: Bumi Cendrawasih",
    subtitle: "KEASLIAN ALAM SAGU DARI TIMUR FAJAR",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQwLv1J3l2tnMuOvnXcntYTv6tVoQq001M1EHEEXfvv5Nx46YgZOd1EqMS4e9J4YGyNzXkq00iaNXK5wPPjri25yMkhwxjU2XELmnS9OaeOTQMUTJ3-qDQezInTRzmzDqiIW2TlffCcTMDGi95CO4dK5XQXooorBr8PRIxsPQBWRfHOwQeuD7KvJGCrv5qJjuNzqnQbcV-q2Wnn1QlQuPpB-J0wmU1LFZqfjL_3_pCdERxiMXCSvGwlw07smRzX3FLnJ1fpmwhVjo",
    philosophyTitle: "Filosofi Sagu & Adat Bakar Batu Papua",
    philosophyDesc: "Bumi Papua adalah tanah sakral yang melimpah karunia kemurnian rimba. Sagu bagi masyarakat adat Papua adalah representasi fisik dari pilar kehidupan, ketenangan batin, dan keibuan alam (pangan mulia). Tradisi upacara membakar babi, keladi, dan ubi dalam tumpukan batu membara yang ditutup jerami hangat (Bakar Batu / Barapen) melambangkan rasa syukur yang mendalam atas pemeliharaan Sang Pencipta terhadap kemakmuran hutan Papua, selalu dinikmati bersama ikan kuah kuning hangat.",
    quote: "One People, One Soul. Satu kesatuan jiwa dalam keindahan kemurnian alam rimba timur.",
    quoteAuthor: "Semboyan Kerukunan Adat Papua",
    subKeyAdat: "Penggulung Gata-Gata Bambu",
    subKeyAdatDesc: "Sepasang sumpit jepit bambu khusus tradisional untuk menggulung adonan sagu panas (papeda) menjadi bulatan bening transparan kenyal boga.",
    subKeyNgayah: "Upacara Barapen Bakar Batu",
    subKeyNgayahDesc: "Gotong royong segenap marga suku pegunungan mengumpulkan kayu, batu sungai, jerami hutan mematangkan umbi babi dalam kehangatan uap panas batu.",
    unescoLabel: "WARISAN BIOKERAGAMAN",
    unescoQuote: "Hutan rawa sagu Papua merupakan benteng ketahanan pangan organik karbon rendah terbesar di Asia Pasifik secara ekologis dunia.",
    dishes: [
      {
        name: "Papeda & Ikan Kuah Kuning",
        rating: "4.9",
        description: "Tepung sagu murni matang kenyal bening belendir lembut disajikan mendampingi sup kepala kakap merah kuah kuning kunyit yang pedas pedas segar beraroma kemangi rimba hangat.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQwLv1J3l2tnMuOvnXcntYTv6tVoQq001M1EHEEXfvv5Nx46YgZOd1EqMS4e9J4YGyNzXkq00iaNXK5wPPjri25yMkhwxjU2XELmnS9OaeOTQMUTJ3-qDQezInTRzmzDqiIW2TlffCcTMDGi95CO4dK5XQXooorBr8PRIxsPQBWRfHOwQeuD7KvJGCrv5qJjuNzqnQbcV-q2Wnn1QlQuPpB-J0wmU1LFZqfjL_3_pCdERxiMXCSvGwlw07smRzX3FLnJ1fpmwhVjo",
        history: "Sejarah pangan sagu mengakar dalam relief peradaban Papua purba. Sagu dibilas air sungai hutan murni menjadi bubur perekat rasa, merayakan limpahan bahari ikan sungai pantai.",
        ingredients: [
          "250g tepung sagu murni kualitas premium",
          "1000ml air pegunungan mendidih",
          "500g ikan kakap merah segar potong kepala dan badan",
          "1 genggam daun kemangi segar wangi hutan, kunyit bakar",
          "Bumbu halus kuning rupa: 8 bawang merah, 4 bawang putih, 3 kemiri, 4cm kunyit tua bakar, jahe."
        ],
        cookingSteps: [
          "Papeda: Campur sagu murni dng sedikit air dingin di mangkuk tanah liat tradisional (helai).",
          "Siram larutan sagu dng air mendidih murni secara bertahap sambil diaduk cepat searah jarum jam hingga berubah transparan kenyal mengilap.",
          "Ikan Kuah Kuning: Tumis bumbu kuning halus, serai, daun salam hingga harum segar.",
          "Tuangkan air hangat kunyit kental, didihkan sup kuning tersebut di kompor api sedang.",
          "Masukkan ikan kakap merah, didihkan perlahan hingga ikan melunak empuk gurih, masukkan daun kemangi menjelang diangkat."
        ]
      },
      {
        name: "Ikan Bakar Manokwari",
        rating: "4.8",
        description: "Ikan tongkol atau kuwe kelapa segar laut Papua yang digarang/dibakar mentah tanpa bumbu pelapis, lalu dibalur royal penuh dng ulekan sambal mentah bawang merah cabai rawit merah tumbuk kasar khas pesisir barat.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUGWF6srLGSPe5Ge_OSwMbrKYOM0ipnR_V1qOqaINK62H-3uf_q9kZ8tGMDdIQAMIv59zoJBIuBzN4yxmz0s-_y3kS4LJ2eLxqMoLVbv3R6a8XBB7I8dRuIvHOhUZBPrMBlox5ikDWUcv2sRs4rOPUBdHU7406ZgLLa4ZNHI7xEuF192GeurVG_xMzH3tHDEcVeb6vKy5ApJZ7_JlXOGm4oj-6Ubky-YHviN8qVWQRnT0NZUj1vrRnR_uHNXUa3rk8YuwpDl1TRk",
        history: "Ikan Bakar asli Manokwari adalah santapan utama suku Arfak dan suku pesisir pulau Mansinam peninggalan zaman perahu bercandik kayu.",
        ingredients: [
          "1 ekor ikan tongkol besar segar belah melebar dada",
          "air perasan jeruk nipis ganda, garam laut",
          "Sambal Manokwari Kasar: 15 butir bawang merah tumbuk kasar kasar, 10 cabai rawit merah pedas ketuk, garam laut murni."
        ],
        cookingSteps: [
          "Sayat permukaan kulit ikan tongkol segar, lumuri jeruk nipis garam kelapa, diamkan dingin 15 menit.",
          "Siapkan panggangan arang kelapa panas menganga stabil.",
          "Panggang ikan di atas anyaman kawat bara kelapa langsung tanpa bumbu oles kompor apa pun biar rasa manis ikan terkunci murni.",
          "Bilas bawang merah mentah dng air asin hangat, tumbuk kasar bersama cabai rawit merah hingga mengeluarkan sedikit sari bawang segar.",
          "Letakkan ikan bakar smokey di atas talam nampan kayu, balur rata dng guyuran tumpukan sambal bawang kasar mentah merah pedas segar."
        ]
      },
      {
        name: "Sate Sapi Bumbu Papua",
        rating: "4.7",
        description: "Daging sapi gandik has dalam yang dimarinasi bumbu pekat minyak kelapa hutan, dipanggang di atas bara api kering tanpa kecap manis, menghasilkan sate yang garing luar dan lumer di dalam.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl4g61lym0sTJVMkyuT_jz95RW9GRucIo41vQ8kFJbKvW3AU2h6XpinvrwWYzViXiE7avof--IKcgi5oPZI36dcbwiMNVOoHTeTliqT2UPqrv8yLaajp1x1Erz1dE72fFoqaW2FY21WdR6QU3kHlptV4w9QrgKPbK9BaLVRE0_tQjEWCm4T1vKP5PJdwpN1gu72yU22IJNLb4cjFG-QxjU-r-kTs4umqZvyXt2uyPwRhjA9XNKHIAth7fSYzUmx4o0bDBlDNKggWQ",
        history: "Adaptasi unik kuliner sate di Merauke yang memanfaatkan limpahan ladang peternakan sapi kualitas baik di dataran savana selatan Papua.",
        ingredients: [
          "500g daging sapi has dalam empuk, potong dadu sedang",
          "Bumbu halus marinasi: 4 bawang putih, 3 bawang merah, 1 sdm ketumbar bubuk gayo, air limau, minyak kelapa murni penda."
        ],
        cookingSteps: [
          "Campur daging sapi berserat lunak dng bumbu halus marinasi, minyak kelapa murni hangat.",
          "Tusuk daging pada lidi bambu tebal, padatkan di ujungnya.",
          "Bakar sate di atas bara api arang kayu hingga cokelat garing mengering gurih tajam aroma daging merah panggang.",
          "Sajikan sate merauke panas dng sambal mentah kecap berminyak kelapa sawit tipis."
        ]
      },
      {
        name: "Udang Selingkuh Danau Sentani",
        rating: "4.8",
        description: "Udang jembung air tawar khas Danau Sentani kepiting-udang (selingkuh karena capitnya besar mirip kepiting) yang digoreng mentega/bakar saus asam manis tomat kental.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoOqtKJkISKamFTHGPJX0AV13gwXX1jd8gVDVVZdNhqHZOmOUB-QdvtW1l2IvxaB1eVeFqj5CeFmLNU9cDNoNkR6sSD-PTEE4KteXpPIGB5d1-zh9hdJnqkvIh8a3vEYeHzj09ZAW_k9kv4fNsWJpjJCl91h1VkALYE4NO1BdNrINikW6_oXNKb4QU2DGNDPf12PXXRuXa5ESIcAF2JAT496PHYijUjM9s8_w6_Noiy3S1RoAwjmohKssI-Qe8nAHrMUfb9OVCrqA",
        history: "Udang eksotis ini dinamakan udang selingkuh secara lokal karena penampakan fisiknya yang ajaib: berbadan udang gemuk sehat namun bersenjatakan capit kepiting kokoh.",
        ingredients: [
          "500g udang selingkuh Danau Sentani segar (atau udang galah besar jembung)",
          "Saus manis tomat: 3 bawang merah cincang, 2 bawang putih, 3 sdm saus tomat merah merona, 1 sdm saus tiram, air asam jawa."
        ],
        cookingSteps: [
          "Bersihkan udang selingkuh Sentani, belah punggungnya keluarkan kotoran hitam pasir.",
          "Goreng udang dlm mentega cair panas sebentar sampai capit dan kulit memerah garing merekah, angkat.",
          "Tumis irisan bawang cincang halus di wajan hingga layu harum.",
          "Masukkan saus tomat, saus tiram, sedikit air asam jawa, bumbui sedikit gula garam murni.",
          "Masukkan udang goreng mentega garing tadi ke kuah saus kental manis merah, aduk cepat hingga karamel saus melapisi capit udang."
        ]
      }
    ],
    spices: [
      { name: "Kunyit Tua Merauke", desc: "Rimpang kunyit tua berwarna oranye pekat menyala melimpah zat kurkumin kuratif kurkumin sejati pencerah kuah kuning." },
      { name: "Jahe Rimba Papua", desc: "Jahe liar segar dataran tinggi beraroma segar pedas herbal tinggi penumpas bumbu amis lada ikan pesisir." },
      { name: "Kemangi Hutan Papua", desc: "Dedaunan berhelai lebar wangi citrus tanah aromatik liar segar pendamping mutlak sup kepala ikan kuah kuning." }
    ],
    dance: "Tari Yospan Kegembiraan",
    danceDesc: "Tarian sukaria persahabatan rakyat Papua dengan ketukan kaki bergembira kencang seirama tawa senandung gitar ukulele bambu rimba.",
    site: "Danau Sentani Jayapura",
    siteDesc: "Danau vulkanik luas di lereng cagar gunung Cycloop Jayapura, melambangkan kemegahan tenang eksotika perairan tawar timur fajar."
  },
  maluku: {
    provinceId: "maluku",
    title: "Maluku: Kepulauan Rempah",
    subtitle: "KEHARUMAN PALA EMAS DI JALUR SUTERA LAUT",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEH0s2j9W9SKeCaPu4TG2vtiIutjkH8UtKV0l75scVwMps0fQDkKNu80ZVX4FdREYbgokWShn8RZccQNrj3-7JtGqAm_97Md463-dr_R1AYnTUH__z39SKIpcrB2L2cDqPUA5UqQV216H89q3qMFVW2v_sKqhAq740VfenYnWIpI9w0nwQ_ZwHdRMXlSWduEZoejXD4AqYCIQPdIS958RWjj2YfSLZDbplRd-P1KSRrye9EPYrUJMPF8nSdWmlUmZEyNIl_6ykXN4",
    philosophyTitle: "Filosofi Gandong & Kemuliaan Rempah Pala Banda",
    philosophyDesc: "Dahulu pada abad pertengahan, kepulauan cilik Banda di Maluku diperebutkan berdarah oleh monarki Eropa sebab buah Pala dng cengkeh kering berharga setara emas mulia. Karakter boga Maluku dibangun dari keharuman asri bumbu buah pala segar, kesegaran lemon nipis, dan kelimpahan boga bahari ikan karang segar. Tradisi persaudaraan sejati lintas agama dan rumpun adat (Pela Gandong) menjaga keselarasan hidup bermartabat, tercermin dalam proses memasak bersama.",
    quote: "Potong di kuku rasa di daging. Saling merasakan duka lara persaudaraan sejati Maluku.",
    quoteAuthor: "Falsafah Luhur Persaudaraan Pela Gandong",
    subKeyAdat: "Sari Buah Pala Banda",
    subKeyAdatDesc: "Irisan tipis daging buah pala segar aromatik pedas-manis harum hutan purba yang dimasukkan langsung ke kuah sup asam pedas ikan kakap.",
    subKeyNgayah: "Hari Memanen Cengkeh Banda",
    subKeyNgayahDesc: "Musim mengumpulkan buah cengkih kering keperakan bersama tetangga sekampung, menyanyi bersama berlatar samudra biru Banda yang teduh luas.",
    unescoLabel: "JALUR REMPAH DUNIA UNES",
    unescoQuote: "Kepulauan Banda diakui UNESCO sebagai titik sentral kosmopolis niaga jalur pelayaran rempah laut masa lampau.",
    dishes: [
      {
        name: "Ikan Kuah Pala Banda Legenda",
        rating: "4.9",
        description: "Sup kepala dan daging ikan kakap putih segar dimasak kuah asam pedas beraroma segar belahan buah Pala Banda segar, cengkeh kering harum, serai, kemangi, cabe rawit hijau utuh rupa hangat.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEH0s2j9W9SKeCaPu4TG2vtiIutjkH8UtKV0l75scVwMps0fQDkKNu80ZVX4FdREYbgokWShn8RZccQNrj3-7JtGqAm_97Md463-dr_R1AYnTUH__z39SKIpcrB2L2cDqPUA5UqQV216H89q3qMFVW2v_sKqhAq740VfenYnWIpI9w0nwQ_ZwHdRMXlSWduEZoejXD4AqYCIQPdIS958RWjj2YfSLZDbplRd-P1KSRrye9EPYrUJMPF8nSdWmlUmZEyNIl_6ykXN4",
        history: "Awalnya adalah boga kehormatan menjamu perwira kapal maritim dunia dan bangsawan Banda sejak abad kekuasaan kolonial perebutan rempah-rempah berkarat emas.",
        ingredients: [
          "600g ikan kakap putih segar potong tebal dadu",
          "2 buah Pala Banda segar belah ambil daging putihnya iris",
          "5 kuntum cengkeh kering asli Banda, kunyit bakar",
          "2 sdm air jeruk nipis peras hangat, cabai rawit hijau utuh",
          "Bumbu halus sup: 6 bawang merah, 4 bawang putih, 4 cabai merah keriting, jahe."
        ],
        cookingSteps: [
          "Lumuri ikan putih dng air lemon garam kasar agar netral bau amis, bilas tiriskan segar.",
          "Tumis bumbu halus sup hingga tidak bau langu di minyak kelapa murni.",
          "Tuangkan air pegunungan hangat, didihkan kuah bumbu merah kuning wangi tersebut.",
          "Masukkan potongan buah pala Banda segar dan kuntum cengkeh kering Bandal. Inilah nafas rasa purba kuah.",
          "Masukkan ikan kakap putih, cabai rawit hijau utuh, kecilkan api kompor biar saripati pala meresap serat ikan kakap."
        ]
      },
      {
        name: "Gohu Ikan Maluku (Sashimi Banda)",
        rating: "4.8",
        description: "Potongan kecil ikan tuna segar mentah (raw tuna) yang dicampur aduk dengan minyak kelapa tanusan panas berasap, perasan lemon cina (jeruk kesturi), daun kemangi wangi, taburan kacang tanah goreng tumbuk kasar.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADzjxRwGtkDzPlNh-BSEcHVrZ-UnqMdLS7MZs0vMADigKgTSkvKNhiOOleB2j_YHyLSUR-NMLeYV2f7_itVyu0E0caGKYn3caJcILhx7u9Vz4KPktkAYFZezAjJyqIOs-3CrPu4AholClh1WcwolLx_NzlkbAvieB33buLbWBsPOFd6TxplHRaaRi9WKhMGLJ_rIc4PG0JxCXjxgtYR_933z98IrWqICA86peIT0SKMsMmPvcrC8Eraasa_wK7oyw7uqCT-DteVkc",
        history: "Gohu Ikan lahir dari taktik kilat nelayan Ambon dan Ternate memproses instan ikan tuna tangkapan segar di atas perahu kayu laut lepas.",
        ingredients: [
          "300g ikan tuna merah segar kualitas mentah (sashimi grade), potong dadu 1cm",
          "3 sdm minyak kelapa tanusan asli panas kembang mendidih",
          "2 buah lemon cina (jeruk kesturi) belah ambil air, garam laut",
          "segenggam daun kemangi segar, bawang putih cincang iris.",
          "Pelengkap: 50g kacang tanah goreng kupas, tumbuk kasar renyah."
        ],
        cookingSteps: [
          "Letakkan potongan tuna merah segar dlm mangkuk es kaca dingin.",
          "Kucuri air jeruk nipis kesturi segar dan taburi garam laut murni kasar, aduk pakai sendok dingin.",
          "Tata daun kemangi segar dan irisan bawang merah di atas adonan tuna merah.",
          "Panaskan minyak kelapa murni di wajan kecil sampai mengepul berselimut uap panas berasap.",
          "Siramkan minyak kelapa panas mendidih langsung menyambar daun kemangi dan tuna, aduk rata bertahap, taburi kacang tanah garing kasar renyah."
        ]
      },
      {
        name: "Colo-Colo Pedas",
        rating: "4.7",
        description: "Sambal cair asri legendaris Maluku berbahan irisan bawang merah melimpah, cabai rawit pedas warna-warni, tomat hijau mentah kecil-kecil, dipadukan air perasan limau nipis kesturi dng siraman kecap manis berminyak.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHPnfzQJS5ASgvoYA9WdENpUITXXBTOLrh1L3NbSc7frqov3i0065DORzEviE1SI3D3bZzj6e6vbP4Pn7EnxBNdtxL0qNN8F0Nxjt_ZSs7mdHTMfrH0RaowniCCVQTGheHVBpcpCNWNQRFxiE7R-2TCqwkBOR9VUOj0IZ0RHSn7myt1bo_DQbbdHCJbr-p7b9mNdobVfJBSX14nScoxl2z4ZDSVRqxqsni9tS2U5IAPwzr76Hj77awvBy-veBxjS9swO85doh6JzA",
        history: "Sambal Colo-Colo adalah jodoh murni boga ikan bakar cakalang nelayan kepulauan Maluku, penyemarak pesta pantai pesisir saun Ambon.",
        ingredients: [
          "10 butir bawang merah iris tebal lingkaran",
          "15 cabai rawit merah hijau pedas iris halus bulat",
          "2 tomat hijau mentah kecil potong dadu mungil",
          "jeruk kesturi peras murni, minyak kelapa mentah, kecap manis gurih."
        ],
        cookingSteps: [
          "Campur semua irisan sayur (bawang merah tebal, cabai rawit iris, tomat hijau dadu) dalam mangkuk keramik kecil.",
          "Kucuri royal penuh perasan air jeruk kesturi yang segar kecut harum herbal.",
          "Bumbui garam kasar, sedikit gula kelapa aren.",
          "Rebus sesendok kecil minyak kelapa tanusan panas, tuang hangat ke dalam sambal mentah.",
          "Tambahkan kecap manis kental hitam tebal, aduk rata dng sendok. Sajikan bersama ikan cakalang bakar bambu."
        ]
      },
      {
        name: "Lapis Sagu Ternate",
        rating: "4.7",
        description: "Kue basah berlapis kenyal khas Ternate terbuat dari tepung sagu kelapa manis cokelat gula merah, bertekstur kenyal kenyal wangi adas kayu manis kembang pala Banda.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt62iGtw6Wju0shoXWv0IsZ92JCzTPxSvDEzolZmGg1KAAIscqMfVzCVQKSC09uTdmLDpOazMXAT43NSxO8CgVy638Ma4ieiJL6UKucTiZaPz_gVDOko4BthZdVwcdeWJ0DgEPU8wlJHeJObpJwHVmJaLPE5XOcAr__ATa5YVKfFZl1YAlOgpAr5HqFE1M02uJC5h68Gn_FqfcefxaNAQsBJ-3Wzbg1yhvzpwFWTzpr5OE-Z9qGG1bo8Wm2N1VmaMW0A84MuB_VdA",
        history: "Jajanan manis taktik murni mengawetkan tepung sagu kelapa dng balutan gula kelapa merah tua buatan kesultanan Ternate sejak abad kuno pelayaran perdagangan.",
        ingredients: [
          "200g tepung sagu Ternate prima",
          "150g gula kelapa aren merah sisir parut",
          "600ml santan kelapa sedang gurih",
          "daun pandan wangi, bubuk cengkih kering sepucuk sendok."
        ],
        cookingSteps: [
          "Bagi adonan santan murni tepung sagu menjadi dua wadah.",
          "Wadah A: Campur dng rebusan gula kelapa aren merah pekat dan bubuk cengkeh wangi garing.",
          "Wadah B: Biarkan adonan tepung sagu santan putih gurih murni dng sejumput garam.",
          "Panaskan panci cetakan loyang beralaskan minyak kelapa.",
          "Kukus adonan cokelat A selama 5 menit, lalu siram adonan putih B di atasnya kukus 5 menit bergantian berlapis-lapis hingga tanak kenyal mutlak."
        ]
      }
    ],
    spices: [
      { name: "Pala Banda Kuning", desc: "Daging buah pala segar berwarna kuning pucat beraroma citrus rempah hangat tajam, memberikan keharuman tak lekang waktu bagi masakan Ambon Maluku." },
      { name: "Cengkeh Kering Banda", desc: "Buah bunga kering kering paku berwarna cokelat hitam tua khas Banda murni yang harum menusuk urat rasa masakan." },
      { name: "Lemon Cina (Kesturi)", desc: "Jeruk asam kecil beraroma citrus tropis masam segar pembasmi bau amis ikan laut dalam bumbu mentah tuna Gohu." }
    ],
    dance: "Tari Cakalele Perang",
    danceDesc: "Tari perang laki-laki Maluku memegang parang kayu (salawaku) dng baju merah menyala kegarangan patriotisme leluhur laut.",
    site: "Benteng Belgica Banda Neira",
    siteDesc: "Benteng segi lima megah peninggalan VOC Belanda abad ke-17 di atas bukit pesisir Banda Neira berlatar belakang tegak lurus gunung api Banda sejati.",
  },
  ntt: {
    provinceId: "ntt",
    title: "Nusa Tenggara Timur: Flobamora",
    subtitle: "KEHARUMAN ASAP PUSAKA DARI TANAH KARANG",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJvgVf2kyBQsWip8tEZvAQREscacUsbNYgfEQS3WqIpyGjZ13pTo2Nj-PJNtzbyAcxXV8VI0W6MncivrB96PujL49jV98r_daG4sJQUEfvgdpDCn39yc4rs_IZgmJtKlv4nKjiHaEpZ_XA6R7PSw8tjvh9ZF1TZC7o3BMjCpz48PQcsJ28I2oC7xVn3KkOc_g-EA2Xi20B7xever52mP0dfnMzrCLSnCjSC2-JmZXBuSlmHondVMRf8i6AwvM7SVKME3Jy99wL-P0",
    philosophyTitle: "Filosofi Se'i & Tradisi Memasak Jagung Bose",
    philosophyDesc: "Dapur Nusa Tenggara Timur (kompleks kepulauan Flobamora) bertumpu pada kesabaran memproses pangan di tengah cuaca savana kering berdebu. Tradisi memasak legendaris se'i (pengasapan merata horizontal memakai kayu kosambi dan perlindungan lembaran daun kosambi segar) adalah bentuk rasa hormat mendalam kepada fauna pelindung tanah Kupang Flores Timor. Jagung, keladi, dan kacang-kacangan diolah sederhana namun royal nutrisi demi menjaga kebersamaan adat marga dalam bertani gersang.",
    quote: "Biar rantai besi mengikat leher, adat nenek moyang kupang tak boleh putus.",
    quoteAuthor: "Semboyan Kearifan Adat Flobamora",
    subKeyAdat: "Pengasapan Kayu Kosambi",
    subKeyAdatDesc: "Bara kayu kosambi merah kering stabil yang mengeluarkan asap harum anti-bakteri pembawa warna daging merah muda merona alami legendaris.",
    subKeyNgayah: "Memilin Tenun Khas Alor",
    subKeyNgayahDesc: "Menyulam tenun ikat tradisional sumba bersama tetua marga sembari merebus jagung bose di periuk tanah liat halaman batu keramat adat.",
    unescoLabel: "CAGAR BIO-SAINS DUNIA",
    unescoQuote: "Hutan kayu Kosambi savana NTT diakui dunia karena kekenyalan zat tanin daunnya sebagai pengawet daging merah paling aman alami.",
    dishes: [
      {
        name: "Se'i Sapi Kupang Alami",
        rating: "4.9",
        description: "Daging sapi has luar marinasi bawang putih merica hitam yang diasap lambat tertutup dedaunan kosambi segar selama berjam-jam, menyisakan daging asap merah muda empuk beraroma smokey pekat garing.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJvgVf2kyBQsWip8tEZvAQREscacUsbNYgfEQS3WqIpyGjZ13pTo2Nj-PJNtzbyAcxXV8VI0W6MncivrB96PujL49jV98r_daG4sJQUEfvgdpDCn39yc4rs_IZgmJtKlv4nKjiHaEpZ_XA6R7PSw8tjvh9ZF1TZC7o3BMjCpz48PQcsJ28I2oC7xVn3KkOc_g-EA2Xi20B7xever52mP0dfnMzrCLSnCjSC2-JmZXBuSlmHondVMRf8i6AwvM7SVKME3Jy99wL-P0",
        history: "Se'i mulanya memanfaatkan daging buruan babi hutan liar di pegunungan Timor Kupang, dikembangkan cerdas oleh suku dng memakai daging sapi has luar savana Kupang bernutrisi ganda.",
        ingredients: [
          "800g daging sapi bagian has luar/gandik rendah lemak",
          "daun kosambi segar penutup (atau daun melinjo/pandan wangi tebal)",
          "kayu kosambi kering bakar untuk bara asap murni",
          "Bumbu marinasi daging: 4 siung bawang putih cincang murni, 1 sdm merica bubuk hitam, 1 sdm garam laut murni kasar."
        ],
        cookingSteps: [
          "Sayat memanjang daging sapi searah serat dng ketebalan rata 2cm membujur.",
          "Baluri daging sapi memanjang dng bawang putih cincang, garam laut kasar, dan merica bubuk hitam kasar. Dinginkan semalaman.",
          "Nyalakan kayu kosambi kering di tungku panggangan asap hingga bersisa bara merah berasap tanpa jepitan api luar.",
          "Tata daging sapi di atas anyaman kawat panggangan berjarak 30cm dari bara kayu kosambi.",
          "Tutup rapat permukaan daging dng lembaran tebal daun kosambi segar wangi hingga uap panas asap melingkar mematangkan daging merona merah muda."
        ]
      },
      {
        name: "Jagung Bose Kupang",
        rating: "4.7",
        description: "Bubur legendaris NTT berbahan jagung putih pipilan yang ditumbuk kasar dalam lesung kayu, dimasak slow coook berjam-jam bersama kacang nasi, labu manis, dan guyuran kelapa kental santan gurih.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjcdO9IaHBaPBKLOOgcORvNF1mr2WwbIlGg4aPON-xxkFzzKMcRQT95U9zChELszomMV5Su4IQeCWM1B8O4c7OmBHMG0pXdREhW0Z35wyMieDsOjDrIX5LWHboyMWW2OAuM7hYXAM-KjdweJ6Rik30eRDWu4L7qrZ2lpAJA2HKAataFhzr1-kk3wyQXdpvzKjwVBUiOBaHFB-ugikqTgyrOj9ng1E9_N7KvURXiyS6SBG2iywDDUsjjOVj1ca6G-U1Z5ld6NRP80",
        history: "Jagung Bose merupakan pangan purba pengganti nasi putih di savana kering Flobamora saat musim paceklik kering melanda perbukitan kapur Timor.",
        ingredients: [
          "300g jagung putih tua kering pipil (tumbuk lesung setengah kulit terkelupas)",
          "100g kacang nasi/kacang merah kering, rendam air semalaman",
          "150g labu kuning manis potong dadu kembung",
          "500ml santan kelapa sedang murni, garam kasar."
        ],
        cookingSteps: [
          "Tumbuk jagung putih kering dalam lesung kayu tradisional agar kulit ari tipisnya terkelupas halus.",
          "Rebus jagung tumbuk kupas bersama kacang nasi dlm panci berisi air pegunungan melimpah hingga melunak empuk.",
          "Masukkan potongan dadu labu kuning manis seimbang rasa tanah kering, aduk rata.",
          "Tuangkan santan kelapa sedang, bumbui garam kasar secara royal.",
          "Masak perlahan dng api lilin kecil sambil sesekali diaduk rata hingga sup berubah wujud menjadi bubur kental pulen kuning gurih pekat."
        ]
      },
      {
        name: "Sambal Lu'at NTT",
        rating: "4.8",
        description: "Sambal fermentasi segar asam pedas ekstrem khas Kupang dari tumbukan cabai rawit merah pedas pegunungan, dicampur irisan daun kemangi segar, parutan kulit jeruk purut segar, difermentasi dlm toples asri.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHPnfzQJS5ASgvoYA9WdENpUITXXBTOLrh1L3NbSc7frqov3i0065DORzEviE1SI3D3bZzj6e6vbP4Pn7EnxBNdtxL0qNN8F0Nxjt_ZSs7mdHTMfrH0RaowniCCVQTGheHVBpcpCNWNQRFxiE7R-2TCqwkBOR9VUOj0IZ0RHSn7myt1bo_DQbbdHCJbr-p7b9mNdobVfJBSX14nScoxl2z4ZDSVRqxqsni9tS2U5IAPwzr76Hj77awvBy-veBxjS9swO85doh6JzA",
        history: "Sambal Lu'at adalah belahan jiwa wajib pendamping se'i sapi asap, memberikan rasa kecut citrus dng rasa pedas ekstrem penetralisir lemak daging.",
        ingredients: [
          "150g cabai rawit merah kecil pedas Kupang",
          "1 genggam daun kemangi segar wangi, potong kasar",
          "1 sdm parutan halus kulit jeruk purut hijau wangi",
          "jeruk nipis kesturi air peras, garam laut murni kasar."
        ],
        cookingSteps: [
          "Tumbuk kasar cabai rawit merah bersama garam laut kasar di cobek batu.",
          "Masukkan cincangan daun kemangi segar wangi hutan dan parutan halus kulit jeruk purut.",
          "Kucuri air jeruk nipis kesturi murni royal penuh, aduk pakai sendok kayu.",
          "Masukkan adonan sambal asri ke dalam wadah toples kaca kedap udara.",
          "Diamkan dalam suhu ruangan selama minimal 2 hari (fermentasi) hingga mengeluarkan senyawa asam laktat segar pedas tajam penata boga."
        ]
      },
      {
        name: "Kolo (Nasi Bambu Timor)",
        rating: "4.8",
        description: "Beras merah aromatik tradisional dicampur bumbu rempah daun salam kelapa, dimasukkan ke dalam sekat selongsong bambu muda hutan beralas pisang, lalu dibakar di atas nyala bara api tegak lurus.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt62iGtw6Wju0shoXWv0IsZ92JCzTPxSvDEzolZmGg1KAAIscqMfVzCVQKSC09uTdmLDpOazMXAT43NSxO8CgVy638Ma4ieiJL6UKucTiZaPz_gVDOko4BthZdVwcdeWJ0DgEPU8wlJHeJObpJwHVmJaLPE5XOcAr__ATa5YVKfFZl1YAlOgpAr5HqFE1M02uJC5h68Gn_FqfcefxaNAQsBJ-3Wzbg1yhvzpwFWTzpr5OE-Z9qGG1bo8Wm2N1VmaMW0A84MuB_VdA",
        history: "Kolo adalah boga upacara adat Penti rasa syukur suku Manggarai Flores atas panen raya padi merah gogo di kebun ulayat pegunungan.",
        ingredients: [
          "300g Beras merah gogo Flores atau beras ketan hitam aromatik",
          "250ml santan kelapa sedang gurih",
          "bambu muda panjang bersih sekat diameter 7cm membujur",
          "daun pisang tua fleksibel pembungkus dasar, garam.",
          "Bumbu iris: 3 bawang merah, serai bagian putih."
        ],
        cookingSteps: [
          "Adonan Beras: Campur beras merah gogo bersih dng santan sedang gurih, bawang merah iris, sereh memarkan dan garam.",
          "Gulung beras merah berbumbu rapat dlm selembar daun pisang fleksibel menyerupai tabung cerobong.",
          "Masukkan tabung daun isi beras ke dalam lobang silinder bambu muda hingga pas menempati ruang bawah.",
          "Tutup rapat ujung atas bambu dng kepalan daun pisang kering.",
          "Sandarkan batang bambu condong tegak lurus bersandingan dengan bara api arang kayu menyala. Bakar perlahan membalikkan bambu secara berkala selama 50 menit hingga selongsong bambu hangus kehitaman kering matang."
        ]
      }
    ],
    spices: [
      { name: "Daun Kosambi Segar", desc: "Dedaunan dengan kadar tanin pembunuh bakteri tinggi yang dipetik dari pohon kosambi savana, penutup mutlak daging pengasapan Se'i." },
      { name: "Kulit Jeruk Purut", desc: "Parutan halus kulit jeruk purut kering beraroma sitrus herbal menyengat wangi pembuat aroma segar Sambal Lu'at." },
      { name: "Jagung Putih Savana", desc: "Varietas jagung putih endemik NTT bernutrisi padat bertekstur pulen yang ditumbuk lesung kayu boga bersejarah." }
    ],
    dance: "Tari Caci Flores Pertarungan",
    danceDesc: "Tari pertarungan cambuk kulit kerbau pemuda Flores Manggarai mengenakan topeng hiasan bulu ekor kuda dng tameng anyaman kancah patriot.",
    site: "Taman Nasional Komodo",
    siteDesc: "Pulau purba savana gersang rumah spesies kadal raksasa purba Komodo di Manggarai Barat, salah satu keajaiban alam warisan dunia UNESCO terdepan."
  }
};

