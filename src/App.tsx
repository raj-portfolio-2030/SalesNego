/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import ClientProof from './components/ClientProof';
import CommercialProblem from './components/CommercialProblem';
import WhoWeHelp from './components/WhoWeHelp';
import CoreCapabilities from './components/CoreCapabilities';
import CapabilityTabs from './components/CapabilityTabs';
import ExecutionSystem from './components/ExecutionSystem';
import EvidenceIntelligence from './components/EvidenceIntelligence';
import AiHumanLed from './components/AiHumanLed';
import ExecutionModel from './components/ExecutionModel';
import CommercialExperience from './components/CommercialExperience';
import Testimonials from './components/Testimonials';
import WhySalesNego from './components/WhySalesNego';
import AccountGrowth from './components/AccountGrowth';
import EngagementModel from './components/EngagementModel';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FE] text-[#191919] selection:bg-[#FF6004] selection:text-white">
      {/* Top Header & Sticky Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Client Proof Strip */}
        <ClientProof />

        {/* Section 3: The Commercial Problem */}
        <CommercialProblem />

        {/* Section 4: Who We Help */}
        <WhoWeHelp />

        {/* Section 5: Three Core Capabilities */}
        <CoreCapabilities />

        {/* Section 6: Interactive Service Tabs */}
        <CapabilityTabs />

        {/* Section 7: SalesNego Commercial Execution System (Coded Visual) */}
        <ExecutionSystem />

        {/* Section 8: Evidence-Led Account Intelligence */}
        <EvidenceIntelligence />

        {/* Section 9: AI-Accelerated, Human-Led */}
        <AiHumanLed />

        {/* Section 10: How an Engagement Works / Execution Model */}
        <ExecutionModel />

        {/* Section 11: Commercial Experience */}
        <CommercialExperience />

        {/* Section 12: Testimonials */}
        <Testimonials />

        {/* Section 13: Why SalesNego / Operating Model */}
        <WhySalesNego />

        {/* Section 14: Account Growth ("Customer acquisition is only the beginning") with supplied public ImageKit image */}
        <AccountGrowth />

        {/* Section 15: Engagement Model */}
        <EngagementModel />

        {/* Section 16: FAQ */}
        <FaqSection />

        {/* Section 17: Final CTA & Contact Form */}
        <FinalCta />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
