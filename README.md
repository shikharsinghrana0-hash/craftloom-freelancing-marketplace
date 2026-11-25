# CraftLoom — Curated Freelance Atelier (INR)

🌐 **Live Demo:** https://shikharsinghrana0-hash.github.io/craftloom-freelancing-marketplace/

A modern, responsive **Freelancing Marketplace** web application where clients publish project briefs in **Indian Rupees (₹ / INR)** and freelancers explore opportunities, inspect deliverables, submit validated proposals, and manage their work in a unified dashboard.

**Developed by SHIKHAR SINGH RANA**

---

## Features Implemented

1. **Homepage (`Home`)**
   - Editorial hero banner with quick search across **Briefs** and **Makers**
   - Layered showcase stack featuring a live brief, spotlight maker, and INR escrow summary
   - Live marketplace ticker strip and 3-step platform workflow
   - 6 interactive discipline cards (`Web Development`, `UI/UX & Graphic Design`, `Content Writing`, `Digital Marketing`, `Mobile Apps`, `Data & Analytics`) with starting ₹ budgets
   - Featured Briefs & Featured Makers sections + call-to-action banner

2. **Project Listings (`Explore Briefs`) & Post a Brief Modal**
   - 9 realistic INR freelance briefs with category, status, budget range, description, required skills, deadline, client name/company, and proposal counts
   - Modal form (`<dialog>`) to publish new briefs directly into `localStorage`

3. **Freelancer Profiles (`Find Makers`)**
   - Directory of vetted talent with deterministic SVG avatars, experience levels (`Entry`, `Intermediate`, `Expert`), ₹ hourly rates, ratings, and skills
   - Modal profile viewer displaying full bio, portfolio sample previews, and client reviews

4. **Project Details & Proposal Submission (`#project/<id>`)**
   - Dedicated view with full project scope, expected deliverables, required skills, timeline/deadline, and client verification card
   - Embedded **Proposal Submission Form** with accessible after-interaction validation (`:user-invalid`, `aria-invalid`, live announcements) and `localStorage` persistence

5. **Search & Filtering**
   - Search projects by title/skill/company and filter by category & INR budget tier (`Under ₹50,000`, `₹50,000 – ₹1,50,000`, `₹1,50,000 – ₹3,00,000`, `₹3,00,000+`)
   - Search freelancers by skills/role and filter by expertise level

6. **Workspace Dashboard (`Dashboard`)**
   - Summary KPI cards + interactive tabs for **Posted Briefs** (with live status updates), **Submitted Proposals** (view/withdraw), and **Profile Information** (editable & persisted in `localStorage`)

7. **Responsive Design, Navigation & Footer**
   - Adapts cleanly across mobile, tablet, and desktop viewports with a responsive popover navigation bar and footer with contact info, social links, and developer credit

---

## Tech Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4**
- **Lucide React** icons
- **Browser LocalStorage** for client-side state persistence

---

## Project Structure

```text
├── index.html
├── package.json
├── vite.config.js
├── screenshots/                 # Captured screenshots of all views & responsive layouts
└── src/
    ├── App.jsx                  # Hash routing, state & LocalStorage sync
    ├── main.jsx
    ├── index.css                # Tailwind v4 + dialog, navbar, form & editorial tokens
    ├── data/
    │   └── marketplaceData.js   # INR seed briefs, freelancers, SVG portraits & formatters
    ├── utils/
    │   └── formA11y.js          # Accessible validation & dialog light-dismiss helpers
    └── components/
        ├── Navbar.jsx
        ├── HomeView.jsx
        ├── ProjectsView.jsx
        ├── ProjectDetailsView.jsx
        ├── FreelancersView.jsx
        ├── FreelancerModal.jsx
        ├── PostProjectModal.jsx
        ├── DashboardView.jsx
        └── Footer.jsx
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

## Screenshots

All application screenshots are stored in the [`screenshots/`](./screenshots) folder:
- `01-homepage-desktop.png` — Editorial hero, showcase stack, categories, and featured sections
- `02-explore-briefs.png` — Project listings with INR search & category/budget filters
- `03-project-details-proposal.png` — Full project brief, deliverables, client card & proposal form
- `04-find-makers.png` — Freelancer directory with skill search & expertise level filter
- `05-freelancer-profile-modal.png` — Maker profile modal with portfolio samples & reviews
- `06-post-brief-modal.png` — Post a new INR freelance project dialog
- `07-workspace-dashboard.png` — Workspace dashboard (posted briefs & status controls)
- `08-dashboard-proposals.png` — Dashboard submitted proposals tab
- `09-mobile-responsive.png` — Mobile viewport layout (`390×844`)
