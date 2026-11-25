import { Award, FolderKanban, MapPin, RotateCcw, Search, Star, UserCheck } from 'lucide-react';
import { EXPERIENCE_LEVELS, formatINR } from '../data/marketplaceData';

const LEVEL_BADGE = {
  Entry: 'bg-[#0D6E62]/10 text-[#0D6E62] border-[#0D6E62]/20',
  Intermediate: 'bg-sky-50 text-sky-800 border-sky-200',
  Expert: 'bg-[#C2410C]/10 text-[#C2410C] border-[#C2410C]/20',
};

export default function FreelancersView({
  freelancers,
  skillSearch,
  levelFilter,
  onSkillSearchChange,
  onLevelFilterChange,
  onResetFilters,
  onSelectFreelancer,
}) {
  const filtered = freelancers.filter((f) => {
    const q = skillSearch.trim().toLowerCase();
    const matchesSkill =
      !q ||
      f.skills.some((s) => s.toLowerCase().includes(q)) ||
      f.name.toLowerCase().includes(q) ||
      f.title.toLowerCase().includes(q);
    const matchesLevel = levelFilter === 'All Levels' || f.experienceLevel === levelFilter;
    return matchesSkill && matchesLevel;
  });

  const hasFilters = skillSearch.trim() !== '' || levelFilter !== 'All Levels';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="border-b border-[#E4DFD5] pb-6">
        <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
          Maker Directory · INR Rates
        </p>
        <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#141A18] sm:text-4xl">
          Discover{' '}
          <span className="font-serif-accent font-normal italic text-[#0D6E62]">vetted</span>{' '}
          independent talent
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Search makers by skill, compare expertise levels, inspect visual portfolio outcomes, and
          read verified client reviews.
        </p>
      </div>

      {/* Search & Level Filter */}
      <search className="mt-6 rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-4 shadow-2xs sm:p-5">
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-label="Search and filter freelancers"
          className="grid gap-4 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <label htmlFor="freelancer-search" className="block text-xs font-semibold text-zinc-700">
              Search Freelancers by Skills or Role
            </label>
            <div className="relative mt-1.5">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                id="freelancer-search"
                type="search"
                value={skillSearch}
                onChange={(e) => onSkillSearchChange(e.target.value)}
                placeholder="e.g. React, Figma, Python, SEO, Flutter..."
                className="no-valid-ring w-full rounded-xl border border-[#D7D0C3] bg-[#F6F3EC]/70 py-2.5 pr-3 pl-10 text-sm text-[#141A18] placeholder:text-zinc-400 focus:border-[#0D6E62] focus:bg-white"
              />
            </div>
          </div>

          <div className="md:col-span-5">
            <label htmlFor="freelancer-level" className="block text-xs font-semibold text-zinc-700">
              Expertise Level
            </label>
            <select
              id="freelancer-level"
              value={levelFilter}
              onChange={(e) => onLevelFilterChange(e.target.value)}
              className="no-valid-ring mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-[#F6F3EC]/70 px-3 py-2.5 text-sm text-[#141A18] focus:border-[#0D6E62] focus:bg-white"
            >
              {EXPERIENCE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200/70 pt-3 text-xs text-zinc-500">
          <p role="status" aria-live="polite">
            Showing <strong className="font-semibold text-[#141A18]">{filtered.length}</strong> of{' '}
            {freelancers.length} freelancers
          </p>
          {hasFilters && (
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

      {/* Freelancer Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-[#D7D0C3] bg-[#FFFDF9] p-12 text-center">
          <UserCheck className="mx-auto h-10 w-10 text-zinc-400" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-bold text-[#141A18]">No matching freelancers</h2>
          <p className="mt-1.5 text-sm text-zinc-600">
            Try searching another skill or switching the expertise level filter.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#141A18] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0D6E62]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((freelancer) => (
            <article
              key={freelancer.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-[#0D6E62] hover:shadow-lg hover:shadow-stone-900/5"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={freelancer.avatar}
                    alt={`${freelancer.name} profile portrait`}
                    width={64}
                    height={64}
                    className="aspect-square h-16 w-16 shrink-0 rounded-2xl object-cover shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="truncate text-lg font-bold text-[#141A18]">
                        {freelancer.name}
                      </h2>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                        {freelancer.rating}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-[#0D6E62]">
                      {freelancer.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{freelancer.location}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      LEVEL_BADGE[freelancer.experienceLevel] || LEVEL_BADGE.Intermediate
                    }`}
                  >
                    <Award className="h-3 w-3" aria-hidden="true" />
                    {freelancer.experienceLevel}
                  </span>
                  <span className="font-mono-num rounded-full bg-[#F0ECE1] px-2.5 py-0.5 text-xs font-bold text-[#141A18]">
                    {formatINR(freelancer.hourlyRate)}/hr
                  </span>
                  <span className="text-xs text-zinc-500">
                    {freelancer.reviewsCount} reviews
                  </span>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {freelancer.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {freelancer.skills.map((skill) => (
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
                  <span className="inline-flex items-center gap-1.5">
                    <FolderKanban className="h-3.5 w-3.5 text-[#0D6E62]" aria-hidden="true" />
                    {freelancer.portfolio.length} portfolio samples
                  </span>
                  <span className="font-semibold text-[#0D6E62]">{freelancer.availability}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectFreelancer(freelancer)}
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#141A18] px-4 py-2 text-sm font-semibold text-[#FFFDF9] transition hover:bg-[#0D6E62]"
                >
                  <span>View Profile &amp; Reviews</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
