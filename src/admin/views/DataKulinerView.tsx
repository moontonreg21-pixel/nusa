// src/admin/views/DataKulinerView.tsx
import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Check, 
  X, 
  Eye, 
  Flame, 
  Clock, 
  Users, 
  Sparkles,
  Download
} from 'lucide-react';
import { AdminService, KulinerItem, DaerahItem, KategoriItem } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function DataKulinerView() {
  const { showToast } = useToast();
  const [kulinerList, setKulinerList] = useState<KulinerItem[]>([]);
  const [daerahList, setDaerahList] = useState<DaerahItem[]>([]);
  const [kategoriList, setKategoriList] = useState<KategoriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDaerah, setSelectedDaerah] = useState('ALL');
  const [selectedKategori, setSelectedKategori] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modal Form State (Tambah / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KulinerItem | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    daerahId: 'aceh',
    kategoriId: 'cat-1',
    tingkatKepedasan: 2,
    estimasiWaktu: '30 Menit',
    porsi: '2-4 Porsi',
    deskripsi: '',
    bahanBahanText: '',
    langkahResepText: '',
    sejarahFilosofi: '',
    gambarUrl: '',
    status: 'published' as 'published' | 'draft' | 'archived',
    isHalal: true,
    isUnggulan: false,
  });

  // Modal Confirm Delete State
  const [deleteTarget, setDeleteTarget] = useState<KulinerItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setKulinerList(AdminService.getKuliner());
      setDaerahList(AdminService.getDaerah());
      setKategoriList(AdminService.getKategori());
      setIsLoading(false);
    }, 200);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered List
  const filteredKuliner = kulinerList.filter((item) => {
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.daerahNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDaerah = selectedDaerah === 'ALL' || item.daerahId === selectedDaerah;
    const matchesKategori = selectedKategori === 'ALL' || item.kategoriId === selectedKategori;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
    return matchesSearch && matchesDaerah && matchesKategori && matchesStatus;
  });

  // Handlers for Form
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      nama: '',
      daerahId: daerahList[0]?.id || 'aceh',
      kategoriId: kategoriList[0]?.id || 'cat-1',
      tingkatKepedasan: 2,
      estimasiWaktu: '30 Menit',
      porsi: '2-4 Porsi',
      deskripsi: '',
      bahanBahanText: '500g Daging/Bahan Utama\n2 batang Serai\n3 lembar Daun Jeruk\nBumbu Halus Bawang & Cabai',
      langkahResepText: 'Tumis bumbu halus hingga harum.\nMasukkan bahan utama dan kaldu.\nMasak hingga empuk dan bumbu meresap sempurna.',
      sejarahFilosofi: '',
      gambarUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      status: 'published',
      isHalal: true,
      isUnggulan: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: KulinerItem) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      daerahId: item.daerahId,
      kategoriId: item.kategoriId,
      tingkatKepedasan: item.tingkatKepedasan,
      estimasiWaktu: item.estimasiWaktu,
      porsi: item.porsi,
      deskripsi: item.deskripsi,
      bahanBahanText: item.bahanBahan.join('\n'),
      langkahResepText: item.langkahResep.join('\n'),
      sejarahFilosofi: item.sejarahFilosofi,
      gambarUrl: item.gambarUrl,
      status: item.status,
      isHalal: item.isHalal,
      isUnggulan: item.isUnggulan,
    });
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      showToast('error', 'Nama Kuliner Diperlukan', 'Harap isi nama hidangan sebelum menyimpan.');
      return;
    }

    const daerahObj = daerahList.find((d) => d.id === formData.daerahId);
    const kategoriObj = kategoriList.find((k) => k.id === formData.kategoriId);

    const bahanArray = formData.bahanBahanText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const langkahArray = formData.langkahResepText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingItem) {
      AdminService.updateKuliner(editingItem.id, {
        nama: formData.nama,
        daerahId: formData.daerahId,
        daerahNama: daerahObj ? daerahObj.namaProvinsi : editingItem.daerahNama,
        kategoriId: formData.kategoriId,
        kategoriNama: kategoriObj ? kategoriObj.nama : editingItem.kategoriNama,
        tingkatKepedasan: formData.tingkatKepedasan,
        estimasiWaktu: formData.estimasiWaktu,
        porsi: formData.porsi,
        deskripsi: formData.deskripsi,
        bahanBahan: bahanArray,
        langkahResep: langkahArray,
        sejarahFilosofi: formData.sejarahFilosofi,
        gambarUrl: formData.gambarUrl,
        status: formData.status,
        isHalal: formData.isHalal,
        isUnggulan: formData.isUnggulan,
      });
      showToast('success', 'Kuliner Diperbarui', `Hidangan "${formData.nama}" berhasil disimpan.`);
    } else {
      AdminService.addKuliner({
        nama: formData.nama,
        daerahId: formData.daerahId,
        daerahNama: daerahObj ? daerahObj.namaProvinsi : 'Nusantara',
        kategoriId: formData.kategoriId,
        kategoriNama: kategoriObj ? kategoriObj.nama : 'Makanan Utama',
        tingkatKepedasan: formData.tingkatKepedasan,
        estimasiWaktu: formData.estimasiWaktu,
        porsi: formData.porsi,
        deskripsi: formData.deskripsi,
        bahanBahan: bahanArray,
        langkahResep: langkahArray,
        sejarahFilosofi: formData.sejarahFilosofi,
        gambarUrl: formData.gambarUrl,
        status: formData.status,
        isHalal: formData.isHalal,
        isUnggulan: formData.isUnggulan,
      });
      showToast('success', 'Kuliner Ditambahkan', `Hidangan "${formData.nama}" berhasil didaftarkan ke arsip.`);
    }

    setIsFormOpen(false);
    loadData();
  };

  const handleToggleUnggulan = (item: KulinerItem) => {
    AdminService.updateKuliner(item.id, { isUnggulan: !item.isUnggulan });
    showToast('info', 'Status Unggulan Berubah', `"${item.nama}" ${!item.isUnggulan ? 'ditandai sebagai unggulan' : 'dihapus dari unggulan'}.`);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setTimeout(() => {
      AdminService.deleteKuliner(deleteTarget.id);
      showToast('success', 'Kuliner Dihapus', `Data "${deleteTarget.nama}" berhasil dihapus dari sistem.`);
      setIsDeleting(false);
      setDeleteTarget(null);
      loadData();
    }, 300);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredKuliner, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `data_kuliner_nusa_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('info', 'Data Diekspor', `${filteredKuliner.length} data kuliner berhasil diunduh dalam format JSON.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <Utensils className="w-6 h-6 text-amber-400" />
            Manajemen Data Kuliner Nusantara
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Total {kulinerList.length} resep & hidangan terarsip dalam database
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-[#fcfbf7] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Ekspor JSON
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#140a05]/50 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Kuliner
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-lg flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama makanan, daerah, atau bahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl pl-10 pr-4 py-2 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none focus:border-[#dca156] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Daerah */}
          <select
            value={selectedDaerah}
            onChange={(e) => setSelectedDaerah(e.target.value)}
            className="bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
          >
            <option value="ALL">Semua Daerah</option>
            {daerahList.map((d) => (
              <option key={d.id} value={d.id}>{d.namaProvinsi}</option>
            ))}
          </select>

          {/* Kategori */}
          <select
            value={selectedKategori}
            onChange={(e) => setSelectedKategori(e.target.value)}
            className="bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
          >
            <option value="ALL">Semua Kategori</option>
            {kategoriList.map((k) => (
              <option key={k.id} value={k.id}>{k.nama}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
          >
            <option value="ALL">Semua Status</option>
            <option value="published">Terbit (Published)</option>
            <option value="draft">Draf (Draft)</option>
            <option value="archived">Diarsipkan</option>
          </select>
        </div>
      </div>

      {/* Main Table View */}
      {isLoading ? (
        <TableLoadingSkeleton rows={5} />
      ) : filteredKuliner.length === 0 ? (
        <EmptyState
          title="Tidak Ada Kuliner Ditemukan"
          description="Coba ubah kata kunci pencarian atau bersihkan filter di atas."
          actionText="Tambah Kuliner Baru"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#180e07] border-b border-[#4d301d]/60 text-[#d9c3a5] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Kuliner & Foto</th>
                <th className="py-3.5 px-4">Asal Daerah</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Pedas & Waktu</th>
                <th className="py-3.5 px-4">Unggulan</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4d301d]/40 text-stone-200">
              {filteredKuliner.map((dish) => (
                <tr
                  key={dish.id}
                  className="hover:bg-[#2d1a0e]/60 transition-colors group"
                >
                  {/* Foto & Nama */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.gambarUrl}
                        alt={dish.nama}
                        className="w-12 h-12 rounded-xl object-cover border border-[#52331c]/60 shrink-0 bg-stone-900"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/batik-background.jpg';
                        }}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-[#fcfbf7] group-hover:text-amber-300 transition-colors block truncate max-w-[220px]">
                          {dish.nama}
                        </span>
                        <span className="text-[11px] text-[#e5d7c3]/60 truncate block max-w-[220px]">
                          {dish.deskripsi}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Daerah */}
                  <td className="py-3.5 px-4 font-semibold text-amber-300/90 whitespace-nowrap">
                    {dish.daerahNama}
                  </td>

                  {/* Kategori */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-lg bg-[#2d1b11] border border-[#5c3a24]/60 text-amber-300 font-medium text-[11px]">
                      {dish.kategoriNama}
                    </span>
                  </td>

                  {/* Pedas & Waktu */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-rose-400">
                        <Flame className="w-3.5 h-3.5" />
                        <span className="font-bold">Level {dish.tingkatKepedasan}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#e5d7c3]/60 text-[10px]">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {dish.estimasiWaktu}
                      </div>
                    </div>
                  </td>

                  {/* Unggulan */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleUnggulan(dish)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        dish.isUnggulan
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-[#180e07] text-stone-500 border-[#52331c]/50 hover:text-amber-300'
                      }`}
                      title={dish.isUnggulan ? 'Hapus dari Unggulan' : 'Jadikan Unggulan'}
                    >
                      <Star className={`w-4 h-4 ${dish.isUnggulan ? 'fill-amber-400' : ''}`} />
                    </button>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      dish.status === 'published'
                        ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                        : dish.status === 'draft'
                        ? 'bg-stone-700/30 text-stone-300 border border-stone-600/40'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                    }`}>
                      {dish.status === 'published' ? 'Terbit' : dish.status === 'draft' ? 'Draf' : 'Arsip'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(dish)}
                        className="p-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-amber-300 transition-colors cursor-pointer"
                        title="Edit Data"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(dish)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-300 transition-colors cursor-pointer"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form Tambah / Edit */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#21140c] border border-[#4d301d]/80 rounded-3xl shadow-2xl p-6 text-stone-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-xl text-[#fcfbf7] flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-400" />
                {editingItem ? 'Perbarui Data Kuliner' : 'Tambah Kuliner Baru'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama */}
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Nama Hidangan *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                    placeholder="Contoh: Rendang Daging Sapi Minang"
                  />
                </div>

                {/* Daerah */}
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Provinsi / Asal Daerah *
                  </label>
                  <select
                    value={formData.daerahId}
                    onChange={(e) => setFormData({ ...formData, daerahId: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    {daerahList.map((d) => (
                      <option key={d.id} value={d.id}>{d.namaProvinsi} ({d.wilayah})</option>
                    ))}
                  </select>
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Kategori Kuliner *
                  </label>
                  <select
                    value={formData.kategoriId}
                    onChange={(e) => setFormData({ ...formData, kategoriId: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    {kategoriList.map((k) => (
                      <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                  </select>
                </div>

                {/* Tingkat Kepedasan */}
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Tingkat Kepedasan (0 - 5)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={5}
                      value={formData.tingkatKepedasan}
                      onChange={(e) => setFormData({ ...formData, tingkatKepedasan: parseInt(e.target.value) })}
                      className="flex-1 accent-[#c8883b]"
                    />
                    <span className="font-bold text-amber-300 min-w-8">
                      Lvl {formData.tingkatKepedasan}
                    </span>
                  </div>
                </div>

                {/* Estimasi Waktu */}
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Estimasi Waktu Memasak
                  </label>
                  <input
                    type="text"
                    value={formData.estimasiWaktu}
                    onChange={(e) => setFormData({ ...formData, estimasiWaktu: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                    placeholder="Contoh: 45 Menit / 4 Jam"
                  />
                </div>

                {/* Porsi */}
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Porsi Hidangan
                  </label>
                  <input
                    type="text"
                    value={formData.porsi}
                    onChange={(e) => setFormData({ ...formData, porsi: e.target.value })}
                    className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                    placeholder="Contoh: 4-6 Porsi"
                  />
                </div>
              </div>

              {/* URL Foto */}
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  URL Foto Hidangan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.gambarUrl}
                  onChange={(e) => setFormData({ ...formData, gambarUrl: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Deskripsi Ringkas
                </label>
                <textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Ringkasan cita rasa dan keunikan hidangan..."
                />
              </div>

              {/* Bahan-bahan (1 baris per item) */}
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Bahan-Bahan (Tulis 1 baris untuk tiap bahan)
                </label>
                <textarea
                  rows={4}
                  value={formData.bahanBahanText}
                  onChange={(e) => setFormData({ ...formData, bahanBahanText: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl p-3 font-mono text-[11px] text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="1 kg Daging Sapi&#10;1000 ml Santan Kelapa&#10;5 lembar Daun Jeruk..."
                />
              </div>

              {/* Langkah Resep (1 baris per langkah) */}
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Langkah Pembuatan Resep (Tulis 1 baris per tahapan)
                </label>
                <textarea
                  rows={4}
                  value={formData.langkahResepText}
                  onChange={(e) => setFormData({ ...formData, langkahResepText: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl p-3 font-mono text-[11px] text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Tumis bumbu halus sampai wangi...&#10;Masukkan santan dan aduk berkala..."
                />
              </div>

              {/* Sejarah & Filosofi Budaya */}
              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Sejarah, Adat & Filosofi Budaya
                </label>
                <textarea
                  rows={3}
                  value={formData.sejarahFilosofi}
                  onChange={(e) => setFormData({ ...formData, sejarahFilosofi: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#52331c]/70 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Cerita asal-usul, upacara adat, atau filosofi rempah..."
                />
              </div>

              {/* Status & Checkboxes */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#4d301d]/60">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isHalal}
                      onChange={(e) => setFormData({ ...formData, isHalal: e.target.checked })}
                      className="accent-[#c8883b] rounded"
                    />
                    <span className="text-[#fcfbf7] font-semibold">Tersertifikasi / Halal</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isUnggulan}
                      onChange={(e) => setFormData({ ...formData, isUnggulan: e.target.checked })}
                      className="accent-[#c8883b] rounded"
                    />
                    <span className="text-[#fcfbf7] font-semibold">Tampilkan di Unggulan</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#d9c3a5]">Status Publikasi:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="bg-[#180e07] border border-[#52331c]/70 rounded-xl px-3 py-1.5 text-xs text-[#fcfbf7]"
                  >
                    <option value="published">Terbit (Published)</option>
                    <option value="draft">Draf (Draft)</option>
                    <option value="archived">Diarsipkan</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#4d301d]/60">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-[#e5d7c3] hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#140a05]/50 transition-all active:scale-95 cursor-pointer"
                >
                  Simpan Kuliner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal Delete */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Data Kuliner?"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.nama}" dari arsip? Tindakan ini akan dicatat ke dalam log audit keamanan.`}
        confirmText="Hapus Permanen"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
