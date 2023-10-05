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
    'stroke-brand-pink',
    'stroke-brand-fuchsia',
    'stroke-brand-secondary',

    'fill-brand-teal',
    'fill-brand-mauve',
    'fill-brand-salmon',
    'fill-brand-yellow',
    'fill-brand-lime',
    'fill-brand-blood',
    'fill-brand-starfleet',
    'fill-brand-electric',
    'fill-brand-pink',
    'fill-brand-fuchsia',
    'fill-brand-secondary',

    'bg-brand-teal',
    'bg-brand-mauve',
    'bg-brand-salmon',
    'bg-brand-yellow',
    'bg-brand-lime',
    'bg-brand-blood',
    'bg-brand-starfleet',
    'bg-brand-electric',
    'bg-brand-pink',
    'bg-brand-fuchsia',
    'bg-brand-secondary',

    'text-brand-teal',
    'text-brand-mauve',
    'text-brand-salmon',
    'text-brand-yellow',
    'text-brand-lime',
    'text-brand-blood',
    'text-brand-starfleet',
    'text-brand-electric',
    'text-brand-pink',
    'text-brand-fuchsia',
    'text-brand-secondary',

    // This is for the GitHub Activity
    'text-brand-starfleet',
    'text-red-500',
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
          mauve: '#4871e3',
          teal: '#00bcd4',
          lime: '#8bc34a',
          yellow: '#ffc107',
          fuchsia: '#7B1FA2',
          blood: '#ff7901',
          starfleet: '#0091f7',
          electric: '#b900f7',
          pink: '#ee3373',
          background: '#131127',
          outline: '#232140',
          surface: '#16142c',
          guide: '#2d2a58',
          radar: '#57538c',
        },
      },
      fontFamily: {
        sans: ['Inconsolata', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      backgroundImage: {
        'x-icon': "url('https://paulie.dev/images/x-icon.svg')",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '*:not(h1, h2, h3, h4, h5, h6, a, code)': {
              color: theme('colors.brand.text'),
            },
            h1: {
              color: theme('colors.brand.text'),
              margin: '2rem 0',
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
            'pre[class*="language-"]': {
              margin: '2.5rem 0px!important',
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
              p: {
                margin: 0,
              },
            },
            '.twitter-tweet': {
              '&::before': {
                content: "''",
                display: 'block',
                background: theme('backgroundImage.x-icon'),
                width: 24,
                height: 24,
                marginBottom: 16,
              },
              borderColor: '#232140!important',
              padding: '32px!important',
              background: theme('colors.brand.surface'),
              borderRadius: '4px',
              color: theme('colors.brand.text'),
            },
            '.event-color-PushEvent': {
              color: theme('colors.brand.starfleet'),
            },
            '.event-color-CreateEvent': {
              color: theme('colors.brand.lime'),
            },
            '.event-color-PullRequestEvent': {
              color: theme('colors.brand.teal'),
            },
            '.event-color-ForkEvent': {
              color: theme('colors.brand.mauve'),
            },
            '.event-color-WatchEvent': {
              color: theme('colors.brand.yellow'),
            },
            '.event-color-DeleteEvent': {
              color: theme('colors.red.500'),
            },
            '.event-color-IssueCommentEvent': {
              color: theme('colors.brand.yellow'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
