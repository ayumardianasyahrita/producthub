import React from 'react';
import { useApp } from '../context/AppContext';
import { Megaphone } from 'lucide-react';

export const NeonAnnouncement: React.FC = () => {
  const { announcement } = useApp();

  if (!announcement.statusAktif || !announcement.teks.trim()) {
    return null;
  }

  // Neon color mapping
  const colorStyles: Record<string, { bar: string; text: string; glow: string; badge: string }> = {
    cyan: {
      bar: 'bg-cyan-950/40 border-cyan-800/40 text-cyan-300',
      text: 'text-cyan-200 neon-glow-cyan',
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.15)]',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    emerald: {
      bar: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300',
      text: 'text-emerald-200 neon-glow-emerald',
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    amber: {
      bar: 'bg-amber-950/40 border-amber-800/40 text-amber-300',
      text: 'text-amber-200 neon-glow-amber',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.15)]',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    rose: {
      bar: 'bg-rose-950/40 border-rose-800/40 text-rose-300',
      text: 'text-rose-200 neon-glow-rose',
      glow: 'shadow-[0_0_12px_rgba(244,63,94,0.15)]',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    purple: {
      bar: 'bg-purple-950/40 border-purple-800/40 text-purple-300',
      text: 'text-purple-200 neon-glow-purple',
      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.15)]',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
  };

  const style = colorStyles[announcement.warna] || colorStyles.cyan;

  return (
    <div className={`relative overflow-hidden border-b ${style.bar} ${style.glow} py-2.5 transition-all`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
        {/* Label Icon */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border shrink-0 z-10 bg-neutral-950/80 ${style.badge}`}>
          <Megaphone className="w-3.5 h-3.5" />
          <span>Pengumuman</span>
        </div>

        {/* Marquee viewport */}
        <div className="relative flex-1 overflow-hidden select-none">
          <div
            className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide flex items-center gap-12"
            style={{ animationDuration: `${announcement.kecepatanDetik || 28}s` }}
          >
            <a
              href={announcement.tautanUrl || '#kontak'}
              className={`hover:underline flex items-center gap-4 ${style.text}`}
            >
              <span>{announcement.teks}</span>
              <span className="opacity-40">✦</span>
              <span>{announcement.teks}</span>
              <span className="opacity-40">✦</span>
            </a>
            <a
              href={announcement.tautanUrl || '#kontak'}
              className={`hover:underline flex items-center gap-4 ${style.text}`}
            >
              <span>{announcement.teks}</span>
              <span className="opacity-40">✦</span>
              <span>{announcement.teks}</span>
              <span className="opacity-40">✦</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
