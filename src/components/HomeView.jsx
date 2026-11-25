import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Calendar,
  Code2,
  FileText,
  IndianRupee,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
} from 'lucide-react';
import { CATEGORIES, formatINR } from '../data/marketplaceData';

const CATEGORY_ICONS = {
  'Web Development': Code2,
  'UI/UX & Graphic Design': Palette,
  'Content Writing': FileText,
  'Digital Marketing': Megaphone,
  'Mobile Apps': Smartphone,
  'Data & Analytics': BarChart3,
};

const TICKER_ITEMS = [
  '₹4.8 Cr+ Milestone Payouts in 2026',
  'Zero Platform Commission Beta',
  'Verified Indian & Global Product Teams',
  'UPI & Razorpay-Ready Escrow Protection',
  'React • Figma • Next.js • Python • Flutter',
  'Avg. First Shortlist Under 18 Hours',
];

export default function HomeView({
  projects,
  freelancers,
  onNavigate,
  onSelectCategory,
  onSelectProject,
  onSelectFreelancer,
  onOpenPostProject,
  onQuickSearch,
}) {
  const [heroQuery, setHeroQuery] = useState('');
  const [heroMode, setHeroMode] = useState('projects');

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredFreelancers = freelancers.filter((f) => f.featured).slice(0, 3);
  const spotlightProject = featuredProjects[0] || projects[0];
  const spotlightMaker = featuredFreelancers[0] || freelancers[0];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onQuickSearch(heroMode, heroQuery.trim());
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Editorial Hero */}
      <section className="atelier-grid-bg relative overflow-hidden border-b border-[#E4DFD5] pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-[#0D6E62]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#C2410C]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy & Search */}
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-1.5 text-xs font-semibold text-[#141A18] shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-[#C2410C]" aria-hidden="true" />
                <span>Curated Freelance Atelier · Built for INR (₹) Teams</span>
              </div>

              <h1 className="hero-display font-extrabold text-[#141A18]">
                Commission{' '}
                <span className="font-serif-accent font-normal italic text-[#0D6E62]">
                  extraordinary
                </span>{' '}
                talent. Ship in days, not quarters.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                CraftLoom pairs ambitious startups and studios with vetted developers, designers,
                writers, and growth specialists across India and beyond—with transparent{' '}
                <strong className="font-semibold text-[#141A18]">₹ INR budgets</strong>, structured
                proposals, and zero hidden clutter.
              </p>

              {/* Quick Search Bar */}
              <search className="mt-8">
                <form
                  onSubmit={handleHeroSearch}
                  aria-label="Quick marketplace search"
                  className="flex flex-col gap-2 rounded-2xl border border-[#D7D0C3] bg-[#FFFDF9] p-2 shadow-xl shadow-stone-900/5 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-2 border-b border-stone-200 px-2 pb-2 sm:border-r sm:border-b-0 sm:pr-3 sm:pb-0">
                    <label htmlFor="hero-search-mode" className="visually-hidden">
                      Search target
                    </label>
                    <select
                      id="hero-search-mode"
                      value={heroMode}
                      onChange={(e) => setHeroMode(e.target.value)}
                      className="no-valid-ring min-h-[40px] cursor-pointer rounded-xl bg-[#F0ECE1] px-3 py-1.5 text-sm font-bold text-[#141A18]"
                    >
                      <option value="projects">Briefs</option>
                      <option value="freelancers">Makers</option>
                    </select>
                  </div>

                  <div className="relative flex flex-1 items-center">
                    <Search
                      className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-400"
                      aria-hidden="true"
                    />
                    <label htmlFor="hero-search-input" className="visually-hidden">
                      Search projects by title or freelancers by skill
                    </label>
                    <input
                      id="hero-search-input"
                      type="search"
                      value={heroQuery}
                      onChange={(e) => setHeroQuery(e.target.value)}
                      placeholder={
                        heroMode === 'projects'
                          ? 'Search briefs (e.g. React, Brand Identity, Razorpay)...'
                          : 'Search makers by skill (e.g. Figma, Python, Next.js)...'
                      }
                      className="no-valid-ring w-full rounded-xl border-0 bg-transparent py-2.5 pr-3 pl-9 text-sm text-[#141A18] placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#141A18] px-5 py-2.5 text-sm font-semibold text-[#FFFDF9] transition hover:bg-[#0D6E62]"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              </search>

              {/* Primary CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0D6E62] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09544B]"
                >
                  <span>Browse Open Briefs</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onOpenPostProject}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-6 py-2.5 text-sm font-semibold text-[#141A18] shadow-2xs transition hover:border-[#141A18]"
                >
                  <span>Post a Project</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('freelancers')}
                  className="inline-flex min-h-[46px] items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[#C2410C] transition hover:underline"
                >
                  <span>Meet Featured Makers</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Column: Layered Atelier Showcase Stack */}
            <div className="relative lg:col-span-5">
              <div className="space-y-4">
                {/* Featured Brief Card */}
                {spotlightProject && (
                  <div className="rounded-3xl border border-[#D7D0C3] bg-[#FFFDF9] p-6 shadow-xl shadow-stone-900/5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-num rounded-full bg-[#0D6E62]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0D6E62]">
                        Featured Brief
                      </span>
                      <span className="font-mono-num text-sm font-bold text-[#141A18]">
                        {spotlightProject.budgetDisplay}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-[#141A18]">
                      {spotlightProject.title}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {spotlightProject.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-lg border border-[#E4DFD5] bg-[#F6F3EC] px-2.5 py-1 text-xs font-medium text-zinc-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-stone-200/80 pt-3.5 text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-zinc-700">
                        <BadgeCheck className="h-4 w-4 text-[#0D6E62]" aria-hidden="true" />
                        {spotlightProject.clientCompany}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectProject(spotlightProject.id)}
                        className="font-bold text-[#0D6E62] hover:underline"
                      >
                        Inspect Brief →
                      </button>
                    </div>
                  </div>
                )}

                {/* Layered Bottom Pair: Spotlight Maker + Escrow Trust */}
                <div className="grid gap-4 sm:grid-cols-12">
                  {spotlightMaker && (
                    <button
                      type="button"
                      onClick={() => onSelectFreelancer(spotlightMaker)}
                      className="flex items-center gap-3.5 rounded-2xl border border-[#D7D0C3] bg-[#FFFDF9] p-4 text-left shadow-md shadow-stone-900/5 transition hover:border-[#0D6E62] sm:col-span-7"
                    >
                      <img
                        src={spotlightMaker.avatar}
                        alt={spotlightMaker.name}
                        width={48}
                        height={48}
                        className="aspect-square h-12 w-12 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#141A18]">
                          {spotlightMaker.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">{spotlightMaker.title}</p>
                        <p className="font-mono-num mt-1 text-xs font-bold text-[#0D6E62]">
                          {formatINR(spotlightMaker.hourlyRate)}/hr · ★ {spotlightMaker.rating}
                        </p>
                      </div>
                    </button>
                  )}

                  <div className="flex flex-col justify-between rounded-2xl bg-[#141A18] p-4 text-[#F6F3EC] shadow-md sm:col-span-5">
                    <div className="flex items-center justify-between">
                      <ShieldCheck className="h-5 w-5 text-[#5EEAD4]" aria-hidden="true" />
                      <IndianRupee className="h-4 w-4 text-[#FDBA74]" aria-hidden="true" />
                    </div>
                    <div className="mt-3">
                      <p className="font-mono-num text-xl font-bold">₹4.8 Cr+</p>
                      <p className="text-[11px] text-zinc-400">Escrow milestone payouts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="-mt-24 overflow-hidden border-b border-[#E4DFD5] bg-[#141A18] py-3 text-xs font-medium text-[#F6F3EC]">
        <div className="animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="mx-6 inline-flex items-center gap-3 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" aria-hidden="true" />
              <span className="font-mono-num tracking-wide">{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 01 / Popular Categories Bento */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
              01 / Disciplines
            </p>
            <h2
              id="categories-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#141A18] sm:text-4xl"
            >
              Craft across{' '}
              <span className="font-serif-accent font-normal italic text-[#0D6E62]">six</span>{' '}
              core practices
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-2 text-xs font-bold text-[#141A18] transition hover:border-[#141A18]"
          >
            <span>Explore all briefs</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Briefcase;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 text-left shadow-2xs transition duration-200 hover:-translate-y-1 hover:border-[#0D6E62] hover:shadow-lg hover:shadow-stone-900/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${cat.accent}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono-num text-xs font-bold text-zinc-400">
                    /{cat.index}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-[#141A18] group-hover:text-[#0D6E62]">
                    {cat.label}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">{cat.tagline}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-stone-200/80 pt-3 text-xs">
                  <span className="font-mono-num font-semibold text-[#141A18]">
                    From {cat.minBudget}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-zinc-500 group-hover:text-[#0D6E62]">
                    {cat.count} briefs
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Dark Contrast Band: How CraftLoom Works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="intro-heading">
        <div className="overflow-hidden rounded-[2rem] bg-[#141A18] px-6 py-12 text-[#F6F3EC] shadow-xl sm:px-12 sm:py-16">
          <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#5EEAD4]">
                Platform Architecture
              </p>
              <h2 id="intro-heading" className="mt-2 text-2xl font-extrabold sm:text-4xl">
                Built for{' '}
                <span className="font-serif-accent font-normal italic text-[#FDBA74]">
                  transparent
                </span>{' '}
                collaboration
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Every project brief, rupee quote, and freelancer portfolio lives in a calm,
              structured workspace backed by instant LocalStorage persistence.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <article className="space-y-3">
              <span className="font-mono-num inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D6E62] text-sm font-bold text-white">
                01
              </span>
              <h3 className="text-lg font-bold">Scope With Clear INR Ranges</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Clients publish detailed briefs with milestones, deadlines, and ₹ budgets. Makers
                filter opportunities in seconds without guesswork.
              </p>
            </article>

            <article className="space-y-3">
              <span className="font-mono-num inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C] text-sm font-bold text-white">
                02
              </span>
              <h3 className="text-lg font-bold">Send Focused Proposals</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Inspect deliverables and client verification before pitching your custom ₹ quote,
                delivery timeline, and tailored cover letter.
              </p>
            </article>

            <article className="space-y-3">
              <span className="font-mono-num inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-sm font-bold text-[#5EEAD4]">
                03
              </span>
              <h3 className="text-lg font-bold">Manage Everything in Dashboard</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Track project statuses, review active bids, and edit your maker profile directly
                inside your unified workspace.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 02 / Featured Projects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="featured-projects-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
              02 / Curated Briefs
            </p>
            <h2
              id="featured-projects-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#141A18] sm:text-4xl"
            >
              Active client briefs in{' '}
              <span className="font-serif-accent font-normal italic text-[#0D6E62]">INR</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-2 text-xs font-bold text-[#141A18] transition hover:border-[#141A18]"
          >
            <span>View all {projects.length} projects</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0D6E62] hover:shadow-lg hover:shadow-stone-900/5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#F0ECE1] px-3 py-1 text-xs font-bold text-[#141A18]">
                    {project.category}
                  </span>
                  <span className="font-mono-num rounded-full bg-[#0D6E62]/10 px-3 py-1 text-xs font-bold text-[#0D6E62]">
                    {project.budgetDisplay}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug text-[#141A18]">
                  {project.title}
                </h3>

                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#E4DFD5] bg-[#F6F3EC] px-2.5 py-1 text-xs font-medium text-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-stone-200/80 pt-4">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1 font-semibold text-zinc-800">
                    {project.clientVerified && (
                      <BadgeCheck className="h-4 w-4 text-[#0D6E62]" aria-hidden="true" />
                    )}
                    {project.clientCompany}
                  </span>
                  <span className="font-mono-num inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {project.deadline}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#141A18] px-4 py-2 text-sm font-semibold text-[#FFFDF9] transition hover:bg-[#0D6E62]"
                >
                  <span>Inspect Brief &amp; Propose</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 / Featured Makers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="featured-freelancers-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
              03 / Featured Makers
            </p>
            <h2
              id="featured-freelancers-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#141A18] sm:text-4xl"
            >
              Independent talent with{' '}
              <span className="font-serif-accent font-normal italic text-[#0D6E62]">proven</span>{' '}
              portfolios
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('freelancers')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-2 text-xs font-bold text-[#141A18] transition hover:border-[#141A18]"
          >
            <span>Browse all makers</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredFreelancers.map((freelancer) => (
            <article
              key={freelancer.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0D6E62] hover:shadow-lg hover:shadow-stone-900/5"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={freelancer.avatar}
                    alt={`${freelancer.name} profile portrait`}
                    width={60}
                    height={60}
                    className="aspect-square h-15 w-15 shrink-0 rounded-2xl object-cover shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-base font-bold text-[#141A18]">
                        {freelancer.name}
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                        {freelancer.rating}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-[#0D6E62]">
                      {freelancer.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-md bg-[#F0ECE1] px-2 py-0.5 font-semibold text-[#141A18]">
                        {freelancer.experienceLevel}
                      </span>
                      <span className="font-mono-num font-bold text-[#141A18]">
                        {formatINR(freelancer.hourlyRate)}/hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Portfolio Thumbnail Preview */}
                {freelancer.portfolio[0]?.thumb && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#E4DFD5]">
                    <img
                      src={freelancer.portfolio[0].thumb}
                      alt={freelancer.portfolio[0].title}
                      width={320}
                      height={180}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                )}

                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                  {freelancer.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {freelancer.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#E4DFD5] bg-[#F6F3EC] px-2.5 py-1 text-xs font-medium text-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectFreelancer(freelancer)}
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-2 text-sm font-semibold text-[#141A18] transition hover:border-[#0D6E62] hover:bg-[#0D6E62] hover:text-white"
              >
                <span>View Profile &amp; Portfolio</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#D7D0C3] bg-gradient-to-br from-[#FFFDF9] via-[#F6F3EC] to-[#EAE4D7] px-6 py-12 shadow-sm sm:px-12 sm:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
                Start Your Next Sprint
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#141A18] sm:text-3xl">
                Publish an INR project brief or showcase your craft today.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                Post your scope in under two minutes or manage your active bids and freelancer
                credentials inside your CraftLoom Dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <button
                type="button"
                onClick={onOpenPostProject}
                className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#0D6E62] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#09544B]"
              >
                Post a Project
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#141A18] bg-[#141A18] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Open Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
