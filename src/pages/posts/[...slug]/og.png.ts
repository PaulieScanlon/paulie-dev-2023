export const prerender = true;

import { getCollection } from "astro:content";

import { renderOgImage, logoDataUri } from "../../../services/og-image";
import { formatDate } from "../../../utils/format-date";

const posts = await getCollection("posts");

export async function GET({ props }) {
  const {
    post: {
      data: { title, date, base, author }
    }
  } = props;

  // Posts have no external publication — the "publication" is always paulie.dev,
  // shown with the site's own logo (mirrors the articles/ghosts meta-line pattern).
  return renderOgImage({
    title,
    metaText: `paulie.dev · ${formatDate(date)}`,
    metaLogo: logoDataUri,
    footerText: `${author} · paulie.dev/${base}`
  });
}

export async function getStaticPaths() {
  return posts.map((post) => {
    return {
      params: {
        slug: post.slug
      },
      props: {
        post
      }
    };
  });
}
