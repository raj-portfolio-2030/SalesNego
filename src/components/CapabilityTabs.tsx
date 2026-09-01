import { useState } from 'react';
import { SERVICE_TABS } from '../data/content';
import { ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';

export default function CapabilityTabs() {
  const [activeTab, setActiveTab] = useState(SERVICE_TABS[0].id);

  const currentTab = SERVICE_TABS.find((t) => t.id === activeTab) || SERVICE_TABS[0];

  return (
    <section id="service-tabs" className="bg-[#F7F9FE] py-16 sm:py-20 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            CAPABILITY ARCHITECTURE
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#000229]">
            Detailed Commercial Workflows
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E1E1E1] gap-2 overflow-x-auto custom-horizontal-scroll pb-1">
          {SERVICE_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-bold tracking-tight rounded-t-lg transition-all border-b-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#103CE7] ${
                  isActive
                    ? 'border-[#FF6004] text-[#000229] bg-white shadow-xs'
                    : 'border-transparent text-[#606060] hover:text-[#000229] hover:bg-white/60'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs space-y-6"
        >
          {/* Question */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#103CE7]/10 text-[#103CE7] flex-shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#808080] tracking-wider">
                Question We Answer:
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#000229] mt-0.5">
                {currentTab.question}
              </h3>
            </div>
          </div>

          {/* Workflow Sequence */}
          <div>
            <span className="text-xs uppercase font-bold text-[#808080] tracking-wider block mb-3">
              The Workflow:
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {currentTab.flow.map((step, idx) => (
                <div key={step} className="flex items-center gap-2 sm:gap-3">
                  <div className="px-3.5 py-2 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1] text-xs sm:text-sm font-bold text-[#000229] shadow-2xs">
                    {step}
                  </div>
                  {idx < currentTab.flow.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#FE9E30] flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="pt-4 border-t border-[#E1E1E1] flex items-start gap-3 bg-[#F7F9FE] p-4 rounded-xl">
            <CheckCircle className="w-5 h-5 text-[#FF6004] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase font-bold text-[#606060] tracking-wider">
                Outcome:
              </span>
              <p className="text-sm sm:text-base font-semibold text-[#000229]">
                {currentTab.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
