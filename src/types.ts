export interface NavLink {
  label: string;
  href: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  whatWeCover: string[];
  typicalOutputs: string[];
  imageUrl?: string;
  imageAlt?: string;
  accentColor?: string;
}

export interface ServiceTab {
  id: string;
  name: string;
  question: string;
  flow: string[];
  outcome: string;
}

export interface ExecutionStage {
  step: string;
  title: string;
  description: string;
}

export interface EngagementPhase {
  id: string;
  tabLabel: string;
  timing: string;
  activities: string[];
  output: string;
}

export interface CommercialExperienceCard {
  id: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  isPlaceholder?: boolean;
}

export interface WhySalesNegoCard {
  id: string;
  title: string;
  description: string;
}

export interface AccountGrowthStage {
  stage: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LeadMagnetFormData {
  fullName: string;
  businessEmail: string;
  company: string;
  targetMarket: string;
}

export interface CaseStudyRequestFormData {
  fullName: string;
  businessEmail: string;
  company: string;
  domainInterest: string;
  primaryChallenge: string;
  ndaAccepted: boolean;
}
