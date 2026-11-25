import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calendar,
  MessageSquare,
  Plus,
  RotateCcw,
  Search,
} from 'lucide-react';
import { BUDGET_RANGES, CATEGORIES } from '../data/marketplaceData';

const STATUS_STYLES = {
  Open: 'bg-[#0D6E62]/10 text-[#0D6E62] border-[#0D6E62]/25',
  'In Review': 'bg-amber-50 text-amber-800 border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-800 border-sky-200',
  Completed: 'bg-stone-100 text-stone-700 border-stone-200',
};

function matchesBudget(project, budgetFilter) {
  if (budgetFilter === 'all') return true;
  const min = project.budgetMin;
  const max = project.budgetMax;
  if (budgetFilter === 'under-50k') return min < 50000;
  if (budgetFilter === '50k-150k') return max >= 50000 && min <= 150000;
  if (budgetFilter === '150k-300k') return max >= 150000 && min <= 300000;
  if (budgetFilter === '300k-plus') return max >= 300000;
  return true;
}

export default function ProjectsView({
  projects,
  searchQuery,
  categoryFilter,
  budgetFilter,
  onSearchChange,
  onCategoryChange,
  onBudgetChange,
  onResetFilters,
  onSelectProject,
  onOpenPostProject,
}) {
  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.clientCompany.toLowerCase().includes(q) ||
      project.skills.some((s) => s.toLowerCase().includes(q));

    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    return matchesSearch && matchesCategory && matchesBudget(project, budgetFilter);
  });

  const hasActiveFilters =
    searchQuery.trim() !== '' || categoryFilter !== 'all' || budgetFilter !== 'all';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E4DFD5] pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
            Project Briefs · INR (₹)
          </p>
          <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#141A18] sm:text-4xl">
            Explore{' '}
            <span className="font-serif-accent font-normal italic text-[#0D6E62]">open</span>{' '}
            opportunities
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Browse verified client briefs across engineering, design, writing, marketing, and data.
            Click any brief to review deliverables and submit your ₹ proposal.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPostProject}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#0D6E62] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#09544B]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Post a Project</span>
        </button>
      </div>

      {/* Search & Filters */}
      <search className="mt-6 rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-4 shadow-2xs sm:p-5">
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-label="Search and filter projects"
          className="grid gap-4 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <label htmlFor="project-search" className="block text-xs font-semibold text-zinc-700">
              Search Projects by Title or Skill
            </label>
            <div className="relative mt-1.5">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="e.g. React Dashboard, Brand Identity, Razorpay..."
                className="no-valid-ring w-full rounded-xl border border-[#D7D0C3] bg-[#F6F3EC]/70 py-2.5 pr-3 pl-10 text-sm text-[#141A18] placeholder:text-zinc-400 focus:border-[#0D6E62] focus:bg-white"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <label htmlFor="project-category" className="block text-xs font-semibold text-zinc-700">
              Category
            </label>
            <select
              id="project-category"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="no-valid-ring mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-[#F6F3EC]/70 px-3 py-2.5 text-sm text-[#141A18] focus:border-[#0D6E62] focus:bg-white"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="project-budget" className="block text-xs font-semibold text-zinc-700">
              Budget Range (INR)
            </label>
            <select
              id="project-budget"
              value={budgetFilter}
              onChange={(e) => onBudgetChange(e.target.value)}
              className="no-valid-ring mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-[#F6F3EC]/70 px-3 py-2.5 text-sm text-[#141A18] focus:border-[#0D6E62] focus:bg-white"
            >
              {BUDGET_RANGES.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200/70 pt-3 text-xs text-zinc-500">
          <p role="status" aria-live="polite">
            Showing <strong className="font-semibold text-[#141A18]">{filteredProjects.length}</strong>{' '}
            of {projects.length} projects
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 font-semibold text-[#0D6E62] hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </search>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-[#D7D0C3] bg-[#FFFDF9] p-12 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-zinc-400" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-bold text-[#141A18]">No matching projects found</h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            Try broadening your search keywords, category, or INR budget filter.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#141A18] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0D6E62]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Clear All Filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0D6E62] hover:shadow-lg hover:shadow-stone-900/5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#F0ECE1] px-3 py-1 text-xs font-bold text-[#141A18]">
                    {project.category}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_STYLES[project.status] || STATUS_STYLES.Open
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold leading-snug text-[#141A18]">
                  {project.title}
                </h2>

                <p className="font-mono-num mt-2 text-base font-bold text-[#0D6E62]">
                  {project.budgetDisplay}
                </p>

                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
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
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1 font-medium text-zinc-800">
                    {project.clientVerified && (
                      <BadgeCheck className="h-4 w-4 text-[#0D6E62]" aria-hidden="true" />
                    )}
                    {project.clientName} · {project.clientCompany}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-mono-num inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    Due {project.deadline}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    {project.proposalsCount} proposals
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#141A18] px-4 py-2 text-sm font-semibold text-[#FFFDF9] transition hover:bg-[#0D6E62]"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
