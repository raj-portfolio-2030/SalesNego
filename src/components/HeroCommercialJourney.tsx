import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity,
  Layers,
  CheckCircle2,
  TrendingUp,
  Filter,
  ShieldCheck,
  Zap,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Database,
  Building2,
  ChevronRight,
} from 'lucide-react';

export interface StageData {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  leftContext: string;
}

export const STAGES: StageData[] = [
  {
    id: 'understand',
    stageNumber: '01',
    title: 'UNDERSTAND: MARKET INTELLIGENCE',
    subtitle: 'Identify target accounts, verified signals, and buyer context.',
    leftContext: 'UNDERSTAND (GTM & Market Signals)',
  },
  {
    id: 'build',
    stageNumber: '02',
    title: 'BUILD: REVOPS & AI ENGINE',
    subtitle: 'Systemize workflows, data hygiene, and pipeline governance.',
    leftContext: 'BUILD (RevOps & AI Architecture)',
  },
  {
    id: 'convert',
    stageNumber: '03',
    title: 'CONVERT: COMMERCIAL EXECUTION',
    subtitle: 'Lead discovery, qualification, negotiation, and closure.',
    leftContext: 'CONVERT (Discovery to Closure)',
  },
  {
    id: 'grow',
    stageNumber: '04',
    title: 'GROW: ACCOUNT EXPANSION',
    subtitle: 'Secure adoption, retain champions, and expand accounts.',
    leftContext: 'GROW (Account Expansion & Retention)',
  },
];

const STAGE_DURATION_MS = 4200; // Refined ~15-20% faster, natural continuous flow

interface HeroCommercialJourneyProps {
  activeStage: number;
  onStageChange: (index: number) => void;
}

