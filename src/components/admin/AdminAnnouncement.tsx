import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NeonColor } from '../../types';
import { Sparkles, Eye, Check } from 'lucide-react';

export const AdminAnnouncement: React.FC = () => {
  const { announcement, updateAnnouncement } = useApp();

  const [text, setText] = useState(announcement.teks);
  const [color, setColor] = useState<NeonColor>(announcement.warna);
  const [isActive, setIsActive] = useState(announcement.statusAktif);
  const [speed, setSpeed] = useState(announcement.kecepatanDetik);
  const [link, setLink] = useState(announcement.tautanUrl || '#kontak');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const colors: { id: NeonColor; label: string; bg: string; text: string; glowClass: string }[] = [
    { id: 'cyan', label: 'Neon Cyan (Electric)', bg: 'bg-cyan-500', text: 'text-cyan-300', glowClass: 'neon-glow-cyan' },
    { id: 'emerald', label: 'Neon Emerald (Green)', bg: 'bg-emerald-500', text: 'text-emerald-300', glowClass: 'neon-glow-emerald' },
    { id: 'amber', label: 'Neon Amber (Gold)', bg: 'bg-amber-500', text: 'text-amber-300', glowClass: 'neon-glow-amber' },
    { id: 'rose', label: 'Neon Rose (Hot Pink)', bg: 'bg-rose-500', text: 'text-rose-300', glowClass: 'neon-glow-rose' },
    { id: 'purple', label: 'Neon Purple (Cyber)', bg: 'bg-purple-500', text: 'text-purple-300', glowClass: 'neon-glow-purple' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      teks: text,
      warna: color,
      statusAktif: isActive,
      kecepatanDetik: speed,
      tautanUrl: link,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const currentColorConfig = colors.find(c => c.id === color) || colors[0];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Atur Running Text Pengumuman Neon (F10)</span>
        </h3>
        <p className="text-xs text-neutral-400">
          Ubah teks berjalan bergaya neon yang muncul di bawah header publik. Tersimpan ke sheet "Pengumuman".
        </p>
      </div>

      {/* Live Preview Box */}
      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pratinjau Langsung (Live Preview)</span>
          </span>
          <span>{isActive ? 'Status: Ditayangkan' : 'Status: Nonaktif'}</span>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 overflow-hidden">
          {isActive ? (
            <div className={`text-xs sm:text-sm font-semibold tracking-wide ${currentColorConfig.text} ${currentColorConfig.glowClass} truncate`}>
              {text || '(Teks pengumuman kosong)'}
            </div>
          ) : (
            <div className="text-xs text-neutral-500 italic">
              Pengumuman sedang dinonaktifkan (tidak akan tampil di landing page).
            </div>
          )}
        </div>
      </div>

      {/* Form Settings */}
      <form onSubmit={handleSave} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-5">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Teks Pengumuman Berjalan *
          </label>
          <textarea
            required
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Ketik teks promo, pengumuman, atau info update..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        {/* Color Palette Selector */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-2">
            Pilihan Warna Skema Animasi Neon
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colors.map(c => (
              <button
                type="button"
                key={c.id}
                onClick={() => setColor(c.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  color === c.id
                    ? 'border-white/80 bg-neutral-800/90 shadow-md ring-1 ring-white/30'
                    : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-4 h-4 rounded-full ${c.bg} shadow-sm`} />
                  {color === c.id && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-[11px] font-semibold ${c.text}`}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Speed & Target Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Kecepatan Animasi Marquee ({speed} detik)
            </label>
            <input
              type="range"
              min={15}
              max={45}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>Cepat (15s)</span>
              <span>Sedang (28s)</span>
              <span>Santai (45s)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Tautan Klik Pengumuman (Anchor/URL)
            </label>
            <input
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="Contoh: #kontak atau https://wa.me/..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Active Switch */}
        <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                isActive ? 'bg-cyan-500 justify-end' : 'bg-neutral-800 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-neutral-950 shadow-md" />
            </div>
            <span className="text-xs text-neutral-200 font-medium">
              Aktifkan Running Text di Halaman Publik
            </span>
          </label>

          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
          >
            {savedSuccess ? 'Tersimpan!' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  );
};
