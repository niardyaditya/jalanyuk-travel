import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, ChevronLeft, ChevronRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  titleLight: string;
  titleHighlight: string;
  subtitle: string;
  imageUrl: string;
  destinationId: string;
  accent: string;
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
    accent: '#f39223'
  },
  {
    id: 'slide-2',
    badge: 'LIVEABOARD PHINISI EKSKLUSIF',
    titleLight: 'Berlayar Menembus Savana.',
    titleHighlight: 'Saksikan Keagungan Komodo.',
    subtitle: 'Sensasi melintasi gugusan pulau vulkanik berpasir merah muda dan menikmati sunset golden hour di puncak bukit Padar yang melegenda.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    destinationId: 'labuan-bajo',
    accent: '#ffb875'
  },
  {
    id: 'slide-3',
    badge: 'FASILITAS EXPLORER 4X4',
    titleLight: 'Keheningan Lautan Pasir.',
    titleHighlight: 'Magis Fajar Emas Bromo.',
    subtitle: 'Menembus kabut kaldera Tengger bersama Jeep 4x4 menuju ketinggian Penanjakan untuk menyambut fajar paling memukau di tanah Jawa.',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=85',
    destinationId: 'bromo-sunrise',
    accent: '#f39223'
  }
];

interface HeroSliderProps {
  onStartAdventure: () => void;
  onSelectDestination: (id: string) => void;
  onOpenVideoModal?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onStartAdventure,
  onSelectDestination,
  onOpenVideoModal
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((newIndex: number, newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(newIndex);
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
    }, 6500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const slide = HERO_SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      className="relative pt-4 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden"
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Panoramic Hero Container */}
      <div className="relative w-full rounded-3xl overflow-hidden min-h-[580px] md:min-h-[660px] flex flex-col justify-between p-6 sm:p-10 md:p-16 text-white shadow-xl bg-[#141e1b]">
        
        {/* Background Slide Carousel Images with AnimatePresence */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            {/* Scrim Overlay for Typographic Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141e1b]/95 via-[#141e1b]/45 to-black/25" />
            <div className="absolute inset-0 bg-[#1e4d3b]/20 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        {/* Top Eyebrow Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <motion.span 
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffb875]" />
            {slide.badge}
          </motion.span>

          {/* Slide Navigator Controls */}
          <div className="hidden sm:flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-full p-1.5">
            <button
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                  aria-label={`Ke slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-6 bg-[#f39223]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Slide selanjutnya"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Hero Content with Staggered Motion */}
        <div className="relative z-10 max-w-3xl my-auto pt-8 sm:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-md">
                {slide.titleLight}<br className="hidden sm:block" />
                <span className="text-[#ffb875]">{slide.titleHighlight}</span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
                {slide.subtitle}
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onStartAdventure}
                  className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#f39223] text-white text-sm font-bold cta-glow hover:brightness-110 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <span>Mulai Petualangan Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenVideoModal}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-semibold hover:bg-white/25 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Tonton Video Pengalaman</span>
                </button>
                
                <button
                  onClick={() => onSelectDestination(slide.destinationId)}
                  className="text-xs text-white/80 hover:text-white underline underline-offset-4 font-medium transition-colors cursor-pointer py-2"
                >
                  Lihat Detail {slide.destinationId === 'raja-ampat' ? 'Raja Ampat' : slide.destinationId === 'labuan-bajo' ? 'Labuan Bajo' : 'Bromo'} →
                </button>
              </div>
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
              <Sparkles className="w-4 h-4 text-[#ffb875]" />
              <span>Prinsip Wisata Berkelanjutan</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ffb875]" />
              <span>Garansi Keselamatan & Asuransi</span>
            </div>
          </div>

          {/* Mobile slide dots */}
          <div className="flex sm:hidden items-center gap-1.5 self-center">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#f39223]' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
