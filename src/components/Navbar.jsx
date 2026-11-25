import { useEffect, useLayoutEffect, useRef } from 'react';
import { Briefcase, IndianRupee, Menu, Plus } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Explore Briefs' },
  { id: 'freelancers', label: 'Find Makers' },
  { id: 'dashboard', label: 'Dashboard' },
];

export default function Navbar({
  currentView,
  onNavigate,
  onOpenPostProject,
  proposalsCount,
  postedCount,
}) {
  const headerRef = useRef(null);
  const innerRef = useRef(null);
  const menuRef = useRef(null);
  const lastWideWidthRef = useRef(0);

  useEffect(() => {
    if (typeof HTMLElement !== 'undefined' && !Object.hasOwn(HTMLElement.prototype, 'popover')) {
      import('@oddbird/popover-polyfill').catch(() => {});
    }
  }, []);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const menu = menuRef.current;
    if (!header || !inner || !menu) return;

    let rafId = null;

    const measure = () => {
      const wasOpen = menu.matches?.(':popover-open') || menu.classList.contains(':popover-open');
      const currentWidth = header.clientWidth;

      if (!header.classList.contains('is-wide') && currentWidth <= lastWideWidthRef.current && lastWideWidthRef.current !== 0) {
        return;
      }

      header.classList.add('is-measuring');
      header.classList.add('is-wide');
      menu.removeAttribute('popover');

      const fits = inner.scrollWidth <= inner.clientWidth + 1;

      if (fits) {
        header.classList.add('is-wide');
        menu.removeAttribute('popover');
        lastWideWidthRef.current = 0;
      } else {
        header.classList.remove('is-wide');
        menu.setAttribute('popover', 'auto');
        lastWideWidthRef.current = currentWidth;
        if (wasOpen && typeof menu.showPopover === 'function') {
          try {
            menu.showPopover();
          } catch {}
        }
      }

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        header.classList.remove('is-measuring');
      });
    };

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(header);
    ro.observe(menu);

    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (viewId) => {
    onNavigate(viewId);
    const menu = menuRef.current;
    if (menu && menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
      try {
        menu.hidePopover();
      } catch {}
    }
  };

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-40 border-b border-[#E4DFD5] bg-[#F6F3EC]/90 backdrop-blur-md"
    >
      <div
        ref={innerRef}
        className="header-inner mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 rounded-xl text-[#141A18] no-underline transition-opacity hover:opacity-85"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#141A18] text-[#F6F3EC] shadow-sm">
            <Briefcase className="h-4 w-4 text-[#5EEAD4]" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-[#141A18]">
              Craft<span className="font-serif-accent text-xl font-normal italic text-[#0D6E62]">Loom</span>
            </span>
            <span className="font-mono-num text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Indie Atelier · INR
            </span>
          </span>
        </a>

        <nav className="site-nav flex items-center gap-2" aria-label="Primary">
          <button
            type="button"
            className="menu-button inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-4 py-2 text-sm font-semibold text-[#141A18] shadow-xs transition hover:bg-stone-100"
            popoverTarget="site-menu"
            popoverTargetAction="toggle"
            aria-controls="site-menu"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>Menu</span>
          </button>

          <ul
            ref={menuRef}
            id="site-menu"
            className="site-menu rounded-2xl border border-[#E4DFD5] bg-[#FFFDF9] p-2 shadow-xl"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentView === item.id ||
                (currentView === 'project-details' && item.id === 'projects');
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className="nav-link flex min-h-[44px] items-center justify-between gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-[#EAE4D7]/70 hover:text-[#141A18]"
                  >
                    <span>{item.label}</span>
                    {item.id === 'dashboard' && (
                      <span className="font-mono-num rounded-full bg-[#0D6E62]/15 px-2 py-0.5 text-xs font-bold text-[#0D6E62]">
                        {proposalsCount + postedCount}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
            <li className="mt-1 border-t border-stone-200 pt-2 sm:mt-0 sm:ml-2 sm:border-t-0 sm:pt-0">
              <button
                type="button"
                onClick={() => {
                  const menu = menuRef.current;
                  if (menu && menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
                    try {
                      menu.hidePopover();
                    } catch {}
                  }
                  onOpenPostProject();
                }}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full bg-[#0D6E62] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09544B] sm:w-auto"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Post a Brief</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="font-mono-num inline-flex items-center gap-1 rounded-full border border-[#D7D0C3] bg-[#FFFDF9] px-3 py-1.5 text-xs font-semibold text-[#141A18]">
            <IndianRupee className="h-3.5 w-3.5 text-[#C2410C]" aria-hidden="true" />
            INR · 0% Commission
          </span>
        </div>
      </div>
    </header>
  );
}
