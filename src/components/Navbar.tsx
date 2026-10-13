import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Terminal, Shield, UserCheck, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { adminUser, setIsAdminOpen, setIsLoginModalOpen, setSelectedProductForInquiry } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-neutral-950 font-black shadow-sm group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-neutral-950" />
            </span>
            <span>ProductHub Apps</span>
            <span className="hidden sm:inline-block text-xs font-normal text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded">
              GAS Studio
            </span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#beranda" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Beranda
            </a>
            <a href="#produk" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Katalog Produk
            </a>
            <a href="#testimoni" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Testimoni & Bukti
            </a>
            <a href="#kontak" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Kontak & Pesanan
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Admin portal trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {adminUser.isLoggedIn ? (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 rounded-md hover:bg-cyan-900/60 transition-colors whitespace-nowrap"
                title="Panel Admin Aktif"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Panel Admin</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors rounded-md hover:bg-neutral-900"
                title="Login Admin (Pemilik)"
              >
                <Shield className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {
                setSelectedProductForInquiry(null);
                const el = document.getElementById('kontak');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
            >
              <span>Kirim Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-3 space-y-2">
          <a
            href="#beranda"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-cyan-400"
          >
            Beranda
          </a>
          <a
            href="#produk"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-cyan-400"
          >
            Katalog Produk
          </a>
          <a
            href="#testimoni"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-cyan-400"
          >
            Testimoni & Bukti
          </a>
          <a
            href="#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-cyan-400"
          >
            Kontak & Pesanan
          </a>
          {adminUser.isLoggedIn ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="w-full text-left py-2 text-sm text-cyan-400 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Buka Panel Admin
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="w-full text-left py-2 text-sm text-neutral-400 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> Login Admin (Google)
            </button>
          )}
        </div>
      )}
    </header>
  );
};
