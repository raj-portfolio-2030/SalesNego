import { TrendingUp, Clock, ShieldCheck, Building2 } from 'lucide-react';

interface MetricItem {
  id: string;
  value: string;
  subtitle: string;
  detail: string;
  icon: typeof TrendingUp;
  badge: string;
}

const EXECUTION_METRICS: MetricItem[] = [
  {
    id: 'metric-conversion',
    value: '+34%',
    subtitle: 'Pipeline Conversion Lift',
    detail: 'Across multi-stakeholder enterprise cycles',
    icon: TrendingUp,
    badge: 'Conversion Velocity',
  },
  {
    id: 'metric-closure',
    value: '1.8x',
    subtitle: 'Faster Deal Closure',
    detail: 'Reduced average cycle length from 90 to 52 days',
    icon: Clock,
    badge: 'Cycle Reduction',
  },
  {
    id: 'metric-stagnation',
    value: '40%',
    subtitle: 'Reduction in Stagnation',
    detail: 'Eliminated mid-funnel buyer stalling',
    icon: ShieldCheck,
    badge: 'Momentum Control',
  },
];

export default function ClientProof() {
  return (
    <section id="clients" className="bg-[#F7F9FE] border-b border-[#E1E1E1] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header / Kicker */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
              OPERATIONAL EXECUTION BENCHMARKS
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000229] tracking-tight">
              Relative Performance & Velocity Indicators
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#606060] max-w-xs">
            Measured across active early-stage B2B client portfolio engagements.
          </p>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6" id="client-metrics-grid">
          {EXECUTION_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                id={metric.id}
                className="bg-white rounded-2xl border border-[#E1E1E1] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,2,41,0.03)] hover:shadow-[0_8px_30px_rgba(0,2,41,0.06)] hover:border-[#103CE7]/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Row: Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#606060] group-hover:text-[#103CE7] group-hover:border-[#103CE7]/20 transition-colors">
                      {metric.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1] text-[#103CE7] flex items-center justify-center group-hover:bg-[#103CE7] group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Primary Metric Value */}
                  <div className="pt-2">
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#000229] tracking-tight font-display">
                      {metric.value}
                    </div>
                    <h3 className="mt-2 text-base sm:text-lg font-bold text-[#000229] tracking-tight">
                      {metric.subtitle}
                    </h3>
                  </div>
                </div>

                {/* Bottom Context / Detail */}
                <div className="mt-6 pt-4 border-t border-[#E1E1E1]/70">
                  <p className="text-sm text-[#606060] leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anonymized ICP Trust Bar */}
        <div
          id="icp-trust-bar"
          className="bg-white rounded-xl border border-[#E1E1E1] px-5 py-4 sm:px-6 sm:py-4.5 shadow-xs flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-[#103CE7]/10 text-[#103CE7] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#000229] tracking-tight">
            Trusted by B2B Tech Leaders in <span className="text-[#103CE7]">Series-A SaaS</span>, <span className="text-[#FF6004]">AI Infrastructure</span>, & <span className="text-[#000229]">Enterprise Software</span>
          </p>
        </div>
      </div>
    </section>
  );
}

