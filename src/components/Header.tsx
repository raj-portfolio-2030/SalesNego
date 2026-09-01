import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Sparkles, HelpCircle, ShieldCheck, TrendingUp, Layers, Workflow, Briefcase } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown or mobile menu on outside click or ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const primaryNav = [
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'Our System', href: '#system' },
    { label: 'AI + RevOps', href: '#ai-revops' },
    { label: 'Experience', href: '#experience' },
  ];

  const secondaryNav = [
    {
      label: 'Why SalesNego',
      href: '#why-salesnego',
      desc: 'Our founder-led operating model & philosophy',
      icon: ShieldCheck,
    },
    {
      label: 'Client Voice',
      href: '#testimonials',
      desc: 'Testimonials, benchmarks & verified references',
      icon: Sparkles,
    },
    {
      label: 'Account Growth',
      href: '#growth',
      desc: 'Expansion, retention & land-and-expand motion',
      icon: TrendingUp,
    },
    {
      label: 'FAQ',
      href: '#faq',
      desc: 'Frequently asked commercial & engagement questions',
      icon: HelpCircle,
    },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E1E1E1] py-2.5 sm:py-3'
          : 'bg-[#000229]/90 backdrop-blur-sm border-b border-white/10 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF6004] rounded-md flex-shrink-0"
            aria-label="SalesNego - Return to top"
          >
            <Logo variant={scrolled ? 'dark' : 'white'} size="md" />
          </a>

          {/* Desktop Navigation Links (Visible on >= 1280px xl displays to eliminate crowding) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Main Navigation">
            {primaryNav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-[#FF6004] tracking-tight ${
                  scrolled ? 'text-[#191919]' : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Secondary Links Subtle Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="more-nav-dropdown-btn"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors tracking-tight ${
                  scrolled ? 'text-[#191919] hover:text-[#103CE7]' : 'text-slate-200 hover:text-white'
                }`}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-[#FF6004]' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Dropdown Popover */}
              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 rounded-2xl bg-white border border-[#E1E1E1] shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="space-y-1">
                    {secondaryNav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F9FE] transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#F7F9FE] group-hover:bg-[#103CE7]/10 text-[#606060] group-hover:text-[#103CE7] flex items-center justify-center flex-shrink-0 transition-colors border border-[#E1E1E1]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-sm font-bold text-[#000229] group-hover:text-[#103CE7] transition-colors block">
                              {item.label}
                            </span>
                            <span className="text-xs text-[#606060] line-clamp-1">
                              {item.desc}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA Action Buttons (xl screens) */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <a
              href="#system"
              id="header-secondary-cta-btn"
              className={`inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 border ${
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
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-all duration-150 shadow-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:ring-offset-2"
            >
              <span>Discuss Growth</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Compact Tablet & Mobile Navigation (< 1280px / < xl) */}
          <div className="flex xl:hidden items-center gap-2.5">
            <a
              href="#system"
              className={`hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${
                scrolled
                  ? 'text-[#000229] border-[#E1E1E1] bg-white hover:bg-slate-50'
                  : 'text-slate-200 border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              Framework
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-colors shadow-xs"
            >
              <span>Discuss Growth</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6004] ${
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

      {/* Mobile & Tablet Drawer (< xl) */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="xl:hidden fixed inset-x-0 top-full bg-white border-b border-[#E1E1E1] shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#606060] px-3">
              Primary Navigation
            </div>
            <nav className="flex flex-col space-y-1">
              {primaryNav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-bold text-[#191919] hover:text-[#FF6004] hover:bg-[#F7F9FE] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#E1E1E1]">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#606060] px-3 mb-2">
                More Resources
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {secondaryNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-lg hover:bg-[#F7F9FE] flex items-center gap-2.5 transition-colors border border-transparent hover:border-[#E1E1E1]"
                    >
                      <Icon className="w-4 h-4 text-[#103CE7]" />
                      <span className="text-xs font-bold text-[#000229]">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E1E1] flex flex-col gap-2.5">
              <a
                href="#system"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000229] bg-[#F7F9FE] border border-[#E1E1E1] hover:bg-slate-100 transition-colors"
              >
                View Execution Framework
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-colors shadow-sm"
              >
                <span>Discuss Your Growth Priorities</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

