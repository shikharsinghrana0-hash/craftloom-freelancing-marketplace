import { Briefcase, Github, Globe, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { CATEGORIES } from '../data/marketplaceData';

export default function Footer({ onNavigate, onSelectCategory, onOpenPostProject }) {
  return (
    <footer className="border-t border-[#E4DFD5] bg-[#141A18] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="inline-flex items-center gap-2.5 text-white no-underline"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D6E62] text-white">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Craft<span className="font-serif-accent text-xl font-normal italic text-[#5EEAD4]">Loom</span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              An editorial freelance atelier built for transparent INR (₹) project scoping,
              thoughtful proposal pitches, and dependable client–maker collaboration.
            </p>

            {/* Social Media Links */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="CraftLoom on GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-[#5EEAD4] hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="CraftLoom on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-[#5EEAD4] hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="CraftLoom on X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-[#5EEAD4] hover:text-white"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                aria-label="CraftLoom Website"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-[#5EEAD4] hover:text-white"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div className="lg:col-span-2">
            <h2 className="font-mono-num text-xs font-bold uppercase tracking-widest text-white">
              Marketplace
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-zinc-400 transition hover:text-white"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="text-zinc-400 transition hover:text-white"
                >
                  Explore Briefs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('freelancers')}
                  className="text-zinc-400 transition hover:text-white"
                >
                  Find Makers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="text-zinc-400 transition hover:text-white"
                >
                  Workspace Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPostProject}
                  className="text-[#5EEAD4] transition hover:underline"
                >
                  Post a Brief
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h2 className="font-mono-num text-xs font-bold uppercase tracking-widest text-white">
              Disciplines
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="text-zinc-400 transition hover:text-white"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h2 className="font-mono-num text-xs font-bold uppercase tracking-widest text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#5EEAD4]" aria-hidden="true" />
                <a href="mailto:hello@craftloom.in" className="hover:text-white">
                  hello@craftloom.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#5EEAD4]" aria-hidden="true" />
                <a href="tel:+918041239800" className="hover:text-white">
                  +91 80 4123 9800
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5EEAD4]" aria-hidden="true" />
                <span>100 Feet Rd, Indiranagar, Bengaluru 560038</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CraftLoom Indie Atelier. All prices in ₹ INR.</p>
          <p className="font-mono-num text-zinc-300">
            Developed by <span className="font-bold tracking-wider text-[#5EEAD4]">SHIKHAR SINGH RANA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
