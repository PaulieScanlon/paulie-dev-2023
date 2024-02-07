import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import vercel from '@astrojs/vercel/serverless';
import qwikdev from '@qwikdev/astro';

const isProd = import.meta.env.PROD;

export default defineConfig({
  site: isProd ? 'https://paulie.dev' : 'http://localhost:4321',
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
    maxDuration: 300,
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
          'astro-embed': ['Tweet', 'Vimeo', 'YouTube'],
        },
        {
          'astro:assets': ['Image'],
        },
      ],
    }),
    mdx({
      syntaxHighlight: 'prism',
    }),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 10000,
    },
  },
});
