import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Inquiry, Testimoni, Pengumuman, BannerPromo, AdminUser } from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_INQUIRIES,
  INITIAL_TESTIMONIALS,
  INITIAL_ANNOUNCEMENT,
  INITIAL_BANNERS
} from '../data/initialData';

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'jumlahDilihat' | 'tanggalDibuat'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  incrementProductViews: (id: string) => void;

  // Inquiries
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'tanggalMasuk'>) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: 'Baru' | 'Dibalas', catatanAdmin?: string) => void;
  deleteInquiry: (id: string) => void;

  // Testimonials
  testimonials: Testimoni[];
  approvedTestimonials: Testimoni[];
  addTestimonial: (testimoni: Omit<Testimoni, 'id' | 'statusApproval' | 'tanggalKirim'>) => Promise<boolean>;
  updateTestimonialStatus: (id: string, status: 'Disetujui' | 'Menunggu Approval' | 'Ditolak') => void;
  deleteTestimonial: (id: string) => void;

  // Announcement
  announcement: Pengumuman;
  updateAnnouncement: (announcement: Partial<Pengumuman>) => void;

  // Banners
  banners: BannerPromo[];
  addBanner: (banner: Omit<BannerPromo, 'id'>) => void;
  updateBanner: (id: string, banner: Partial<BannerPromo>) => void;
  deleteBanner: (id: string) => void;

  // Admin Auth
  adminUser: AdminUser;
  loginAdmin: (email: string) => boolean;
  logoutAdmin: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Active Modals & Selections
  selectedProductForInquiry: Product | null;
  setSelectedProductForInquiry: (p: Product | null) => void;
  selectedProofUrl: { url: string; title: string; clientName: string } | null;
  setSelectedProofUrl: (proof: { url: string; title: string; clientName: string } | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (p: Product | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Sync simulation & notification
  recentGasSyncNotification: string | null;
  clearGasSyncNotification: () => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'ph_gas_products_v1',
  INQUIRIES: 'ph_gas_inquiries_v1',
  TESTIMONIALS: 'ph_gas_testimonials_v1',
  ANNOUNCEMENT: 'ph_gas_announcement_v1',
  BANNERS: 'ph_gas_banners_v1',
  ADMIN: 'ph_gas_admin_v1',
};

// Admin email configured for the owner
export const AUTHORIZED_ADMIN_EMAILS = [
  'ayumardianasyahrita1414@gmail.com',
  'mandala.developer@gmail.com',
  'admin@producthub.id'
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimoni[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [announcement, setAnnouncement] = useState<Pengumuman>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
    } catch {
      return INITIAL_ANNOUNCEMENT;
    }
  });

  const [banners, setBanners] = useState<BannerPromo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BANNERS);
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN);
      return saved
        ? JSON.parse(saved)
        : {
            email: 'ayumardianasyahrita1414@gmail.com',
            nama: 'Mandala (Owner / Lead Developer)',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            role: 'Super Admin / Owner',
            isLoggedIn: false,
          };
    } catch {
      return {
        email: 'ayumardianasyahrita1414@gmail.com',
        nama: 'Mandala (Owner / Lead Developer)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        role: 'Super Admin / Owner',
        isLoggedIn: false,
      };
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);
  const [selectedProofUrl, setSelectedProofUrl] = useState<{ url: string; title: string; clientName: string } | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [recentGasSyncNotification, setRecentGasSyncNotification] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminUser));
  }, [adminUser]);

  const triggerGasNotification = (message: string) => {
    setRecentGasSyncNotification(message);
    setTimeout(() => {
      setRecentGasSyncNotification(null);
    }, 4500);
  };

  // Product Actions
  const addProduct = (newProd: Omit<Product, 'id' | 'jumlahDilihat' | 'tanggalDibuat'>) => {
    const id = `GAS-${String(products.length + 1).padStart(3, '0')}`;
    const product: Product = {
      ...newProd,
      id,
      jumlahDilihat: 0,
      tanggalDibuat: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [product, ...prev]);
    triggerGasNotification(`Google Sheet "Produk" berhasil ditambahkan: ${product.nama}`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    triggerGasNotification(`Google Sheet "Produk" diperbarui [ID: ${id}]`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    triggerGasNotification(`Baris produk [ID: ${id}] dihapus dari Google Sheet`);
  };

  const incrementProductViews = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, jumlahDilihat: p.jumlahDilihat + 1 } : p))
    );
  };

  // Inquiry Actions
  const addInquiry = async (data: Omit<Inquiry, 'id' | 'status' | 'tanggalMasuk'>): Promise<boolean> => {
    const id = `INQ-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newInquiry: Inquiry = {
      ...data,
      id,
      status: 'Baru',
      tanggalMasuk: formattedDate,
    };

    setInquiries(prev => [newInquiry, ...prev]);
    triggerGasNotification(`Inquiry baru tersimpan ke Google Sheets. Notifikasi Gmail dikirim ke Admin.`);
    return true;
  };

  const updateInquiryStatus = (id: string, status: 'Baru' | 'Dibalas', catatanAdmin?: string) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status, ...(catatanAdmin !== undefined ? { catatanAdmin } : {}) } : item))
    );
    triggerGasNotification(`Status inquiry [ID: ${id}] diubah menjadi: ${status}`);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    triggerGasNotification(`Inquiry [ID: ${id}] dihapus dari Google Sheets`);
  };

  // Testimonial Actions
  const approvedTestimonials = testimonials.filter(t => t.statusApproval === 'Disetujui');

  const addTestimonial = async (data: Omit<Testimoni, 'id' | 'statusApproval' | 'tanggalKirim'>): Promise<boolean> => {
    const id = `TEST-${String(testimonials.length + 1).padStart(2, '0')}`;
    const newTestimonial: Testimoni = {
      ...data,
      id,
      statusApproval: 'Menunggu Approval',
      tanggalKirim: new Date().toISOString().split('T')[0],
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    triggerGasNotification(`Testimoni baru diterima & bukti tersimpan di Google Drive (Menunggu Approval Admin)`);
    return true;
  };

  const updateTestimonialStatus = (id: string, status: 'Disetujui' | 'Menunggu Approval' | 'Ditolak') => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, statusApproval: status } : t))
    );
    triggerGasNotification(`Status testimoni [ID: ${id}] diperbarui: ${status}`);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    triggerGasNotification(`Testimoni [ID: ${id}] dihapus`);
  };

  // Announcement Actions
  const updateAnnouncement = (partial: Partial<Pengumuman>) => {
    setAnnouncement(prev => ({ ...prev, ...partial }));
    triggerGasNotification(`Pengumuman running text neon diperbarui di Google Sheets`);
  };

  // Banner Actions
  const addBanner = (bannerData: Omit<BannerPromo, 'id'>) => {
    const id = `BAN-${String(banners.length + 1).padStart(2, '0')}`;
    const banner: BannerPromo = { ...bannerData, id };
    setBanners(prev => [...prev, banner]);
    triggerGasNotification(`Banner promo baru ditambahkan ke Google Drive & Sheets`);
  };

  const updateBanner = (id: string, partial: Partial<BannerPromo>) => {
    setBanners(prev => prev.map(b => (b.id === id ? { ...b, ...partial } : b)));
    triggerGasNotification(`Banner promo diperbarui di Google Sheets`);
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    triggerGasNotification(`Banner promo dihapus`);
  };

  // Admin Auth
  const loginAdmin = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(e => e.toLowerCase() === trimmed);

    if (isAuthorized) {
      setAdminUser(prev => ({
        ...prev,
        email: trimmed,
        isLoggedIn: true,
      }));
      triggerGasNotification(`Otentikasi Google Admin berhasil: ${trimmed}`);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(prev => ({ ...prev, isLoggedIn: false }));
    setIsAdminOpen(false);
    triggerGasNotification(`Admin berhasil keluar`);
  };

  const resetAllDataToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setInquiries(INITIAL_INQUIRIES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    setBanners(INITIAL_BANNERS);
    localStorage.clear();
    triggerGasNotification(`Data berhasil direset ke template default Google Sheets`);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        incrementProductViews,

        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,

        testimonials,
        approvedTestimonials,
        addTestimonial,
        updateTestimonialStatus,
        deleteTestimonial,

        announcement,
        updateAnnouncement,

        banners,
        addBanner,
        updateBanner,
        deleteBanner,

        adminUser,
        loginAdmin,
        logoutAdmin,
        isAdminOpen,
        setIsAdminOpen,

        selectedProductForInquiry,
        setSelectedProductForInquiry,
        selectedProofUrl,
        setSelectedProofUrl,
        selectedProductDetail,
        setSelectedProductDetail,
        isLoginModalOpen,
        setIsLoginModalOpen,

        recentGasSyncNotification,
        clearGasSyncNotification: () => setRecentGasSyncNotification(null),
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
