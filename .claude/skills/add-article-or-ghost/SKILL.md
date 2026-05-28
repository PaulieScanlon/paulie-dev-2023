---
name: add-article-or-ghost
description: >-
  Create a new article or ghost .mdx entry from a published blog-post URL. Given
  a link to a live post, fetch it, classify it as an article (byline = Paul
  Scanlon) or a ghost (byline = anyone else), build the correct frontmatter and a
  teaser snippet (at least ~100 words from the post), and write the file into src/content/articles or
  src/content/ghosts under the post's year/month. Tells you if the file already
  exists instead of overwriting. Use when the user gives a published blog-post
  link and asks to add it as an article or ghost.
---

# Add an article or ghost

Turn a published blog-post URL into an `.mdx` entry in this Astro site's
`articles` or `ghosts` content collection.

These collections are *link-out teasers*: each file holds frontmatter plus a
short snippet of the post. On the site the snippet fades out under a gradient and
a "Read on {publication}" button links to the real post (`url`). Do **not**
reproduce the full article.

> Note: `articles`/`ghosts` are NOT the same as the `posts` collection (Paul's
> own first-party blog). This skill only writes to `articles` and `ghosts`.

## Inputs

- A URL to a published blog post (required). The user supplies it.
- Nothing else is required — derive everything else from the post.

## Steps

### 1. Fetch the post

Use WebFetch on the URL to extract:

- **title** — the post's headline.
- **author / byline** — who the live post is attributed to.
- **publish date** — the date shown on the post (format as `YYYY-MM-DD`).
- **opening content** — the first ~2 paragraphs, for the snippet.
- **topic** — to pick tags.

If WebFetch can't get the byline or date, ask the user rather than guessing.

### 2. Classify: article vs ghost

The rule is the **published byline**, applied strictly and automatically:

- byline is **`Paul Scanlon`** → **article** (`src/content/articles/`)
- byline is **anyone else** → **ghost** (`src/content/ghosts/`)

The frontmatter `author` field = the live byline exactly as published
(`Paul Scanlon` for articles; the other person's name for ghosts).

### 3. Derive the file path

```
src/content/<collection>/<YYYY>/<MM>/<slug>.mdx
```

- `<collection>` = `articles` or `ghosts` (from step 2).
- `<YYYY>` / `<MM>` = year and month of the **post's publish date** (not today).
  Zero-pad the month (e.g. `05`).
- `<slug>` = the **last path segment of the URL**.
  e.g. `https://mastra.ai/blog/introducing-channels` → `introducing-channels`.
  Strip any query string or trailing slash. The slug is also the filename.

### 4. Check if it already exists — BEFORE writing

This is required. Do not overwrite an existing entry.

1. Check the exact target path.
2. Also search both collections by slug and by url, in case it was filed under a
   different month or collection:
   - `find src/content/articles src/content/ghosts -name "<slug>.mdx"`
   - `grep -rl "<url>" src/content/articles src/content/ghosts`

If any match is found, **stop** and tell the user the file already exists, with
its path. Do not write or modify it.

### 5. Build the frontmatter

```yaml
---
base: <articles|ghosts>
title: <post title>
date: <YYYY-MM-DD>
tags: [Tag1, Tag2]
url: <full published url>
publication: <publication name>
author: <published byline>
logo: <cloudinary logo url for the publication>
---
```

Rules:

- `base` = the collection name (matches the directory).
- `title` — **quote it** (double quotes) if it contains a colon or other
  YAML-special character; otherwise leave unquoted.
  e.g. `title: "Announcing Studio Auth: Secure, Team-Friendly Access"`.
- `date` — ISO `YYYY-MM-DD`, **unquoted**.
- `tags` — 2–3 relevant tags. Prefer reusing tags already common in the repo:
  `React, Gatsby, JavaScript, PostgreSQL, AI, Mastra, Neon, GitHub Actions,
  Tailwind, Astro, Next.js`. For Mastra posts, `[Mastra, AI]` is the norm.
- `url` — the full canonical published URL the user gave (cleaned of tracking
  params / trailing slash).
- `publication` + `logo` — look up from the tables below.
- `featuredImage` — optional, articles only. It is currently unused across all
  entries, so **omit it** unless the user explicitly asks for one.

### 6. Write the snippet body

Below the frontmatter, write a teaser drawn from the post's opening, in the
post's own voice. **Grab at least 100 words** — if the first paragraph or two is
shorter than that, keep pulling from the following paragraphs until you reach
~100+ words. Use the post's actual opening text (lightly trimmed is fine);
preserve inline markdown links (`[text](url)`) where they appear naturally. It's
a taste of the opening, not a summary of the whole piece — the gradient fade cuts
it off on the page, so don't try to reproduce the full article.

To check length, fetch enough of the post's opening (step 1) that you have more
than 100 words to work with, and count the words in the snippet before writing.

### 7. Create the directory and write the file

- `mkdir -p` the `<YYYY>/<MM>` directory if it doesn't exist.
- Write the `.mdx` file with the Write tool.

### 8. Report back

Tell the user:

- Classification (article or ghost) and **why** (the byline).
- The path written.
- The publication and logo used.
- If you stopped because the file already existed, say so and give the path.

## Publication → logo map

If the publication isn't listed here, the site needs a logo URL for it (the
schema requires `logo`). Ask the user to provide/host a logo URL rather than
inventing one.

