import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Users, 
  Ship, 
  Bed, 
  Crown, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Receipt,
  CreditCard,
  Lock,
  Calendar,
  Check
} from 'lucide-react';
import { Destination } from '../../types/travel';

export interface BookingInitialConfig {
  adultCount?: number;
  childCount?: number;
  selectedBatch?: string;
  addonDrone?: boolean;
  addonSuite?: boolean;
}

interface TripCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
  appliedPromo?: string;
  initialConfig?: BookingInitialConfig;
  onSuccessBooking: (details: { code: string; total: number; pax: number }) => void;
}

export const TripCustomizerModal: React.FC<TripCustomizerModalProps> = ({
  isOpen,
  onClose,
  destination,
  appliedPromo = 'JALANYUK25',
  initialConfig,
  onSuccessBooking
}) => {
  const [tripFormat, setTripFormat] = useState<'open' | 'private'>('open');
  const [selectedBatch, setSelectedBatch] = useState('12 - 15 Maret 2025');
  const [cabinType, setCabinType] = useState<'deluxe' | 'suite'>('suite');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [addonDrone, setAddonDrone] = useState(true);
  const [addonScuba, setAddonScuba] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState(appliedPromo);
  const [voucherApplied, setVoucherApplied] = useState(true);
  const [paymentMode, setPaymentMode] = useState<'dp' | 'full'>('dp');

  // Sync state whenever modal opens or initialConfig changes
  useEffect(() => {
    if (isOpen) {
      if (initialConfig?.adultCount !== undefined && initialConfig.adultCount > 0) {
        setAdultCount(initialConfig.adultCount);
      }
      if (initialConfig?.childCount !== undefined) {
        setChildCount(initialConfig.childCount);
      }
      if (initialConfig?.selectedBatch) {
        setSelectedBatch(initialConfig.selectedBatch);
      }
      if (initialConfig?.addonDrone !== undefined) {
        setAddonDrone(initialConfig.addonDrone);
      }
      if (initialConfig?.addonSuite !== undefined) {
        setCabinType(initialConfig.addonSuite ? 'suite' : 'deluxe');
      }
    }
  }, [isOpen, initialConfig]);

  // Real-time Pricing Calculations
  const adultBasePrice = destination.pricePerPerson;
  const childBasePrice = destination.pricePerPerson * 0.7;

  // Open trip vs Private charter dynamic guest calculation
  const adultTotal = tripFormat === 'open' 
    ? adultBasePrice * adultCount 
    : (adultBasePrice * 4.5) + (Math.max(0, adultCount - 4) * (adultBasePrice * 0.85));

  const childTotal = tripFormat === 'open'
    ? childBasePrice * childCount
    : (childCount * (childBasePrice * 0.8));

  const paxTotalBase = adultTotal + childTotal;

  const suiteUpgradeFee = cabinType === 'suite' ? 1500000 : 0;
  const droneFee = addonDrone ? 750000 : 0;
  const scubaFee = addonScuba ? 1800000 : 0;
  const pinBludFee = (adultCount + childCount) * 250000;

  const discountAmount = voucherApplied ? Math.round(paxTotalBase * 0.1) : 0;
  const grandTotal = Math.max(0, paxTotalBase + suiteUpgradeFee + droneFee + scubaFee + pinBludFee - discountAmount);
  const dpAmount = Math.round(grandTotal * 0.3);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleApplyVoucher = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'JALANYUK25' || code === 'JALANYUK10' || code === 'LEBARAN25') {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white dark:bg-[#172420] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-[#283e37] overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-[#283e37] flex items-center justify-between bg-[#f1fcf7] dark:bg-[#141e1b] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#396754] dark:text-[#bbeed5]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#396754] dark:text-[#bbeed5]">
                SISTEM RESERVASI & PEMBAYARAN RESMI
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
              Kustomisasi Petualangan & Pembayaran
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup kustomisasi"
            className="w-10 h-10 rounded-full bg-white dark:bg-[#1d2d28] border border-stone-200 dark:border-[#283e37] flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 3 Steps (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: Pilih Format Perjalanan */}
              <div className="bg-white dark:bg-[#1d2d28] border border-stone-200 dark:border-[#283e37] rounded-2xl p-5 sm:p-6 card-shadow">
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
                  <div 
                    onClick={() => setTripFormat('open')}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col justify-between transition-all relative ${
                      tripFormat === 'open'
                        ? 'border-[#396754] bg-[#ebf6f1]/70 dark:bg-[#253831]/70'
                        : 'border-stone-200 dark:border-[#283e37] bg-white dark:bg-[#1d2d28]'
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
                      <p className="text-xs text-stone-600 dark:text-stone-300 mb-3 leading-relaxed">
                        Berlayar bersama sesama penjelajah. Kuota maksimal 12 orang per kapal untuk menjaga kenyamanan.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-stone-200 dark:border-[#283e37] flex items-baseline justify-between text-xs">
                      <span className="text-stone-500 dark:text-stone-400">Mulai dari</span>
                      <span className="font-extrabold text-[#396754] dark:text-[#bbeed5] text-sm">
                        {formatRupiah(destination.pricePerPerson)}<span className="text-[10px] font-normal text-stone-500">/org</span>
                      </span>
                    </div>
                  </div>

                  {/* Private Charter */}
                  <div 
                    onClick={() => setTripFormat('private')}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col justify-between transition-all relative ${
                      tripFormat === 'private'
                        ? 'border-[#396754] bg-[#ebf6f1]/70 dark:bg-[#253831]/70'
                        : 'border-stone-200 dark:border-[#283e37] bg-white dark:bg-[#1d2d28]'
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
                      <p className="text-xs text-stone-600 dark:text-stone-300 mb-3 leading-relaxed">
                        Sewa 1 kapal utuh secara eksklusif untuk keluarga atau komunitas. Rute dan jadwal privat.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-stone-200 dark:border-[#283e37] flex items-baseline justify-between text-xs">
                      <span className="text-stone-500 dark:text-stone-400">Mulai dari</span>
                      <span className="font-extrabold text-[#396754] dark:text-[#bbeed5] text-sm">
                        {formatRupiah(destination.pricePerPerson * 4.5)}<span className="text-[10px] font-normal text-stone-500">/kapal</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: Jadwal Keberangkatan */}
              <div className="bg-white dark:bg-[#1d2d28] border border-stone-200 dark:border-[#283e37] rounded-2xl p-5 sm:p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center text-xs font-bold">2</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white">
                      Jadwal Keberangkatan & Kuota
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5]">Status: Terkonfirmasi</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { batch: '12 - 15 Maret 2025', seats: 'Sisa 4 Kursi', ship: 'KM Phinisi Al-Bahr' },
                    { batch: '26 - 29 Maret 2025', seats: 'Sisa 6 Kursi', ship: 'KM Phinisi Al-Bahr' },
                    { batch: '09 - 12 April 2025', seats: 'Sisa 2 Kursi (Lebaran)', ship: 'KM Raja Ocean' },
                  ].map((item) => (
                    <div
                      key={item.batch}
                      onClick={() => setSelectedBatch(item.batch)}
                      className={`border-2 rounded-xl p-3.5 cursor-pointer transition-all ${
                        selectedBatch === item.batch
                          ? 'border-[#396754] bg-[#ebf6f1]/70 dark:bg-[#253831]/70'
                          : 'border-stone-200 dark:border-[#283e37] bg-white dark:bg-[#1d2d28]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#141e1b] dark:text-white">{item.batch.split(' ')[0]} - {item.batch.split(' ')[2]} {item.batch.split(' ')[3]}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#bbeed5] text-[#182C23]">
                          {item.seats.includes('Lebaran') ? 'Lebaran' : 'Tersedia'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">{item.ship}</p>
                      <p className="text-[11px] font-bold text-[#396754] dark:text-[#bbeed5] mt-1">{item.seats}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 3: Kabin, Jumlah Peserta, & Layanan */}
              <div className="bg-white dark:bg-[#1d2d28] border border-stone-200 dark:border-[#283e37] rounded-2xl p-5 sm:p-6 card-shadow space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#396754] text-white flex items-center justify-center text-xs font-bold">3</span>
                    <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white">
                      Kabin & Jumlah Peserta
                    </h3>
                  </div>
                  <span className="text-xs text-[#396754] dark:text-[#bbeed5] font-semibold">Kenyamanan Berlayar</span>
                </div>

                {/* Cabin Selection with Luxury Icon, NO AI emoji */}
                <div className="space-y-2.5">
                  <div 
                    onClick={() => setCabinType('suite')}
                    className={`border-2 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                      cabinType === 'suite'
                        ? 'border-[#396754] bg-[#ebf6f1]/60 dark:bg-[#253831]/60'
                        : 'border-stone-200 dark:border-[#283e37]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-[#396754] dark:text-[#bbeed5] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#141e1b] dark:text-white">
                          Upper Deck Balcony Suite
                        </h4>
                        <p className="text-[11px] text-stone-600 dark:text-stone-300">
                          Kamar luas deck atas, private balcony 180° pemandangan laut lepas, king bed, AC & ensuite bathroom.
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-3 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#396754] text-white rounded">
                        {cabinType === 'suite' ? 'Terpilih' : 'Pilih'}
                      </span>
                      <p className="text-xs font-bold text-[#396754] dark:text-[#bbeed5] mt-1">+Rp 1.500.000</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setCabinType('deluxe')}
                    className={`border-2 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                      cabinType === 'deluxe'
                        ? 'border-[#396754] bg-[#ebf6f1]/60 dark:bg-[#253831]/60'
                        : 'border-stone-200 dark:border-[#283e37]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Bed className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#141e1b] dark:text-white">
                          Main Deck Deluxe Cabin
                        </h4>
                        <p className="text-[11px] text-stone-600 dark:text-stone-300">
                          Jendela ocean view, twin / double bed, AC 24 jam, kamar mandi dalam air panas.
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-3 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 rounded">
                        {cabinType === 'deluxe' ? 'Terpilih' : 'Pilih'}
                      </span>
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mt-1">Termasuk</p>
                    </div>
                  </div>
                </div>

                {/* Travelers Counters - Instantly updates prices */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-[#283e37]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#141e1b] dark:text-white">
                      Jumlah Peserta (Harga otomatis terhitung)
                    </label>
                    <span className="text-[11px] text-[#396754] dark:text-[#bbeed5] font-semibold">
                      Total: {adultCount + childCount} Peserta
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Adult counter */}
                    <div className="flex items-center justify-between p-3.5 bg-[#ebf6f1] dark:bg-[#253831] rounded-xl border border-stone-200/60 dark:border-[#283e37]">
                      <div>
                        <div className="text-xs font-bold text-[#141e1b] dark:text-white">Dewasa</div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">Usia 12+ tahun ({formatRupiah(adultBasePrice)}/org)</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button 
                          type="button" 
                          onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                          className="w-8 h-8 rounded-full bg-white dark:bg-[#1d2d28] border border-stone-300 dark:border-[#283e37] font-bold text-sm hover:bg-stone-100 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                          aria-label="Kurangi Dewasa"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-extrabold text-sm text-[#141e1b] dark:text-white">{adultCount}</span>
                        <button 
                          type="button" 
                          onClick={() => setAdultCount(adultCount + 1)}
                          className="w-8 h-8 rounded-full bg-[#396754] text-white font-bold text-sm hover:bg-[#1e4d3b] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                          aria-label="Tambah Dewasa"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Child counter */}
                    <div className="flex items-center justify-between p-3.5 bg-[#ebf6f1] dark:bg-[#253831] rounded-xl border border-stone-200/60 dark:border-[#283e37]">
                      <div>
                        <div className="text-xs font-bold text-[#141e1b] dark:text-white">Anak-anak</div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">Usia 3-11 thn ({formatRupiah(childBasePrice)}/org)</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button 
                          type="button" 
                          onClick={() => setChildCount(Math.max(0, childCount - 1))}
                          className="w-8 h-8 rounded-full bg-white dark:bg-[#1d2d28] border border-stone-300 dark:border-[#283e37] font-bold text-sm hover:bg-stone-100 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                          aria-label="Kurangi Anak"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-extrabold text-sm text-[#141e1b] dark:text-white">{childCount}</span>
                        <button 
                          type="button" 
                          onClick={() => setChildCount(childCount + 1)}
                          className="w-8 h-8 rounded-full bg-[#396754] text-white font-bold text-sm hover:bg-[#1e4d3b] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                          aria-label="Tambah Anak"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add-on Experiences */}
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-[#283e37]">
                  <label className="text-xs font-bold text-[#141e1b] dark:text-white block">
                    Layanan Ekspedisi Tambahan (Opsional)
                  </label>

                  <label className="flex items-center justify-between p-3 border border-stone-200 dark:border-[#283e37] rounded-xl cursor-pointer hover:bg-[#ebf6f1]/50 dark:hover:bg-[#253831]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={addonDrone} 
                        onChange={(e) => setAddonDrone(e.target.checked)}
                        className="w-4 h-4 rounded text-[#f39223] focus:ring-[#f39223]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#141e1b] dark:text-white">Dokumentasi Drone 4K & Video Sinematik</div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">Pilot profesional berlisensi + video reel siap upload</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5]">+Rp 750.000</span>
                  </label>

                  <label className="flex items-center justify-between p-3 border border-stone-200 dark:border-[#283e37] rounded-xl cursor-pointer hover:bg-[#ebf6f1]/50 dark:hover:bg-[#253831]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={addonScuba} 
                        onChange={(e) => setAddonScuba(e.target.checked)}
                        className="w-4 h-4 rounded text-[#f39223] focus:ring-[#f39223]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#141e1b] dark:text-white">Rental Scuba Gear Lengkap & Dive Master (4 Dives)</div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">BCD, regulator, wetsuit, dive computer (Wajib Open Water)</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#396754] dark:text-[#bbeed5]">+Rp 1.800.000</span>
                  </label>
                </div>

              </div>

            </div>

            {/* Right Column: Live Payment & Checkout Box (5 cols) */}
            <div className="lg:col-span-5 bg-[#f1fcf7] dark:bg-[#1d2d28] p-6 rounded-2xl border border-[#396754]/30 dark:border-[#283e37] shadow-lg space-y-4">
              
              {/* Payment Box Header with Payment & Security Icons */}
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#283e37] pb-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[#396754] dark:text-[#bbeed5] text-[10px] font-bold uppercase tracking-wider">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>RINCIAN BIAYA & PEMBAYARAN</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#141e1b] dark:text-white">
                    Detail Pembayaran Terverifikasi
                  </h3>
                </div>
                <Receipt className="w-5 h-5 text-[#396754] dark:text-[#bbeed5]" />
              </div>

              {/* Destination preview thumbnail */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#172420] rounded-xl border border-stone-200 dark:border-[#283e37]">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#141e1b] dark:text-white truncate">{destination.name}</h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">{destination.duration} • {tripFormat === 'open' ? 'Open Trip' : 'Private Charter'}</p>
                  <p className="text-[11px] font-semibold text-[#396754] dark:text-[#bbeed5] mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{selectedBatch}</span>
                  </p>
                </div>
              </div>

              {/* Live Itemized Calculation that dynamically updates on guest change */}
              <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex justify-between items-center py-0.5">
                  <span>Paket Dewasa ({adultCount}x @ {formatRupiah(adultBasePrice)})</span>
                  <span className="font-bold text-[#141e1b] dark:text-white">{formatRupiah(adultTotal)}</span>
                </div>

                {childCount > 0 && (
                  <div className="flex justify-between items-center py-0.5">
                    <span>Paket Anak ({childCount}x @ {formatRupiah(childBasePrice)})</span>
                    <span className="font-bold text-[#141e1b] dark:text-white">{formatRupiah(childTotal)}</span>
                  </div>
                )}

                {cabinType === 'suite' && (
                  <div className="flex justify-between items-center py-0.5">
                    <span>Upgrade: Balcony Suite</span>
                    <span className="font-bold text-[#141e1b] dark:text-white">+{formatRupiah(suiteUpgradeFee)}</span>
                  </div>
                )}

                {addonDrone && (
                  <div className="flex justify-between items-center py-0.5">
                    <span>Add-on: Drone & Video 4K</span>
                    <span className="font-bold text-[#141e1b] dark:text-white">+{formatRupiah(droneFee)}</span>
                  </div>
                )}

                {addonScuba && (
                  <div className="flex justify-between items-center py-0.5">
                    <span>Add-on: Scuba Gear (4 Dives)</span>
                    <span className="font-bold text-[#141e1b] dark:text-white">+{formatRupiah(scubaFee)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-0.5">
                  <span>PIN Konservasi Lingkungan ({adultCount + childCount}x)</span>
                  <span className="font-bold text-[#141e1b] dark:text-white">{formatRupiah(pinBludFee)}</span>
                </div>

                {voucherApplied && (
                  <div className="flex justify-between items-center py-0.5 text-[#396754] dark:text-[#bbeed5] font-bold">
                    <span>Diskon Voucher 10% ({promoCodeInput})</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
              </div>

              {/* Promo voucher input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Kode Voucher (cth: JALANYUK25)"
                  className="w-full px-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-stone-300 dark:border-[#283e37] bg-white dark:bg-[#172420] text-[#141e1b] dark:text-white focus:outline-none focus:border-[#396754]"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="px-4 py-2 rounded-xl bg-[#396754] text-white text-xs font-bold hover:bg-[#1e4d3b] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Terapkan
                </button>
              </div>

              {/* Grand Total Row */}
              <div className="pt-3 border-t border-stone-200 dark:border-[#283e37]">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                    Total Biaya ({adultCount + childCount} Peserta)
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#141e1b] dark:text-white">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Asuransi & PPN 11% Termasuk</span>
                  <span className="text-[#396754] dark:text-[#bbeed5] font-bold">
                    DP 30%: {formatRupiah(dpAmount)}
                  </span>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-white dark:bg-[#172420] rounded-xl border border-stone-200 dark:border-[#283e37]">
                <button
                  type="button"
                  onClick={() => setPaymentMode('dp')}
                  className={`py-2 px-3 text-center text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMode === 'dp'
                      ? 'bg-[#bbeed5] text-[#182C23] shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Bayar DP 30%</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('full')}
                  className={`py-2 px-3 text-center text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMode === 'full'
                      ? 'bg-[#bbeed5] text-[#182C23] shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pelunasan Penuh</span>
                </button>
              </div>

              {/* Final Submit CTA with Lock & Payment Value */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-full py-3.5 rounded-full bg-[#f39223] text-white text-sm font-bold shadow-lg cta-glow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  Bayar Sekarang ({formatRupiah(paymentMode === 'dp' ? dpAmount : grandTotal)})
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#396754] dark:text-[#bbeed5]" />
                <span>Enkripsi SSL 256-bit • Tiket Resmi & Kwitansi Instan</span>
              </div>

            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};
