import { Product, Inquiry, Testimoni, Pengumuman, BannerPromo } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'GAS-001',
    nama: 'StockFlow POS & Multi-Branch Inventory',
    deskripsi: 'Sistem kasir ritel dan pelacak stok multi-gudang langsung tersinkronisasi otomatis dengan Google Sheets secara realtime.',
    deskripsiLengkap: 'StockFlow POS dirancang khusus untuk toko ritel, cafe, dan distributor UMKM. Dilengkapi modul kasir barcode, cetak invoice struk otomatis via Google Docs, kontrol limit minimum stok dengan alert email otomatis, serta laporan omzet harian tanpa perlu langganan software POS bulanan.',
    harga: 850000,
    kategori: 'POS & Kasir',
    urlGambar: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
    fiturUtama: [
      'Sinkronisasi 2 arah Google Sheets & Web Kasir',
      'Generate Invoice PDF otomatis ke Google Drive',
      'Barcode scanner support via kamera / scanner USB',
      'Email notifikasi otomatis saat stok menipis (<5 pcs)',
      'Tanpa biaya langganan bulanan selamanya'
    ],
    integrasi: ['Google Sheets', 'Google Drive', 'Google Docs', 'Gmail'],
    statusTampil: 'aktif',
    jumlahDilihat: 284,
    tanggalDibuat: '2026-09-15',
    waktuPengerjaan: 'Instalasi Siap Pakai 1 Jam',
    popular: true
  },
  {
    id: 'GAS-002',
    nama: 'DealFlow B2B CRM & Sales Pipeline',
    deskripsi: 'Pipeline manajemen prospek penjualan dengan papan Kanban interaktif, pencatatan follow-up, dan estimasi proyeksi revenue.',
    deskripsiLengkap: 'Kelola ratusan prospek B2B tanpa tercecer. Dilengkapi sistem pengingat follow-up otomatis ke tim sales via WhatsApp Web & Gmail, kartu profil klien komprehensif, pencatatan histori penawaran, serta ringkasan forecast nilai closing yang dihitung otomatis di spreadsheet Anda.',
    harga: 950000,
    kategori: 'CRM & Pipeline',
    urlGambar: '/src/assets/images/product_crm_sales_1791906704847.jpg',
    fiturUtama: [
      'Papan visual Kanban drag-and-drop',
      'Pencatatan riwayat interaksi klien & follow-up',
      'Template proposal otomatis format Google Docs',
      'Pengingat deadline follow-up via trigger GAS',
      'Role tim: Sales Rep & Sales Manager'
    ],
    integrasi: ['Google Sheets', 'Google Calendar', 'Gmail', 'Google Drive'],
    statusTampil: 'aktif',
    jumlahDilihat: 312,
    tanggalDibuat: '2026-09-20',
    waktuPengerjaan: 'Setup Cepat 2 Jam',
    popular: true
  },
  {
    id: 'GAS-003',
    nama: 'HR Connect Presensi GPS & Payroll Slip',
    deskripsi: 'Web app absensi karyawan berbasis geolocation GPS & swafoto, rekap kehadiran otomatis, dan generator slip gaji instan.',
    deskripsiLengkap: 'Solusi absensi modern untuk tim onsite maupun WFH. Karyawan check-in menggunakan smartphone dengan validasi radius GPS kantor, foto selfie langsung masuk folder Google Drive khusus karyawan, dan admin HR cukup klik 1 tombol untuk membuat seluruh slip gaji PDF berpassword.',
    harga: 1200000,
    kategori: 'HR & Absensi',
    urlGambar: '/src/assets/images/product_hr_payroll_1791906703980.jpg',
    fiturUtama: [
      'Validasi radius geolokasi GPS & radius meter kantor',
      'Kamera selfie verifikasi kehadiran langsung ke Drive',
      'Kalkulasi lembur, potongan telat, & BPJS otomatis',
      'Kirim slip gaji PDF langsung ke email karyawan',
      'Dashboard rekap cuti & izin terintegrasi'
    ],
    integrasi: ['Google Sheets', 'Google Drive', 'Gmail', 'Google Maps API'],
    statusTampil: 'aktif',
    jumlahDilihat: 418,
    tanggalDibuat: '2026-09-02',
    waktuPengerjaan: 'Instalasi Siap Pakai',
    popular: true
  },
  {
    id: 'GAS-004',
    nama: 'AutoNotif WhatsApp & Gmail Engine',
    deskripsi: 'Engine otomatisasi pengiriman pesan tagihan, konfirmasi pembayaran, dan reminder agenda langsung dari baris Google Sheets.',
    deskripsiLengkap: 'Automasi pengiriman pesan personalisasi ke ribuan kontak dari Google Sheets. Mendukung variabel nama, nomor invoice, tanggal jatuh tempo, link lampiran Drive, serta trigger otomatis berdasarkan event perubahan status di lembar kerja.',
    harga: 650000,
    kategori: 'Otomasi WhatsApp',
    urlGambar: '/src/assets/images/hero_gas_suite_1791906701798.jpg',
    fiturUtama: [
      'Integrasi Webhook WhatsApp & Gmail API resmi',
      'Kirim pesan terjadwal via Google Time-driven Trigger',
      'Dynamic field placeholder ({Nama}, {NomorInvoice}, dll)',
      'Status log sukses/gagal langsung di kolom Sheet',
      'Anti-banned delay interval protection'
    ],
    integrasi: ['Google Sheets', 'Gmail', 'Apps Script Triggers', 'WhatsApp Gateway'],
    statusTampil: 'aktif',
    jumlahDilihat: 195,
    tanggalDibuat: '2026-10-01',
    waktuPengerjaan: 'Siap Pakai 30 Menit',
    popular: false
  },
  {
    id: 'GAS-005',
    nama: 'Invoice & Kwitansi Digital Generator',
    deskripsi: 'Buat tagihan profesional dengan nomor urut otomatis, hitung PPN/PPh, dan unduh PDF bermaterai digital dalam 3 detik.',
    deskripsiLengkap: 'Tidak perlu buat invoice manual satu per satu. Cukup input di form web app atau spreadsheet, file PDF invoice resmi dengan kop surat bisnis dan QR code verifikasi langsung tersimpan di Google Drive dan terkirim otomatis ke email klien.',
    harga: 550000,
    kategori: 'Keuangan & Invoice',
    urlGambar: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
    fiturUtama: [
      'Penomoran otomatis berurutan (INV/2026/X/001)',
      'Perhitungan PPN 11% & diskon otomatis',
      'QR Code verifikasi keaslian dokumen',
      'Arsip otomatis ke Google Drive tersusun rapi per bulan',
      'Desain template invoice modern profesional'
    ],
    integrasi: ['Google Sheets', 'Google Docs', 'Google Drive', 'Gmail'],
    statusTampil: 'aktif',
    jumlahDilihat: 230,
    tanggalDibuat: '2026-10-05',
    waktuPengerjaan: 'Setup Cepat',
    popular: false
  },
  {
    id: 'GAS-006',
    nama: 'Custom Google Apps Script Solution',
    deskripsi: 'Pembangunan web application atau otomasi kustom sesuai dengan alur kerja (SOP) spesifik bisnis Anda dari nol.',
    deskripsiLengkap: 'Punya kebutuhan khusus yang belum ada di katalog? Tim Mandala akan membangun sistem kustom berbasis Google Apps Script, Google Sheets, dan Google Drive yang dirancang khusus mengikuti formula dan proses operasional bisnis Anda.',
    harga: 1500000,
    kategori: 'Custom Script',
    urlGambar: '/src/assets/images/product_crm_sales_1791906704847.jpg',
    fiturUtama: [
      'Konsultasi alur kerja dan rancangan database Sheets',
      'UI Web App kustom responsive desktop & mobile',
      'Integrasi API pihak ketiga (ekspedisi, payment, messaging)',
      'Garansi bug fix & panduan video tutorial',
      'Full source code diberikan ke Google Drive Anda'
    ],
    integrasi: ['Google Sheets', 'Google Drive', 'Gmail', 'Apps Script Triggers', 'External API'],
    statusTampil: 'aktif',
    jumlahDilihat: 178,
    tanggalDibuat: '2026-10-08',
    waktuPengerjaan: '3 - 7 Hari Kerja',
    popular: false
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-101',
    nama: 'Budi Pratama',
    email: 'budi.pratama@kopinusantara.id',
    telepon: '081288992211',
    produkId: 'GAS-001',
    namaProduk: 'StockFlow POS & Multi-Branch Inventory',
    pesan: 'Halo Mas Mandala, kafe kami ada 2 cabang di Bandung. Apakah sistem ini bisa membedakan stok antar cabang di satu Google Sheet?',
    budget: 'Rp 1.000.000 - Rp 2.000.000',
    status: 'Dibalas',
    tanggalMasuk: '2026-10-10 14:22',
    catatanAdmin: 'Sudah dijelaskan fitur tab multi-cabang. Menunggu konfirmasi pembayaran.'
  },
  {
    id: 'INQ-102',
    nama: 'dr. Siti Rahmawati',
    email: 'siti.kliniksehat@gmail.com',
    telepon: '085712345678',
    produkId: 'GAS-003',
    namaProduk: 'HR Connect Presensi GPS & Payroll Slip',
    pesan: 'Selamat siang, kami klinik kesehatan dengan 18 perawat dan staf. Ingin konsultasi apakah presensi bisa dibatasi sesuai koordinat GPS klinik kami?',
    budget: 'Rp 1.200.000',
    status: 'Baru',
    tanggalMasuk: '2026-10-12 09:15'
  },
  {
    id: 'INQ-103',
    nama: 'Hendrik Wijaya',
    email: 'hendrik@logistiksumatra.co.id',
    telepon: '081399887766',
    produkId: 'GAS-002',
    namaProduk: 'DealFlow B2B CRM & Sales Pipeline',
    pesan: 'Mau tanya Mas, apakah bisa ditambahkan field estimasi tonase kargo di kartu prospeknya? Kami butuh untuk 5 sales representative.',
    budget: 'Rp 2.000.000 - Rp 3.000.000',
    status: 'Baru',
    tanggalMasuk: '2026-10-13 07:45'
  }
];

