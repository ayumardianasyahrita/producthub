import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Phone, Mail, CheckCircle, Clock, Trash2, Edit3, MessageSquare } from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useApp();

  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Baru' | 'Dibalas'>('Semua');
  const [search, setSearch] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const filtered = inquiries.filter(i => {
    const matchesStatus = filterStatus === 'Semua' || i.status === filterStatus;
    const matchesSearch =
      i.nama.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.namaProduk.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenNote = (id: string, currentNote?: string) => {
    setEditingNoteId(id);
    setNoteText(currentNote || '');
  };

  const handleSaveNote = (id: string) => {
    const item = inquiries.find(i => i.id === id);
    if (item) {
      updateInquiryStatus(id, item.status, noteText);
    }
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Daftar Inquiry & Pesanan Masuk (Google Sheets)</h3>
          <p className="text-xs text-neutral-400">
            Terhubung otomatis ke sheet "Inquiry" saat pengunjung mengisi form publik (F2/F8).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            {(['Semua', 'Baru', 'Dibalas'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filterStatus === st
                    ? 'bg-neutral-800 text-cyan-400 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari pemesan..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-44"
            />
          </div>
        </div>
      </div>

      {/* Inquiry Cards / Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-400">
            Tidak ada inquiry yang sesuai filter.
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/80">
            {filtered.map(inq => (
              <div key={inq.id} className="p-4 sm:p-5 hover:bg-neutral-800/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/80 px-2 py-0.5 rounded">
                      {inq.id}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {inq.tanggalMasuk}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        inq.status === 'Baru'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                          : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                      }`}
                    >
                      {inq.status === 'Baru' ? (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Status: Baru</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Status: Dibalas</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Actions: Direct WhatsApp & Email */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <a
                      href={`https://wa.me/${inq.telepon.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Halo ${inq.nama}, terima kasih telah menghubungi kami mengenai ${inq.namaProduk}. Saya Mandala siap membantu kebutuhan sistem Anda.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-950 border border-emerald-800/90 text-emerald-300 hover:bg-emerald-900 rounded-md transition-colors"
                      title="Kirim pesan WhatsApp langsung"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${inq.email}?subject=${encodeURIComponent(`Follow-up Inquiry: ${inq.namaProduk}`)}&body=${encodeURIComponent(`Halo ${inq.nama},\n\nTerima kasih telah mengajukan inquiry untuk produk ${inq.namaProduk}.\n\nSalam,\nMandala`)}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md transition-colors"
                      title="Kirim Email"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>

                    <button
                      onClick={() =>
                        updateInquiryStatus(
                          inq.id,
                          inq.status === 'Baru' ? 'Dibalas' : 'Baru'
                        )
                      }
                      className="px-2.5 py-1 text-xs font-medium bg-cyan-950 border border-cyan-800/80 text-cyan-300 hover:bg-cyan-900 rounded-md transition-colors"
                    >
                      {inq.status === 'Baru' ? 'Set Dibalas' : 'Set Baru'}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus inquiry ${inq.id}?`)) deleteInquiry(inq.id);
                      }}
                      className="p-1 text-neutral-500 hover:text-rose-400 rounded transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs pt-1">
                  <div className="md:col-span-4 space-y-1">
                    <div className="text-white font-semibold">{inq.nama}</div>
                    <div className="text-neutral-400">{inq.email}</div>
                    <div className="text-neutral-400 font-mono">{inq.telepon}</div>
                  </div>

                  <div className="md:col-span-8 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">Produk Diminati:</span>
                      <strong className="text-cyan-300">{inq.namaProduk}</strong>
                      {inq.budget && (
                        <span className="text-neutral-500">· Budget: {inq.budget}</span>
                      )}
                    </div>

                    <div className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-lg text-neutral-200 leading-relaxed">
                      "{inq.pesan}"
                    </div>

                    {/* Admin internal memo */}
                    {editingNoteId === inq.id ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={noteText}
                          onChange={e => setNoteText(e.target.value)}
                          placeholder="Catatan progres admin..."
                          className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white"
                        />
                        <button
                          onClick={() => handleSaveNote(inq.id)}
                          className="px-2.5 py-1 bg-cyan-500 text-neutral-950 font-bold rounded text-xs"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-2 py-1 text-neutral-400 text-xs"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                        <span>
                          {inq.catatanAdmin ? (
                            <span className="text-amber-300/90">Memo: {inq.catatanAdmin}</span>
                          ) : (
                            <span className="italic text-neutral-600">Belum ada catatan tindak lanjut</span>
                          )}
                        </span>
                        <button
                          onClick={() => handleOpenNote(inq.id, inq.catatanAdmin)}
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{inq.catatanAdmin ? 'Edit Memo' : '+ Tambah Memo'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
