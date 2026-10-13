import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Download, RefreshCw, ExternalLink, HardDrive, Check } from 'lucide-react';

export const AdminSpreadsheetView: React.FC = () => {
  const { products, inquiries, testimonials, announcement, banners, resetAllDataToDefault } = useApp();

  const [activeSheet, setActiveSheet] = useState<'Produk' | 'Inquiry' | 'Testimoni' | 'Pengumuman' | 'Banner Promo'>('Produk');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const sheets = ['Produk', 'Inquiry', 'Testimoni', 'Pengumuman', 'Banner Promo'] as const;

  const handleExportJson = () => {
    const dataMap = {
      Produk: products,
      Inquiry: inquiries,
      Testimoni: testimonials,
      Pengumuman: [announcement],
      'Banner Promo': banners,
    };

    const blob = new Blob([JSON.stringify(dataMap[activeSheet], null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GoogleSheets_Database_${activeSheet}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-base font-bold text-white">Google Sheets Database Emulator</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Database utama sistem sesuai PRD Bab 4 (Produk, Inquiry, Testimoni, Pengumuman, Banner Promo).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3 py-1.5 text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>Export Sheet (.json)</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset seluruh data ke template awal Google Sheets?')) {
                resetAllDataToDefault();
              }
            }}
            className="px-3 py-1.5 text-xs font-medium bg-neutral-900 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-300 border border-neutral-800 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Spreadsheet Tabs */}
      <div className="flex items-center gap-1 border-b border-neutral-800 bg-neutral-950 p-1.5 rounded-t-xl overflow-x-auto">
        {sheets.map(sheetName => (
          <button
            key={sheetName}
            onClick={() => setActiveSheet(sheetName)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeSheet === sheetName
                ? 'bg-neutral-800 text-emerald-400 border border-neutral-700 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Sheet: {sheetName}</span>
          </button>
        ))}
      </div>

      {/* Spreadsheet Table View */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-b-xl overflow-x-auto">
        {activeSheet === 'Produk' && (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">A (ID)</th>
                <th className="py-2.5 px-3">B (Nama)</th>
                <th className="py-2.5 px-3">C (Deskripsi)</th>
                <th className="py-2.5 px-3">D (Harga IDR)</th>
                <th className="py-2.5 px-3">E (URL Gambar)</th>
                <th className="py-2.5 px-3">F (Status)</th>
                <th className="py-2.5 px-3">G (Dilihat)</th>
                <th className="py-2.5 px-3">H (Tanggal Dibuat)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {products.map((p, idx) => (
                <tr key={p.id} className="hover:bg-neutral-800/50">
                  <td className="py-2 px-3 text-cyan-400">{p.id}</td>
                  <td className="py-2 px-3 font-sans font-semibold text-white whitespace-nowrap">{p.nama}</td>
                  <td className="py-2 px-3 font-sans max-w-xs truncate">{p.deskripsi}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{p.harga}</td>
                  <td className="py-2 px-3 max-w-[150px] truncate text-neutral-500">{p.urlGambar}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{p.statusTampil}</td>
                  <td className="py-2 px-3">{p.jumlahDilihat}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{p.tanggalDibuat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSheet === 'Inquiry' && (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">A (ID)</th>
                <th className="py-2.5 px-3">B (Nama)</th>
                <th className="py-2.5 px-3">C (Email)</th>
                <th className="py-2.5 px-3">D (WhatsApp)</th>
                <th className="py-2.5 px-3">E (Produk)</th>
                <th className="py-2.5 px-3">F (Pesan)</th>
                <th className="py-2.5 px-3">G (Status)</th>
                <th className="py-2.5 px-3">H (Tanggal Masuk)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {inquiries.map(i => (
                <tr key={i.id} className="hover:bg-neutral-800/50">
                  <td className="py-2 px-3 text-cyan-400">{i.id}</td>
                  <td className="py-2 px-3 font-sans font-semibold text-white whitespace-nowrap">{i.nama}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{i.email}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{i.telepon}</td>
                  <td className="py-2 px-3 font-sans max-w-[180px] truncate">{i.namaProduk}</td>
                  <td className="py-2 px-3 font-sans max-w-xs truncate">{i.pesan}</td>
                  <td className="py-2 px-3 whitespace-nowrap text-amber-300">{i.status}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{i.tanggalMasuk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSheet === 'Testimoni' && (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">A (ID)</th>
                <th className="py-2.5 px-3">B (Nama)</th>
                <th className="py-2.5 px-3">C (Pekerjaan)</th>
                <th className="py-2.5 px-3">D (Isi Testimoni)</th>
                <th className="py-2.5 px-3">E (Foto Profil)</th>
                <th className="py-2.5 px-3">F (URL Bukti Drive)</th>
                <th className="py-2.5 px-3">G (Approval)</th>
                <th className="py-2.5 px-3">H (Tanggal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {testimonials.map(t => (
                <tr key={t.id} className="hover:bg-neutral-800/50">
                  <td className="py-2 px-3 text-cyan-400">{t.id}</td>
                  <td className="py-2 px-3 font-sans font-semibold text-white whitespace-nowrap">{t.nama}</td>
                  <td className="py-2 px-3 font-sans whitespace-nowrap">{t.pekerjaan}</td>
                  <td className="py-2 px-3 font-sans max-w-xs truncate">{t.isi}</td>
                  <td className="py-2 px-3 max-w-[120px] truncate text-neutral-500">{t.urlFotoProfil}</td>
                  <td className="py-2 px-3 max-w-[140px] truncate text-cyan-400">{t.urlBukti}</td>
                  <td className="py-2 px-3 whitespace-nowrap font-sans font-medium text-emerald-400">{t.statusApproval}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{t.tanggalKirim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSheet === 'Pengumuman' && (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">A (Teks Berjalan)</th>
                <th className="py-2.5 px-3">B (Warna Neon Aktif)</th>
                <th className="py-2.5 px-3">C (Status Aktif)</th>
                <th className="py-2.5 px-3">D (Kecepatan Detik)</th>
                <th className="py-2.5 px-3">E (Tautan Link)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              <tr className="hover:bg-neutral-800/50">
                <td className="py-2.5 px-3 font-sans font-medium text-white max-w-lg">{announcement.teks}</td>
                <td className="py-2.5 px-3 text-cyan-400 font-bold">{announcement.warna}</td>
                <td className="py-2.5 px-3">{announcement.statusAktif ? 'TRUE' : 'FALSE'}</td>
                <td className="py-2.5 px-3">{announcement.kecepatanDetik}s</td>
                <td className="py-2.5 px-3">{announcement.tautanUrl}</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeSheet === 'Banner Promo' && (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">A (ID)</th>
                <th className="py-2.5 px-3">B (Judul Banner)</th>
                <th className="py-2.5 px-3">C (Subjudul)</th>
                <th className="py-2.5 px-3">D (URL Gambar Drive)</th>
                <th className="py-2.5 px-3">E (Link Tujuan)</th>
                <th className="py-2.5 px-3">F (Urutan Tampil)</th>
                <th className="py-2.5 px-3">G (Status Aktif)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {banners.map(b => (
                <tr key={b.id} className="hover:bg-neutral-800/50">
                  <td className="py-2 px-3 text-cyan-400">{b.id}</td>
                  <td className="py-2 px-3 font-sans font-semibold text-white whitespace-nowrap">{b.judul}</td>
                  <td className="py-2 px-3 font-sans max-w-xs truncate">{b.subjudul}</td>
                  <td className="py-2 px-3 max-w-[140px] truncate text-neutral-500">{b.urlGambar}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{b.linkTujuan}</td>
                  <td className="py-2 px-3">{b.urutan}</td>
                  <td className="py-2 px-3">{b.statusAktif ? 'TRUE' : 'FALSE'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sistem backend beroperasi melalui <strong>Google Apps Script Web App</strong> (doGet / doPost).</span>
        </span>
        <span className="font-mono text-emerald-400 text-[11px]">
          Status: Spreadsheet Synced
        </span>
      </div>
    </div>
  );
};
