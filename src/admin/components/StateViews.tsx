// src/admin/components/StateViews.tsx
import React from 'react';
import { AlertCircle, RefreshCw, Sparkles, FolderX, UtensilsCrossed } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'Belum Ada Data Tersimpan',
  description = 'Data saat ini masih kosong atau tidak ditemukan dengan filter yang dipilih.',
  actionText,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-[#52331c]/60 bg-[#21140c]/40 my-6">
      <div className="w-16 h-16 rounded-2xl bg-[#2d1b11] border border-[#5c3a24]/50 flex items-center justify-center text-amber-300 mb-4 shadow-inner">
        {icon || <UtensilsCrossed className="w-8 h-8 opacity-80" />}
      </div>
      <h3 className="text-base font-serif font-bold text-[#fcfbf7] tracking-wide mb-1">
        {title}
      </h3>
      <p className="text-xs text-[#e5d7c3]/70 max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-black/60 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          {actionText}
        </button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Gagal Memuat Data',
  message = 'Terjadi kendala saat membaca data dari penyimpanan atau server Supabase.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-2xl border border-rose-900/40 bg-[#240c10]/40 my-6">
      <div className="w-14 h-14 rounded-2xl bg-rose-950/80 border border-rose-800/40 flex items-center justify-center text-rose-400 mb-3">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-rose-100 mb-1">{title}</h3>
      <p className="text-xs text-rose-300/80 max-w-sm mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800/70 border border-rose-700/40 text-rose-100 text-xs font-semibold tracking-wider uppercase transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}

interface LoadingSkeletonProps {
  rows?: number;
}

export function TableLoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
  return (
    <div className="w-full space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 w-full bg-[#24150c]/60 border border-[#4d301d]/40 rounded-xl animate-pulse flex items-center px-4 gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-[#3d2314]/50 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3.5 bg-[#4d301d]/50 rounded w-1/3" />
            <div className="h-2.5 bg-[#3d2314]/30 rounded w-1/4" />
          </div>
          <div className="w-20 h-6 bg-[#3d2314]/50 rounded-full" />
          <div className="w-16 h-8 bg-[#3d2314]/30 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
