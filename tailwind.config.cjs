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
    // These are for the Ghosts collections cards
    "cursor-not-allowed",

    // These are for the rehypeExternalLinks svgs
    "w-4",
    "h-4",

    // Chart gradient palette (chart1..chart10) used via src/utils/colors.js
    { pattern: /(bg|text|fill|stroke)-brand-chart(10|[1-9])/ }
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text: "#d9dbdf",
          primary: "#1ff1a5",
          secondary: "#5b8cff",
          tertiary: "#ffadfe",
          muted: "#8fa2d1",
          background: "#131127",
          outline: "#232140",
          surface: "#16142c",
          guide: "#2d2a58",
          radar: "#57538c",
          // Chart palette: a 10-stop gradient, primary -> secondary -> tertiary.
          // Dealt out interleaved by src/utils/colors.js so few-series charts get spread hues.
          chart1: "#1ff1a5", // primary
          chart2: "#2ed8bc",
          chart3: "#3dbed2",
          chart4: "#4ca5e8",
          chart5: "#5b8cff", // secondary
          chart6: "#7c93ff",
          chart7: "#9d99ff",
          chart8: "#bda0fe",
          chart9: "#dea6fe",
          chart10: "#ffadfe" // tertiary
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
              fontWeight: 400,
              a: {
                fontWeight: 400,
                textDecoration: "none",
                color: theme("colors.brand.text")
              }
            },
            "h2, h3, h4, h5, h6": {
              fontFamily: "Playfair Display, serif",
              color: theme("colors.brand.text"),
              fontWeight: 400,
              a: {
                fontWeight: 400,
                textDecoration: "none",
                color: theme("colors.brand.text")
              }
            },
            p: {
              strong: {
                fontWeight: 400
              }
            },
            button: {
              fontWeight: 400
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
            // Fallback for any GitHub event type without an explicit color below
            // (keeps the dot visible if GitHub adds/returns a type we haven't mapped).
            ".event-color": {
              backgroundColor: theme("colors.brand.muted")
            },

            // Repo lifecycle
            ".event-color-PushEvent": {
              backgroundColor: theme("colors.brand.chart1")
            },
            ".event-color-CreateEvent": {
              backgroundColor: theme("colors.brand.chart6")
            },
            ".event-color-DeleteEvent": {
              backgroundColor: theme("colors.brand.chart10")
            },
            ".event-color-ForkEvent": {
              backgroundColor: theme("colors.brand.chart3")
            },
            ".event-color-WatchEvent": {
              backgroundColor: theme("colors.brand.chart8")
            },
            ".event-color-PublicEvent": {
              backgroundColor: theme("colors.brand.chart2")
            },
            ".event-color-MemberEvent": {
              backgroundColor: theme("colors.brand.chart2")
            },
            ".event-color-ReleaseEvent": {
              backgroundColor: theme("colors.brand.chart9")
            },
            ".event-color-SponsorshipEvent": {
              backgroundColor: theme("colors.brand.chart9")
            },
            ".event-color-GollumEvent": {
              backgroundColor: theme("colors.brand.chart4")
            },

            // Issues
            ".event-color-IssuesEvent": {
              backgroundColor: theme("colors.brand.chart4")
            },

            // Comments
            ".event-color-IssueCommentEvent": {
              backgroundColor: theme("colors.brand.chart5")
            },
            ".event-color-CommitCommentEvent": {
              backgroundColor: theme("colors.brand.chart5")
            },
            ".event-color-PullRequestReviewCommentEvent": {
              backgroundColor: theme("colors.brand.chart5")
            },

            // Pull requests
            ".event-color-PullRequestEvent": {
              backgroundColor: theme("colors.brand.chart7")
            },
            ".event-color-PullRequestReviewEvent": {
              backgroundColor: theme("colors.brand.chart7")
            },
            ".event-color-PullRequestReviewThreadEvent": {
              backgroundColor: theme("colors.brand.chart7")
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
