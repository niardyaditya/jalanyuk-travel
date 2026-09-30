import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DESTINATIONS } from './data/destinations';
import { STORIES } from './data/stories';
import { Destination, Review, TravelStory } from './types/travel';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Home Components
import { HeroSlider } from './components/home/HeroSlider';
import { SearchBookingBar } from './components/home/SearchBookingBar';
import { ValueProps } from './components/home/ValueProps';
import { PopularDestinations } from './components/home/PopularDestinations';
import { StoriesAndGuides } from './components/home/StoriesAndGuides';
import { PromoBanner } from './components/home/PromoBanner';
import { StatsCounter } from './components/home/StatsCounter';

// Detail & Modal Components
import { DestinationDetail } from './components/detail/DestinationDetail';
import { TripCustomizerModal, BookingInitialConfig } from './components/customizer/TripCustomizerModal';
import { LightboxModal } from './components/modals/LightboxModal';
import { ReviewModal } from './components/modals/ReviewModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { StoryModal } from './components/modals/StoryModal';
import { ExperienceVideoModal } from './components/modals/ExperienceVideoModal';
import { AllDestinationsModal } from './components/modals/AllDestinationsModal';
import { Toast, ToastMessage } from './components/common/Toast';

export function JalanYukApp() {
  // Navigation & Destination State
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);

  // Search Filter State
  const [searchFilter, setSearchFilter] = useState({
    destination: '',
    date: '',
    duration: '',
    guests: ''
  });

  // Wishlist State (persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jalanyuk_wishlist');
      return saved ? JSON.parse(saved) : ['raja-ampat', 'labuan-bajo'];
    } catch {
      return ['raja-ampat', 'labuan-bajo'];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Booking & Customizer Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDestination, setBookingDestination] = useState<Destination>(DESTINATIONS[0]);
  const [appliedPromo, setAppliedPromo] = useState('JALANYUK25');
  const [bookingInitialConfig, setBookingInitialConfig] = useState<BookingInitialConfig | undefined>(undefined);

  // Video Experience Modal State
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const handleOpenVideo = (url: string, title?: string) => {
    setActiveVideo({
      url,
      title: title || 'Sinematik Ekspedisi Alam Nusantara — JalanYuk'
    });
  };

  // All Destinations Full Catalog Modal State
  const [isAllDestinationsOpen, setIsAllDestinationsOpen] = useState(false);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Story Reader Modal State
  const [activeStory, setActiveStory] = useState<TravelStory | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jalanyuk_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      const dest = destinations.find((d) => d.id === id);
      const name = dest ? dest.name : 'Destinasi';

      if (exists) {
        addToast('info', 'Dihapus dari Wishlist', `${name} dikeluarkan dari daftar impian Anda.`);
        return prev.filter((item) => item !== id);
      } else {
        addToast('success', 'Tersimpan di Wishlist!', `${name} ditambahkan ke daftar impian Anda.`);
        return [...prev, id];
      }
    });
  };

  // Wishlisted full objects
  const wishlistedDestinations = useMemo(() => {
    return destinations.filter((d) => wishlistIds.includes(d.id));
  }, [destinations, wishlistIds]);

  // Current active destination
  const activeDestination = useMemo(() => {
    if (!activeDestinationId) return null;
    return destinations.find((d) => d.id === activeDestinationId) || destinations[0];
  }, [activeDestinationId, destinations]);

  // Handle Search Submission from Hero Floating Console
  const handleSearchSubmit = (query: { destination: string; date: string; duration: string; guests: string }) => {
    setSearchFilter(query);

    // Scroll to destinations section
    if (activeDestinationId) {
      setActiveDestinationId(null);
    }

    setTimeout(() => {
      const el = document.getElementById('destinasi-populer') || document.getElementById('destinasi');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    addToast(
      'info',
      'Filter Diterapkan',
      query.destination
        ? `Menampilkan petualangan cocok untuk "${query.destination}"`
        : 'Menampilkan semua paket petualangan tersedia'
    );
  };

  // Open booking modal
  const handleOpenBooking = (dest: Destination, config?: BookingInitialConfig) => {
    setBookingDestination(dest);
    setBookingInitialConfig(config);
    setIsBookingOpen(true);
  };

  // Open Lightbox
  const handleOpenLightbox = (images: string[], index = 0, title = '') => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  // Share handler
  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: `${title} — Ekspedisi JalanYuk`,
        text: `Lihat petualangan luar biasa di ${title} bersama JalanYuk!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', 'Tautan Disalin!', 'Tautan perjalanan telah berhasil disalin ke papan klip.');
    }
  };

  // Promo claim
  const handleClaimPromo = (code: string) => {
    setAppliedPromo(code);
    navigator.clipboard.writeText(code);
    addToast(
      'success',
      'Voucher Disalin!',
      `Kode diskon "${code}" berhasil disalin dan siap digunakan saat kustomisasi trip.`
    );
  };

  // Booking success callback
  const handleSuccessBooking = (details: { code: string; total: number; pax: number }) => {
    addToast(
      'success',
      'Pemesanan Berhasil Terkonfirmasi!',
      `Kode Reservasi: #${details.code}. Total ${details.pax} Peserta: Rp ${details.total.toLocaleString('id-ID')}`
    );
  };

  // Add new review
  const handleAddReview = (newReviewData: Omit<Review, 'id'>) => {
    if (!activeDestination) return;

    const newReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`
    };

    setDestinations((prev) =>
      prev.map((d) => {
        if (d.id === activeDestination.id) {
          const updatedReviews = [newReview, ...d.reviews];
          const newAvgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...d,
            rating: newAvgRating,
            reviewCount: updatedReviews.length,
            reviews: updatedReviews
          };
        }
        return d;
      })
    );

    addToast('success', 'Ulasan Berhasil Dipublikasikan!', 'Terima kasih telah berbagi pengalaman perjalanan Anda.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm dark:bg-[#0c1410] text-stone-900 dark:text-stone-100 font-sans selection:bg-primary/20 selection:text-primary">
      {/* Top Sticky Navigation */}
      <Navbar
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateHome={() => {
          setActiveDestinationId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => {
          const el = document.getElementById('destinasi-populer');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomizer={() => {
          if (activeDestination) {
            handleOpenBooking(activeDestination);
          } else {
            handleOpenBooking(destinations[0]);
          }
        }}
        activeSection={activeDestination ? 'destinasi' : 'home'}
        onOpenAllDestinations={() => setIsAllDestinationsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeDestination ? (
          /* Detailed Destination View */
          <DestinationDetail
            destination={activeDestination}
            allDestinations={destinations}
            onBack={() => {
              setActiveDestinationId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectAlternative={(id) => {
              setActiveDestinationId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={(cfg) => handleOpenBooking(activeDestination, cfg)}
            onOpenLightbox={(idx) =>
              handleOpenLightbox(activeDestination.gallery.map((g) => g.url), idx, activeDestination.name)
            }
            onOpenReviewModal={() => setReviewModalOpen(true)}
            onOpenVideo={handleOpenVideo}
            isWishlisted={wishlistIds.includes(activeDestination.id)}
            onToggleWishlist={() => toggleWishlist(activeDestination.id)}
            onShare={() => handleShare(activeDestination.name)}
          />
        ) : (
          /* Homepage View */
          <>
            {/* Hero Slider with Slide Animations */}
            <HeroSlider
              onStartAdventure={() => {
                const el = document.getElementById('destinasi-populer') || document.getElementById('destinasi');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectDestination={(id: string) => {
                setActiveDestinationId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenVideoModal={handleOpenVideo}
            />

            {/* Floating Search & Booking Console */}
            <SearchBookingBar onSearchSubmit={handleSearchSubmit} />

            {/* 4 Pillars Value Proposition */}
            <ValueProps />

            {/* Curated Popular Destinations with Animated Filters */}
            <PopularDestinations
              destinations={destinations}
              onSelectDestination={(id: string) => {
                setActiveDestinationId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onOpenAllDestinations={() => setIsAllDestinationsOpen(true)}
            />

            {/* Holiday Promo Banner with Interactive Voucher */}
            <PromoBanner onClaimPromo={handleClaimPromo} />

            {/* Editorial Stories & Field Guides */}
            <StoriesAndGuides
              stories={STORIES}
              onReadStory={(story) => setActiveStory(story)}
            />

            {/* Live Stats Counter */}
            <StatsCounter />
          </>
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onSelectDestination={(id) => {
          setActiveDestinationId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => {
          setActiveDestinationId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAllDestinations={() => setIsAllDestinationsOpen(true)}
      />

      {/* Modals & Drawers */}
      <TripCustomizerModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        destination={bookingDestination}
        appliedPromo={appliedPromo}
        initialConfig={bookingInitialConfig}
        onSuccessBooking={handleSuccessBooking}
      />

      <ExperienceVideoModal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title}
      />

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        title={lightboxTitle}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        destinationName={activeDestination?.name || ''}
        onSubmitReview={handleAddReview}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedDestinations={wishlistedDestinations}
        onRemoveFromWishlist={toggleWishlist}
        onSelectDestination={(id) => {
          setActiveDestinationId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={(dest) => handleOpenBooking(dest)}
      />

      <StoryModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onShare={(title) => handleShare(title)}
      />

      {/* All Destinations Full Catalog Modal */}
      <AllDestinationsModal
        isOpen={isAllDestinationsOpen}
        onClose={() => setIsAllDestinationsOpen(false)}
        destinations={destinations}
        onSelectDestination={(id) => {
          setActiveDestinationId(id);
          setIsAllDestinationsOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={(dest) => {
          setIsAllDestinationsOpen(false);
          handleOpenBooking(dest);
        }}
        wishlistIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <JalanYukApp />
    </ThemeProvider>
  );
}
