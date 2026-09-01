import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Database,
  Globe,
  Mail,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Workflow,
  Search,
  UserCheck,
  Calendar,
  MessageSquare,
  BarChart2,
  ShieldCheck,
  AlertCircle,
  Clock,
  Check,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Filter,
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
    id: 'connect-data',
    stageNumber: '01',
    tabLabel: '01 DATA',
    title: 'CONNECT THE DATA',
    subtitle: 'Bring commercial signals into one operating layer.',
  },
  {
    id: 'orchestrate',
    stageNumber: '02',
    tabLabel: '02 ORCHESTRATE',
    title: 'ORCHESTRATE THE WORK',
    subtitle: 'Turn raw data into coordinated commercial action.',
  },
  {
    id: 'execute-pipeline',
    stageNumber: '03',
    tabLabel: '03 EXECUTE',
    title: 'MOVE COMMERCIAL WORK FORWARD',
    subtitle: 'Connect engagement activity to opportunity progression.',
  },
  {
    id: 'visibility',
    stageNumber: '04',
    tabLabel: '04 VISIBILITY',
    title: 'SEE WHAT MATTERS',
    subtitle: 'Create visibility across the commercial system.',
  },
];

const STAGE_DURATION_MS = 3200; // Refined ~15% faster (~12.8s loop), crisp fluid flow

