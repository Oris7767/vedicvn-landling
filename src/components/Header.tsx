import { useState, useEffect } from 'react';

export function Header() {
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
    { label: 'Trang chủ', href: '#home' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-width">
        <nav className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <svg
              className="w-10 h-10 text-gold-600"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.15" />
              <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.3" />
              <circle cx="50" cy="50" r="25" fill="currentColor" opacity="0.5" />
              <path
                d="M50 20 L53 35 L68 35 L56 44 L60 59 L50 50 L40 59 L44 44 L32 35 L47 35 Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-2xl font-serif font-semibold text-stone-800">
              Votive
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-stone-600 hover:text-gold-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary">
              Đặt lịch ngay
            </a>
          </div>

          <button
            className="md:hidden p-2 text-stone-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-200 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-stone-600 hover:text-gold-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary text-center mt-2">
                Đặt lịch ngay
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
