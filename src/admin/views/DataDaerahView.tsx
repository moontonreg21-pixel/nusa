// src/admin/views/DataDaerahView.tsx
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Utensils, 
  Compass, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AdminService, DaerahItem } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function DataDaerahView() {
  const { showToast } = useToast();
  const [daerahList, setDaerahList] = useState<DaerahItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilayah, setSelectedWilayah] = useState('ALL');

  // Modal Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DaerahItem | null>(null);
  const [formData, setFormData] = useState<DaerahItem>({
    id: '',
    namaProvinsi: '',
    wilayah: 'SUMATERA',
    ibuKota: '',
    deskripsiSingkat: '',
    narasiBudaya: '',
    gambarUrl: '',
    totalKuliner: 0,
  });

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<DaerahItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDaerahList(AdminService.getDaerah());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDaerah = daerahList.filter((d) => {
    const matchesSearch = d.namaProvinsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ibuKota.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deskripsiSingkat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWilayah = selectedWilayah === 'ALL' || d.wilayah === selectedWilayah;
    return matchesSearch && matchesWilayah;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: '',
      namaProvinsi: '',
      wilayah: 'SUMATERA',
      ibuKota: '',
      deskripsiSingkat: '',
      narasiBudaya: '',
      gambarUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      totalKuliner: 0,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: DaerahItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaProvinsi.trim()) {
      showToast('error', 'Nama Provinsi Diperlukan', 'Harap isi nama provinsi.');
      return;
    }

    const slugId = formData.id.trim() || formData.namaProvinsi.toLowerCase().replace(/\s+/g, '-');

    if (editingItem) {
      AdminService.updateDaerah(editingItem.id, {
        namaProvinsi: formData.namaProvinsi,
        wilayah: formData.wilayah,
        ibuKota: formData.ibuKota,
        deskripsiSingkat: formData.deskripsiSingkat,
        narasiBudaya: formData.narasiBudaya,
        gambarUrl: formData.gambarUrl,
      });
      showToast('success', 'Daerah Diperbarui', `Informasi "${formData.namaProvinsi}" telah disimpan.`);
    } else {
      AdminService.addDaerah({
        ...formData,
        id: slugId,
      });
      showToast('success', 'Daerah Ditambahkan', `Provinsi "${formData.namaProvinsi}" berhasil didaftarkan.`);
    }

    setIsFormOpen(false);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setTimeout(() => {
      AdminService.deleteDaerah(deleteTarget.id);
      showToast('success', 'Daerah Dihapus', `Data daerah "${deleteTarget.namaProvinsi}" telah dihapus.`);
      setIsDeleting(false);
      setDeleteTarget(null);
      loadData();
    }, 250);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-amber-400" />
            Manajemen Data Wilayah & Provinsi
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Menata peta kekayaan tradisi kuliner 8 gugus kepulauan Nusantara
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Provinsi
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari provinsi, ibu kota, atau narasi adat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl pl-10 pr-4 py-2 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none focus:border-[#dca156]"
          />
        </div>

        <select
          value={selectedWilayah}
          onChange={(e) => setSelectedWilayah(e.target.value)}
          className="bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
        >
          <option value="ALL">Semua Gugus Wilayah</option>
          <option value="SUMATERA">Sumatera</option>
          <option value="JAWA">Jawa</option>
          <option value="KALIMANTAN">Kalimantan</option>
          <option value="SULAWESI">Sulawesi</option>
          <option value="BALI">Bali</option>
          <option value="NUSA TENGGARA">Nusa Tenggara</option>
          <option value="MALUKU">Maluku</option>
          <option value="PAPUA">Papua</option>
        </select>
      </div>

      {/* Grid Card & Table */}
      {isLoading ? (
        <TableLoadingSkeleton rows={4} />
      ) : filteredDaerah.length === 0 ? (
        <EmptyState
          title="Tidak Ada Daerah Ditemukan"
          description="Silakan periksa kata kunci atau tambahkan data provinsi baru."
          actionText="Tambah Provinsi Baru"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDaerah.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 hover:border-[#8f521b]/60 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-40 overflow-hidden bg-stone-900">
                  <img
                    src={item.gambarUrl}
                    alt={item.namaProvinsi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/batik-background.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21140c] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#28170d] backdrop-blur-md border border-amber-600/40 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                    {item.wilayah}
                  </span>
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-medium flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" />
                      {item.ibuKota}
                    </span>
                    <span className="text-[#fcfbf7]/80 text-[11px] font-semibold bg-black/40 px-2 py-0.5 rounded-md">
                      {item.totalKuliner} Hidangan
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-serif font-bold text-lg text-[#fcfbf7] group-hover:text-amber-300 transition-colors">
                    {item.namaProvinsi}
                  </h3>
                  <p className="text-xs text-[#e5d7c3]/80 leading-relaxed line-clamp-2">
                    {item.deskripsiSingkat}
                  </p>
                  {item.narasiBudaya && (
                    <p className="text-[11px] text-amber-200/70 italic line-clamp-2 pt-1 border-t border-[#4d301d]/40">
                      "{item.narasiBudaya}"
                    </p>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-4 py-3 bg-[#180e07]/80 border-t border-[#4d301d]/60 flex items-center justify-between">
                <span className="text-[10px] text-[#e5d7c3]/50 font-mono">
                  ID: {item.id}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#4d301d]/60 text-amber-300 transition-colors"
                    title="Edit Provinsi"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-300 transition-colors"
                    title="Hapus Provinsi"
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
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#21140c] border border-[#4d301d]/60 rounded-3xl shadow-2xl p-6 text-stone-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-xl text-[#fcfbf7] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                {editingItem ? 'Edit Data Provinsi' : 'Tambah Provinsi Baru'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Nama Provinsi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.namaProvinsi}
                    onChange={(e) => setFormData({ ...formData, namaProvinsi: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                    placeholder="Contoh: Sulawesi Selatan"
                  />
                </div>

                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Gugus Wilayah *
                  </label>
                  <select
                    value={formData.wilayah}
                    onChange={(e) => setFormData({ ...formData, wilayah: e.target.value as any })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    <option value="SUMATERA">Sumatera</option>
                    <option value="JAWA">Jawa</option>
                    <option value="KALIMANTAN">Kalimantan</option>
                    <option value="SULAWESI">Sulawesi</option>
                    <option value="BALI">Bali</option>
                    <option value="NUSA TENGGARA">Nusa Tenggara</option>
                    <option value="MALUKU">Maluku</option>
                    <option value="PAPUA">Papua</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Ibu Kota Provinsi
                  </label>
                  <input
                    type="text"
                    value={formData.ibuKota}
                    onChange={(e) => setFormData({ ...formData, ibuKota: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                    placeholder="Contoh: Makassar"
                  />
                </div>

                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Kode ID (Slug)
                  </label>
                  <input
                    type="text"
                    disabled={Boolean(editingItem)}
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156] disabled:opacity-50"
                    placeholder="sulsel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  URL Foto Landmark / Budaya
                </label>
                <input
                  type="text"
                  required
                  value={formData.gambarUrl}
                  onChange={(e) => setFormData({ ...formData, gambarUrl: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Deskripsi Singkat Keistimewaan
                </label>
                <textarea
                  rows={2}
                  value={formData.deskripsiSingkat}
                  onChange={(e) => setFormData({ ...formData, deskripsiSingkat: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Ringkasan identitas kuliner khas daerah..."
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Narasi Kebudayaan & Tradisi Adat
                </label>
                <textarea
                  rows={3}
                  value={formData.narasiBudaya}
                  onChange={(e) => setFormData({ ...formData, narasiBudaya: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Kisah sejarah peradaban, pengaruh niaga, atau upacara boga adat..."
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#4d301d]/60">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#28170d] border border-[#4d301d]/60 text-[#e5d7c3] text-xs font-semibold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95"
                >
                  Simpan Daerah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Data Daerah?"
        message={`Apakah Anda yakin ingin menghapus provinsi "${deleteTarget?.namaProvinsi}"?`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
