export const prerender = true;

import { ImageResponse } from '@vercel/og';
import { getCollection } from 'astro:content';

import { formatDate } from '../../../utils/format-date';

// https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/
export async function GET({ props }) {
  const {
    article: {
      data: { title, logo, date, publication, base, author },
    },
  } = props;

  const html = {
    type: 'div',
    props: {
      tw: 'w-full h-full flex items-center justify-center relative px-16',
      children: [
        {
          type: 'div',
          props: {
            tw: 'w-[100px] h-[100px] flex',
            children: [
              {
                type: 'img',
                props: {
                  src: 'https://res.cloudinary.com/www-paulie-dev/image/upload/v1716149515/paulie.dev/Images/icon-logo_v1_x4nt1i.png',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'pl-16 shrink flex flex-col',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'flex items-center',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'w-[32px] h-[32px] flex',
                        children: [
                          {
                            type: 'img',
                            props: {
                              src: logo,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'pl-4 font-bold',
                        style: {
                          color: '#a4a0fb',
                          fontSize: '20px',
                          fontFamily: 'Inconsolata',
                        },
                        children: publication,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'pl-2 font-bold',
                        style: {
                          color: '#d9dbdf',
                          fontSize: '20px',
                          fontFamily: 'Inconsolata',
                        },
                        children: '•',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'pl-2 font-bold',
                        style: {
                          color: '#f056c7',
                          fontSize: '20px',
                          fontFamily: 'Inconsolata',
                        },
                        children: formatDate(date),
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'font-bold',
                  style: {
                    color: '#d9dbdf',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    fontFamily: 'Inconsolata',
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] bottom-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-2xl',
                  style: {
                    color: '#ff6090',
                    fontFamily: 'Inconsolata',
                  },
                  children: author,
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'px-2 text-2xl',
                  style: {
                    color: '#d9dbdf',
                    fontSize: '30px',
                  },
                  children: '|',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-2xl capitalize',
                  style: {
                    color: '#d9dbdf',
                  },
                  children: base,
                },
              },
            ],
          },
        },
      ],
      style: {
        background: '#131127',
        fontFamily: 'Inconsolata',
      },
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
  });
}

export async function getStaticPaths() {
  const articles = await getCollection('articles');

  return articles.map((article) => {
    return {
      params: {
        slug: article.slug,
      },
      props: {
        article,
      },
    };
  });
}
