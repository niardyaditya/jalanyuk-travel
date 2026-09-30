import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, Share2, Leaf, Bookmark, CheckCircle2 } from 'lucide-react';
import { TravelStory } from '../../types/travel';

interface StoryModalProps {
  story: TravelStory | null;
  onClose: () => void;
  onShare: (title: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onShare }) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#172420] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-[#283e37] overflow-hidden my-8"
      >
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer"
            aria-label="Tutup Artikel"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Badge */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#396754] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              <Leaf className="w-3 h-3" />
              {story.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
              {story.title}
            </h2>
          </div>
        </div>

        {/* Story Metadata & Author */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between py-3 border-y border-stone-200 dark:border-[#283e37] text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#bbeed5] text-[#182C23] flex items-center justify-center font-bold text-xs shrink-0">
                JY
              </div>
              <div>
                <p className="font-bold text-stone-900 dark:text-white">{story.author}</p>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                  <span>{story.authorRole}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#396754] dark:text-[#bbeed5]" />
                    {story.readTime}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onShare(story.title)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
              <span>Bagikan</span>
            </button>
          </div>

          {/* Summary / Excerpt */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#1d2d28] border-l-4 border-[#396754]">
            <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium leading-relaxed italic">
              "{story.excerpt}"
            </p>
          </div>

          {/* Detailed Content with clear high contrast in light mode */}
          <div className="text-stone-800 dark:text-stone-200 space-y-4 text-sm leading-relaxed">
            <p>
              Menjelajahi kawasan konservasi dan lanskap alam Nusantara membutuhkan kesadaran mendalam mengenai jejak ekologis yang kita tinggalkan. Setiap langkah dan keputusan kita di alam bebas memiliki dampak langsung terhadap kelestarian ekosistem dan kesejahteraan komunitas adat lokal.
            </p>

            <h4 className="text-base font-bold text-stone-900 dark:text-white pt-2">
              Prinsip Penting untuk Setiap Petualang:
            </h4>

            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#396754] dark:text-[#bbeed5] shrink-0 mt-0.5" />
                <span className="text-stone-800 dark:text-stone-200">
                  <strong className="text-stone-900 dark:text-white">Perencanaan Rute & Logistik:</strong> Siapkan perlengkapan ramah lingkungan, hindari kemasan plastik sekali pakai, dan gunakan wadah makan/minum reusable berkualitas tinggi.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#396754] dark:text-[#bbeed5] shrink-0 mt-0.5" />
                <span className="text-stone-800 dark:text-stone-200">
                  <strong className="text-stone-900 dark:text-white">Hormati Terumbu Karang & Flora:</strong> Jangan pernah menginjak karang laut saat snorkeling di Raja Ampat atau Labuan Bajo. Gunakan tabir surya aman karang (reef-safe sunscreen).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#396754] dark:text-[#bbeed5] shrink-0 mt-0.5" />
                <span className="text-stone-800 dark:text-stone-200">
                  <strong className="text-stone-900 dark:text-white">Dukungan Ekonomi Lokal Berkelanjutan:</strong> Libatkan pemandu lokal berlisensi dan dukung homestay serta perajin kain tenun tradisional di desa-desa yang disinggahi.
                </span>
              </li>
            </ul>

            <p className="pt-2">
              Di JalanYuk, seluruh ekspedisi kami didampingi oleh instruktur konservasi dan ranger taman nasional bersertifikasi. Kami berkomitmen untuk menyumbangkan 5% dari setiap tiket perjalanan untuk program pelestarian terumbu karang dan penghijauan lereng gunung.
            </p>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#396754] hover:bg-[#1e4d3b] text-white font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
            >
              Selesai Membaca
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
