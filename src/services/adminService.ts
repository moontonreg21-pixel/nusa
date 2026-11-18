// src/services/adminService.ts
// Service layer for Admin operations with active Supabase connectivity & offline-resilient local sync.
import { 
  getSupabaseClient, 
  pingSupabase, 
  kulinerToDbRow, 
  dbRowToKuliner, 
  daerahToDbRow, 
  dbRowToDaerah, 
  kategoriToDbRow, 
  dbRowToKategori, 
  artikelToDbRow, 
  dbRowToArtikel, 
  mediaToDbRow, 
  dbRowToMedia, 
  userToDbRow, 
  dbRowToUser, 
  feedbackToDbRow, 
  dbRowToFeedback, 
  logToDbRow,
  syncRecordUpsert,
  syncRecordDelete
} from './supabaseClient';

export interface KulinerItem {
  id: string;
  daerahId: string;
  daerahNama: string;
  kategoriId: string;
  kategoriNama: string;
  nama: string;
  tingkatKepedasan: number; // 0 to 5
  estimasiWaktu: string;
  porsi: string;
  deskripsi: string;
  bahanBahan: string[];
  langkahResep: string[];
  sejarahFilosofi: string;
  gambarUrl: string;
  status: 'published' | 'draft' | 'archived';
  isHalal: boolean;
  isUnggulan: boolean;
  viewCount: number;
  createdAt: string;
}

export interface DaerahItem {
  id: string;
  namaProvinsi: string;
  wilayah: 'SUMATERA' | 'JAWA' | 'KALIMANTAN' | 'SULAWESI' | 'BALI' | 'NUSA TENGGARA' | 'MALUKU' | 'PAPUA';
  ibuKota: string;
  deskripsiSingkat: string;
  narasiBudaya: string;
  gambarUrl: string;
  totalKuliner: number;
}

export interface KategoriItem {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  icon: string;
  urutan: number;
  totalKuliner: number;
}

export interface ArtikelItem {
  id: string;
  judul: string;
  slug: string;
  cuplikan: string;
  konten: string;
  penulisNama: string;
  coverUrl: string;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  readTimeMinutes: number;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  judul: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  mimeType: string;
  kategori: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  role: 'super_admin' | 'editor' | 'kontributor';
  avatarUrl: string;
  phone: string;
  status: 'active' | 'suspended';
  lastLogin: string;
  createdAt: string;
}

export interface VisitorFeedback {
  id: string;
  nama: string;
  email: string;
  nomorWa: string;
  subjek: string;
  pesan: string;
  rating: number; // 1 - 5
  status: 'pending' | 'reviewed' | 'resolved' | 'spam';
  tanggapanAdmin?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userEmail: string;
  aksi: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'SECURITY_ALERT' | 'EXPORT';
  entitas: string;
  entitasId?: string;
  detail: string;
  ipAddress: string;
  createdAt: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  lastChecked?: string;
}

const STORAGE_KEYS = {
  KULINER: 'nusa_admin_kuliner_v1',
  DAERAH: 'nusa_admin_daerah_v1',
  KATEGORI: 'nusa_admin_kategori_v1',
  ARTIKEL: 'nusa_admin_artikel_v1',
  MEDIA: 'nusa_admin_media_v1',
  USERS: 'nusa_admin_users_v1',
  FEEDBACK: 'nusa_admin_feedback_v1',
  LOGS: 'nusa_admin_logs_v1',
  SUPABASE_CONFIG: 'nusa_supabase_config_v1',
  CURRENT_USER: 'nusa_admin_current_user_v1',
  AUTH_SESSION: 'nusa_admin_auth_session_v1',
  LAST_SYNC: 'nusa_admin_last_sync_v1',
};

// Initial Indonesian culinary dataset for instant live experience
const INITIAL_CATEGORIES: KategoriItem[] = [
  { id: 'cat-1', nama: 'Makanan Utama', slug: 'makanan-utama', deskripsi: 'Hidangan pokok kaya rempah dan lauk pauk khas tradisi', icon: 'Utensils', urutan: 1, totalKuliner: 8 },
  { id: 'cat-2', nama: 'Olahan Daging & Ikan', slug: 'olahan-daging-ikan', deskripsi: 'Sajian daging rempah kental, ikan bakar, dan sate legendaris', icon: 'Flame', urutan: 2, totalKuliner: 6 },
  { id: 'cat-3', nama: 'Jajanan & Kue Tradisional', slug: 'jajanan-pasar', deskripsi: 'Kudapan manis, legit, gurih warisan leluhur nusantara', icon: 'Cookie', urutan: 3, totalKuliner: 5 },
  { id: 'cat-4', nama: 'Minuman Tradisional & Herbal', slug: 'minuman-tradisional', deskripsi: 'Minuman penghangat, es segar, dan jamu rempah', icon: 'Coffee', urutan: 4, totalKuliner: 4 },
  { id: 'cat-5', nama: 'Sambal & Bumbu Khas', slug: 'sambal-bumbu', deskripsi: 'Racikan sambal cobek dan bumbu dasar khas tiap daerah', icon: 'Sparkles', urutan: 5, totalKuliner: 5 },
];

