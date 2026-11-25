import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Plus, X } from 'lucide-react';
import { CATEGORIES, formatINRRange } from '../data/marketplaceData';
import { attachFormValidation, bindDialogLightDismiss, validateAndFocusForm } from '../utils/formA11y';

export default function PostProjectModal({ isOpen, defaultClientName, onClose, onCreateProject }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [budgetMin, setBudgetMin] = useState('50000');
  const [budgetMax, setBudgetMax] = useState('120000');
  const [deadline, setDeadline] = useState('2026-12-28');
  const [clientName, setClientName] = useState(defaultClientName || 'Kabir Sharma');
  const [clientCompany, setClientCompany] = useState('Independent Studio');
  const [skillsText, setSkillsText] = useState('React, Tailwind CSS, JavaScript');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const cleanup = bindDialogLightDismiss(dialog, onClose);
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
    return cleanup;
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    return attachFormValidation(formRef.current);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!validateAndFocusForm(form)) return;

    const minVal = Math.max(1000, Number(budgetMin) || 25000);
    const maxVal = Math.max(minVal, Number(budgetMax) || minVal + 25000);

    const parsedSkills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onCreateProject({
      title: title.trim(),
      category,
      budgetMin: minVal,
      budgetMax: maxVal,
      budgetDisplay: formatINRRange(minVal, maxVal),
      deadline,
      clientName: clientName.trim(),
      clientCompany: clientCompany.trim(),
      skills: parsedSkills.length ? parsedSkills : ['General'],
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
    form.reset();
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="post-project-modal-title"
      className="w-full"
    >
      {isOpen && (
        <div className="overflow-hidden rounded-3xl border border-[#D7D0C3] bg-[#FFFDF9] shadow-2xl">
          <div className="flex items-center justify-between gap-4 border-b border-[#E4DFD5] bg-[#F6F3EC] px-6 py-4">
            <div>
              <p className="font-mono-num text-xs font-bold uppercase tracking-[0.18em] text-[#C2410C]">
                Client Brief · INR (₹)
              </p>
              <h1 id="post-project-modal-title" className="text-xl font-extrabold text-[#141A18]">
                Post a New Freelance Project
              </h1>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close post project dialog"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D7D0C3] bg-[#FFFDF9] text-[#141A18] hover:bg-stone-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="post-project-modal-title"
            className="max-h-[75dvh] space-y-4 overflow-y-auto px-6 py-5"
          >
            <div>
              <label htmlFor="post-title" className="block text-sm font-semibold text-zinc-800">
                Project Title <span aria-hidden="true" className="text-red-600">*</span>
              </label>
              <input
                id="post-title"
                name="title"
                type="text"
                required
                minLength={6}
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-error="post-title-error"
                placeholder="e.g. Responsive Portfolio Website in React & Tailwind"
                className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
              />
              <div id="post-title-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Please enter a descriptive project title (at least 6 characters).</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="post-category" className="block text-sm font-semibold text-zinc-800">
                  Category <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <select
                  id="post-category"
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3 py-2.5 text-sm text-[#141A18]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="post-deadline" className="block text-sm font-semibold text-zinc-800">
                  Target Deadline <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="post-deadline"
                  name="deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  data-error="post-deadline-error"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="post-deadline-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Select a valid project deadline.</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="post-budget-min" className="block text-sm font-semibold text-zinc-800">
                  Min Budget (₹ INR) <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="post-budget-min"
                  name="budgetMin"
                  type="number"
                  required
                  min={1000}
                  inputMode="numeric"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  data-error="post-bmin-error"
                  className="font-mono-num mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="post-bmin-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Minimum budget must be at least ₹1,000.</span>
                </div>
              </div>

              <div>
                <label htmlFor="post-budget-max" className="block text-sm font-semibold text-zinc-800">
                  Max Budget (₹ INR) <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="post-budget-max"
                  name="budgetMax"
                  type="number"
                  required
                  min={1000}
                  inputMode="numeric"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  data-error="post-bmax-error"
                  className="font-mono-num mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="post-bmax-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Maximum budget must be at least ₹1,000.</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="post-client-name" className="block text-sm font-semibold text-zinc-800">
                  Your Name <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="post-client-name"
                  name="clientName"
                  type="text"
                  required
                  minLength={2}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  data-error="post-cname-error"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="post-cname-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please enter your name.</span>
                </div>
              </div>

              <div>
                <label htmlFor="post-company" className="block text-sm font-semibold text-zinc-800">
                  Company / Team <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="post-company"
                  name="clientCompany"
                  type="text"
                  required
                  minLength={2}
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  data-error="post-company-error"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
                />
                <div id="post-company-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>Please enter a company or team name.</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="post-skills" className="block text-sm font-semibold text-zinc-800">
                Required Skills <span aria-hidden="true" className="text-red-600">*</span>
              </label>
              <span id="post-skills-hint" className="mt-0.5 block text-xs text-zinc-500">
                Separate skills with commas (e.g. React, Figma, Razorpay)
              </span>
              <input
                id="post-skills"
                name="skills"
                type="text"
                required
                aria-describedby="post-skills-hint"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                data-error="post-skills-error"
                className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
              />
              <div id="post-skills-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Add at least one required skill.</span>
              </div>
            </div>

            <div>
              <label htmlFor="post-desc" className="block text-sm font-semibold text-zinc-800">
                Project Scope &amp; Description <span aria-hidden="true" className="text-red-600">*</span>
              </label>
              <span id="post-desc-hint" className="mt-0.5 block text-xs text-zinc-500">
                Minimum 25 characters describing goals and deliverables.
              </span>
              <textarea
                id="post-desc"
                name="description"
                rows={4}
                required
                minLength={25}
                aria-describedby="post-desc-hint"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-error="post-desc-error"
                placeholder="Describe the background, goals, key deliverables, and timeline expectations..."
                className="mt-1.5 w-full rounded-xl border border-[#D7D0C3] bg-white px-3.5 py-2.5 text-sm text-[#141A18]"
              />
              <div id="post-desc-error" className="field-error mt-1.5 items-center gap-1.5 text-xs font-medium text-red-700">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Please provide at least 25 characters describing the project.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 border-t border-[#E4DFD5] pt-4">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="min-h-[44px] rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-5 py-2 text-sm font-semibold text-[#141A18] hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0D6E62] px-6 py-2 text-sm font-semibold text-white hover:bg-[#09544B]"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Publish Brief</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
}