export const INITIAL_TESTIMONIALS: Testimoni[] = [
  {
    id: 'TEST-01',
    nama: 'Rian Firmansyah',
    pekerjaan: 'Co-founder & Ops, Artisan Roastery',
    isi: 'Awalnya ragu apakah Google Sheets bisa secepat aplikasi kasir berbayar puluhan juta. Ternyata StockFlow buatan Mas Mandala luar biasa lancar! Tidak ada lagi langganan POS Rp 300rb/bulan.',
    rating: 5,
    urlFotoProfil: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    urlBukti: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
    namaProduk: 'StockFlow POS & Multi-Branch Inventory',
    statusApproval: 'Disetujui',
    tanggalKirim: '2026-09-28'
  },
  {
    id: 'TEST-02',
    nama: 'Dewi Lestari',
    pekerjaan: 'General Manager, PT Sentosa Rekayasa',
    isi: 'HR Connect menghemat 4 hari kerja kami setiap akhir bulan. Perhitungan lembur dan kirim slip gaji berpassword via Gmail berjalan otomatis dalam 1 kali klik. Sangat rapi!',
    rating: 5,
    urlFotoProfil: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    urlBukti: '/src/assets/images/product_hr_payroll_1791906703980.jpg',
    namaProduk: 'HR Connect Presensi GPS & Payroll Slip',
    statusApproval: 'Disetujui',
    tanggalKirim: '2026-10-04'
  },
  {
    id: 'TEST-03',
    nama: 'Arya Nugraha',
    pekerjaan: 'Sales Director, Nusa Digital Agency',
    isi: 'Papan Kanban DealFlow sangat intuitif. Tim sales kami yang sebelumnya malas update CRM sekarang jadi rajin karena semuanya langsung nyambung ke Google Drive & WhatsApp.',
    rating: 5,
    urlFotoProfil: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    urlBukti: '/src/assets/images/product_crm_sales_1791906704847.jpg',
    namaProduk: 'DealFlow B2B CRM & Sales Pipeline',
    statusApproval: 'Disetujui',
    tanggalKirim: '2026-10-09'
  },
  {
    id: 'TEST-04',
    nama: 'Farhan Kurnia',
    pekerjaan: 'Owner, Toko Bangunan Berkah Abadi',
    isi: 'Otomasi WhatsApp dan invoice PDF-nya sangat membantu tagihan tempo pelanggan kami. Customer langsung terima notifikasi rincian pembayaran di WA.',
    rating: 5,
    urlFotoProfil: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    urlBukti: '/src/assets/images/hero_gas_suite_1791906701798.jpg',
    namaProduk: 'AutoNotif WhatsApp & Gmail Engine',
    statusApproval: 'Menunggu Approval',
    tanggalKirim: '2026-10-12'
  }
];

