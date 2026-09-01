import { Bot, UserCheck, Sparkles, Check, ArrowRight, ShieldCheck, Database, Cpu, Brain, Handshake, Award } from 'lucide-react';

interface TaskCategory {
  title: string;
  subtitle: string;
  icon: typeof Bot;
  items: string[];
}

const AI_CATEGORIES: TaskCategory[] = [
  {
    title: '1. Intelligence & Signals',
    subtitle: 'High-velocity market discovery & trigger detection',
    icon: Brain,
    items: [
      'Real-time account trigger & buying signal monitoring',
      'Target account & competitive research summarization',
      'Multi-source intent data aggregation & filtering',
    ],
  },
  {
    title: '2. Data Enrichment & Hygiene',
    subtitle: 'Automated CRM data accuracy & contact mapping',
    icon: Database,
    items: [
      'Buying committee contact discovery & verification',
      'Automated CRM meeting data capture & enrichment',
      'Firmographic & technographic attribute hygiene',
    ],
  },
  {
    title: '3. Workflow Orchestration',
    subtitle: 'Algorithmic preparation & administrative execution',
    icon: Cpu,
    items: [
      'Personalization drafting & sequence operations',
      'Pre-meeting context briefing & account snapshots',
      'Post-call action item logging & follow-up routing',
    ],
  },
];

const HUMAN_CATEGORIES: TaskCategory[] = [
  {
    title: '1. Senior Deal Strategy',
    subtitle: 'Strategic qualification & commercial architecture',
    icon: ShieldCheck,
    items: [
      'Market selection & high-value ICP prioritization',
      'Complex business problem & ROI impact diagnosis',
      'Custom commercial business-case architecture',
    ],
  },
  {
    title: '2. Stakeholder Negotiation',
    subtitle: 'Multi-threaded alignment & commercial closure',
    icon: Handshake,
    items: [
      'Buying committee consensus & objection handling',
      'Value-based pricing, terms structuring & closing',
      'Enterprise security & procurement navigation',
    ],
  },
  {
    title: '3. Trust & Executive Positioning',
    subtitle: 'Credibility, narrative & long-term retention',
    icon: Award,
    items: [
      'Executive-level consultative discovery sessions',
      'Technical credibility & solution alignment proof',
      'Strategic customer relationship & account expansion',
    ],
  },
];

export default function AiHumanLed() {
  return (
    <section id="ai-revops" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            AI IN THE COMMERCIAL SYSTEM
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Automate the workload. Keep commercial judgment human.
          </h2>
          <p className="text-base sm:text-lg text-[#606060] leading-relaxed">
            AI materially accelerates execution speed and operational bandwidth. Strategic decisions, buyer discovery, objection handling, and executive negotiations remain strictly human-led.
          </p>
        </div>

        {/* Structured 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Automated Workload (AI & Automation Support) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FE] border border-[#E1E1E1] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E1E1E1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#103CE7]/10 text-[#103CE7] flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#000229] uppercase tracking-wide">
                      Automated Workload
                    </h3>
                    <span className="text-xs text-[#606060]">AI & RevOps Infrastructure Support</span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-white border border-[#E1E1E1] text-[#103CE7]">
                  Speed & Scale
                </span>
              </div>

              {/* 3 Structured Functional Categories */}
              <div className="space-y-4 pt-1">
                {AI_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.title}
                      className="p-4 sm:p-5 rounded-xl bg-white border border-[#E1E1E1] shadow-2xs hover:border-[#103CE7]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#103CE7]/10 text-[#103CE7] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#000229]">
                            {cat.title}
                          </h4>
                          <p className="text-[11px] text-[#606060] font-medium">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-1.5 pl-9">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-[#606060]">
                            <Sparkles className="w-3.5 h-3.5 text-[#103CE7] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-[#606060] border-t border-[#E1E1E1]/80 flex items-center justify-between">
              <span>Execution Layer: Data & Automation</span>
              <span className="text-[#103CE7] font-bold">100% Systemized</span>
            </div>
          </div>

          {/* Column 2: Senior Commercial Judgment */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#000229] shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E1E1E1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6004]/10 text-[#FF6004] flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#000229] uppercase tracking-wide">
                      Human Commercial Judgment
                    </h3>
                    <span className="text-xs text-[#606060]">Senior Founder-Led Execution</span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#000229] text-white">
                  Strategy & Trust
                </span>
              </div>

              {/* 3 Structured Functional Categories */}
              <div className="space-y-4 pt-1">
                {HUMAN_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.title}
                      className="p-4 sm:p-5 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] shadow-2xs hover:border-[#FF6004]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#FF6004]/10 text-[#FF6004] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#000229]">
                            {cat.title}
                          </h4>
                          <p className="text-[11px] text-[#606060] font-medium">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-1.5 pl-9">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-[#191919] font-medium">
                            <Check className="w-3.5 h-3.5 text-[#FF6004] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-[#606060] border-t border-[#E1E1E1]/80 flex items-center justify-between">
              <span>Decision Layer: Commercial Context & Deals</span>
              <span className="text-[#FF6004] font-bold">100% Human-Led</span>
            </div>
          </div>
        </div>

        {/* Bottom Synthesis Callout */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#000229] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base sm:text-lg font-bold tracking-tight text-center sm:text-left">
            AI increases execution bandwidth.{' '}
            <span className="text-[#64E9FF]">Commercial judgment determines where and how that bandwidth converts into revenue.</span>
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6004] hover:bg-[#FE9E30] text-white text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0"
          >
            Discuss Execution
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
