import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminInquiries } from './AdminInquiries';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminAnnouncement } from './AdminAnnouncement';
import { AdminBanners } from './AdminBanners';
import { AdminSpreadsheetView } from './AdminSpreadsheetView';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Star,
  Sparkles,
  Images,
  FileSpreadsheet,
  LogOut,
  X,
  ExternalLink,
  ShieldCheck,
  User,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { adminUser, logoutAdmin, isAdminOpen, setIsAdminOpen, inquiries, testimonials } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'inquiries' | 'testimonials' | 'announcement' | 'banners' | 'sheets'>('dashboard');

  if (!isAdminOpen) return null;

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'Baru').length;
  const pendingTestimonialsCount = testimonials.filter(t => t.statusApproval === 'Menunggu Approval').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Statistik', icon: LayoutDashboard, badge: null },
    { id: 'products', label: 'Kelola Produk (CRUD)', icon: Package, badge: null },
    {
      id: 'inquiries',
      label: 'Daftar Inquiry',
      icon: MessageSquare,
      badge: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} Baru` : null,
    },
    {
      id: 'testimonials',
      label: 'Moderasi Testimoni',
      icon: Star,
      badge: pendingTestimonialsCount > 0 ? `${pendingTestimonialsCount}` : null,
    },
    { id: 'announcement', label: 'Pengumuman Neon', icon: Sparkles, badge: null },
    { id: 'banners', label: 'Banner Promo Drive', icon: Images, badge: null },
    { id: 'sheets', label: 'Database Google Sheets', icon: FileSpreadsheet, badge: 'Raw' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden animate-fade-in">
      {/* Top Admin Header Bar */}
      <header className="h-16 px-4 sm:px-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-400 text-neutral-950 font-bold flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Admin Console · Mandala GAS Studio</span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                v1.0-GAS
              </span>
            </h1>
            <p className="text-[11px] text-neutral-400">
              Pengelola Terpusat: Produk, Pesanan, Bukti Testimoni, Pengumuman & Banner
            </p>
          </div>
        </div>

        {/* User Session & Close */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
            <img
              src={adminUser.avatar}
              alt={adminUser.nama}
              className="w-6 h-6 rounded-full object-cover border border-neutral-700"
            />
            <div className="text-left">
              <div className="font-semibold text-white leading-tight">{adminUser.nama}</div>
              <div className="text-[10px] text-neutral-400 font-mono truncate max-w-[160px]">
                {adminUser.email}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors flex items-center gap-1.5"
            title="Tutup Panel & Kembali ke Landing Page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Web Publik</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors"
            title="Keluar / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-neutral-900/60 border-r border-neutral-800 flex flex-col justify-between shrink-0 hidden md:flex">
          <nav className="p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500 text-neutral-950 font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-neutral-950 text-cyan-300'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Database Status in Sidebar */}
          <div className="p-3 border-t border-neutral-800/80 m-2 rounded-lg bg-neutral-950/70 text-[11px] text-neutral-400 space-y-1.5">
            <div className="flex items-center justify-between text-neutral-300 font-semibold">
              <span>Google Sheets Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[10px] text-neutral-500 leading-tight">
              Terkoneksi ke Google Drive & Gmail API via Apps Script Web App.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
          {/* Mobile Tab Bar */}
          <div className="md:hidden flex items-center gap-1 overflow-x-auto p-2 bg-neutral-900 border-b border-neutral-800 scrollbar-none">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap shrink-0 ${
                  activeTab === item.id
                    ? 'bg-cyan-400 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={tab => setActiveTab(tab as any)} />}
              {activeTab === 'products' && <AdminProducts />}
              {activeTab === 'inquiries' && <AdminInquiries />}
              {activeTab === 'testimonials' && <AdminTestimonials />}
              {activeTab === 'announcement' && <AdminAnnouncement />}
              {activeTab === 'banners' && <AdminBanners />}
              {activeTab === 'sheets' && <AdminSpreadsheetView />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
