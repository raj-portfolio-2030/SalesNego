import { WHO_WE_HELP_CARDS } from '../data/content';
import { Layers, UserCheck, Globe2, Sparkles } from 'lucide-react';

export default function WhoWeHelp() {
  const icons = [
    <Layers key="1" className="w-5 h-5 text-[#103CE7]" />,
    <UserCheck key="2" className="w-5 h-5 text-[#FF6004]" />,
    <Globe2 key="3" className="w-5 h-5 text-[#64E9FF]" />,
    <Sparkles key="4" className="w-5 h-5 text-[#103CE7]" />,
  ];

  return (
    <section id="who-we-help" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            WHO WE WORK WITH
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Built for B2B technology companies where selling requires understanding.
          </h2>
        </div>

        {/* Four Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHO_WE_HELP_CARDS.map((card, idx) => (
            <div
              key={card.number}
              className="p-6 rounded-xl bg-white border border-[#E1E1E1] shadow-xs hover:border-[#103CE7]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1]">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#808080]">
                    {card.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#000229] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small Qualification Statement */}
        <div className="mt-8 p-4 rounded-lg bg-white border border-[#E1E1E1] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#103CE7] flex-shrink-0" />
          <p className="text-xs sm:text-sm text-[#606060]">
            <span className="font-bold text-[#191919]">Engagement Focus:</span> Product and SaaS engagements are our primary focus. Technology services engagements are selected based on fit, differentiation and commercial potential.
          </p>
        </div>
      </div>
    </section>
  );
}
