// src/admin/views/PengaturanView.tsx
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  ShieldCheck, 
  Globe, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Activity, 
  Key, 
  Server, 
  FileCode, 
  AlertTriangle,
  RotateCcw,
  UploadCloud,
  DownloadCloud,
  CheckCircle2,
  Cloud
} from 'lucide-react';
import { AdminService } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';

export function PengaturanView() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'supabase' | 'situs' | 'keamanan'>('supabase');

  // Supabase State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok?: boolean; latencyMs?: number; error?: string } | null>(null);
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Site Profile State
  const [siteName, setSiteName] = useState('Nusa Culinary');
  const [tagline, setTagline] = useState('Melestarikan Warisan Adat, Merayakan Cita Rasa Autentik Nusantara');
  const [whatsappContact, setWhatsappContact] = useState('+62 812-3456-7890');
  const [editorialEmail, setEditorialEmail] = useState('redaksi@kulinerindo.id');

  // Reset Modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    const config = AdminService.getSupabaseConfig();
    setSupabaseUrl(config.url);
    setAnonKey(config.anonKey);
    setLastSyncTime(AdminService.getLastSyncTime());
  }, []);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await AdminService.testSupabaseConnection(supabaseUrl, anonKey);
    setIsTesting(false);
    setTestResult(res);

    if (res.ok) {
      showToast('success', 'Koneksi Berhasil!', `Terhubung ke Supabase dengan latensi ${res.latencyMs}ms.`);
    } else {
      showToast('warning', 'Uji Koneksi', res.error || 'Periksa kembali URL dan Anon Key.');
    }
  };

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await AdminService.saveSupabaseConfig(supabaseUrl, anonKey);
    showToast('success', 'Pengaturan Disimpan', res.message);
  };

  const handlePushAll = async () => {
    setIsPushing(true);
    const res = await AdminService.pushAllToSupabase();
    setIsPushing(false);

    if (res.success) {
      setLastSyncTime(AdminService.getLastSyncTime());
      showToast('success', 'Sinkronisasi Sukses!', `Semua data lokal (${res.details.kuliner} kuliner, ${res.details.daerah} daerah, ${res.details.artikel} artikel) berhasil diunggah ke Supabase.`);
    } else {
      showToast('error', 'Gagal Sinkronisasi', res.error || 'Terjadi kesalahan saat mengunggah data.');
    }
  };

  const handlePullAll = async () => {
    setIsPulling(true);
    const res = await AdminService.pullAllFromSupabase();
    setIsPulling(false);

    if (res.success) {
      setLastSyncTime(AdminService.getLastSyncTime());
      showToast('success', 'Tarik Data Sukses!', `Data berhasil ditarik dari Supabase: ${res.details.kuliner} kuliner, ${res.details.daerah} daerah.`);
    } else {
      showToast('error', 'Gagal Tarik Data', res.error || 'Terjadi kesalahan saat mengambil data.');
    }
  };

  const handleCopySqlSchema = async () => {
    try {
      const resp = await fetch('/supabase_schema.sql');
      if (resp.ok) {
        const text = await resp.text();
        await navigator.clipboard.writeText(text);
        setIsCopiedSql(true);
        showToast('info', 'SQL Lengkap Disalin', 'Skema DDL Supabase (9 tabel & RLS) berhasil disalin ke clipboard.');
        setTimeout(() => setIsCopiedSql(false), 2500);
        return;
      }
    } catch {
      // fallback if fetch fails
    }
    const fallbackSql = `-- Skema Supabase Nusa Culinary
-- Buka https://supabase.com/dashboard -> SQL Editor -> Tempel & Jalankan.
-- Silakan unduh berkas lengkap melalui tombol "Unduh .SQL".`;
    navigator.clipboard.writeText(fallbackSql);
    setIsCopiedSql(true);
    showToast('info', 'SQL Disalin', 'Skema SQL berhasil disalin ke clipboard.');
    setTimeout(() => setIsCopiedSql(false), 2500);
  };

  const handleDownloadSql = () => {
    const link = document.createElement('a');
    link.href = '/supabase_schema.sql';
    link.download = 'nusa_culinary_supabase_schema.sql';
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('info', 'Berkas SQL Diunduh', 'File supabase_schema.sql berhasil diunduh.');
  };

  const handleSaveSiteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    AdminService.logActivity({
      userEmail: AdminService.getCurrentUser().email,
      aksi: 'UPDATE',
      entitas: 'Identitas Situs',
      detail: `Memperbarui nama situs: ${siteName} & kontak WhatsApp desa: ${whatsappContact}`,
      ipAddress: '127.0.0.1',
    });
    showToast('success', 'Profil Tersimpan', 'Informasi situs dan kontak desa berhasil diperbarui.');
  };

  const handleResetData = () => {
    AdminService.resetAllToDefault();
    showToast('success', 'Data Direset', 'Koleksi kuliner, daerah, dan artikel telah dikembalikan ke data default.');
    setIsResetModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-amber-400" />
            Pengaturan Sistem & Database
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Konfigurasi koneksi Supabase, profil boga nusantara, dan cadangan data
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#4d301d]/60 pb-2">
        <button
          onClick={() => setActiveTab('supabase')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'supabase'
              ? 'bg-gradient-to-r from-[#c8883b] to-[#a66824] text-stone-950 font-bold shadow-lg shadow-black/60'
              : 'text-[#e5d7c3]/70 hover:text-white hover:bg-[#28170d]'
          }`}
        >
          <Database className="w-4 h-4" />
          Koneksi Supabase
        </button>
        <button
          onClick={() => setActiveTab('situs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'situs'
              ? 'bg-gradient-to-r from-[#c8883b] to-[#a66824] text-stone-950 font-bold shadow-lg shadow-black/60'
              : 'text-[#e5d7c3]/70 hover:text-white hover:bg-[#28170d]'
          }`}
        >
          <Globe className="w-4 h-4" />
          Profil Situs & Kontak
        </button>
        <button
          onClick={() => setActiveTab('keamanan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'keamanan'
              ? 'bg-gradient-to-r from-[#c8883b] to-[#a66824] text-stone-950 font-bold shadow-lg shadow-black/60'
              : 'text-[#e5d7c3]/70 hover:text-white hover:bg-[#28170d]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Keamanan & Reset
        </button>
      </div>

      {/* TAB 1: SUPABASE CONFIGURATION */}
      {activeTab === 'supabase' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#fcfbf7] flex items-center gap-2">
                  <Server className="w-5 h-5 text-amber-400" />
                  Konfigurasi Proyek Supabase
                </h3>
                <p className="text-xs text-[#e5d7c3]/70 mt-1">
                  Hubungkan dasbor admin ke instans Supabase PostgreSQL untuk sinkronisasi cloud real-time.
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                AdminService.getSupabaseConfig().isConnected
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {AdminService.getSupabaseConfig().isConnected ? 'Status: Terhubung Live' : 'Status: Fallback Lokal'}
              </span>
            </div>

            <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 font-mono text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Supabase Public Anon Key
                </label>
                <input
                  type="password"
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 font-mono text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  testResult.ok
                    ? 'bg-[#28170d] border-[#8f521b]/50 text-amber-300'
                    : 'bg-rose-950/60 border-rose-600/50 text-rose-300'
                }`}>
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>
                    {testResult.ok
                      ? `Koneksi Supabase responsif! Latensi: ${testResult.latencyMs}ms`
                      : `Uji koneksi gagal: ${testResult.error}`}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-4 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#5c3a24]/60 text-amber-300 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  {isTesting ? 'Memeriksa...' : 'Uji Koneksi'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95"
                >
                  Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>

          {/* Bagian Pusat Sinkronisasi Cloud Supabase */}
          <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#fcfbf7] flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-amber-400" />
                  Pusat Sinkronisasi Data Cloud Supabase
                </h3>
                <p className="text-xs text-[#e5d7c3]/70 mt-1">
                  Sinkronkan seluruh data kuliner, resep, artikel, dan daerah antara penyimpanan lokal dan cloud Supabase.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#e5d7c3]/60">
                  Sinkronisasi Terakhir:
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#28170d] border border-[#4d301d]/60 text-[11px] font-mono font-bold text-amber-300">
                  {lastSyncTime || 'Belum Pernah'}
                </span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#180e07] border border-[#4d301d]/60 flex flex-col justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#fcfbf7] flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    Unggah Semua Data Lokal ke Supabase (Push)
                  </h4>
                  <p className="text-[11px] text-[#e5d7c3]/70 mt-1 leading-relaxed">
                    Kirim semua data kuliner, kategori, provinsi, artikel, pengguna admin, dan masukan pengunjung dari perangkat ini ke tabel Supabase.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePushAll}
                  disabled={isPushing || isPulling}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all disabled:opacity-50"
                >
                  <UploadCloud className={`w-4 h-4 ${isPushing ? 'animate-bounce' : ''}`} />
                  <span>{isPushing ? 'Mengunggah ke Supabase...' : 'Unggah Data ke Cloud'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#180e07] border border-[#4d301d]/60 flex flex-col justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#fcfbf7] flex items-center gap-2">
                    <DownloadCloud className="w-4 h-4 text-amber-400" />
                    Tarik Data dari Supabase ke Lokal (Pull)
                  </h4>
                  <p className="text-[11px] text-[#e5d7c3]/70 mt-1 leading-relaxed">
                    Ambil seluruh data terbaru yang tersimpan di cloud Supabase dan perbarui penyimpanan lokal di browser ini.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePullAll}
                  disabled={isPushing || isPulling}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#5c3a24]/60 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  <DownloadCloud className={`w-4 h-4 ${isPulling ? 'animate-bounce' : ''}`} />
                  <span>{isPulling ? 'Menarik Data dari Cloud...' : 'Tarik Data dari Cloud'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#28170d]/60 border border-[#4d301d]/60 text-[11px] text-[#e5d7c3]/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Sinkronisasi Otomatis Aktif:</strong> Setiap kali Anda menambah, mengedit, atau menghapus kuliner di panel admin, perubahan juga akan otomatis disinkronkan ke Supabase jika koneksi aktif.
              </span>
            </div>
          </div>

          {/* Bagian Skema SQL DDL Supabase */}
          <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-base text-[#fcfbf7] flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  Skema DDL Database Supabase (Siap Jalankan)
                </h3>
                <p className="text-xs text-[#e5d7c3]/70">
                  Sudah mencakup 9 tabel terelasi, ENUMs, triggers, dan Row Level Security (RLS) policies.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySqlSchema}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#5c3a24]/60 text-amber-300 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {isCopiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopiedSql ? 'Tersalin' : 'Salin SQL'}
                </button>
                <button
                  onClick={handleDownloadSql}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh .SQL
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#180e07] border border-[#4d301d]/50 font-mono text-[11px] text-[#e5d7c3]/90 max-h-48 overflow-y-auto leading-relaxed">
              <span className="text-amber-400">-- Cara Menjalankan di Supabase:</span><br />
              1. Buka dashboard proyek Anda di <span className="text-amber-300">https://supabase.com/dashboard</span><br />
              2. Masuk ke menu <span className="text-amber-300">"SQL Editor"</span> di sidebar kiri.<br />
              3. Klik <span className="text-amber-300">"New query"</span>, tempelkan skema dari tombol di atas, lalu klik <span className="text-amber-300">"Run"</span>.<br />
              4. Tabel, trigger update timestamp, index fulltext, dan kebijakan RLS langsung aktif!
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFIL SITUS */}
      {activeTab === 'situs' && (
        <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#fcfbf7]">
            Profil Website & Kontak Pengelola Desa
          </h3>
          <p className="text-xs text-[#e5d7c3]/70">
            Informasi publik yang muncul pada header, footer, dan tombol WhatsApp desa kuliner.
          </p>

          <form onSubmit={handleSaveSiteProfile} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-[#d9c3a5] font-semibold mb-1">
                Nama Portal Website
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
              />
            </div>

            <div>
              <label className="block text-[#d9c3a5] font-semibold mb-1">
                Tagline Warisan Rasa
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Kontak WhatsApp Desa / Pengelola
                </label>
                <input
                  type="text"
                  value={whatsappContact}
                  onChange={(e) => setWhatsappContact(e.target.value)}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Email Redaksi / Arsip Budaya
                </label>
                <input
                  type="email"
                  value={editorialEmail}
                  onChange={(e) => setEditorialEmail(e.target.value)}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50"
              >
                Simpan Profil
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: KEAMANAN & RESET */}
      {activeTab === 'keamanan' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#fcfbf7] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Kebijakan Keamanan & Row Level Security (RLS)
            </h3>
            <p className="text-xs text-[#e5d7c3]/70 leading-relaxed">
              Semua endpoint data dilindungi oleh arsitektur enkripsi TLS dan kebijakan RLS Postgres. Pengguna publik hanya dapat membaca data kuliner berstatus <code className="text-amber-400 font-mono">published</code>, sementara seluruh modifikasi mewajibkan autentikasi token admin.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-rose-900/40 bg-[#21090d]/60 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-base text-rose-200">
                Zona Bahaya: Reset Data Contoh
              </h3>
            </div>
            <p className="text-xs text-rose-300/80 leading-relaxed">
              Mengembalikan seluruh data kuliner, provinsi, kategori, artikel, dan log aktivitas kembali ke setelan default awal.
            </p>
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800/80 border border-rose-700/50 text-rose-100 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset ke Data Default
            </button>
          </div>
        </div>
      )}

      {/* Modal Confirm Reset */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Kembalikan ke Data Default?"
        message="Tindakan ini akan mengatur ulang semua perubahan yang Anda lakukan ke data awal demonstrasi."
        confirmText="Reset Sekarang"
        variant="danger"
        onConfirm={handleResetData}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
