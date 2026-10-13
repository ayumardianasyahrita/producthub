import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BannerPromo } from '../../types';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, CheckCircle2, XCircle, X, Image } from 'lucide-react';

export const AdminBanners: React.FC = () => {
  const { banners, addBanner, updateBanner, deleteBanner } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerPromo | null>(null);

  const [formState, setFormState] = useState<{
    judul: string;
    subjudul: string;
    urlGambar: string;
    linkTujuan: string;
    badgePromo: string;
    statusAktif: boolean;
    urutan: number;
  }>({
    judul: '',
    subjudul: '',
    urlGambar: '/src/assets/images/hero_gas_suite_1791906701798.jpg',
    linkTujuan: '#produk',
    badgePromo: 'PROMO BULAN INI',
    statusAktif: true,
    urutan: 1,
  });

  const sortedBanners = [...banners].sort((a, b) => a.urutan - b.urutan);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormState({
      judul: '',
      subjudul: '',
      urlGambar: '/src/assets/images/hero_gas_suite_1791906701798.jpg',
      linkTujuan: '#produk',
      badgePromo: 'SPECIAL OFFER',
      statusAktif: true,
      urutan: banners.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BannerPromo) => {
    setEditingBanner(b);
    setFormState({
      judul: b.judul,
      subjudul: b.subjudul,
      urlGambar: b.urlGambar,
      linkTujuan: b.linkTujuan,
      badgePromo: b.badgePromo,
      statusAktif: b.statusAktif,
      urutan: b.urutan,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, {
        judul: formState.judul,
        subjudul: formState.subjudul,
        urlGambar: formState.urlGambar,
        linkTujuan: formState.linkTujuan,
        badgePromo: formState.badgePromo,
        statusAktif: formState.statusAktif,
        urutan: Number(formState.urutan),
      });
    } else {
      addBanner({
        judul: formState.judul,
        subjudul: formState.subjudul,
        urlGambar: formState.urlGambar,
        linkTujuan: formState.linkTujuan,
        badgePromo: formState.badgePromo,
        statusAktif: formState.statusAktif,
        urutan: Number(formState.urutan),
      });
    }
    setIsModalOpen(false);
  };

  const toggleStatus = (b: BannerPromo) => {
    updateBanner(b.id, { statusAktif: !b.statusAktif });
  };

  const moveOrder = (b: BannerPromo, delta: number) => {
    const newOrder = b.urutan + delta;
    if (newOrder < 1) return;
    updateBanner(b.id, { urutan: newOrder });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Atur Banner Promo Beranda (F11)</h3>
          <p className="text-xs text-neutral-400">
            Gambar disimpan di folder Google Drive admin dan urutan tampil dikendalikan dari Google Sheets.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Banner Promo</span>
        </button>
      </div>

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedBanners.map(b => (
          <div
            key={b.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                <img
                  src={b.urlGambar}
                  alt={b.judul}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-neutral-950/80 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded text-[10px] font-bold">
                  {b.badgePromo}
                </div>
                <div className="absolute top-2 right-2 bg-neutral-950/80 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                  Urutan: #{b.urutan}
                </div>
              </div>

              {/* Title & info */}
              <div className="p-4 space-y-1">
                <div className="text-sm font-bold text-white leading-snug line-clamp-1">
                  {b.judul}
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {b.subjudul}
                </p>
                <div className="text-[11px] text-neutral-500 font-mono truncate pt-1">
                  Link: {b.linkTujuan}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => toggleStatus(b)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${
                  b.statusAktif
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                }`}
              >
                {b.statusAktif ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Aktif</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Nonaktif</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveOrder(b, -1)}
                  className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                  title="Naikkan Urutan"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveOrder(b, 1)}
                  className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                  title="Turunkan Urutan"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-1 text-neutral-400 hover:text-cyan-400 rounded hover:bg-neutral-800"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Hapus banner ${b.judul}?`)) deleteBanner(b.id);
                  }}
                  className="p-1 text-neutral-400 hover:text-rose-400 rounded hover:bg-neutral-800"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Banner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <h3 className="text-sm font-bold text-white">
                {editingBanner ? 'Edit Banner Promo' : 'Tambah Banner Promo Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Judul Banner *</label>
                <input
                  type="text"
                  required
                  value={formState.judul}
                  onChange={e => setFormState({ ...formState, judul: e.target.value })}
                  placeholder="Contoh: 100% Bebas Biaya Server Bulanan"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Subjudul / Deskripsi Promo</label>
                <textarea
                  rows={2}
                  value={formState.subjudul}
                  onChange={e => setFormState({ ...formState, subjudul: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formState.badgePromo}
                    onChange={e => setFormState({ ...formState, badgePromo: e.target.value })}
                    placeholder="HEMAT BIAYA TI"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Urutan Tampil (Order)</label>
                  <input
                    type="number"
                    min={1}
                    value={formState.urutan}
                    onChange={e => setFormState({ ...formState, urutan: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Pilihan Gambar Banner (Google Drive)</label>
                <select
                  value={formState.urlGambar}
                  onChange={e => setFormState({ ...formState, urlGambar: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 mb-2"
                >
                  <option value="/src/assets/images/hero_gas_suite_1791906701798.jpg">Dashboard Suite GAS Banner</option>
                  <option value="/src/assets/images/product_crm_sales_1791906704847.jpg">B2B CRM Pipeline Banner</option>
                  <option value="/src/assets/images/product_pos_sheet_1791906703396.jpg">POS & Inventory Banner</option>
                  <option value="/src/assets/images/product_hr_payroll_1791906703980.jpg">HR & Presensi Payroll Banner</option>
                </select>
                <input
                  type="text"
                  value={formState.urlGambar}
                  onChange={e => setFormState({ ...formState, urlGambar: e.target.value })}
                  placeholder="Atau masukkan tautan Drive gambar..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-neutral-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Link Tujuan Banner</label>
                <input
                  type="text"
                  value={formState.linkTujuan}
                  onChange={e => setFormState({ ...formState, linkTujuan: e.target.value })}
                  placeholder="#produk atau #kontak"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Simpan Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
