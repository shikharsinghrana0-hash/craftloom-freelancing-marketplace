import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  IndianRupee,
  MapPin,
  Send,
  Users,
} from 'lucide-react';
import { attachFormValidation, validateAndFocusForm } from '../utils/formA11y';

export default function ProjectDetailsView({
  project,
  userProfile,
  existingProposals,
  onBack,
  onSubmitProposal,
  onGoToDashboard,
}) {
  const formRef = useRef(null);
  const [freelancerName, setFreelancerName] = useState(userProfile.name || '');
  const [contactDetails, setContactDetails] = useState(userProfile.email || '');
  const [expectedBudget, setExpectedBudget] = useState(
    project ? String(Math.round((project.budgetMin + project.budgetMax) / 2)) : ''
  );
  const [deliveryDays, setDeliveryDays] = useState('14');
  const [coverLetter, setCoverLetter] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    if (!project) return;
    setExpectedBudget(String(Math.round((project.budgetMin + project.budgetMax) / 2)));
    setSubmittedNotice(false);
  }, [project?.id]);

  useEffect(() => {
    return attachFormValidation(formRef.current);
  }, [project?.id]);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#141A18]">Project not found</h1>
        <p className="mt-2 text-sm text-zinc-600">
          The project you are looking for may have been removed.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#141A18] px-5 py-2.5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Briefs</span>
        </button>
      </div>
    );
  }

  const alreadyApplied = existingProposals.some((p) => p.projectId === project.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!validateAndFocusForm(form)) return;

    onSubmitProposal({
      projectId: project.id,
      projectTitle: project.title,
      clientCompany: project.clientCompany,
      freelancerName: freelancerName.trim(),
      contactDetails: contactDetails.trim(),
      expectedBudget: Number(expectedBudget),
      deliveryDays: Number(deliveryDays) || 14,
      coverLetter: coverLetter.trim(),
    });

    setCoverLetter('');
    setSubmittedNotice(true);
    form.reset();
    setFreelancerName(userProfile.name || freelancerName);
    setContactDetails(userProfile.email || contactDetails);
    setExpectedBudget(String(Math.round((project.budgetMin + project.budgetMax) / 2)));
    setDeliveryDays('14');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-1.5 text-sm font-semibold text-[#141A18] shadow-2xs transition hover:border-[#0D6E62] hover:text-[#0D6E62]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Back to Briefs</span>
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        {/* Left: Project Specification & Client Info */}
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs sm:p-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-[#F0ECE1] px-3 py-1 text-xs font-bold text-[#141A18]">
                {project.category}
              </span>
              <span className="rounded-full border border-[#0D6E62]/25 bg-[#0D6E62]/10 px-3 py-1 text-xs font-semibold text-[#0D6E62]">
                {project.status}
              </span>
              <span className="text-xs text-zinc-500">Posted {project.postedAt}</span>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[#141A18] sm:text-3xl">
              {project.title}
            </h1>

            {/* Key Facts Bar */}
            <div className="mt-6 grid gap-3 rounded-2xl border border-[#E4DFD5] bg-[#F6F3EC]/80 p-4 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <IndianRupee className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6E62]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Budget Range</p>
                  <p className="font-mono-num text-sm font-bold text-[#141A18]">
                    {project.budgetDisplay}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6E62]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Project Deadline</p>
                  <p className="font-mono-num text-sm font-bold text-[#141A18]">
                    {project.deadline}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6E62]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Proposals</p>
                  <p className="font-mono-num text-sm font-bold text-[#141A18]">
                    {project.proposalsCount} submitted
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-base font-bold text-[#141A18]">Project Description</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Deliverables */}
            {project.deliverables?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-base font-bold text-[#141A18]">Expected Deliverables</h2>
                <ul className="mt-3 space-y-2.5">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6E62]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            <div className="mt-6">
              <h2 className="text-base font-bold text-[#141A18]">Required Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-[#E4DFD5] bg-[#F6F3EC] px-3 py-1.5 text-xs font-semibold text-[#141A18]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Client Details Card */}
          <section
            aria-labelledby="client-details-heading"
            className="rounded-3xl border border-[#E4DFD5] bg-[#FFFDF9] p-6 shadow-2xs sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="client-details-heading" className="text-base font-bold text-[#141A18]">
                About the Client
              </h2>
              {project.clientVerified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D6E62]/10 px-3 py-1 text-xs font-semibold text-[#0D6E62]">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Payment &amp; GST/PAN Verified
                </span>
              )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0ECE1] text-[#141A18]">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#141A18]">{project.clientCompany}</p>
                  <p className="text-xs text-zinc-500">Lead: {project.clientName}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                  <span>{project.clientLocation}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                  <span>{project.clientProjectsPosted} projects posted on CraftLoom</span>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Proposal Submission Form */}
        <div className="lg:col-span-5">
          <section
            aria-labelledby="proposal-form-heading"
            className="sticky top-24 rounded-3xl border border-[#D7D0C3] bg-[#FFFDF9] p-6 shadow-xl shadow-stone-900/5 sm:p-7"
          >
            <div className="border-b border-stone-200/80 pb-4">
              <p className="font-mono-num text-xs font-bold uppercase tracking-[0.18em] text-[#C2410C]">
                Proposal Pitch · INR
              </p>
              <h2 id="proposal-form-heading" className="mt-1 text-xl font-bold text-[#141A18]">
                Submit Your Proposal
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Pitch your approach, delivery timeline, and expected ₹ quote to{' '}
                {project.clientCompany}.
              </p>
            </div>

            {submittedNotice && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <div>
                    <p className="font-bold">Proposal submitted successfully!</p>
                    <p className="mt-0.5 text-xs text-emerald-800">
                      Your proposal has been saved and added to your Dashboard.
                    </p>
                    <button
                      type="button"
                      onClick={onGoToDashboard}
                      className="mt-2 text-xs font-bold underline hover:text-emerald-950"
                    >
                      View in Dashboard →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {alreadyApplied && !submittedNotice && (
              <div className="mt-4 rounded-2xl border border-[#0D6E62]/25 bg-[#0D6E62]/10 p-3.5 text-xs text-[#0D6E62]">
                You already have an active proposal on this project. You can submit an updated
                offer below or manage it in your Dashboard.
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="proposal-form-heading"
              className="mt-5 space-y-4"
            >
              <div>
                <label htmlFor="prop-name" className="block text-sm font-semibold text-zinc-800">
                  Freelancer Name <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="prop-name"
                  name="freelancerName"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)}
                  data-error="prop-name-error"
                  placeholder="Your full name"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div
                  id="prop-name-error"
                  className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please enter your full name (at least 2 characters).</span>
                </div>
              </div>

              <div>
                <label htmlFor="prop-contact" className="block text-sm font-semibold text-zinc-800">
                  Contact Email <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <span id="prop-contact-hint" className="mt-0.5 block text-xs text-zinc-500">
                  Format: you@example.com
                </span>
                <input
                  id="prop-contact"
                  name="contactDetails"
                  type="email"
                  required
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-describedby="prop-contact-hint"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                  data-error="prop-contact-error"
                  placeholder="you@domain.in"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div
                  id="prop-contact-error"
                  className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Enter a valid email address in the format you@example.com.</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="prop-budget" className="block text-sm font-semibold text-zinc-800">
                    Expected Budget (₹ INR) <span aria-hidden="true" className="text-red-600">*</span>
                  </label>
                  <span id="prop-budget-hint" className="mt-0.5 block text-xs text-zinc-500">
                    Range: {project.budgetDisplay}
                  </span>
                  <input
                    id="prop-budget"
                    name="expectedBudget"
                    type="number"
                    required
                    min={1000}
                    max={10000000}
                    inputMode="numeric"
                    aria-describedby="prop-budget-hint"
                    value={expectedBudget}
                    onChange={(e) => setExpectedBudget(e.target.value)}
                    data-error="prop-budget-error"
                    className="font-mono-num mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                  />
                  <div
                    id="prop-budget-error"
                    className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Enter an expected budget of at least ₹1,000.</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="prop-days" className="block text-sm font-semibold text-zinc-800">
                    Estimated Days <span aria-hidden="true" className="text-red-600">*</span>
                  </label>
                  <span id="prop-days-hint" className="mt-0.5 block text-xs text-zinc-500">
                    Delivery timeframe
                  </span>
                  <input
                    id="prop-days"
                    name="deliveryDays"
                    type="number"
                    required
                    min={1}
                    max={365}
                    inputMode="numeric"
                    aria-describedby="prop-days-hint"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    data-error="prop-days-error"
                    className="font-mono-num mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                  />
                  <div
                    id="prop-days-error"
                    className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Enter delivery time between 1 and 365 days.</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="prop-cover" className="block text-sm font-semibold text-zinc-800">
                    Proposal / Cover Letter <span aria-hidden="true" className="text-red-600">*</span>
                  </label>
                  <span className="font-mono-num text-xs text-zinc-400">
                    {coverLetter.trim().length} chars
                  </span>
                </div>
                <span id="prop-cover-hint" className="mt-0.5 block text-xs text-zinc-500">
                  Minimum 30 characters explaining relevant work &amp; milestones.
                </span>
                <textarea
                  id="prop-cover"
                  name="coverLetter"
                  rows={5}
                  required
                  minLength={30}
                  aria-describedby="prop-cover-hint"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  data-error="prop-cover-error"
                  placeholder="Share how you would approach this brief, similar projects you have shipped, and your key milestones..."
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div
                  id="prop-cover-error"
                  className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please write at least 30 characters for your cover letter.</span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0D6E62] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09544B]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Submit Proposal</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
