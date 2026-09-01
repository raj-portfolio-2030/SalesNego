import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS } from '../data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E1E1E1] py-3'
          : 'bg-[#000229]/90 backdrop-blur-sm border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF6004] rounded-md"
            aria-label="SalesNego - Return to top"
          >
            <Logo variant={scrolled ? 'dark' : 'white'} size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {NAV_LINKS.filter((link) => link.label !== 'Contact').map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#FF6004] ${
                  scrolled ? 'text-[#191919]' : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#system"
              id="header-secondary-cta-btn"
              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 border ${
                scrolled
                  ? 'text-[#000229] border-[#E1E1E1] hover:bg-[#F7F9FE] hover:border-[#103CE7]/40'
                  : 'text-slate-200 border-white/20 hover:bg-white/10 hover:text-white'
              }`}
            >
              View Framework
            </a>
            <a
              href="#contact"
              id="header-cta-btn"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-all duration-150 shadow-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:ring-offset-2"
            >
              Discuss Growth
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#system"
              className={`inline-flex items-center justify-center px-2.5 py-1.5 rounded-md text-xs font-semibold border ${
                scrolled
                  ? 'text-[#000229] border-[#E1E1E1] bg-white'
                  : 'text-slate-200 border-white/20 bg-white/5'
              }`}
            >
              Framework
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-colors"
            >
              Discuss Growth
            </a>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6004] ${
                scrolled
                  ? 'text-[#191919] hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-[#E1E1E1] shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md text-base font-semibold text-[#191919] hover:text-[#FF6004] hover:bg-[#F7F9FE] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-[#E1E1E1] flex flex-col gap-2">
              <a
                href="#system"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#000229] bg-[#F7F9FE] border border-[#E1E1E1] hover:bg-slate-100 transition-colors"
              >
                View Execution Framework
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-base font-semibold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-colors shadow-sm"
              >
                Discuss Your Growth Priorities
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
