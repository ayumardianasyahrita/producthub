import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, CheckCircle2, MessageCircle, Mail, Clock, Phone, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { products, selectedProductForInquiry, setSelectedProductForInquiry, addInquiry } = useApp();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    produkId: '',
    namaProduk: '',
    budget: 'Rp 500.000 - Rp 1.500.000',
    pesan: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastInquiryId, setLastInquiryId] = useState<string>('');

  // Update selected product when changed from product cards
  useEffect(() => {
    if (selectedProductForInquiry) {
      setFormData(prev => ({
        ...prev,
        produkId: selectedProductForInquiry.id,
        namaProduk: selectedProductForInquiry.nama,
        pesan: prev.pesan || `Saya tertarik memesan/berkonsultasi mengenai aplikasi ${selectedProductForInquiry.nama}. Mohon info estimasi implementasi ke Google Sheets kami.`,
      }));
    }
  }, [selectedProductForInquiry]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    if (pId === 'kustom') {
      setFormData(prev => ({
        ...prev,
        produkId: 'kustom',
        namaProduk: 'Kustom Google Apps Script Solution',
      }));
    } else {
      const prod = products.find(p => p.id === pId);
      if (prod) {
        setFormData(prev => ({
          ...prev,
          produkId: prod.id,
          namaProduk: prod.nama,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email || !formData.pesan) return;

    setSubmitting(true);
    await addInquiry({
      nama: formData.nama,
      email: formData.email,
      telepon: formData.telepon,
      produkId: formData.produkId || 'GAS-001',
      namaProduk: formData.namaProduk || 'Konsultasi Umum Google Apps Script',
      budget: formData.budget,
      pesan: formData.pesan,
    });

    setLastInquiryId(`INQ-${Math.floor(100 + Math.random() * 899)}`);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSelectedProductForInquiry(null);
    setFormData({
      nama: '',
      email: '',
      telepon: '',
      produkId: '',
      namaProduk: '',
      budget: 'Rp 500.000 - Rp 1.500.000',
      pesan: '',
    });
  };

  // Pre-filled WhatsApp direct link
  const waNumber = '6281234567890';
  const waMessage = encodeURIComponent(
    `Halo Mas Mandala, saya ${formData.nama || 'Pelanggan'} baru saja mengirim formulir inquiry untuk produk "${formData.namaProduk || 'Web App Google Apps Script'}". Mohon info selanjutnya.`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <section id="kontak" className="py-16 sm:py-24 border-t border-neutral-900 bg-neutral-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Developer Persona */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                <span>Formulir Inquiry & Konsultasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pesan Aplikasi atau Diskusikan Kebutuhan Anda
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Setiap pesan inquiry otomatis tercatat ke <strong>Google Spreadsheet</strong> admin dan memicu notifikasi Gmail real-time via Google Apps Script. Kami akan merespons dalam waktu 1x24 jam.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-800/80 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Respons Cepat via WhatsApp</div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    +62 812-3456-7890
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Email Resmi Studio</div>
                  <div className="text-sm font-bold text-white">
                    mandala.developer@gmail.com
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Waktu Operasional & Pendampingan</div>
                  <div className="text-sm font-bold text-white">
                    Senin - Sabtu (08:00 - 21:00 WIB)
                  </div>
                </div>
              </div>
            </div>

            {/* Note regarding Google Apps Script */}
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Garansi Keamanan Akun:</strong> Aplikasi yang Anda pesan di-deploy langsung ke Google Drive & akun Google Workspace milik Anda sendiri. Kami tidak menyimpan data transaksi maupun database bisnis Anda di server eksternal.
            </div>
          </div>

          {/* Right Column: Inquiry Form (PRD F2) */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-white">Inquiry Berhasil Terkirim!</h3>

                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Data Anda telah otomatis tercatat ke <strong>Sheet Inquiry</strong> dengan tiket ID <span className="font-mono text-cyan-400 font-semibold">{lastInquiryId}</span>. Salinan konfirmasi otomatis telah dikirim ke email <strong>{formData.email}</strong>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Lanjutkan Chat via WhatsApp</span>
                    </a>

                    <button
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs sm:text-sm transition-colors"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {selectedProductForInquiry && (
                    <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-cyan-200">
                          Memesan: <strong>{selectedProductForInquiry.nama}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProductForInquiry(null)}
                        className="text-neutral-400 hover:text-white underline text-[11px]"
                      >
                        Ganti
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Nama Lengkap / PIC *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Pratama"
                        value={formData.nama}
                        onChange={e => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Email Aktif (Menerima Konfirmasi) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="nama@bisnis.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Nomor WhatsApp / Telepon *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0812xxxxxxxx"
                        value={formData.telepon}
                        onChange={e => setFormData({ ...formData, telepon: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Aplikasi yang Diminati
                      </label>
                      <select
                        value={formData.produkId || (selectedProductForInquiry?.id || 'GAS-001')}
                        onChange={handleProductChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        {products.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.nama}
                          </option>
                        ))}
                        <option value="kustom">✦ Kustom Script Khusus (SOP Bisnis Saya)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Estimasi Anggaran / Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Dibawah Rp 1.000.000">&lt; Rp 1.000.000</option>
                      <option value="Rp 1.000.000 - Rp 2.500.000">Rp 1.000.000 - Rp 2.500.000</option>
                      <option value="Rp 2.500.000 - Rp 5.000.000">Rp 2.500.000 - Rp 5.000.000</option>
                      <option value="Diatas Rp 5.000.000">&gt; Rp 5.000.000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Pesan / Kebutuhan Fitur Spesifik *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Jelaskan kebutuhan alur kerja, jumlah pengguna, atau penyesuaian yang diinginkan..."
                      value={formData.pesan}
                      onChange={e => setFormData({ ...formData, pesan: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-5 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Menyimpan ke Google Sheets...' : 'Kirim Pesanan & Inquiry Sekarang'}</span>
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-2.5">
                      Data otomatis tersimpan ke Sheet Inquiry & memicu notifikasi Gmail admin.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
