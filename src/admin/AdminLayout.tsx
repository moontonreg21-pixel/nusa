// src/admin/AdminLayout.tsx
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Utensils,
  MapPin,
  FolderTree,
  BookOpen,
  Image as ImageIcon,
  Users,
  MessageSquare,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  ExternalLink,
  Sparkles,
  Database,
  User,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { ToastProvider, useToast } from './components/Toast';
import { ConfirmModal } from './components/ConfirmModal';
import { AdminService, AdminUser } from '../services/adminService';

// Views
import { DashboardView } from './views/DashboardView';
import { DataKulinerView } from './views/DataKulinerView';
import { DataDaerahView } from './views/DataDaerahView';
import { KategoriKulinerView } from './views/KategoriKulinerView';
import { ArtikelBudayaView } from './views/ArtikelBudayaView';
import { MediaManagerView } from './views/MediaManagerView';
import { PenggunaAdminView } from './views/PenggunaAdminView';
import { MasukanPengunjungView } from './views/MasukanPengunjungView';
import { LogAktivitasView } from './views/LogAktivitasView';
import { PengaturanView } from './views/PengaturanView';
import { AdminLoginView } from './views/AdminLoginView';

interface AdminLayoutProps {
  onBackToPublic: () => void;
}

export type AdminViewId =
  | 'dashboard'
  | 'kuliner'
  | 'daerah'
  | 'kategori'
  | 'artikel'
  | 'media'
  | 'pengguna'
  | 'masukan'
  | 'logs'
  | 'pengaturan';

export function AdminLayout({ onBackToPublic }: AdminLayoutProps) {
  return (
    <ToastProvider>
      <AdminLayoutInner onBackToPublic={onBackToPublic} />
    </ToastProvider>
  );
}

