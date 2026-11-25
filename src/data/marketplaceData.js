// Seed data, Indian Rupee (INR) formatters, and bespoke SVG artwork generators for CraftLoom

export function formatINR(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatINRRange(min, max) {
  return `${formatINR(min)} – ${formatINR(max)}`;
}

export function makeAvatarSvg(initials, bgHex, accentHex) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${initials}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgHex}"/>
        <stop offset="100%" stop-color="${accentHex}"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="28" fill="url(#g)"/>
    <circle cx="96" cy="24" r="24" fill="rgba(255,255,255,0.14)"/>
    <path d="M0 98 Q60 72 120 102 L120 120 L0 120 Z" fill="rgba(0,0,0,0.14)"/>
    <text x="60" y="72" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="38" font-weight="700" fill="#ffffff" letter-spacing="1">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function makePortfolioThumbSvg(primary, secondary, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="${label}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${primary}"/>
        <stop offset="100%" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    <rect width="320" height="180" rx="16" fill="url(#bg)"/>
    <rect x="20" y="22" width="280" height="136" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)"/>
    <circle cx="38" cy="40" r="5" fill="rgba(255,255,255,0.55)"/>
    <circle cx="54" cy="40" r="5" fill="rgba(255,255,255,0.35)"/>
    <circle cx="70" cy="40" r="5" fill="rgba(255,255,255,0.2)"/>
    <rect x="36" y="62" width="130" height="14" rx="4" fill="rgba(255,255,255,0.75)"/>
    <rect x="36" y="86" width="90" height="10" rx="3" fill="rgba(255,255,255,0.4)"/>
    <rect x="36" y="108" width="64" height="24" rx="6" fill="rgba(255,255,255,0.88)"/>
    <rect x="184" y="62" width="96" height="72" rx="8" fill="rgba(255,255,255,0.2)"/>
    <path d="M196 118 L216 94 L236 106 L264 76" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CATEGORIES = [
  {
    id: 'Web Development',
    label: 'Web Development',
    index: '01',
    count: 148,
    minBudget: '₹45,000',
    tagline: 'React, Next.js, APIs & full-stack builds',
    accent: 'bg-[#0D6E62]/10 text-[#0D6E62] border-[#0D6E62]/20',
  },
  {
    id: 'UI/UX & Graphic Design',
    label: 'UI/UX & Graphic Design',
    index: '02',
    count: 96,
    minBudget: '₹30,000',
    tagline: 'Design systems, brand identity & Figma',
    accent: 'bg-[#C2410C]/10 text-[#C2410C] border-[#C2410C]/20',
  },
  {
    id: 'Content Writing',
    label: 'Content Writing',
    index: '03',
    count: 82,
    minBudget: '₹18,000',
    tagline: 'Technical docs, SaaS copy & SEO stories',
    accent: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  {
    id: 'Digital Marketing',
    label: 'Digital Marketing',
    index: '04',
    count: 64,
    minBudget: '₹25,000',
    tagline: 'Growth funnels, paid ads & lifecycle email',
    accent: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  {
    id: 'Mobile Apps',
    label: 'Mobile Apps',
    index: '05',
    count: 53,
    minBudget: '₹80,000',
    tagline: 'iOS, Android, React Native & Flutter',
    accent: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  {
    id: 'Data & Analytics',
    label: 'Data & Analytics',
    index: '06',
    count: 41,
    minBudget: '₹55,000',
    tagline: 'BI dashboards, SQL pipelines & Python ML',
    accent: 'bg-amber-50 text-amber-800 border-amber-200',
  },
];

export const BUDGET_RANGES = [
  { id: 'all', label: 'All Budgets (₹)' },
  { id: 'under-50k', label: 'Under ₹50,000' },
  { id: '50k-150k', label: '₹50,000 – ₹1,50,000' },
  { id: '150k-300k', label: '₹1,50,000 – ₹3,00,000' },
  { id: '300k-plus', label: '₹3,00,000+' },
];

export const EXPERIENCE_LEVELS = ['All Levels', 'Entry', 'Intermediate', 'Expert'];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-101',
    title: 'SaaS Analytics Dashboard Redesign in React & Tailwind',
    category: 'Web Development',
    budgetMin: 180000,
    budgetMax: 280000,
    budgetDisplay: formatINRRange(180000, 280000),
    description:
      'We are rebuilding our B2B revenue analytics portal and need an experienced frontend engineer to craft a responsive React + Tailwind CSS dashboard with interactive cohort charts, keyboard-accessible data tables, and multi-currency INR reporting.',
    deliverables: [
      'Component library with 12+ reusable dashboard widgets',
      'Responsive grid layout supporting desktop, tablet, and mobile',
      'Clean REST/JSON integration layer with loading & error states',
      'WCAG AA accessible navigation, filters, and modal dialogs',
    ],
    skills: ['React', 'Tailwind CSS', 'TypeScript', 'Charting', 'REST APIs'],
    deadline: '2026-12-22',
    postedAt: '2 days ago',
    clientName: 'Rohan Deshmukh',
    clientCompany: 'MetricPulse Labs',
    clientLocation: 'Bengaluru, IN',
    clientVerified: true,
    clientProjectsPosted: 14,
    proposalsCount: 7,
    status: 'Open',
    featured: true,
    isOwner: false,
  },
  {
    id: 'proj-102',
    title: 'Complete Brand Identity & Figma Design System for FinTech App',
    category: 'UI/UX & Graphic Design',
    budgetMin: 120000,
    budgetMax: 210000,
    budgetDisplay: formatINRRange(120000, 210000),
    description:
      'Seeking a senior product & brand designer to establish a cohesive visual identity, logo mark, color tokens, typography scale, and interactive Figma prototype for a UPI micro-savings & wealth mobile app.',
    deliverables: [
      'Logo suite, brand guidelines PDF, and social launch kit',
      'Figma component library with auto-layout and design tokens',
      '18 high-fidelity mobile & KYC onboarding screens',
    ],
    skills: ['Figma', 'Brand Identity', 'Design Systems', 'UI/UX', 'Prototyping'],
    deadline: '2026-12-18',
    postedAt: '1 day ago',
    clientName: 'Ananya Kulkarni',
    clientCompany: 'KuberFlow Wealth',
    clientLocation: 'Mumbai, IN',
    clientVerified: true,
    clientProjectsPosted: 9,
    proposalsCount: 11,
    status: 'Open',
    featured: true,
    isOwner: false,
  },
  {
    id: 'proj-103',
    title: 'Developer Documentation & Technical Blog Series (8 Articles)',
    category: 'Content Writing',
    budgetMin: 65000,
    budgetMax: 110000,
    budgetDisplay: formatINRRange(65000, 110000),
    description:
      'Looking for a technical writer comfortable reading OpenAPI specs and TypeScript SDKs to produce crystal-clear quickstart guides and 8 deep-dive engineering tutorials for our developer API platform.',
    deliverables: [
      'Quickstart onboarding guide + authentication walkthrough',
      '8 long-form SEO-friendly technical tutorials (1,400+ words each)',
      'Tested curl & Node.js code snippets for every endpoint',
    ],
    skills: ['Technical Writing', 'API Docs', 'Markdown', 'SEO', 'JavaScript'],
    deadline: '2026-12-30',
    postedAt: '3 days ago',
    clientName: 'Priya Nair',
    clientCompany: 'RelayFlow Cloud',
    clientLocation: 'Hyderabad, IN',
    clientVerified: true,
    clientProjectsPosted: 21,
    proposalsCount: 5,
    status: 'Open',
    featured: true,
    isOwner: false,
  },
  {
    id: 'proj-104',
    title: 'Full-Stack D2C Storefront with Razorpay & UPI Checkout',
    category: 'Web Development',
    budgetMin: 350000,
    budgetMax: 520000,
    budgetDisplay: formatINRRange(350000, 520000),
    description:
      'We are launching a curated sustainable home-goods storefront and need a full-stack developer to build a fast Next.js frontend, product filtering, cart persistence, Razorpay UPI checkout, and automated invoice generation.',
    deliverables: [
      'Storefront with category filtering, search, and product variants',
      'Razorpay UPI/card payment flow & webhook order fulfillment',
      'Admin inventory dashboard and GST invoice PDF export',
    ],
    skills: ['Next.js', 'React', 'Node.js', 'Razorpay', 'PostgreSQL'],
    deadline: '2027-01-15',
    postedAt: '4 hours ago',
    clientName: 'Meera Kapoor',
    clientCompany: 'Terracotta Living',
    clientLocation: 'New Delhi, IN',
    clientVerified: true,
    clientProjectsPosted: 6,
    proposalsCount: 4,
    status: 'Open',
    featured: false,
    isOwner: false,
  },
  {
    id: 'proj-105',
    title: 'B2B SaaS Launch Paid Acquisition & Funnel Audit',
    category: 'Digital Marketing',
    budgetMin: 75000,
    budgetMax: 145000,
    budgetDisplay: formatINRRange(75000, 145000),
    description:
      'Need an experienced growth marketer to audit our LinkedIn & Google Search campaigns, build a high-converting landing page test plan, and configure GA4 conversion tracking ahead of our Q1 release.',
    deliverables: [
      'Campaign performance audit & wasted-spend report',
      '3 ad copy & creative test matrices for LinkedIn & Search',
      'GA4 + HubSpot attribution tracking implementation',
    ],
    skills: ['Google Ads', 'LinkedIn Ads', 'GA4', 'Conversion Optimization', 'Copywriting'],
    deadline: '2026-12-14',
    postedAt: '5 days ago',
    clientName: 'Siddharth Verma',
    clientCompany: 'StackPilot HQ',
    clientLocation: 'Gurugram, IN',
    clientVerified: true,
    clientProjectsPosted: 12,
    proposalsCount: 9,
    status: 'In Review',
    featured: false,
    isOwner: false,
  },
  {
    id: 'proj-106',
    title: 'Cross-Platform Habit & Wellness Tracker Mobile App',
    category: 'Mobile Apps',
    budgetMin: 260000,
    budgetMax: 420000,
    budgetDisplay: formatINRRange(260000, 420000),
    description:
      'Build an offline-first React Native or Flutter app with daily habit streaks, push reminders, custom themes, and weekly progress charts synced cleanly across iOS and Android.',
    deliverables: [
      'iOS & Android builds with local storage + cloud sync',
      'Interactive streak calendar and reminder notifications',
      'App Store & Play Store release checklist',
    ],
    skills: ['React Native', 'Flutter', 'Mobile UI', 'LocalStorage', 'Push Notifications'],
    deadline: '2027-01-20',
    postedAt: '2 days ago',
    clientName: 'Kavya Menon',
    clientCompany: 'MindfulLoop',
    clientLocation: 'Kochi, IN',
    clientVerified: false,
    clientProjectsPosted: 3,
    proposalsCount: 6,
    status: 'Open',
    featured: false,
    isOwner: false,
  },
  {
    id: 'proj-107',
    title: 'Customer Churn Prediction Model & Executive BI Report',
    category: 'Data & Analytics',
    budgetMin: 160000,
    budgetMax: 240000,
    budgetDisplay: formatINRRange(160000, 240000),
    description:
      'Analyze 18 months of subscription billing and product usage logs to identify leading churn indicators, train an interpretable classification model in Python, and present findings in a clean executive summary.',
    deliverables: [
      'Cleaned dataset pipeline & feature engineering notebook',
      'Model evaluation comparing logistic regression & gradient boosting',
      'Interactive executive dashboard & retention recommendations',
    ],
    skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Pandas'],
    deadline: '2026-12-28',
    postedAt: '1 week ago',
    clientName: 'Vikramaditya Rao',
    clientCompany: 'CloudHarbor Systems',
    clientLocation: 'Pune, IN',
    clientVerified: true,
    clientProjectsPosted: 17,
    proposalsCount: 8,
    status: 'Open',
    featured: false,
    isOwner: false,
  },
  {
    id: 'proj-108',
    title: 'Social Media Visual Kit & Product Launch Motion Graphics',
    category: 'UI/UX & Graphic Design',
    budgetMin: 32000,
    budgetMax: 48000,
    budgetDisplay: formatINRRange(32000, 48000),
    description:
      'Looking for a creative graphic designer to craft 20 reusable social templates (Instagram, LinkedIn, X) plus 3 short animated product teaser graphics for our upcoming workspace tool launch.',
    deliverables: [
      '20 editable Figma/Canva social media templates',
      '3 looping MP4/GIF product highlight teasers',
      'Typography & color usage cheat-sheet',
    ],
    skills: ['Graphic Design', 'Motion Graphics', 'Figma', 'Illustration', 'Branding'],
    deadline: '2026-12-10',
    postedAt: '6 days ago',
    clientName: 'Tanya Bose',
    clientCompany: 'Atelier Studio',
    clientLocation: 'Kolkata, IN',
    clientVerified: true,
    clientProjectsPosted: 8,
    proposalsCount: 13,
    status: 'Open',
    featured: false,
    isOwner: false,
  },
  {
    id: 'proj-109',
    title: 'Interactive Learning Portal Frontend (Bootcamp Prototype)',
    category: 'Web Development',
    budgetMin: 38000,
    budgetMax: 65000,
    budgetDisplay: formatINRRange(38000, 65000),
    description:
      'Build a responsive course catalog and lesson progress tracker using HTML, CSS, JavaScript, and LocalStorage for an independent coding academy.',
    deliverables: [
      'Course search, category filter, and lesson detail view',
      'Progress persistence in LocalStorage with completion badges',
      'Accessible keyboard navigation and mobile-first layout',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'LocalStorage'],
    deadline: '2026-12-19',
    postedAt: '3 days ago',
    clientName: 'Arjun Malhotra',
    clientCompany: 'NorthStar Academy',
    clientLocation: 'Chandigarh, IN',
    clientVerified: true,
    clientProjectsPosted: 5,
    proposalsCount: 6,
    status: 'In Progress',
    featured: false,
    isOwner: true,
  },
];

export const INITIAL_FREELANCERS = [
  {
    id: 'fl-201',
    name: 'Aarav Mehta',
    title: 'Senior Full-Stack & React Engineer',
    avatar: makeAvatarSvg('AM', '#0D6E62', '#083E37'),
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    experienceLevel: 'Expert',
    hourlyRate: 3200,
    rating: 4.96,
    reviewsCount: 48,
    completedProjects: 62,
    location: 'Bengaluru, IN',
    availability: 'Available Now',
    featured: true,
    bio: 'Full-stack product engineer with 7+ years crafting high-converting SaaS dashboards, design systems, and Razorpay/Stripe-powered web applications. Obsessed with clean architecture, Core Web Vitals, and WCAG accessibility.',
    portfolio: [
      {
        title: 'PulseBoard Revenue Analytics',
        category: 'Web Development',
        outcome: '+38% faster reporting workflows for 12k active teams',
        thumb: makePortfolioThumbSvg('#0D6E62', '#134E4A', 'PulseBoard Analytics'),
      },
      {
        title: 'CartCraft Headless Storefront',
        category: 'E-Commerce',
        outcome: '99 Lighthouse performance & 2.4% checkout lift',
        thumb: makePortfolioThumbSvg('#141A18', '#334155', 'CartCraft Storefront'),
      },
    ],
    reviews: [
      {
        client: 'Rohan Deshmukh · MetricPulse Labs',
        rating: 5,
        comment: 'Delivered a rock-solid React architecture ahead of schedule with thoughtful UX details.',
      },
      {
        client: 'Siddharth Verma · StackPilot HQ',
        rating: 5,
        comment: 'Clear daily updates and spotless code. Will definitely rehire for phase two.',
      },
    ],
  },
  {
    id: 'fl-202',
    name: 'Maya Krishnan',
    title: 'Product Designer & Brand Strategist',
    avatar: makeAvatarSvg('MK', '#C2410C', '#7C2D12'),
    skills: ['Figma', 'Design Systems', 'Brand Identity', 'UI/UX', 'Prototyping'],
    experienceLevel: 'Expert',
    hourlyRate: 2800,
    rating: 4.92,
    reviewsCount: 39,
    completedProjects: 51,
    location: 'Mumbai, IN',
    availability: 'Available Now',
    featured: true,
    bio: 'Design systems specialist bridging crisp editorial typography with practical product usability. Previously led UI/UX sprints for early-stage fintech, healthcare, and climate-tech startups.',
    portfolio: [
      {
        title: 'Kinetik Banking Mobile UI Kit',
        category: 'UI/UX & Graphic Design',
        outcome: 'Adopted across 45 screens with zero dev handoff ambiguity',
        thumb: makePortfolioThumbSvg('#C2410C', '#9A3412', 'Kinetik Banking UI'),
      },
      {
        title: 'Solstice Wellness Rebrand',
        category: 'Brand Identity',
        outcome: 'Boosted waitlist signups 2.1x during product launch',
        thumb: makePortfolioThumbSvg('#B45309', '#78350F', 'Solstice Rebrand'),
      },
    ],
    reviews: [
      {
        client: 'Ananya Kulkarni · KuberFlow Wealth',
        rating: 5,
        comment: 'Maya turned rough wireframes into an unmistakable brand system our users love.',
      },
      {
        client: 'Tanya Bose · Atelier Studio',
        rating: 4.8,
        comment: 'Thoughtful rationales behind every design token and great Figma hygiene.',
      },
    ],
  },
  {
    id: 'fl-203',
    name: 'Ishaan Verma',
    title: 'Technical Writer & SaaS Content Strategist',
    avatar: makeAvatarSvg('IV', '#4338CA', '#312E81'),
    skills: ['Technical Writing', 'API Docs', 'SEO', 'Copywriting', 'Markdown'],
    experienceLevel: 'Intermediate',
    hourlyRate: 1850,
    rating: 4.88,
    reviewsCount: 27,
    completedProjects: 34,
    location: 'Pune, IN',
    availability: '20 hrs/wk',
    featured: true,
    bio: 'Former software developer turned technical writer. I help DevTools and SaaS teams translate complex SDKs, webhooks, and release notes into engaging documentation and tutorials.',
    portfolio: [
      {
        title: 'Webhook Gateway Developer Portal',
        category: 'Content Writing',
        outcome: 'Cut support onboarding tickets by 41% in 60 days',
        thumb: makePortfolioThumbSvg('#4338CA', '#1E1B4B', 'Webhook Portal Docs'),
      },
      {
        title: 'CloudCost Engineering Blog Series',
        category: 'SEO Content',
        outcome: '18,000+ organic developer reads in Q3',
        thumb: makePortfolioThumbSvg('#0F766E', '#1E293B', 'CloudCost Blog'),
      },
    ],
    reviews: [
      {
        client: 'Priya Nair · RelayFlow Cloud',
        rating: 5,
        comment: 'Every code sample ran cleanly out of the box—rare to find a writer who tests the API!',
      },
    ],
  },
  {
    id: 'fl-204',
    name: 'Nadia Okafor',
    title: 'Performance Marketer & Growth Analyst',
    avatar: makeAvatarSvg('NO', '#BE123C', '#881337'),
    skills: ['Google Ads', 'LinkedIn Ads', 'GA4', 'Conversion Optimization', 'Email Funnels'],
    experienceLevel: 'Expert',
    hourlyRate: 2600,
    rating: 4.94,
    reviewsCount: 31,
    completedProjects: 44,
    location: 'London, UK',
    availability: 'Available Now',
    featured: false,
    bio: 'Data-driven acquisition specialist helping B2B SaaS and D2C brands lower CAC through disciplined A/B creative testing, clean attribution, and high-intent landing pages.',
    portfolio: [
      {
        title: 'B2B SaaS Pipeline Scaling',
        category: 'Digital Marketing',
        outcome: '3.4x qualified demo pipeline at 28% lower CPA',
        thumb: makePortfolioThumbSvg('#BE123C', '#881337', 'SaaS Pipeline Scaling'),
      },
      {
        title: 'Lifecycle Onboarding Email Flow',
        category: 'Retention',
        outcome: 'Lifted trial-to-paid conversion from 11% to 17.5%',
        thumb: makePortfolioThumbSvg('#0369A1', '#1E293B', 'Lifecycle Email Flow'),
      },
    ],
    reviews: [
      {
        client: 'Siddharth Verma · StackPilot HQ',
        rating: 5,
        comment: 'Identified wasted ad spend in week one and rebuilt our funnel tracking cleanly.',
      },
    ],
  },
  {
    id: 'fl-205',
    name: 'Ethan Sato',
    title: 'Mobile App Developer (React Native & Flutter)',
    avatar: makeAvatarSvg('ES', '#0369A1', '#0C4A6E'),
    skills: ['React Native', 'Flutter', 'TypeScript', 'Mobile UI', 'Firebase'],
    experienceLevel: 'Intermediate',
    hourlyRate: 2200,
    rating: 4.85,
    reviewsCount: 19,
    completedProjects: 23,
    location: 'Singapore',
    availability: 'Available Now',
    featured: false,
    bio: 'Cross-platform mobile specialist focused on fluid 60fps animations, offline-first caching, and reliable App Store / Play Store shipping pipelines.',
    portfolio: [
      {
        title: 'TrailSync Offline Companion',
        category: 'Mobile Apps',
        outcome: '4.8-star App Store rating across 9,000+ downloads',
        thumb: makePortfolioThumbSvg('#0369A1', '#0C4A6E', 'TrailSync Mobile App'),
      },
      {
        title: 'HabitSpark Daily Tracker',
        category: 'Mobile Apps',
        outcome: 'Built MVP to launch in 5 weeks',
        thumb: makePortfolioThumbSvg('#0D6E62', '#0F172A', 'HabitSpark App'),
      },
    ],
    reviews: [
      {
        client: 'Kavya Menon · MindfulLoop',
        rating: 4.9,
        comment: 'Super responsive on TestFlight feedback and nailed the streak animations.',
      },
    ],
  },
  {
    id: 'fl-206',
    name: 'Diya Sengupta',
    title: 'Junior Frontend Developer & UI Implementer',
    avatar: makeAvatarSvg('DS', '#047857', '#064E3B'),
    skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
    experienceLevel: 'Entry',
    hourlyRate: 1100,
    rating: 4.8,
    reviewsCount: 11,
    completedProjects: 14,
    location: 'Kolkata, IN',
    availability: 'Available Now',
    featured: false,
    bio: 'Detail-oriented frontend developer turning Figma mockups into semantic, mobile-first HTML, CSS, Tailwind, and React interfaces with fast turnaround times.',
    portfolio: [
      {
        title: 'Artisan Roasters Storefront',
        category: 'Web Development',
        outcome: '100/100 mobile usability & semantic accessibility audit',
        thumb: makePortfolioThumbSvg('#047857', '#064E3B', 'Artisan Roasters'),
      },
      {
        title: 'Student Portfolio Template Kit',
        category: 'UI Implementation',
        outcome: 'Used by 250+ academy graduates',
        thumb: makePortfolioThumbSvg('#B45309', '#451A03', 'Portfolio Template Kit'),
      },
    ],
    reviews: [
      {
        client: 'Arjun Malhotra · NorthStar Academy',
        rating: 4.8,
        comment: 'Great communicator, quick learner, and delivered responsive layouts cleanly.',
      },
    ],
  },
  {
    id: 'fl-207',
    name: 'Dr. Ravi Subramanian',
    title: 'Data Scientist & BI Analytics Consultant',
    avatar: makeAvatarSvg('RS', '#1F2937', '#0F172A'),
    skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Pandas'],
    experienceLevel: 'Expert',
    hourlyRate: 3800,
    rating: 4.98,
    reviewsCount: 36,
    completedProjects: 49,
    location: 'Chennai, IN',
    availability: '15 hrs/wk',
    featured: false,
    bio: 'Analytics consultant specializing in churn modeling, cohort retention, SQL warehouse modeling, and clear executive storytelling for growth-stage software companies.',
    portfolio: [
      {
        title: 'SaaS Revenue & Churn Forecasting',
        category: 'Data & Analytics',
        outcome: 'Predicted 84% of at-risk renewals 45 days in advance',
        thumb: makePortfolioThumbSvg('#1F2937', '#0F172A', 'Churn Forecasting'),
      },
      {
        title: 'Multi-Channel Attribution Warehouse',
        category: 'BI Pipelines',
        outcome: 'Unified 6 data sources into automated daily KPIs',
        thumb: makePortfolioThumbSvg('#0D6E62', '#1E293B', 'Attribution Warehouse'),
      },
    ],
    reviews: [
      {
        client: 'Vikramaditya Rao · CloudHarbor',
        rating: 5,
        comment: 'Turned messy billing tables into actionable executive insights within two weeks.',
      },
    ],
  },
];

export const INITIAL_USER_PROFILE = {
  name: 'Kabir Sharma',
  role: 'Full-Stack Freelancer & Product Builder',
  email: 'kabir.sharma@craftloom.in',
  phone: '+91 98201 44510',
  portfolioUrl: 'https://kabirsharma.dev',
  location: 'Bengaluru, IN',
  experienceLevel: 'Intermediate',
  hourlyRate: 2100,
  skills: ['React', 'Tailwind CSS', 'JavaScript', 'UI/UX', 'Node.js'],
  bio: 'Independent web developer and UI designer building fast, accessible web apps for Indian startups and global teams.',
};

export const INITIAL_PROPOSALS = [
  {
    id: 'prop-901',
    projectId: 'proj-101',
    projectTitle: 'SaaS Analytics Dashboard Redesign in React & Tailwind',
    clientCompany: 'MetricPulse Labs',
    freelancerName: 'Kabir Sharma',
    contactDetails: 'kabir.sharma@craftloom.in',
    expectedBudget: 215000,
    deliveryDays: 21,
    coverLetter:
      'I have built three production B2B analytics portals using React, TypeScript, and Tailwind CSS with full keyboard accessibility and INR currency formatting. I can share live component demos and deliver the initial design system within week one.',
    submittedAt: '2026-11-23',
    status: 'Shortlisted',
  },
  {
    id: 'prop-902',
    projectId: 'proj-103',
    projectTitle: 'Developer Documentation & Technical Blog Series (8 Articles)',
    clientCompany: 'RelayFlow Cloud',
    freelancerName: 'Kabir Sharma',
    contactDetails: 'kabir.sharma@craftloom.in',
    expectedBudget: 82000,
    deliveryDays: 18,
    coverLetter:
      'As a full-stack engineer who writes weekly technical tutorials, I can verify every API call against your sandbox and deliver clean, developer-ready guides with tested Node.js and curl examples.',
    submittedAt: '2026-11-24',
    status: 'Pending Review',
  },
];
