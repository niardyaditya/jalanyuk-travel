import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Search, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  onOpenCustomizer: () => void;
  onNavigateHome: () => void;
  activeSection: string;
  onOpenAllDestinations?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenWishlist,
  wishlistCount,
  onOpenCustomizer,
  onNavigateHome,
  activeSection,
  onOpenAllDestinations
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Destinasi', href: '#destinasi', id: 'destinasi' },
    { label: 'Pengalaman', href: '#pengalaman', id: 'pengalaman' },
    { label: 'Cerita', href: '#blog', id: 'blog' },
    { label: 'Tentang Kami', href: '#tentang-kami', id: 'tentang-kami' },
  ];

  const handleLinkClick = (href: string) => {
    onNavigateHome();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f1fcf7]/90 dark:bg-[#111a17]/90 backdrop-blur-md border-b border-[#dac2af]/30 dark:border-[#283e37] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Lockup Wordmark */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#396754] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#141e1b] dark:text-[#f1fcf7] tracking-tight leading-tight">
              JalanYuk
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#366851] dark:text-[#bbeed5]">
              Eksplorasi Tanpa Batas
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`text-sm font-semibold transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#8d4f00] dark:text-[#ffb875] font-bold'
                    : 'text-[#544435] dark:text-[#d1ddd8] hover:text-[#396754] dark:hover:text-[#bbeed5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f39223] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Trailing Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenAllDestinations || onOpenSearch}
            aria-label="Cari Destinasi"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#544435] dark:text-[#d1ddd8] hover:text-[#396754] hover:bg-[#e5f0eb] dark:hover:bg-[#1d2d28] transition-all cursor-pointer active:scale-95"
            title="Cari Semua Destinasi"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger with Badge */}
          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist Destinasi"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#544435] dark:text-[#d1ddd8] hover:text-[#ba1a1a] hover:bg-[#e5f0eb] dark:hover:bg-[#1d2d28] transition-all relative cursor-pointer active:scale-95"
            title="Destinasi Tersimpan"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#f39223] text-white text-[10px] font-bold flex items-center justify-center leading-none"
              >
                {wishlistCount}
              </motion.span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Ganti Mode Tampilan"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#544435] dark:text-[#d1ddd8] hover:text-[#f39223] hover:bg-[#e5f0eb] dark:hover:bg-[#1d2d28] transition-all cursor-pointer active:scale-95"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun className="w-5 h-5 text-[#ffb875]" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon className="w-5 h-5 text-[#396754]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenCustomizer}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f39223] text-white text-sm font-bold cta-glow hover:brightness-105 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <span>Mulai Perjalanan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#544435] dark:text-[#d1ddd8] hover:bg-[#e5f0eb] dark:hover:bg-[#1d2d28] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#dac2af]/30 dark:border-[#283e37] bg-[#ffffff] dark:bg-[#172420] px-6 py-4 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="py-2 text-sm font-semibold text-[#544435] dark:text-[#d1ddd8] hover:text-[#396754] dark:hover:text-[#bbeed5] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#dac2af]/20 dark:border-[#283e37]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full py-3 rounded-full bg-[#f39223] text-white text-sm font-bold flex items-center justify-center gap-2 cta-glow active:scale-95 cursor-pointer"
                >
                  <span>Mulai Perjalanan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
