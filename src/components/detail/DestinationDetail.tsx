import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Mountain, 
  Plane, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Camera,
  Compass,
  Leaf,
  Check
} from 'lucide-react';
import { Destination } from '../../types/travel';

export interface BookingInitialConfig {
  adultCount: number;
  childCount: number;
  selectedBatch: string;
  addonDrone: boolean;
  addonSuite: boolean;
}

interface DestinationDetailProps {
  destination: Destination;
  allDestinations: Destination[];
  onBack: () => void;
  onSelectAlternative: (id: string) => void;
  onOpenBooking: (config?: BookingInitialConfig) => void;
  onOpenLightbox: (index: number) => void;
  onOpenReviewModal: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onShare: () => void;
}

export const DestinationDetail: React.FC<DestinationDetailProps> = ({
  destination,
  allDestinations,
  onBack,
  onSelectAlternative,
  onOpenBooking,
  onOpenLightbox,
  onOpenReviewModal,
  isWishlisted,
  onToggleWishlist,
  onShare
}) => {
  // Booking Form State within Destination Page
  const [selectedBatch, setSelectedBatch] = useState('12 - 15 Maret 2025');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [addonDrone, setAddonDrone] = useState(false);
  const [addonSuite, setAddonSuite] = useState(false);

  // FAQ open states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Price Calculation
  const basePrice = destination.pricePerPerson;
  const dronePrice = addonDrone ? 750000 : 0;
  const suiteUpgradePrice = addonSuite ? 1200000 : 0;
  const holidayDiscount = 500000;
  const subtotal = (basePrice * adultCount) + (basePrice * 0.7 * childCount) + dronePrice + suiteUpgradePrice;
  const total = Math.max(0, subtotal - holidayDiscount);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const alternatives = allDestinations.filter((d) => 
    destination.alternativeDestinations.includes(d.id)
  );

  return (
    <div className="w-full pb-24 md:pb-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#396754] dark:text-[#bbeed5] hover:text-[#182C23] dark:hover:text-white transition-colors cursor-pointer self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Destinasi</span>
          </button>

          {/* Social & Save Triggers */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={onShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dac2af]/40 dark:border-[#283e37] bg-white dark:bg-[#1d2d28] hover:bg-[#ebf6f1] dark:hover:bg-[#253831] text-xs font-semibold text-[#141e1b] dark:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
              <span>Bagikan</span>
            </button>

            <button
              onClick={onToggleWishlist}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dac2af]/40 dark:border-[#283e37] transition-all cursor-pointer active:scale-95 shadow-sm text-xs font-semibold ${
                isWishlisted
                  ? 'bg-[#ba1a1a] text-white border-transparent'
                  : 'bg-white dark:bg-[#1d2d28] hover:bg-[#ebf6f1] dark:hover:bg-[#253831] text-[#141e1b] dark:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : 'text-[#ba1a1a]'}`} />
              <span>{isWishlisted ? 'Tersimpan' : 'Simpan'}</span>
            </button>
          </div>
        </div>

        {/* Destination Header Title & Badges */}
        <div className="mb-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#bbeed5] text-[#182C23] text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-[#182C23]" />
              Eco-Certified
            </span>
            <span className="px-3 py-1 rounded-full bg-[#e5f0eb] dark:bg-[#253831] text-[#141e1b] dark:text-white text-xs font-semibold">
              {destination.duration} • {destination.tripType}
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-[#1d2d28] border border-[#dac2af]/40 dark:border-[#283e37] text-xs font-bold text-[#141e1b] dark:text-white inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#f39223] fill-[#f39223]" />
              <span>{destination.rating}</span>
              <span className="text-[#877363] dark:text-[#d1ddd8] font-normal">({destination.reviewCount} ulasan)</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#141e1b] dark:text-white tracking-tight leading-tight">
            {destination.titleTag}
          </h1>

          <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] flex items-center gap-1.5 pt-1">
            <span>{destination.location}, {destination.province} • Pelabuhan Keberangkatan: Marina Sorong</span>
          </p>
        </div>

        {/* Bento Gallery Showcase */}
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3.5 h-[360px] sm:h-[440px] md:h-[500px] rounded-3xl overflow-hidden card-shadow border border-[#dac2af]/30 dark:border-[#283e37]">
            
            {/* Primary Main Photo (Spans 2 cols, 2 rows) */}
            <div 
              onClick={() => onOpenLightbox(0)}
              className="relative md:col-span-2 md:row-span-2 group overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer"
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#182C23]/90 backdrop-blur-md text-[#141e1b] dark:text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
                  Spot Ikonik Pianemo Geosite
                </span>
              </div>
            </div>

            {/* Thumbnail 1 */}
            <div 
              onClick={() => onOpenLightbox(1)}
              className="relative group overflow-hidden bg-slate-200 dark:bg-slate-800 hidden md:block cursor-pointer"
            >
              <img
                src={destination.gallery[1]?.url || destination.imageUrl}
                alt="Misool Coral"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur-sm text-[#141e1b] dark:text-white text-[11px] font-bold">
                Misool Coral Sanctuary
              </span>
            </div>

            {/* Thumbnail 2 */}
            <div 
              onClick={() => onOpenLightbox(2)}
              className="relative group overflow-hidden bg-slate-200 dark:bg-slate-800 hidden md:block cursor-pointer"
            >
              <img
                src={destination.gallery[2]?.url || destination.imageUrl}
                alt="Liveaboard Phinisi Deck"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur-sm text-[#141e1b] dark:text-white text-[11px] font-bold">
                Liveaboard Phinisi Deck
              </span>
            </div>

            {/* Thumbnail 3 */}
            <div 
              onClick={() => onOpenLightbox(3)}
              className="relative group overflow-hidden bg-slate-200 dark:bg-slate-800 hidden md:block cursor-pointer"
            >
              <img
                src={destination.gallery[3]?.url || destination.imageUrl}
                alt="Water Villa"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur-sm text-[#141e1b] dark:text-white text-[11px] font-bold">
                Water Villa Sauwandarek
              </span>
            </div>

            {/* Thumbnail 4 with view all overlay */}
            <div 
              onClick={() => onOpenLightbox(0)}
              className="relative group overflow-hidden bg-slate-200 dark:bg-slate-800 hidden md:block cursor-pointer"
            >
              <img
                src={destination.gallery[4]?.url || destination.imageUrl}
                alt="Sunset Deck"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-full bg-white/95 dark:bg-[#182C23]/95 backdrop-blur-md text-[#141e1b] dark:text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#f39223]" />
                  <span>Lihat Semua Foto ({destination.gallery.length})</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 2-Column Architecture: Details (Left 8 cols) & Sticky Booking Console (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Narrative & Itinerary (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Quick Specs Bar */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] card-shadow grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bbeed5] dark:bg-[#396754]/40 text-[#182C23] dark:text-[#bbeed5] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#877363] dark:text-[#d1ddd8] uppercase tracking-wider">Durasi</p>
                  <p className="text-sm font-bold text-[#141e1b] dark:text-white">{destination.specs.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bbeed5] dark:bg-[#396754]/40 text-[#182C23] dark:text-[#bbeed5] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#877363] dark:text-[#d1ddd8] uppercase tracking-wider">Grup</p>
                  <p className="text-sm font-bold text-[#141e1b] dark:text-white">{destination.specs.groupSize}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bbeed5] dark:bg-[#396754]/40 text-[#182C23] dark:text-[#bbeed5] flex items-center justify-center shrink-0">
                  <Mountain className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#877363] dark:text-[#d1ddd8] uppercase tracking-wider">Kesulitan</p>
                  <p className="text-sm font-bold text-[#141e1b] dark:text-white">{destination.specs.difficulty}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bbeed5] dark:bg-[#396754]/40 text-[#182C23] dark:text-[#bbeed5] flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#877363] dark:text-[#d1ddd8] uppercase tracking-wider">Titik Kumpul</p>
                  <p className="text-sm font-bold text-[#141e1b] dark:text-white">{destination.specs.meetingPoint}</p>
                </div>
              </div>
            </div>

            {/* Ringkasan Pengalaman */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-[#396754] dark:text-[#bbeed5]">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">RINGKASAN PENGALAMAN</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#141e1b] dark:text-white tracking-tight">
                Jelajahi Surga Bawah Laut dan Megahnya Karst Purba Papua
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-[#544435] dark:text-[#d1ddd8] leading-relaxed font-normal">
                {destination.narrativeOverview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Mengapa Memilih Ekspedisi Ini? */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#141e1b] dark:text-white">
                Mengapa Memilih Ekspedisi Ini?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.advantages.map((adv) => (
                  <div 
                    key={adv.title}
                    className="p-5 rounded-2xl bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] card-shadow flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#bbeed5]/50 dark:bg-[#396754]/30 text-[#396754] dark:text-[#bbeed5] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#141e1b] dark:text-white mb-1">
                        {adv.title}
                      </h4>
                      <p className="text-xs text-[#544435] dark:text-[#d1ddd8] leading-relaxed">
                        {adv.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Rencana Perjalanan Harian (Itinerary Timeline) */}
            <section className="space-y-6" id="itinerary">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                    Rencana Perjalanan Harian
                  </h3>
                  <p className="text-xs sm:text-sm text-[#877363] dark:text-[#d1ddd8]">
                    Rute terkurasi 4 hari penuh petualangan di laut dan daratan Raja Ampat.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5] bg-[#bbeed5]/40 dark:bg-[#396754]/40 px-3 py-1 rounded-full">
                  4 Hari • 3 Malam
                </span>
              </div>

              {/* Day-by-Day Journal Stamp Timeline */}
              <div className="space-y-6">
                {destination.itinerary.map((day) => (
                  <div 
                    key={day.day}
                    className="bg-white dark:bg-[#1d2d28] rounded-2xl sm:rounded-3xl border border-[#dac2af]/30 dark:border-[#283e37] p-5 sm:p-6 card-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      {/* Photo Stamp Thumbnail if available */}
                      {day.photoStamp && (
                        <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
                          <img 
                            src={day.photoStamp} 
                            alt={day.title} 
                            loading="lazy" 
                            decoding="async" 
                            className="w-full h-full object-cover" 
                          />
                          {day.stampLabel && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 dark:bg-black/70 text-[10px] font-bold text-[#141e1b] dark:text-white backdrop-blur-xs">
                              {day.stampLabel}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Itinerary Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#ffdcc0] dark:bg-[#5e3300] text-[#8d4f00] dark:text-[#ffb875] font-extrabold text-[11px] uppercase tracking-wider">
                            HARI 0{day.day}
                          </span>
                          <span className="text-xs text-[#877363] dark:text-[#d1ddd8] flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {day.timeRange}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white">
                          {day.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] leading-relaxed">
                          {day.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {day.highlights.map((h, i) => (
                            <span 
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-[#ebf6f1] dark:bg-[#253831] text-[11px] font-medium text-[#141e1b] dark:text-[#ebf6f1]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Kelengkapan Fasilitas (Included vs Excluded) */}
            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                Kelengkapan Fasilitas Ekspedisi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#1d2d28] border border-[#396754]/30 dark:border-[#396754]/50 card-shadow">
                  <div className="flex items-center gap-2 mb-4 text-[#396754] dark:text-[#bbeed5]">
                    <CheckCircle2 className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />
                    <h4 className="text-base font-bold text-[#141e1b] dark:text-white">Termasuk Dalam Paket</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8]">
                    {destination.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#396754] dark:text-[#bbeed5] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] card-shadow">
                  <div className="flex items-center gap-2 mb-4 text-[#877363]">
                    <XCircle className="w-5 h-5 text-[#877363]" />
                    <h4 className="text-base font-bold text-[#141e1b] dark:text-white">Tidak Termasuk</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8]">
                    {destination.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#877363] text-sm shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Ulasan Traveler Terverifikasi */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                    Ulasan Traveler Terverifikasi
                  </h3>
                  <p className="text-xs sm:text-sm text-[#877363] dark:text-[#d1ddd8]">
                    Berdasarkan {destination.reviewCount} testimoni tamu yang telah menuntaskan perjalanan.
                  </p>
                </div>

                <button
                  onClick={onOpenReviewModal}
                  className="px-4 py-2 rounded-full border border-[#396754] text-[#396754] dark:text-[#bbeed5] dark:border-[#bbeed5] text-xs font-bold hover:bg-[#396754] hover:text-white dark:hover:bg-[#bbeed5] dark:hover:text-[#182C23] transition-colors cursor-pointer self-start sm:self-auto active:scale-95"
                >
                  Tulis Pengalaman Anda
                </button>
              </div>

              {/* Overall Breakdown Score */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] card-shadow flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="text-center sm:border-r sm:border-[#dac2af]/30 dark:sm:border-[#283e37] sm:pr-8 shrink-0">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#141e1b] dark:text-white leading-none">
                    {destination.rating}
                  </span>
                  <div className="flex items-center justify-center gap-1 text-[#f39223] my-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f39223]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#877363] dark:text-[#d1ddd8] font-bold">98% Sangat Puas</p>
                </div>

                {/* Rating category bars */}
                <div className="w-full space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-[#877363] dark:text-[#d1ddd8]">Layanan</span>
                    <div className="flex-1 bg-[#ebf6f1] dark:bg-[#253831] rounded-full h-2">
                      <div className="bg-[#396754] dark:bg-[#bbeed5] h-2 rounded-full w-[96%]" />
                    </div>
                    <span className="font-bold text-[#141e1b] dark:text-white">4.9</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-[#877363] dark:text-[#d1ddd8]">Pemandu</span>
                    <div className="flex-1 bg-[#ebf6f1] dark:bg-[#253831] rounded-full h-2">
                      <div className="bg-[#396754] dark:bg-[#bbeed5] h-2 rounded-full w-[99%]" />
                    </div>
                    <span className="font-bold text-[#141e1b] dark:text-white">5.0</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-[#877363] dark:text-[#d1ddd8]">Makanan</span>
                    <div className="flex-1 bg-[#ebf6f1] dark:bg-[#253831] rounded-full h-2">
                      <div className="bg-[#396754] dark:bg-[#bbeed5] h-2 rounded-full w-[95%]" />
                    </div>
                    <span className="font-bold text-[#141e1b] dark:text-white">4.8</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-[#877363] dark:text-[#d1ddd8]">Kebersihan</span>
                    <div className="flex-1 bg-[#ebf6f1] dark:bg-[#253831] rounded-full h-2">
                      <div className="bg-[#396754] dark:bg-[#bbeed5] h-2 rounded-full w-[94%]" />
                    </div>
                    <span className="font-bold text-[#141e1b] dark:text-white">4.8</span>
                  </div>
                </div>
              </div>

              {/* Review Item Cards */}
              <div className="space-y-4">
                {destination.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] space-y-3 card-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#bbeed5] text-[#182C23] font-bold flex items-center justify-center text-xs">
                          {rev.author.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-[#141e1b] dark:text-white">
                            {rev.author}
                          </h5>
                          <p className="text-[11px] text-[#877363] dark:text-[#d1ddd8]">
                            {rev.city} • Berangkat {rev.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-[#f39223]">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-[#f39223]" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] leading-relaxed">
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#877363] dark:text-[#d1ddd8] pt-1">
                      <span className="flex items-center gap-1 text-[#396754] dark:text-[#bbeed5] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Traveler Terverifikasi
                      </span>
                      <span>• Membantu ({rev.helpfulCount} orang)</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Destination FAQs */}
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                Pertanyaan Seputar Perjalanan ke {destination.name}
              </h3>

              <div className="space-y-3">
                {destination.faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-[#1d2d28] rounded-2xl border border-[#dac2af]/30 dark:border-[#283e37] overflow-hidden card-shadow"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#141e1b] dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#396754] dark:text-[#bbeed5] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] leading-relaxed border-t border-[#dac2af]/20 dark:border-[#283e37]"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Reservation Console (4 cols) */}
          <aside className="lg:col-span-4 w-full">
            <div className="sticky top-28 bg-white dark:bg-[#1d2d28] p-6 rounded-3xl border border-[#dac2af]/40 dark:border-[#283e37] shadow-xl space-y-5">
              
              {/* Price Header */}
              <div className="border-b border-[#dac2af]/30 dark:border-[#283e37] pb-4">
                <span className="text-[11px] font-bold text-[#877363] dark:text-[#d1ddd8] uppercase tracking-wider block mb-1">
                  Mulai Dari
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#141e1b] dark:text-white tracking-tight">
                    {formatRupiah(destination.pricePerPerson)}
                  </span>
                  <span className="text-xs text-[#877363] dark:text-[#d1ddd8]">/ orang</span>
                </div>
                <p className="text-xs text-[#396754] dark:text-[#bbeed5] font-semibold flex items-center gap-1 mt-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Jaminan Harga Terbaik & Transparan
                </p>
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                
                {/* Date Batch */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#141e1b] dark:text-white flex justify-between">
                    <span>Pilih Tanggal Keberangkatan</span>
                    <span className="text-[#f39223] text-[11px]">Tersedia 4 Slot</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="w-full bg-[#ebf6f1] dark:bg-[#253831] border border-[#dac2af]/50 dark:border-[#283e37] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#141e1b] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396754]/40 transition-all cursor-pointer appearance-none"
                    >
                      <option value="12 - 15 Maret 2025">12 - 15 Maret 2025 (Open Trip • 4 Slot)</option>
                      <option value="26 - 29 Maret 2025">26 - 29 Maret 2025 (Open Trip • 6 Slot)</option>
                      <option value="09 - 12 April 2025">09 - 12 April 2025 (Libur Lebaran • 2 Slot)</option>
                      <option value="23 - 26 April 2025">23 - 26 April 2025 (Open Trip • 8 Slot)</option>
                    </select>
                    <Calendar className="w-4 h-4 absolute right-3.5 top-3 text-[#877363] pointer-events-none" />
                  </div>
                </div>

                {/* Travelers Counter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#141e1b] dark:text-white">
                    Jumlah Traveler
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Adult counter */}
                    <div className="p-3 bg-[#ebf6f1] dark:bg-[#253831] rounded-xl border border-[#dac2af]/40 dark:border-[#283e37] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#141e1b] dark:text-white">Dewasa</p>
                        <p className="text-[10px] text-[#877363] dark:text-[#d1ddd8]">12+ tahun</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                          className="w-7 h-7 rounded-full bg-white dark:bg-[#1d2d28] border border-[#dac2af]/50 dark:border-[#283e37] flex items-center justify-center font-bold text-xs hover:bg-[#ebf6f1] active:scale-95 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#141e1b] dark:text-white w-4 text-center">
                          {adultCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdultCount(adultCount + 1)}
                          className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center font-bold text-xs hover:bg-[#182C23] active:scale-95 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Child counter */}
                    <div className="p-3 bg-[#ebf6f1] dark:bg-[#253831] rounded-xl border border-[#dac2af]/40 dark:border-[#283e37] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#141e1b] dark:text-white">Anak</p>
                        <p className="text-[10px] text-[#877363] dark:text-[#d1ddd8]">3-11 tahun</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildCount(Math.max(0, childCount - 1))}
                          className="w-7 h-7 rounded-full bg-white dark:bg-[#1d2d28] border border-[#dac2af]/50 dark:border-[#283e37] flex items-center justify-center font-bold text-xs hover:bg-[#ebf6f1] active:scale-95 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#141e1b] dark:text-white w-4 text-center">
                          {childCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildCount(childCount + 1)}
                          className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center font-bold text-xs hover:bg-[#182C23] active:scale-95 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-2 pt-2 border-t border-[#dac2af]/30 dark:border-[#283e37]">
                  <label className="text-xs font-bold text-[#141e1b] dark:text-white">
                    Layanan Tambahan (Opsional)
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-[#dac2af]/30 dark:border-[#283e37] bg-white dark:bg-[#1d2d28] hover:bg-[#ebf6f1] dark:hover:bg-[#253831] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addonDrone}
                      onChange={(e) => setAddonDrone(e.target.checked)}
                      className="mt-0.5 rounded text-[#f39223] focus:ring-[#f39223]"
                    />
                    <div className="text-xs leading-snug">
                      <span className="font-bold text-[#141e1b] dark:text-white block">Dokumentasi Drone & Video 4K</span>
                      <span className="text-[#877363] dark:text-[#d1ddd8]">+Rp 750.000 / paket</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-[#dac2af]/30 dark:border-[#283e37] bg-white dark:bg-[#1d2d28] hover:bg-[#ebf6f1] dark:hover:bg-[#253831] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addonSuite}
                      onChange={(e) => setAddonSuite(e.target.checked)}
                      className="mt-0.5 rounded text-[#f39223] focus:ring-[#f39223]"
                    />
                    <div className="text-xs leading-snug">
                      <span className="font-bold text-[#141e1b] dark:text-white block">Upgrade Kamar Private Suite Balcony</span>
                      <span className="text-[#877363] dark:text-[#d1ddd8]">+Rp 1.200.000 / malam</span>
                    </div>
                  </label>
                </div>

                {/* Price Breakdown */}
                <div className="bg-[#ebf6f1] dark:bg-[#253831] p-3.5 rounded-xl space-y-1.5 text-xs border border-[#dac2af]/20 dark:border-[#283e37]">
                  <div className="flex justify-between text-[#544435] dark:text-[#d1ddd8]">
                    <span>Paket Dewasa ({adultCount}x)</span>
                    <span>{formatRupiah(basePrice * adultCount)}</span>
                  </div>
                  {childCount > 0 && (
                    <div className="flex justify-between text-[#544435] dark:text-[#d1ddd8]">
                      <span>Paket Anak ({childCount}x)</span>
                      <span>{formatRupiah(basePrice * 0.7 * childCount)}</span>
                    </div>
                  )}
                  {addonDrone && (
                    <div className="flex justify-between text-[#544435] dark:text-[#d1ddd8]">
                      <span>Drone & Video 4K</span>
                      <span>+Rp 750.000</span>
                    </div>
                  )}
                  {addonSuite && (
                    <div className="flex justify-between text-[#544435] dark:text-[#d1ddd8]">
                      <span>Upgrade Private Suite</span>
                      <span>+Rp 1.200.000</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#ba1a1a] font-medium">
                    <span>Diskon Musim Liburan</span>
                    <span>-{formatRupiah(holidayDiscount)}</span>
                  </div>
                  <div className="border-t border-[#dac2af]/30 dark:border-[#283e37] pt-2 flex justify-between text-sm sm:text-base font-extrabold text-[#141e1b] dark:text-white">
                    <span>Total Biaya</span>
                    <span className="text-[#f39223]">{formatRupiah(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => onOpenBooking({
                      adultCount,
                      childCount,
                      selectedBatch,
                      addonDrone,
                      addonSuite
                    })}
                    className="w-full py-3.5 rounded-full bg-[#f39223] text-white text-sm font-bold shadow-lg cta-glow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Pesan Petualangan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-full border border-[#396754] text-[#396754] dark:text-[#bbeed5] dark:border-[#bbeed5] text-xs font-bold hover:bg-[#396754]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Tanya Tim Konsierge via WhatsApp</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-[#dac2af]/30 dark:border-[#283e37] pt-3 space-y-2 text-[11px] text-[#877363] dark:text-[#d1ddd8]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
                    <span>Pembayaran Aman Terenkripsi 256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
                    <span>100% Garansi Pengalihan Jadwal Cuaca Buruk</span>
                  </div>
                </div>

              </div>

            </div>
          </aside>

        </div>

        {/* Alternative Recommended Expeditions */}
        {alternatives.length > 0 && (
          <section className="mt-20 pt-8 border-t border-[#dac2af]/30 dark:border-[#283e37] space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5] uppercase tracking-wider">
                  JELAJAHI LEBIH JAUH
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                  Pilihan Alternatif Petualangan Alam
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => onSelectAlternative(alt.id)}
                  className="bg-white dark:bg-[#1d2d28] rounded-2xl border border-[#dac2af]/30 dark:border-[#283e37] overflow-hidden card-shadow hover:card-shadow-hover transition-all group cursor-pointer"
                >
                  <div className="h-44 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                    <img
                      src={alt.imageUrl}
                      alt={alt.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#182C23]/90 backdrop-blur-md text-[#182C23] dark:text-white text-[11px] font-bold">
                      {alt.duration} • {alt.tripType}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm sm:text-base font-bold text-[#141e1b] dark:text-white group-hover:text-[#396754] dark:group-hover:text-[#bbeed5] transition-colors line-clamp-1">
                      {alt.name}
                    </h4>
                    <p className="text-xs text-[#544435] dark:text-[#d1ddd8] line-clamp-2">
                      {alt.shortDescription}
                    </p>
                    <div className="pt-2 border-t border-[#dac2af]/20 dark:border-[#283e37] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#877363] block">Mulai</span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#f39223]">
                          {formatRupiah(alt.pricePerPerson)}
                        </span>
                      </div>
                      <span className="text-[#396754] dark:text-[#bbeed5] text-xs font-bold flex items-center gap-0.5">
                        Detail <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
