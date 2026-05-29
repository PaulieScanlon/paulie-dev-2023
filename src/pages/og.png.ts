import type { APIRoute } from "astro";
import { renderOgImage } from "../services/og-image";

// Dynamic, site-wide default OG image. Pages point og:image at
// /og.png?title=<title>&description=<desc>&path=<slug> and get a branded card.
export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const title = (url.searchParams.get("title") || "Paul Scanlon").slice(0, 140);
  const description = (url.searchParams.get("description") || "").slice(0, 160);
  const path = url.searchParams.get("path") || "/";

  // Build a clean URL line, e.g. "/" -> paulie.dev, "/dashboard/" -> paulie.dev/dashboard
  const cleanPath = path === "/" ? "" : `/${path.replace(/^\/|\/$/g, "")}`;

  const response = renderOgImage({
    title,
    subtitle: description,
    footerText: `Paul Scanlon · paulie.dev${cleanPath}`
  });
  response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400");
  return response;
};