function AdminLayoutInner({ onBackToPublic }: AdminLayoutProps) {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => AdminService.isAuthenticated());
  const [currentUser, setCurrentUser] = useState<AdminUser>(() => AdminService.getCurrentUser());
  const [activeMenu, setActiveMenu] = useState<AdminViewId>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const supabaseConfig = AdminService.getSupabaseConfig();
  const pendingFeedbackCount = AdminService.getFeedback().filter(f => f.status === 'pending').length;

  const menuItems = [
    { id: 'dashboard' as AdminViewId, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'kuliner' as AdminViewId, label: 'Data Kuliner', icon: <Utensils className="w-5 h-5" /> },
    { id: 'daerah' as AdminViewId, label: 'Data Daerah', icon: <MapPin className="w-5 h-5" /> },
    { id: 'kategori' as AdminViewId, label: 'Kategori Kuliner', icon: <FolderTree className="w-5 h-5" /> },
    { id: 'artikel' as AdminViewId, label: 'Artikel dan Cerita Budaya', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'media' as AdminViewId, label: 'Media', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'pengguna' as AdminViewId, label: 'Pengguna dan Admin', icon: <Users className="w-5 h-5" /> },
    {
      id: 'masukan' as AdminViewId,
      label: 'Masukan Pengunjung',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: pendingFeedbackCount > 0 ? pendingFeedbackCount : undefined
    },
    { id: 'logs' as AdminViewId, label: 'Log Aktivitas', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'pengaturan' as AdminViewId, label: 'Pengaturan', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleMenuClick = (id: AdminViewId) => {
    setActiveMenu(id);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmLogout = () => {
    AdminService.logout();
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
    showToast('info', 'Sampai Jumpa!', 'Sesi admin telah diakhiri dengan aman.');
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginView
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }}
        onBackToPublic={onBackToPublic}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardView onNavigate={(id) => handleMenuClick(id as AdminViewId)} />;
      case 'kuliner':
        return <DataKulinerView />;
      case 'daerah':
        return <DataDaerahView />;
      case 'kategori':
        return <KategoriKulinerView />;
      case 'artikel':
        return <ArtikelBudayaView />;
      case 'media':
        return <MediaManagerView />;
      case 'pengguna':
        return <PenggunaAdminView />;
      case 'masukan':
        return <MasukanPengunjungView />;
      case 'logs':
        return <LogAktivitasView />;
      case 'pengaturan':
        return <PengaturanView />;
      default:
        return <DashboardView onNavigate={(id) => handleMenuClick(id as AdminViewId)} />;
    }
  };

  return (
    <div className="min-h-screen batik-admin-bg text-[#f5ece0] font-sans flex flex-col selection:bg-[#c8883b] selection:text-stone-950">
      {/* Container Layout */}
      <div className="flex-1 flex w-full relative">
        {/* SIDEBAR DESKTOP */}
        <aside
          className={`hidden md:flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out border-r border-[#4d301d]/60 bg-[#21140c]/95 sticky top-0 h-screen z-30 ${isSidebarCollapsed ? 'w-20' : 'w-64'
            }`}
        >
          {/* Top Brand Header */}
          <div className="p-4 border-b border-[#4d301d]/60 flex items-center justify-between">
            <div
              onClick={() => handleMenuClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer overflow-hidden"
            >

              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <h1 className="font-serif font-black text-sm tracking-widest text-[#fcfbf7] uppercase truncate">
                    Nusa Admin
                  </h1>
                  <p className="text-[10px] text-amber-300/80 font-medium tracking-wider truncate">
                    Pusat Data Kuliner
                  </p>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg bg-[#2d1b11] hover:bg-[#3d2516] border border-[#5c3a24]/60 text-amber-200 hover:text-white transition-colors"
              title={isSidebarCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Menu List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-[#4d301d]/50">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group relative ${isActive
                    ? 'bg-gradient-to-r from-[#b5732d] to-[#8f521b] text-white font-bold shadow-lg shadow-[#140a05]/80 border border-[#dca156]/50'
                    : 'text-[#e5d7c3]/85 hover:text-[#fcfbf7] hover:bg-[#341f13]/80'
                    }`}
                >
                  <span className={`shrink-0 transition-transform ${isActive ? 'text-amber-200 scale-110' : 'text-[#dca156] group-hover:scale-110'}`}>
                    {item.icon}
                  </span>

                  {!isSidebarCollapsed && (
                    <span className="truncate flex-1 text-left">
                      {item.label}
                    </span>
                  )}

                  {!isSidebarCollapsed && item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm shrink-0">
                      {item.badge}
                    </span>
                  )}

                  {isSidebarCollapsed && item.badge && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#21140c]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar: Logout Action */}
          <div className="p-3 border-t border-[#4d301d]/60 space-y-2">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-rose-300 hover:text-rose-100 hover:bg-rose-950/60 border border-transparent hover:border-rose-900/50 transition-all"
              title={isSidebarCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 shrink-0 text-rose-400" />
              {!isSidebarCollapsed && <span className="truncate">Logout</span>}
            </button>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-xs bg-[#21140c] border-r border-[#4d301d]/60 flex flex-col justify-between p-4 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#4d301d]/60">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#b5732d] to-[#8f521b] border border-[#dca156]/40 flex items-center justify-center text-amber-200 font-bold shadow-md">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif font-black text-sm text-[#fcfbf7] uppercase">
                        Nusa Admin
                      </h2>
                      <p className="text-[10px] text-amber-300">Pusat Data Kuliner</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-stone-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = activeMenu === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${isActive
                          ? 'bg-gradient-to-r from-[#b5732d] to-[#8f521b] text-white font-bold shadow-md border border-[#dca156]/50'
                          : 'text-[#e5d7c3]/85 hover:bg-[#341f13]/80'
                          }`}
                      >
                        <span className="text-[#dca156]">{item.icon}</span>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#4d301d]/60">
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/60"
                >
                  <LogOut className="w-5 h-5 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TOP APP HEADER */}
          <header className="sticky top-0 z-20 h-18 bg-[#21140c]/95 backdrop-blur-md border-b border-[#4d301d]/60 px-4 md:px-8 flex items-center justify-between gap-4 shadow-md">
            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-[#2d1b11] border border-[#5c3a24]/60 text-stone-200"
                aria-label="Buka Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#d9c3a5]/70 uppercase tracking-widest font-semibold">
                  <span>Portal Admin</span>
                  <span>/</span>
                  <span className="text-amber-400 font-bold">
                    {menuItems.find((m) => m.id === activeMenu)?.label || 'Dashboard'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Actions, Supabase Pill, Notifications, User Account */}
            <div className="flex items-center gap-3">
              {/* Status Supabase Pill */}

              {/* Back to Public Web Button */}
              <button
                onClick={onBackToPublic}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2d1b11]/80 hover:bg-[#3d2516] border border-[#5c3a24]/60 text-amber-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
                title="Buka Website Pengunjung"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lihat Web Publik</span>
              </button>

              {/* Notification Bell with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2 rounded-xl bg-[#2d1b11]/80 hover:bg-[#3d2516] border border-[#5c3a24]/60 text-amber-300 relative transition-colors"
                  aria-label="Notifikasi"
                >
                  <Bell className="w-4 h-4 text-amber-300" />
                  {pendingFeedbackCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">
                      {pendingFeedbackCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#26170e] border border-[#5c3a24]/70 rounded-2xl shadow-2xl p-4 text-xs text-stone-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-[#4d301d]/60 mb-3">
                      <span className="font-bold text-[#fcfbf7]">Notifikasi Sistem</span>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        {pendingFeedbackCount} Masukan Baru
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pendingFeedbackCount > 0 ? (
                        <div
                          onClick={() => {
                            handleMenuClick('masukan');
                            setIsNotificationOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-[#1d1009] hover:bg-[#341f13] border border-[#4d301d]/50 cursor-pointer transition-colors"
                        >
                          <p className="font-bold text-[#fcfbf7]">Masukan Pengunjung Menunggu</p>
                          <p className="text-[11px] text-[#e5d7c3]/70 mt-0.5">
                            Ada {pendingFeedbackCount} tanggapan pengunjung yang belum ditinjau redaksi.
                          </p>
                        </div>
                      ) : (
                        <p className="text-[#e5d7c3]/60 text-center py-4">Semua masukan telah ditangani dengan baik.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Card */}
              <div className="relative">
                <div
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl bg-[#180e07] border border-[#4d301d]/70 hover:border-[#804f29]/70 cursor-pointer transition-all select-none"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-8 h-8 rounded-xl object-cover border border-[#804f29]/60"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/batik-background.jpg';
                    }}
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-[#fcfbf7] leading-tight truncate max-w-[120px]">
                      {currentUser.fullName}
                    </p>
                    <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">
                      {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'editor' ? 'Editor' : 'Kontributor'}
                    </span>
                  </div>
                </div>

                {/* Profile Popup Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#26170e] border border-[#5c3a24]/70 rounded-2xl shadow-2xl p-2 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2.5 border-b border-[#4d301d]/60 mb-1">
                      <p className="font-bold text-[#fcfbf7]">{currentUser.fullName}</p>
                      <p className="text-[10px] text-[#e5d7c3]/60 truncate font-mono">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        handleMenuClick('pengguna');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[#e5d7c3] hover:text-white hover:bg-[#341f13]/80 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#dca156]" />
                      Kelola Akun Admin
                    </button>

                    <button
                      onClick={() => {
                        handleMenuClick('pengaturan');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[#e5d7c3] hover:text-white hover:bg-[#341f13]/80 flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#dca156]" />
                      Pengaturan Supabase
                    </button>

                    <div className="pt-1 mt-1 border-t border-[#4d301d]/60">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setIsLogoutModalOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-300 hover:text-rose-100 hover:bg-rose-950/60 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* PAGE CONTENT CONTAINER */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>

          {/* ADMIN FOOTER */}
          <footer className="border-t border-[#4d301d]/60 bg-[#21140c]/90 py-4 px-6 md:px-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#e5d7c3]/60">
            <p>
              &copy; 2026 Nusa Culinary Admin Suite • Nuansa Warisan Tradisi Batik Nusantara
            </p>
            <p className="font-mono text-[11px] text-amber-400">
              v2.4.0-indonesia-culinary-enterprise
            </p>
          </footer>
        </div>
      </div>

      {/* CONFIRM LOGOUT MODAL */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Akhiri Sesi Admin?"
        message="Anda akan keluar dari Dasbor Administrasi Kuliner Nusantara dan kembali ke halaman utama pengunjung."
        confirmText="Ya, Logout"
        cancelText="Batal"
        variant="warning"
        onConfirm={handleConfirmLogout}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
