import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import { h } from 'hastscript';
import vercel from '@astrojs/vercel/serverless';
import qwikdev from '@qwikdev/astro';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  site: isProd ? 'https://paulie.dev' : 'http://localhost:4321',
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
  }),
  image: {
    domains: ['res.cloudinary.com'],
    service: passthroughImageService(),
  },
  integrations: [
    tailwind(),
    qwikdev(),
    AutoImport({
      imports: [
        {
          './src/components/cta-external.astro': [['default', 'CtaExternal']],
        },
        {
          './src/components/code-sandbox.astro': [['default', 'CodeSandbox']],
        },
        {
          './src/components/astro-image.astro': [['default', 'AstroImage']],
        },
        {
          './src/components/video-player.astro': [['default', 'VideoPlayer']],
        },
        {
          './src/components/stackblitz-embed.tsx': [['default', 'StackBlitz']],
        },
        {
          'astro-embed': ['Tweet', 'Vimeo', 'YouTube'],
        },
        {
          'astro:assets': ['Image'],
        },
      ],
    }),
    mdx({
      syntaxHighlight: 'prism',
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
          },
        ],
        [
          rehypeExternalLinks,
          {
            rel: ['nofollow'],
            target: ['_blank'],
            content: () =>
              h(
                'svg',
                {
                  xmlns: 'http://www.w3.org/2000/svg',
                  fill: 'none',
                  viewBox: '0 0 24 24',
                  strokeWidth: '1.4',
                  stroke: 'currentColor',
                  class: 'not-prose w-4 h-4',
                },
                [
                  h('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
                  }),
                ]
              ),
          },
        ],
      ],
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 10000,
    },
  },
});
