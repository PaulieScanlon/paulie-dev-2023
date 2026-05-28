import { component$ } from "@builder.io/qwik";

const Logo = component$(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48" role="img" aria-label="Paul Scanlon">
      {/* orbit ring */}
      <circle cx="24" cy="24" r="17" fill="none" class="stroke-brand-secondary" stroke-width="1" />
      {/* core */}
      <circle cx="24" cy="24" r="5" class="fill-brand-tertiary" />
      {/* orbiting node */}
      <circle cx="36" cy="12" r="3.5" class="fill-brand-primary" />
    </svg>
  );
});

export default Logo;
