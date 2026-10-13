import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, ShieldCheck, Database, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { banners, setSelectedProductForInquiry } = useApp();
  const activeBanners = banners.filter(b => b.statusAktif).sort((a, b) => a.urutan - b.urutan);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance banner every 6 seconds if multiple
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const activeBanner = activeBanners[currentSlide] || activeBanners[0];

  return (
    <section id="beranda" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Headline + Developer Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              <span>Etalase Resmi Google Apps Script Developer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Otomasi Bisnis Anda dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Web App Google Sheets</span> Siap Pakai.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Selamat datang di studio digital <strong>Mandala</strong>. Dapatkan sistem kasir POS, CRM pipeline, presensi GPS, dan otomasi WhatsApp terintegrasi penuh tanpa biaya sewa server bulanan.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Database di Google Sheets Anda</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Nol Biaya Langganan Server / Cloud</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Bebas Kustomisasi Sesuai SOP Usaha</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Garansi Setup & Panduan Video</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#produk"
                className="px-6 py-3 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-lg shadow-cyan-950/50 flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Lihat Katalog Aplikasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#kontak"
                onClick={() => setSelectedProductForInquiry(null)}
                className="px-5 py-3 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              >
                Konsultasi Kustom Gratis
              </a>
            </div>
          </div>

          {/* Right Column: Hero Promo Banner Carousel (PRD F5) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
              {activeBanner ? (
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-950 group">
                  <img
                    src={activeBanner.urlGambar}
                    alt={activeBanner.judul}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-6">
                    <div className="inline-block self-start mb-2 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-cyan-300 bg-cyan-950/90 border border-cyan-800/80 rounded">
                      {activeBanner.badgePromo || 'PROMO KHUSUS'}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 leading-snug">
                      {activeBanner.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mb-4">
                      {activeBanner.subjudul}
                    </p>

                    <div className="flex items-center justify-between">
                      <a
                        href={activeBanner.linkTujuan || '#produk'}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        <span>Jelajahi Solusi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>

                      {/* Navigation Dots */}
                      {activeBanners.length > 1 && (
                        <div className="flex items-center gap-1.5">
                          {activeBanners.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentSlide === index ? 'w-5 bg-cyan-400' : 'bg-neutral-600 hover:bg-neutral-400'
                              }`}
                              aria-label={`Slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Previous / Next Controls */}
                  {activeBanners.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentSlide(prev => (prev === 0 ? activeBanners.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-950/70 border border-neutral-700/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900"
                        aria-label="Banner sebelumnya"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentSlide(prev => (prev + 1) % activeBanners.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-950/70 border border-neutral-700/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900"
                        aria-label="Banner berikutnya"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] flex items-center justify-center text-neutral-500">
                  Belum ada banner promo aktif
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quantified Rigor Trust Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="p-3">
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-xl sm:text-2xl font-bold text-white font-mono-numbers">100%</span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">Bebas Biaya Hosting & Server Bulanan</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-xl sm:text-2xl font-bold text-white font-mono-numbers">45+</span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">Bisnis & UKM Menggunakan Web App Kami</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xl sm:text-2xl font-bold text-white font-mono-numbers">&lt; 2 Jam</span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">Rata-rata Setup & Handover ke Google Drive</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xl sm:text-2xl font-bold text-white font-mono-numbers">Full Source</span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">Kode Milik Anda Sepenuhnya di Akun Google</p>
          </div>
        </div>
      </div>
    </section>
  );
};
