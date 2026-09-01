import { TESTIMONIALS } from '../data/content';
import { Quote, Lock } from 'lucide-react';

export default function Testimonials() {
  const verifiedTestimonials = TESTIMONIALS.filter((t) => !t.isPlaceholder);
  const placeholder = TESTIMONIALS.find((t) => t.isPlaceholder);

  return (
    <section id="testimonials" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            CLIENT VOICE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real Testimonial 1 & 2 */}
          {verifiedTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col justify-between space-y-6 hover:border-[#103CE7]/40 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#FF6004]/40" />
                <p className="text-sm sm:text-base text-[#191919] leading-relaxed font-medium">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E1E1E1] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#000229]">{t.author}</h3>
                  <p className="text-xs text-[#606060] font-mono">{t.company}</p>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#103CE7]">
                  Verified Client
                </span>
              </div>
            </div>
          ))}

          {/* Third clearly marked placeholder component */}
          {placeholder && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white/60 border border-dashed border-[#E1E1E1] shadow-none flex flex-col justify-between space-y-6 opacity-75">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase font-mono text-[#808080]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Approved Case Study Placeholder</span>
                </div>
                <p className="text-sm text-[#808080] italic leading-relaxed">
                  Additional enterprise client references and formal case studies are available during commercial NDA discussions.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E1E1E1]/60">
                <span className="text-xs font-semibold text-[#808080]">
                  Under Verification / Available on Request
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
