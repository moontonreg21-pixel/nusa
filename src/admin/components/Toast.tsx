// src/admin/components/Toast.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const config = {
            success: {
              icon: <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
              border: 'border-[#5c3a24]/60',
              bg: 'bg-[#29170d]/95 text-amber-100',
              badge: 'bg-[#4d2d14] text-amber-300',
            },
            warning: {
              icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
              border: 'border-amber-600/40',
              bg: 'bg-[#291e0d]/95 text-amber-100',
              badge: 'bg-amber-500/20 text-amber-300',
            },
            error: {
              icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
              border: 'border-rose-600/40',
              bg: 'bg-[#2c1015]/95 text-rose-100',
              badge: 'bg-rose-500/20 text-rose-300',
            },
            info: {
              icon: <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />,
              border: 'border-teal-600/40',
              bg: 'bg-[#0d2624]/95 text-teal-100',
              badge: 'bg-teal-500/20 text-teal-300',
            },
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right-5 fade-in ${config.bg} ${config.border}`}
            >
              {config.icon}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm tracking-wide text-stone-100">
                  {toast.title}
                </div>
                {toast.message && (
                  <p className="text-xs text-stone-300/85 mt-0.5 leading-relaxed break-words">
                    {toast.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/10"
                aria-label="Tutup notifikasi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