export default function HeroCommercialJourney({
  activeStage,
  onStageChange,
}: HeroCommercialJourneyProps) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepInStage3, setStepInStage3] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Listen to tab visibility to pause and resume accurately
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Stage 3 internal step progression
  useEffect(() => {
    if (activeStage !== 2 || prefersReducedMotion) {
      setStepInStage3(0);
      return;
    }

    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setStepInStage3((prev) => (prev + 1) % 7);
    }, 600);

    return () => clearInterval(interval);
  }, [activeStage, isPaused, prefersReducedMotion]);

  // Main animation timer loop - instant pause/resume, continuous flow
  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      return;
    }

    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      elapsedBeforePauseRef.current = elapsed;
      const pct = Math.min(100, (elapsed / STAGE_DURATION_MS) * 100);
      setProgress(pct);

      if (pct >= 100) {
        elapsedBeforePauseRef.current = 0;
        setProgress(0);
        onStageChange((activeStage + 1) % STAGES.length);
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [activeStage, isPaused, prefersReducedMotion, onStageChange]);

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsPaused(true);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsPaused(false);
  }, [prefersReducedMotion]);

  const handleManualStageSelect = useCallback(
    (index: number) => {
      onStageChange(index);
      setProgress(0);
      elapsedBeforePauseRef.current = 0;
      startTimeRef.current = Date.now();
    },
    [onStageChange]
  );

  return (
    <div
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,2,41,0.28)] overflow-hidden text-[#191919] flex flex-col transition-all duration-300 ease-flow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Interactive Commercial Journey System"
      tabIndex={0}
    >
      {/* Top Header Panel */}
      <div className="p-4 sm:p-5 bg-[#F7F9FE] border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider text-[#103CE7] bg-[#103CE7]/10 border border-[#103CE7]/20">
              STAGE {STAGES[activeStage].stageNumber}
            </span>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#000229]">
              {STAGES[activeStage].title}
            </h2>
          </div>
          <p className="text-xs text-[#606060] font-medium transition-opacity duration-300">
            {STAGES[activeStage].subtitle}
          </p>
        </div>

        {/* 4 Interactive Stage Navigation Tabs */}
        <div
          className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-slate-200 shadow-xs"
          role="tablist"
          aria-label="Commercial Execution Stages"
        >
          {STAGES.map((s, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to stage ${s.stageNumber}: ${s.title}`}
                onClick={() => handleManualStageSelect(idx)}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ease-flow flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#103CE7] focus:ring-offset-1 ${
                  isActive
                    ? 'bg-[#000229] text-white shadow-xs'
                    : 'text-[#606060] hover:text-[#000229] hover:bg-slate-100'
                }`}
              >
                <span>{s.stageNumber}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6004] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dynamic Stage Display Area */}
      <div className="relative p-4 sm:p-6 min-h-[360px] sm:min-h-[380px] flex flex-col justify-center bg-white overflow-hidden">
        {/* Subtle background ambient grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000229 1px, transparent 1px), linear-gradient(to bottom, #000229 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Stage 01: MARKET INTELLIGENCE */}
        {activeStage === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left Column: Signal Sources */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-[11px] uppercase font-bold text-[#808080] tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#103CE7]" />
                  <span>Signal Sources</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'Market Signals', count: '1,420+' },
                    { label: 'Company Data', count: 'Verified' },
                    { label: 'Buyer Activity', count: 'High Intent' },
                    { label: 'Trigger Events', count: 'Executive Move' },
                    { label: 'Competitive Movement', count: 'Active RFP' },
                  ].map((signal, i) => (
                    <div
                      key={signal.label}
                      className="p-2 rounded-lg bg-[#F7F9FE] border border-slate-200/80 flex items-center justify-between text-xs transition-all hover:border-[#103CE7]/30"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#103CE7] animate-ping" />
                        <span className="font-semibold text-[#000229]">{signal.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#103CE7] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {signal.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Column: Filtering Progression */}
              <div className="md:col-span-4 flex flex-col items-center justify-center py-2 space-y-2">
                <div className="w-full p-2.5 rounded-lg bg-[#F7F9FE] border border-slate-200 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#103CE7] tracking-wider">
                    MARKET SIGNALS
                  </span>
                  <div className="flex justify-center gap-1.5 mt-1.5">
                    {[...Array(6)].map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center text-[#103CE7]">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>

                <div className="w-full p-2.5 rounded-lg bg-[#103CE7]/5 border border-[#103CE7]/20 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase font-bold text-[#103CE7]">
                    <Filter className="w-3 h-3" />
                    <span>ICP FILTER</span>
                  </div>
                  <p className="text-[10px] text-[#606060] mt-0.5">SaaS & AI • $10M–$100M ARR</p>
                </div>

                <div className="flex items-center justify-center text-[#103CE7]">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>

                <div className="w-full p-2.5 rounded-lg bg-[#FF6004]/10 border border-[#FF6004]/30 text-center shadow-xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase font-bold text-[#FF6004]">
                    <Target className="w-3 h-3" />
                    <span>PRIORITIZED ACCOUNTS</span>
                  </div>
                  <p className="text-[10px] text-[#000229] font-bold mt-0.5">
                    38 High-Conversion Targets
                  </p>
                </div>
              </div>

              {/* Right Column: Prioritized Target Preview */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-[11px] uppercase font-bold text-[#808080] tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#FF6004]" />
                  <span>Prioritized Account</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border-2 border-[#103CE7]/30 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#000229] text-white flex items-center justify-center text-[11px] font-bold">
                        C
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-[#000229]">CloudScale AI</div>
                        <div className="text-[10px] text-[#808080]">B2B Enterprise Infra</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF6004] text-white shadow-xs">
                      Fit: 96%
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-[#606060]">
                    <div className="flex items-center justify-between">
                      <span>Trigger Event:</span>
                      <span className="font-semibold text-[#000229]">Hiring RevOps VP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Economic Buyer:</span>
                      <span className="font-semibold text-[#103CE7]">Identified (CRO)</span>
                    </div>
                  </div>

                  <div className="p-1.5 rounded bg-[#64E9FF]/15 text-[#000229] text-[10px] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#103CE7]" />
                    <span>Evidence-backed account ready for engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 02: REVOPS + AI */}
        {activeStage === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Top Operational Hub Header */}
            <div className="p-3 rounded-xl bg-[#000229] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#103CE7] text-white flex items-center justify-center">
                  <Database className="w-4 h-4 text-[#64E9FF]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white flex items-center gap-2">
                    <span>Commercial Orchestration Hub</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#103CE7] text-[#64E9FF]">
                      LIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    Data Flow & Intelligence Engine
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-[#64E9FF] font-bold">
                  99.8% Data Accuracy
                </span>
              </div>
            </div>

            {/* 6 Connected Operational Modules */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                {
                  title: 'CRM Infrastructure',
                  desc: 'Clean attribution & unified pipeline',
                  icon: Database,
                  badge: 'Connected',
                  color: 'text-[#103CE7] bg-[#103CE7]/10',
                },
                {
                  title: 'Data Enrichment',
                  desc: 'Real-time multi-source data sync',
                  icon: Sparkles,
                  badge: 'Verified',
                  color: 'text-[#103CE7] bg-[#103CE7]/10',
                },
                {
                  title: 'Account Scoring',
                  desc: 'Proprietary intent & tier ranking',
                  icon: Target,
                  badge: 'Tier 1 Priority',
                  color: 'text-[#FF6004] bg-[#FF6004]/10',
                },
                {
                  title: 'Trigger Monitoring',
                  desc: 'Executive shifts & RFP indicators',
                  icon: Activity,
                  badge: '3 Active Signals',
                  color: 'text-[#103CE7] bg-[#103CE7]/10',
                },
                {
                  title: 'Workflow Automation',
                  desc: 'Multi-threaded buyer orchestration',
                  icon: Zap,
                  badge: 'Automated',
                  color: 'text-[#103CE7] bg-[#103CE7]/10',
                },
                {
                  title: 'Pipeline Intelligence',
                  desc: 'Deal velocity & risk forecasting',
                  icon: TrendingUp,
                  badge: 'Engaged',
                  color: 'text-[#FF6004] bg-[#FF6004]/10',
                },
              ].map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.title}
                    className="p-3 rounded-xl bg-[#F7F9FE] border border-slate-200 hover:border-[#103CE7]/40 transition-all flex flex-col justify-between space-y-2 group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg ${mod.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#000229]">
                        {mod.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#000229] group-hover:text-[#103CE7] transition-colors">
                        {mod.title}
                      </div>
                      <div className="text-[10px] text-[#606060] leading-snug mt-0.5">
                        {mod.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Output Flow Banner */}
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Qualified account intelligence dispatched to founder-led sales team</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">
                Ready for Execution →
              </span>
            </div>
          </div>
        )}

        {/* Stage 03: COMMERCIAL EXECUTION */}
        {activeStage === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Active Opportunity Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6004] animate-pulse" />
                <span className="text-xs font-extrabold text-[#000229]">
                  Active Opportunity: <span className="text-[#103CE7]">Enterprise Tier 1</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#606060]">
                Deal Stage: <strong className="text-[#FF6004]">Stage 0{stepInStage3 + 1}/07</strong>
              </span>
            </div>

            {/* 7-Stage Horizontal Pipeline Pathway */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {[
                { name: 'ENGAGE', type: 'discovery' },
                { name: 'DISCOVER', type: 'discovery' },
                { name: 'QUALIFY', type: 'discovery' },
                { name: 'SOLUTION', type: 'eval' },
                { name: 'PROPOSAL', type: 'eval' },
                { name: 'NEGOTIATE', type: 'closing' },
                { name: 'CLOSE', type: 'closing' },
              ].map((step, idx) => {
                const isCurrent = stepInStage3 === idx;
                const isPassed = stepInStage3 > idx;

                let cardStyle = 'bg-[#F7F9FE] border-slate-200 text-[#808080]';
                if (isCurrent) {
                  cardStyle =
                    step.type === 'closing'
                      ? 'bg-[#FF6004] border-[#FF6004] text-white shadow-md scale-105'
                      : 'bg-[#103CE7] border-[#103CE7] text-white shadow-md scale-105';
                } else if (isPassed) {
                  cardStyle = 'bg-[#103CE7]/10 border-[#103CE7]/30 text-[#103CE7]';
                }

                return (
                  <div
                    key={step.name}
                    className={`p-2 rounded-lg border text-center transition-all duration-300 flex flex-col items-center justify-center ${cardStyle}`}
                  >
                    <div className="text-[9px] font-mono opacity-80 mb-0.5">0{idx + 1}</div>
                    <div className="text-[10px] font-extrabold tracking-tight truncate w-full">
                      {step.name}
                    </div>
                    {isPassed && <CheckCircle2 className="w-3 h-3 mt-1 text-[#103CE7]" />}
                  </div>
                );
              })}
            </div>

            {/* Active Stage Detail & Stakeholder Consensus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#F7F9FE] border border-slate-200 space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-[#808080]">
                  Commercial Execution Milestone
                </span>
                <div className="text-xs font-bold text-[#000229] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#103CE7]" />
                  <span>
                    {stepInStage3 < 3
                      ? 'Deep Problem Discovery & Champion Alignment'
                      : stepInStage3 < 5
                      ? 'Solution Value Mapping & Economic Justification'
                      : 'Contract Terms, Security Verification & Sign-off'}
                  </span>
                </div>
                <p className="text-[11px] text-[#606060] leading-relaxed">
                  Founder-level commercial leadership guiding multi-stakeholder consensus and mitigating deal
                  stall risks.
                </p>
              </div>

              {/* Stakeholders Matrix */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-[#808080]">
                  Stakeholder Consensus Matrix
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#000229] font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#103CE7]" />
                      Executive Champion
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Aligned ✓
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#000229] font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FF6004]" />
                      Economic Buyer / CRO
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Approved ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resolved Outcome Strip */}
            <div className="p-2.5 rounded-lg bg-[#000229] text-white flex items-center justify-between text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#64E9FF]" />
                <span className="font-bold">Result: Closed Revenue & Verified Commercial Terms</span>
              </div>
              <span className="text-[10px] font-mono text-[#FF6004] font-bold">
                Transition to Account Growth →
              </span>
            </div>
          </div>
        )}

        {/* Stage 04: CUSTOMER GROWTH */}
        {activeStage === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Core Land Foundation Node */}
            <div className="p-3 rounded-xl bg-[#000229] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FF6004] text-white flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">
                    Initial Won Account: Enterprise Node
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    Year 1 Initial Scope Successfully Deployed
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-white/10 text-[#64E9FF] text-[10px] font-mono font-bold">
                Health Score: 98%
              </div>
            </div>

            {/* 4-Stage Lifecycle Progression */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {
                  stage: 'LAND',
                  desc: 'Initial team adoption & fast time-to-value',
                  status: 'Completed',
                  color: 'border-[#103CE7]/30 bg-[#103CE7]/5 text-[#103CE7]',
                },
                {
                  stage: 'ADOPT',
                  desc: 'Usage depth & executive value validation',
                  status: 'Active',
                  color: 'border-[#103CE7]/30 bg-[#103CE7]/5 text-[#103CE7]',
                },
                {
                  stage: 'EXPAND',
                  desc: 'New business units, teams & tier upgrades',
                  status: 'Expansion Opportunity',
                  color: 'border-[#FF6004]/40 bg-[#FF6004]/10 text-[#FF6004]',
                },
                {
                  stage: 'RETAIN',
                  desc: 'Multi-year renewals & continuous partnership',
                  status: 'Protected',
                  color: 'border-emerald-300 bg-emerald-50 text-emerald-700',
                },
              ].map((item, i) => (
                <div
                  key={item.stage}
                  className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 ${item.color}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div>
                    <div className="text-xs font-extrabold tracking-wide">{item.stage}</div>
                    <div className="text-[10px] text-[#606060] leading-snug mt-1">{item.desc}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[9px] font-mono font-bold">
                    <span>{item.status}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

            {/* Expansion Pathway Nodes */}
            <div className="p-3.5 rounded-xl bg-[#F7F9FE] border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-[#808080] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#FF6004]" />
                  <span>Expansion Pathways Connected</span>
                </span>
                <span className="text-[10px] font-mono text-[#103CE7] font-bold">
                  +185% Net Revenue Retention (NRR)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-[#000229]">Regional Ops Unit</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6004]" />
                  <span className="font-semibold text-[#000229]">AI Workflow Tier</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#103CE7]" />
                  <span className="font-semibold text-[#000229]">Multi-Year Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar & Stage Status Footer */}
      <div className="px-4 py-3 bg-[#F7F9FE] border-t border-slate-200/80 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#606060]">
          <span className="w-2 h-2 rounded-full bg-[#103CE7] animate-pulse" />
          <span className="text-[11px]">
            {isPaused
              ? 'Paused (Hover / Active Interaction)'
              : prefersReducedMotion
              ? 'Motion Reduced (Manual)'
              : 'Auto-cycling commercial journey'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-[140px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#103CE7] transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Quick Restart / Loop indicator */}
        <button
          type="button"
          onClick={() => handleManualStageSelect((activeStage + 1) % STAGES.length)}
          className="text-[#606060] hover:text-[#000229] p-1 rounded transition-colors flex items-center gap-1 text-[11px]"
          aria-label="Next commercial stage"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
