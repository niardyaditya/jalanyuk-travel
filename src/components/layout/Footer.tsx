import React, { useState } from 'react';
import { Compass, Camera, Play, Music, Briefcase, ArrowUp, Headset, Lock, Check } from 'lucide-react';

interface FooterProps {
  onSelectDestination: (id: string) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDestination, onNavigateHome }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#182C23] dark:bg-[#0d1412] text-[#daede1] border-t border-white/10 transition-colors" id="tentang-kami">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#bbeed5] text-[#182C23] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-[#182C23]" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                JalanYuk
              </span>
            </button>

            <p className="text-xs sm:text-sm text-[#ccded3] max-w-sm leading-relaxed">
              Platform travel experience profesional yang menghubungkan traveler berjiwa petualang dengan keajaiban alam nusantara secara otentik, aman, dan bertanggung jawab terhadap ekosistem.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram JalanYuk"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f39223] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="YouTube JalanYuk"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f39223] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="TikTok JalanYuk"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f39223] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Music className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn JalanYuk"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f39223] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Destinasi Populer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Destinasi Populer
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#ccded3]">
              <li>
                <button 
                  onClick={() => onSelectDestination('raja-ampat')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Raja Ampat & Misool
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectDestination('labuan-bajo')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Labuan Bajo & Komodo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectDestination('bromo-sunrise')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gunung Bromo & Semeru
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectDestination('sumba-savana')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pulau Sumba Eksotis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectDestination('bali-terraces')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ubud Bali & Nusa Penida
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi & Bantuan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Informasi & Bantuan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#ccded3]">
              <li><a href="#pengalaman" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#destinasi" className="hover:text-white transition-colors">Petualangan Alam</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Panduan Lokal & Jurnal</a></li>
              <li><a href="https://wa.me/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Bantuan 24 Jam</a></li>
              <li><a href="#syarat" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Inspirasi Mingguan
            </h4>
            <p className="text-xs text-[#ccded3] leading-relaxed">
              Daftarkan email Anda untuk tips rahasia destinasi tersembunyi dan voucher promo member.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs sm:text-sm focus:outline-none focus:border-[#bbeed5] transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#f39223] text-white font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Terima Kasih Telah Berlangganan!</span>
                  </>
                ) : (
                  <span>Berlangganan</span>
                )}
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-[#ccded3] pt-1">
              <Lock className="w-3 h-3 text-[#ffb875]" />
              <span>Bebas spam, batalkan kapan saja.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ccded3]">
          <p>© 2025 JalanYuk. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/" 
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Headset className="w-4 h-4 text-[#ffb875]" />
              <span>Customer Service 24 Jam</span>
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 text-[#ffb875]" />
              <span>Kembali ke Atas</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
