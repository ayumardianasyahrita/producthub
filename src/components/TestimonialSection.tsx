import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Testimoni } from '../types';
import { Star, MessageSquare, Image, CheckCircle, ShieldCheck, Plus, X, Upload } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const { approvedTestimonials, addTestimonial, setSelectedProofUrl, products } = useApp();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    pekerjaan: '',
    isi: '',
    rating: 5,
    namaProduk: products[0]?.nama || 'StockFlow POS & Multi-Branch Inventory',
    urlFotoProfil: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    urlBukti: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.isi) return;

    setIsSubmitting(true);
    await addTestimonial({
      nama: formData.nama,
      pekerjaan: formData.pekerjaan || 'Pelaku Usaha',
      isi: formData.isi,
      rating: formData.rating,
      namaProduk: formData.namaProduk,
      urlFotoProfil: formData.urlFotoProfil,
      urlBukti: formData.urlBukti,
    });

    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setFormData({
        nama: '',
        pekerjaan: '',
        isi: '',
        rating: 5,
        namaProduk: products[0]?.nama || 'StockFlow POS & Multi-Branch Inventory',
        urlFotoProfil: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        urlBukti: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
      });
    }, 2500);
  };

  return (
    <section id="testimoni" className="py-16 sm:py-24 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bukti Nyata & Kepuasan Klien</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Testimoni Pengguna Web App GAS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Ulasan otentik disertai bukti screenshot implementasi sistem pada Google Sheets & Google Drive masing-masing bisnis.
            </p>
          </div>

          {/* Action to submit testimony */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/70 border border-cyan-800/80 hover:bg-cyan-900/50 rounded-lg transition-colors flex items-center gap-2 self-start md:self-auto whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Kirim Ulasan & Bukti Anda</span>
          </button>
        </div>

        {/* Running Marquee Container (Bergerak ke kiri seperti running text) */}
        <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 py-2">
          {/* Subtle Left and Right Vignette Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

          {/* Marquee Track moving continuously to the left, pauses on hover */}
          <div className="animate-marquee-cards flex items-stretch gap-6 px-4">
            {/* Set 1 */}
            {(approvedTestimonials.length < 4
              ? [...approvedTestimonials, ...approvedTestimonials, ...approvedTestimonials]
              : approvedTestimonials
            ).map((t, idx) => (
              <div
                key={`track1-${t.id}-${idx}`}
                className="w-[310px] sm:w-[370px] shrink-0 flex flex-col justify-between bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all hover:bg-neutral-900/90 shadow-md select-none"
              >
                <div>
                  {/* Rating & Product Tag */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <span className="text-[11px] text-neutral-400 bg-neutral-950 border border-neutral-800/80 px-2 py-0.5 rounded truncate max-w-[170px]">
                      {t.namaProduk}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic mb-4 line-clamp-4">
                    "{t.isi}"
                  </p>
                </div>

                <div>
                  {/* Screenshot Proof Button */}
                  {t.urlBukti && (
                    <div className="mb-3.5">
                      <button
                        onClick={() =>
                          setSelectedProofUrl({
                            url: t.urlBukti,
                            title: t.namaProduk,
                            clientName: t.nama,
                          })
                        }
                        className="w-full flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-neutral-800 overflow-hidden shrink-0">
                            <img
                              src={t.urlBukti}
                              alt="Bukti pemakaian"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-xs text-neutral-300 font-medium group-hover:text-cyan-400">
                            Lihat Bukti Spreadsheet
                          </span>
                        </div>
                        <Image className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    </div>
                  )}

                  {/* Author profile row */}
                  <div className="flex items-center gap-3 pt-3 border-t border-neutral-800/70">
                    <img
                      src={t.urlFotoProfil || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={t.nama}
                      className="w-9 h-9 rounded-full object-cover border border-neutral-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                        {t.nama}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 truncate">
                        {t.pekerjaan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Set 2 for seamless infinite marquee loop */}
            {(approvedTestimonials.length < 4
              ? [...approvedTestimonials, ...approvedTestimonials, ...approvedTestimonials]
              : approvedTestimonials
            ).map((t, idx) => (
              <div
                key={`track2-${t.id}-${idx}`}
                className="w-[310px] sm:w-[370px] shrink-0 flex flex-col justify-between bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all hover:bg-neutral-900/90 shadow-md select-none"
              >
                <div>
                  {/* Rating & Product Tag */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <span className="text-[11px] text-neutral-400 bg-neutral-950 border border-neutral-800/80 px-2 py-0.5 rounded truncate max-w-[170px]">
                      {t.namaProduk}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic mb-4 line-clamp-4">
                    "{t.isi}"
                  </p>
                </div>

                <div>
                  {/* Screenshot Proof Button */}
                  {t.urlBukti && (
                    <div className="mb-3.5">
                      <button
                        onClick={() =>
                          setSelectedProofUrl({
                            url: t.urlBukti,
                            title: t.namaProduk,
                            clientName: t.nama,
                          })
                        }
                        className="w-full flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-neutral-800 overflow-hidden shrink-0">
                            <img
                              src={t.urlBukti}
                              alt="Bukti pemakaian"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-xs text-neutral-300 font-medium group-hover:text-cyan-400">
                            Lihat Bukti Spreadsheet
                          </span>
                        </div>
                        <Image className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    </div>
                  )}

                  {/* Author profile row */}
                  <div className="flex items-center gap-3 pt-3 border-t border-neutral-800/70">
                    <img
                      src={t.urlFotoProfil || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={t.nama}
                      className="w-9 h-9 rounded-full object-cover border border-neutral-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                        {t.nama}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 truncate">
                        {t.pekerjaan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle note underneath */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-4 px-1">
          <span>* Arahkan kursor atau sentuh kartu untuk menjeda pergerakan ulasan.</span>
          <span className="hidden sm:inline font-mono">Total {approvedTestimonials.length} Ulasan Terverifikasi</span>
        </div>

        {/* Modal: Submit Testimonial */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Kirim Testimoni & Bukti Pemakaian</span>
                </h3>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Terima Kasih Banyak!</h4>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Testimoni dan berkas bukti Anda berhasil disimpan ke Google Drive/Sheets. Sesuai prosedur (F3/F9), ulasan akan langsung tayang setelah disetujui admin.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Firmansyah"
                      value={formData.nama}
                      onChange={e => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Pekerjaan / Nama Bisnis *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Owner Kafe Kopi Kenangan"
                      value={formData.pekerjaan}
                      onChange={e => setFormData({ ...formData, pekerjaan: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Aplikasi Web yang Digunakan
                    </label>
                    <select
                      value={formData.namaProduk}
                      onChange={e => setFormData({ ...formData, namaProduk: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.nama}>
                          {p.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Isi Testimoni & Pengalaman *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Ceritakan bagaimana aplikasi ini membantu efisiensi dan alur kerja usaha Anda..."
                      value={formData.isi}
                      onChange={e => setFormData({ ...formData, isi: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Penilaian Bintang
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= formData.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-neutral-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-neutral-400 ml-2 font-mono-numbers">{formData.rating} dari 5</span>
                    </div>
                  </div>

                  {/* Proof Selection / Upload */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Pilihan Lampiran Bukti (Screenshot Sheets / Dashboard)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { title: 'POS Sheet', url: '/src/assets/images/product_pos_sheet_1791906703396.jpg' },
                        { title: 'CRM DealFlow', url: '/src/assets/images/product_crm_sales_1791906704847.jpg' },
                        { title: 'HR Connect', url: '/src/assets/images/product_hr_payroll_1791906703980.jpg' },
                      ].map((item, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setFormData({ ...formData, urlBukti: item.url })}
                          className={`relative rounded-lg overflow-hidden border p-1 text-center transition-all ${
                            formData.urlBukti === item.url
                              ? 'border-cyan-500 bg-cyan-950/40'
                              : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                          }`}
                        >
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-12 object-cover rounded mb-1"
                          />
                          <span className="text-[10px] text-neutral-300 block truncate">{item.title}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      * Pada integrasi GAS live, file akan langsung diunggah ke Google Drive admin via `google.script.run`.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Mengirim...' : 'Kirim Testimoni'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