export const INITIAL_ANNOUNCEMENT: Pengumuman = {
  teks: '⚡ PROMO OKTOBER 2026: Dapatkan Gratis Konsultasi Alur Kerja & Free Setup Deployment Google Drive untuk Setiap Pemesanan Web App Hari Ini! · Hubungi WhatsApp: +62 812-3456-7890 ⚡',
  warna: 'cyan',
  statusAktif: true,
  kecepatanDetik: 25,
  tautanUrl: '#kontak'
};

export const INITIAL_BANNERS: BannerPromo[] = [
  {
    id: 'BAN-01',
    judul: '100% Bebas Biaya Server Bulanan',
    subjudul: 'Web App berjalan langsung di ekosistem Google Workspace & Drive pribadi Anda.',
    urlGambar: '/src/assets/images/hero_gas_suite_1791906701798.jpg',
    linkTujuan: '#produk',
    badgePromo: 'HEMAT BIAYA TI',
    statusAktif: true,
    urutan: 1
  },
  {
    id: 'BAN-02',
    judul: 'Integrasi Penuh Google Sheets & Gmail',
    subjudul: 'Database aman di akun Google Anda sendiri, tanpa ketergantungan pihak ketiga.',
    urlGambar: '/src/assets/images/product_crm_sales_1791906704847.jpg',
    linkTujuan: '#produk',
    badgePromo: 'FULL PRIVACY',
    statusAktif: true,
    urutan: 2
  },
  {
    id: 'BAN-03',
    judul: 'Siap Pakai & Kustomisasi Fleksibel',
    subjudul: 'Bisa langsung digunakan atau dimodifikasi sesuai proses bisnis Anda.',
    urlGambar: '/src/assets/images/product_pos_sheet_1791906703396.jpg',
    linkTujuan: '#kontak',
    badgePromo: 'KUSTOM 1-ON-1',
    statusAktif: true,
    urutan: 3
  }
];
