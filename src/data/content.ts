import {
  CapabilityItem,
  CommercialExperienceCard,
  EngagementPhase,
  ExecutionStage,
  FaqItem,
  NavLink,
  ServiceTab,
  Testimonial,
  WhySalesNegoCard,
  AccountGrowthStage,
} from '../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Our System', href: '#system' },
  { label: 'AI + RevOps', href: '#ai-revops' },
  { label: 'Experience', href: '#experience' },
  { label: 'Why SalesNego', href: '#why-salesnego' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const CLIENT_LOGOS = [
  { name: 'Infocodec', category: 'Enterprise Technology' },
  { name: 'TC+ LIMS', category: 'Laboratory & Testing' },
  { name: 'Guidewire Tech Partner', category: 'Insurance & Enterprise' },
  { name: 'Energy Trading Platform', category: 'ETRM & Financial Tech' },
  { name: 'AI Decision Engine', category: 'AI & Data SaaS' },
];

export const WHO_WE_HELP_CARDS = [
  {
    number: '01',
    title: 'B2B SaaS & AI Products',
    description:
      'Companies selling software or AI-enabled products that require consultative discovery, business-case development and structured sales execution.',
  },
  {
    number: '02',
    title: 'Founder-Led Technology Companies',
    description:
      'Companies with strong product capability but limited internal commercial bandwidth or an overly founder-dependent sales motion.',
  },
  {
    number: '03',
    title: 'New Market & Growth Initiatives',
    description:
      'Technology companies entering a new geography, vertical, buyer segment or enterprise market.',
  },
  {
    number: '04',
    title: 'Select Technology Services Firms',
    description:
      'Engineering and specialist technology firms where customer acquisition depends on technical understanding, commercial credibility and relationship development.',
  },
];

export const CORE_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'gtm-strategy',
    title: 'GTM Strategy & Market Intelligence',
    subtitle: 'Know where to play, who to pursue and why the market should care.',
    body: 'Before outreach begins, we build the commercial context required to make outreach relevant.',
    imageUrl:
      'https://ik.imagekit.io/4rtwqlnkg/Maketering%20INtelligence%20and%20GTM.png?updatedAt=1788228132160',
    imageAlt:
      'B2B market intelligence and GTM system for identifying and prioritizing high-value target accounts.',
    whatWeCover: [
      'Market and segment analysis',
      'Market-entry strategy',
      'ICP definition and segmentation',
      'Buyer and buying-committee mapping',
      'Competitive intelligence',
      'Product-market synthesis',
      'Value proposition development',
      'Positioning and sales narrative',
      'Trigger identification',
      'Target-account prioritization',
      'Channel strategy',
      'GTM playbook development',
    ],
    typicalOutputs: [
      'Market Entry Brief',
      'ICP & Buyer Map',
      'Messaging Architecture',
      'Account Priority Model',
      'GTM Execution Playbook',
    ],
    accentColor: '#103CE7',
  },
  {
    id: 'revops-ai',
    title: 'Revenue Operations & AI-Accelerated Sales',
    subtitle:
      'Build the commercial infrastructure that makes execution visible, disciplined and scalable.',
    body: 'Sales activity becomes more useful when account data, qualification, pipeline management and automation work together.',
    imageUrl:
      'https://ik.imagekit.io/4rtwqlnkg/Revenue%20Operations%20+%20AI.png?updatedAt=1788228131653',
    imageAlt:
      'AI-accelerated Revenue Operations system connecting CRM data, account intelligence, sales workflows, pipeline management and analytics.',
    whatWeCover: [
      'CRM architecture and governance',
      'Pipeline stages and exit criteria',
      'Opportunity qualification',
      'Account and contact data structure',
      'Sales process design',
      'Account scoring',
      'Lead and opportunity routing',
      'Sales workflow automation',
      'AI-assisted account research',
      'Prospect enrichment',
      'Trigger monitoring',
      'Personalization workflows',
      'Outreach sequence operations',
      'Meeting intelligence',
      'CRM update workflows',
      'Follow-up automation',
      'Pipeline reporting',
      'Forecast discipline',
      'Win/loss intelligence',
    ],
    typicalOutputs: [
      'CRM & Pipeline Architecture',
      'Qualification Framework',
      'Sales Workflow Design',
      'Automation Map',
      'Revenue Dashboard',
      'Commercial Playbook',
    ],
    accentColor: '#64E9FF',
  },
  {
    id: 'commercial-execution',
    title: 'End-to-End Commercial Execution',
    subtitle:
      'Move from the first account signal through customer decision and account growth.',
    body: 'SalesNego is not designed as a meeting-booking service. Where the engagement requires it, we remain involved throughout the commercial lifecycle.',
    whatWeCover: [
      'Target-account acquisition',
      'Account research',
      'Buyer identification',
      'Multi-channel engagement',
      'Executive outreach',
      'Discovery',
      'Requirements analysis',
      'Opportunity qualification',
      'Product demonstrations',
      'Solution alignment',
      'Business-case development',
      'Technical validation coordination',
      'Proposal development',
      'Objection management',
      'Procurement navigation',
      'Commercial negotiation',
      'Contract closure',
      'Customer handoff',
      'Customer Success alignment',
      'Renewal strategy',
      'Upsell and cross-sell',
      'Strategic account expansion',
    ],
    typicalOutputs: [
      'Qualified Opportunities',
      'Discovery & Deal Intelligence',
      'Opportunity Plans',
      'Business Cases',
      'Commercial Proposals',
      'Negotiation Strategy',
      'Account Growth Plans',
    ],
    accentColor: '#FF6004',
  },
];

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: 'gtm-tab',
    name: '1. GTM & Market Intelligence',
    question: 'Where should we focus commercial effort?',
    flow: [
      'Understand',
      'Position',
      'Prioritize',
      'Engage',
    ],
    outcome:
      'A validated commercial hypothesis and targeted account engagement roadmap.',
  },
  {
    id: 'revops-tab',
    name: '2. RevOps & AI Infrastructure',
    question: 'How should the commercial engine operate?',
    flow: [
      'Prioritize',
      'Engage',
      'Diagnose',
      'Qualify',
    ],
    outcome:
      'A commercial system with maximum data accuracy, speed, and pipeline governance.',
  },
  {
    id: 'execution-tab',
    name: '3. Full-Cycle Commercial Execution',
    question: 'How do we move the right opportunity toward a closed customer decision?',
    flow: [
      'Diagnose',
      'Qualify',
      'Convert',
      'Expand',
    ],
    outcome: 'Senior commercial ownership from discovery through negotiation and expansion.',
  },
];

