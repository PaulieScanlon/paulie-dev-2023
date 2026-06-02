import { ImageResponse, html } from "og-img";
import { __unsafeHTML } from "ultrahtml";
import fs from "fs";
import path from "path";

/**
 * Shared dynamic OG image used as the site-wide default (see src/pages/og.png.ts).
 * Renders a branded 1200x630 card from a page title using the redesigned identity:
 * dark background, the gradient spiral logo, a Playfair title and a gradient accent bar.
 */

const readFont = (file: string) => fs.readFileSync(path.resolve(`./public/fonts/${file}`));

const fonts = [
  { name: "Playfair Display", data: readFont("PlayfairDisplay-Regular.woff"), weight: 400 as const, style: "normal" as const },
  { name: "DM Sans", data: readFont("DMSans-Regular.woff"), weight: 400 as const, style: "normal" as const }
];

// The redesigned logo (gradient spiral coiling around a dot) inlined as a data URI.
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="og-logo-g" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1ff1a5"/>
      <stop offset="50%" stop-color="#5b8cff"/>
      <stop offset="100%" stop-color="#ffadfe"/>
    </linearGradient>
  </defs>
  <g stroke="url(#og-logo-g)" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="24" r="21" stroke-width="1.5"/>
    <path stroke-width="1.8" d="M 36.02 11.98 L 33.94 10.45 L 31.67 9.27 L 29.28 8.45 L 26.82 8.02 L 24.35 7.98 L 21.93 8.3 L 19.62 8.99 L 17.47 10.0 L 15.53 11.32 L 13.83 12.9 L 12.41 14.7 L 11.3 16.67 L 10.51 18.75 L 10.06 20.91 L 9.95 23.08 L 10.16 25.21 L 10.7 27.25 L 11.53 29.17 L 12.62 30.9 L 13.96 32.43 L 15.48 33.71 L 17.16 34.73 L 18.95 35.47 L 20.81 35.91 L 22.68 36.07 L 24.52 35.93 L 26.29 35.52 L 27.95 34.86 L 29.46 33.96 L 30.8 32.86 L 31.93 31.59 L 32.83 30.18 L 33.49 28.68 L 33.91 27.12 L 34.08 25.55 L 34.0 24.0 L 33.69 22.51 L 33.17 21.11 L 32.45 19.84 L 31.55 18.71 L 30.52 17.76 L 29.38 16.99 L 28.16 16.43 L 26.89 16.06 L 25.61 15.91 L 24.35 15.95 L 23.14 16.19 L 22.02 16.59 L 20.99 17.16 L 20.09 17.86 L 19.33 18.67 L 18.72 19.57 L 18.28 20.53 L 17.99 21.51 L 17.88 22.5 L 17.91 23.47 L 18.1 24.39 L 18.41 25.24 L 18.85 26.0 L 19.38 26.67 L 19.99 27.22 L 20.66 27.65 L 21.36 27.95 L 22.07 28.13 L 22.78 28.19 L 23.46 28.13 L 24.09 27.97 L 24.66 27.72 L 25.15 27.39 L 25.56 27.01 L 25.89 26.58 L 26.12 26.12"/>
    <circle cx="24" cy="24" r="3.4" fill="url(#og-logo-g)" stroke="none"/>
  </g>
</svg>`;

// Exported so collections without an external publication logo (e.g. posts) can use
// the site's own spiral logo as their meta logo.
export const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

// ultrahtml (under og-img) escapes interpolated strings but never decodes them on
// render, so `&` would show as `&amp;`. Decode known entities, strip angle brackets
// (can't render and could break the parse), then pass as raw so `&` renders correctly.
const sanitize = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[<>]/g, "")
    .trim();

interface OgImageOptions {
  title: string;
  eyebrow?: string;
  /** Optional metadata line above the title, e.g. "Mastra · May 20, 2026" (rich card). */
  metaText?: string;
  /** Optional small logo shown before metaText (e.g. publication logo). */
  metaLogo?: string;
  /** Optional line below the title, e.g. a page description. */
  subtitle?: string;
  /** Optional footer line above the gradient bar, e.g. "Paul Scanlon · paulie.dev/dashboard". */
  footerText?: string;
}

export const renderOgImage = ({ title, eyebrow = "paulie.dev", metaText, metaLogo, subtitle, footerText }: OgImageOptions) => {
  const metaBlock = metaText
    ? `<div tw="flex items-center mb-5">${
        metaLogo ? `<img width="46" height="46" tw="mr-4" style="border-radius: 10px" src="${metaLogo}" />` : ""
      }<div tw="flex text-3xl" style="color: #8fa2d1; fontFamily: 'DM Sans'">${sanitize(metaText)}</div></div>`
    : "";

  const subtitleBlock = subtitle
    ? `<div tw="flex mt-5 text-3xl" style="color: #8fa2d1; fontFamily: 'DM Sans'; lineHeight: 1.3">${sanitize(subtitle)}</div>`
    : "";

  const footerBlock = footerText
    ? `<div tw="flex text-3xl mb-7" style="color: #8fa2d1; fontFamily: 'DM Sans'">${sanitize(footerText)}</div>`
    : "";

  return new ImageResponse(
    html`<div tw="flex flex-col w-full h-full justify-between" style="background-color: #131127; padding: 80px">
      <div tw="flex items-center">
        <img width="104" height="104" src="${logoDataUri}" />
        <div tw="flex ml-6 text-4xl" style="color: #8fa2d1; fontFamily: 'DM Sans'">${__unsafeHTML(sanitize(eyebrow))}</div>
      </div>
      <div tw="flex flex-col">
        ${__unsafeHTML(metaBlock)}
        <div tw="flex" style="color: #d9dbdf; fontFamily: 'Playfair Display'; fontSize: 76px; lineHeight: 1.12">
          ${__unsafeHTML(sanitize(title))}
        </div>
        ${__unsafeHTML(subtitleBlock)}
      </div>
      <div tw="flex flex-col">
        ${__unsafeHTML(footerBlock)}
        <div
          tw="flex w-full"
          style="height: 14px; border-radius: 9999px; background-image: linear-gradient(90deg, #1ff1a5, #5b8cff, #ffadfe)"
        ></div>
      </div>
    </div>`,
    {
      width: 1200,
      height: 630,
      fonts
    }
  );
};