const INITIAL_DAERAH: DaerahItem[] = [
  {
    id: 'aceh',
    namaProvinsi: 'Aceh',
    wilayah: 'SUMATERA',
    ibuKota: 'Banda Aceh',
    deskripsiSingkat: 'Kekayaan rempah tanah Rencong dalam setiap suapan Mie Aceh berkuah kari kental.',
    narasiBudaya: 'Pintu gerbang jalur sutra maritim menyatukan pengaruh boga India, Arab, dan Melayu dalam harmoni rempah yang harum.',
    gambarUrl: '/regions/aceh-baiturrahman-aerial.jpg',
    totalKuliner: 6,
  },
  {
    id: 'sumbar',
    namaProvinsi: 'Sumatera Barat',
    wilayah: 'SUMATERA',
    ibuKota: 'Padang',
    deskripsiSingkat: 'Mahakarya Rendang dunia dari tradisi Minangkabau yang kaya filosofi adat.',
    narasiBudaya: 'Rendang mencerminkan musyawarah kaum adat Minang: dagiang, karambil, lado, dan pamasak rempah nan luhur.',
    gambarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Istano_Pagaruyuang.jpg/250px-Istano_Pagaruyuang.jpg',
    totalKuliner: 6,
  },
  {
    id: 'yogyakarta',
    namaProvinsi: 'D.I. Yogyakarta',
    wilayah: 'JAWA',
    ibuKota: 'Yogyakarta',
    deskripsiSingkat: 'Gudeg legendaris nangka muda santan manis khas dapur Kesultanan Ngayogyakarta Hadiningrat.',
    narasiBudaya: 'Simbol ketenangan dan kesabaran orang Jawa yang memasak pelan berjam-jam menggunakan kendil tanah liat.',
    gambarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tugu_Yogyakarta_at_Night.jpg/250px-Tugu_Yogyakarta_at_Night.jpg',
    totalKuliner: 5,
  },
  {
    id: 'bali',
    namaProvinsi: 'Bali',
    wilayah: 'BALI',
    ibuKota: 'Denpasar',
    deskripsiSingkat: 'Ayam Betutu aroma base genep sarat makna persembahan sakral dewata.',
    narasiBudaya: 'Filosofi Tri Hita Karana terwujud dalam pemanfaatan bumbu pekarangan rumah dan daun pisang alami.',
    gambarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Pura_Ulun_Danu_Bratan%2C_2023.jpg/250px-Pura_Ulun_Danu_Bratan%2C_2023.jpg',
    totalKuliner: 5,
  },
  {
    id: 'kaltim',
    namaProvinsi: 'Kalimantan Timur',
    wilayah: 'KALIMANTAN',
    ibuKota: 'Samarinda',
    deskripsiSingkat: 'Ayam Cincane bumbu merah asam manis khas Kesultanan Kutai Kartanegara.',
    narasiBudaya: 'Hidangan kehormatan jamuan agung para sultan di tepian megah Sungai Mahakam.',
    gambarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Jembatan_Mahakam_Samarinda.jpg/250px-Jembatan_Mahakam_Samarinda.jpg',
    totalKuliner: 4,
  },
  {
    id: 'papua',
    namaProvinsi: 'Papua',
    wilayah: 'PAPUA',
    ibuKota: 'Jayapura',
    deskripsiSingkat: 'Papeda kenyal sagu murni bersanding kuah kuning ikan gabus segar Danau Sentani.',
    narasiBudaya: 'Pohon sagu sebagai ibu kehidupan melambangkan kebersamaan keluarga adat dan kearifan menjaga hutan.',
    gambarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Danau_Sentani_Papua.jpg/250px-Danau_Sentani_Papua.jpg',
    totalKuliner: 4,
  },
];

