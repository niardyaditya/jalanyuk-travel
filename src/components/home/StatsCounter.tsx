import React from 'react';
import { Mountain, Users, Star, Award } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      icon: Mountain,
      count: '150+',
      title: 'Destinasi Terkurasi',
      subtitle: 'Dari Sabang hingga Merauke'
    },
    {
      icon: Users,
      count: '45.000+',
      title: 'Traveler Bahagia',
      subtitle: 'Bergabung sejak tahun 2018'
    },
    {
      icon: Star,
      count: '4.9 / 5.0',
      title: 'Rata-rata Kepuasan',
      subtitle: 'Berdasarkan 12.000+ ulasan nyata',
      iconFilled: true
    },
    {
      icon: Award,
      count: '100%',
      title: 'Pemandu Bersertifikat',
      subtitle: 'Lisensi resmi Kementerian Pariwisata'
    }
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-[#1d2d28] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#dac2af]/30 dark:border-[#283e37] card-shadow">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#dac2af]/20 dark:divide-[#283e37] text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className={`${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''} space-y-1`}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ebf6f1] dark:bg-[#253831] text-[#396754] dark:text-[#bbeed5] mb-2">
                  <Icon className={`w-6 h-6 ${stat.iconFilled ? 'text-[#f39223] fill-[#f39223]' : ''}`} />
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-[#141e1b] dark:text-white tracking-tight tabular-nums">
                  {stat.count}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#396754] dark:text-[#bbeed5]">
                  {stat.title}
                </div>
                <p className="text-[11px] sm:text-xs text-[#544435] dark:text-[#d1ddd8]">
                  {stat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
