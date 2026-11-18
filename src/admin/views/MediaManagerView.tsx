// src/admin/views/MediaManagerView.tsx
import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Sparkles,
  UploadCloud
} from 'lucide-react';
import { AdminService, MediaItem } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function MediaManagerView() {
  const { showToast } = useToast();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    fileName: '',
    fileUrl: '',
    fileSize: '1.5 MB',
    mimeType: 'image/jpeg',
    kategori: 'Kuliner',
  });

  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMediaList(AdminService.getMedia());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = mediaList.filter((m) => {
    const matchesSearch = m.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || m.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.fileUrl);
    setCopiedId(item.id);
    showToast('info', 'Tautan Disalin', `URL gambar "${item.judul}" disalin ke papan klip.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul.trim() || !formData.fileUrl.trim()) {
      showToast('error', 'Semua Kolom Diperlukan');
      return;
    }

    const fileName = formData.fileName.trim() || `${formData.judul.toLowerCase().replace(/\s+/g, '-')}.jpg`;

    AdminService.addMedia({
      judul: formData.judul,
      fileName,
      fileUrl: formData.fileUrl,
      fileSize: formData.fileSize,
      mimeType: formData.mimeType,
      kategori: formData.kategori,
    });

    showToast('success', 'Media Berhasil Diunggah', `Berkas foto "${formData.judul}" siap digunakan.`);
    setIsUploadOpen(false);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    AdminService.deleteMedia(deleteTarget.id);
    showToast('success', 'Media Dihapus', `Aset "${deleteTarget.judul}" telah dihapus.`);
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-amber-400" />
            Manajemen Media & Aset Visual
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Galeri foto kuliner resolusi tinggi, lanskap daerah, dan pernak-pernik adat
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              judul: '',
              fileName: '',
              fileUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
              fileSize: '1.2 MB',
              mimeType: 'image/jpeg',
              kategori: 'Kuliner',
            });
            setIsUploadOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          Unggah Media
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama berkas atau judul media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl pl-10 pr-4 py-2 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none focus:border-[#dca156]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
        >
          <option value="ALL">Semua Kategori Media</option>
          <option value="Kuliner">Kuliner & Resep</option>
          <option value="Daerah">Landmark Daerah</option>
          <option value="Budaya">Ritual Budaya</option>
        </select>
      </div>

      {isLoading ? (
        <TableLoadingSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Aset Media"
          description="Tambahkan atau unggah foto kuliner pertama Anda ke galeri."
          actionText="Unggah Media"
          onAction={() => setIsUploadOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 hover:border-[#8f521b]/60 transition-all shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-stone-900 overflow-hidden">
                <img
                  src={item.fileUrl}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/batik-background.jpg';
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-600/30">
                  {item.kategori}
                </span>
              </div>

              <div className="p-3 space-y-1">
                <h4 className="font-serif font-bold text-xs text-[#fcfbf7] truncate" title={item.judul}>
                  {item.judul}
                </h4>
                <p className="text-[10px] text-[#e5d7c3]/60 truncate font-mono">
                  {item.fileName} • {item.fileSize}
                </p>
              </div>

              <div className="px-3 py-2 bg-[#180e07]/80 border-t border-[#4d301d]/60 flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 hover:text-amber-300"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-amber-300" />
                      Disalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Salin URL
                    </>
                  )}
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="text-stone-500 hover:text-rose-400 p-1 rounded transition-colors"
                  title="Hapus Media"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Upload */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#21140c] border border-[#4d301d]/60 rounded-3xl shadow-2xl p-6 text-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-lg text-[#fcfbf7] flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-amber-400" />
                Daftarkan Aset Media
              </h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Judul Foto / Aset *
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Contoh: Sate Lilit Ikan Khas Bali"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  URL Gambar (Hosting / Supabase Storage) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Kategori Media
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Daerah">Daerah</option>
                    <option value="Budaya">Budaya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Estimasi Ukuran
                  </label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  />
                </div>
              </div>

              {/* Live Preview */}
              {formData.fileUrl && (
                <div className="mt-2 p-2 rounded-xl border border-[#4d301d]/60 bg-[#180e07]">
                  <p className="text-[10px] text-[#e5d7c3]/60 mb-1">Pratinjau Foto:</p>
                  <img
                    src={formData.fileUrl}
                    alt="Preview"
                    className="h-28 w-full object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/batik-background.jpg';
                    }}
                  />
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#4d301d]/60">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#28170d] border border-[#4d301d]/60 text-[#e5d7c3] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/50"
                >
                  Simpan Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Aset Media?"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.judul}"?`}
        confirmText="Hapus"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
