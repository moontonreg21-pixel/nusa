// src/admin/views/LogAktivitasView.tsx
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Trash2,
  Download,
  Filter,
  AlertCircle,
  CheckCircle,
  FileText,
  Clock,
  Laptop
} from 'lucide-react';
import { AdminService, ActivityLog } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function LogAktivitasView() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLogs(AdminService.getActivityLogs());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = logs.filter((l) => {
    const matchesSearch = l.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.entitas.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = selectedAction === 'ALL' || l.aksi === selectedAction;
    return matchesSearch && matchesAction;
  });

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filtered, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `security_audit_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('info', 'Log Diekspor', `${filtered.length} baris rekaman audit keamanan berhasil diunduh.`);
  };

  const handleClearLogsConfirm = () => {
    AdminService.clearActivityLogs();
    showToast('success', 'Log Dibersihkan', 'Riwayat log aktivitas telah direset.');
    setIsClearModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            Log Aktivitas & Audit Trail Keamanan
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Pencatatan rekam jejak integritas data sesuai standar kepatuhan ISO/IEC 27001
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportLogs}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#4d301d]/60 text-[#fcfbf7] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Ekspor JSON
          </button>
          <button
            onClick={() => setIsClearModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Bersihkan Log
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari email admin, entitas, atau rincian aksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl pl-10 pr-4 py-2 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none focus:border-[#dca156]"
          />
        </div>

        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
        >
          <option value="ALL">Semua Tipe Aksi</option>
          <option value="CREATE">CREATE (Penambahan Data)</option>
          <option value="UPDATE">UPDATE (Perubahan Data)</option>
          <option value="DELETE">DELETE (Penghapusan Data)</option>
          <option value="LOGIN">LOGIN (Sesi Autentikasi)</option>
          <option value="SECURITY_ALERT">SECURITY_ALERT (Peringatan)</option>
          <option value="EXPORT">EXPORT (Cadangan Data)</option>
        </select>
      </div>

      {isLoading ? (
        <TableLoadingSkeleton rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Rekaman Log"
          description="Belum ada riwayat aktivitas yang tercatat untuk filter ini."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#180e07] border-b border-[#4d301d]/60 text-[#d9c3a5]/80 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Waktu & Tanggal</th>
                <th className="py-3.5 px-4">Admin Operator</th>
                <th className="py-3.5 px-4">Aksi</th>
                <th className="py-3.5 px-4">Entitas Terkait</th>
                <th className="py-3.5 px-4">Detail Perubahan</th>
                <th className="py-3.5 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4d301d]/40 text-stone-200">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#28170d]/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#e5d7c3]/70 whitespace-nowrap">
                    {log.createdAt}
                  </td>

                  <td className="py-3.5 px-4 font-medium text-[#fcfbf7] whitespace-nowrap">
                    {log.userEmail}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${log.aksi === 'CREATE'
                        ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                        : log.aksi === 'UPDATE'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : log.aksi === 'DELETE'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : log.aksi === 'LOGIN'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                      {log.aksi}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-amber-300/90 whitespace-nowrap">
                    {log.entitas}
                  </td>

                  <td className="py-3.5 px-4 text-stone-300 max-w-xs break-words leading-relaxed">
                    {log.detail}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[10px] text-[#e5d7c3]/50 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal Clear Logs */}
      <ConfirmModal
        isOpen={isClearModalOpen}
        title="Bersihkan Semua Log Aktivitas?"
        message="Apakah Anda yakin ingin mengosongkan riwayat rekaman audit keamanan? Tindakan ini tidak dapat dibatalkan."
        confirmText="Bersihkan Riwayat"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleClearLogsConfirm}
        onClose={() => setIsClearModalOpen(false)}
      />
    </div>
  );
}
