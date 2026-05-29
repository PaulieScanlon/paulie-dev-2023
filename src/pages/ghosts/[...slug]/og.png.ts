export const prerender = true;

import { getCollection } from "astro:content";

import { renderOgImage } from "../../../services/og-image";
import { formatDate } from "../../../utils/format-date";

const ghosts = await getCollection("ghosts");

export async function GET({ props }) {
  const {
    ghost: {
      data: { title, logo, date, publication, base, author }
    }
  } = props;

  return renderOgImage({
    title,
    metaText: `${publication} · ${formatDate(date)}`,
    metaLogo: logo,
    footerText: `${author} · paulie.dev/${base}`
  });
}

export async function getStaticPaths() {
  return ghosts.map((ghost) => {
    return {
      params: {
        slug: ghost.slug
      },
      props: {
        ghost
      }
    };
  });
}
