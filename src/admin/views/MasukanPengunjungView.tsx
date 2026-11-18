// src/admin/views/MasukanPengunjungView.tsx
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Star, 
  Trash2, 
  Reply, 
  CheckCircle, 
  Clock, 
  X, 
  Send,
  Mail,
  Phone
} from 'lucide-react';
import { AdminService, VisitorFeedback } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function MasukanPengunjungView() {
  const { showToast } = useToast();
  const [feedbacks, setFeedbacks] = useState<VisitorFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Response Modal State
  const [activeItem, setActiveItem] = useState<VisitorFeedback | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newStatus, setNewStatus] = useState<VisitorFeedback['status']>('resolved');

  const [deleteTarget, setDeleteTarget] = useState<VisitorFeedback | null>(null);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFeedbacks(AdminService.getFeedback());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = feedbacks.filter((f) => {
    const matchesSearch = f.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.subjek.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.pesan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || f.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReply = (item: VisitorFeedback) => {
    setActiveItem(item);
    setReplyText(item.tanggapanAdmin || '');
    setNewStatus(item.status === 'pending' ? 'reviewed' : item.status);
  };

  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;

    AdminService.updateFeedbackStatus(activeItem.id, newStatus, replyText.trim());
    showToast('success', 'Tanggapan Disimpan', `Tanggapan untuk masukan "${activeItem.nama}" berhasil diperbarui.`);
    setActiveItem(null);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    AdminService.deleteFeedback(deleteTarget.id);
    showToast('success', 'Masukan Dihapus', `Masukan dari ${deleteTarget.nama} telah dihapus.`);
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            Masukan & Saran Pengunjung
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Umpan balik masyarakat mengenai resep, rasa autentik, dan pelestarian adat
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama pengirim, subjek masukan, atau nomor telepon..."
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
          <option value="pending">Menunggu Tindak Lanjut</option>
          <option value="reviewed">Sedang Ditinjau</option>
          <option value="resolved">Selesai Ditanggapi</option>
        </select>
      </div>

      {isLoading ? (
        <TableLoadingSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Masukan"
          description="Kotak masuk feedback pengunjung kosong atau sesuai filter saat ini."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/90 hover:border-[#8f521b]/50 transition-all shadow-xl space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#4d301d]/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#3d2314] border border-[#5c3a24]/60 flex items-center justify-center font-bold text-xs text-amber-300">
                    {item.nama.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#fcfbf7]">{item.nama}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-[#e5d7c3]/60">
                      {item.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-amber-400" />
                          {item.email}
                        </span>
                      )}
                      {item.nomorWa && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-amber-400" />
                          {item.nomorWa}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-amber-400' : 'opacity-20'}`}
                      />
                    ))}
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'resolved'
                      ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                      : item.status === 'reviewed'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {item.status === 'resolved' ? 'Selesai' : item.status === 'reviewed' ? 'Ditinjau' : 'Menunggu'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-amber-300 mb-1">{item.subjek}</h4>
                <p className="text-xs text-[#e5d7c3]/85 leading-relaxed bg-[#180e07]/50 p-3 rounded-xl border border-[#4d301d]/50">
                  {item.pesan}
                </p>
              </div>

              {item.tanggapanAdmin && (
                <div className="p-3 rounded-xl bg-[#28170d]/60 border border-[#4d301d]/60 text-xs">
                  <span className="font-bold text-amber-400 block mb-1">
                    Tanggapan Resmi Redaksi:
                  </span>
                  <p className="text-stone-200">{item.tanggapanAdmin}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#e5d7c3]/50">
                <span>Diterima pada: {new Date(item.createdAt).toLocaleString('id-ID')}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenReply(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#4d301d]/60 text-amber-300 font-semibold transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    Tanggapi / Ubah Status
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-300"
                    title="Hapus Masukan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tanggapan */}
      {activeItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#21140c] border border-[#4d301d]/60 rounded-3xl shadow-2xl p-6 text-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-lg text-[#fcfbf7]">
                Tindak Lanjut Masukan Pengunjung
              </h3>
              <button
                onClick={() => setActiveItem(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReply} className="mt-4 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#180e07] border border-[#4d301d]/60">
                <p className="text-[11px] text-amber-300 font-semibold">{activeItem.nama} - {activeItem.subjek}</p>
                <p className="text-[#e5d7c3]/70 text-xs mt-1">{activeItem.pesan}</p>
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Status Tindak Lanjut
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                >
                  <option value="pending">Menunggu (Pending)</option>
                  <option value="reviewed">Sedang Ditinjau (Reviewed)</option>
                  <option value="resolved">Selesai (Resolved)</option>
                  <option value="spam">Tandai Spam</option>
                </select>
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Catatan / Balasan Tanggapan Admin
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl p-3 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Tuliskan jawaban apresiasi atau klarifikasi resep..."
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#4d301d]/60">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#28170d] border border-[#4d301d]/60 text-[#e5d7c3] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/50"
                >
                  Simpan Status & Tanggapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Masukan?"
        message={`Apakah Anda yakin ingin menghapus masukan dari "${deleteTarget?.nama}"?`}
        confirmText="Hapus"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
