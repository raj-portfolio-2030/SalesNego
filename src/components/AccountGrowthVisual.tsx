import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Users2,
  Workflow,
  Check,
  ChevronRight,
  HeartHandshake,
  Compass,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface StageMeta {
  id: string;
  stageNumber: string;
  tabLabel: string;
  title: string;
  subtitle: string;
}

const STAGES: StageMeta[] = [
  {
    id: 'land',
    stageNumber: '01',
    tabLabel: '01 LAND',
    title: 'LAND',
    subtitle: 'Win the right initial problem.',
  },
  {
    id: 'adopt',
    stageNumber: '02',
    tabLabel: '02 ADOPT',
    title: 'ADOPT',
    subtitle: 'Turn the first win into customer value.',
  },
  {
    id: 'expand',
    stageNumber: '03',
    tabLabel: '03 EXPAND',
    title: 'EXPAND',
    subtitle: 'Expand only where another real problem becomes visible.',
  },
  {
    id: 'retain',
    stageNumber: '04',
    tabLabel: '04 RETAIN',
    title: 'RETAIN & GROW',
    subtitle: 'Protect the relationship and compound customer value.',
  },
];

// Target full loop: ~11.2 seconds (~2.8s per stage) with rapid, natural transitions
const STAGE_DURATION_MS = 2800;

