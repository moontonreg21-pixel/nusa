// src/admin/components/StatCard.tsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  icon: React.ReactNode;
  accentColor?: 'emerald' | 'amber' | 'teal' | 'cream';
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  change,
  trend = 'up',
  subtitle,
  icon,
  accentColor = 'emerald',
  onClick,
}: StatCardProps) {
  const accentStyles = {
    emerald: {
      border: 'border-[#5c3a24]/60 hover:border-[#8f521b]/80',
      bg: 'bg-gradient-to-br from-[#2e1a0e] to-[#1c0f08]',
      iconBg: 'bg-[#3d2313]/70 text-amber-300 border-[#6b3e1c]/60',
      glow: 'shadow-black/60',
    },
    amber: {
      border: 'border-amber-800/40 hover:border-amber-600/60',
      bg: 'bg-gradient-to-br from-[#241a0d] to-[#120d06]',
      iconBg: 'bg-amber-900/50 text-amber-300 border-amber-700/40',
      glow: 'shadow-amber-950/40',
    },
    teal: {
      border: 'border-[#4d301d]/60 hover:border-[#6b3e1c]/80',
      bg: 'bg-gradient-to-br from-[#29170d] to-[#170c06]',
      iconBg: 'bg-[#3b2011]/70 text-[#dca156] border-[#5c3a24]/60',
      glow: 'shadow-black/60',
    },
    cream: {
      border: 'border-[#d4c5b0]/30 hover:border-[#e5d7c3]/60',
      bg: 'bg-gradient-to-br from-[#25150d] to-[#150a04]',
      iconBg: 'bg-[#e5d7c3]/15 text-[#fcfbf7] border-[#e5d7c3]/30',
      glow: 'shadow-stone-950/40',
    },
  }[accentColor];

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border transition-all duration-300 shadow-xl ${accentStyles.border} ${accentStyles.bg} ${accentStyles.glow} ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-[#d9c3a5]/75">
            {title}
          </p>
          <h4 className="text-2xl font-serif font-extrabold text-[#fcfbf7] tracking-tight">
            {value}
          </h4>
        </div>
        <div className={`p-3 rounded-xl border ${accentStyles.iconBg}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#4d301d]/60 flex items-center justify-between text-xs">
        {change && (
          <div className="flex items-center gap-1 font-semibold">
            {trend === 'up' && (
              <span className="flex items-center gap-0.5 text-amber-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
            {trend === 'down' && (
              <span className="flex items-center gap-0.5 text-rose-400">
                <ArrowDownRight className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
            {trend === 'neutral' && (
              <span className="flex items-center gap-0.5 text-[#d9c3a5]/70">
                <Minus className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
          </div>
        )}
        {subtitle && (
          <span className="text-[11px] text-[#e5d7c3]/60 ml-auto">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
