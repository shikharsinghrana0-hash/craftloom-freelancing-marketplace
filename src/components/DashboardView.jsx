import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  FolderKanban,
  Plus,
  Save,
  Trash2,
  User,
} from 'lucide-react';
import { attachFormValidation, validateAndFocusForm } from '../utils/formA11y';
import { formatINR, makeAvatarSvg } from '../data/marketplaceData';

const PROJECT_STATUSES = ['Open', 'In Review', 'In Progress', 'Completed'];

const PROPOSAL_STATUS_STYLE = {
  'Pending Review': 'bg-amber-50 text-amber-800 border-amber-200',
  Shortlisted: 'bg-[#0D6E62]/10 text-[#0D6E62] border-[#0D6E62]/25',
  Accepted: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Declined: 'bg-stone-100 text-stone-600 border-stone-200',
};

export default function DashboardView({
  projects,
  proposals,
  userProfile,
  onSelectProject,
  onUpdateProjectStatus,
  onDeleteProject,
  onWithdrawProposal,
  onSaveProfile,
  onOpenPostProject,
}) {
  const [activeTab, setActiveTab] = useState('projects');
  const profileFormRef = useRef(null);

  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [location, setLocation] = useState(userProfile.location);
  const [portfolioUrl, setPortfolioUrl] = useState(userProfile.portfolioUrl);
  const [experienceLevel, setExperienceLevel] = useState(userProfile.experienceLevel);
  const [hourlyRate, setHourlyRate] = useState(String(userProfile.hourlyRate));
  const [skillsText, setSkillsText] = useState(userProfile.skills.join(', '));
  const [bio, setBio] = useState(userProfile.bio);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (activeTab !== 'profile') return undefined;
    return attachFormValidation(profileFormRef.current);
  }, [activeTab]);

  const postedProjects = projects.filter((p) => p.isOwner);
  const initials = (userProfile.name || 'KS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!validateAndFocusForm(profileFormRef.current)) return;

    onSaveProfile({
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      portfolioUrl: portfolioUrl.trim(),
      experienceLevel,
      hourlyRate: Number(hourlyRate) || 1500,
      skills: skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      bio: bio.trim(),
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E4DFD5] pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-num text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">
            Atelier Workspace · INR
          </p>
          <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#141A18] sm:text-4xl">
            Welcome back,{' '}
            <span className="font-serif-accent font-normal italic text-[#0D6E62]">
              {userProfile.name}
            </span>
          </h1>
          <p className="mt-1.5 text-sm text-zinc-600">
            Manage your posted briefs, track submitted ₹ proposals, and update your maker profile
            with automatic LocalStorage persistence.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPostProject}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#0D6E62] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#09544B]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Post New Brief</span>
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-5 shadow-2xs">
          <p className="text-xs font-semibold text-zinc-500">Posted Briefs</p>
          <p className="font-mono-num mt-1.5 text-2xl font-extrabold text-[#141A18]">
            {postedProjects.length}
          </p>
          <p className="mt-1 text-xs text-[#0D6E62]">Active client briefs you manage</p>
        </div>

        <div className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-5 shadow-2xs">
          <p className="text-xs font-semibold text-zinc-500">Submitted Proposals</p>
          <p className="font-mono-num mt-1.5 text-2xl font-extrabold text-[#141A18]">
            {proposals.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {proposals.filter((p) => p.status === 'Shortlisted').length} shortlisted
          </p>
        </div>

        <div className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-5 shadow-2xs">
          <p className="text-xs font-semibold text-zinc-500">Profile Hourly Rate</p>
          <p className="font-mono-num mt-1.5 text-2xl font-extrabold text-[#141A18]">
            {formatINR(userProfile.hourlyRate)}/hr
          </p>
          <p className="mt-1 text-xs text-zinc-500">{userProfile.experienceLevel} level</p>
        </div>

        <div className="rounded-3xl border border-[#E4DFD5] bg-[#141A18] p-5 text-[#F6F3EC] shadow-2xs">
          <p className="text-xs font-semibold text-zinc-400">Marketplace Briefs</p>
          <p className="font-mono-num mt-1.5 text-2xl font-extrabold">{projects.length}</p>
          <p className="mt-1 text-xs text-[#5EEAD4]">
            {projects.filter((p) => p.status === 'Open').length} open for bids
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        className="mt-8 flex flex-wrap gap-2 border-b border-[#E4DFD5] pb-3"
        role="tablist"
        aria-label="Dashboard sections"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'projects'}
          onClick={() => setActiveTab('projects')}
          className={`inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'projects'
              ? 'bg-[#141A18] text-white'
              : 'border border-[#D7D0C3] bg-[#FFFDF9] text-zinc-700 hover:bg-stone-100'
          }`}
        >
          <FolderKanban className="h-4 w-4" aria-hidden="true" />
          <span>Posted Briefs ({postedProjects.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'proposals'}
          onClick={() => setActiveTab('proposals')}
          className={`inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'proposals'
              ? 'bg-[#141A18] text-white'
              : 'border border-[#D7D0C3] bg-[#FFFDF9] text-zinc-700 hover:bg-stone-100'
          }`}
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Submitted Proposals ({proposals.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
          className={`inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'profile'
              ? 'bg-[#141A18] text-white'
              : 'border border-[#D7D0C3] bg-[#FFFDF9] text-zinc-700 hover:bg-stone-100'
          }`}
        >
          <User className="h-4 w-4" aria-hidden="true" />
          <span>Profile Information</span>
        </button>
      </div>

      {/* Tab 1: Posted Projects & Status Tracking */}
      {activeTab === 'projects' && (
        <section className="mt-6 space-y-4" aria-label="Posted projects">
          {postedProjects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#D7D0C3] bg-[#FFFDF9] p-10 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-zinc-400" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-[#141A18]">No posted briefs yet</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Publish a project brief to start receiving freelancer proposals.
              </p>
              <button
                type="button"
                onClick={onOpenPostProject}
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0D6E62] px-5 py-2 text-sm font-semibold text-white hover:bg-[#09544B]"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Post Your First Brief</span>
              </button>
            </div>
          ) : (
            postedProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs lg:flex-row lg:items-center"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#F0ECE1] px-2.5 py-0.5 text-xs font-bold text-[#141A18]">
                      {project.category}
                    </span>
                    <span className="font-mono-num text-xs font-semibold text-zinc-500">
                      Deadline: {project.deadline}
                    </span>
                    <span className="font-mono-num text-xs font-bold text-[#0D6E62]">
                      {project.budgetDisplay}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#141A18]">{project.title}</h2>
                  <p className="line-clamp-2 text-sm text-zinc-600">{project.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
                  <div>
                    <label
                      htmlFor={`status-${project.id}`}
                      className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
                    >
                      Project Status
                    </label>
                    <select
                      id={`status-${project.id}`}
                      value={project.status}
                      onChange={(e) => onUpdateProjectStatus(project.id, e.target.value)}
                      className="no-valid-ring mt-1 min-h-[40px] rounded-xl border border-[#D7D0C3] bg-[#F6F3EC] px-3 py-1.5 text-xs font-semibold text-[#141A18]"
                    >
                      {PROJECT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#D7D0C3] bg-white px-4 py-2 text-xs font-semibold text-[#141A18] hover:border-[#0D6E62] hover:text-[#0D6E62]"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteProject(project.id)}
                    aria-label={`Remove ${project.title}`}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-red-200 bg-red-50/70 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      )}

      {/* Tab 2: Submitted Proposals */}
      {activeTab === 'proposals' && (
        <section className="mt-6 space-y-4" aria-label="Submitted proposals">
          {proposals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#D7D0C3] bg-[#FFFDF9] p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-zinc-400" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-[#141A18]">No submitted proposals</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Explore open briefs and submit a tailored ₹ proposal to track it here.
              </p>
            </div>
          ) : (
            proposals.map((prop) => (
              <article
                key={prop.id}
                className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          PROPOSAL_STATUS_STYLE[prop.status] || PROPOSAL_STATUS_STYLE['Pending Review']
                        }`}
                      >
                        {prop.status}
                      </span>
                      <span className="text-xs text-zinc-500">
                        Submitted on {prop.submittedAt} · {prop.clientCompany}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-[#141A18]">{prop.projectTitle}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{prop.coverLetter}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-zinc-500">Proposed Bid</p>
                      <p className="font-mono-num text-lg font-extrabold text-[#0D6E62]">
                        {formatINR(prop.expectedBudget)}
                      </p>
                      <p className="text-xs text-zinc-500">{prop.deliveryDays} days delivery</p>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProject(prop.projectId)}
                        className="inline-flex min-h-[38px] items-center gap-1 rounded-full border border-[#D7D0C3] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#141A18] hover:border-[#0D6E62]"
                      >
                        <span>View Brief</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onWithdrawProposal(prop.id)}
                        className="inline-flex min-h-[38px] items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Withdraw</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      )}

      {/* Tab 3: Profile Information */}
      {activeTab === 'profile' && (
        <section className="mt-6 grid gap-6 lg:grid-cols-12" aria-label="Profile information">
          <div className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs lg:col-span-4">
            <div className="flex items-center gap-4">
              <img
                src={makeAvatarSvg(initials || 'KS', '#0D6E62', '#083E37')}
                alt={`${userProfile.name} avatar`}
                width={68}
                height={68}
                className="aspect-square h-17 w-17 rounded-2xl object-cover shadow-xs"
              />
              <div>
                <h2 className="text-lg font-bold text-[#141A18]">{userProfile.name}</h2>
                <p className="text-sm font-semibold text-[#0D6E62]">{userProfile.role}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{userProfile.location}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600">{userProfile.bio}</p>

            <div className="mt-5 border-t border-stone-200/80 pt-4">
              <p className="font-mono-num text-xs font-bold uppercase tracking-wider text-zinc-500">
                Skills
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {userProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[#E4DFD5] bg-[#F6F3EC] px-2.5 py-1 text-xs font-medium text-zinc-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form
            ref={profileFormRef}
            onSubmit={handleProfileSave}
            noValidate
            className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs sm:p-8 lg:col-span-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#141A18]">Edit Your Maker Profile</h2>
                <p className="text-xs text-zinc-500">
                  Used to pre-fill proposals and display your freelancer credentials.
                </p>
              </div>
              {profileSaved && (
                <span
                  role="status"
                  aria-live="polite"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Profile saved!
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="prof-name" className="block text-sm font-semibold text-zinc-800">
                  Full Name <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="prof-name"
                  type="text"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-error="prof-name-error"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="prof-name-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please enter your full name.</span>
                </div>
              </div>

              <div>
                <label htmlFor="prof-role" className="block text-sm font-semibold text-zinc-800">
                  Headline / Role <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="prof-role"
                  type="text"
                  required
                  minLength={3}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  data-error="prof-role-error"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="prof-role-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please enter your role headline.</span>
                </div>
              </div>

              <div>
                <label htmlFor="prof-email" className="block text-sm font-semibold text-zinc-800">
                  Contact Email <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="prof-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-error="prof-email-error"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="prof-email-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please enter a valid email address.</span>
                </div>
              </div>

              <div>
                <label htmlFor="prof-phone" className="block text-sm font-semibold text-zinc-800">
                  Phone Number
                </label>
                <input
                  id="prof-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
              </div>

              <div>
                <label htmlFor="prof-location" className="block text-sm font-semibold text-zinc-800">
                  Location
                </label>
                <input
                  id="prof-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
              </div>

              <div>
                <label htmlFor="prof-portfolio" className="block text-sm font-semibold text-zinc-800">
                  Portfolio URL
                </label>
                <input
                  id="prof-portfolio"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  data-error="prof-url-error"
                  placeholder="https://yourportfolio.dev"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="prof-url-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Enter a valid URL starting with https:// or http://.</span>
                </div>
              </div>

              <div>
                <label htmlFor="prof-level" className="block text-sm font-semibold text-zinc-800">
                  Experience Level
                </label>
                <select
                  id="prof-level"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3 py-2.5 text-sm text-[#141A18]"
                >
                  <option value="Entry">Entry</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div>
                <label htmlFor="prof-rate" className="block text-sm font-semibold text-zinc-800">
                  Hourly Rate (₹ INR) <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="prof-rate"
                  type="number"
                  required
                  min={300}
                  max={50000}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  data-error="prof-rate-error"
                  className="font-mono-num mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="prof-rate-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Enter an hourly rate between ₹300 and ₹50,000.</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="prof-skills" className="block text-sm font-semibold text-zinc-800">
                Skills (comma-separated)
              </label>
              <input
                id="prof-skills"
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="prof-bio" className="block text-sm font-semibold text-zinc-800">
                Short Bio / Introduction <span aria-hidden="true" className="text-red-600">*</span>
              </label>
              <textarea
                id="prof-bio"
                rows={3}
                required
                minLength={20}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                data-error="prof-bio-error"
                className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
              />
              <div id="prof-bio-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Please write at least 20 characters for your bio.</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0D6E62] px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#09544B]"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
