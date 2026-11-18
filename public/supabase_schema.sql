-- ==============================================================================
-- NUSA CULINARY (KULINER INDONESIA) - SUPABASE DATABASE ARCHITECTURE & DDL
-- Author: Senior Full-Stack Developer & Database Architect
-- Description: Complete schema, ENUMs, Tables, Indexes, RLS Policies, & Seed Data
-- Compatible with Browser Client Direct Sync & REST API
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. CUSTOM ENUMS
DO $$ BEGIN
  CREATE TYPE territory_region AS ENUM (
    'SUMATERA',
    'JAWA',
    'KALIMANTAN',
    'SULAWESI',
    'BALI',
    'NUSA_TENGGARA',
    'MALUKU',
    'PAPUA'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. TABLES DEFINITION

-- 3.1. Kategori Kuliner (Food Categories)
CREATE TABLE IF NOT EXISTS kategori_kuliner (
  id VARCHAR(100) PRIMARY KEY,
  nama VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  deskripsi TEXT,
  icon VARCHAR(50) DEFAULT 'Utensils',
  urutan INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2. Data Daerah (Provinces & Regions in Indonesia)
CREATE TABLE IF NOT EXISTS daerah (
  id VARCHAR(50) PRIMARY KEY, -- e.g. 'aceh', 'sumbar', 'yogyakarta'
  nama_provinsi VARCHAR(150) NOT NULL,
  wilayah VARCHAR(50) NOT NULL,
  ibu_kota VARCHAR(100),
  deskripsi_singkat TEXT NOT NULL,
  narasi_budaya TEXT,
  gambar_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3. Data Kuliner (Traditional Culinary Dishes)
CREATE TABLE IF NOT EXISTS kuliner (
  id VARCHAR(100) PRIMARY KEY,
  daerah_id VARCHAR(50) REFERENCES daerah(id) ON DELETE CASCADE,
  kategori_id VARCHAR(100) REFERENCES kategori_kuliner(id) ON DELETE SET NULL,
  nama VARCHAR(200) NOT NULL,
  slug VARCHAR(250) NOT NULL,
  tingkat_kepedasan INT DEFAULT 1 CHECK (tingkat_kepedasan BETWEEN 0 AND 5),
  estimasi_waktu VARCHAR(50) DEFAULT '30 Menit',
  porsi VARCHAR(50) DEFAULT '2-4 Porsi',
  deskripsi TEXT NOT NULL,
  bahan_bahan JSONB DEFAULT '[]'::jsonb, -- Array of strings
  langkah_resep JSONB DEFAULT '[]'::jsonb, -- Array of step strings
  sejarah_filosofi TEXT,
  gambar_url TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'published',
  is_halal BOOLEAN DEFAULT TRUE,
  is_unggulan BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.4. Artikel dan Cerita Budaya (Culinary Anthropology & Culture Articles)
CREATE TABLE IF NOT EXISTS artikel_budaya (
  id VARCHAR(100) PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  slug VARCHAR(300) NOT NULL,
  cuplikan TEXT NOT NULL,
  konten TEXT NOT NULL,
  penulis_nama VARCHAR(120) DEFAULT 'Tim Budaya Nusa',
  cover_url TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY['Budaya', 'Kuliner Nusantara'],
  status VARCHAR(30) DEFAULT 'published',
  read_time_minutes INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5. Media Gallery (Culinary Assets & Photos)
CREATE TABLE IF NOT EXISTS media_gallery (
  id VARCHAR(100) PRIMARY KEY,
  judul VARCHAR(200) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size VARCHAR(50) DEFAULT '1.2 MB',
  mime_type VARCHAR(50) DEFAULT 'image/jpeg',
  kategori VARCHAR(100) DEFAULT 'Kuliner',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.6. Pengguna dan Admin
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(100) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  avatar_url TEXT,
  phone VARCHAR(30),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.7. Masukan Pengunjung (Visitor Feedback & Ratings)
CREATE TABLE IF NOT EXISTS masukan_pengunjung (
  id VARCHAR(100) PRIMARY KEY,
  nama VARCHAR(150) NOT NULL,
  email VARCHAR(200),
  nomor_wa VARCHAR(30),
  subjek VARCHAR(200) NOT NULL,
  pesan TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  status VARCHAR(30) DEFAULT 'pending',
  tanggapan_admin TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ
);

-- 3.8. Log Aktivitas (Security Audit Trail)
CREATE TABLE IF NOT EXISTS activity_logs (
  id VARCHAR(100) PRIMARY KEY,
  user_email VARCHAR(200) NOT NULL,
  aksi VARCHAR(50) NOT NULL,
  entitas VARCHAR(100) NOT NULL,
  entitas_id VARCHAR(100),
  detail JSONB,
  ip_address VARCHAR(50) DEFAULT '127.0.0.1',
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.9. Pengaturan Situs (Application Configurations)
CREATE TABLE IF NOT EXISTS pengaturan_situs (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  deskripsi TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INDEXES FOR HIGH-PERFORMANCE QUERIES
CREATE INDEX IF NOT EXISTS idx_kuliner_daerah ON kuliner(daerah_id);
CREATE INDEX IF NOT EXISTS idx_kuliner_kategori ON kuliner(kategori_id);
CREATE INDEX IF NOT EXISTS idx_kuliner_status ON kuliner(status);
CREATE INDEX IF NOT EXISTS idx_kuliner_nama_trgm ON kuliner USING gin (nama gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_daerah_wilayah ON daerah(wilayah);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_masukan_status ON masukan_pengunjung(status);

-- 5. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_kategori_updated ON kategori_kuliner;
CREATE TRIGGER trg_kategori_updated BEFORE UPDATE ON kategori_kuliner FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_daerah_updated ON daerah;
CREATE TRIGGER trg_daerah_updated BEFORE UPDATE ON daerah FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_kuliner_updated ON kuliner;
CREATE TRIGGER trg_kuliner_updated BEFORE UPDATE ON kuliner FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_artikel_updated ON artikel_budaya;
CREATE TRIGGER trg_artikel_updated BEFORE UPDATE ON artikel_budaya FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_admin_users_updated ON admin_users;
CREATE TRIGGER trg_admin_users_updated BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- 6. SECURITY & ROW LEVEL SECURITY (RLS)
ALTER TABLE kategori_kuliner ENABLE ROW LEVEL SECURITY;
ALTER TABLE daerah ENABLE ROW LEVEL SECURITY;
ALTER TABLE kuliner ENABLE ROW LEVEL SECURITY;
ALTER TABLE artikel_budaya ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE masukan_pengunjung ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaturan_situs ENABLE ROW LEVEL SECURITY;

-- Permissive policies for web client synchronization (using anon key or authenticated token)
DROP POLICY IF EXISTS "Public Read Kategori" ON kategori_kuliner;
DROP POLICY IF EXISTS "Admin Full Access Kategori" ON kategori_kuliner;
CREATE POLICY "Sync Access Kategori" ON kategori_kuliner FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Daerah" ON daerah;
DROP POLICY IF EXISTS "Admin Full Access Daerah" ON daerah;
CREATE POLICY "Sync Access Daerah" ON daerah FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Published Kuliner" ON kuliner;
DROP POLICY IF EXISTS "Admin Full Access Kuliner" ON kuliner;
CREATE POLICY "Sync Access Kuliner" ON kuliner FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Published Artikel" ON artikel_budaya;
DROP POLICY IF EXISTS "Admin Full Access Artikel" ON artikel_budaya;
CREATE POLICY "Sync Access Artikel" ON artikel_budaya FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Media" ON media_gallery;
DROP POLICY IF EXISTS "Admin Full Access Media" ON media_gallery;
CREATE POLICY "Sync Access Media" ON media_gallery FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Users" ON admin_users;
CREATE POLICY "Sync Access Users" ON admin_users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Insert Feedback" ON masukan_pengunjung;
DROP POLICY IF EXISTS "Admin Full Access Feedback" ON masukan_pengunjung;
CREATE POLICY "Sync Access Feedback" ON masukan_pengunjung FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Read Activity Logs" ON activity_logs;
DROP POLICY IF EXISTS "Admin Insert Activity Logs" ON activity_logs;
CREATE POLICY "Sync Access Logs" ON activity_logs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Pengaturan" ON pengaturan_situs;
CREATE POLICY "Sync Access Pengaturan" ON pengaturan_situs FOR ALL USING (true) WITH CHECK (true);

-- 7. INITIAL SEED DATA (WARISAN KULINER NUSANTARA)
INSERT INTO kategori_kuliner (id, nama, slug, deskripsi, icon, urutan) VALUES
  ('cat-1', 'Makanan Utama', 'makanan-utama', 'Hidangan pokok berempah kaya cita rasa khas adat nusantara', 'Utensils', 1),
  ('cat-2', 'Olahan Daging & Ikan', 'olahan-daging-ikan', 'Sajian daging rempah, ikan bakar, dan sup tradisional', 'Flame', 2),
  ('cat-3', 'Jajanan & Kue Tradisional', 'jajanan-pasar', 'Kudapan manis legit dan gurih warisan leluhur', 'Cookie', 3),
  ('cat-4', 'Minuman & Jamu Herbal', 'minuman-tradisional', 'Minuman penghangat dan racikan herbal rempah nusantara', 'Coffee', 4),
  ('cat-5', 'Sambal & Bumbu Autentik', 'sambal-bumbu', 'Penyedap selera khas berbagai penjuru kepulauan', 'Sparkles', 5)
ON CONFLICT (id) DO UPDATE SET nama = EXCLUDED.nama, deskripsi = EXCLUDED.deskripsi, icon = EXCLUDED.icon;

INSERT INTO daerah (id, nama_provinsi, wilayah, ibu_kota, deskripsi_singkat, narasi_budaya, gambar_url) VALUES
  ('aceh', 'Aceh', 'SUMATERA', 'Banda Aceh', 'Kekayaan rempah tanah Rencong dalam setiap suapan Mie Aceh.', 'Dipengaruhi jalur niaga sutra dengan perpaduan rempah India, Timur Tengah, dan Melayu.', '/regions/aceh-baiturrahman-aerial.jpg'),
  ('sumbar', 'Sumatera Barat', 'SUMATERA', 'Padang', 'Mahakarya Rendang yang diakui dunia dari kebudayaan Minangkabau.', 'Filosofi adat dagiang, karambil, lado, dan rempah nan bersatu padu.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Istano_Pagaruyuang.jpg/250px-Istano_Pagaruyuang.jpg'),
  ('yogyakarta', 'D.I. Yogyakarta', 'JAWA', 'Yogyakarta', 'Gudeg legendaris nangka muda santan manis khas Kesultanan Mataram.', 'Simbol kesabaran dalam proses memasak lambat (slow cooking) tradisi Jawa.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tugu_Yogyakarta_at_Night.jpg/250px-Tugu_Yogyakarta_at_Night.jpg'),
  ('bali', 'Bali', 'BALI', 'Denpasar', 'Ayam Betutu aroma rempah base genep nan magis pulau Dewata.', 'Cita rasa persembahan sakral berpadu keharmonisan Tri Hita Karana.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Pura_Ulun_Danu_Bratan%2C_2023.jpg/250px-Pura_Ulun_Danu_Bratan%2C_2023.jpg'),
  ('kaltim', 'Kalimantan Timur', 'KALIMANTAN', 'Samarinda', 'Ayam Cincane bumbu merah membara khas Kesultanan Kutai Kartanegara.', 'Tradisi jamuan bangsawan dan pesta adat tepian Sungai Mahakam.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Jembatan_Mahakam_Samarinda.jpg/250px-Jembatan_Mahakam_Samarinda.jpg'),
  ('papua', 'Papua', 'PAPUA', 'Jayapura', 'Papeda kenyal sagu murni bersanding kuah kuning ikan segar.', 'Simbol ikatan kekeluargaan dan kedaulatan pangan hutan sagu alami.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Danau_Sentani_Papua.jpg/250px-Danau_Sentani_Papua.jpg')
ON CONFLICT (id) DO UPDATE SET nama_provinsi = EXCLUDED.nama_provinsi, narasi_budaya = EXCLUDED.narasi_budaya, gambar_url = EXCLUDED.gambar_url;

INSERT INTO admin_users (id, email, full_name, role, avatar_url, phone, status) VALUES
  ('usr-01', 'admin.utama@kulinerindo.id', 'Raden Arya Wicaksana', 'super_admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '+6281234567890', 'active'),
  ('usr-02', 'siti.rahmawati@kulinerindo.id', 'Siti Rahmawati, S.Hum', 'editor', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', '+6281987654321', 'active')
ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;
