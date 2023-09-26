/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    // These are for the TOC
    'pl-4',
    'pl-5',
    'pl-6',
    'pl-7',
    'pl-8',
    // These are for the charts
    'stroke-brand-teal',
    'stroke-brand-mauve',
    'stroke-brand-salmon',
    'stroke-brand-yellow',
    'stroke-brand-lime',
    'stroke-brand-blood',
    'stroke-brand-starfleet',
    'stroke-brand-electric',

    'text-brand-teal',
    'text-brand-mauve',
    'text-brand-salmon',
    'text-brand-yellow',
    'text-brand-lime',
    'text-brand-blood',
    'text-brand-starfleet',
    'text-brand-electric',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text: '#e5e7eb',
          primary: '#f056c7',
          secondary: '#8b87ea',
          tertiary: '#58e6d9',
          muted: '#605c9d',
          salmon: '#ff6090',
          mauve: '#4b5ec8',
          teal: '#00bcd4',
          lime: '#8bc34a',
          yellow: '#ffc107',
          fuchsia: '#7B1FA2',
          blood: '#ff5722',
          starfleet: '#2990fa',
          electric: '#6933ff',
          background: '#131127',
          outline: '#232140',
          surface: '#16142c',
          guide: '#2d2a58',
        },
      },
      fontFamily: {
        sans: ['Inconsolata', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '*:not(h1, h2, h3, h4, h5, h6, a, code)': {
              color: theme('colors.brand.text'),
            },
            h1: {
              color: theme('colors.brand.text'),
            },
            'h2, h3, h4, h5, h6': {
              color: theme('colors.brand.salmon'),
            },
            p: {
              fontFamily: 'system-ui',
            },
            a: {
              color: theme('colors.brand.secondary'),
              cursor: 'pointer',
              '&:hover': {
                color: theme('colors.brand.text'),
              },
              p: {
                margin: 0,
                color: 'inherit',
              },
            },
            'a, small, time': {
              fontWeight: 300,
            },
            code: {
              color: theme('colors.brand.tertiary'),
              '&::before': {
                content: '"" !important',
              },
              '&::after': {
                content: '"" !important',
              },
            },
            blockquote: {
              background: theme('colors.brand.surface'),
              padding: '1.2em',
              borderLeftColor: theme('colors.brand.yellow'),
              borderRadius: '.2em',
            },
            '.twitter-tweet': {
              borderColor: '#232140!important',
              padding: '32px!important',
              background: theme('colors.brand.surface'),
              borderRadius: '4px',
              color: theme('colors.brand.text'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
