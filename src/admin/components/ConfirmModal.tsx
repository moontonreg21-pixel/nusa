// src/admin/components/ConfirmModal.tsx
import React from 'react';
import { AlertTriangle, Trash2, Check, X, ShieldAlert } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const config = {
    danger: {
      icon: <Trash2 className="w-6 h-6 text-rose-400" />,
      iconBg: 'bg-rose-950/60 border border-rose-800/50',
      btnBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950/50',
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      iconBg: 'bg-amber-950/60 border border-amber-800/50',
      btnBg: 'bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold shadow-amber-950/50',
    },
    primary: {
      icon: <ShieldAlert className="w-6 h-6 text-amber-400" />,
      iconBg: 'bg-[#2d1b11] border border-[#5c3a24]/60',
      btnBg: 'bg-gradient-to-r from-[#c8883b] to-[#a66824] hover:from-[#dca156] hover:to-[#b8782d] text-stone-950 font-bold shadow-black/50',
    },
  }[variant];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#21140c] border border-[#4d301d]/80 rounded-2xl shadow-2xl p-6 text-stone-200 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${config.iconBg}`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-serif font-bold text-[#fcfbf7] tracking-wide">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[#e5d7c3]/85 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#4d301d]/60">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e5d7c3] hover:text-white bg-[#28170d] hover:bg-[#382113] rounded-xl border border-[#52331c]/60 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer ${config.btnBg}`}
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
