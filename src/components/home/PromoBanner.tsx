import React, { useState } from 'react';
import { ArrowRight, Tag, Clock, Copy, Check } from 'lucide-react';

interface PromoBannerProps {
  onClaimPromo: (code: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onClaimPromo }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'JALANYUK25';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    onClaimPromo(promoCode);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-[#182C23] dark:bg-[#1a2823] text-white overflow-hidden p-8 sm:p-12 md:p-16 shadow-2xl border border-white/10">
        
        {/* Decorative Botanical Glows */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#396754]/40 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#f39223]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 text-[#ffb875]" />
            <span className="text-[11px] font-bold tracking-wider text-white uppercase">
              PENAWARAN SPESIAL MUSIM LIBURAN
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Wujudkan Rencana Liburan Impian Anda Hari Ini
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-xl">
            Dapatkan potongan hingga <span className="font-extrabold text-[#ffb875]">25%</span> untuk reservasi awal paket open trip dan private tour dengan jadwal fleksibel serta garansi uang kembali 100%.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#f39223] text-white text-sm font-bold cta-glow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span>{copied ? 'Kode Tersalin & Diterapkan!' : 'Klaim Kode Diskon 25%'}</span>
              {copied ? <Check className="w-4 h-4 text-white" /> : <ArrowRight className="w-4 h-4 text-white" />}
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
              title="Klik untuk salin kode voucher"
            >
              <Copy className="w-3.5 h-3.5 text-[#ffb875]" />
              <span>{promoCode}</span>
            </button>

            <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-[#ffb875]" />
              <span>Promo berlaku hingga 31 Mei 2025 • Kuota terbatas</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
