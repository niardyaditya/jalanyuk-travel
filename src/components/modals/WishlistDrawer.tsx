import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ArrowRight, Star, MapPin } from 'lucide-react';
import { Destination } from '../../types/travel';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedDestinations: Destination[];
  onRemoveFromWishlist: (id: string) => void;
  onSelectDestination: (id: string) => void;
  onOpenBooking: (dest: Destination) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedDestinations,
  onRemoveFromWishlist,
  onSelectDestination,
  onOpenBooking
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-surface dark:bg-surface-dark border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      Wishlist Destinasi Impian
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {wishlistedDestinations.length} petualangan tersimpan
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlistedDestinations.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-stone-800 text-stone-400 mx-auto flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-1">
                      Belum Ada Destinasi Disimpan
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                      Klik ikon hati pada kartu ekspedisi untuk menyimpan destinasi impian Anda dan membandingkan rute terbaik.
                    </p>
                  </div>
                ) : (
                  wishlistedDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="group relative flex gap-4 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-primary/50 transition-all shadow-xs"
                    >
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-24 h-24 rounded-xl object-cover shrink-0 cursor-pointer"
                        onClick={() => {
                          onSelectDestination(dest.id);
                          onClose();
                        }}
                        loading="lazy"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                              {dest.category}
                            </span>
                            <button
                              onClick={() => onRemoveFromWishlist(dest.id)}
                              className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                              title="Hapus dari wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4
                            onClick={() => {
                              onSelectDestination(dest.id);
                              onClose();
                            }}
                            className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate cursor-pointer hover:text-primary transition-colors"
                          >
                            {dest.name}
                          </h4>

                          <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                            <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {dest.rating}
                            </span>
                            <span>•</span>
                            <span className="truncate">{dest.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-700/40">
                          <div>
                            <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Mulai dari</span>
                            <span className="text-xs font-bold text-primary">
                              Rp {dest.pricePerPerson.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              onOpenBooking(dest);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                          >
                            <span>Pesan</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Actions */}
              {wishlistedDestinations.length > 0 && (
                <div className="p-6 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 mb-4">
                    <span>Total Estimasi Budget:</span>
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      Rp{' '}
                      {wishlistedDestinations
                        .reduce((sum, d) => sum + d.pricePerPerson, 0)
                        .toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (wishlistedDestinations[0]) {
                        onOpenBooking(wishlistedDestinations[0]);
                        onClose();
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Rencanakan Perjalanan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
