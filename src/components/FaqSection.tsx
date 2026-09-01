import { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { HelpCircle, ArrowRight, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = FAQ_ITEMS[activeIndex] || FAQ_ITEMS[0];

  return (
    <section id="faq" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3.5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Commercial Clarity & Operating Details
          </h2>
          <p className="text-base sm:text-lg text-[#606060] leading-relaxed">
            Hover over any question on the left to reveal the detailed answer and operational context on the right.
          </p>
        </div>

        {/* 2-Column Interactive Layout: Left Questions, Right Answer Pop-up Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 5 Simple Question Cards */}
          <div className="lg:col-span-6 space-y-3" role="tablist" aria-label="Frequently Asked Questions">
            {FAQ_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              const numStr = `0${idx + 1}`;
              return (
                <button
                  key={item.question}
                  type="button"
                  role="tab"
                  id={`faq-tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls={`faq-answer-panel`}
                  tabIndex={0}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 ease-flow flex items-center justify-between gap-4 group focus:outline-none focus:ring-2 focus:ring-[#103CE7] ${
                    isActive
                      ? 'bg-[#000229] text-white border-[#000229] shadow-md scale-[1.01]'
                      : 'bg-white text-[#191919] border-[#E1E1E1] hover:border-[#103CE7]/40 hover:bg-white/90 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md transition-colors ${
                        isActive
                          ? 'bg-white/15 text-[#64E9FF]'
                          : 'bg-[#F7F9FE] text-[#606060] group-hover:text-[#103CE7] group-hover:bg-[#103CE7]/10'
                      }`}
                    >
                      {numStr}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold tracking-tight line-clamp-2 ${
                        isActive ? 'text-white' : 'text-[#000229] group-hover:text-[#103CE7]'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#103CE7] text-white'
                        : 'bg-[#F7F9FE] text-[#808080] group-hover:text-[#103CE7] group-hover:bg-[#103CE7]/10'
                    }`}
                  >
                    <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'translate-x-0.5' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Answer Pop-Up Window Display */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div
              id="faq-answer-panel"
              role="tabpanel"
              aria-labelledby={`faq-tab-${activeIndex}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(0,2,41,0.08)] overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Top Window Chrome / Header */}
              <div className="px-5 py-3.5 bg-[#F7F9FE] border-b border-[#E1E1E1] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6004]" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#606060]">
                    FAQ Answer Window • 0{activeIndex + 1} of 05
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#103CE7] bg-[#103CE7]/10 px-2 py-0.5 rounded">
                  <Sparkles className="w-3 h-3" />
                  Live Preview
                </div>
              </div>

              {/* Window Body with Animated Content Switcher */}
              <div className="p-6 sm:p-8 min-h-[280px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    {/* Active Question Badge & Heading */}
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#103CE7] bg-[#103CE7]/10 px-2.5 py-1 rounded">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Question 0{activeIndex + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#000229] leading-snug">
                        {activeItem.question}
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-[#FF6004]" />

                    {/* Answer Text */}
                    <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
                      {activeItem.answer}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Key Takeaway Note */}
                <div className="mt-6 pt-4 border-t border-[#E1E1E1] flex items-center justify-between text-xs text-[#606060]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#103CE7]" />
                    <span className="font-semibold text-[#191919]">Senior-Led Execution</span>
                  </div>
                  <span className="text-[#808080]">Have more questions? Contact sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

