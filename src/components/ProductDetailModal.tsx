import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShoppingCart, Database, Zap, FileSpreadsheet, Shield } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductDetail, setSelectedProductDetail, setSelectedProductForInquiry } = useApp();

  if (!selectedProductDetail) return null;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleOrder = () => {
    const product = selectedProductDetail;
    setSelectedProductDetail(null);
    setSelectedProductForInquiry(product);
    const el = document.getElementById('kontak');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded">
              {selectedProductDetail.kategori}
            </span>
            <span className="text-xs text-neutral-400 font-mono-numbers">
              ID: {selectedProductDetail.id}
            </span>
          </div>

          <button
            onClick={() => setSelectedProductDetail(null)}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Media & Overview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
            <img
              src={selectedProductDetail.urlGambar}
              alt={selectedProductDetail.nama}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent flex items-end p-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedProductDetail.nama}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                  {selectedProductDetail.deskripsi}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Deskripsi Solusi
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {selectedProductDetail.deskripsiLengkap || selectedProductDetail.deskripsi}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Fitur Utama & Keunggulan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedProductDetail.fiturUtama.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200 bg-neutral-950/50 p-2.5 rounded-lg border border-neutral-800/70">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Integrations */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
              Integrasi Google Workspace
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProductDetail.integrasi.map((integ, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-medium text-neutral-300"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{integ}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Guarantee & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Instalasi & Setup: <strong>{selectedProductDetail.waktuPengerjaan || '1-2 Jam'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Database: <strong>Google Spreadsheet Anda</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Garansi: <strong>Bug Fix & Pendampingan</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-neutral-400">Harga Paket Lengkap</div>
            <div className="text-xl font-bold text-white font-mono-numbers">
              {formatRupiah(selectedProductDetail.harga)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProductDetail(null)}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleOrder}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Pesan & Buat Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
