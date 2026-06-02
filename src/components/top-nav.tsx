import { component$, useSignal, $, useOnDocument } from "@builder.io/qwik";

import Logo from "./logo";
import SearchTrigger from "./search-trigger";
import { navItems } from "../layouts/nav-links";

interface Props {
  slug: string;
  newItems: Record<string, number>;
  handleModal: () => void;
}

// Mirrors the original sidebar active-state logic: a link is active when the
// current slug starts with the link's path (and Home only matches "/").
const isLinkActive = (link: string, slug: string) => {
  const s = slug.slice(1);
  const l = link.slice(1);
  return s.length <= 0 && s.startsWith(l) ? true : l.length > 0 && s.startsWith(l);
};

interface IconProps {
  icon: string;
  stroke: boolean;
  class?: string;
}

const Icon = component$<IconProps>(({ icon, stroke, class: className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={`shrink-0 ${className}`}
    stroke-width="2"
    stroke={stroke ? "currentColor" : "none"}
    fill={stroke ? "none" : "currentColor"}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d={icon}></path>
  </svg>
));

const TopNav = component$<Props>(({ slug, newItems, handleModal }) => {
  // Which desktop dropdown group is open (by title), or null.
  const openMenu = useSignal<string | null>(null);
  // Mobile slide-down panel + its expanded accordion group.
  const isMobileOpen = useSignal(false);
  const openMobileGroup = useSignal<string | null>(null);

  const headerRef = useSignal<HTMLElement>();
  const hamburgerRef = useSignal<HTMLButtonElement>();

  const closeAll = $(() => {
    openMenu.value = null;
    isMobileOpen.value = false;
  });

  // Close an open desktop dropdown when the pointer clicks outside the nav.
  useOnDocument(
    "click",
    $((event) => {
      const target = event.target as Node;
      if (openMenu.value && headerRef.value && !headerRef.value.contains(target)) {
        openMenu.value = null;
      }
    })
  );

  // Escape closes everything and returns focus to the hamburger when relevant.
  useOnDocument(
    "keydown",
    $((event) => {
      if (event.key === "Escape" && (openMenu.value || isMobileOpen.value)) {
        const wasMobile = isMobileOpen.value;
        openMenu.value = null;
        isMobileOpen.value = false;
        if (wasMobile) hamburgerRef.value?.focus();
      }
    })
  );

  return (
    <header
      ref={headerRef}
      class="not-prose fixed top-0 z-30 w-full border-b border-brand-outline bg-brand-background/90 backdrop-blur-lg lg:bg-opacity-60"
    >
      <div class="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
        <div class="relative flex h-[68px] items-center gap-6">
          {/* Brand */}
          <a
            class="flex shrink-0 items-center gap-2 text-brand-text no-underline"
            href="/"
            aria-current={slug === "/" ? "page" : undefined}
          >
            <Logo />
            <span class="font-sans text-base font-light tracking-tight">Paul Scanlon</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main" class="hidden lg:block">
            <ul class="flex items-center gap-1">
              {navItems.map((item) => {
                if (item.type === "link") {
                  const active = isLinkActive(item.link, slug);
                  const count = newItems[item.title.toLowerCase()] || 0;
                  return (
                    <li key={item.title}>
                      <a
                        href={item.link}
                        aria-current={active ? "page" : undefined}
                        class={`relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-light transition-colors duration-200 ${
                          active
                            ? "bg-brand-surface text-brand-text"
                            : "text-slate-300 hover:bg-brand-surface hover:text-brand-text"
                        }`}
                      >
                        {item.title}
                        {count ? (
                          <span class="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-brand-background">
                            {count}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  );
                }

                // Group => disclosure dropdown
                const isOpen = openMenu.value === item.title;
                const groupActive = item.items.some((sub) => isLinkActive(sub.link, slug));
                const groupCount = item.items.reduce(
                  (n, sub) => n + (newItems[sub.title.toLowerCase()] || 0),
                  0
                );
                const panelId = `nav-panel-${item.title.toLowerCase()}`;

                return (
                  <li
                    key={item.title}
                    class="relative"
                    onMouseEnter$={() => (openMenu.value = item.title)}
                    onMouseLeave$={() => (openMenu.value = null)}
                    onFocusOut$={(event, el) => {
                      if (!el.contains(event.relatedTarget as Node)) openMenu.value = null;
                    }}
                    onKeyDown$={(event, el) => {
                      // Escape closes the panel and returns focus to the trigger (APG disclosure).
                      if (event.key === "Escape" && openMenu.value === item.title) {
                        openMenu.value = null;
                        el.querySelector("button")?.focus();
                      }
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick$={() => (openMenu.value = isOpen ? null : item.title)}
                      class={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-light transition-colors duration-200 ${
                        isOpen || groupActive
                          ? "bg-brand-surface text-brand-text"
                          : "text-slate-300 hover:bg-brand-surface hover:text-brand-text"
                      }`}
                    >
                      {item.title}
                      {groupCount ? (
                        <span class="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-brand-background">
                          {groupCount}
                        </span>
                      ) : null}
                      <svg
                        class={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        aria-hidden="true"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* pt-3 forms an invisible bridge so the pointer can travel
                        from the trigger into the panel without closing it. */}
                    <div
                      id={panelId}
                      aria-hidden={!isOpen}
                      class={`absolute left-0 top-full pt-3 motion-safe:transition motion-safe:duration-200 ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <ul class="grid w-[24rem] grid-cols-2 gap-1 rounded-xl border border-brand-outline bg-brand-surface p-2 shadow-2xl shadow-black/40">
                        {item.items.map((sub) => {
                          const active = isLinkActive(sub.link, slug);
                          const count = newItems[sub.title.toLowerCase()] || 0;
                          return (
                            <li key={sub.title}>
                              <a
                                href={sub.link}
                                aria-current={active ? "page" : undefined}
                                tabIndex={isOpen ? 0 : -1}
                                class={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-colors duration-200 ${
                                  active
                                    ? "bg-brand-background text-brand-text"
                                    : "text-slate-300 hover:bg-brand-background hover:text-brand-text"
                                }`}
                              >
                                <span
                                  class={`grid h-8 w-8 shrink-0 place-items-center rounded-md border transition-colors duration-200 ${
                                    active
                                      ? "border-brand-outline bg-brand-surface text-brand-primary"
                                      : "border-transparent bg-brand-background text-brand-muted group-hover:border-brand-outline group-hover:text-brand-text"
                                  }`}
                                >
                                  <Icon icon={sub.icon} stroke={sub.stroke} />
                                </span>
                                <span class="flex-1">{sub.title}</span>
                                {count ? (
                                  <span class="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-brand-background">
                                    {count}
                                  </span>
                                ) : null}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right cluster: search (desktop) + hamburger (mobile) */}
          <div class="ml-auto flex items-center gap-2">
            <div class="hidden w-56 lg:block">
              <SearchTrigger handleModal={handleModal} />
            </div>
            <button
              ref={hamburgerRef}
              type="button"
              aria-expanded={isMobileOpen.value}
              aria-controls="mobile-menu"
              onClick$={() => (isMobileOpen.value = !isMobileOpen.value)}
              class="flex h-10 w-10 items-center justify-center rounded-lg text-brand-text transition-colors duration-200 hover:bg-brand-surface lg:hidden"
            >
              <span class="sr-only">{isMobileOpen.value ? "Close menu" : "Open menu"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={isMobileOpen.value ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <nav
        id="mobile-menu"
        aria-label="Main"
        class={`overflow-hidden border-t border-brand-outline bg-brand-background motion-safe:transition-all motion-safe:duration-300 lg:hidden ${
          isMobileOpen.value ? "visible max-h-[85vh] opacity-100" : "invisible max-h-0 opacity-0"
        }`}
      >
        <div class="space-y-1 px-4 py-4 sm:px-6">
          <div class="pb-3">
            <SearchTrigger handleModal={handleModal} />
          </div>
          {navItems.map((item) => {
            if (item.type === "link") {
              const active = isLinkActive(item.link, slug);
              const count = newItems[item.title.toLowerCase()] || 0;
              return (
                <a
                  key={item.title}
                  href={item.link}
                  aria-current={active ? "page" : undefined}
                  tabIndex={isMobileOpen.value ? 0 : -1}
                  onClick$={closeAll}
                  class={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-light transition-colors duration-200 ${
                    active ? "bg-brand-surface text-brand-text" : "text-slate-300 hover:bg-brand-surface hover:text-brand-text"
                  }`}
                >
                  <Icon icon={item.icon} stroke={item.stroke} />
                  <span class="flex-1">{item.title}</span>
                  {count ? (
                    <span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-brand-background">
                      {count}
                    </span>
                  ) : null}
                </a>
              );
            }

            const isOpen = openMobileGroup.value === item.title;
            const groupCount = item.items.reduce(
              (n, sub) => n + (newItems[sub.title.toLowerCase()] || 0),
              0
            );
            const panelId = `mobile-panel-${item.title.toLowerCase()}`;

            return (
              <div key={item.title}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  tabIndex={isMobileOpen.value ? 0 : -1}
                  onClick$={() => (openMobileGroup.value = isOpen ? null : item.title)}
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-light text-slate-300 transition-colors duration-200 hover:bg-brand-surface hover:text-brand-text"
                >
                  <span class="flex-1 text-left">{item.title}</span>
                  {groupCount ? (
                    <span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-brand-background">
                      {groupCount}
                    </span>
                  ) : null}
                  <svg
                    class={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  class={`overflow-hidden motion-safe:transition-all motion-safe:duration-300 ${
                    isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul class="ml-4 mt-1 space-y-1 border-l border-brand-outline pl-2">
                    {item.items.map((sub) => {
                      const active = isLinkActive(sub.link, slug);
                      const count = newItems[sub.title.toLowerCase()] || 0;
                      return (
                        <li key={sub.title}>
                          <a
                            href={sub.link}
                            aria-current={active ? "page" : undefined}
                            tabIndex={isMobileOpen.value && isOpen ? 0 : -1}
                            onClick$={closeAll}
                            class={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-colors duration-200 ${
                              active ? "bg-brand-surface text-brand-text" : "text-slate-300 hover:bg-brand-surface hover:text-brand-text"
                            }`}
                          >
                            <Icon icon={sub.icon} stroke={sub.stroke} />
                            <span class="flex-1">{sub.title}</span>
                            {count ? (
                              <span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-brand-background">
                                {count}
                              </span>
                            ) : null}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
});

export default TopNav;
