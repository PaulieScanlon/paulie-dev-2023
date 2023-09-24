import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import vercel from '@astrojs/vercel/serverless';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true
  }),
  image: {
    domains: ['res.cloudinary.com']
  },
  integrations: [tailwind(), AutoImport({
    imports: [{
      './src/components/cta.astro': [['default', 'Cta']]
    }, {
      './src/components/code-sandbox.astro': [['default', 'CodeSandbox']]
    }, {
      './src/components/astro-image.astro': [['default', 'AstroImage']]
    }, {
      'astro-embed': ['Tweet', 'Vimeo', 'YouTube']
    }, {
      'astro:assets': ['Image']
    }]
  }), mdx({
    syntaxHighlight: 'prism'
  }), react()]
});