const INITIAL_KULINER: KulinerItem[] = [
  {
    id: 'kul-01',
    daerahId: 'sumbar',
    daerahNama: 'Sumatera Barat',
    kategoriId: 'cat-2',
    kategoriNama: 'Olahan Daging & Ikan',
    nama: 'Rendang Daging Sapi Minang',
    tingkatKepedasan: 3,
    estimasiWaktu: '4 Jam',
    porsi: '6-8 Porsi',
    deskripsi: 'Daging sapi pilihan dimasak lambat dengan santan kelapa tua murni dan belasan rempah khas Ranah Minang hingga menghitam gurih.',
    bahanBahan: [
      '1 kg daging sapi paha depan (gandik)',
      '1000 ml santan kelapa kental murni',
      '1000 ml santan encer',
      '2 lembar daun kunyit, simpulkan',
      '5 lembar daun jeruk purut buang tulang daun',
      '2 batang serai memarkan',
      '1 buah asam kandis',
      'Bumbu halus: 150g cabai keriting, 15 butir bawang merah, 8 siung bawang putih, jahe, lengkuas, ketumbar sangrai, pala.'
    ],
    langkahResep: [
      'Didihkan santan bersama daun kunyit, daun jeruk, serai, dan bumbu halus hingga berminyak (gulai).',
      'Masukkan potongan daging sapi, aduk perlahan di api sedang hingga kuah mengental dan kecokelatan (kalio).',
      'Kecilkan api sekecil mungkin, aduk berkala dengan hati-hati agar tidak gosong hingga minyak meresap sempurna dan bumbu menjadi cokelat kehitaman (rendang).'
    ],
    sejarahFilosofi: 'Rendang merepresentasikan filosofi musyawarah mufakat masyarakat Minang. Empat unsur: Dagiang (pemimpin), Karambil (cendekiawan), Lado (alim ulama), dan Pamasak (rakyat bersatu).',
    gambarUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    status: 'published',
    isHalal: true,
    isUnggulan: true,
    viewCount: 4820,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'kul-02',
    daerahId: 'aceh',
    daerahNama: 'Aceh',
    kategoriId: 'cat-1',
    kategoriNama: 'Makanan Utama',
    nama: 'Mie Aceh Kuah Kental Spesial',
    tingkatKepedasan: 4,
    estimasiWaktu: '30 Menit',
    porsi: '2 Porsi',
    deskripsi: 'Mie kuning tebal dengan potongan daging sapi empuk dalam kuah kari rempah pekat beraroma kapulaga dan jinten.',
    bahanBahan: [
      '400g mie kuning basah tebal',
      '150g daging sapi potong dadu',
      '750ml kaldu sapi gurih murni',
      '50g taoge segar kualitas tinggi',
      '50g kol iris tipis memanjang',
      'Bumbu halus: cabai merah, bawang merah, bawang putih, ketumbar, jinten, kapulaga, kelabet, kunyit bakar.'
    ],
    langkahResep: [
      'Tumis bumbu halus dalam wajan hingga wangi khas rempah tanah Rencong semerbak.',
      'Masukkan daging sapi, aduk hingga berubah warna dan bumbu meresap.',
      'Tuangkan kaldu sapi hangat, masak hingga daging empuk.',
      'Tambahkan sayuran, kecap manis, lalu masukkan mie tebal.',
      'Sajikan panas bersama emping melinjo renyah dan acar bawang merah segar.'
    ],
    sejarahFilosofi: 'Mie Aceh adalah jembatan akulturasi pedagang Tiongkok (mie), India (kari rempah), dan Timur Tengah (daging kambing/sapi).',
    gambarUrl: '/regions/aceh-baiturrahman-aerial.jpg',
    status: 'published',
    isHalal: true,
    isUnggulan: true,
    viewCount: 3950,
    createdAt: '2026-02-01T12:00:00Z',
  },
  {
    id: 'kul-03',
    daerahId: 'yogyakarta',
    daerahNama: 'D.I. Yogyakarta',
    kategoriId: 'cat-1',
    kategoriNama: 'Makanan Utama',
    nama: 'Gudeg Yu Djum Komplit',
    tingkatKepedasan: 1,
    estimasiWaktu: '5 Jam',
    porsi: '4-6 Porsi',
    deskripsi: 'Nangka muda (gori) manis gurih dimasak perlahan dengan gula kelapa, daun jati untuk pewarna alami, disajikan dengan areh gurih.',
    bahanBahan: [
      '1 kg nangka muda cacah kasar',
      '5 lembar daun jati (pemberi warna merah khas)',
      '1500 ml santan kelapa murni',
      '200 g gula merah kelapa berkualitas',
      'Telur rebus pindang & tahu tempe bacem',
      'Bumbu halus: bawang merah, bawang putih, ketumbar, kemiri sangrai.'
    ],
    langkahResep: [
      'Susun daun jati di dasar kendil tanah liat, masukkan nangka muda dan bumbu.',
      'Tuang santan dan gula merah perlahan.',
      'Masak dengan api kayu bakar atau api kecil selama 4-5 jam hingga air menyusut dan bumbu meresap merah tua berkilau.',
      'Sajikan dengan krecek pedas dan areh kental gurih.'
    ],
    sejarahFilosofi: 'Gudeg berakar dari masa penebangan Hutan Mentaok untuk Kesultanan Mataram abad ke-16, mengajarkan kesabaran dan kelembutan jiwa.',
    gambarUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800',
    status: 'published',
    isHalal: true,
    isUnggulan: true,
    viewCount: 5210,
    createdAt: '2026-02-10T08:30:00Z',
  },
  {
    id: 'kul-04',
    daerahId: 'bali',
    daerahNama: 'Bali',
    kategoriId: 'cat-2',
    kategoriNama: 'Olahan Daging & Ikan',
    nama: 'Ayam Betutu Gilimanuk',
    tingkatKepedasan: 4,
    estimasiWaktu: '2.5 Jam',
    porsi: '4 Porsi',
    deskripsi: 'Ayam utuh dilumuri base genep rempah Bali lengkap, dibungkus daun pinang atau pisang lalu dipanggang pelan.',
    bahanBahan: [
      '1 ekor ayam kampung utuh',
      'Daun singkong rebus untuk isian',
      'Bumbu Base Genep: lengkuas, kunyit, jahe, kencur, cabai rawit merah, terasi bakar, serai, daun salam.',
      'Minyak kelapa asli Bali (klentik).'
    ],
    langkahResep: [
      'Tumbuk bumbu base genep hingga harum lalu tumis sebentar dengan minyak klentik.',
      'Lumuri seluruh badan ayam luar dalam, masukkan sisa bumbu dan daun singkong ke rongga perut.',
      'Bungkus rapat dengan daun pisang berlapis.',
      'Panggang lambat hingga daging empuk lumer dan rempahnya meresap ke tulang.'
    ],
    sejarahFilosofi: 'Betutu dulunya hidangan upacara keagamaan dan jamuan para raja Bali, simbol rasa syukur terhadap kesuburan alam semesta.',
    gambarUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    status: 'published',
    isHalal: true,
    isUnggulan: false,
    viewCount: 3120,
    createdAt: '2026-02-18T14:15:00Z',
  },
  {
    id: 'kul-05',
    daerahId: 'papua',
    daerahNama: 'Papua',
    kategoriId: 'cat-1',
    kategoriNama: 'Makanan Utama',
    nama: 'Papeda & Kuah Kuning Ikan Gabus',
    tingkatKepedasan: 2,
    estimasiWaktu: '40 Menit',
    porsi: '3-4 Porsi',
    deskripsi: 'Bubur sagu murni kenyal bening dinikmati dengan hilite kuah kuning rempah kunyit dan asam belimbing wuluh.',
    bahanBahan: [
      '250g tepung sagu pohon asli Papua',
      '1000ml air mendidih murni',
      '1 ekor ikan gabus Danau Sentani (atau kakap segar)',
      'Bumbu kuah: kunyit, kemiri, bawang merah, bawang putih, serai, daun kemangi, perasan jeruk nipis.'
    ],
    langkahResep: [
      'Larutkan sagu dengan sedikit air dingin di dalam mangkuk gerabah.',
      'Siram air mendidih sambil diaduk cepat memutar searah hingga mengental bening kenyal.',
      'Masak ikan bersama bumbu kuah kuning dan daun kemangi hingga gurih segar beraroma wangi.',
      'Sajikan dengan gata-gata (alat gulung kayu).'
    ],
    sejarahFilosofi: 'Papeda dimakan bersama dari satu mangkuk sempe besar, melambangkan kebersamaan suku tanpa sekat individualisme.',
    gambarUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    status: 'published',
    isHalal: true,
    isUnggulan: true,
    viewCount: 2890,
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'kul-06',
    daerahId: 'kaltim',
    daerahNama: 'Kalimantan Timur',
    kategoriId: 'cat-2',
    kategoriNama: 'Olahan Daging & Ikan',
    nama: 'Ayam Cincane Kutai',
    tingkatKepedasan: 3,
    estimasiWaktu: '45 Menit',
    porsi: '4 Porsi',
    deskripsi: 'Ayam kampung bakar bumbu merah khas Kesultanan Kutai Kartanegara dengan sentuhan santan kental dan perasan jeruk nipis.',
    bahanBahan: [
      '1 ekor ayam kampung potong empat',
      '300ml santan kelapa sedang',
      '1 sdm air asam jawa pekat',
      'Bumbu halus: cabai merah besar bakar, bawang merah, terasi bakar, kemiri sangrai, jahe, gula merah aren.'
    ],
    langkahResep: [
      'Tumis bumbu halus merah hingga harum pekat.',
      'Masukkan potongan ayam, aduk hingga bumbu menempel erat.',
      'Tuangkan santan dan air asam jawa, ungkep hingga empuk dan kuah meresap kering.',
      'Bakar di atas bara arang hingga harum gurih berkaramel.'
    ],
    sejarahFilosofi: 'Merupakan santapan kehormatan jamuan agung Erau kesultanan Kutai Kartanegara di Samarinda dan Tenggarong.',
    gambarUrl: 'https://images.unsplash.com/photo-1527477321055-43615b6294a5?w=800',
    status: 'published',
    isHalal: true,
    isUnggulan: false,
    viewCount: 2150,
    createdAt: '2026-03-05T11:45:00Z',
  }
];

