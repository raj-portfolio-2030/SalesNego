import { ACCOUNT_GROWTH_STAGES } from '../data/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import AccountGrowthVisual from './AccountGrowthVisual';

export default function AccountGrowth() {
  return (
    <section id="account-growth" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            AFTER THE FIRST WIN
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Customer acquisition is only the beginning.
          </h2>
          <div className="space-y-2 text-base sm:text-lg text-[#606060] leading-relaxed">
            <p>
              The first contract creates a customer relationship, implementation insight and new commercial intelligence.
            </p>
            <p className="font-semibold text-[#191919]">
              SalesNego looks for expansion only when a legitimate adjacent problem becomes visible.
            </p>
          </div>
        </div>

        {/* Coded Four-Stage Pathway */}
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCOUNT_GROWTH_STAGES.map((item, idx) => (
              <div
                key={item.stage}
                className="p-5 rounded-xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col justify-between space-y-3 hover:border-[#103CE7]/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#103CE7]">
                      STAGE {item.stage}
                    </span>
                    {idx < ACCOUNT_GROWTH_STAGES.length - 1 && (
                      <ArrowRight className="hidden lg:block w-4 h-4 text-[#FE9E30]" />
                    )}
                  </div>
                  <h3 className="text-base font-extrabold text-[#000229] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E1E1E1]/80 flex items-center gap-1.5 text-xs font-medium text-[#103CE7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6004]" />
                  <span>Verified Lifecycle Step</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prominent Supporting Visual: Account Growth Engine Framework */}
        <div className="mt-12">
          <AccountGrowthVisual />
        </div>
      </div>
    </section>
  );
}
