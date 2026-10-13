import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { NeonAnnouncement } from './components/NeonAnnouncement';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { TestimonialSection } from './components/TestimonialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProofModal } from './components/ProofModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { CheckCircle2, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { recentGasSyncNotification, clearGasSyncNotification } = useApp();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-neutral-950">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Neon Announcement Running Text Ticker (PRD F4) */}
      <NeonAnnouncement />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero Section & Promo Banner Carousel (PRD F5) */}
        <HeroSection />

        {/* 4. Portfolio & Product Catalog Grid (PRD F1) */}
        <ProductCatalog />

        {/* 5. Testimonial & Real Proof of Work Section (PRD F3 / F9) */}
        <TestimonialSection />

        {/* 6. Contact & Inquiry Order Section (PRD F2) */}
        <ContactSection />
      </main>

      {/* 7. Quiet Footer with Discreet Admin Access */}
      <Footer />

      {/* Modals & Dialogs */}
      <ProductDetailModal />
      <ProofModal />
      <AdminLoginModal />
      <AdminPanel />

      {/* Simulated Google Apps Script Live Sync Feedback */}
      {recentGasSyncNotification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-neutral-900 border border-neutral-700 rounded-xl p-3.5 shadow-2xl flex items-start gap-3 animate-bounce-subtle">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              Google Apps Script Sync
            </div>
            <p className="text-xs text-neutral-200 mt-0.5 leading-snug">
              {recentGasSyncNotification}
            </p>
          </div>
          <button
            onClick={clearGasSyncNotification}
            className="text-neutral-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
