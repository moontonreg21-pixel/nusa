// src/admin/views/DashboardView.tsx
import React, { useState, useEffect } from 'react';
import {
  Utensils,
  MapPin,
  BookOpen,
  MessageSquare,
  Image,
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  Database,
  Sparkles,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AdminService, KulinerItem, VisitorFeedback, ActivityLog } from '../../services/adminService';

interface DashboardViewProps {
  onNavigate: (viewId: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const [stats, setStats] = useState(AdminService.getStatsOverview());
  const [recentKuliner, setRecentKuliner] = useState<KulinerItem[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<VisitorFeedback[]>([]);
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);
  const supabaseConfig = AdminService.getSupabaseConfig();

  useEffect(() => {
    setStats(AdminService.getStatsOverview());
    setRecentKuliner(AdminService.getKuliner().slice(0, 4));
    setRecentFeedback(AdminService.getFeedback().slice(0, 3));
    setRecentLogs(AdminService.getActivityLogs().slice(0, 5));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner Sambutan Budaya */}
      <div className="relative overflow-hidden rounded-3xl border border-[#4d301d]/60 bg-gradient-to-r from-[#2a170d] via-[#382012] to-[#21120a] p-6 md:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#e5d7c3_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-3xl">

          <h1 className="text-2xl md:text-3xl font-serif font-black text-[#fcfbf7] tracking-tight">
            Selamat Datang, Pengelola Boga Nusantara
          </h1>
          <p className="mt-2 text-sm text-[#e5d7c3]/85 leading-relaxed">
            Kelola arsip kuliner tradisional, narasi kebudayaan adat, resep pusaka, dan tanggapan pengunjung dari seluruh 38 provinsi di Indonesia dengan aman dan terstruktur.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('kuliner')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Tambah Kuliner Baru
            </button>
            <button
              onClick={() => onNavigate('artikel')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-[#fcfbf7] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              Tulis Cerita Budaya
            </button>
            <button
              onClick={() => onNavigate('pengaturan')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-[#fcfbf7] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <Database className="w-4 h-4 text-amber-400" />
              Status Supabase
            </button>
          </div>
        </div>
      </div>

      {/* Grid Statistik Utama */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#d9c3a5]/90 flex items-center gap-2">

            Ikhtisar Indikator Utama
          </h2>
          <span className="text-xs text-[#e5d7c3]/60">Pembaruan otomatis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Kuliner"
            value={stats.totalKuliner}
            change="+12% bulan ini"
            trend="up"
            subtitle={`${stats.publishedKuliner} Terbit`}
            icon={<Utensils className="w-6 h-6" />}
            accentColor="emerald"
            onClick={() => onNavigate('kuliner')}
          />
          <StatCard
            title="Provinsi / Daerah"
            value={stats.totalDaerah}
            change="38 Target Nasional"
            trend="neutral"
            subtitle="Cakupan 8 Wilayah"
            icon={<MapPin className="w-6 h-6" />}
            accentColor="amber"
            onClick={() => onNavigate('daerah')}
          />
          <StatCard
            title="Artikel & Cerita"
            value={stats.totalArtikel}
            change="+3 Minggu Ini"
            trend="up"
            subtitle="Etnografi & Filosofi"
            icon={<BookOpen className="w-6 h-6" />}
            accentColor="teal"
            onClick={() => onNavigate('artikel')}
          />
          <StatCard
            title="Masukan Masuk"
            value={stats.pendingFeedback}
            change={stats.pendingFeedback > 0 ? `${stats.pendingFeedback} Perlu Ditinjau` : 'Semua Ditangani'}
            trend={stats.pendingFeedback > 0 ? 'down' : 'up'}
            subtitle="Suara Pengunjung"
            icon={<MessageSquare className="w-6 h-6" />}
            accentColor="cream"
            onClick={() => onNavigate('masukan')}
          />
        </div>
      </div>

      {/* Baris 2: Sebaran Kuliner & Status Arsitektur Supabase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Kuliner Unggulan Terkini */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4d301d]/60">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#fcfbf7]">
                Koleksi Kuliner Unggulan Nusantara
              </h3>
              <p className="text-xs text-[#e5d7c3]/70">Daftar hidangan berstatus unggulan publik</p>
            </div>
            <button
              onClick={() => onNavigate('kuliner')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Lihat Semua &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentKuliner.map((dish) => (
              <div
                key={dish.id}
                className="group relative flex gap-3.5 p-3 rounded-xl border border-[#52331c]/50 bg-[#180e07]/60 hover:border-[#8f521b]/60 hover:bg-[#28170d]/60 transition-all"
              >
                <img
                  src={dish.gambarUrl}
                  alt={dish.nama}
                  className="w-16 h-16 rounded-lg object-cover border border-[#52331c]/60 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/batik-background.jpg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90 block truncate">
                    {dish.daerahNama}
                  </span>
                  <h4 className="text-sm font-bold text-[#fcfbf7] truncate group-hover:text-amber-300 transition-colors">
                    {dish.nama}
                  </h4>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-[#e5d7c3]/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {dish.estimasiWaktu}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#dca156]" />
                      {dish.viewCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Status Arsitektur Database Supabase & Audit Keamanan */}
        <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-base text-[#fcfbf7] flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                Arsitektur Supabase
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${supabaseConfig.isConnected
                ? 'bg-amber-600/20 text-amber-300 border border-amber-600/30'
                : 'bg-stone-700/30 text-stone-300 border border-stone-600/30'
                }`}>
                {supabaseConfig.isConnected ? 'Live Terhubung' : 'Lokal / Offline Sync'}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-[#180e07]/60 border border-[#52331c]/50 text-xs space-y-1.5">
                <div className="flex justify-between text-[#e5d7c3]/70">
                  <span>Engine Database:</span>
                  <span className="font-semibold text-[#fcfbf7]">PostgreSQL 15 (Supabase)</span>
                </div>
                <div className="flex justify-between text-[#e5d7c3]/70">
                  <span>Row Level Security (RLS):</span>
                  <span className="font-semibold text-amber-400">Aktif (9 Tabel)</span>
                </div>
                <div className="flex justify-between text-[#e5d7c3]/70">
                  <span>Audit Trail Log:</span>
                  <span className="font-semibold text-amber-400">Aktif Real-time</span>
                </div>
                <div className="flex justify-between text-[#e5d7c3]/70">
                  <span>Penyimpanan Aset:</span>
                  <span className="font-semibold text-[#fcfbf7]">Supabase Storage Ready</span>
                </div>
              </div>

              <p className="text-xs text-[#e5d7c3]/70 leading-relaxed">
                Skema SQL DDL, indeks pg_trgm, trigger updated_at, dan security policies siap dieksekusi di Supabase SQL Editor.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('pengaturan')}
            className="w-full mt-2 py-2.5 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-[#fcfbf7] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Kelola Kunci API & Ekspor SQL &rarr;
          </button>
        </div>
      </div>

      {/* Baris 3: Masukan Pengunjung & Log Aktivitas Keamanan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Masukan Pengunjung Terbaru */}
        <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4d301d]/60">
            <div>
              <h3 className="font-serif font-bold text-base text-[#fcfbf7] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Masukan Pengunjung Terbaru
              </h3>
              <p className="text-xs text-[#e5d7c3]/60">Saran, usulan resep, dan apresiasi</p>
            </div>
            <button
              onClick={() => onNavigate('masukan')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              Kelola ({stats.pendingFeedback} baru)
            </button>
          </div>

          <div className="space-y-3">
            {recentFeedback.map((fb) => (
              <div
                key={fb.id}
                className="p-3.5 rounded-xl border border-[#52331c]/50 bg-[#180e07]/60 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#fcfbf7]">{fb.nama}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${fb.status === 'resolved'
                    ? 'bg-amber-600/20 text-amber-300'
                    : fb.status === 'reviewed'
                      ? 'bg-[#4d2d14] text-amber-200'
                      : 'bg-rose-500/20 text-rose-300'
                    }`}>
                    {fb.status === 'resolved' ? 'Selesai' : fb.status === 'reviewed' ? 'Ditinjau' : 'Menunggu'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-300 truncate">{fb.subjek}</p>
                <p className="text-xs text-[#e5d7c3]/70 line-clamp-2 leading-relaxed">{fb.pesan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Log Aktivitas Terakhir */}
        <div className="p-6 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4d301d]/60">
            <div>
              <h3 className="font-serif font-bold text-base text-[#fcfbf7] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Audit Trail Log Keamanan
              </h3>
              <p className="text-xs text-[#e5d7c3]/60">Pencatatan aksi admin sesuai standar ISO 27001</p>
            </div>
            <button
              onClick={() => onNavigate('logs')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              Lihat Log Lengkap
            </button>
          </div>

          <div className="space-y-2.5">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2.5 rounded-xl border border-[#52331c]/50 bg-[#180e07]/60 text-xs"
              >
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase shrink-0 mt-0.5 ${log.aksi === 'CREATE'
                  ? 'bg-amber-600/20 text-amber-300'
                  : log.aksi === 'UPDATE'
                    ? 'bg-[#4d2d14] text-amber-200'
                    : log.aksi === 'DELETE'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-stone-700 text-stone-300'
                  }`}>
                  {log.aksi}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#fcfbf7] font-medium truncate">{log.detail}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#e5d7c3]/50 mt-0.5">
                    <span>{log.userEmail}</span>
                    <span>•</span>
                    <span>{log.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
