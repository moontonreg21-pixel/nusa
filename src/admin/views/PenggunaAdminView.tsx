// src/admin/views/PenggunaAdminView.tsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Phone,
  Clock,
  X,
  UserCheck,
  KeyRound,
  Lock
} from 'lucide-react';
import { AdminService, AdminUser } from '../../services/adminService';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState, TableLoadingSkeleton } from '../components/StateViews';

export function PenggunaAdminView() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'editor' as 'super_admin' | 'editor' | 'kontributor',
    avatarUrl: 'https://i.pinimg.com/1200x/59/33/e7/5933e73bc380d86fce64f3058c63b231.jpg',
    phone: '+62 812-0000-0000',
    status: 'active' as 'active' | 'suspended',
  });

  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(AdminService.getUsers());
      setIsLoading(false);
    }, 150);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: 'editor',
      avatarUrl: 'https://i.pinimg.com/1200x/59/33/e7/5933e73bc380d86fce64f3058c63b231.jpg',
      phone: '+62 812-0000-0000',
      status: 'active',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingItem(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: '',
      role: user.role,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      status: user.status,
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      showToast('error', 'Nama dan Email Diperlukan');
      return;
    }

    if (editingItem) {
      const updates: Partial<AdminUser> = {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        avatarUrl: formData.avatarUrl,
        phone: formData.phone,
        status: formData.status,
      };
      if (formData.password.trim()) {
        updates.password = formData.password.trim();
      }
      AdminService.updateUser(editingItem.id, updates);
      showToast('success', 'Pengguna Diperbarui', `Akun ${formData.fullName} berhasil diperbarui.`);
    } else {
      AdminService.addUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password.trim() || 'admin321',
        role: formData.role,
        avatarUrl: formData.avatarUrl,
        phone: formData.phone,
        status: formData.status,
      });
      showToast('success', 'Admin Ditambahkan', `Akun ${formData.fullName} berhasil didaftarkan.`);
    }

    setIsFormOpen(false);
    loadData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    AdminService.deleteUser(deleteTarget.id);
    showToast('success', 'Pengguna Dihapus', `Akun ${deleteTarget.fullName} telah dihapus.`);
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4d301d]/60">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#fcfbf7] flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-400" />
            Pengguna dan Otoritas Admin
          </h2>
          <p className="text-xs text-[#e5d7c3]/70 mt-1">
            Manajemen hak akses, peran redaksi, dan kontrol keamanan akun
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Admin
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama admin, alamat email, atau role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl pl-10 pr-4 py-2 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none focus:border-[#dca156]"
          />
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3 py-2 text-xs text-[#fcfbf7] focus:outline-none focus:border-[#dca156]"
        >
          <option value="ALL">Semua Tingkat Akses</option>
          <option value="super_admin">Super Admin</option>
          <option value="editor">Editor Kebudayaan</option>
          <option value="kontributor">Kontributor Resep</option>
        </select>
      </div>

      {isLoading ? (
        <TableLoadingSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Pengguna"
          description="Belum ada akun admin yang cocok dengan kriteria pencarian."
          actionText="Tambah Pengguna"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#4d301d]/60 bg-[#21140c]/80 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#180e07] border-b border-[#4d301d]/60 text-[#d9c3a5]/80 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama & Foto</th>
                <th className="py-3.5 px-4">Email & Kontak</th>
                <th className="py-3.5 px-4">Hak Akses / Peran</th>
                <th className="py-3.5 px-4">Status Akun</th>
                <th className="py-3.5 px-4">Login Terakhir</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4d301d]/40 text-stone-200">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-[#28170d]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full object-cover border border-[#5c3a24]/60"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/batik-background.jpg';
                        }}
                      />
                      <span className="font-bold text-sm text-[#fcfbf7]">
                        {user.fullName}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-stone-200 font-medium">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#e5d7c3]/60">
                      <Phone className="w-3 h-3 text-amber-400" />
                      {user.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 font-mono">
                      <KeyRound className="w-3 h-3 text-amber-400" />
                      <span>Kata Sandi: Dilindungi</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'super_admin'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : user.role === 'editor'
                          ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      }`}>
                      {user.role === 'super_admin' ? 'Super Admin' : user.role === 'editor' ? 'Editor Budaya' : 'Kontributor'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-[#28170d] text-amber-400' : 'bg-rose-950 text-rose-400'
                      }`}>
                      {user.status === 'active' ? 'Aktif' : 'Ditangguhkan'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[#e5d7c3]/70 font-mono text-[11px]">
                    {user.lastLogin}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 rounded-lg bg-[#28170d] hover:bg-[#382113] border border-[#4d301d]/60 text-amber-300"
                        title="Edit Admin"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(user)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 text-rose-300"
                        title="Hapus Akun"
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

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#21140c] border border-[#4d301d]/60 rounded-3xl shadow-2xl p-6 text-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
              <h3 className="font-serif font-bold text-lg text-[#fcfbf7]">
                {editingItem ? 'Edit Akun Admin' : 'Tambah Admin Baru'}
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
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="Raden Arya Wicaksana"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  placeholder="sahila@gmail.com"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Kata Sandi / Password {editingItem ? '(Opsional - Kosongkan jika tidak diubah)' : '*'}
                </label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156] font-mono text-xs"
                  placeholder={editingItem ? 'Masukkan kata sandi baru...' : 'Kata sandi login (default: admin321)'}
                />
                <span className="text-[10px] text-amber-400/80 mt-1 block">
                  {editingItem ? 'Kosongkan jika tetap menggunakan kata sandi lama.' : 'Jika dikosongkan, kata sandi bawaan adalah admin321.'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Peran / Otoritas
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="editor">Editor Kebudayaan</option>
                    <option value="kontributor">Kontributor Resep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#d9c3a5] font-semibold mb-1">
                    Status Akun
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                  >
                    <option value="active">Aktif</option>
                    <option value="suspended">Ditangguhkan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
                />
              </div>

              <div>
                <label className="block text-[#d9c3a5] font-semibold mb-1">
                  URL Avatar / Foto Profil
                </label>
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="w-full bg-[#180e07] border border-[#4d301d]/60 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#dca156]"
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
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Hapus Akun Pengguna?"
        message={`Apakah Anda yakin ingin menghapus hak akses admin "${deleteTarget?.fullName}"?`}
        confirmText="Hapus"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