export default function RevOpsAiVisual() {
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStep3Handoff, setActiveStep3Handoff] = useState(0);
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

  // Stage 3 handoff progression loop
  useEffect(() => {
    if (activeStage !== 2 || prefersReducedMotion) {
      setActiveStep3Handoff(0);
      return;
    }

    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setActiveStep3Handoff((prev) => (prev + 1) % 6);
    }, 500);

    return () => clearInterval(interval);
  }, [activeStage, isPaused, prefersReducedMotion]);

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
    if (!prefersReducedMotion) setIsPaused(false);
    setHoveredTooltip(null);
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
      aria-label="Modular Revenue Operations and AI Visual Operating System"
      tabIndex={0}
    >
      {/* Header Panel with Rectangular Segmented Stage Controls */}
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
          <p className="text-xs text-[#606060] font-medium transition-opacity duration-200">
            {STAGES[activeStage].subtitle}
          </p>
        </div>

        {/* 4 Rectangular Segmented Stage Controls */}
        <div
          className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F7F9FE] p-1 rounded-xl border border-[#E1E1E1] shadow-2xs"
          role="tablist"
          aria-label="RevOps Operating System Stages"
        >
          {STAGES.map((s, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to ${s.tabLabel}: ${s.title}`}
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

      {/* Main Block-Based Interactive Canvas */}
      <div className="relative p-4 sm:p-6 min-h-[360px] sm:min-h-[380px] flex flex-col justify-center bg-[#F7F9FE] overflow-hidden">
        {/* Subtle grid pattern for control architecture feel */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000229 1px, transparent 1px), linear-gradient(to bottom, #000229 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* ============================================================ */}
        {/* STATE 01: CONNECT THE DATA */}
        {/* ============================================================ */}
        {activeStage === 0 && (
          <div className="space-y-4 animate-in fade-in duration-250 relative z-10">
            {/* Top Ingestion Flow Bar */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs font-mono text-[#606060]">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#103CE7]" />
                <span className="font-bold text-[#000229]">Multi-Channel Ingestion & Unification</span>
              </div>
              <span className="text-[11px] text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded font-semibold">
                Live Data Stream
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* 6 Input Modular Blocks (Left Column) */}
              <div className="md:col-span-5 grid grid-cols-2 gap-2">
                {[
                  { label: 'CRM', icon: Database, desc: 'Unified source of record for accounts and contacts.' },
                  { label: 'Website Activity', icon: Globe, desc: 'High-intent page visits and product engagement.' },
                  { label: 'Email Engagement', icon: Mail, desc: 'Executive response patterns and thread sentiment.' },
                  { label: 'Market Signals', icon: Activity, desc: 'External growth triggers, headcount and RFPs.' },
                  { label: 'Customer Data', icon: UserCheck, desc: 'Usage depth, adoption milestones and health telemetry.' },
                  { label: 'Third-Party Data', icon: Layers, desc: 'Enriched firmographic, technographic and verified contacts.' },
                ].map((inputBlock, i) => {
                  const Icon = inputBlock.icon;
                  return (
                    <div
                      key={inputBlock.label}
                      onMouseEnter={() => setHoveredTooltip(inputBlock.desc)}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#103CE7] hover:scale-[1.02] transition-all cursor-default group"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="p-1 rounded bg-[#103CE7]/10 text-[#103CE7] group-hover:bg-[#103CE7] group-hover:text-white transition-colors">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-xs font-bold text-[#000229] truncate">{inputBlock.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Data Connector Lane (Middle Column) */}
              <div className="md:col-span-2 flex flex-col items-center justify-center py-2 text-[#103CE7]">
                <div className="hidden md:flex flex-col items-center gap-1.5 w-full">
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#103CE7]/30 to-[#103CE7] relative">
                    <span className="absolute -top-1 right-1/2 w-2.5 h-2.5 rounded-full bg-[#103CE7] animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#103CE7]">
                    STREAM
                  </span>
                </div>
                <div className="md:hidden flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 rotate-90 text-[#103CE7]" />
                </div>
              </div>

              {/* Large Central Consolidated Block (Right Column) */}
              <div className="md:col-span-5 p-4 rounded-xl bg-white border-2 border-[#103CE7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#103CE7] px-2 py-0.5 rounded bg-[#103CE7]/10 border border-[#103CE7]/20">
                    CENTRAL OPERATING CORE
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#64E9FF]" />
                </div>

                <div>
                  <div className="text-sm font-extrabold text-[#000229]">COMMERCIAL DATA LAYER</div>
                  <p className="text-[11px] text-[#103CE7] font-mono font-semibold mt-0.5">
                    Connected. Structured. Actionable.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-[#606060]">
                    <span>Unified Account Record</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">Active ✓</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#606060]">
                    <span>Deduplicated Attribution</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">Synced ✓</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#606060]">
                    <span>Real-Time Buying Signals</span>
                    <span className="text-[10px] font-mono font-bold text-[#FF6004]">Indexed ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tooltip / Micro-Description Bar */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-[#606060] font-medium">
                {hoveredTooltip || 'Hover any block to inspect its role in the commercial data foundation.'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#103CE7] flex items-center gap-1">
                Next: Orchestrate <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 02: ORCHESTRATE THE WORK */}
        {/* ============================================================ */}
        {activeStage === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-250 relative z-10">
            {/* Top AI-Assisted Orchestration Strip */}
            <div className="p-3 rounded-xl bg-[#000229] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#103CE7] text-[#64E9FF] flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white flex items-center gap-2">
                    <span>AI-ASSISTED ORCHESTRATION LAYER</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#103CE7] text-[#64E9FF]">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    Routing • Prioritization • Recommendations • Workflow Support
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#64E9FF]">
                Multi-Threaded
              </span>
            </div>

            {/* 5 Modular Orchestration Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {[
                {
                  title: 'Account Intelligence',
                  badge: 'MATCH',
                  badgeStyle: 'bg-[#103CE7] text-white',
                  icon: Search,
                  desc: 'Context for why this account matters.',
                  border: 'border-[#103CE7]',
                },
                {
                  title: 'Prospect Enrichment',
                  badge: 'READY',
                  badgeStyle: 'bg-emerald-600 text-white',
                  icon: Sparkles,
                  desc: 'Verified buying committee contacts and direct emails.',
                  border: 'border-slate-200',
                },
                {
                  title: 'Trigger Monitoring',
                  badge: 'TRIGGER',
                  badgeStyle: 'bg-[#FF6004] text-white',
                  icon: Activity,
                  desc: 'Real-time alert on leadership transition and RFP opening.',
                  border: 'border-[#FF6004]',
                },
                {
                  title: 'Workflow Automation',
                  badge: 'READY',
                  badgeStyle: 'bg-[#103CE7] text-white',
                  icon: Workflow,
                  desc: 'Moves routine work without losing commercial control.',
                  border: 'border-slate-200',
                },
                {
                  title: 'Qualification Logic',
                  badge: 'QUALIFIED',
                  badgeStyle: 'bg-[#FF6004] text-white',
                  icon: CheckCircle2,
                  desc: 'Evidence-verified ICP fit passing opportunity to sales.',
                  border: 'border-[#FF6004]',
                },
              ].map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.title}
                    onMouseEnter={() => setHoveredTooltip(mod.desc)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    className={`p-3 rounded-xl bg-white border-2 ${mod.border} shadow-2xs hover:scale-[1.03] transition-all flex flex-col justify-between space-y-2 cursor-default group`}
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-1 rounded bg-[#F7F9FE] text-[#103CE7] group-hover:bg-[#103CE7] group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${mod.badgeStyle}`}>
                        {mod.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#000229] leading-snug">{mod.title}</div>
                      <div className="text-[10px] text-[#606060] line-clamp-2 mt-1">{mod.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-[#606060] font-medium">
                {hoveredTooltip || 'Automated orchestration eliminates administrative friction while keeping sales teams in control.'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#FF6004] flex items-center gap-1">
                Next: Execution <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 03: MOVE COMMERCIAL WORK FORWARD */}
        {/* ============================================================ */}
        {activeStage === 2 && (
          <div className="space-y-4 animate-in fade-in duration-250 relative z-10">
            {/* Top Status Progression Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 font-mono font-semibold text-[#000229]">
                <Activity className="w-3.5 h-3.5 text-[#FF6004]" />
                <span>Opportunity Token Handoff</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                <span className="text-[#103CE7]">SIGNAL</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#103CE7]">ENGAGED</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#103CE7]">DISCOVERY</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#FF6004]">QUALIFIED</span>
                <span className="text-[#808080]">→</span>
                <span className="text-[#FF6004] bg-[#FF6004]/10 px-1.5 py-0.5 rounded">ACTIVE OPPORTUNITY</span>
              </div>
            </div>

            {/* Horizontal Operational Blocks (6 Steps) with Animated Handoff Token */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {[
                { name: 'Research', icon: Search, desc: 'Deep problem and buyer hypothesis formulation.' },
                { name: 'Personalization', icon: Sparkles, desc: 'Relevant multi-threaded commercial messaging.' },
                { name: 'Sequence', icon: Workflow, desc: 'Multi-touch touchpoints across executive channels.' },
                { name: 'Meeting', icon: Calendar, desc: 'Discovery conversation with confirmed economic champion.' },
                { name: 'Follow-Up', icon: MessageSquare, desc: 'Evidence summary and business impact alignment.' },
                { name: 'Pipeline', icon: TrendingUp, desc: 'Formal deal progression in unified CRM.' },
              ].map((step, idx) => {
                const Icon = step.icon;
                const isCurrent = activeStep3Handoff === idx;
                const isPast = activeStep3Handoff > idx;

                let cardStyle = 'bg-white border-slate-200 text-[#606060]';
                if (isCurrent) {
                  cardStyle =
                    idx >= 4
                      ? 'bg-[#FF6004] border-[#FF6004] text-white shadow-md scale-105'
                      : 'bg-[#103CE7] border-[#103CE7] text-white shadow-md scale-105';
                } else if (isPast) {
                  cardStyle = 'bg-[#103CE7]/5 border-[#103CE7]/30 text-[#103CE7]';
                }

                return (
                  <div
                    key={step.name}
                    onMouseEnter={() => setHoveredTooltip(step.desc)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    className={`p-3 rounded-xl border-2 transition-all duration-250 flex flex-col justify-between space-y-2 cursor-default ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-1 rounded bg-white/15">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-mono opacity-80 font-bold">0{idx + 1}</span>
                    </div>

                    <div>
                      <div className="text-xs font-extrabold truncate">{step.name}</div>
                      {isCurrent && (
                        <div className="text-[9px] font-mono mt-1 px-1.5 py-0.5 rounded bg-black/20 font-bold flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                          Handoff
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Opportunity Token Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6004] animate-ping" />
                <div>
                  <div className="font-extrabold text-[#000229]">Active Commercial Handoff in Motion</div>
                  <div className="text-[11px] text-[#606060]">
                    {hoveredTooltip || 'Opportunity token progressing through validation gates toward deal close.'}
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 rounded bg-[#000229] text-white font-mono text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0">
                <span>STAGE STATUS: VERIFIED</span>
                <Check className="w-3.5 h-3.5 text-[#64E9FF]" />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 04: SEE WHAT MATTERS */}
        {/* ============================================================ */}
        {activeStage === 3 && (
          <div className="space-y-3.5 animate-in fade-in duration-250 relative z-10">
            {/* Top Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold text-[#000229]">
                <BarChart2 className="w-3.5 h-3.5 text-[#103CE7]" />
                <span>Commercial Control & Health Overview</span>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                System Health: Optimum
              </span>
            </div>

            {/* 6 Symbolic Control Blocks (No Fake Numbers / No Fake Charts) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                {
                  title: 'Pipeline Health',
                  state: 'Stable',
                  stateStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  icon: ShieldCheck,
                  note: 'Conversion velocity aligned across ICP segments.',
                },
                {
                  title: 'Stage Progression',
                  state: 'Progressing',
                  stateStyle: 'bg-[#103CE7]/10 text-[#103CE7] border-[#103CE7]/20',
                  icon: TrendingUp,
                  note: 'Active deals advancing with verified economic champion.',
                },
                {
                  title: 'Follow-Up Risk',
                  state: 'Attention',
                  stateStyle: 'bg-[#FF6004]/10 text-[#FF6004] border-[#FF6004]/30',
                  icon: AlertCircle,
                  note: 'Surfaces dormant accounts requiring senior intervention.',
                },
                {
                  title: 'Account Activity',
                  state: 'Progressing',
                  stateStyle: 'bg-[#103CE7]/10 text-[#103CE7] border-[#103CE7]/20',
                  icon: Activity,
                  note: 'Multi-threaded engagement tracked across key buyers.',
                },
                {
                  title: 'Forecast Discipline',
                  state: 'Disciplined',
                  stateStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  icon: CheckCircle2,
                  note: 'Milestone-governed criteria replaces guesswork.',
                },
                {
                  title: 'Win/Loss Signals',
                  state: 'Monitored',
                  stateStyle: 'bg-[#000229]/10 text-[#000229] border-slate-300',
                  icon: Clock,
                  note: 'Feedback loops feeding GTM strategy refinement.',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => setHoveredTooltip(item.note)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#103CE7] hover:scale-[1.02] transition-all flex flex-col justify-between space-y-1.5 cursor-default group"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-1 rounded bg-[#F7F9FE] text-[#103CE7] group-hover:bg-[#103CE7] group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${item.stateStyle}`}>
                        {item.state}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#000229]">{item.title}</div>
                      <div className="text-[10px] text-[#606060] leading-snug mt-0.5 line-clamp-2">{item.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact Bottom Connected Strip */}
            <div className="p-3 rounded-xl bg-[#000229] text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#64E9FF]">
                <span>DATA</span>
                <span className="text-white/40">|</span>
                <span>PROCESS</span>
                <span className="text-white/40">|</span>
                <span>AUTOMATION</span>
                <span className="text-white/40">|</span>
                <span className="text-[#FF6004]">INSIGHT</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium sm:text-right">
                One connected operating system for commercial execution.
              </p>
            </div>
          </div>
        )}
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
              : 'Auto-cycling RevOps operating system'}
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
          aria-label="Next RevOps stage"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
