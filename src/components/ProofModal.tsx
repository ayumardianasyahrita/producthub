import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export const ProofModal: React.FC = () => {
  const { selectedProofUrl, setSelectedProofUrl } = useApp();

  if (!selectedProofUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Bukti Pemakaian Nyata (Google Sheets & Web App)
              </h3>
              <p className="text-xs text-neutral-400">
                Pengguna: <span className="text-neutral-200 font-medium">{selectedProofUrl.clientName}</span> · {selectedProofUrl.title}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedProofUrl(null)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image viewport */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-neutral-950/50 flex flex-col items-center justify-center">
          <div className="relative rounded-xl overflow-hidden border border-neutral-800 max-h-[65vh] w-full flex items-center justify-center bg-black">
            <img
              src={selectedProofUrl.url}
              alt={selectedProofUrl.title}
              className="max-h-[65vh] w-auto object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Verification Banner */}
          <div className="w-full mt-4 p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Screenshot ini terverifikasi berjalan di Google Workspace klien dengan hak akses penuh.
              </span>
            </div>

            <button
              onClick={() => setSelectedProofUrl(null)}
              className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
