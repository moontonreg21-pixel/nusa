// src/admin/views/KategoriKulinerView.tsx
import React, { useState, useEffect } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit3, 
  Trash2, 
  Utensils, 
  Flame, 
  Cookie, 
  Coffee, 
  Sparkles, 
  X,
  Layers
} from 'lucide-react';
import { AdminService, KategoriItem } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function KategoriKulinerView() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<KategoriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KategoriItem | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    slug: '',
    deskripsi: '',
    icon: 'Utensils',
    urutan: 1,
  });

  const [deleteTarget, setDeleteTarget] = useState<KategoriItem | null>(null);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCategories(AdminService.getKategori());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      nama: '',
      slug: '',
      deskripsi: '',
      icon: 'Utensils',
      urutan: categories.length + 1,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: KategoriItem) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      slug: item.slug,
      deskripsi: item.deskripsi,
      icon: item.icon,
      urutan: item.urutan,
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      showToast('error', 'Nama Kategori Diperlukan');
      return;
    }

    const slug = formData.slug.trim() || formData.nama.toLowerCase().replace(/\s+/g, '-');

    if (editingItem) {
      AdminService.updateKategori(editingItem.id, {
        nama: formData.nama,
        slug,
        deskripsi: formData.deskripsi,
        icon: formData.icon,
        urutan: formData.urutan,
      });
      showToast('success', 'Kategori Diperbarui', `Kategori "${formData.nama}" berhasil diperbarui.`);
    } else {
      AdminService.addKategori({
        nama: formData.nama,
        slug,
        deskripsi: formData.deskripsi,
        icon: formData.icon,
        urutan: formData.urutan,
      });
      showToast('success', 'Kategori Ditambahkan', `Kategori "${formData.nama}" berhasil dibuat.`);
    }

    setIsFormOpen(false);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    AdminService.deleteKategori(deleteTarget.id);
    showToast('success', 'Kategori Dihapus', `Kategori "${deleteTarget.nama}" telah dihapus.`);
    setDeleteTarget(null);
    loadData();
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'Cookie': return <Cookie className="w-5 h-5 text-amber-400" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-teal-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-300" />;
      default: return <Utensils className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-amber-400" />
            Manajemen Kategori Kuliner
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Pengelompokan taksonomi jenis kuliner, jajanan, minuman, dan olahan tradisional
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Kategori
        </button>
      </div>

      {isLoading ? (
        <TableLoadingSkeleton rows={4} />
      ) : categories.length === 0 ? (
        <EmptyState
          title="Belum Ada Kategori Kuliner"
          description="Tambahkan klasifikasi kuliner pertama Anda sekarang."
          actionText="Tambah Kategori"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 hover:border-[#8f521b]/50 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#28170d] border border-[#4d301d]/60">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#28170d]/80 border border-[#5c3a24]/60 text-amber-300">
                    Urutan #{cat.urutan}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#fcfbf7]">
                  {cat.nama}
                </h3>
                <p className="text-xs text-[#e5d7c3]/70 mt-1 line-clamp-2 leading-relaxed">
                  {cat.deskripsi}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-300/80">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Slug: <code className="font-mono">{cat.slug}</code></span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#4d301d]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#e5d7c3]/60 font-semibold">
                  {cat.totalKuliner} Hidangan Terkait
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#4d301d]/60 text-amber-300"
                    title="Edit Kategori"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-300"
                    title="Hapus Kategori"
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
          <div className="w-full max-w-md bg-[#21140c] border border-[#4d301d]/60 rounded-3xl shadow-2xl p-6 text-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-lg text-[#fcfbf7]">
                {editingItem ? 'Edit Kategori Kuliner' : 'Tambah Kategori Baru'}
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
                  Nama Kategori *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Contoh: Sambal & Bumbu Autentik"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Slug URL
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="sambal-bumbu"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Ikon Kategori
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                >
                  <option value="Utensils">Utensils (Peralatan Makan)</option>
                  <option value="Flame">Flame (Api / Daging Panggang)</option>
                  <option value="Cookie">Cookie (Kue / Jajanan)</option>
                  <option value="Coffee">Coffee (Minuman / Jamu)</option>
                  <option value="Sparkles">Sparkles (Spesial / Rempah)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Urutan Tampilan
                </label>
                <input
                  type="number"
                  value={formData.urutan}
                  onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Deskripsi Kategori
                </label>
                <textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Penjelasan ringkas ragam hidangan..."
                />
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
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Kategori?"
        message={`Apakah Anda yakin ingin menghapus kategori "${deleteTarget?.nama}"?`}
        confirmText="Hapus"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