export const EXECUTION_SYSTEM_STAGES: ExecutionStage[] = [
  {
    step: '01',
    title: 'UNDERSTAND',
    description:
      'Product, market, customers, competitors and the existing commercial baseline.',
  },
  {
    step: '02',
    title: 'POSITION',
    description:
      'ICP, buyer problems, value proposition, differentiation and sales narrative.',
  },
  {
    step: '03',
    title: 'PRIORITIZE',
    description:
      'Account fit, verifiable triggers, business pain, buyer access and expansion potential.',
  },
  {
    step: '04',
    title: 'ENGAGE',
    description:
      'Relevant, personalized and coordinated multi-channel buyer outreach.',
  },
  {
    step: '05',
    title: 'DIAGNOSE',
    description:
      'Understand the business problem, current state, impact, urgency and desired outcome.',
  },
  {
    step: '06',
    title: 'QUALIFY',
    description:
      'Validate decision process, stakeholders, business case, critical event and deal quality.',
  },
  {
    step: '07',
    title: 'CONVERT',
    description:
      'Align the solution, prove value, develop proposal, navigate procurement, negotiate and close.',
  },
  {
    step: '08',
    title: 'EXPAND',
    description:
      'Support adoption, identify adjacent use cases, protect the relationship and grow the account.',
  },
];

export const ENGAGEMENT_PHASES: EngagementPhase[] = [
  {
    id: 'diagnose',
    tabLabel: 'Diagnose & Validate',
    timing: 'Weeks 1 to 2',
    activities: [
      'Product understanding',
      'Existing customers analysis',
      'Current pipeline review',
      'Past wins and losses audit',
      'Market conditions assessment',
      'ICP hypotheses formulation',
      'Buyer persona research',
      'CRM/process diagnostic',
    ],
    output: 'Commercial Baseline',
  },
  {
    id: 'build',
    tabLabel: 'Build the Motion',
    timing: 'Weeks 2 to 4',
    activities: [
      'ICP refinement & validation',
      'Account scoring matrix',
      'Buyer maps & committee blueprints',
      'Messaging architecture',
      'Sales narrative & collateral',
      'Outreach sequences design',
      'CRM architecture configuration',
      'Qualification criteria (MEDDPICC/SPICED)',
      'Target account list assembly',
      'Sales playbook documentation',
    ],
    output: 'GTM & Sales Execution System',
  },
  {
    id: 'execute',
    tabLabel: 'Execute & Learn',
    timing: 'Typically from Month 2',
    activities: [
      'Target account engagement',
      'Executive multi-channel outreach',
      'Discovery & requirements analysis',
      'Opportunity qualification',
      'Product discussions & demos',
      'Real-time market feedback capture',
      'Opportunity development & progression',
      'Pipeline governance & hygiene',
    ],
    output: 'Qualified Commercial Traction',
  },
  {
    id: 'convert',
    tabLabel: 'Convert, Expand & Systemize',
    timing: 'Based on actual sales-cycle progression',
    activities: [
      'Business cases development',
      'Solution validation & security checks',
      'Commercial proposals creation',
      'Contract negotiation & terms alignment',
      'Procurement navigation',
      'Contract closure & signature',
      'Customer handoff to delivery/CS',
      'Account expansion & cross-sell mapping',
      'Win/loss learning synthesis',
      'Process refinement & optimization',
    ],
    output: 'Repeatable Commercial Learning',
  },
];

