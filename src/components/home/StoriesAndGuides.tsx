import React from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowRight, Leaf, BookOpen } from 'lucide-react';
import { TravelStory } from '../../types/travel';

interface StoriesAndGuidesProps {
  stories: TravelStory[];
  onReadStory: (story: TravelStory) => void;
}

export const StoriesAndGuides: React.FC<StoriesAndGuidesProps> = ({
  stories,
  onReadStory
}) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="blog">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Editorial Manifesto (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            <span className="text-[#396754] dark:text-[#bbeed5] text-xs font-bold uppercase tracking-widest block mb-2">
              INSPIRASI PERJALANAN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141e1b] dark:text-white tracking-tight">
              Cerita Petualangan & Panduan Eksplorasi
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#544435] dark:text-[#d1ddd8] leading-relaxed">
            Menjadi pejalan bukan hanya tentang mengambil gambar, namun menyatu dengan kearifan lokal serta menjaga kelestarian alam melalui etika <span className="italic font-semibold text-[#396754] dark:text-[#bbeed5]">eco-travel</span> dan filosofi <span className="italic font-semibold text-[#396754] dark:text-[#bbeed5]">Leave No Trace</span>.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#bbeed5]/50 dark:bg-[#396754]/30 text-[#396754] dark:text-[#bbeed5] flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#141e1b] dark:text-white text-sm sm:text-base">
                  Perjalanan Sadar Lingkungan
                </h4>
                <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] mt-0.5">
                  Program reboisasi mangrove dan pengurangan plastik sekali pakai pada setiap rute ekspedisi kami.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#bbeed5]/50 dark:bg-[#396754]/30 text-[#396754] dark:text-[#bbeed5] flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#141e1b] dark:text-white text-sm sm:text-base">
                  Panduan Lokal Mendalam
                </h4>
                <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] mt-0.5">
                  Tips esensial persiapan fisik, etika adat kampung tradisional, dan waktu kunjungan terbaik.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onReadStory(stories[0])}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#182C23] text-white text-sm font-semibold hover:bg-[#396754] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span>Baca Jurnal Terpopuler</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: 3 Horizontal Editorial Articles (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {stories.map((story, idx) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onClick={() => onReadStory(story)}
              className="block bg-white dark:bg-[#1d2d28] p-4 sm:p-5 rounded-2xl border border-[#dac2af]/30 dark:border-[#283e37] card-shadow hover:card-shadow-hover transition-all duration-200 group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* Thumbnail */}
                <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#bbeed5] dark:bg-[#396754] text-[#182C23] dark:text-[#bbeed5] text-[11px] font-bold">
                      {story.category}
                    </span>
                    <span className="text-[#544435] dark:text-[#d1ddd8] text-xs flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {story.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#141e1b] dark:text-white group-hover:text-[#396754] dark:group-hover:text-[#bbeed5] transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#544435] dark:text-[#d1ddd8] line-clamp-2 leading-relaxed">
                    {story.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#396754] dark:text-[#bbeed5] font-semibold">
                      Oleh {story.author} • <span className="text-[#877363] dark:text-[#d1ddd8]/70 font-normal">{story.authorRole}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#396754] dark:text-[#bbeed5] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
