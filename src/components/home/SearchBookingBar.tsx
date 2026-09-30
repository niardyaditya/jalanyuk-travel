import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Search } from 'lucide-react';

interface SearchBookingBarProps {
  onSearchSubmit: (query: { destination: string; date: string; duration: string; guests: string }) => void;
}

export const SearchBookingBar: React.FC<SearchBookingBarProps> = ({ onSearchSubmit }) => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('2025-05-15');
  const [duration, setDuration] = useState('4D3N');
  const [guests, setGuests] = useState('2 Dewasa, 1 Kamar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({ destination, date, duration, guests });
  };

  return (
    <div className="relative z-20 -mt-12 sm:-mt-16 max-w-5xl mx-auto px-4 mb-16" id="booking-console">
      <form 
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1d2d28] rounded-2xl md:rounded-full p-2.5 sm:p-3 card-shadow-hover border border-[#dac2af]/30 dark:border-[#283e37] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-2 divide-y sm:divide-y-0 sm:divide-x divide-[#dac2af]/20 dark:divide-[#283e37] transition-colors"
      >
        {/* Field 1: Destination */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-[#ebf6f1] dark:bg-[#24352f] flex items-center justify-center text-[#396754] dark:text-[#bbeed5] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#544435] dark:text-[#d1ddd8]">
              Mau ke mana?
            </span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Raja Ampat, Bajo..."
              className="w-full p-0 border-0 text-sm sm:text-base font-semibold text-[#141e1b] dark:text-white placeholder:text-[#877363]/60 focus:ring-0 bg-transparent truncate"
            />
          </div>
        </div>

        {/* Field 2: Date */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-[#ebf6f1] dark:bg-[#24352f] flex items-center justify-center text-[#396754] dark:text-[#bbeed5] shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#544435] dark:text-[#d1ddd8]">
              Tanggal Berangkat
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-0 border-0 text-xs sm:text-sm font-semibold text-[#141e1b] dark:text-white focus:ring-0 bg-transparent cursor-pointer"
            />
          </div>
        </div>

        {/* Field 3: Duration */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-[#ebf6f1] dark:bg-[#24352f] flex items-center justify-center text-[#396754] dark:text-[#bbeed5] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#544435] dark:text-[#d1ddd8]">
              Durasi Perjalanan
            </span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-0 border-0 text-xs sm:text-sm font-semibold text-[#141e1b] dark:text-white focus:ring-0 bg-transparent cursor-pointer"
            >
              <option value="Semua" className="dark:bg-[#1d2d28]">Semua Durasi</option>
              <option value="2H1M" className="dark:bg-[#1d2d28]">2 Hari 1 Malam (2H1M)</option>
              <option value="3H2M" className="dark:bg-[#1d2d28]">3 Hari 2 Malam (3H2M)</option>
              <option value="4D3N" className="dark:bg-[#1d2d28]">4 Hari 3 Malam (4H3M)</option>
              <option value="5D4N" className="dark:bg-[#1d2d28]">5 Hari 4 Malam (5H4M)</option>
              <option value="6H5M" className="dark:bg-[#1d2d28]">6 Hari 5 Malam (Ekspedisi Penuh)</option>
            </select>
          </div>
        </div>

        {/* Field 4: Travelers + Search Action */}
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-full bg-[#ebf6f1] dark:bg-[#24352f] flex items-center justify-center text-[#396754] dark:text-[#bbeed5] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#544435] dark:text-[#d1ddd8]">
                Traveler
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full p-0 border-0 text-xs sm:text-sm font-semibold text-[#141e1b] dark:text-white focus:ring-0 bg-transparent cursor-pointer truncate"
              >
                <option value="2 Dewasa, 1 Kamar" className="dark:bg-[#1d2d28]">2 Dewasa, 1 Kamar</option>
                <option value="1 Dewasa (Solo)" className="dark:bg-[#1d2d28]">1 Dewasa (Solo)</option>
                <option value="2 Dewasa, 2 Anak" className="dark:bg-[#1d2d28]">2 Dewasa, 2 Anak</option>
                <option value="Grup (5+ Orang)" className="dark:bg-[#1d2d28]">Grup (5+ Orang)</option>
              </select>
            </div>
          </div>

          {/* Forest Green Round Search Action */}
          <button
            type="submit"
            aria-label="Cari Destinasi"
            className="w-12 h-12 rounded-full bg-[#182C23] hover:bg-[#396754] text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0 cursor-pointer"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};