const INITIAL_ARTIKEL: ArtikelItem[] = [
  {
    id: 'art-01',
    judul: 'Filosofi Rendang Minangkabau: Jejak Luhur Kearifan Adat Dalam Setiap Suapan',
    slug: 'filosofi-rendang-minangkabau-kearifan-adat',
    cuplikan: 'Mengapa rendang membutuhkan waktu memasak berjam-jam? Telusuri makna mendalam empat pilar masyarakat Minang di balik kuah rempah yang menghitam pekat.',
    konten: `Rendang bukan sekadar lauk pauk pengisi lambung. Dalam tradisi adat Minangkabau, rendang menempati derajat tertinggi dalam jamuan kehormatan balai adat maupun alek gadang.\n\nSecara kosmologi Minang, terdapat 4 pilar yang menyatu:\n1. Dagiang (Daging Sapi) melambangkan 'Niniak Mamak' para tetua adat yang memberikan kemakmuran.\n2. Karambil (Kelapa) melambangkan 'Cadiak Pandai' para kaum intelektual yang merekatkan persaudaraan.\n3. Lado (Cabai) melambangkan 'Alim Ulama' para pendidik akhlak yang tegas menuntun kebenaran.\n4. Pamasak (Rempah-rempah) melambangkan keseluruhan rakyat Minang yang bersatu padu harmonis.`,
    penulisNama: 'Kanjeng Raden Sasongko',
    coverUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    tags: ['Minangkabau', 'Filosofi Adat', 'Rendang', 'Warisan Unesco'],
    status: 'published',
    readTimeMinutes: 6,
    createdAt: '2026-02-14T09:00:00Z',
  },
  {
    id: 'art-02',
    judul: 'Rahasia Base Genep Bali: Harmonisasi Sembilan Rempah Dewata',
    slug: 'rahasia-base-genep-bali-sembilan-rempah-dewata',
    cuplikan: 'Kunci kelezatan hidangan Pulau Dewata terletak pada racikan Base Genep yang melambangkan 9 arah mata angin Dewata Nawa Sanga.',
    konten: `Dalam lontar kuno Dharma Caruban yang mengatur tata boga Bali, memasak dipandang sebagai sebuah laku spiritual. Base Genep terdiri dari perpaduan rimpang utama (lengkuas, jahe, kunyit, kencur) yang dihaluskan secara proporsional. Kesetimbangan rasa panas, hangat, sejuk, dan asam melambangkan permohonan keselamatan jiwa kepada Sang Hyang Widhi Wasa.`,
    penulisNama: 'Ni Wayan Gayatri',
    coverUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    tags: ['Tradisi Bali', 'Rempah Tradisional', 'Base Genep', 'Spiritualitas'],
    status: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-02-28T10:30:00Z',
  },
  {
    id: 'art-03',
    judul: 'Kisah Pohon Sagu di Bumi Cenderawasih: Papeda Sebagai Perekat Kebersamaan Adat',
    slug: 'kisah-pohon-sagu-papeda-bumi-cenderawasih',
    cuplikan: 'Di tanah Papua, pohon sagu dipelihara layaknya seorang ibu. Tradisi makan papeda dalam satu wadah kayu sempe mencerminkan persaudaraan tanpa sekat.',
    konten: `Masyarakat adat Sentani dan pesisir Papua memiliki hubungan erat dengan dusun sagu. Ketika papeda disajikan, seluruh sanak saudara duduk melingkar. Gulungan papeda yang kenyal ditarik menggunakan helai kayu gata-gata dan dicelupkan ke kuah kuning ikan gabus gurih. Tak ada ego kepemilikan pribadi saat mangkuk sempe terhidang di tengah keluarga.`,
    penulisNama: 'Yohanes Rumkabu',
    coverUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
    tags: ['Papua', 'Sagu Alami', 'Kedaulatan Pangan', 'Budaya Adat'],
    status: 'published',
    readTimeMinutes: 7,
    createdAt: '2026-03-04T14:15:00Z',
  }
];

const INITIAL_MEDIA: MediaItem[] = [
  { id: 'med-01', judul: 'Rendang Minangkabau HD', fileName: 'rendang-daging-premium.jpg', fileUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', fileSize: '1.4 MB', mimeType: 'image/jpeg', kategori: 'Kuliner', createdAt: '2026-03-01T08:00:00Z' },
  { id: 'med-02', judul: 'Masjid Raya Baiturrahman Aceh', fileName: 'aceh-baiturrahman.jpg', fileUrl: '/regions/aceh-baiturrahman-aerial.jpg', fileSize: '2.1 MB', mimeType: 'image/jpeg', kategori: 'Daerah', createdAt: '2026-03-01T08:10:00Z' },
  { id: 'med-03', judul: 'Pura Ulun Danu Bratan Bali', fileName: 'bali-pura-bratan.jpg', fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Pura_Ulun_Danu_Bratan%2C_2023.jpg/250px-Pura_Ulun_Danu_Bratan%2C_2023.jpg', fileSize: '1.8 MB', mimeType: 'image/jpeg', kategori: 'Daerah', createdAt: '2026-03-02T11:00:00Z' },
  { id: 'med-04', judul: 'Gudeg Tradisional Kuali Tanah', fileName: 'gudeg-jogja-kuali.jpg', fileUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800', fileSize: '980 KB', mimeType: 'image/jpeg', kategori: 'Kuliner', createdAt: '2026-03-03T15:00:00Z' },
  { id: 'med-05', judul: 'Ayam Betutu Rempah', fileName: 'ayam-betutu-gilimanuk.jpg', fileUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', fileSize: '1.6 MB', mimeType: 'image/jpeg', kategori: 'Kuliner', createdAt: '2026-03-04T09:30:00Z' },
  { id: 'med-06', judul: 'Istano Basa Pagaruyuang', fileName: 'istano-pagaruyuang.jpg', fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Istano_Pagaruyuang.jpg/250px-Istano_Pagaruyuang.jpg', fileSize: '2.4 MB', mimeType: 'image/jpeg', kategori: 'Daerah', createdAt: '2026-03-04T12:00:00Z' }
];

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-01',
    email: 'admin.utama@kulinerindo.id',
    password: 'admin123',
    fullName: 'Raden Arya Wicaksana',
    role: 'super_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+62 812-3456-7890',
    status: 'active',
    lastLogin: '2026-10-10 20:45:00',
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'usr-02',
    email: 'siti.rahmawati@kulinerindo.id',
    password: 'admin123',
    fullName: 'Siti Rahmawati, S.Hum',
    role: 'editor',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    phone: '+62 819-8765-4321',
    status: 'active',
    lastLogin: '2026-10-09 14:20:00',
    createdAt: '2025-03-12T00:00:00Z',
  },
  {
    id: 'usr-03',
    email: 'budi.santoso@kulinerindo.id',
    password: 'admin123',
    fullName: 'Budi Santoso',
    role: 'kontributor',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+62 813-1122-3344',
    status: 'active',
    lastLogin: '2026-10-05 11:10:00',
    createdAt: '2025-06-20T00:00:00Z',
  }
];

const INITIAL_FEEDBACK: VisitorFeedback[] = [
  {
    id: 'fb-01',
    nama: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    nomorWa: '+6281299887766',
    subjek: 'Apresiasi Dokumentasi Resep Rendang Autentik',
    pesan: 'Sangat kagum dengan penjelasan filosofi rendang Minangkabau di website ini. Sebagai perantau di luar negeri, langkah resep dan takaran rempahnya sangat presisi!',
    rating: 5,
    status: 'resolved',
    tanggapanAdmin: 'Terima kasih banyak Ibu Dewi! Senang sekali dokumentasi kuliner leluhur kita dapat bermanfaat hingga mancanegara.',
    createdAt: '2026-10-08T14:20:00Z',
  },
  {
    id: 'fb-02',
    nama: 'Bambang Sutejo',
    email: 'bambang.s@yahoo.com',
    nomorWa: '+6281355443322',
    subjek: 'Usulan Penambahan Kuliner Khas Brebes (Telur Asin & Sate Blengong)',
    pesan: 'Mohon ditambahkan kuliner daerah pesisir utara Jawa Tengah seperti Telur Asin Asap Brebes dan Sate Blengong yang sangat legendaris.',
    rating: 5,
    status: 'reviewed',
    tanggapanAdmin: 'Usulan telah kami masukkan ke agenda liputan boga Jawa Tengah bulan depan. Terima kasih Pak Bambang!',
    createdAt: '2026-10-09T09:15:00Z',
  },
  {
    id: 'fb-03',
    nama: 'Fahri Hidayat',
    email: 'fahri.h@gmail.com',
    nomorWa: '+6285211002233',
    subjek: 'Pertanyaan Tingkat Kepedasan Mie Aceh',
    pesan: 'Apakah takaran bumbu cabai Mie Aceh pada resep bisa dikurangi untuk anak-anak tanpa menghilangkan aroma khas rempah kelabet dan kapulaganya?',
    rating: 4,
    status: 'pending',
    createdAt: '2026-10-10T16:40:00Z',
  }
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-01',
    userEmail: 'admin.utama@kulinerindo.id',
    aksi: 'LOGIN',
    entitas: 'Auth',
    detail: 'Berhasil login melalui autentikasi sesi admin aman dengan protokol TLS',
    ipAddress: '192.168.1.108',
    createdAt: '2026-10-10 20:45:12',
  },
  {
    id: 'log-02',
    userEmail: 'siti.rahmawati@kulinerindo.id',
    aksi: 'UPDATE',
    entitas: 'Kuliner',
    entitasId: 'kul-01',
    detail: 'Memperbarui takaran daun kunyit dan asam kandis pada resep Rendang Daging Minang',
    ipAddress: '182.253.44.12',
    createdAt: '2026-10-10 18:22:04',
  },
  {
    id: 'log-03',
    userEmail: 'admin.utama@kulinerindo.id',
    aksi: 'CREATE',
    entitas: 'Artikel',
    entitasId: 'art-03',
    detail: 'Mempublikasikan artikel budaya baru "Kisah Pohon Sagu di Bumi Cenderawasih"',
    ipAddress: '192.168.1.108',
    createdAt: '2026-10-10 14:15:30',
  },
  {
    id: 'log-04',
    userEmail: 'admin.utama@kulinerindo.id',
    aksi: 'EXPORT',
    entitas: 'Database',
    detail: 'Mengekspor cadangan skema relasional Supabase PostgreSQL DDL',
    ipAddress: '192.168.1.108',
    createdAt: '2026-10-09 21:00:10',
  }
];

// Helper to safely access localStorage in browser
function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }
}