export default function AccountGrowthVisual() {
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

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

  // Handle visibility changes to safely pause/resume
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

  // Main animation timer loop - no long waiting period, instantaneous resume
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

  // Pointer Enter / Leave: IMMEDIATE pause & resume at current position
  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsPaused(true);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    setHoveredTooltip(null);
    setIsPaused(false);
  }, [prefersReducedMotion]);

  // Manual stage selection via tabs
  const handleManualStageSelect = useCallback((index: number) => {
    setActiveStage(index);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  return (
    <div
      className="w-full bg-[#F7F9FE] rounded-2xl border border-[#E1E1E1] shadow-xs overflow-hidden text-[#191919] flex flex-col transition-all duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Interactive Account Growth Engine Lifecycle"
    >
      {/* Header Panel with Stage Navigation Tabs */}
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
          <p className="text-xs text-[#606060] font-medium transition-opacity duration-150">
            {STAGES[activeStage].subtitle}
          </p>
        </div>

        {/* 4 Rectangular / Pill-like Stage Controls */}
        <div
          className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F7F9FE] p-1 rounded-xl border border-[#E1E1E1] shadow-2xs"
          role="tablist"
          aria-label="Account Growth Engine Stages"
        >
          {STAGES.map((s, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to stage ${s.tabLabel}: ${s.title}`}
                onClick={() => handleManualStageSelect(idx)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ease-flow flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#103CE7] focus:ring-offset-1 ${
                  isActive
                    ? 'bg-[#000229] text-white shadow-xs'
                    : 'text-[#606060] hover:text-[#000229] hover:bg-white'
                }`}
              >
                <span>{s.tabLabel}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6004] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Account Growth Visual Canvas */}
      <div className="relative p-4 sm:p-6 min-h-[350px] sm:min-h-[370px] flex flex-col justify-center bg-[#F7F9FE] overflow-hidden">
        {/* Subtle grid texture for architectural stability */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000229 1px, transparent 1px), linear-gradient(to bottom, #000229 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* ============================================================ */}
        {/* STAGE 01: LAND */}
        {/* ============================================================ */}
        {activeStage === 0 && (
          <div className="space-y-4 animate-in fade-in duration-200 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs font-mono text-[#606060]">
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#103CE7]" />
                <span className="font-bold text-[#000229]">Initial Account Engagement & Solution Fit</span>
              </div>
              <span className="text-[11px] text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded font-semibold">
                Relationship Formed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Left Column: 4 Commercial Context Validation Indicators */}
              <div className="md:col-span-4 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase text-[#808080] flex items-center justify-between">
                  <span>Context Validation</span>
                  <ShieldCheck className="w-3 h-3 text-[#103CE7]" />
                </div>
                {[
                  {
                    label: 'Customer Fit',
                    status: 'Verified',
                    desc: 'Is this the right account and problem?',
                  },
                  {
                    label: 'Business Problem',
                    status: 'Confirmed',
                    desc: 'Clear, high-cost operational bottleneck identified.',
                  },
                  {
                    label: 'Buyer Alignment',
                    status: 'Multi-Threaded',
                    desc: 'Economic champion and operational users engaged.',
                  },
                  {
                    label: 'Solution Fit',
                    status: 'Validated',
                    desc: 'Demonstrated capability to solve the core challenge.',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHoveredTooltip(item.desc)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs hover:border-[#103CE7] transition-all cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#103CE7]" />
                      <span className="font-bold text-[#000229]">{item.label}</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                      {item.status} ✓
                    </span>
                  </div>
                ))}
              </div>

              {/* Middle: Connection Arrow */}
              <div className="md:col-span-1 flex flex-col items-center justify-center text-[#FF6004]">
                <div className="hidden md:flex flex-col items-center gap-1">
                  <ArrowRight className="w-5 h-5 text-[#FF6004] animate-pulse" />
                </div>
                <div className="md:hidden flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 rotate-90 text-[#FF6004]" />
                </div>
              </div>

              {/* Right Column: Central Customer Account + Initial Solution Block */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Central Customer Account Card */}
                <div
                  onMouseEnter={() => setHoveredTooltip('The initial customer account: anchor of relationship and commercial context.')}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className="p-4 rounded-xl bg-white border-2 border-[#103CE7] shadow-sm space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold uppercase text-[#103CE7] px-2 py-0.5 rounded bg-[#103CE7]/10">
                        CUSTOMER ACCOUNT
                      </span>
                      <Building2 className="w-4 h-4 text-[#103CE7]" />
                    </div>
                    <div className="text-sm font-extrabold text-[#000229] mt-2">
                      Enterprise Account
                    </div>
                    <p className="text-[11px] text-[#606060] mt-0.5">
                      First commercial contract established on proven mutual fit.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#103CE7] font-bold">
                    <span>STATUS</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Relationship
                    </span>
                  </div>
                </div>

                {/* Initial Solution Block */}
                <div
                  onMouseEnter={() => setHoveredTooltip('Targeted resolution for the validated core problem.')}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className="p-4 rounded-xl bg-white border-2 border-[#FF6004] shadow-sm space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold uppercase text-white px-2 py-0.5 rounded bg-[#FF6004]">
                        INITIAL SOLUTION
                      </span>
                      <Zap className="w-4 h-4 text-[#FF6004]" />
                    </div>
                    <div className="text-sm font-extrabold text-[#000229] mt-2">
                      Targeted Core Module
                    </div>
                    <p className="text-[11px] text-[#606060] mt-0.5">
                      Focused scope addressing the customer's priority commercial challenge.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#FF6004] font-bold">
                    <span>CONNECTION</span>
                    <span>Delivering Core ROI ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 02: ADOPT */}
        {/* ============================================================ */}
        {activeStage === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs font-mono text-[#606060]">
              <div className="flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5 text-[#103CE7]" />
                <span className="font-bold text-[#000229]">Operational Adoption & Value Realization</span>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                Value Established
              </span>
            </div>

            {/* Central Customer Block + 4 Connected Operational Modules */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
              {/* Persistent Customer Anchor (Left) */}
              <div
                onMouseEnter={() => setHoveredTooltip('The active customer account undergoing structured implementation.')}
                onMouseLeave={() => setHoveredTooltip(null)}
                className="md:col-span-4 p-4 rounded-xl bg-white border-2 border-[#103CE7] shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#103CE7] px-2 py-0.5 rounded bg-[#103CE7]/10">
                      CUSTOMER ANCHOR
                    </span>
                    <Building2 className="w-4 h-4 text-[#103CE7]" />
                  </div>
                  <div className="text-sm font-extrabold text-[#000229] mt-2">
                    Active Account
                  </div>
                  <p className="text-[11px] text-[#606060] leading-snug mt-1">
                    Customer success team guides onboarding, usage routines, and stakeholder alignment.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100 text-[10px] font-mono">
                  <div className="flex items-center justify-between text-[#606060]">
                    <span>Engagement Health</span>
                    <span className="text-emerald-600 font-bold">High</span>
                  </div>
                  <div className="flex items-center justify-between text-[#606060]">
                    <span>Milestone Status</span>
                    <span className="text-[#103CE7] font-bold">On Schedule</span>
                  </div>
                </div>
              </div>

              {/* 4 Connected Operational Lifecycle Blocks (Right) */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    step: '01',
                    label: 'ONBOARD',
                    chip: 'CONNECTED',
                    chipColor: 'bg-[#103CE7]/10 text-[#103CE7]',
                    desc: 'Initial environment setup, team access, and workflow configuration.',
                  },
                  {
                    step: '02',
                    label: 'IMPLEMENT',
                    chip: 'ACTIVE',
                    chipColor: 'bg-[#103CE7] text-white',
                    desc: 'Process integration into daily operational rhythms.',
                  },
                  {
                    step: '03',
                    label: 'USE',
                    chip: 'ACTIVE',
                    chipColor: 'bg-[#103CE7] text-white',
                    desc: 'Regular multi-stakeholder interaction across priority tasks.',
                  },
                  {
                    step: '04',
                    label: 'VALUE',
                    chip: 'ADOPTED',
                    chipColor: 'bg-emerald-600 text-white',
                    desc: 'Is the customer achieving the intended outcome?',
                  },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHoveredTooltip(item.desc)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#103CE7] transition-all flex flex-col justify-between space-y-2 cursor-default"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#808080] font-bold">
                          {item.step}
                        </span>
                        <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${item.chipColor}`}>
                          {item.chip}
                        </span>
                      </div>
                      <div className="text-xs font-extrabold text-[#000229] mt-1.5">
                        {item.label}
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[9px] font-mono text-[#103CE7] font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>Stabilized</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Success Supporting Strip */}
            <div className="p-2.5 rounded-lg bg-[#000229] text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-[#64E9FF]" />
                <span>Dedicated Customer Success layer ensures adoption before any expansion discussions.</span>
              </div>
              <span className="text-[10px] font-mono text-[#64E9FF] font-bold">
                Foundation Solid ✓
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 03: EXPAND */}
        {/* ============================================================ */}
        {activeStage === 2 && (
          <div className="space-y-3.5 animate-in fade-in duration-200 relative z-10">
            {/* Top Indicator & Discipline Protocol */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 font-mono font-semibold text-[#000229]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6004]" />
                <span>Disciplined Expansion Matrix</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                <span className="text-[#103CE7]">OBSERVED NEED</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#FF6004]">VALIDATED PROBLEM</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#FF6004] bg-[#FF6004]/10 px-1.5 py-0.5 rounded border border-[#FF6004]/20">
                  EXPANSION OPPORTUNITY
                </span>
              </div>
            </div>

            {/* Multi-Node Layout: 1 Validated Path vs Muted Opportunistic Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Primary Account Core (4 cols) */}
              <div
                onMouseEnter={() => setHoveredTooltip('Initial successful deployment serving as credible proof for expansion.')}
                onMouseLeave={() => setHoveredTooltip(null)}
                className="sm:col-span-4 p-3.5 rounded-xl bg-white border-2 border-[#103CE7] shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded">
                    PROVEN CORE
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs font-extrabold text-[#000229]">
                  Team Alpha / Primary Workflow
                </div>
                <p className="text-[10px] text-[#606060] leading-snug">
                  Validated adoption generates direct visibility into adjacent bottlenecks.
                </p>
                <div className="text-[9px] font-mono text-[#103CE7] font-bold">
                  Credibility Established ✓
                </div>
              </div>

              {/* Adjacent Nodes Grid (8 cols) - 1 Highlighted Validated Path vs Muted Paths */}
              <div className="sm:col-span-8 grid grid-cols-2 gap-2.5">
                {/* Validated Node 1: Adjacent High-Need Workflow */}
                <div
                  onMouseEnter={() => setHoveredTooltip('Has another legitimate business problem become visible? Validated need confirmed.')}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className="p-3 rounded-xl bg-white border-2 border-[#FF6004] shadow-xs space-y-1.5 hover:scale-[1.02] transition-all cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold uppercase text-white bg-[#FF6004] px-1.5 py-0.5 rounded">
                      VALIDATED EXPANSION
                    </span>
                    <Zap className="w-3.5 h-3.5 text-[#FF6004]" />
                  </div>
                  <div className="text-xs font-extrabold text-[#000229]">
                    Adjacent Workflow B
                  </div>
                  <div className="text-[10px] text-[#606060] leading-snug">
                    Confirmed bottleneck with active budget and sponsor alignment.
                  </div>
                  <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-[#FF6004] font-bold">
                    <span>Real Need Identified</span>
                    <span>Proceed ✓</span>
                  </div>
                </div>

                {/* Muted Node 1: Team Beta (Muted / Not Validated) */}
                <div
                  onMouseEnter={() => setHoveredTooltip('Observed potential, but no urgent commercial problem confirmed. SalesNego does NOT push random upsells.')}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className="p-3 rounded-xl bg-white/70 border border-slate-200 opacity-60 space-y-1.5 hover:opacity-100 transition-opacity cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-[#808080] bg-slate-100 px-1.5 py-0.5 rounded">
                      MONITORED ONLY
                    </span>
                    <HelpCircle className="w-3.5 h-3.5 text-[#808080]" />
                  </div>
                  <div className="text-xs font-bold text-[#606060]">
                    Team Beta (Marketing)
                  </div>
                  <div className="text-[10px] text-[#808080] leading-snug">
                    No active pain point yet. Relationship maintained without pressure.
                  </div>
                  <div className="pt-1 border-t border-slate-100 text-[9px] font-mono text-[#808080]">
                    Zero Forced Upselling
                  </div>
                </div>

                {/* Validated Node 2: New Regional Unit */}
                <div
                  onMouseEnter={() => setHoveredTooltip('Secondary business unit actively requesting rollout based on Team Alpha success.')}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className="p-3 rounded-xl bg-white border-2 border-[#FE9E30] shadow-xs space-y-1.5 hover:scale-[1.02] transition-all cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold uppercase text-[#000229] bg-[#FE9E30]/20 border border-[#FE9E30]/40 px-1.5 py-0.5 rounded">
                      DEMAND PULL
                    </span>
                    <Users2 className="w-3.5 h-3.5 text-[#FE9E30]" />
                  </div>
                  <div className="text-xs font-extrabold text-[#000229]">
                    EMEA Division
                  </div>
                  <div className="text-[10px] text-[#606060] leading-snug">
                    Executive pull following initial milestone realization.
                  </div>
                  <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-[#000229] font-bold">
                    <span>Referred Inward</span>
                    <span>Ready ✓</span>
                  </div>
                </div>

                {/* Muted Node 2: Secondary Tooling */}
                <div
                  onMouseEnter={() => setHoveredTooltip('Unconfirmed use case — kept inactive until genuine customer value is certain.')}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className="p-3 rounded-xl bg-white/70 border border-slate-200 opacity-60 space-y-1.5 hover:opacity-100 transition-opacity cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-[#808080] bg-slate-100 px-1.5 py-0.5 rounded">
                      UNVALIDATED
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#808080]" />
                  </div>
                  <div className="text-xs font-bold text-[#606060]">
                    Tooling Add-on
                  </div>
                  <div className="text-[10px] text-[#808080] leading-snug">
                    Scope restrained to preserve customer trust and focus.
                  </div>
                  <div className="pt-1 border-t border-slate-100 text-[9px] font-mono text-[#808080]">
                    Protected Trust
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 04: RETAIN & GROW */}
        {/* ============================================================ */}
        {activeStage === 3 && (
          <div className="space-y-3.5 animate-in fade-in duration-200 relative z-10">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs font-mono text-[#606060]">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#103CE7]" />
                <span className="font-bold text-[#000229]">Compound Commercial Ecosystem & Retention</span>
              </div>
              <span className="text-[11px] text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded border border-[#103CE7]/20 font-bold">
                Compounding Value
              </span>
            </div>

            {/* 6 Connected Ecosystem Modules Surrounding the Relationship */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                {
                  title: 'Initial Solution',
                  role: 'Anchor Scope',
                  status: 'Established',
                  desc: 'Targeted resolution for the validated core problem.',
                  border: 'border-[#103CE7]',
                },
                {
                  title: 'Additional Use Case',
                  role: 'Expanded Value',
                  status: 'Active',
                  desc: 'Disciplined expansion into confirmed adjacent workflow.',
                  border: 'border-[#FF6004]',
                },
                {
                  title: 'Customer Success',
                  role: 'Ongoing Alignment',
                  status: 'Proactive',
                  desc: 'Continuous reviews, adoption telemetry and workflow guidance.',
                  border: 'border-slate-200',
                },
                {
                  title: 'Relationship',
                  role: 'Executive Trust',
                  status: 'Multi-Threaded',
                  desc: 'Long-term strategic partnership across leadership and operations.',
                  border: 'border-slate-200',
                },
                {
                  title: 'Renewal Security',
                  role: 'Predictable Retain',
                  status: 'Secured',
                  desc: 'High value realization translates into natural commercial renewals.',
                  border: 'border-emerald-200',
                },
                {
                  title: 'Account Intelligence',
                  role: 'New Insights',
                  status: 'Feeding GTM',
                  desc: 'What has the relationship taught us to refine broad market strategy?',
                  border: 'border-[#103CE7]',
                },
              ].map((mod) => (
                <div
                  key={mod.title}
                  onMouseEnter={() => setHoveredTooltip(mod.desc)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className={`p-3 rounded-xl bg-white border-2 ${mod.border} shadow-2xs hover:scale-[1.02] transition-all flex flex-col justify-between space-y-1.5 cursor-default group`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#808080]">
                      {mod.role}
                    </span>
                    <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F7F9FE] text-[#103CE7] border border-slate-200">
                      {mod.status}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-[#000229]">{mod.title}</div>
                    <div className="text-[10px] text-[#606060] line-clamp-2 mt-0.5">{mod.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Outcome Banner */}
            <div className="p-3 rounded-xl bg-[#000229] text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold text-[#64E9FF]">
                <span>ONE CUSTOMER</span>
                <span className="text-white/40">→</span>
                <span>DEEPER VALUE</span>
                <span className="text-white/40">→</span>
                <span className="text-[#FF6004]">STRONGER RELATIONSHIP</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium sm:text-right">
                Retention compounds through demonstrable, sustained commercial impact.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Hover Tooltip / Micro-Description Bar */}
      <div className="px-4 py-2.5 bg-white border-t border-[#E1E1E1] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] uppercase font-bold text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded border border-[#103CE7]/20 flex-shrink-0">
            INSIGHT
          </span>
          <p className="text-[11px] text-[#606060] font-medium truncate">
            {hoveredTooltip || 'Hover over any account or lifecycle block to inspect its commercial discipline.'}
          </p>
        </div>

        <span className="text-[10px] font-mono text-[#808080] flex-shrink-0 hidden sm:inline">
          {isPaused ? 'Paused (Hover)' : 'Hover to pause'}
        </span>
      </div>

      {/* ============================================================ */}
      {/* PERSISTENT FOUNDATION: CONTINUOUS CUSTOMER SUCCESS */}
      {/* ============================================================ */}
      <div className="p-3.5 sm:p-4 bg-[#F7F9FE] border-t border-[#E1E1E1] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#103CE7]" />
            <span className="text-[10px] sm:text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#000229]">
              CONTINUOUS CUSTOMER SUCCESS FOUNDATION
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#808080]">
            Persistent Layer Across All Stages
          </span>
        </div>

        {/* 6 Compact Foundation Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            {
              name: 'Onboarding',
              note: 'Milestone tracking',
              desc: 'Structured setup and rapid user enablement.',
            },
            {
              name: 'Value Realization',
              note: 'Business impact',
              desc: 'Is the customer achieving the intended outcome?',
            },
            {
              name: 'Customer Engagement',
              note: 'Executive syncs',
              desc: 'Cadenced commercial reviews with key sponsors.',
            },
            {
              name: 'Account Intelligence',
              note: 'Context capture',
              desc: 'What has the relationship taught us?',
            },
            {
              name: 'Risk Signals',
              note: 'Early mitigation',
              desc: 'Proactive resolution of adoption bottlenecks.',
            },
            {
              name: 'Renewal & Expansion',
              note: 'Compound growth',
              desc: 'Natural expansion into validated adjacent problems.',
            },
          ].map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredTooltip(item.desc)}
              onMouseLeave={() => setHoveredTooltip(null)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-center shadow-2xs hover:border-[#103CE7] hover:bg-[#103CE7]/5 transition-all cursor-default"
            >
              <div className="text-[11px] font-bold text-[#000229] truncate">{item.name}</div>
              <div className="text-[9px] font-mono text-[#606060]">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar & Stage Status Footer */}
      <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#606060]">
          <span className="w-2 h-2 rounded-full bg-[#103CE7] animate-pulse" />
          <span className="text-[11px]">
            {isPaused
              ? 'Paused (Inspecting)'
              : prefersReducedMotion
              ? 'Reduced Motion (Manual Navigation)'
              : 'Auto-progressing Account Growth Lifecycle (~11s cycle)'}
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
          aria-label="Next Account Growth stage"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
