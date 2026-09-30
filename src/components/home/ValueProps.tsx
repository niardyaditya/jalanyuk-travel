import React from 'react';
import { motion } from 'motion/react';
import { Compass, CircleDollarSign, ShieldCheck, Headphones, CheckCircle2 } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      title: 'Destinasi Terkurasi',
      description: 'Rute eksklusif hasil kurasi langsung pakar travel lokal berpengalaman puluhan tahun di setiap kawasan nusantara.',
      tag: 'Rute Autentik'
    },
    {
      icon: CircleDollarSign,
      title: 'Harga Transparan',
      description: 'Biaya all-inclusive tanpa hidden cost dengan jaminan akomodasi terbaik dan fasilitas prima di setiap paket perjalanan.',
      tag: 'Tanpa Biaya Siluman'
    },
    {
      icon: ShieldCheck,
      title: 'Aman & Terpercaya',
      description: 'Standar keselamatan internasional dengan asuransi perjalanan komprehensif dan pemandu resmi berlisensi kemenpar.',
      tag: 'Pemandu Berlisensi'
    },
    {
      icon: Headphones,
      title: 'Dukungan Siaga 24/7',
      description: 'Concierge personal tanggap mendampingi kebutuhan Anda sebelum, selama, dan sesudah ekspedisi berlangsung.',
      tag: 'Pendampingan Penuh'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="pengalaman">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[#396754] dark:text-[#bbeed5] text-xs font-bold uppercase tracking-widest block mb-2">
          MENGAPA MEMILIH JALANYUK
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141e1b] dark:text-white tracking-tight">
          Dirancang untuk Petualangan yang Mengubah Sudut Pandang
        </h2>
        <p className="text-sm sm:text-base text-[#544435] dark:text-[#d1ddd8] mt-3">
          Kami memadukan kemudahan perencanaan modern dengan kedalaman eksplorasi lokal yang tak terlupakan.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1d2d28] p-7 rounded-2xl border border-[#dac2af]/30 dark:border-[#283e37] card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#bbeed5]/50 dark:bg-[#396754]/30 text-[#396754] dark:text-[#bbeed5] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#141e1b] dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#544435] dark:text-[#d1ddd8] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dac2af]/20 dark:border-[#283e37] flex items-center gap-1.5 text-[#396754] dark:text-[#bbeed5] text-xs font-bold">
                <span>{item.tag}</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
