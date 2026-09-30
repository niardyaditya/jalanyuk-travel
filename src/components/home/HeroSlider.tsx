import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { ArrowRight, Play, ChevronLeft, ChevronRight, CheckCircle2, Shield, Compass, Leaf } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  titleLight: string;
  titleHighlight: string;
  subtitle: string;
  imageUrl: string;
  destinationId: string;
  destinationName: string;
  accent: string;
  videoUrl: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    badge: 'JELAJAHI PENGALAMAN BARU',
    titleLight: 'Eksplorasi Keindahan Alam.',
    titleHighlight: 'Temukan Cerita Perjalananmu.',
    subtitle: 'Bukan sekadar liburan biasa — rasakan pengalaman autentik dan visual storytelling yang membawa Anda lebih dekat dengan keajaiban alam nusantara dan dunia.',
    imageUrl: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1600&q=85',
    destinationId: 'raja-ampat',
    destinationName: 'Raja Ampat',
    accent: '#f39223',
    videoUrl: 'https://youtu.be/CwspQBVrJzQ?si=lp_XASXlokpUTIMX'
  },
  {
    id: 'slide-2',
    badge: 'LIVEABOARD PHINISI EKSKLUSIF',
    titleLight: 'Berlayar Menembus Savana.',
    titleHighlight: 'Saksikan Keagungan Komodo.',
    subtitle: 'Sensasi melintasi gugusan pulau vulkanik berpasir merah muda dan menikmati sunset golden hour di puncak bukit Padar yang melegenda.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    destinationId: 'labuan-bajo',
    destinationName: 'Labuan Bajo',
    accent: '#ffb875',
    videoUrl: 'https://youtu.be/MDqW4aYi5Oc?si=_EJuz8VI3VuAEaKY'
  },
  {
    id: 'slide-3',
    badge: 'FASILITAS EXPLORER 4X4',
    titleLight: 'Keheningan Lautan Pasir.',
    titleHighlight: 'Magis Fajar Emas Bromo.',
    subtitle: 'Menembus kabut kaldera Tengger bersama Jeep 4x4 menuju ketinggian Penanjakan untuk menyambut fajar paling memukau di tanah Jawa.',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=85',
    destinationId: 'bromo-sunrise',
    destinationName: 'Bromo Tengger',
    accent: '#f39223',
    videoUrl: 'https://youtu.be/EUlZ_Omb538?si=hiK0Pegx2YLlagoO'
  }
];

const AUTOPLAY_DURATION = 6500; // 6.5s per slide
const CUBIC_EASE = [0.16, 1, 0.3, 1] as const;

interface HeroSliderProps {
  onStartAdventure: () => void;
  onSelectDestination: (id: string) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onStartAdventure,
  onSelectDestination,
  onOpenVideoModal
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [slideProgressKey, setSlideProgressKey] = useState(0);

  const goToSlide = useCallback((newIndex: number, newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(newIndex);
    setSlideProgressKey((prev) => prev + 1);
  }, []);

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % HERO_SLIDES.length;
    goToSlide(newIndex, 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToSlide(newIndex, -1);
  }, [currentIndex, goToSlide]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const slide = HERO_SLIDES[currentIndex];

