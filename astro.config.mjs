import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  image: {
    domains: ['res.cloudinary.com'],
  },
  integrations: [
    tailwind(),
    AutoImport({
      imports: [
        {
          './src/components/cta.astro': [['default', 'Cta']],
        },
        {
          './src/components/code-sandbox.astro': [['default', 'CodeSandbox']],
        },
        {
          './src/components/astro-image.astro': [['default', 'AstroImage']],
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
  adapter: vercel(),
});
