import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, MapPin, ArrowUpRight, ArrowRight, Compass } from 'lucide-react';
import { Destination, TripCategory } from '../../types/travel';

interface PopularDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: string[];
  onOpenAllDestinations: () => void;
}

const CATEGORIES: TripCategory[] = [
  'Semua',
  'Hidden Gems',
  'Petualangan Alam',
  'Pantai Tropis',
  'Wisata Budaya',
  'Family Trip'
];

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  destinations,
  onSelectDestination,
  onToggleWishlist,
  wishlistIds,
  onOpenAllDestinations
}) => {
  const [activeCategory, setActiveCategory] = useState<TripCategory>('Semua');

  const filteredDestinations = activeCategory === 'Semua'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section 
      className="relative py-16 md:py-24 bg-[#ebf6f1]/60 dark:bg-[#15201c] border-y border-[#dac2af]/20 dark:border-[#283e37] transition-colors" 
      id="destinasi"
    >
      {/* Anchor for destinasi-populer */}
      <div id="destinasi-populer" className="absolute -top-24 h-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#396754] dark:text-[#bbeed5] text-xs font-bold uppercase tracking-widest block mb-2">
              PILIHAN TERBAIK UNTUK ANDA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141e1b] dark:text-white tracking-tight">
              Destinasi Populer & Terfavorit
            </h2>
          </div>

          {/* Trigger All Destinations Catalog Modal */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAllDestinations}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1d2d28] border border-[#dac2af]/40 dark:border-[#283e37] text-[#8d4f00] dark:text-[#ffb875] text-sm font-bold shadow-xs hover:border-[#8d4f00] dark:hover:border-[#ffb875] transition-colors cursor-pointer self-start md:self-auto transform-gpu"
          >
            <span>Lihat Semua Destinasi ({destinations.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Category Filter Chips with Animated Indicators */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-6 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#182C23] text-white shadow-md'
                    : 'bg-white dark:bg-[#1d2d28] text-[#544435] dark:text-[#d1ddd8] border border-[#dac2af]/40 dark:border-[#283e37] hover:border-[#396754] hover:text-[#396754] dark:hover:text-[#bbeed5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Destinations Cards Grid with Smooth Framer Motion */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, idx) => {
              const isWishlisted = wishlistIds.includes(dest.id);
              return (
                <motion.article
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ 
                    duration: 0.35, 
                    delay: idx * 0.04,
                    ease: 'easeOut' 
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-[#1d2d28] rounded-2xl border border-[#dac2af]/30 dark:border-[#283e37] overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300 flex flex-col group transform-gpu"
                >
                  {/* Image container 4:3 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106 transform-gpu"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    {/* Rating badge top-left */}
                    <div className="absolute top-3 left-3 bg-[#182C23]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-[#f39223] fill-[#f39223]" />
                      <span>{dest.rating}</span>
                      <span className="text-white/70 font-normal">({dest.reviewCount})</span>
                    </div>

                    {/* Wishlist toggle top-right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(dest.id);
                      }}
                      aria-label="Simpan destinasi"
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-90 ${
                        isWishlisted
                          ? 'bg-white text-[#ba1a1a] shadow-md'
                          : 'bg-white/80 dark:bg-black/40 text-[#141e1b] dark:text-white hover:bg-white hover:text-[#ba1a1a]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#ba1a1a]' : ''}`} />
                    </button>

                    {/* Trip duration tag bottom-left */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#182C23]/80 text-white text-[11px] font-semibold backdrop-blur-sm">
                        {dest.duration} • {dest.tripType}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#396754] dark:text-[#bbeed5] text-xs font-semibold mb-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{dest.province}, {dest.country}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white group-hover:text-[#396754] dark:group-hover:text-[#bbeed5] transition-colors line-clamp-1">
                        {dest.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] mt-1.5 line-clamp-2 leading-relaxed">
                        {dest.shortDescription}
                      </p>
                    </div>

                    {/* Price and Details CTA */}
                    <div className="pt-4 mt-4 border-t border-[#dac2af]/20 dark:border-[#283e37] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#544435] dark:text-[#d1ddd8] block uppercase font-bold tracking-wider">
                          Mulai Dari
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-[#8d4f00] dark:text-[#ffb875]">
                          {formatRupiah(dest.pricePerPerson)}
                        </span>
                        <span className="text-[11px] text-[#544435] dark:text-[#d1ddd8]"> / orang</span>
                      </div>

                      <button
                        onClick={() => onSelectDestination(dest.id)}
                        aria-label={`Lihat detail ${dest.name}`}
                        className="w-10 h-10 rounded-full bg-[#bbeed5] dark:bg-[#396754] text-[#182C23] dark:text-white hover:bg-[#182C23] hover:text-white dark:hover:bg-[#bbeed5] dark:hover:text-[#182C23] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm group-hover:rotate-45"
                        title="Lihat Detail Ekspedisi"
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout to Open Full Catalog */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAllDestinations}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-[#1d2d28] border-2 border-[#182C23] dark:border-[#396754] text-[#182C23] dark:text-white font-bold text-sm hover:bg-[#182C23] hover:text-white dark:hover:bg-[#396754] shadow-md transition-all duration-200 cursor-pointer transform-gpu"
          >
            <Compass className="w-4 h-4 text-[#f39223]" />
            <span>Jelajahi Seluruh {destinations.length} Destinasi & Paket Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
