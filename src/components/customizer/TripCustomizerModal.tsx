import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Users, 
  Ship, 
  Bed, 
  Sparkles, 
  Camera, 
  Waves, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Receipt,
  Check
} from 'lucide-react';
import { Destination } from '../../types/travel';

interface TripCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
  appliedPromo?: string;
  onSuccessBooking: (details: { code: string; total: number; pax: number }) => void;
}

export const TripCustomizerModal: React.FC<TripCustomizerModalProps> = ({
  isOpen,
  onClose,
  destination,
  appliedPromo = 'JALANYUK25',
  onSuccessBooking
}) => {
  const [tripFormat, setTripFormat] = useState<'open' | 'private'>('open');
  const [selectedBatch, setSelectedBatch] = useState('06 - 11 Nov 2025');
  const [cabinType, setCabinType] = useState<'deluxe' | 'suite'>('suite');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [addonDrone, setAddonDrone] = useState(true);
  const [addonScuba, setAddonScuba] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState(appliedPromo);
  const [voucherApplied, setVoucherApplied] = useState(true);
  const [paymentMode, setPaymentMode] = useState<'dp' | 'full'>('dp');

  // Math Calculations
  const baseRate = tripFormat === 'open' 
    ? (destination.pricePerPerson * 2.48) // multi-day comprehensive liveaboard rate
    : 98000000;

  const paxTotalBase = tripFormat === 'open'
    ? (baseRate * adultCount) + (baseRate * 0.65 * childCount)
    : baseRate;

  const suiteUpgradeFee = cabinType === 'suite' ? 2500000 : 0;
  const droneFee = addonDrone ? 1200000 : 0;
  const scubaFee = addonScuba ? 2800000 : 0;
  const pinBludFee = tripFormat === 'open' ? (500000 * adultCount) : 1000000;

  const discountAmount = voucherApplied ? (paxTotalBase * 0.1) : 0;
  const grandTotal = Math.max(0, paxTotalBase + suiteUpgradeFee + droneFee + scubaFee + pinBludFee - discountAmount);
  const dpAmount = grandTotal * 0.3;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleApplyVoucher = () => {
    if (promoCodeInput.trim().toUpperCase() === 'JALANYUK25' || promoCodeInput.trim().toUpperCase() === 'JALANYUK10') {
      setVoucherApplied(true);
    } else {
      setVoucherApplied(false);
    }
  };

  const handleCompleteOrder = () => {
    const bookingCode = `JY-${Math.floor(100000 + Math.random() * 900000)}`;
    onSuccessBooking({
      code: bookingCode,
      total: paymentMode === 'dp' ? dpAmount : grandTotal,
      pax: adultCount + childCount
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white dark:bg-[#172420] rounded-3xl shadow-2xl border border-[#dac2af]/40 dark:border-[#283e37] overflow-hidden my-8 max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#dac2af]/30 dark:border-[#283e37] flex items-center justify-between bg-[#f1fcf7] dark:bg-[#141e1b] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#396754] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#396754] dark:text-[#bbeed5]">
                INTERACTIVE BOOKING ENGINE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
              Bangun & Kustomisasi Petualangan Anda
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup kustomisasi"
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] flex items-center justify-center text-[#544435] dark:text-[#d1ddd8] hover:text-[#141e1b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 3 Stepper Choices (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: Pilih Format Perjalanan */}
              <div className="bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] rounded-2xl p-5 sm:p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center text-xs font-bold">1</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white">
                      Pilih Format Perjalanan
                    </h3>
                  </div>
                  <span className="text-xs text-[#396754] dark:text-[#bbeed5] font-semibold">Tipe Ekspedisi</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Open Trip */}
                  <label 
                    onClick={() => setTripFormat('open')}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col justify-between transition-all relative ${
                      tripFormat === 'open'
                        ? 'border-[#396754] bg-[#ebf6f1]/60 dark:bg-[#253831]/60'
                        : 'border-[#dac2af]/30 dark:border-[#283e37] bg-white dark:bg-[#1d2d28]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />
                          <span className="text-sm font-bold text-[#141e1b] dark:text-white">Open Trip Phinisi</span>
                        </div>
                        {tripFormat === 'open' && <CheckCircle2 className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />}
                      </div>
                      <p className="text-xs text-[#544435] dark:text-[#d1ddd8] mb-3 leading-relaxed">
                        Berlayar bersama sesama penjelajah. Kuota maksimal 12 orang per kapal untuk menjaga kenyamanan.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#dac2af]/20 dark:border-[#283e37] flex items-baseline justify-between text-xs">
                      <span className="text-[#877363]">Mulai dari</span>
                      <span className="font-extrabold text-[#396754] dark:text-[#bbeed5] text-sm">Rp 14.500.000<span className="text-[10px] font-normal text-[#877363]">/org</span></span>
                    </div>
                  </label>

                  {/* Private Charter */}
                  <label 
                    onClick={() => setTripFormat('private')}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col justify-between transition-all relative ${
                      tripFormat === 'private'
                        ? 'border-[#396754] bg-[#ebf6f1]/60 dark:bg-[#253831]/60'
                        : 'border-[#dac2af]/30 dark:border-[#283e37] bg-white dark:bg-[#1d2d28]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <Ship className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />
                          <span className="text-sm font-bold text-[#141e1b] dark:text-white">Private Charter</span>
                        </div>
                        {tripFormat === 'private' && <CheckCircle2 className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />}
                      </div>
                      <p className="text-xs text-[#544435] dark:text-[#d1ddd8] mb-3 leading-relaxed">
                        Sewa 1 kapal utuh secara eksklusif untuk keluarga atau komunitas. Rute dan jadwal fleksibel.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#dac2af]/20 dark:border-[#283e37] flex items-baseline justify-between text-xs">
                      <span className="text-[#877363]">Mulai dari</span>
                      <span className="font-extrabold text-[#396754] dark:text-[#bbeed5] text-sm">Rp 98.000.000<span className="text-[10px] font-normal text-[#877363]">/kapal</span></span>
                    </div>
                  </label>
                </div>
              </div>

              {/* STEP 2: Jadwal Keberangkatan & Kuota */}
              <div className="bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] rounded-2xl p-5 sm:p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center text-xs font-bold">2</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white">
                      Jadwal Keberangkatan & Kuota
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5]">Bulan: November 2025</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  {[
                    { batch: '06 - 11 Nov 2025', seats: 'Sisa 3 Kursi', ship: 'KM Phinisi Al-Bahr', price: 'Rp 14.500.000' },
                    { batch: '15 - 20 Nov 2025', seats: 'Sisa 6 Kursi', ship: 'KM Phinisi Al-Bahr', price: 'Rp 14.500.000' },
                    { batch: '24 - 29 Nov 2025', seats: 'Sisa 8 Kursi', ship: 'KM Phinisi Raja Ocean', price: 'Rp 14.800.000' },
                  ].map((item) => (
                    <div
                      key={item.batch}
                      onClick={() => setSelectedBatch(item.batch)}
                      className={`border-2 rounded-xl p-3.5 cursor-pointer transition-all ${
                        selectedBatch === item.batch
                          ? 'border-[#396754] bg-[#ebf6f1]/60 dark:bg-[#253831]/60'
                          : 'border-[#dac2af]/30 dark:border-[#283e37] bg-white dark:bg-[#1d2d28]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#141e1b] dark:text-white">{item.batch.split(' ')[0]} - {item.batch.split(' ')[2]} Nov</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#bbeed5] text-[#182C23]">
                          {item.seats}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#877363] dark:text-[#d1ddd8]">{item.ship}</p>
                      <p className="text-xs font-extrabold text-[#396754] dark:text-[#bbeed5] mt-1.5">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 3: Kabin & Peserta & Add-Ons */}
              <div className="bg-white dark:bg-[#1d2d28] border border-[#dac2af]/30 dark:border-[#283e37] rounded-2xl p-5 sm:p-6 card-shadow space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center text-xs font-bold">3</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white">
                      Kabin & Jumlah Peserta
                    </h3>
                  </div>
                  <span className="text-xs text-[#396754] dark:text-[#bbeed5] font-semibold">Kenyamanan Berlayar</span>
                </div>

                {/* Cabin Selection */}
                <div className="space-y-2.5">
                  <label 
                    onClick={() => setCabinType('suite')}
                    className={`border-2 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                      cabinType === 'suite'
                        ? 'border-[#396754] bg-[#ebf6f1]/50 dark:bg-[#253831]/50'
                        : 'border-[#dac2af]/30 dark:border-[#283e37]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#396754] dark:text-[#bbeed5] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#141e1b] dark:text-white">
                          Upper Deck Balcony Suite
                        </h4>
                        <p className="text-[11px] text-[#544435] dark:text-[#d1ddd8]">
                          Kamar luas deck atas, private balcony 180° laut, king bed, ensuite bathroom AC.
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-3">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#396754] text-white rounded">
                        {cabinType === 'suite' ? 'Terpilih' : 'Pilih'}
                      </span>
                      <p className="text-xs font-bold text-[#396754] dark:text-[#bbeed5] mt-1">+Rp 2.500.000</p>
                    </div>
                  </label>

                  <label 
                    onClick={() => setCabinType('deluxe')}
                    className={`border-2 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                      cabinType === 'deluxe'
                        ? 'border-[#396754] bg-[#ebf6f1]/50 dark:bg-[#253831]/50'
                        : 'border-[#dac2af]/30 dark:border-[#283e37]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Bed className="w-5 h-5 text-[#877363] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#141e1b] dark:text-white">
                          Main Deck Deluxe Cabin
                        </h4>
                        <p className="text-[11px] text-[#544435] dark:text-[#d1ddd8]">
                          Jendela ocean view, twin / double bed, AC 24 jam, kamar mandi dalam.
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-3">
                      <span className="text-[11px] text-[#877363]">Standar Paket</span>
                      <p className="text-xs font-bold text-[#141e1b] dark:text-white mt-1">Termasuk</p>
                    </div>
                  </label>
                </div>

                {/* Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#dac2af]/20 dark:border-[#283e37]">
                  <div className="flex items-center justify-between p-3 bg-[#ebf6f1] dark:bg-[#253831] rounded-xl">
                    <div>
                      <div className="text-xs font-bold text-[#141e1b] dark:text-white">Dewasa</div>
                      <div className="text-[10px] text-[#877363] dark:text-[#d1ddd8]">Usia 12+ thn</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                        className="w-7 h-7 rounded-full bg-white dark:bg-[#1d2d28] border border-[#dac2af]/50 dark:border-[#283e37] font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs text-[#141e1b] dark:text-white">{adultCount}</span>
                      <button 
                        type="button" 
                        onClick={() => setAdultCount(adultCount + 1)}
                        className="w-7 h-7 rounded-full bg-[#396754] text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#ebf6f1] dark:bg-[#253831] rounded-xl">
                    <div>
                      <div className="text-xs font-bold text-[#141e1b] dark:text-white">Anak-anak</div>
                      <div className="text-[10px] text-[#877363] dark:text-[#d1ddd8]">Usia 5-11 thn</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                        className="w-7 h-7 rounded-full bg-white dark:bg-[#1d2d28] border border-[#dac2af]/50 dark:border-[#283e37] font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs text-[#141e1b] dark:text-white">{childCount}</span>
                      <button 
                        type="button" 
                        onClick={() => setChildCount(childCount + 1)}
                        className="w-7 h-7 rounded-full bg-[#396754] text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add-on Experiences */}
                <div className="space-y-2 pt-2 border-t border-[#dac2af]/20 dark:border-[#283e37]">
                  <label className="flex items-center justify-between p-3 border border-[#dac2af]/30 dark:border-[#283e37] rounded-xl cursor-pointer hover:bg-[#ebf6f1]/40 dark:hover:bg-[#253831]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={addonDrone} 
                        onChange={(e) => setAddonDrone(e.target.checked)}
                        className="rounded text-[#f39223] focus:ring-[#f39223]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#141e1b] dark:text-white">Paket Dokumentasi Drone 4K & Video Cinematic</div>
                        <div className="text-[11px] text-[#877363] dark:text-[#d1ddd8]">Pilot drone profesional + 60s reel edit siap tayang</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5]">+Rp 1.200.000</span>
                  </label>

                  <label className="flex items-center justify-between p-3 border border-[#dac2af]/30 dark:border-[#283e37] rounded-xl cursor-pointer hover:bg-[#ebf6f1]/40 dark:hover:bg-[#253831]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={addonScuba} 
                        onChange={(e) => setAddonScuba(e.target.checked)}
                        className="rounded text-[#f39223] focus:ring-[#f39223]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#141e1b] dark:text-white">Rental Scuba Gear Lengkap & Dive Master (4 Dives)</div>
                        <div className="text-[11px] text-[#877363] dark:text-[#d1ddd8]">BCD, regulator, wetsuit, dive computer (Wajib sertifikat OWD)</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5]">+Rp 2.800.000</span>
                  </label>
                </div>

              </div>

            </div>

            {/* Right Column: Live Summary Checkout Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#f1fcf7] dark:bg-[#1d2d28] p-6 rounded-2xl border border-[#396754]/30 dark:border-[#283e37] shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#dac2af]/30 dark:border-[#283e37] pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#396754] dark:text-[#bbeed5]">
                    RINGKASAN ESTIMASI
                  </span>
                  <h3 className="text-base font-extrabold text-[#141e1b] dark:text-white">
                    Detail Pemesanan
                  </h3>
                </div>
                <Receipt className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />
              </div>

              {/* Destination preview thumbnail */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#172420] rounded-xl border border-[#dac2af]/30 dark:border-[#283e37]">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#141e1b] dark:text-white truncate">{destination.name}</h4>
                  <p className="text-[10px] text-[#877363] dark:text-[#d1ddd8]">{destination.duration} • {tripFormat === 'open' ? 'Open Trip' : 'Private Charter'}</p>
                  <p className="text-[11px] font-semibold text-[#396754] dark:text-[#bbeed5] mt-0.5">{selectedBatch}</p>
                </div>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-2 text-xs text-[#544435] dark:text-[#d1ddd8]">
                <div className="flex justify-between">
                  <span>{tripFormat === 'open' ? `Paket (${adultCount} Dewasa)` : 'Private Charter Kapal Utuh'}</span>
                  <span className="font-semibold text-[#141e1b] dark:text-white">{formatRupiah(paxTotalBase)}</span>
                </div>
                {cabinType === 'suite' && (
                  <div className="flex justify-between">
                    <span>Upgrade: Balcony Suite</span>
                    <span className="font-semibold text-[#141e1b] dark:text-white">+Rp 2.500.000</span>
                  </div>
                )}
                {addonDrone && (
                  <div className="flex justify-between">
                    <span>Add-on: Drone & Video 4K</span>
                    <span className="font-semibold text-[#141e1b] dark:text-white">+Rp 1.200.000</span>
                  </div>
                )}
                {addonScuba && (
                  <div className="flex justify-between">
                    <span>Add-on: Scuba Gear (4 Dives)</span>
                    <span className="font-semibold text-[#141e1b] dark:text-white">+Rp 2.800.000</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>PIN Konservasi BLUD Raja Ampat</span>
                  <span className="font-semibold text-[#141e1b] dark:text-white">{formatRupiah(pinBludFee)}</span>
                </div>
                {voucherApplied && (
                  <div className="flex justify-between text-[#396754] dark:text-[#bbeed5] font-bold">
                    <span>Diskon Voucher ({promoCodeInput})</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
              </div>

              {/* Promo input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Kode Voucher"
                  className="w-full px-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-[#dac2af]/40 dark:border-[#283e37] bg-white dark:bg-[#172420] text-[#141e1b] dark:text-white focus:outline-none focus:border-[#396754]"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="px-4 py-2 rounded-xl bg-[#396754] text-white text-xs font-bold hover:bg-[#182C23] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Gunakan
                </button>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-[#dac2af]/30 dark:border-[#283e37]">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-[#877363] dark:text-[#d1ddd8]">Total Biaya Ekspedisi</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#877363]">
                  <span>Pajak & asuransi termasuk</span>
                  <span className="text-[#396754] dark:text-[#bbeed5] font-bold">
                    DP 30%: {formatRupiah(dpAmount)}
                  </span>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white dark:bg-[#172420] rounded-xl border border-[#dac2af]/20 dark:border-[#283e37]">
                <button
                  type="button"
                  onClick={() => setPaymentMode('dp')}
                  className={`py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    paymentMode === 'dp'
                      ? 'bg-[#bbeed5] text-[#182C23] shadow-sm'
                      : 'text-[#877363] hover:text-[#141e1b]'
                  }`}
                >
                  Bayar DP 30% Dulu
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('full')}
                  className={`py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    paymentMode === 'full'
                      ? 'bg-[#bbeed5] text-[#182C23] shadow-sm'
                      : 'text-[#877363] hover:text-[#141e1b]'
                  }`}
                >
                  Lunasi Penuh (Bonus Kaos)
                </button>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-full py-4 rounded-full bg-[#f39223] text-white text-sm font-bold shadow-lg cta-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Konfirmasi & Lanjut Pembayaran ({formatRupiah(paymentMode === 'dp' ? dpAmount : grandTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#877363]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
                <span>Enkripsi SSL 256-bit • Instant Booking Confirmation</span>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};
