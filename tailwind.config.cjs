/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    // These are for the modal
    "backdrop-blur",
    // These are for the TOC
    "pl-4",
    "pl-5",
    "pl-6",
    "pl-7",
    "pl-8",
    // These are for the charts
    "stroke-brand-teal",
    "stroke-brand-royal",
    "stroke-brand-primary",
    "stroke-brand-yellow",
    "stroke-brand-lime",
    "stroke-brand-blood",
    "stroke-brand-azure",
    "stroke-brand-verdant",
    "stroke-brand-pink",
    "stroke-brand-fuchsia",
    "stroke-brand-secondary",

    "fill-brand-teal",
    "fill-brand-royal",
    "fill-brand-primary",
    "fill-brand-yellow",
    "fill-brand-lime",
    "fill-brand-blood",
    "fill-brand-azure",
    "fill-brand-verdant",
    "fill-brand-pink",
    "fill-brand-fuchsia",
    "fill-brand-secondary",

    "bg-brand-teal",
    "bg-brand-royal",
    "bg-brand-primary",
    "bg-brand-yellow",
    "bg-brand-lime",
    "bg-brand-blood",
    "bg-brand-azure",
    "bg-brand-verdant",
    "bg-brand-pink",
    "bg-brand-fuchsia",
    "bg-brand-secondary",

    "text-brand-teal",
    "text-brand-royal",
    "text-brand-primary",
    "text-brand-yellow",
    "text-brand-lime",
    "text-brand-blood",
    "text-brand-azure",
    "text-brand-verdant",
    "text-brand-pink",
    "text-brand-fuchsia",
    "text-brand-secondary",

    // This is for the GitHub Activity
    "bg-brand-azure",
    "bg-brand-verdant",
    "bg-red-500",

    // These are for the Ghosts collections cards
    "cursor-not-allowed",

    // These are for the rehypeExternalLinks svgs
    "w-4",
    "h-4"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text: "#d9dbdf",
          primary: "#ffadfe",
          secondary: "#5b8cff",
          tertiary: "#1ff1a5",
          muted: "#8fa2d1",
          royal: "#5b8cff",
          teal: "#1ff1a5",
          lime: "#c3ff62",
          yellow: "#ffc107",
          fuchsia: "#a075ff",
          blood: "#ff5555",
          azure: "#2ee6e6",
          verdant: "#ffb84d",
          pink: "#ff6bff",
          background: "#131127",
          outline: "#232140",
          surface: "#16142c",
          guide: "#2d2a58",
          radar: "#57538c"
        }
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        display: ["Playfair Display", ...defaultTheme.fontFamily.serif]
      },
      maxWidth: {
        "8xl": "90rem"
      },
      backgroundImage: {
        "x-icon": "url('https://paulie.dev/images/x-icon.svg')"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "*:not(h1, h2, h3, h4, h5, h6, a, code)": {
              color: theme("colors.brand.text")
            },

            h1: {
              fontFamily: "Playfair Display, serif",
              color: theme("colors.brand.text"),
              margin: "2rem 0",
              fontWeight: 600,
              a: {
                fontWeight: 600,
                textDecoration: "none",
                color: theme("colors.brand.text")
              }
            },
            "h2, h3, h4, h5, h6": {
              fontFamily: "Playfair Display, serif",
              color: theme("colors.brand.text"),
              fontWeight: 600,
              a: {
                fontWeight: 600,
                textDecoration: "none",
                color: theme("colors.brand.text")
              }
            },
            p: {
              strong: {
                fontWeight: 700
              }
            },
            button: {
              fontWeight: 700
            },
            a: {
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              color: theme("colors.brand.secondary"),
              cursor: "pointer",
              wordBreak: "break-word",
              "&:hover": {
                color: theme("colors.brand.text")
              },
              p: {
                margin: 0,
                color: "inherit"
              },
              span: {
                color: "inherit",
                svg: {
                  stroke: "currentColor"
                }
              }
            },
            ol: {
              li: {
                "&::marker": {
                  color: theme("colors.brand.primary")
                }
              }
            },
            ul: {
              li: {
                "&::marker": {
                  color: theme("colors.brand.primary")
                }
              }
            },
            "a, small, time": {
              fontWeight: 300
            },
            'pre[class*="language-"]': {
              margin: "2.5rem 0px!important"
            },
            code: {
              color: theme("colors.brand.tertiary"),
              wordBreak: "break-word",
              "&::before": {
                content: '"" !important'
              },
              "&::after": {
                content: '"" !important'
              }
            },

            blockquote: {
              background: theme("colors.brand.surface"),
              padding: "1.2em",
              borderLeftColor: theme("colors.brand.yellow"),
              borderRadius: ".2em",
              p: {
                margin: 0
              }
            },
            dl: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
              paddingLeft: "1.625em",
              dt: {
                fontSize: "1.25rem",
                color: theme("colors.brand.text"),
                paddingLeft: "0.375em"
              },
              dd: {
                display: "list-item",
                listStyleType: "disc",
                marginTop: "0.5em",
                marginBottom: "0.5em",
                paddingLeft: "0.375em",
                "&::marker": {
                  color: theme("colors.brand.primary")
                }
              }
            },
            ".twitter-tweet": {
              "&::before": {
                content: "''",
                display: "block",
                background: theme("backgroundImage.x-icon"),
                width: 24,
                height: 24,
                marginBottom: 16
              },
              borderColor: "#232140!important",
              padding: "32px!important",
              background: theme("colors.brand.surface"),
              borderRadius: "4px",
              color: theme("colors.brand.text")
            },
            ".event-color-PushEvent": {
              backgroundColor: theme("colors.brand.azure")
            },
            ".event-color-CreateEvent": {
              backgroundColor: theme("colors.brand.lime")
            },
            ".event-color-ForkEvent": {
              backgroundColor: theme("colors.brand.royal")
            },
            ".event-color-WatchEvent": {
              backgroundColor: theme("colors.brand.verdant")
            },
            ".event-color-DeleteEvent": {
              backgroundColor: theme("colors.red.500")
            },

            ".event-color-IssueCommentEvent": {
              backgroundColor: theme("colors.brand.yellow")
            },
            ".event-color-PullRequestReviewCommentEvent": {
              backgroundColor: theme("colors.brand.yellow")
            },

            ".event-color-PullRequestEvent": {
              backgroundColor: theme("colors.brand.teal")
            },
            ".event-color-PullRequestReviewEvent": {
              backgroundColor: theme("colors.brand.teal")
            }
          }
        }
      })
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string" ? { [`--color${colorGroup}-${colorKey}`]: value } : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors"))
      });
    }
  ]
};
