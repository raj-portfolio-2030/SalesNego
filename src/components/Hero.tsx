import { useState } from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import HeroCommercialJourney, { STAGES } from './HeroCommercialJourney';

export default function Hero() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section
      id="hero"
      className="relative bg-[#000229] text-white pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 overflow-hidden"
    >
      {/* Subtle background commercial grid and signal glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 45% 20%, #103CE7 0%, transparent 60%), radial-gradient(circle at 90% 80%, #FF6004 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left Column: Hero Copy (~44% width on desktop) */}
          <div className="w-full lg:w-[44%] space-y-5 lg:space-y-6 flex-shrink-0">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#64E9FF]">
              <span className="w-2 h-2 rounded-full bg-[#FF6004] animate-pulse" />
              B2B COMMERCIAL EXECUTION
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] font-extrabold tracking-tight text-white leading-[1.12]">
              From Market Signal to <span className="text-[#64E9FF]">Closed Revenue.</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              SalesNego helps B2B SaaS, AI and technology companies turn market intelligence into qualified pipeline, customer acquisition and account growth.
            </p>

            {/* Secondary line */}
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Strategy, Revenue Operations and founder-led sales execution — connected in one commercial system.
            </p>

            {/* Left-Side Dynamic Contextual Stage Line */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#FF6004] animate-ping" />
                <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  Active Stage Focus:
                </span>
                <span
                  key={STAGES[activeStage].leftContext}
                  className="font-mono font-bold text-[#64E9FF] tracking-wider transition-all duration-300 animate-in fade-in"
                >
                  {STAGES[activeStage].leftContext}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                0{activeStage + 1} / 04
              </span>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
              <a
                href="#contact"
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-all shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF6004]"
              >
                Discuss Your Growth Priorities
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#system"
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
              >
                Explore Execution Playbook
                <ChevronRight className="w-4 h-4 text-[#64E9FF]" />
              </a>
            </div>

            {/* Subtle Execution Note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#64E9FF]" />
              <span>Full lifecycle execution: Market Signals → RevOps → Sales → Expansion</span>
            </div>
          </div>

          {/* Right Column: 4-Stage Animated Commercial Journey (~56% width on desktop) */}
          <div className="w-full lg:w-[56%] relative">
            <HeroCommercialJourney
              activeStage={activeStage}
              onStageChange={setActiveStage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
