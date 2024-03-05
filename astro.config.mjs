import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import vercel from '@astrojs/vercel/serverless';
import qwikdev from '@qwikdev/astro';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { rehypeExternalLinks } from './src/utils/rehype-external-links';

const isProd = import.meta.env.PROD;

export default defineConfig({
  site: isProd ? 'https://paulie.dev' : 'http://localhost:4321',
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
    maxDuration: 10,
  }),
  image: {
    domains: ['res.cloudinary.com'],
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
      // optimize: {
      //   customComponentNames: ['StackBlitz'],
      // },
      syntaxHighlight: 'prism',
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypeExternalLinks],
    }),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 10000,
    },
  },
});
