import { COMMERCIAL_EXPERIENCES } from '../data/content';
import { Microscope, Shield, Zap, Cpu } from 'lucide-react';

export default function CommercialExperience() {
  const icons = [
    <Microscope key="1" className="w-5 h-5 text-[#103CE7]" />,
    <Shield key="2" className="w-5 h-5 text-[#FF6004]" />,
    <Zap key="3" className="w-5 h-5 text-[#64E9FF]" />,
    <Cpu key="4" className="w-5 h-5 text-[#103CE7]" />,
  ];

  return (
    <section id="experience" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            RELEVANT EXPERIENCE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Built around complex B2B technology sales.
          </h2>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#808080]">
            Commercial experience behind the SalesNego operating model
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMERCIAL_EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#F7F9FE] border border-[#E1E1E1] shadow-xs hover:border-[#103CE7]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E1E1E1]">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs text-[#808080] font-bold">
                    DOMAIN 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#000229]">
                  {exp.title}
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {exp.tags && (
                <div className="mt-6 pt-4 border-t border-[#E1E1E1] flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#E1E1E1] text-[11px] font-medium text-[#606060]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
