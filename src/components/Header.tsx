import { useState, useEffect } from 'react';
import { ExternalLink, Menu, X, Sparkles } from 'lucide-react';
import type { Page } from '../App';

interface HeaderProps {
  onNavigate?: (page: Page) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Dịch vụ tư vấn', href: '#services' },
    { label: 'Khóa học', href: '#courses' },
    { label: 'Về Votive & Founder', href: '#about' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-votive-border/70'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="container-width px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Brand identity */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-votive-surface border border-votive-border flex items-center justify-center overflow-hidden p-1 shadow-sm group-hover:border-votive-red/40 transition-colors">
              <img src="/votive-logo.png" alt="VedicVN Votive" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif font-bold text-votive-text tracking-tight flex items-center gap-1.5">
                VedicVN
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-votive-red/10 text-votive-red border border-votive-red/20">
                  Academy
                </span>
              </span>
              <span className="text-[11px] text-votive-muted font-sans -mt-0.5 hidden sm:block">
                Học Viện & Tư Vấn Chiêm Tinh Vệ Đà
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-votive-text/80 hover:text-votive-red transition-colors subtle-underline"
              >
                {item.label}
              </a>
            ))}

            {onNavigate && (
              <button
                onClick={() => onNavigate('ethics')}
                className="text-sm font-medium text-votive-text/80 hover:text-votive-red transition-colors subtle-underline"
              >
                Quy tắc đạo đức
              </button>
            )}

            {/* Portal bridge */}
            <a
              href="https://vedicvn.com/vedic-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-votive-red hover:text-[#800d0c] px-3 py-1.5 rounded-full bg-votive-red/5 border border-votive-red/20 transition-colors"
              title="Mở cổng lập bản đồ sao miễn phí tại VedicVN.com"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Lập lá số miễn phí
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a href="#services" className="btn-primary text-sm px-5 py-2.5 shadow-sm">
              Đặt lịch ngay
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="lg:hidden p-2 rounded-xl text-votive-text hover:bg-votive-surface border border-votive-border/60 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-votive-red" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl glass-card border border-votive-border animate-fade-in shadow-xl">
            <div className="flex flex-col gap-3.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-votive-text hover:text-votive-red py-1 px-2 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {onNavigate && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('ethics');
                  }}
                  className="text-left text-base font-medium text-votive-text hover:text-votive-red py-1 px-2 rounded-lg transition-colors"
                >
                  Quy tắc đạo đức nghề nghiệp
                </button>
              )}

              <a
                href="https://vedicvn.com/vedic-chart"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm font-medium text-votive-red py-2.5 px-3 rounded-xl bg-votive-red/5 border border-votive-red/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Cổng tra cứu: Lập lá số miễn phí
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="#services"
                className="btn-primary text-center mt-2 w-full py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đặt lịch tư vấn
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
