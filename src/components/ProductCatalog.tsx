import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Search, Eye, ShoppingCart, Layers, ExternalLink, Sparkles, Check, ArrowRight } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products, setSelectedProductForInquiry, incrementProductViews, setSelectedProductDetail } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'POS & Kasir', 'CRM & Pipeline', 'HR & Absensi', 'Otomasi WhatsApp', 'Keuangan & Invoice', 'Custom Script'];

  // Only show active products to public (PRD F1)
  const activeProducts = products.filter(p => p.statusTampil === 'aktif');

  const filteredProducts = activeProducts.filter(product => {
    const matchesCategory = activeCategory === 'Semua' || product.kategori === activeCategory;
    const matchesSearch =
      product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fiturUtama.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleOpenDetail = (product: Product) => {
    incrementProductViews(product.id);
    setSelectedProductDetail(product);
  };

  const handleOrderNow = (product: Product) => {
    incrementProductViews(product.id);
    setSelectedProductForInquiry(product);
    const contactElem = document.getElementById('kontak');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split into Row 1 (top, starting with StockFlow POS) and Row 2 (bottom, starting with AutoNotif WhatsApp)
  const splitIndex = Math.ceil(filteredProducts.length / 2);
  const row1Products = filteredProducts.slice(0, splitIndex);
  const row2Products = filteredProducts.slice(splitIndex);

  // Helper to duplicate items for a seamless infinite loop
  const duplicateForLoop = (list: Product[]) => {
    if (list.length === 0) return [];
    if (list.length < 4) {
      return [...list, ...list, ...list, ...list];
    }
    return [...list, ...list];
  };

  const row1Loop = duplicateForLoop(row1Products);
  const row2Loop = duplicateForLoop(row2Products.length > 0 ? row2Products : row1Products);

  const renderProductCard = (product: Product, keySuffix: string) => (
    <div
      key={`${product.id}-${keySuffix}`}
      className="w-[290px] sm:w-[350px] shrink-0 flex flex-col bg-neutral-900/80 border border-neutral-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all hover:bg-neutral-900 shadow-lg select-none group"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => handleOpenDetail(product)}>
        <img
          src={product.urlGambar}
          alt={product.nama}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80" />

        {/* Category & popularity info */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="text-[11px] font-medium bg-neutral-950/85 backdrop-blur-sm text-neutral-200 border border-neutral-800 px-2 py-0.5 rounded">
            {product.kategori}
          </span>
          {product.popular && (
            <span className="text-[11px] font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Terlaris
            </span>
          )}
        </div>

        {/* View Counter */}
        <div className="absolute bottom-2.5 right-2.5 text-xs text-neutral-300 bg-neutral-950/80 px-2 py-0.5 rounded flex items-center gap-1 font-mono-numbers">
          <Eye className="w-3 h-3 text-neutral-400" />
          <span>{product.jumlahDilihat}</span>
        </div>
      </div>

      {/* Content Box */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
            <span>{product.id}</span>
            <span aria-hidden="true">·</span>
            <span>{product.waktuPengerjaan || 'Setup Cepat'}</span>
          </div>

          <h3
            onClick={() => handleOpenDetail(product)}
            className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.nama}
          </h3>

          <p className="text-xs text-neutral-300 mt-1.5 line-clamp-2 leading-relaxed">
            {product.deskripsi}
          </p>

          {/* Feature bullets */}
          <ul className="mt-3 space-y-1 text-[11px] text-neutral-400 border-t border-neutral-800/80 pt-2.5">
            {product.fiturUtama.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Investasi</div>
            <div className="text-sm sm:text-base font-bold text-white font-mono-numbers">
              {formatRupiah(product.harga)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleOpenDetail(product)}
              className="px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors cursor-pointer"
              title="Lihat Detail & Fitur Lengkap"
            >
              Detail
            </button>

            <button
              onClick={() => handleOrderNow(product)}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-md transition-colors flex items-center gap-1 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Beli</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="produk" className="py-16 sm:py-24 border-t border-neutral-900 bg-neutral-950/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - STAYS STATIC */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Etalase Produk Siap Pakai</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Katalog Web App Google Apps Script
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Seluruh aplikasi web dibuat dengan Google Apps Script, berjalan langsung di akun Google Drive pribadi Anda tanpa beban biaya server bulanan.
            </p>
          </div>

          {/* Search Input - STAYS STATIC */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari solusi atau fitur..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters: Functional segmented control - STAYS STATIC */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-neutral-950 font-semibold shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Dual-Direction Running Marquees */}
      {filteredProducts.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 text-center py-16 border border-dashed border-neutral-800 rounded-xl bg-neutral-900/30">
          <p className="text-neutral-400 text-sm">Tidak ditemukan produk untuk kriteria ini.</p>
          <button
            onClick={() => {
              setActiveCategory('Semua');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Reset filter pencarian
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* BARIS ATAS: Bergerak ke KIRI (mulai dari StockFlow POS) */}
          <div className="relative">
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

            <div className="animate-marquee-left flex items-stretch gap-6 px-4">
              {row1Loop.map((p, idx) => renderProductCard(p, `row1-${idx}`))}
            </div>
          </div>

          {/* BARIS BAWAH: Bergerak ke KANAN (mulai dari AutoNotif WhatsApp & Gmail) */}
          <div className="relative">
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

            <div className="animate-marquee-right flex items-stretch gap-6 px-4">
              {row2Loop.map((p, idx) => renderProductCard(p, `row2-${idx}`))}
            </div>
          </div>

          {/* User interaction hint */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 pt-2 gap-2">
            <span>* Arahkan kursor atau sentuh kartu untuk menjeda animasi dan melihat detail aplikasi.</span>
            <span className="font-mono text-cyan-400/80">Baris Atas: Bergerak ke Kiri ◀ · Baris Bawah: Bergerak ke Kanan ▶</span>
          </div>
        </div>
      )}
    </section>
  );
};
