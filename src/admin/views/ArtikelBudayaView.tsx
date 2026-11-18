// src/admin/views/ArtikelBudayaView.tsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Tag, 
  User, 
  X, 
  Sparkles,
  CheckCircle,
  FileText
} from 'lucide-react';
import { AdminService, ArtikelItem } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function ArtikelBudayaView() {
  const { showToast } = useToast();
  const [artikelList, setArtikelList] = useState<ArtikelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ArtikelItem | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    slug: '',
    cuplikan: '',
    konten: '',
    penulisNama: 'Tim Riset Budaya Nusa',
    coverUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    tagsText: 'Kuliner Nusantara, Budaya Adat, Filosofi',
    status: 'published' as 'published' | 'draft' | 'archived',
    readTimeMinutes: 5,
  });

  const [deleteTarget, setDeleteTarget] = useState<ArtikelItem | null>(null);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setArtikelList(AdminService.getArtikel());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = artikelList.filter((a) => {
    const matchesSearch = a.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.cuplikan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.penulisNama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      judul: '',
      slug: '',
      cuplikan: '',
      konten: '',
      penulisNama: 'Tim Riset Budaya Nusa',
      coverUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      tagsText: 'Budaya Adat, Kuliner Nusantara, Warisan Leluhur',
      status: 'published',
      readTimeMinutes: 5,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (art: ArtikelItem) => {
    setEditingItem(art);
    setFormData({
      judul: art.judul,
      slug: art.slug,
      cuplikan: art.cuplikan,
      konten: art.konten,
      penulisNama: art.penulisNama,
      coverUrl: art.coverUrl,
      tagsText: art.tags.join(', '),
      status: art.status,
      readTimeMinutes: art.readTimeMinutes,
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul.trim()) {
      showToast('error', 'Judul Artikel Diperlukan');
      return;
    }

    const tags = formData.tagsText.split(',').map((t) => t.trim()).filter(Boolean);
    const slug = formData.slug.trim() || formData.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingItem) {
      AdminService.updateArtikel(editingItem.id, {
        judul: formData.judul,
        slug,
        cuplikan: formData.cuplikan,
        konten: formData.konten,
        penulisNama: formData.penulisNama,
        coverUrl: formData.coverUrl,
        tags,
        status: formData.status,
        readTimeMinutes: formData.readTimeMinutes,
      });
      showToast('success', 'Artikel Diperbarui', `Artikel "${formData.judul}" berhasil disimpan.`);
    } else {
      AdminService.addArtikel({
        judul: formData.judul,
        slug,
        cuplikan: formData.cuplikan,
        konten: formData.konten,
        penulisNama: formData.penulisNama,
        coverUrl: formData.coverUrl,
        tags,
        status: formData.status,
        readTimeMinutes: formData.readTimeMinutes,
      });
      showToast('success', 'Artikel Diterbitkan', `Artikel "${formData.judul}" berhasil dipublikasikan.`);
    }

    setIsFormOpen(false);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    AdminService.deleteArtikel(deleteTarget.id);
    showToast('success', 'Artikel Dihapus', `Artikel "${deleteTarget.judul}" telah dihapus.`);
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Artikel dan Cerita Budaya Boga
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Mendokumentasikan kearifan lokal, filosofi rempah, dan ritual jamuan adat nusantara
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tulis Cerita Baru
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul artikel, topik, atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl pl-10 pr-4 py-2 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none focus:border-[#dca156]"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
        >
          <option value="ALL">Semua Status</option>
          <option value="published">Terbit (Published)</option>
          <option value="draft">Draf (Draft)</option>
          <option value="archived">Diarsipkan</option>
        </select>
      </div>

      {isLoading ? (
        <TableLoadingSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Artikel Ditemukan"
          description="Mulai tuangkan cerita budaya kuliner nusantara pertama Anda."
          actionText="Tulis Artikel"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 hover:border-[#8f521b]/60 transition-all shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-stone-900">
                  <img
                    src={art.coverUrl}
                    alt={art.judul}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/batik-background.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21140c] via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                    art.status === 'published'
                      ? 'bg-[#28170d] border border-amber-600/40 text-amber-300'
                      : 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                  }`}>
                    {art.status === 'published' ? 'Terbit' : 'Draf'}
                  </span>
                  <div className="absolute bottom-2 left-3 flex items-center gap-2 text-[11px] text-[#fcfbf7]">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{art.readTimeMinutes} menit membaca</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-serif font-bold text-base text-[#fcfbf7] line-clamp-2 leading-snug">
                    {art.judul}
                  </h3>
                  <p className="text-xs text-[#e5d7c3]/70 line-clamp-3 leading-relaxed">
                    {art.cuplikan}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {art.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#28170d] border border-[#4d301d]/60 text-[10px] text-amber-200/90 font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-[#180e07]/80 border-t border-[#4d301d]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#e5d7c3]/60 flex items-center gap-1">
                  <User className="w-3 h-3 text-amber-400" />
                  {art.penulisNama}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#4d301d]/60 text-amber-300"
                    title="Edit Artikel"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(art)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-300"
                    title="Hapus Artikel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#21140c] border border-[#4d301d]/60 rounded-3xl shadow-2xl p-6 text-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-xl text-[#fcfbf7]">
                {editingItem ? 'Edit Cerita Budaya' : 'Tulis Cerita Budaya Baru'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Contoh: Filosofi Rendang Minangkabau: Jejak Luhur Kearifan Adat"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Nama Penulis / Etnografer
                  </label>
                  <input
                    type="text"
                    value={formData.penulisNama}
                    onChange={(e) => setFormData({ ...formData, penulisNama: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  />
                </div>
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Estimasi Waktu Baca (Menit)
                  </label>
                  <input
                    type="number"
                    value={formData.readTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readTimeMinutes: parseInt(e.target.value) || 5 })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  URL Cover Gambar
                </label>
                <input
                  type="text"
                  required
                  value={formData.coverUrl}
                  onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Cuplikan / Abstrak Singkat
                </label>
                <textarea
                  rows={2}
                  value={formData.cuplikan}
                  onChange={(e) => setFormData({ ...formData, cuplikan: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Ringkasan inti yang menarik pembaca..."
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Konten Lengkap Cerita & Narasi
                </label>
                <textarea
                  rows={6}
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156] font-sans"
                  placeholder="Tuliskan kisah adat, asal usul rempah, filosofi memasak..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Label / Tags (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={formData.tagsText}
                    onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                    placeholder="Minangkabau, Tradisi, Rendang"
                  />
                </div>
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    <option value="published">Terbit (Published)</option>
                    <option value="draft">Draf (Draft)</option>
                    <option value="archived">Diarsipkan</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#4d301d]/60">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#28170d] border border-[#4d301d]/60 text-[#e5d7c3] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/50"
                >
                  Simpan Cerita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Artikel Budaya?"
        message={`Apakah Anda yakin ingin menghapus artikel "${deleteTarget?.judul}"?`}
        confirmText="Hapus"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
