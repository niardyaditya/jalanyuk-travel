import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Compass, ExternalLink } from 'lucide-react';

interface ExperienceVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Customizable YouTube video ID or direct embed URL
  videoId?: string;
  title?: string;
}

export const ExperienceVideoModal: React.FC<ExperienceVideoModalProps> = ({
  isOpen,
  onClose,
  // High definition 4K cinematic nature & liveaboard expedition footage of Raja Ampat & Komodo
  videoId = 'G36z1N_hGls', 
  title = 'Sinematik Ekspedisi Alam Nusantara — JalanYuk'
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#111a17] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#283e37]"
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#283e37] bg-[#172420]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#396754]/40 flex items-center justify-center text-[#bbeed5]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {title}
                </h3>
                <p className="text-[11px] text-[#bbeed5]">
                  Dokumentasi Resmi Ekspedisi Phinisi & Alam Liar
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Tutup Video"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Container (16:9 responsive aspect ratio) */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Footer note */}
          <div className="px-5 py-3.5 bg-[#172420] border-t border-[#283e37] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#d1ddd8]">
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-[#f39223] fill-[#f39223]" />
              Format 4K Ultra HD • Diambil langsung oleh tim ranger JalanYuk
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#bbeed5] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Buka di YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
