import { Compass, Database, TrendingUp, ArrowRight } from 'lucide-react';

export default function CommercialProblem() {
  return (
    <section id="why-salesnego-problem" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            WHY SALESNEGO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Most revenue problems start before the first sales call.
          </h2>
          <div className="space-y-3 text-base sm:text-lg text-[#606060] leading-relaxed">
            <p>
              A strong product does not automatically create a strong commercial motion.
            </p>
            <p>
              Companies often enter the market with an unclear ICP, generic positioning, random account selection, fragmented sales tools, weak qualification and limited visibility into how buyers actually make decisions.
            </p>
            <p className="font-semibold text-[#191919]">
              The result is activity without enough commercial progress.
            </p>
          </div>
        </div>

        {/* 3 Horizontal Connected Elements */}
        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[#606060] mb-6">
            SalesNego connects three disciplines that are too often separated:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Element 1 */}
            <div className="p-6 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] hover:border-[#103CE7]/40 transition-all duration-200 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#103CE7]/10 flex items-center justify-center text-[#103CE7]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wide text-[#000229]">
                  Market Intelligence
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed">
                  Know where to compete, who matters and why the customer should care.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E1E1E1]/80 flex items-center text-xs font-semibold text-[#103CE7]">
                Direction & Targeting
              </div>
            </div>

            {/* Element 2 */}
            <div className="p-6 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] hover:border-[#64E9FF]/70 transition-all duration-200 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#103CE7]/10 flex items-center justify-center text-[#103CE7]">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wide text-[#000229]">
                  Revenue Infrastructure
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed">
                  Create the systems, data, processes and operating discipline required to manage opportunities properly.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E1E1E1]/80 flex items-center text-xs font-semibold text-[#103CE7]">
                Process & RevOps
              </div>
            </div>

            {/* Element 3 */}
            <div className="p-6 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] hover:border-[#FF6004]/50 transition-all duration-200 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#FF6004]/10 flex items-center justify-center text-[#FF6004]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wide text-[#000229]">
                  Commercial Execution
                </h3>
                <p className="text-sm text-[#606060] leading-relaxed">
                  Turn account intelligence into conversations, opportunities, decisions, customers and account growth.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E1E1E1]/80 flex items-center text-xs font-semibold text-[#FF6004]">
                Closing & Growth
              </div>
            </div>
          </div>
        </div>

        {/* Closing Emphasis Callout */}
        <div className="mt-8 p-5 sm:p-6 rounded-xl bg-[#000229] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg font-bold text-white tracking-tight">
            Strategy gives execution direction. Execution gives strategy evidence. <span className="text-[#64E9FF]">SalesNego connects both.</span>
          </p>
          <a
            href="#system"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FE9E30] hover:text-white transition-colors flex-shrink-0"
          >
            See the system in action <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