  // Silky smooth, GPU-accelerated variants (transform and opacity only)
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.04
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 28, mass: 1 },
        opacity: { duration: 0.45, ease: 'easeOut' },
        scale: { duration: 0.8, ease: 'easeOut' }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 28, mass: 1 },
        opacity: { duration: 0.35, ease: 'easeIn' }
      }
    })
  };

  return (
    <section 
      className="relative pt-4 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden select-none"
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Panoramic Hero Container with Drag / Touch Gesture Support */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_e, { offset, velocity }) => {
          if (offset.x < -60 || velocity.x < -300) {
            nextSlide();
          } else if (offset.x > 60 || velocity.x > 300) {
            prevSlide();
          }
        }}
        className="relative w-full rounded-3xl overflow-hidden min-h-[580px] md:min-h-[660px] flex flex-col justify-between p-6 sm:p-10 md:p-16 text-white shadow-xl bg-[#141e1b] cursor-grab active:cursor-grabbing transform-gpu"
      >
        {/* Background Slide Carousel Images with AnimatePresence */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-0 bg-cover bg-center will-change-transform transform-gpu pointer-events-none"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            {/* Scrim Overlay for Typographic Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141e1b]/95 via-[#141e1b]/50 to-black/25" />
            <div className="absolute inset-0 bg-[#1e4d3b]/20 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        {/* Top Eyebrow Badge & Slider Indicators */}
        <div className="relative z-10 flex items-center justify-between">
          <motion.span 
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: CUBIC_EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider uppercase shadow-xs transform-gpu"
          >
            <Compass className="w-3.5 h-3.5 text-[#ffb875]" />
            {slide.badge}
          </motion.span>

          {/* Slide Navigator Controls & Interactive Progress Bars */}
          <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-md">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Individual Slide Tabs with Visual Progress */}
            <div className="flex items-center gap-2 px-1">
              {HERO_SLIDES.map((s, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                    aria-label={`Ke slide ${idx + 1}: ${s.destinationName}`}
                    className={`relative h-7 px-3 rounded-full flex items-center gap-2 text-xs font-bold transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive 
                        ? 'bg-white/25 text-white ring-1 ring-white/40 shadow-xs' 
                        : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden md:inline font-medium">{s.destinationName}</span>
                    
                    {/* Animated progress bar for active slide */}
                    {isActive && (
                      <motion.div
                        key={`progress-${slideProgressKey}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isHovered ? undefined : '100%' }}
                        transition={{ 
                          duration: AUTOPLAY_DURATION / 1000, 
                          ease: 'linear' 
                        }}
                        className="absolute bottom-0 left-0 h-0.5 bg-[#f39223]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              aria-label="Slide selanjutnya"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Middle Hero Content with Silky Smooth Staggered Motion */}
        <div className="relative z-10 max-w-3xl my-auto pt-8 sm:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.42, ease: CUBIC_EASE }}
              className="space-y-4 transform-gpu"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08, ease: CUBIC_EASE }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-md"
              >
                {slide.titleLight}<br className="hidden sm:block" />
                <span className="text-[#ffb875] inline-block">{slide.titleHighlight}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16, ease: CUBIC_EASE }}
                className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-sm font-normal"
              >
                {slide.subtitle}
              </motion.p>

              {/* Dual CTA Buttons with Micro-interactions */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.24, ease: CUBIC_EASE }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onStartAdventure}
                  className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#f39223] text-white text-sm font-bold cta-glow hover:brightness-110 shadow-lg cursor-pointer transform-gpu transition-shadow"
                >
                  <span>Mulai Petualangan Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenVideoModal?.(slide.videoUrl, `${slide.destinationName} — Video Dokumentasi Ekspedisi`)}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-semibold hover:bg-white/25 shadow-md cursor-pointer transform-gpu transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Tonton Video Pengalaman</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => onSelectDestination(slide.destinationId)}
                  className="text-xs sm:text-sm text-white/85 hover:text-white underline underline-offset-4 font-semibold transition-colors cursor-pointer py-2 inline-flex items-center gap-1"
                >
                  Lihat Detail {slide.destinationName} →
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Trust Indicators & Mobile Bullets */}
        <div className="relative z-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/85">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffb875]" />
              <span>100% Pemandu Lokal Resmi</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#ffb875]" />
              <span>Prinsip Wisata Berkelanjutan</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ffb875]" />
              <span>Garansi Keselamatan & Asuransi</span>
            </div>
          </div>

          {/* Mobile slide dots with active fill */}
          <div className="flex sm:hidden items-center gap-2 self-center">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-7 bg-[#f39223]' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};
