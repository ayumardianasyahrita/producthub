import React, { useState } from 'react';
import { useApp, AUTHORIZED_ADMIN_EMAILS } from '../../context/AppContext';
import { Shield, X, AlertCircle, CheckCircle, Lock } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin, setIsAdminOpen } = useApp();
  const [emailInput, setEmailInput] = useState('ayumardianasyahrita1414@gmail.com');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      const success = loginAdmin(emailInput);
      setIsVerifying(false);
      if (success) {
        setIsLoginModalOpen(false);
        setIsAdminOpen(true);
      } else {
        setErrorMsg(`Akses ditolak: Email "${emailInput}" tidak terdaftar sebagai Super Admin Google Apps Script.`);
      }
    }, 600);
  };

  const handleQuickLogin = (email: string) => {
    setEmailInput(email);
    setErrorMsg('');
    setIsVerifying(true);
    setTimeout(() => {
      loginAdmin(email);
      setIsVerifying(false);
      setIsLoginModalOpen(false);
      setIsAdminOpen(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Autentikasi Akun Google Admin</h3>
              <p className="text-[11px] text-neutral-400">Panel Pengelola Produk & Inquiry GAS (F6)</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              setErrorMsg('');
            }}
            className="p-1 text-neutral-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick select authorized admin accounts */}
        <div className="mb-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
          <div className="text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
            Akun Google Admin Terverifikasi (1-Klik Masuk):
          </div>
          <div className="space-y-1.5">
            {AUTHORIZED_ADMIN_EMAILS.slice(0, 2).map((mail, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickLogin(mail)}
                className="w-full text-left p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/50 flex items-center justify-between text-xs text-neutral-200 transition-colors group"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="font-mono truncate">{mail}</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-medium group-hover:underline">
                  Masuk ➔
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Email Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Atau Uji dengan Email Lain
            </label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <p className="text-[11px] text-neutral-500 leading-normal">
            Sesuai PRD F6: Hanya email pemilik yang telah terdaftar di whitelist backend yang diizinkan mengakses panel ini.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Memverifikasi...' : 'Verifikasi Akun'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