| publication        | logo URL |
|--------------------|----------|
| Mastra             | https://res.cloudinary.com/www-paulie-dev/image/upload/v1768211168/paulie.dev/Logos/mastra-logo_uwugfl.png |
| Neon               | https://res.cloudinary.com/www-paulie-dev/image/upload/v1695653167/paulie.dev/Logos/neon-logo_ymrzrs.png |
| Gatsby             | https://res.cloudinary.com/www-paulie-dev/image/upload/v1658077182/paulie.dev/Logos/gatsby-logo_dgbkjm.png |
| The New Stack      | https://res.cloudinary.com/www-paulie-dev/image/upload/v1665235257/paulie.dev/Logos/tns-logo_miu6qk.png |
| Smashing Magazine  | https://res.cloudinary.com/www-paulie-dev/image/upload/v1658077182/paulie.dev/Logos/smashing-magazine-logo_rhvh4j.png |
| CSS Tricks         | https://res.cloudinary.com/www-paulie-dev/image/upload/v1658077182/paulie.dev/Logos/css-tricks-logo_l83ga7.png |
| Storybook          | https://res.cloudinary.com/www-paulie-dev/image/upload/v1658077183/paulie.dev/Logos/storybook-logo_xkoacl.png |
| Contentful         | https://res.cloudinary.com/www-paulie-dev/image/upload/v1658078362/paulie.dev/Logos/contentful-logo_gzxkei.png |
| Cockroach Labs     | https://res.cloudinary.com/www-paulie-dev/image/upload/v1676626221/paulie.dev/Logos/cockroach-logo_g89u6r.png |
| Netlify            | https://res.cloudinary.com/www-paulie-dev/image/upload/v1678220344/paulie.dev/Logos/netlify-logo_joepbr.png |
| Netlify Developers | https://res.cloudinary.com/www-paulie-dev/image/upload/v1678220344/paulie.dev/Logos/netlify-logo_joepbr.png |
| SitePoint          | https://res.cloudinary.com/www-paulie-dev/image/upload/v1701473095/paulie.dev/Logos/sitepoint-logo_vtomod.png |
| StackBlitz         | https://res.cloudinary.com/www-paulie-dev/image/upload/v1711649582/paulie.dev/Logos/stackblitz-logo_e4l0co.png |
| Luzmo              | https://res.cloudinary.com/www-paulie-dev/image/upload/v1721135334/paulie.dev/Logos/luzmo-logo_ya94yx.png |

## Domain → publication hints

Use to infer `publication` from the URL's domain:

| domain                  | publication        |
|-------------------------|--------------------|
| mastra.ai               | Mastra             |
| neon.tech / neon.com    | Neon               |
| gatsbyjs.com            | Gatsby             |
| thenewstack.io          | The New Stack      |
| smashingmagazine.com    | Smashing Magazine  |
| css-tricks.com          | CSS Tricks         |
| medium.com (Storybook)  | Storybook          |
| contentful.com          | Contentful         |
| cockroachlabs.com       | Cockroach Labs     |
| netlify.com             | Netlify            |
| developers.netlify.com  | Netlify Developers |
| sitepoint.com           | SitePoint          |
| blog.stackblitz.com     | StackBlitz         |
| luzmo.com               | Luzmo              |

If the domain isn't listed, ask the user for the publication name.

## Reference: schema (src/content/config.js)

Both collections share these required fields: `base, title, date, url,
publication, author, logo` plus optional `tags`. `articles` also allows an
optional `featuredImage`. `date` must be a real date.

## Example output

These examples illustrate the **frontmatter format**; their snippet bodies are
shown abbreviated. Real snippets you write must be at least ~100 words (step 6).

A ghost (byline not Paul) at `src/content/ghosts/2026/03/announcing-studio-auth.mdx`:

```mdx
---
base: ghosts
title: "Announcing Studio Auth: Secure, Team-Friendly Access for Deployed Mastra Studios"
date: 2026-03-17
tags: [Mastra, AI]
url: https://mastra.ai/blog/announcing-studio-auth
publication: Mastra
author: Ryan Hansen
logo: https://res.cloudinary.com/www-paulie-dev/image/upload/v1768211168/paulie.dev/Logos/mastra-logo_uwugfl.png
---

Mastra Studio has evolved. It's no longer just a local development tool. You can [deploy](https://mastra.ai/docs/deployment/studio) it to your own infrastructure and share the URL with your team. However, without authentication, anyone with the URL could access it, creating a security risk.

That's why we built Studio Auth. Studio Auth enables secure, team-friendly access to your deployed Mastra Studio.
```

An article (byline Paul) at `src/content/articles/2026/05/introducing-clickhouse-support.mdx`:

```mdx
---
base: articles
title: Introducing ClickHouse Support for Mastra Observability
date: 2026-05-05
tags: [Mastra, AI, ClickHouse]
url: https://mastra.ai/blog/introducing-clickhouse-support
publication: Mastra
author: Paul Scanlon
logo: https://res.cloudinary.com/www-paulie-dev/image/upload/v1768211168/paulie.dev/Logos/mastra-logo_uwugfl.png
---

ClickHouse is a columnar OLAP database designed for analytical workloads, and recommended for production observability. The new ClickHouse storage adapter gives your Mastra application high-throughput writes and millisecond aggregate queries.

Mastra's observability layer gathers telemetry to monitor AI applications at scale.
```
