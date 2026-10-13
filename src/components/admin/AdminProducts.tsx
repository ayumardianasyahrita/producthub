import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Eye, CheckCircle2, XCircle, Search, ExternalLink, X } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();

  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formState, setFormState] = useState<{
    nama: string;
    kategori: Product['kategori'];
    harga: number;
    deskripsi: string;
    deskripsiLengkap: string;
    urlGambar: string;
    fiturUtamaStr: string;
    integrasiStr: string;
    statusTampil: 'aktif' | 'nonaktif';
    waktuPengerjaan: string;
  }>({
    nama: '',
    kategori: 'POS & Kasir',
    harga: 750000,
    deskripsi: '',
    deskripsiLengkap: '',
    urlGambar: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
    fiturUtamaStr: 'Sinkronisasi 2 arah Sheets, PDF export otomatis, Tanpa sewa bulanan',
    integrasiStr: 'Google Sheets, Google Drive, Gmail',
    statusTampil: 'aktif',
    waktuPengerjaan: 'Setup 1-2 Jam',
  });

  const filtered = products.filter(p =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.kategori.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormState({
      nama: '',
      kategori: 'POS & Kasir',
      harga: 850000,
      deskripsi: '',
      deskripsiLengkap: '',
      urlGambar: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
      fiturUtamaStr: 'Sinkronisasi 2 arah Sheets, Generate invoice PDF, Tanpa langganan bulanan',
      integrasiStr: 'Google Sheets, Google Drive, Gmail',
      statusTampil: 'aktif',
      waktuPengerjaan: 'Setup Cepat',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormState({
      nama: p.nama,
      kategori: p.kategori,
      harga: p.harga,
      deskripsi: p.deskripsi,
      deskripsiLengkap: p.deskripsiLengkap || p.deskripsi,
      urlGambar: p.urlGambar,
      fiturUtamaStr: p.fiturUtama.join(', '),
      integrasiStr: p.integrasi.join(', '),
      statusTampil: p.statusTampil,
      waktuPengerjaan: p.waktuPengerjaan || 'Setup Cepat',
    });
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const fiturUtama = formState.fiturUtamaStr.split(',').map(s => s.trim()).filter(Boolean);
    const integrasi = formState.integrasiStr.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        nama: formState.nama,
        kategori: formState.kategori,
        harga: Number(formState.harga),
        deskripsi: formState.deskripsi,
        deskripsiLengkap: formState.deskripsiLengkap,
        urlGambar: formState.urlGambar,
        fiturUtama,
        integrasi,
        statusTampil: formState.statusTampil,
        waktuPengerjaan: formState.waktuPengerjaan,
      });
    } else {
      addProduct({
        nama: formState.nama,
        kategori: formState.kategori,
        harga: Number(formState.harga),
        deskripsi: formState.deskripsi,
        deskripsiLengkap: formState.deskripsiLengkap,
        urlGambar: formState.urlGambar,
        fiturUtama,
        integrasi,
        statusTampil: formState.statusTampil,
        waktuPengerjaan: formState.waktuPengerjaan,
      });
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus produk "${name}" dari database Google Sheets?`)) {
      deleteProduct(id);
    }
  };

  const toggleStatus = (product: Product) => {
    const nextStatus = product.statusTampil === 'aktif' ? 'nonaktif' : 'aktif';
    updateProduct(product.id, { statusTampil: nextStatus });
  };

  return (
    <div className="space-y-5">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Kelola Produk & Aplikasi GAS (CRUD)</h3>
          <p className="text-xs text-neutral-400">
            Perubahan langsung tersimpan ke Google Sheets "Produk" dan tampil di landing page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari ID / Nama..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 w-44"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Info Produk</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga Jual</th>
                <th className="py-3 px-4">Dilihat</th>
                <th className="py-3 px-4">Status Tampil</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-neutral-800/40">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.urlGambar}
                        alt={p.nama}
                        className="w-10 h-10 rounded-lg object-cover bg-neutral-950 border border-neutral-800 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-white">{p.nama}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {p.id} · {p.tanggalDibuat}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-[11px] text-neutral-300">
                      {p.kategori}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono-numbers font-semibold text-white whitespace-nowrap">
                    {formatRupiah(p.harga)}
                  </td>
                  <td className="py-3 px-4 font-mono-numbers text-neutral-400 whitespace-nowrap">
                    {p.jumlahDilihat} views
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(p)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                        p.statusTampil === 'aktif'
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60'
                          : 'bg-neutral-950 text-neutral-500 border-neutral-800 hover:bg-neutral-800'
                      }`}
                    >
                      {p.statusTampil === 'aktif' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Aktif (Tayang)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-neutral-500" />
                          <span>Nonaktif</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                      title="Edit Data Produk"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.nama)}
                      className="p-1.5 rounded bg-neutral-800 hover:bg-rose-900/60 text-neutral-400 hover:text-rose-300 transition-colors"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <h3 className="text-sm font-bold text-white">
                {editingProduct ? `Edit Produk [${editingProduct.id}]` : 'Tambah Produk Web App Baru'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={formState.nama}
                  onChange={e => setFormState({ ...formState, nama: e.target.value })}
                  placeholder="Contoh: StockFlow POS & Multi-Branch"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Kategori *</label>
                  <select
                    value={formState.kategori}
                    onChange={e => setFormState({ ...formState, kategori: e.target.value as Product['kategori'] })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="POS & Kasir">POS & Kasir</option>
                    <option value="CRM & Pipeline">CRM & Pipeline</option>
                    <option value="HR & Absensi">HR & Absensi</option>
                    <option value="Otomasi WhatsApp">Otomasi WhatsApp</option>
                    <option value="Keuangan & Invoice">Keuangan & Invoice</option>
                    <option value="Custom Script">Custom Script</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Harga (IDR) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={50000}
                    value={formState.harga}
                    onChange={e => setFormState({ ...formState, harga: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Deskripsi Singkat (Katalog)</label>
                <textarea
                  rows={2}
                  required
                  value={formState.deskripsi}
                  onChange={e => setFormState({ ...formState, deskripsi: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Deskripsi Lengkap (Modal Detail)</label>
                <textarea
                  rows={3}
                  value={formState.deskripsiLengkap}
                  onChange={e => setFormState({ ...formState, deskripsiLengkap: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Pilihan Gambar Preview (dari Google Drive)</label>
                <select
                  value={formState.urlGambar}
                  onChange={e => setFormState({ ...formState, urlGambar: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 mb-2"
                >
                  <option value="/src/assets/images/product_pos_sheet_1791906703396.jpg">Gambar POS & Retail Sheets</option>
                  <option value="/src/assets/images/product_crm_sales_1791906704847.jpg">Gambar B2B CRM Pipeline</option>
                  <option value="/src/assets/images/product_hr_payroll_1791906703980.jpg">Gambar HR & Payroll Presensi</option>
                  <option value="/src/assets/images/hero_gas_suite_1791906701798.jpg">Gambar Suite Dashboard Otomasi</option>
                </select>
                <input
                  type="text"
                  value={formState.urlGambar}
                  onChange={e => setFormState({ ...formState, urlGambar: e.target.value })}
                  placeholder="Atau masukkan URL gambar Drive custom..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-neutral-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Fitur Utama (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formState.fiturUtamaStr}
                  onChange={e => setFormState({ ...formState, fiturUtamaStr: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Integrasi Workspace (koma)</label>
                  <input
                    type="text"
                    value={formState.integrasiStr}
                    onChange={e => setFormState({ ...formState, integrasiStr: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Status Tampil</label>
                  <select
                    value={formState.statusTampil}
                    onChange={e => setFormState({ ...formState, statusTampil: e.target.value as 'aktif' | 'nonaktif' })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="aktif">Aktif (Tampil di Landing Page)</option>
                    <option value="nonaktif">Nonaktif (Disembunyikan)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Simpan ke Google Sheets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
