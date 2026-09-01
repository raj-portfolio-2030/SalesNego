import { useState } from 'react';
import Logo from './Logo';
import LegalModal from './LegalModal';
import { Mail, Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#000229] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#hero" className="inline-block">
              <Logo variant="white" size="lg" />
            </a>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Commercial execution for B2B SaaS, AI and technology companies.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#64E9FF]">
              <Mail className="w-4 h-4 text-[#FF6004]" />
              <a
                href="mailto:sales@salesnego.com"
                className="hover:underline text-slate-200 hover:text-white transition-colors"
              >
                sales@salesnego.com
              </a>
            </div>
          </div>

          {/* Col 2: Capabilities */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64E9FF]">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#what-we-do" className="hover:text-white transition-colors">
                  GTM Strategy & Market Intelligence
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-white transition-colors">
                  Revenue Operations & AI-Accelerated Sales
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-white transition-colors">
                  End-to-End Commercial Execution
                </a>
              </li>
              <li>
                <a href="#account-growth" className="hover:text-[#FF6004] transition-colors">
                  Account Growth & Customer Success
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Markets */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64E9FF] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#FF6004]" />
              Active Markets
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-300 font-medium">
              <li>North America</li>
              <li>United Arab Emirates (UAE)</li>
              <li>United Kingdom (UK)</li>
              <li>India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© 2026 SalesNego. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog */}
      <LegalModal
        isOpen={modalType !== null}
        type={modalType}
        onClose={() => setModalType(null)}
      />
    </footer>
  );
}
