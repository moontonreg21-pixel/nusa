// src/services/supabaseClient.ts
// Direct Supabase Integration Client with Bidirectional Synchronization for Nusa Culinary
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { 
  KulinerItem, 
  DaerahItem, 
  KategoriItem, 
  ArtikelItem, 
  MediaItem, 
  AdminUser, 
  VisitorFeedback, 
  ActivityLog,
  SupabaseConfig 
} from './adminService';

let supabaseInstance: SupabaseClient | null = null;
let currentUrl = '';
let currentKey = '';

export function getSupabaseClient(config?: SupabaseConfig): SupabaseClient | null {
  if (config) {
    if (!config.url || !config.anonKey || !config.isConnected) {
      supabaseInstance = null;
      return null;
    }
    if (supabaseInstance && currentUrl === config.url && currentKey === config.anonKey) {
      return supabaseInstance;
    }
    try {
      supabaseInstance = createClient(config.url.trim(), config.anonKey.trim(), {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      currentUrl = config.url.trim();
      currentKey = config.anonKey.trim();
      return supabaseInstance;
    } catch (err) {
      console.warn('Gagal menginisialisasi Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
}

// Check connection health & ping latency
export async function pingSupabase(url: string, anonKey: string): Promise<{ ok: boolean; latencyMs?: number; error?: string }> {
  if (!url || !anonKey) {
    return { ok: false, error: 'URL dan Anon Key Supabase diperlukan.' };
  }
  const start = Date.now();
  try {
    const client = createClient(url.trim(), anonKey.trim());
    // Query a simple select to test connection
    const { error } = await client.from('kategori_kuliner').select('id').limit(1);
    const latencyMs = Date.now() - start;

    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, try a raw REST ping
      const cleanUrl = url.replace(/\/+$/, '');
      const resp = await fetch(`${cleanUrl}/rest/v1/`, {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      });
      if (resp.ok || resp.status === 200 || resp.status === 404) {
        return { ok: true, latencyMs };
      }
      return { ok: false, error: `Supabase error: ${error.message}` };
    }

    return { ok: true, latencyMs };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Tidak dapat menghubungi endpoint Supabase' };
  }
}

// --- Transformers between TypeScript Models & Supabase Database Columns ---
export function kulinerToDbRow(item: KulinerItem) {
  return {
    id: item.id,
    daerah_id: item.daerahId,
    kategori_id: item.kategoriId,
    nama: item.nama,
    slug: item.nama.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    tingkat_kepedasan: item.tingkatKepedasan ?? 1,
    estimasi_waktu: item.estimasiWaktu || '30 Menit',
    porsi: item.porsi || '2-4 Porsi',
    deskripsi: item.deskripsi || '',
    bahan_bahan: Array.isArray(item.bahanBahan) ? item.bahanBahan : [],
    langkah_resep: Array.isArray(item.langkahResep) ? item.langkahResep : [],
    sejarah_filosofi: item.sejarahFilosofi || '',
    gambar_url: item.gambarUrl || '',
    status: item.status || 'published',
    is_halal: item.isHalal ?? true,
    is_unggulan: item.isUnggulan ?? false,
    view_count: item.viewCount ?? 0,
    created_at: item.createdAt || new Date().toISOString(),
  };
}

export function dbRowToKuliner(row: any, daerahList: DaerahItem[], kategoriList: KategoriItem[]): KulinerItem {
  const daerah = daerahList.find(d => d.id === row.daerah_id);
  const kategori = kategoriList.find(k => k.id === row.kategori_id);
  return {
    id: row.id,
    daerahId: row.daerah_id,
    daerahNama: daerah?.namaProvinsi || row.daerah_id || 'Nusantara',
    kategoriId: row.kategori_id,
    kategoriNama: kategori?.nama || 'Kuliner Tradisional',
    nama: row.nama,
    tingkatKepedasan: row.tingkat_kepedasan ?? 1,
    estimasiWaktu: row.estimasi_waktu || '30 Menit',
    porsi: row.porsi || '2-4 Porsi',
    deskripsi: row.deskripsi || '',
    bahanBahan: Array.isArray(row.bahan_bahan) ? row.bahan_bahan : [],
    langkahResep: Array.isArray(row.langkah_resep) ? row.langkah_resep : [],
    sejarahFilosofi: row.sejarah_filosofi || '',
    gambarUrl: row.gambar_url || '',
    status: row.status || 'published',
    isHalal: row.is_halal ?? true,
    isUnggulan: row.is_unggulan ?? false,
    viewCount: row.view_count ?? 0,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function daerahToDbRow(item: DaerahItem) {
  return {
    id: item.id,
    nama_provinsi: item.namaProvinsi,
    wilayah: item.wilayah,
    ibu_kota: item.ibuKota,
    deskripsi_singkat: item.deskripsiSingkat,
    narasi_budaya: item.narasiBudaya,
    gambar_url: item.gambarUrl,
  };
}

export function dbRowToDaerah(row: any, count = 0): DaerahItem {
  return {
    id: row.id,
    namaProvinsi: row.nama_provinsi,
    wilayah: row.wilayah,
    ibuKota: row.ibu_kota || '',
    deskripsiSingkat: row.deskripsi_singkat || '',
    narasiBudaya: row.narasi_budaya || '',
    gambarUrl: row.gambar_url || '',
    totalKuliner: count,
  };
}

export function kategoriToDbRow(item: KategoriItem) {
  return {
    id: item.id,
    nama: item.nama,
    slug: item.slug || item.nama.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    deskripsi: item.deskripsi,
    icon: item.icon,
    urutan: item.urutan,
  };
}

export function dbRowToKategori(row: any, count = 0): KategoriItem {
  return {
    id: row.id,
    nama: row.nama,
    slug: row.slug || '',
    deskripsi: row.deskripsi || '',
    icon: row.icon || 'Utensils',
    urutan: row.urutan ?? 1,
    totalKuliner: count,
  };
}

export function artikelToDbRow(item: ArtikelItem) {
  return {
    id: item.id,
    judul: item.judul,
    slug: item.slug || item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    cuplikan: item.cuplikan,
    konten: item.konten,
    penulis_nama: item.penulisNama,
    cover_url: item.coverUrl,
    tags: item.tags,
    status: item.status,
    read_time_minutes: item.readTimeMinutes,
    created_at: item.createdAt,
  };
}

export function dbRowToArtikel(row: any): ArtikelItem {
  return {
    id: row.id,
    judul: row.judul,
    slug: row.slug || '',
    cuplikan: row.cuplikan || '',
    konten: row.konten || '',
    penulisNama: row.penulis_nama || 'Tim Budaya Nusa',
    coverUrl: row.cover_url || '',
    tags: Array.isArray(row.tags) ? row.tags : ['Budaya'],
    status: row.status || 'published',
    readTimeMinutes: row.read_time_minutes ?? 5,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function mediaToDbRow(item: MediaItem) {
  return {
    id: item.id,
    judul: item.judul,
    file_name: item.fileName,
    file_url: item.fileUrl,
    file_size: item.fileSize,
    mime_type: item.mimeType,
    kategori: item.kategori,
    created_at: item.createdAt,
  };
}

export function dbRowToMedia(row: any): MediaItem {
  return {
    id: row.id,
    judul: row.judul,
    fileName: row.file_name,
    fileUrl: row.file_url,
    fileSize: row.file_size || '1 MB',
    mimeType: row.mime_type || 'image/jpeg',
    kategori: row.kategori || 'Kuliner',
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function userToDbRow(item: AdminUser) {
  return {
    id: item.id,
    email: item.email,
    full_name: item.fullName,
    role: item.role,
    avatar_url: item.avatarUrl,
    phone: item.phone,
    status: item.status,
    last_login: item.lastLogin && item.lastLogin !== '-' ? item.lastLogin : null,
    created_at: item.createdAt,
  };
}

export function dbRowToUser(row: any): AdminUser {
  return {
    id: row.id,
    email: row.email,
    password: 'admin123',
    fullName: row.full_name,
    role: row.role || 'editor',
    avatarUrl: row.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: row.phone || '',
    status: row.status || 'active',
    lastLogin: row.last_login || '-',
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function feedbackToDbRow(item: VisitorFeedback) {
  return {
    id: item.id,
    nama: item.nama,
    email: item.email,
    nomor_wa: item.nomorWa,
    subjek: item.subjek,
    pesan: item.pesan,
    rating: item.rating,
    status: item.status,
    tanggapan_admin: item.tanggapanAdmin || null,
    created_at: item.createdAt,
  };
}

export function dbRowToFeedback(row: any): VisitorFeedback {
  return {
    id: row.id,
    nama: row.nama,
    email: row.email || '',
    nomorWa: row.nomor_wa || '',
    subjek: row.subjek || '',
    pesan: row.pesan || '',
    rating: row.rating ?? 5,
    status: row.status || 'pending',
    tanggapanAdmin: row.tanggapan_admin || undefined,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function logToDbRow(item: ActivityLog) {
  return {
    id: item.id,
    user_email: item.userEmail,
    aksi: item.aksi,
    entitas: item.entitas,
    entitas_id: item.entitasId || null,
    detail: { text: item.detail },
    ip_address: item.ipAddress || '127.0.0.1',
    created_at: item.createdAt,
  };
}

// --- Live Single-Record Sync Functions (Run Asynchronously in Background) ---
export async function syncRecordUpsert(client: SupabaseClient | null, table: string, row: any) {
  if (!client) return;
  try {
    await client.from(table).upsert(row, { onConflict: 'id' });
  } catch (err) {
    console.warn(`[Supabase Sync] Gagal upsert ke ${table}:`, err);
  }
}

export async function syncRecordDelete(client: SupabaseClient | null, table: string, id: string) {
  if (!client) return;
  try {
    await client.from(table).delete().eq('id', id);
  } catch (err) {
    console.warn(`[Supabase Sync] Gagal delete dari ${table}:`, err);
  }
}