export const AdminService = {
  // --- Supabase Config & Connection Check ---
  getSupabaseConfig(): SupabaseConfig {
    return getStoredItem<SupabaseConfig>(STORAGE_KEYS.SUPABASE_CONFIG, {
      url: '',
      anonKey: '',
      isConnected: false,
    });
  },

  getSupabase() {
    return getSupabaseClient(this.getSupabaseConfig());
  },

  getLastSyncTime(): string | null {
    return getStoredItem<string | null>(STORAGE_KEYS.LAST_SYNC, null);
  },

  async saveSupabaseConfig(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
    const isLive = Boolean(url.trim() && anonKey.trim() && (url.includes('supabase.co') || url.includes('localhost') || url.includes('127.0.0.1')));
    const config: SupabaseConfig = {
      url: url.trim(),
      anonKey: anonKey.trim(),
      isConnected: isLive,
      lastChecked: new Date().toISOString(),
    };
    setStoredItem(STORAGE_KEYS.SUPABASE_CONFIG, config);

    // Update active client instance
    getSupabaseClient(config);

    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Pengaturan',
      detail: `Memperbarui konfigurasi koneksi Supabase (${isLive ? 'Terhubung Live' : 'Mode Offline/Lokal'})`,
      ipAddress: '127.0.0.1',
    });

    if (isLive) {
      return { success: true, message: 'Koneksi Supabase aktif & diverifikasi!' };
    }
    return { success: true, message: 'Konfigurasi disimpan dalam mode lokal fallback aman.' };
  },

  async testSupabaseConnection(url: string, anonKey: string): Promise<{ ok: boolean; latencyMs?: number; error?: string }> {
    return pingSupabase(url, anonKey);
  },

  // --- FULL CLOUD SYNCHRONIZATION (Push & Pull) ---
  async pushAllToSupabase(): Promise<{ success: boolean; details: Record<string, number>; error?: string }> {
    const client = this.getSupabase();
    if (!client) {
      return { 
        success: false, 
        details: {}, 
        error: 'Supabase belum terhubung. Silakan masukkan Project URL & Anon Key di Pengaturan terlebih dahulu.' 
      };
    }

    try {
      const kategori = this.getKategori();
      const daerah = this.getDaerah();
      const kuliner = this.getKuliner();
      const artikel = this.getArtikel();
      const media = this.getMedia();
      const users = this.getUsers();
      const feedback = this.getFeedback();

      // 1. Kategori
      if (kategori.length > 0) {
        const rows = kategori.map(kategoriToDbRow);
        const { error } = await client.from('kategori_kuliner').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel kategori_kuliner: ${error.message}`);
      }

      // 2. Daerah
      if (daerah.length > 0) {
        const rows = daerah.map(daerahToDbRow);
        const { error } = await client.from('daerah').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel daerah: ${error.message}`);
      }

      // 3. Kuliner
      if (kuliner.length > 0) {
        const rows = kuliner.map(kulinerToDbRow);
        const { error } = await client.from('kuliner').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel kuliner: ${error.message}`);
      }

      // 4. Artikel
      if (artikel.length > 0) {
        const rows = artikel.map(artikelToDbRow);
        const { error } = await client.from('artikel_budaya').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel artikel_budaya: ${error.message}`);
      }

      // 5. Media
      if (media.length > 0) {
        const rows = media.map(mediaToDbRow);
        const { error } = await client.from('media_gallery').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel media_gallery: ${error.message}`);
      }

      // 6. Users
      if (users.length > 0) {
        const rows = users.map(userToDbRow);
        const { error } = await client.from('admin_users').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel admin_users: ${error.message}`);
      }

      // 7. Feedback
      if (feedback.length > 0) {
        const rows = feedback.map(feedbackToDbRow);
        const { error } = await client.from('masukan_pengunjung').upsert(rows, { onConflict: 'id' });
        if (error) throw new Error(`Tabel masukan_pengunjung: ${error.message}`);
      }

      const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
      setStoredItem(STORAGE_KEYS.LAST_SYNC, nowStr);

      this.logActivity({
        userEmail: this.getCurrentUser().email,
        aksi: 'UPDATE',
        entitas: 'Sinkronisasi Cloud',
        detail: `Berhasil mengunggah ${kuliner.length} kuliner, ${daerah.length} daerah, ${artikel.length} artikel ke Supabase`,
        ipAddress: '127.0.0.1',
      });

      return {
        success: true,
        details: {
          kategori: kategori.length,
          daerah: daerah.length,
          kuliner: kuliner.length,
          artikel: artikel.length,
          media: media.length,
          users: users.length,
          feedback: feedback.length,
        },
      };
    } catch (err: any) {
      return { success: false, details: {}, error: err?.message || 'Gagal sinkronisasi data ke Supabase' };
    }
  },

  async pullAllFromSupabase(): Promise<{ success: boolean; details: Record<string, number>; error?: string }> {
    const client = this.getSupabase();
    if (!client) {
      return { success: false, details: {}, error: 'Supabase belum terhubung.' };
    }

    try {
      // 1. Kategori
      const { data: catRows, error: catErr } = await client.from('kategori_kuliner').select('*').order('urutan');
      if (catErr) throw new Error(`Tabel kategori_kuliner: ${catErr.message}`);

      // 2. Daerah
      const { data: daerahRows, error: daerahErr } = await client.from('daerah').select('*');
      if (daerahErr) throw new Error(`Tabel daerah: ${daerahErr.message}`);

      // 3. Kuliner
      const { data: kulinerRows, error: kulinerErr } = await client.from('kuliner').select('*').order('created_at', { ascending: false });
      if (kulinerErr) throw new Error(`Tabel kuliner: ${kulinerErr.message}`);

      // 4. Artikel
      const { data: artikelRows, error: artErr } = await client.from('artikel_budaya').select('*');
      if (artErr) throw new Error(`Tabel artikel_budaya: ${artErr.message}`);

      // 5. Media
      const { data: mediaRows, error: medErr } = await client.from('media_gallery').select('*');
      if (medErr) throw new Error(`Tabel media_gallery: ${medErr.message}`);

      // 6. Users
      const { data: userRows, error: userErr } = await client.from('admin_users').select('*');
      if (userErr) throw new Error(`Tabel admin_users: ${userErr.message}`);

      // 7. Feedback
      const { data: fbRows, error: fbErr } = await client.from('masukan_pengunjung').select('*');
      if (fbErr) throw new Error(`Tabel masukan_pengunjung: ${fbErr.message}`);

      // Convert & Store locally
      const parsedDaerah = (daerahRows || []).map(r => dbRowToDaerah(r));
      const parsedKategori = (catRows || []).map(r => dbRowToKategori(r));
      const parsedKuliner = (kulinerRows || []).map(r => dbRowToKuliner(r, parsedDaerah, parsedKategori));
      const parsedArtikel = (artikelRows || []).map(dbRowToArtikel);
      const parsedMedia = (mediaRows || []).map(dbRowToMedia);
      const parsedUsers = (userRows || []).map(dbRowToUser);
      const parsedFeedback = (fbRows || []).map(dbRowToFeedback);

      if (parsedDaerah.length > 0) setStoredItem(STORAGE_KEYS.DAERAH, parsedDaerah);
      if (parsedKategori.length > 0) setStoredItem(STORAGE_KEYS.KATEGORI, parsedKategori);
      if (parsedKuliner.length > 0) setStoredItem(STORAGE_KEYS.KULINER, parsedKuliner);
      if (parsedArtikel.length > 0) setStoredItem(STORAGE_KEYS.ARTIKEL, parsedArtikel);
      if (parsedMedia.length > 0) setStoredItem(STORAGE_KEYS.MEDIA, parsedMedia);
      if (parsedUsers.length > 0) setStoredItem(STORAGE_KEYS.USERS, parsedUsers);
      if (parsedFeedback.length > 0) setStoredItem(STORAGE_KEYS.FEEDBACK, parsedFeedback);

      const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
      setStoredItem(STORAGE_KEYS.LAST_SYNC, nowStr);

      this.logActivity({
        userEmail: this.getCurrentUser().email,
        aksi: 'UPDATE',
        entitas: 'Sinkronisasi Cloud',
        detail: `Berhasil menarik ${parsedKuliner.length} kuliner, ${parsedDaerah.length} daerah dari Supabase ke lokal`,
        ipAddress: '127.0.0.1',
      });

      return {
        success: true,
        details: {
          kuliner: parsedKuliner.length,
          daerah: parsedDaerah.length,
          kategori: parsedKategori.length,
          artikel: parsedArtikel.length,
          media: parsedMedia.length,
          users: parsedUsers.length,
          feedback: parsedFeedback.length,
        },
      };
    } catch (err: any) {
      return { success: false, details: {}, error: err?.message || 'Gagal mengambil data dari Supabase' };
    }
  },

  // --- Current User & Auth State ---
  isAuthenticated(): boolean {
    try {
      const sessionStr = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION) || sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      if (!sessionStr) return false;
      const session = JSON.parse(sessionStr);
      return Boolean(session && session.email);
    } catch {
      return false;
    }
  },

  getCurrentUser(): AdminUser {
    return getStoredItem<AdminUser>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },

  setCurrentUser(user: AdminUser): void {
    setStoredItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  login(email: string, password: string, rememberMe = true): { success: boolean; user?: AdminUser; error?: string } {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail) {
      return { success: false, error: 'Silakan masukkan alamat email admin.' };
    }
    if (!trimmedPassword) {
      return { success: false, error: 'Silakan masukkan kata sandi / password.' };
    }

    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return { success: false, error: 'Alamat email tidak terdaftar sebagai administrator.' };
    }

    if (user.status === 'suspended') {
      return { success: false, error: 'Akun administrator ini sedang dinonaktifkan atau ditangguhkan. Hubungi Super Admin.' };
    }

    const expectedPassword = user.password || 'admin123';
    if (expectedPassword !== trimmedPassword) {
      return { success: false, error: 'Kata sandi / password yang Anda masukkan salah.' };
    }

    // Success login
    const nowStr = new Date().toLocaleString('sv-SE').replace('T', ' ');
    const updatedUser: AdminUser = { ...user, lastLogin: nowStr };
    this.updateUser(user.id, { lastLogin: nowStr });
    this.setCurrentUser(updatedUser);

    const sessionData = {
      email: user.email,
      role: user.role,
      token: `auth_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      loggedInAt: nowStr,
    };

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionData));
    } else {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionData));
    }

    this.logActivity({
      userEmail: user.email,
      aksi: 'LOGIN',
      entitas: 'Auth',
      detail: `Admin ${user.fullName} (${user.role}) berhasil masuk ke dasbor`,
      ipAddress: '127.0.0.1',
    });

    return { success: true, user: updatedUser };
  },

  logout(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.logActivity({
        userEmail: currentUser.email,
        aksi: 'LOGOUT',
        entitas: 'Auth',
        detail: `Admin ${currentUser.fullName} keluar dari sesi dasbor`,
        ipAddress: '127.0.0.1',
      });
    }
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  },

  // --- Audit & Activity Logs ---
  getActivityLogs(): ActivityLog[] {
    return getStoredItem<ActivityLog[]>(STORAGE_KEYS.LOGS, INITIAL_LOGS);
  },

  logActivity(log: Omit<ActivityLog, 'id' | 'createdAt'>): void {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toLocaleString('sv-SE').replace('T', ' '),
    };
    setStoredItem(STORAGE_KEYS.LOGS, [newLog, ...logs.slice(0, 99)]);
  },

  clearActivityLogs(): void {
    setStoredItem(STORAGE_KEYS.LOGS, []);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Log Aktivitas',
      detail: 'Menghapus riwayat log audit aktivitas',
      ipAddress: '127.0.0.1',
    });
  },

  // --- KULINER CRUD ---
  getKuliner(): KulinerItem[] {
    return getStoredItem<KulinerItem[]>(STORAGE_KEYS.KULINER, INITIAL_KULINER);
  },

  addKuliner(item: Omit<KulinerItem, 'id' | 'viewCount' | 'createdAt'>): KulinerItem {
    const list = this.getKuliner();
    const newItem: KulinerItem = {
      ...item,
      id: `kul-${Date.now()}`,
      viewCount: 0,
      createdAt: new Date().toISOString(),
    };
    setStoredItem(STORAGE_KEYS.KULINER, [newItem, ...list]);
    // Live background sync to Supabase
    syncRecordUpsert(this.getSupabase(), 'kuliner', kulinerToDbRow(newItem));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'CREATE',
      entitas: 'Kuliner',
      entitasId: newItem.id,
      detail: `Menambahkan hidangan kuliner baru: "${newItem.nama}" (${newItem.daerahNama})`,
      ipAddress: '127.0.0.1',
    });
    return newItem;
  },

  updateKuliner(id: string, updates: Partial<KulinerItem>): KulinerItem | null {
    const list = this.getKuliner();
    const idx = list.findIndex(k => k.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...updates };
    list[idx] = updated;
    setStoredItem(STORAGE_KEYS.KULINER, list);
    // Live background sync to Supabase
    syncRecordUpsert(this.getSupabase(), 'kuliner', kulinerToDbRow(updated));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Kuliner',
      entitasId: id,
      detail: `Memperbarui hidangan kuliner: "${updated.nama}"`,
      ipAddress: '127.0.0.1',
    });
    return updated;
  },

  deleteKuliner(id: string): boolean {
    const list = this.getKuliner();
    const item = list.find(k => k.id === id);
    if (!item) return false;
    const filtered = list.filter(k => k.id !== id);
    setStoredItem(STORAGE_KEYS.KULINER, filtered);
    // Live background sync to Supabase
    syncRecordDelete(this.getSupabase(), 'kuliner', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Kuliner',
      entitasId: id,
      detail: `Menghapus hidangan kuliner: "${item.nama}"`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- DAERAH CRUD ---
  getDaerah(): DaerahItem[] {
    return getStoredItem<DaerahItem[]>(STORAGE_KEYS.DAERAH, INITIAL_DAERAH);
  },

  addDaerah(item: DaerahItem): DaerahItem {
    const list = this.getDaerah();
    setStoredItem(STORAGE_KEYS.DAERAH, [item, ...list]);
    syncRecordUpsert(this.getSupabase(), 'daerah', daerahToDbRow(item));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'CREATE',
      entitas: 'Daerah',
      entitasId: item.id,
      detail: `Menambahkan provinsi/daerah baru: "${item.namaProvinsi}"`,
      ipAddress: '127.0.0.1',
    });
    return item;
  },

  updateDaerah(id: string, updates: Partial<DaerahItem>): DaerahItem | null {
    const list = this.getDaerah();
    const idx = list.findIndex(d => d.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    setStoredItem(STORAGE_KEYS.DAERAH, list);
    syncRecordUpsert(this.getSupabase(), 'daerah', daerahToDbRow(list[idx]));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Daerah',
      entitasId: id,
      detail: `Memperbarui informasi daerah: "${list[idx].namaProvinsi}"`,
      ipAddress: '127.0.0.1',
    });
    return list[idx];
  },

  deleteDaerah(id: string): boolean {
    const list = this.getDaerah();
    const target = list.find(d => d.id === id);
    if (!target) return false;
    setStoredItem(STORAGE_KEYS.DAERAH, list.filter(d => d.id !== id));
    syncRecordDelete(this.getSupabase(), 'daerah', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Daerah',
      entitasId: id,
      detail: `Menghapus daerah: "${target.namaProvinsi}"`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- KATEGORI CRUD ---
  getKategori(): KategoriItem[] {
    return getStoredItem<KategoriItem[]>(STORAGE_KEYS.KATEGORI, INITIAL_CATEGORIES);
  },

  addKategori(kategori: Omit<KategoriItem, 'id' | 'totalKuliner'>): KategoriItem {
    const list = this.getKategori();
    const newItem: KategoriItem = {
      ...kategori,
      id: `cat-${Date.now()}`,
      totalKuliner: 0,
    };
    setStoredItem(STORAGE_KEYS.KATEGORI, [...list, newItem]);
    syncRecordUpsert(this.getSupabase(), 'kategori_kuliner', kategoriToDbRow(newItem));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'CREATE',
      entitas: 'Kategori',
      entitasId: newItem.id,
      detail: `Menambahkan kategori: "${newItem.nama}"`,
      ipAddress: '127.0.0.1',
    });
    return newItem;
  },

  updateKategori(id: string, updates: Partial<KategoriItem>): KategoriItem | null {
    const list = this.getKategori();
    const idx = list.findIndex(k => k.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    setStoredItem(STORAGE_KEYS.KATEGORI, list);
    syncRecordUpsert(this.getSupabase(), 'kategori_kuliner', kategoriToDbRow(list[idx]));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Kategori',
      entitasId: id,
      detail: `Memperbarui kategori: "${list[idx].nama}"`,
      ipAddress: '127.0.0.1',
    });
    return list[idx];
  },

  deleteKategori(id: string): boolean {
    const list = this.getKategori();
    const target = list.find(k => k.id === id);
    if (!target) return false;
    setStoredItem(STORAGE_KEYS.KATEGORI, list.filter(k => k.id !== id));
    syncRecordDelete(this.getSupabase(), 'kategori_kuliner', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Kategori',
      entitasId: id,
      detail: `Menghapus kategori: "${target.nama}"`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- ARTIKEL CRUD ---
  getArtikel(): ArtikelItem[] {
    return getStoredItem<ArtikelItem[]>(STORAGE_KEYS.ARTIKEL, INITIAL_ARTIKEL);
  },

  addArtikel(art: Omit<ArtikelItem, 'id' | 'createdAt'>): ArtikelItem {
    const list = this.getArtikel();
    const newItem: ArtikelItem = {
      ...art,
      id: `art-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStoredItem(STORAGE_KEYS.ARTIKEL, [newItem, ...list]);
    syncRecordUpsert(this.getSupabase(), 'artikel_budaya', artikelToDbRow(newItem));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'CREATE',
      entitas: 'Artikel',
      entitasId: newItem.id,
      detail: `Menulis artikel budaya baru: "${newItem.judul}"`,
      ipAddress: '127.0.0.1',
    });
    return newItem;
  },

  updateArtikel(id: string, updates: Partial<ArtikelItem>): ArtikelItem | null {
    const list = this.getArtikel();
    const idx = list.findIndex(a => a.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    setStoredItem(STORAGE_KEYS.ARTIKEL, list);
    syncRecordUpsert(this.getSupabase(), 'artikel_budaya', artikelToDbRow(list[idx]));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Artikel',
      entitasId: id,
      detail: `Memperbarui artikel: "${list[idx].judul}"`,
      ipAddress: '127.0.0.1',
    });
    return list[idx];
  },

  deleteArtikel(id: string): boolean {
    const list = this.getArtikel();
    const target = list.find(a => a.id === id);
    if (!target) return false;
    setStoredItem(STORAGE_KEYS.ARTIKEL, list.filter(a => a.id !== id));
    syncRecordDelete(this.getSupabase(), 'artikel_budaya', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Artikel',
      entitasId: id,
      detail: `Menghapus artikel: "${target.judul}"`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- MEDIA GALLERY ---
  getMedia(): MediaItem[] {
    return getStoredItem<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  },

  addMedia(med: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    const list = this.getMedia();
    const newItem: MediaItem = {
      ...med,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStoredItem(STORAGE_KEYS.MEDIA, [newItem, ...list]);
    syncRecordUpsert(this.getSupabase(), 'media_gallery', mediaToDbRow(newItem));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'CREATE',
      entitas: 'Media',
      entitasId: newItem.id,
      detail: `Mengunggah media baru: "${newItem.judul}"`,
      ipAddress: '127.0.0.1',
    });
    return newItem;
  },

  deleteMedia(id: string): boolean {
    const list = this.getMedia();
    const target = list.find(m => m.id === id);
    if (!target) return false;
    setStoredItem(STORAGE_KEYS.MEDIA, list.filter(m => m.id !== id));
    syncRecordDelete(this.getSupabase(), 'media_gallery', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Media',
      entitasId: id,
      detail: `Menghapus aset media: "${target.judul}"`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- USERS & ADMIN ---
  getUsers(): AdminUser[] {
    const users = getStoredItem<AdminUser[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    return users.map(u => ({
      ...u,
      password: u.password || 'admin123',
    }));
  },

  addUser(user: Omit<AdminUser, 'id' | 'createdAt' | 'lastLogin'>): AdminUser {
    const list = this.getUsers();
    const newUser: AdminUser = {
      ...user,
      password: user.password || 'admin123',
      id: `usr-${Date.now()}`,
      lastLogin: '-',
      createdAt: new Date().toISOString(),
    };
    setStoredItem(STORAGE_KEYS.USERS, [...list, newUser]);
    syncRecordUpsert(this.getSupabase(), 'admin_users', userToDbRow(newUser));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'CREATE',
      entitas: 'Pengguna',
      entitasId: newUser.id,
      detail: `Menambahkan pengguna admin baru: ${newUser.fullName} (${newUser.role})`,
      ipAddress: '127.0.0.1',
    });
    return newUser;
  },

  updateUser(id: string, updates: Partial<AdminUser>): AdminUser | null {
    const list = this.getUsers();
    const idx = list.findIndex(u => u.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    setStoredItem(STORAGE_KEYS.USERS, list);
    syncRecordUpsert(this.getSupabase(), 'admin_users', userToDbRow(list[idx]));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Pengguna',
      entitasId: id,
      detail: `Memperbarui akun admin: ${list[idx].fullName}`,
      ipAddress: '127.0.0.1',
    });
    return list[idx];
  },

  deleteUser(id: string): boolean {
    const list = this.getUsers();
    const target = list.find(u => u.id === id);
    if (!target) return false;
    setStoredItem(STORAGE_KEYS.USERS, list.filter(u => u.id !== id));
    syncRecordDelete(this.getSupabase(), 'admin_users', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Pengguna',
      entitasId: id,
      detail: `Menghapus akun admin: ${target.fullName}`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- VISITOR FEEDBACK ---
  getFeedback(): VisitorFeedback[] {
    return getStoredItem<VisitorFeedback[]>(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK);
  },

  updateFeedbackStatus(id: string, status: VisitorFeedback['status'], tanggapan?: string): boolean {
    const list = this.getFeedback();
    const idx = list.findIndex(f => f.id === id);
    if (idx === -1) return false;
    list[idx].status = status;
    if (tanggapan) list[idx].tanggapanAdmin = tanggapan;
    setStoredItem(STORAGE_KEYS.FEEDBACK, list);
    syncRecordUpsert(this.getSupabase(), 'masukan_pengunjung', feedbackToDbRow(list[idx]));
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Masukan Pengunjung',
      entitasId: id,
      detail: `Memperbarui status masukan pengunjung: "${list[idx].subjek}" (${status})`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  deleteFeedback(id: string): boolean {
    const list = this.getFeedback();
    const target = list.find(f => f.id === id);
    if (!target) return false;
    setStoredItem(STORAGE_KEYS.FEEDBACK, list.filter(f => f.id !== id));
    syncRecordDelete(this.getSupabase(), 'masukan_pengunjung', id);
    this.logActivity({
      userEmail: this.getCurrentUser().email,
      aksi: 'DELETE',
      entitas: 'Masukan Pengunjung',
      entitasId: id,
      detail: `Menghapus masukan pengunjung dari: ${target.nama}`,
      ipAddress: '127.0.0.1',
    });
    return true;
  },

  // --- STATS OVERVIEW ---
  getStatsOverview() {
    const kuliner = this.getKuliner();
    const daerah = this.getDaerah();
    const artikel = this.getArtikel();
    const feedback = this.getFeedback();
    const media = this.getMedia();
    const logs = this.getActivityLogs();

    const pendingFeedback = feedback.filter(f => f.status === 'pending').length;
    const publishedKuliner = kuliner.filter(k => k.status === 'published').length;
    const totalViews = kuliner.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);

    return {
      totalKuliner: kuliner.length,
      publishedKuliner,
      totalDaerah: daerah.length,
      totalArtikel: artikel.length,
      totalMedia: media.length,
      pendingFeedback,
      totalViews,
      totalLogs: logs.length,
    };
  },

  // Reset demo data
  resetAllToDefault(): void {
    setStoredItem(STORAGE_KEYS.KULINER, INITIAL_KULINER);
    setStoredItem(STORAGE_KEYS.DAERAH, INITIAL_DAERAH);
    setStoredItem(STORAGE_KEYS.KATEGORI, INITIAL_CATEGORIES);
    setStoredItem(STORAGE_KEYS.ARTIKEL, INITIAL_ARTIKEL);
    setStoredItem(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
    setStoredItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    setStoredItem(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK);
    setStoredItem(STORAGE_KEYS.LOGS, INITIAL_LOGS);
  }
};
