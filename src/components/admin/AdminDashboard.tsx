import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Eye, Package, Clock, CheckCircle2, TrendingUp, AlertCircle, Phone, Mail } from 'lucide-react';

export const AdminDashboard: React.FC<{ onNavigateTab: (tab: string) => void }> = ({ onNavigateTab }) => {
  const { inquiries, products, testimonials, updateInquiryStatus } = useApp();

  const unresolvedInquiries = inquiries.filter(i => i.status === 'Baru');
  const activeProducts = products.filter(p => p.statusTampil === 'aktif');
  const totalViews = products.reduce((acc, p) => acc + p.jumlahDilihat, 0);
  const pendingTestimonials = testimonials.filter(t => t.statusApproval === 'Menunggu Approval');

  // Sorted products by views (PRD F12)
  const topProducts = [...products].sort((a, b) => b.jumlahDilihat - a.jumlahDilihat).slice(0, 4);

  // Weekly inquiry data simulation (PRD F12)
  const weeklyData = [
    { day: 'Sen', count: 3 },
    { day: 'Sel', count: 5 },
    { day: 'Rab', count: 4 },
    { day: 'Kam', count: 7 },
    { day: 'Jum', count: 6 },
    { day: 'Sab', count: 9 },
    { day: 'Min', count: 5 },
  ];

  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Inquiry Belum Dibalas</span>
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono-numbers">
            {unresolvedInquiries.length}
          </div>
          <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Membutuhkan respons follow-up</span>
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Total Produk Aktif</span>
            <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono-numbers">
            {activeProducts.length} <span className="text-xs text-neutral-500 font-normal">/ {products.length} total</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Ditayangkan di katalog publik
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Total Kunjungan Produk</span>
            <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono-numbers">
            {totalViews}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Akumulasi klik lihat detail
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Ulasan Menunggu Approval</span>
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono-numbers">
            {pendingTestimonials.length}
          </div>
          <button
            onClick={() => onNavigateTab('testimonials')}
            className="text-[11px] text-cyan-400 hover:underline mt-1 block"
          >
            Buka antrean moderasi ➔
          </button>
        </div>
      </div>

      {/* 2-Column Section: Weekly Inquiry Graph & Top Products Views (PRD F12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Inquiries Chart */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Tren Inquiry Mingguan (Google Sheets)</span>
              </h3>
              <p className="text-xs text-neutral-400">Total 39 pesan masuk dalam 7 hari terakhir</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/80 px-2.5 py-1 rounded">
              Aktif Sync
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-neutral-800">
            {weeklyData.map((item, idx) => {
              const heightPercent = Math.round((item.count / maxWeekly) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-cyan-400 transition-colors">
                    {item.count}
                  </span>
                  <div className="w-full bg-neutral-800 rounded-t-md overflow-hidden h-32 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md group-hover:brightness-125 transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">{item.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-3">
            <span>Rata-rata 5.5 pesan/hari</span>
            <span>Terkoneksi via GAS Web App Trigger</span>
          </div>
        </div>

        {/* Top Viewed Products (PRD F12) */}
        <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Produk Paling Banyak Dilihat</span>
              </h3>
              <p className="text-xs text-neutral-400">Peringkat minat calon pembeli</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {topProducts.map(prod => {
              const viewPercentage = Math.round((prod.jumlahDilihat / (totalViews || 1)) * 100);
              return (
                <div key={prod.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-200 font-medium truncate max-w-[200px]">
                      {prod.nama}
                    </span>
                    <span className="text-cyan-400 font-mono-numbers font-semibold">
                      {prod.jumlahDilihat} views
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${Math.min(viewPercentage * 2.2, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Unresolved Inquiries Quick Table (PRD F12) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Daftar Inquiry Belum Dibalas</span>
            </h3>
            <p className="text-xs text-neutral-400">Pesan baru dari calon pembeli yang perlu tindak lanjut</p>
          </div>
          <button
            onClick={() => onNavigateTab('inquiries')}
            className="text-xs text-cyan-400 hover:underline"
          >
            Lihat semua ({inquiries.length}) ➔
          </button>
        </div>

        {unresolvedInquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-400 flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <span>Semua pesan inquiry sudah direspons! Kerja bagus.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Tiket & Waktu</th>
                  <th className="py-2.5 px-3">Pengirim</th>
                  <th className="py-2.5 px-3">Produk Minat</th>
                  <th className="py-2.5 px-3">Ringkasan Pesan</th>
                  <th className="py-2.5 px-3 text-right">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {unresolvedInquiries.slice(0, 5).map(inq => (
                  <tr key={inq.id} className="hover:bg-neutral-800/40">
                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-cyan-400">
                      <div>{inq.id}</div>
                      <div className="text-[10px] text-neutral-500">{inq.tanggalMasuk}</div>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="font-semibold text-white">{inq.nama}</div>
                      <div className="text-neutral-400 text-[11px]">{inq.telepon}</div>
                    </td>
                    <td className="py-2.5 px-3 text-neutral-300 max-w-[160px] truncate">
                      {inq.namaProduk}
                    </td>
                    <td className="py-2.5 px-3 text-neutral-300 max-w-[220px] truncate">
                      {inq.pesan}
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap space-x-1.5">
                      <a
                        href={`https://wa.me/${inq.telepon.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo ${inq.nama}, terima kasih telah mengirim inquiry terkait ${inq.namaProduk}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded hover:bg-emerald-900"
                        title="Chat via WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'Dibalas')}
                        className="px-2 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 rounded hover:bg-cyan-900 transition-colors"
                      >
                        Tandai Dibalas
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