export const COMMERCIAL_EXPERIENCES: CommercialExperienceCard[] = [
  {
    id: 'lims',
    title: 'LABORATORY & TESTING TECHNOLOGY',
    description:
      'Commercial experience around LIMS, laboratory digitization, quality workflows, workflow mapping, product positioning, implementation coordination and customer adoption.',
    tags: ['LIMS', 'Lab Digitization', 'Workflow Mapping', 'Enterprise'],
  },
  {
    id: 'insurance',
    title: 'INSURANCE & ENTERPRISE TECHNOLOGY',
    description:
      'Commercial experience involving Guidewire-related requirements, specialist technology resources, enterprise account development and long-term customer relationships.',
    tags: ['Guidewire', 'InsurTech', 'Enterprise Tech', 'Complex Sales'],
  },
  {
    id: 'etrm',
    title: 'ENTERPRISE APPLICATIONS & ENERGY TRADING',
    description:
      'Experience around complex enterprise application requirements, ETRM/OpenLink environments, technical alignment and commercial account development.',
    tags: ['ETRM', 'OpenLink', 'Commodities Trading', 'FinTech'],
  },
  {
    id: 'ai-digital',
    title: 'AI & DIGITAL PRODUCTS',
    description:
      'Experience supporting AI-enabled products, digital platforms, custom software and technical solution selling from opportunity identification through commercial execution.',
    tags: ['AI SaaS', 'Applied AI', 'Product Strategy', 'Full-Cycle'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'infocodec',
    quote:
      '“SalesNego completely changed how we approach B2B sales. They embedded with our team, understood our product deeply, and started generating qualified pipeline within weeks. The results spoke for themselves.”',
    author: 'Gandeep',
    company: 'Infocodec',
  },
  {
    id: 'tc-lims',
    quote:
      '“Working with SalesNego was one of the best decisions we made for our sales growth. They represented us professionally, managed the entire sales cycle, and delivered real closed deals, not just meetings.”',
    author: 'Josan',
    company: 'TC+ LIMS',
  },
  {
    id: 'client-placeholder',
    quote: 'Approved client testimonial verification in progress.',
    author: 'Commercial Leader',
    company: 'Enterprise AI & SaaS Partner',
    isPlaceholder: true,
  },
];

export const WHY_SALESNEGO_CARDS: WhySalesNegoCard[] = [
  {
    id: 'founder-led',
    title: 'FOUNDER-LED',
    description:
      'Important client work receives direct founder-level commercial involvement.',
  },
  {
    id: 'limited-portfolio',
    title: 'LIMITED CLIENT PORTFOLIO',
    description:
      'SalesNego deliberately limits the number of simultaneous engagements so commercial context is not lost across dozens of accounts.',
  },
  {
    id: 'product-first',
    title: 'PRODUCT-FIRST',
    description:
      'We understand the product, customer problem and buying environment before scaling outreach.',
  },
  {
    id: 'evidence-led',
    title: 'EVIDENCE-LED',
    description:
      'Accounts are prioritized using fit, triggers, identifiable problems, access and commercial potential rather than database volume.',
  },
  {
    id: 'end-to-end',
    title: 'END-TO-END OWNERSHIP',
    description:
      'Where scope requires it, SalesNego stays involved beyond prospecting through discovery, qualification, proposal, negotiation and account growth.',
  },
  {
    id: 'systems-stay',
    title: 'SYSTEMS THAT STAY',
    description:
      'CRM structure, playbooks, account intelligence and commercial learning remain usable by the client team.',
  },
];

export const ACCOUNT_GROWTH_STAGES: AccountGrowthStage[] = [
  {
    stage: '01',
    title: 'LAND',
    description: 'Solve the initial problem.',
  },
  {
    stage: '02',
    title: 'ADOPT',
    description: 'Create implementation and customer value.',
  },
  {
    stage: '03',
    title: 'EXPAND',
    description: 'Identify additional teams, workflows, modules or use cases.',
  },
  {
    stage: '04',
    title: 'RETAIN',
    description:
      'Protect the relationship through continued relevance and customer success.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Do you only provide lead generation?',
    answer:
      'No. Prospecting and demand generation can form part of an engagement, but SalesNego is designed around a broader commercial lifecycle that includes GTM strategy, Revenue Operations, discovery, qualification, sales execution, closing and account growth.',
  },
  {
    question: 'What types of companies do you work with?',
    answer:
      'Our primary focus is B2B SaaS, AI and technology product companies. We selectively work with differentiated technology services companies where the commercial problem requires consultative selling.',
  },
  {
    question: 'Can SalesNego work with our existing sales team?',
    answer:
      'Yes. SalesNego can operate alongside founders, internal sales teams, marketing, Customer Success, product and delivery teams. The exact ownership model is defined at the start of the engagement.',
  },
  {
    question: 'How do you use AI in sales?',
    answer:
      'AI is used to accelerate research, enrichment, account intelligence, personalization preparation, workflow automation, CRM administration, meeting intelligence and pipeline analysis. Strategic account decisions, discovery, negotiation and customer relationships remain human-led.',
  },
  {
    question: 'How are engagements priced?',
    answer:
      'Commercial structure depends on scope. Engagements may include a monthly retainer and, where appropriate, a performance component aligned to agreed commercial outcomes.',
  },
];
