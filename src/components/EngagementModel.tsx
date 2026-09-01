import { ShieldCheck, Users2, Check } from 'lucide-react';

export default function EngagementModel() {
  const factors = [
    'Scope of engagement',
    'Product maturity & stage',
    'Target market & geography',
    'Sales-cycle complexity',
    'Level of commercial ownership',
    'Required tooling and RevOps work',
  ];

  return (
    <section id="engagement-model" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            WORKING WITH SALESNEGO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Commercial alignment without unnecessary complexity.
          </h2>
          <div className="space-y-2 text-base sm:text-lg text-[#606060] leading-relaxed">
            <p>Engagements are structured around the actual work required.</p>
            <p className="font-semibold text-[#191919]">
              Depending on the scope, commercial models can combine a monthly execution retainer with an agreed performance component.
            </p>
          </div>
        </div>

        {/* Structure and Factors */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Factors */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#F7F9FE] border border-[#E1E1E1] shadow-xs space-y-6">
            <h3 className="text-base font-extrabold uppercase tracking-wide text-[#000229]">
              Commercial Scoping Factors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {factors.map((factor) => (
                <div
                  key={factor}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#E1E1E1] text-xs sm:text-sm text-[#191919]"
                >
                  <Check className="w-4 h-4 text-[#103CE7] flex-shrink-0" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Callouts */}
          <div className="lg:col-span-5 space-y-4">
            {/* Callout 1 */}
            <div className="p-6 rounded-2xl bg-[#000229] text-white border border-white/10 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6004]">
                <ShieldCheck className="w-4 h-4" />
                <span>Operating Standard</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-snug">
                SalesNego does not operate as a pay-per-meeting appointment-setting service.
              </p>
            </div>

            {/* Callout 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#103CE7]">
                <Users2 className="w-4 h-4" />
                <span>Limited Portfolio</span>
              </div>
              <p className="text-sm text-[#606060] leading-relaxed">
                To preserve founder-level involvement and commercial context, SalesNego works with a <strong className="text-[#191919]">deliberately limited number of active clients</strong> at one time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
