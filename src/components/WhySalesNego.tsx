import { WHY_SALESNEGO_CARDS } from '../data/content';
import { UserCheck, Users, Box, Search, ShieldCheck, Database } from 'lucide-react';

export default function WhySalesNego() {
  const icons = [
    <UserCheck key="1" className="w-5 h-5 text-[#103CE7]" />,
    <Users key="2" className="w-5 h-5 text-[#FF6004]" />,
    <Box key="3" className="w-5 h-5 text-[#64E9FF]" />,
    <Search key="4" className="w-5 h-5 text-[#103CE7]" />,
    <ShieldCheck key="5" className="w-5 h-5 text-[#FF6004]" />,
    <Database key="6" className="w-5 h-5 text-[#103CE7]" />,
  ];

  return (
    <section id="why-salesnego" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            OUR OPERATING MODEL
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Founder-Led. Evidence-Led. Execution-Focused.
          </h2>
          <p className="text-base sm:text-lg text-[#606060]">
            How we partner with founders and commercial executives to drive sustainable revenue growth.
          </p>
        </div>

        {/* Six Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_SALESNEGO_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#F7F9FE] border border-[#E1E1E1] shadow-xs hover:border-[#103CE7]/40 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E1E1E1]">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#808080]">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#000229] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
