import { useEffect, useRef } from 'react';
import { Award, CheckCircle2, FolderKanban, MapPin, Star, X } from 'lucide-react';
import { bindDialogLightDismiss } from '../utils/formA11y';
import { formatINR } from '../data/marketplaceData';

export default function FreelancerModal({ freelancer, onClose, onBrowseProjects }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const cleanup = bindDialogLightDismiss(dialog, onClose);
    if (freelancer) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
    return cleanup;
  }, [freelancer, onClose]);

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="freelancer-modal-title"
      className="w-full"
    >
      {freelancer && (
        <div className="overflow-hidden rounded-3xl border border-[#D7D0C3] bg-[#FFFDF9] shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-[#E4DFD5] bg-[#F6F3EC] px-6 py-5">
            <div className="flex items-center gap-4">
              <img
                src={freelancer.avatar}
                alt={`${freelancer.name} profile portrait`}
                width={64}
                height={64}
                className="aspect-square h-16 w-16 shrink-0 rounded-2xl object-cover shadow-xs"
              />
              <div>
                <h1 id="freelancer-modal-title" className="text-xl font-extrabold text-[#141A18]">
                  {freelancer.name}
                </h1>
                <p className="text-sm font-semibold text-[#0D6E62]">{freelancer.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    {freelancer.location}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-800">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {freelancer.rating} ({freelancer.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close freelancer profile"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D7D0C3] bg-[#FFFDF9] text-[#141A18] transition hover:bg-stone-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="max-h-[70dvh] space-y-6 overflow-y-auto px-6 py-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-[#E4DFD5] bg-[#F6F3EC]/80 p-4 text-center">
              <div>
                <p className="text-xs text-zinc-500">Experience</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-[#141A18]">
                  <Award className="h-4 w-4 text-[#0D6E62]" aria-hidden="true" />
                  {freelancer.experienceLevel}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Hourly Rate</p>
                <p className="font-mono-num mt-0.5 text-sm font-bold text-[#141A18]">
                  {formatINR(freelancer.hourlyRate)}/hr
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Completed</p>
                <p className="font-mono-num mt-0.5 text-sm font-bold text-[#141A18]">
                  {freelancer.completedProjects} jobs
                </p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-mono-num text-xs font-bold uppercase tracking-wider text-zinc-500">
                About &amp; Introduction
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">{freelancer.bio}</p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="font-mono-num text-xs font-bold uppercase tracking-wider text-zinc-500">
                Verified Skills
              </h2>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-[#E4DFD5] bg-[#F6F3EC] px-3 py-1.5 text-xs font-semibold text-[#141A18]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio Samples */}
            <div>
              <h2 className="font-mono-num flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <FolderKanban className="h-4 w-4 text-[#0D6E62]" aria-hidden="true" />
                Portfolio Samples
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {freelancer.portfolio.map((sample, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-[#E4DFD5] bg-[#F6F3EC]/60"
                  >
                    {sample.thumb && (
                      <img
                        src={sample.thumb}
                        alt={sample.title}
                        width={320}
                        height={180}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    )}
                    <div className="p-4">
                      <span className="font-mono-num text-[11px] font-bold uppercase tracking-wider text-[#0D6E62]">
                        {sample.category}
                      </span>
                      <h3 className="mt-1 text-sm font-bold text-[#141A18]">{sample.title}</h3>
                      <p className="mt-1.5 flex items-start gap-1.5 text-xs text-zinc-600">
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0D6E62]"
                          aria-hidden="true"
                        />
                        <span>{sample.outcome}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div>
              <h2 className="font-mono-num text-xs font-bold uppercase tracking-wider text-zinc-500">
                Client Reviews
              </h2>
              <div className="mt-3 space-y-3">
                {freelancer.reviews.map((rev, idx) => (
                  <blockquote
                    key={idx}
                    className="rounded-2xl border border-[#E4DFD5] bg-white p-4 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#141A18]">{rev.client}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                        {rev.rating}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-zinc-600">“{rev.comment}”</p>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4DFD5] bg-[#F6F3EC] px-6 py-4">
            <span className="text-xs font-semibold text-[#0D6E62]">
              Availability: {freelancer.availability}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="min-h-[42px] rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-2 text-sm font-semibold text-[#141A18] hover:bg-stone-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  dialogRef.current?.close();
                  onBrowseProjects(freelancer.skills[0] || '');
                }}
                className="min-h-[42px] rounded-full bg-[#0D6E62] px-5 py-2 text-sm font-semibold text-white hover:bg-[#09544B]"
              >
                Match With Open Briefs
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
