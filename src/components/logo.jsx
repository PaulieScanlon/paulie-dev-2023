import { component$ } from "@builder.io/qwik";

const Logo = component$(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="32" aria-hidden="true">
      <defs>
        <linearGradient id="logo-gradient" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1ff1a5" />
          <stop offset="50%" stop-color="#5b8cff" />
          <stop offset="100%" stop-color="#ffadfe" />
        </linearGradient>
      </defs>
      <g stroke="url(#logo-gradient)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        {/* enclosing ring */}
        <circle cx="24" cy="24" r="21" stroke-width="1.5" />
        {/* true Archimedean spiral (r = c·θ, 1.75 turns) coiling around a centered dot */}
        <path
          d="M 36.02 11.98 L 33.94 10.45 L 31.67 9.27 L 29.28 8.45 L 26.82 8.02 L 24.35 7.98 L 21.93 8.3 L 19.62 8.99 L 17.47 10.0 L 15.53 11.32 L 13.83 12.9 L 12.41 14.7 L 11.3 16.67 L 10.51 18.75 L 10.06 20.91 L 9.95 23.08 L 10.16 25.21 L 10.7 27.25 L 11.53 29.17 L 12.62 30.9 L 13.96 32.43 L 15.48 33.71 L 17.16 34.73 L 18.95 35.47 L 20.81 35.91 L 22.68 36.07 L 24.52 35.93 L 26.29 35.52 L 27.95 34.86 L 29.46 33.96 L 30.8 32.86 L 31.93 31.59 L 32.83 30.18 L 33.49 28.68 L 33.91 27.12 L 34.08 25.55 L 34.0 24.0 L 33.69 22.51 L 33.17 21.11 L 32.45 19.84 L 31.55 18.71 L 30.52 17.76 L 29.38 16.99 L 28.16 16.43 L 26.89 16.06 L 25.61 15.91 L 24.35 15.95 L 23.14 16.19 L 22.02 16.59 L 20.99 17.16 L 20.09 17.86 L 19.33 18.67 L 18.72 19.57 L 18.28 20.53 L 17.99 21.51 L 17.88 22.5 L 17.91 23.47 L 18.1 24.39 L 18.41 25.24 L 18.85 26.0 L 19.38 26.67 L 19.99 27.22 L 20.66 27.65 L 21.36 27.95 L 22.07 28.13 L 22.78 28.19 L 23.46 28.13 L 24.09 27.97 L 24.66 27.72 L 25.15 27.39 L 25.56 27.01 L 25.89 26.58 L 26.12 26.12"
          stroke-width="1.8"
        />
        <circle cx="24" cy="24" r="3.4" fill="url(#logo-gradient)" stroke="none" />
      </g>
    </svg>
  );
});

export default Logo;
