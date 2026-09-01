import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Globe,
  Filter,
  Users,
  Target,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  Building,
  Check,
} from 'lucide-react';

interface StageMeta {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
}

const STAGES: StageMeta[] = [
  {
    id: 'market-universe',
    stageNumber: '01',
    title: 'MARKET UNIVERSE',
    subtitle: 'Start broad. Understand the landscape.',
  },
  {
    id: 'fit-signals',
    stageNumber: '02',
    title: 'FIT & SIGNALS',
    subtitle: 'Filter for relevance, not volume.',
  },
  {
    id: 'buyer-trigger',
    stageNumber: '03',
    title: 'BUYER & TRIGGER INTELLIGENCE',
    subtitle: 'Understand why the account may matter now.',
  },
  {
    id: 'account-prioritization',
    stageNumber: '04',
    title: 'ACCOUNT PRIORITIZATION',
    subtitle: 'Focus commercial effort where evidence is strongest.',
  },
];

const STAGE_DURATION_MS = 3500; // ~14 seconds total cycle (~15-20% faster, highly fluid)

export default function MarketIntelligenceVisual() {
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  // Listen to tab visibility
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

  // Main animation timer loop
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
        setActiveStage((prev) => (prev + 1) % STAGES.length);
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
  }, [activeStage, isPaused, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsPaused(true);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsPaused(false);
  }, [prefersReducedMotion]);

  const handleManualStageSelect = useCallback((index: number) => {
    setActiveStage(index);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  return (
    <div
      className="w-full bg-[#F7F9FE] rounded-2xl border border-[#E1E1E1] shadow-xs overflow-hidden text-[#191919] flex flex-col transition-all duration-300 ease-flow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Interactive GTM & Market Intelligence Visualization"
      tabIndex={0}
    >
      {/* Visual Header Strip with Stage Navigation */}
      <div className="p-4 sm:p-5 bg-white border-b border-[#E1E1E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider text-[#103CE7] bg-[#103CE7]/10 border border-[#103CE7]/20">
              STAGE {STAGES[activeStage].stageNumber}
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#000229]">
              {STAGES[activeStage].title}
            </h3>
          </div>
          <p className="text-xs text-[#606060] font-medium transition-opacity duration-300">
            {STAGES[activeStage].subtitle}
          </p>
        </div>

        {/* 4 Interactive Stage Navigation Tabs */}
        <div
          className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F7F9FE] p-1 rounded-xl border border-[#E1E1E1] shadow-2xs"
          role="tablist"
          aria-label="Market Intelligence Stages"
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
                    : 'text-[#606060] hover:text-[#000229] hover:bg-white'
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
      <div className="relative p-4 sm:p-6 min-h-[350px] sm:min-h-[370px] flex flex-col justify-center bg-[#F7F9FE] overflow-hidden">
        {/* Subtle background technical grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000229 1px, transparent 1px), linear-gradient(to bottom, #000229 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* ============================================================ */}
        {/* STAGE 01: MARKET UNIVERSE */}
        {/* ============================================================ */}
        {activeStage === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Top Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 font-mono font-semibold text-[#000229]">
                <Globe className="w-3.5 h-3.5 text-[#103CE7]" />
                <span>Broad Market Landscape Mapping</span>
              </div>
              <span className="text-[11px] font-mono text-[#808080] bg-white px-2 py-0.5 rounded border border-slate-200">
                Segment Topology Active
              </span>
            </div>

            {/* Distributed Network of Segment Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Left Column: Category Clusters */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#808080]">
                  Target Categories
                </div>
                <div className="space-y-1.5">
                  {[
                    { name: 'Enterprise Infrastructure', geo: 'NA / EMEA', density: 'High Density' },
                    { name: 'AI & Decision Software', geo: 'Global', density: 'Emerging Scale' },
                    { name: 'Financial & Trading Tech', geo: 'UK / UAE / US', density: 'Regulated' },
                    { name: 'Laboratory & HealthTech', geo: 'North America', density: 'Specialized' },
                  ].map((seg, i) => (
                    <div
                      key={seg.name}
                      className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs transition-all hover:border-[#103CE7]/30 shadow-2xs"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <div>
                        <div className="font-bold text-[#000229]">{seg.name}</div>
                        <div className="text-[10px] text-[#808080] font-mono">{seg.geo}</div>
                      </div>
                      <span className="text-[9px] font-mono text-[#103CE7] bg-[#103CE7]/5 px-1.5 py-0.5 rounded border border-[#103CE7]/15">
                        {seg.density}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle/Right: Visual Matrix Grid of Account Nodes */}
              <div className="md:col-span-8 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#606060]">
                  <span>Market Universe Node Distribution</span>
                  <span className="text-[#103CE7] font-bold">Unfiltered Market Space</span>
                </div>

                {/* SVG Node Constellation */}
                <div className="relative h-40 w-full bg-[#F7F9FE] rounded-lg border border-slate-200/80 overflow-hidden flex items-center justify-center p-3">
                  <svg className="w-full h-full" viewBox="0 0 400 140" fill="none">
                    {/* Connecting Matrix lines */}
                    <line x1="40" y1="40" x2="110" y2="75" stroke="#103CE7" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="110" y1="75" x2="190" y2="35" stroke="#103CE7" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="190" y1="35" x2="260" y2="85" stroke="#103CE7" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="260" y1="85" x2="340" y2="45" stroke="#103CE7" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="110" y1="75" x2="160" y2="115" stroke="#64E9FF" strokeOpacity="0.3" strokeWidth="1" />
                    <line x1="190" y1="35" x2="290" y2="30" stroke="#64E9FF" strokeOpacity="0.3" strokeWidth="1" />
                    <line x1="160" y1="115" x2="260" y2="85" stroke="#103CE7" strokeOpacity="0.2" strokeWidth="1" />

                    {/* Generic Account Nodes */}
                    <circle cx="40" cy="40" r="7" fill="#E1E1E1" />
                    <circle cx="75" cy="100" r="5" fill="#E1E1E1" />
                    <circle cx="110" cy="75" r="9" fill="#103CE7" fillOpacity="0.85" />
                    <circle cx="140" cy="30" r="6" fill="#E1E1E1" />
                    <circle cx="160" cy="115" r="8" fill="#103CE7" fillOpacity="0.65" />
                    <circle cx="190" cy="35" r="10" fill="#103CE7" />
                    <circle cx="225" cy="70" r="6" fill="#E1E1E1" />
                    <circle cx="260" cy="85" r="9" fill="#103CE7" fillOpacity="0.75" />
                    <circle cx="290" cy="30" r="7" fill="#64E9FF" />
                    <circle cx="340" cy="45" r="11" fill="#103CE7" />
                    <circle cx="365" cy="105" r="6" fill="#E1E1E1" />
                    <circle cx="310" cy="110" r="5" fill="#E1E1E1" />
                  </svg>

                  {/* Overlay Node Indicators */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#606060] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded border border-slate-200">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#103CE7]" /> High-Relevance Clusters
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#E1E1E1]" /> General Market Entities
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#606060]">
                  <span>Scope: Multi-Segment, Geographies & Buyer Roles</span>
                  <span className="font-mono text-[#103CE7] font-semibold">Moving to ICP Filtering →</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 02: FIT & SIGNALS */}
        {/* ============================================================ */}
        {activeStage === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 font-mono font-semibold text-[#000229]">
                <Filter className="w-3.5 h-3.5 text-[#103CE7]" />
                <span>ICP Filtering & Multi-Dimensional Relevance</span>
              </div>
              <span className="text-[11px] font-mono text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded border border-[#103CE7]/20 font-bold">
                Quality Over Volume
              </span>
            </div>

            {/* Systematic 3-Part Flow: Market -> ICP Filter -> Relevant Accounts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 1: Raw Market */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 opacity-70 space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase text-[#808080]">
                  01 • RAW MARKET
                </div>
                <div className="text-xs font-bold text-[#000229]">Broad Account Base</div>
                <p className="text-[11px] text-[#606060] leading-snug">
                  Unqualified volume containing high noise, misaligned deal sizes, and low commercial urgency.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#808080]">
                  <span>Filtered Out</span>
                  <span className="line-through">Random Outreach</span>
                </div>
              </div>

              {/* Step 2: Active Filter Engine */}
              <div className="p-3.5 rounded-xl bg-[#103CE7]/5 border-2 border-[#103CE7] shadow-xs space-y-2.5">
                <div className="text-[10px] font-mono font-bold uppercase text-[#103CE7] flex items-center justify-between">
                  <span>02 • ICP RULE ENGINE</span>
                  <Filter className="w-3 h-3 text-[#103CE7]" />
                </div>
                <div className="space-y-1.5">
                  {[
                    'Revenue & Tech Stack Match',
                    'Strategic Growth Initiative',
                    'Enterprise Complexity Fit',
                    'Active Regulatory / Market Shift',
                  ].map((filterItem) => (
                    <div
                      key={filterItem}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-[#000229] bg-white px-2 py-1 rounded border border-slate-200"
                    >
                      <Check className="w-3 h-3 text-[#103CE7] flex-shrink-0" />
                      <span className="truncate">{filterItem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Qualified Relevant Cohort */}
              <div className="p-3.5 rounded-xl bg-white border-2 border-[#FF6004]/40 shadow-xs space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase text-[#FF6004] flex items-center justify-between">
                  <span>03 • RELEVANT COHORT</span>
                  <Target className="w-3 h-3 text-[#FF6004]" />
                </div>
                <div className="text-xs font-extrabold text-[#000229]">Filtered Precision Cohort</div>
                <p className="text-[11px] text-[#606060] leading-snug">
                  Accounts that meet concrete commercial criteria with strong organizational readiness for solution engagement.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#FF6004] font-bold">
                  <span>Focus Group Ready</span>
                  <span>High Relevance ✓</span>
                </div>
              </div>
            </div>

            {/* Bottom Methodology Takeaway */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-[#606060] font-medium">
                Eliminating low-fit accounts early protects executive time and brand credibility.
              </span>
              <span className="text-[11px] font-mono font-bold text-[#103CE7] flex items-center gap-1">
                Next: Buyer & Trigger Mapping <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 03: BUYERS + TRIGGERS */}
        {/* ============================================================ */}
        {activeStage === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 font-mono font-semibold text-[#000229]">
                <Users className="w-3.5 h-3.5 text-[#103CE7]" />
                <span>Buying Committee Mapping & Commercial Triggers</span>
              </div>
              <span className="text-[11px] font-mono text-[#64E9FF] bg-[#000229] px-2 py-0.5 rounded font-bold">
                Why Act Now
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Column: 4 Connected Buyer Roles */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div className="text-[10px] font-mono font-bold uppercase text-[#808080] flex items-center justify-between">
                  <span>Connected Buying Committee</span>
                  <Users className="w-3 h-3 text-[#103CE7]" />
                </div>
                <div className="space-y-1.5">
                  {[
                    { role: 'Economic Buyer', focus: 'Budget allocation & ROI sign-off', tag: 'CRO / CFO' },
                    { role: 'Operational Buyer', focus: 'Workflow execution & adoption', tag: 'VP RevOps / Head of Sales' },
                    { role: 'Technical Buyer', focus: 'Security, architecture & data sync', tag: 'VP Eng / CTO' },
                    { role: 'Internal Champion', focus: 'Commercial urgency & problem owner', tag: 'Director of Growth' },
                  ].map((buyer) => (
                    <div
                      key={buyer.role}
                      className="p-2 rounded-lg bg-[#F7F9FE] border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#000229] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#103CE7]" />
                          <span>{buyer.role}</span>
                        </div>
                        <div className="text-[10px] text-[#606060]">{buyer.focus}</div>
                      </div>
                      <span className="text-[9px] font-mono text-[#103CE7] bg-white px-1.5 py-0.5 rounded border border-slate-200 font-semibold">
                        {buyer.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Verifiable Commercial Triggers */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div className="text-[10px] font-mono font-bold uppercase text-[#808080] flex items-center justify-between">
                  <span>Verifiable Trigger Indicators</span>
                  <Activity className="w-3 h-3 text-[#FF6004]" />
                </div>
                <div className="space-y-1.5">
                  {[
                    { title: 'Executive Leadership Transition', note: 'New commercial mandate & strategy reset' },
                    { title: 'New Market / Geography Expansion', note: 'Entering North America or EMEA' },
                    { title: 'Technology Infrastructure Modernization', note: 'Consolidating legacy stack' },
                    { title: 'Operational Scale Challenge', note: 'Revenue bottleneck requiring execution support' },
                  ].map((trig) => (
                    <div
                      key={trig.title}
                      className="p-2 rounded-lg bg-white border border-slate-200 flex items-start gap-2 text-xs hover:border-[#FF6004]/40 transition-colors"
                    >
                      <div className="p-1 rounded bg-[#FF6004]/10 text-[#FF6004] mt-0.5">
                        <Zap className="w-3 h-3" />
                      </div>
                      <div>
                        <div className="font-bold text-[#000229]">{trig.title}</div>
                        <div className="text-[10px] text-[#606060]">{trig.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="p-2.5 rounded-lg bg-[#000229] text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#64E9FF]" />
                <span>Buyer mapping + verifiable trigger = Validated outreach hypothesis</span>
              </div>
              <span className="text-[10px] font-mono text-[#FF6004] font-bold">
                Progressing to Prioritization →
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 04: ACCOUNT PRIORITIZATION */}
        {/* ============================================================ */}
        {activeStage === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 font-mono font-semibold text-[#000229]">
                <Target className="w-3.5 h-3.5 text-[#FF6004]" />
                <span>5-Dimensional Account Prioritization</span>
              </div>
              <span className="text-[11px] font-mono text-[#FF6004] bg-[#FF6004]/10 px-2 py-0.5 rounded border border-[#FF6004]/30 font-bold">
                Evidence-Backed Focus
              </span>
            </div>

            {/* 3 Priority Account Examples with 5 Criteria Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  tier: 'TIER 1 PRIORITY',
                  type: 'Enterprise Cloud Infrastructure',
                  signal: 'Leadership Shift + Active RFP',
                  tagColor: 'bg-[#FF6004] text-white',
                  borderColor: 'border-[#FF6004]',
                },
                {
                  tier: 'TIER 1 PRIORITY',
                  type: 'AI Decision SaaS ($25M ARR)',
                  signal: 'US Expansion + Commercial Restructure',
                  tagColor: 'bg-[#FF6004] text-white',
                  borderColor: 'border-[#FF6004]',
                },
                {
                  tier: 'TIER 2 PRIORITY',
                  type: 'Specialized FinTech Platform',
                  signal: 'Regulatory Deadline in EMEA',
                  tagColor: 'bg-[#103CE7] text-white',
                  borderColor: 'border-[#103CE7]/40',
                },
              ].map((acc, i) => (
                <div
                  key={acc.type}
                  className={`p-3.5 rounded-xl bg-white border-2 ${acc.borderColor} shadow-xs space-y-2.5 flex flex-col justify-between`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${acc.tagColor}`}>
                        {acc.tier}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#103CE7]" />
                    </div>
                    <div className="text-xs font-extrabold text-[#000229] mt-2">
                      {acc.type}
                    </div>
                    <div className="text-[10px] text-[#606060] font-mono mt-0.5">
                      {acc.signal}
                    </div>
                  </div>

                  {/* 5-Criteria Signal Indicators (No fake numbers/percentages) */}
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="text-[9px] font-mono uppercase text-[#808080] font-bold">
                      Scoring Dimensions:
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-[8px] font-mono font-bold text-center">
                      {[
                        { label: 'FIT', active: true },
                        { label: 'TRIGGER', active: true },
                        { label: 'PAIN', active: true },
                        { label: 'ACCESS', active: true },
                        { label: 'EXPAND', active: i < 2 },
                      ].map((dim) => (
                        <div
                          key={dim.label}
                          className={`py-1 rounded border ${
                            dim.active
                              ? 'bg-[#103CE7]/10 text-[#103CE7] border-[#103CE7]/25'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                        >
                          {dim.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progression Summary Strip */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold text-[#000229]">
                <span>MANY ACCOUNTS</span>
                <span className="text-[#808080]">→</span>
                <span>RELEVANT ACCOUNTS</span>
                <span className="text-[#808080]">→</span>
                <span>EVIDENCE-BACKED</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#FF6004]">PRIORITY ACCOUNTS</span>
              </div>
              <div className="px-3 py-1 rounded bg-[#000229] text-white font-mono text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0">
                <span>NEXT STAGE: ENGAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6004]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Key SalesNego Discipline Strip */}
      <div className="px-4 py-3 bg-white border-t border-[#E1E1E1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded border border-[#103CE7]/20">
            DISCIPLINE
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-extrabold text-[#000229]">
            <span>FACT</span>
            <span className="text-[#FE9E30]">→</span>
            <span>HYPOTHESIS</span>
            <span className="text-[#FE9E30]">→</span>
            <span>DISCOVERY QUESTION</span>
          </div>
        </div>

        <p className="text-[11px] text-[#606060] font-medium italic sm:text-right">
          Evidence earns priority. Discovery earns qualification.
        </p>
      </div>

      {/* Bottom Progress Bar & Stage Status Footer */}
      <div className="px-4 py-2.5 bg-[#F7F9FE] border-t border-slate-200/80 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#606060]">
          <span className="w-2 h-2 rounded-full bg-[#103CE7] animate-pulse" />
          <span className="text-[11px]">
            {isPaused
              ? 'Paused (Hover / User Active)'
              : prefersReducedMotion
              ? 'Reduced Motion (Manual)'
              : 'Auto-cycling GTM intelligence pathway'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-[120px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#103CE7] transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Quick Next Button */}
        <button
          type="button"
          onClick={() => handleManualStageSelect((activeStage + 1) % STAGES.length)}
          className="text-[#606060] hover:text-[#000229] p-1 rounded transition-colors flex items-center gap-1 text-[11px]"
          aria-label="Next GTM stage"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
