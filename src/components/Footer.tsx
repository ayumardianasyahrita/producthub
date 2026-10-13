import React from 'react';
import { useApp } from '../context/AppContext';
import { Terminal, Shield, ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { adminUser, setIsAdminOpen, setIsLoginModalOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-6 h-6 rounded bg-cyan-400 text-neutral-950 flex items-center justify-center font-black">
                <Terminal className="w-3.5 h-3.5" />
              </span>
              <span>ProductHub Apps</span>
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Solusi sistem operasional dan web apps berbasis Google Apps Script untuk UKM, praktisi, dan bisnis modern. Tanpa biaya sewa server bulanan.
            </p>
            <p className="text-neutral-500">
              Dikembangkan oleh <strong>Mandala</strong> · Senior Automation & GAS Specialist
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#beranda" className="hover:text-cyan-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-cyan-400 transition-colors">
                  Katalog Web App
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-cyan-400 transition-colors">
                  Testimoni & Bukti
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-cyan-400 transition-colors">
                  Konsultasi & Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Stack & Integrity */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Google Workspace Stack
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>Google Apps Script (V8 Engine)</li>
              <li>Google Sheets API & Database</li>
              <li>Google Drive Storage</li>
              <li>Gmail & Docs Automation</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with discreet Admin Link */}
        <div className="pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-500">
            <span>© 2026 Mandala GAS Studio. Seluruh hak cipta dilindungi.</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Discreet Admin Portal Link as requested in PRD Section 7: "link ke panel admin (tersembunyi/tidak menonjol)" */}
            {adminUser.isLoggedIn ? (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-cyan-400 transition-colors py-1 px-2 rounded hover:bg-neutral-900"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Panel Admin (Aktif)</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-400 transition-colors py-1 px-2 rounded hover:bg-neutral-900"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Akses Pengelola</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
