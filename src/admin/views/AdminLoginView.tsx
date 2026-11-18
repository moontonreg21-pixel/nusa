// src/admin/views/AdminLoginView.tsx
import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  LogIn,
  AlertCircle,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Users
} from 'lucide-react';
import { AdminService, AdminUser } from '../../services/adminService';

interface AdminLoginViewProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToPublic: () => void;
}

export function AdminLoginView({ onLoginSuccess, onBackToPublic }: AdminLoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Silakan masukkan alamat email admin.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Silakan masukkan kata sandi / password.');
      return;
    }

    setIsLoading(true);

    // Realistic brief auth verification delay
    setTimeout(() => {
      const result = AdminService.login(email, password, rememberMe);
      setIsLoading(false);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setErrorMessage(result.error || 'Terjadi kesalahan saat masuk. Periksa kembali email dan password Anda.');
      }
    }, 400);
  };

  const handleQuickFill = (presetEmail: string, presetPass: string) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen batik-admin-bg bg-[#180e07] text-[#f5ece0] font-sans flex flex-col justify-between selection:bg-[#c8883b] selection:text-stone-950 relative overflow-hidden">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c8883b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8f521b]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6e411b]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#28170d] hover:bg-[#382113] border border-[#52331c]/70 text-amber-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Utama</span>
        </button>


      </header>

      {/* Center Form Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-[#24150c]/95 backdrop-blur-xl border border-[#52331c]/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80">

          {/* Header Icon & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c8883b] to-[#8f521b] border border-[#dca156]/40 shadow-lg shadow-black/60 text-stone-950 mb-4 font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#2f1b10] border border-[#5c3a24]/70 text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-2">
              Keamanan Administrator
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-[#fcfbf7] tracking-wide">
              Masuk ke Nusa Admin
            </h1>
            <p className="text-xs text-[#e5d7c3]/70 mt-1.5 leading-relaxed">
              Silakan masukkan alamat email dan kata sandi Anda untuk mengakses dasbor kelola data kuliner Nusantara.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/70 border border-rose-800/60 text-rose-200 flex items-start gap-3 text-xs animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                {errorMessage}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#d9c3a5] mb-1.5">
                Alamat Email Admin <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="admin.utama@kulinerindo.id"
                  className="w-full bg-[#180e07] border border-[#52331c] focus:border-[#dca156] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#d9c3a5] mb-1.5">
                Kata Sandi / Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="Masukkan kata sandi..."
                  className="w-full bg-[#180e07] border border-[#52331c] focus:border-[#dca156] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#fcfbf7] placeholder:text-[#e5d7c3]/40 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-300 transition-colors p-1"
                  title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#52331c] bg-[#180e07] text-[#c8883b] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[#e5d7c3]/80 text-[11px]">Ingat sesi login saya</span>
              </label>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#140a05]/70 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Memverifikasi Kredensial...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Dasbor Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-[#52331c]/60">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-2.5">

            </div>

            <div className="space-y-2">



            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-[11px] text-[#e5d7c3]/50">
        <p>&copy; 2026 Nusa Culinary Admin Suite • Akses Terbatas Khusus Pengelola Resmi</p>
      </footer>
    </div>
  );
}

