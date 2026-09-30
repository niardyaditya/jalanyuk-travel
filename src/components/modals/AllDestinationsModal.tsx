import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  SlidersHorizontal, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Destination, TripCategory } from '../../types/travel';

interface AllDestinationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
  onOpenBooking: (dest: Destination) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
}

const CATEGORY_FILTERS: { label: string; value: TripCategory | 'Semua' }[] = [
  { label: 'Semua', value: 'Semua' },
  { label: 'Petualangan Alam', value: 'Petualangan Alam' },
  { label: 'Hidden Gems', value: 'Hidden Gems' },
  { label: 'Pantai Tropis', value: 'Pantai Tropis' },
  { label: 'Wisata Budaya', value: 'Wisata Budaya' },
  { label: 'Family Trip', value: 'Family Trip' },
];

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const AllDestinationsModal: React.FC<AllDestinationsModalProps> = ({
  isOpen,
  onClose,
  destinations,
  onSelectDestination,
  onOpenBooking,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<TripCategory | 'Semua'>('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // High performance memoized filtering with deferred search
  const filteredAndSorted = useMemo(() => {
    let result = destinations;

    // Filter by Category
    if (selectedCategory !== 'Semua') {
      result = result.filter((d) => d.category === selectedCategory);
    }

    // Filter by Search Query (using deferredSearch for 120fps input response)
    const q = deferredSearch.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.province.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tripType.toLowerCase().includes(q) ||
          d.shortDescription.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'popular') {
      return [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    if (sortBy === 'price-asc') {
      return [...result].sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    }
    if (sortBy === 'price-desc') {
      return [...result].sort((a, b) => b.pricePerPerson - a.pricePerPerson);
    }
    if (sortBy === 'rating') {
      return [...result].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    }

    return result;
  }, [destinations, selectedCategory, deferredSearch, sortBy]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSelectCard = (id: string) => {
    onClose();
    onSelectDestination(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCard = (dest: Destination) => {
    onClose();
    onOpenBooking(dest);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop: Solid dark opacity without heavy blur for 60-120fps GPU performance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-white dark:bg-[#141e1b] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-[#283e37] overflow-hidden"
          >
            {/* Header Area (Clean solid colors, no expensive backdrop-blur layers) */}
            <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-[#283e37] bg-white dark:bg-[#141e1b] flex flex-col gap-3.5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ebf6f1] dark:bg-[#20322b] text-[#396754] dark:text-[#bbeed5] flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#141e1b] dark:text-white tracking-tight">
                      Katalog Destinasi ({destinations.length})
                    </h2>
                    <p className="text-xs text-[#544435] dark:text-[#d1ddd8] hidden sm:block">
                      Pilihan ekspedisi alam nusantara dan destinasi internasional terkurasi
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Tutup katalog"
                  className="w-9 h-9 rounded-full bg-stone-100 dark:bg-[#20322b] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2c443b] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Sort Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari destinasi, pulau, atau aktivitas..."
                    className="w-full pl-9 pr-9 py-2 rounded-xl bg-stone-100 dark:bg-[#1d2d28] border border-transparent focus:border-[#396754] focus:bg-white dark:focus:bg-[#141e1b] text-sm text-[#141e1b] dark:text-white placeholder:text-stone-400 focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-[#1d2d28] text-xs font-semibold text-[#544435] dark:text-[#d1ddd8] border border-stone-200/50 dark:border-[#283e37] shrink-0 self-end sm:self-auto">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
                  <span className="hidden sm:inline">Urut:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-transparent border-0 p-0 text-xs font-bold text-[#141e1b] dark:text-white focus:ring-0 cursor-pointer"
                  >
                    <option value="popular" className="dark:bg-[#1d2d28]">Terpopuler</option>
                    <option value="price-asc" className="dark:bg-[#1d2d28]">Harga Termurah</option>
                    <option value="price-desc" className="dark:bg-[#1d2d28]">Harga Tertinggi</option>
                    <option value="rating" className="dark:bg-[#1d2d28]">Rating Tertinggi</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                {CATEGORY_FILTERS.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#182C23] text-white shadow-xs'
                          : 'bg-stone-100 dark:bg-[#1d2d28] text-[#544435] dark:text-[#d1ddd8] hover:bg-stone-200 dark:hover:bg-[#283e37]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Content Grid (Optimized without re-mounting lag) */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>
                  Menampilkan <strong className="text-[#141e1b] dark:text-white">{filteredAndSorted.length}</strong> destinasi
                </span>
                {(searchQuery || selectedCategory !== 'Semua') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                    }}
                    className="text-[#8d4f00] dark:text-[#ffb875] font-semibold hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Grid Cards: Pure lightweight CSS transitions for ultra-smooth 60fps performance */}
              {filteredAndSorted.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredAndSorted.map((dest) => {
                    const isWishlisted = wishlistIds.includes(dest.id);
                    return (
                      <div
                        key={dest.id}
                        className="group bg-stone-50 dark:bg-[#1d2d28] rounded-2xl border border-stone-200/70 dark:border-[#283e37] overflow-hidden flex flex-col hover:border-[#396754]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                      >
                        {/* Image Header */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-stone-800">
                          <img
                            src={dest.imageUrl}
                            alt={dest.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                          {/* Category Badge (Solid dark badge, no laggy blur) */}
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-1 rounded-full bg-[#182C23]/90 text-white text-[10px] font-bold">
                              {dest.category}
                            </span>
                          </div>

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(dest.id);
                            }}
                            aria-label="Simpan destinasi"
                            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              isWishlisted
                                ? 'bg-white text-rose-600 shadow-sm'
                                : 'bg-black/60 text-white hover:bg-white hover:text-rose-600'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                          </button>

                          {/* Bottom Info on Image */}
                          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-medium">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-[#ffb875] fill-[#ffb875]" />
                              <span className="font-bold">{dest.rating}</span>
                              <span className="text-white/80">({dest.reviewCount})</span>
                            </div>
                            <span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">
                              {dest.duration} • {dest.tripType}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1 text-[#396754] dark:text-[#bbeed5] text-xs font-semibold mb-1">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{dest.province}, {dest.country}</span>
                            </div>
                            <h3 className="font-bold text-sm sm:text-base text-[#141e1b] dark:text-white line-clamp-1 group-hover:text-[#396754] dark:group-hover:text-[#bbeed5] transition-colors">
                              {dest.name}
                            </h3>
                            <p className="text-xs text-[#544435] dark:text-[#d1ddd8] mt-1 line-clamp-2 leading-relaxed">
                              {dest.shortDescription}
                            </p>
                          </div>

                          {/* Card Footer */}
                          <div className="pt-3 mt-3 border-t border-stone-200/50 dark:border-[#283e37] flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[9px] text-[#544435] dark:text-[#d1ddd8] block uppercase font-bold tracking-wider">
                                Tarif Mulai
                              </span>
                              <span className="text-sm font-extrabold text-[#8d4f00] dark:text-[#ffb875]">
                                {formatRupiah(dest.pricePerPerson)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleSelectCard(dest.id)}
                                className="px-3 py-1.5 rounded-lg bg-stone-200/80 dark:bg-[#283e37] hover:bg-[#396754] hover:text-white text-xs font-bold text-[#141e1b] dark:text-white transition-colors cursor-pointer"
                              >
                                Detail
                              </button>
                              <button
                                onClick={() => handleBookCard(dest)}
                                className="px-3 py-1.5 rounded-lg bg-[#182C23] hover:bg-[#396754] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>Pesan</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state */
                <div className="py-12 text-center space-y-2.5">
                  <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-[#1d2d28] flex items-center justify-center text-stone-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    Tidak Menemukan Destinasi
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Tidak ada petualangan yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#182C23] text-white text-xs font-semibold cursor-pointer"
                  >
                    Tampilkan Semua
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Footer Stats */}
            <div className="px-5 py-3 bg-stone-100 dark:bg-[#101916] border-t border-stone-200 dark:border-[#283e37] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 shrink-0">
              <span className="truncate">Standar Phinisi terverifikasi & ranger lokal berlisensi</span>
              <button
                onClick={onClose}
                className="font-bold text-[#8d4f00] dark:text-[#ffb875] hover:underline cursor-pointer shrink-0 ml-2"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
