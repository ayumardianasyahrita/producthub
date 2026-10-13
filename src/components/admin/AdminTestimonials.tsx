import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, XCircle, Trash2, Image, Star, Eye } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, updateTestimonialStatus, deleteTestimonial, setSelectedProofUrl } = useApp();

  const [filter, setFilter] = useState<'Semua' | 'Menunggu Approval' | 'Disetujui' | 'Ditolak'>('Semua');

  const filtered = testimonials.filter(t => filter === 'Semua' || t.statusApproval === filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Moderasi Testimoni & Bukti Pemakaian (F9)</h3>
          <p className="text-xs text-neutral-400">
            Hanya ulasan dengan status "Disetujui" yang akan ditampilkan kepada pengunjung publik di landing page.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          {(['Semua', 'Menunggu Approval', 'Disetujui', 'Ditolak'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === st
                  ? 'bg-neutral-800 text-cyan-400 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(t => (
          <div
            key={t.id}
            className={`bg-neutral-900 border rounded-xl p-5 flex flex-col justify-between transition-colors ${
              t.statusApproval === 'Menunggu Approval'
                ? 'border-amber-700/60 bg-amber-950/10'
                : t.statusApproval === 'Disetujui'
                ? 'border-neutral-800'
                : 'border-rose-900/60 opacity-60'
            }`}
          >
            <div>
              {/* Header: ID, Date, Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-neutral-400 font-bold">{t.id}</span>
                  <span className="text-[11px] text-neutral-500">{t.tanggalKirim}</span>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    t.statusApproval === 'Disetujui'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : t.statusApproval === 'Menunggu Approval'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}
                >
                  {t.statusApproval}
                </span>
              </div>

              {/* Author info & Rating */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.urlFotoProfil || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={t.nama}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{t.nama}</h4>
                  <p className="text-[11px] text-neutral-400">{t.pekerjaan}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Product */}
              <div className="text-[11px] text-cyan-300 mb-2">
                Aplikasi: <strong>{t.namaProduk}</strong>
              </div>

              {/* Content text */}
              <p className="text-xs text-neutral-200 bg-neutral-950/80 p-3 rounded-lg border border-neutral-800 italic leading-relaxed mb-4">
                "{t.isi}"
              </p>

              {/* Attached Proof */}
              {t.urlBukti && (
                <div className="mb-4">
                  <button
                    onClick={() =>
                      setSelectedProofUrl({
                        url: t.urlBukti,
                        title: t.namaProduk,
                        clientName: t.nama,
                      })
                    }
                    className="flex items-center gap-2 p-2 rounded bg-neutral-950 border border-neutral-800 hover:border-cyan-500/60 text-neutral-300 text-xs w-full transition-colors group"
                  >
                    <Image className="w-4 h-4 text-cyan-400" />
                    <span className="group-hover:text-cyan-300 truncate">
                      Lihat Screenshot Bukti Google Sheets
                    </span>
                    <Eye className="w-3.5 h-3.5 ml-auto text-neutral-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Moderation Controls (PRD F9) */}
            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  if (confirm(`Hapus ulasan ${t.nama}?`)) deleteTestimonial(t.id);
                }}
                className="p-1.5 text-neutral-500 hover:text-rose-400 rounded"
                title="Hapus Testimoni"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                {t.statusApproval !== 'Disetujui' && (
                  <button
                    onClick={() => updateTestimonialStatus(t.id, 'Disetujui')}
                    className="px-3 py-1 bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Setujui (Tayangkan)</span>
                  </button>
                )}

                {t.statusApproval !== 'Ditolak' && (
                  <button
                    onClick={() => updateTestimonialStatus(t.id, 'Ditolak')}
                    className="px-3 py-1 bg-neutral-800 hover:bg-rose-950 hover:text-rose-300 text-neutral-300 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Tolak</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
