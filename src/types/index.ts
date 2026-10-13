export interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  deskripsiLengkap?: string;
  harga: number;
  kategori: 'POS & Kasir' | 'CRM & Pipeline' | 'HR & Absensi' | 'Otomasi WhatsApp' | 'Keuangan & Invoice' | 'Custom Script';
  urlGambar: string;
  fiturUtama: string[];
  integrasi: string[];
  demoUrl?: string;
  statusTampil: 'aktif' | 'nonaktif';
  jumlahDilihat: number;
  tanggalDibuat: string;
  waktuPengerjaan?: string;
  popular?: boolean;
}

export interface Inquiry {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  produkId: string;
  namaProduk: string;
  pesan: string;
  budget?: string;
  status: 'Baru' | 'Dibalas';
  tanggalMasuk: string;
  catatanAdmin?: string;
}

export interface Testimoni {
  id: string;
  nama: string;
  pekerjaan: string;
  isi: string;
  rating: number;
  urlFotoProfil: string;
  urlBukti: string; // Screenshot bukti pemakaian spreadsheet/GAS
  namaProduk: string;
  statusApproval: 'Disetujui' | 'Menunggu Approval' | 'Ditolak';
  tanggalKirim: string;
}

export type NeonColor = 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple';

export interface Pengumuman {
  teks: string;
  warna: NeonColor;
  statusAktif: boolean;
  kecepatanDetik: number;
  tautanUrl?: string;
}

export interface BannerPromo {
  id: string;
  judul: string;
  subjudul: string;
  urlGambar: string;
  linkTujuan: string;
  badgePromo: string;
  statusAktif: boolean;
  urutan: number;
}

export interface AdminUser {
  email: string;
  nama: string;
  avatar: string;
  role: 'Super Admin / Owner';
  isLoggedIn: boolean;
}
