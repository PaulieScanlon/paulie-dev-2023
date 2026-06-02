import { component$ } from "@builder.io/qwik";

import Logo from "./logo";
import { socialLinks } from "../layouts/nav-links";

const SiteFooter = component$(() => {
  const year = new Date().getFullYear();

  return (
    <footer class="not-prose relative z-20 mt-24 border-t border-brand-outline bg-brand-background">
      <div class="mx-auto max-w-8xl px-4 py-12 sm:px-6 md:px-8">
        <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div class="max-w-sm">
            <a class="flex items-center gap-2 text-brand-text no-underline" href="/">
              <Logo />
              <span class="font-sans text-base font-light tracking-tight">Paul Scanlon</span>
            </a>
            <p class="mt-4 text-sm font-normal text-brand-muted">Technical Product Marketing Manager</p>
            <p class="mt-1 text-sm font-light text-brand-muted">
              Currently at{" "}
              <a href="https://mastra.ai/" class="font-light text-brand-secondary transition-colors hover:text-brand-text">
                Mastra
              </a>
            </p>
          </div>

          {/* Social */}
          <nav aria-label="Social and feeds">
            <ul class="flex items-center gap-2">
              {socialLinks.map((item) => {
                const isExternal = item.url.startsWith("http");
                return (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? item.rel : undefined}
                      class="grid h-10 w-10 place-items-center rounded-lg border border-transparent text-slate-400 transition-colors duration-200 hover:border-brand-outline hover:bg-brand-surface hover:text-brand-text"
                    >
                      <span class="sr-only">{item.title}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        stroke-width="2"
                        stroke={item.stroke ? "currentColor" : "none"}
                        fill={item.stroke ? "none" : "currentColor"}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d={item.icon}></path>
                      </svg>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <hr class="my-8 border-brand-outline" />

        <div class="flex flex-col gap-3 text-xs font-light text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p class="m-0">&copy; {year} Paul Scanlon. All rights reserved.</p>
          <ul class="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a href="/web-accessability/" class="text-brand-muted no-underline transition-colors duration-200 hover:text-brand-text">
                Accessibility Statement
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});

export default SiteFooter;
