import { ArrowDown, CheckCircle2, HelpCircle, Lightbulb } from 'lucide-react';

export default function EvidenceIntelligence() {
  return (
    <section id="evidence-intelligence" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            BEFORE OUTREACH
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Evidence before assumption.
          </h2>
          <div className="space-y-2 text-base sm:text-lg text-[#606060] leading-relaxed">
            <p>Large contact lists are easy to create. Relevant commercial conversations are harder.</p>
            <p className="font-semibold text-[#191919]">
              SalesNego uses a simple discipline before important outreach:
            </p>
          </div>
        </div>

        {/* 3-Stage Visual Pipeline */}
        <div className="mt-12 max-w-4xl mx-auto space-y-4">
          {/* Stage 1: FACT */}
          <div className="p-6 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#103CE7]/40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#103CE7]/10 text-[#103CE7] flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#103CE7] font-mono">
                  STAGE 01 • FACT
                </span>
                <h3 className="text-lg font-bold text-[#000229]">
                  What can we verify about the account?
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#606060]">
              Signals & Data
            </div>
          </div>

          <div className="flex justify-center text-[#FE9E30]">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Stage 2: HYPOTHESIS */}
          <div className="p-6 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#FE9E30]/60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FE9E30]/10 text-[#FF6004] flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6004] font-mono">
                  STAGE 02 • HYPOTHESIS
                </span>
                <h3 className="text-lg font-bold text-[#000229]">
                  What commercial problem could reasonably exist because of that fact?
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#606060]">
              Problem Logic
            </div>
          </div>

          <div className="flex justify-center text-[#FE9E30]">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Stage 3: DISCOVERY QUESTION */}
          <div className="p-6 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#103CE7]/40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#103CE7]/10 text-[#103CE7] flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#103CE7] font-mono">
                  STAGE 03 • DISCOVERY QUESTION
                </span>
                <h3 className="text-lg font-bold text-[#000229]">
                  What should we ask to determine whether the hypothesis is real?
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#606060]">
              Qualification
            </div>
          </div>
        </div>

        {/* Closing copy */}
        <div className="mt-10 p-6 rounded-xl bg-white border border-[#E1E1E1] text-center max-w-3xl mx-auto shadow-2xs">
          <p className="text-base sm:text-lg font-bold text-[#000229]">
            We do not treat a company as an opportunity simply because it matches an industry filter.{' '}
            <span className="text-[#FF6004]">Evidence earns priority. Discovery earns qualification.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
