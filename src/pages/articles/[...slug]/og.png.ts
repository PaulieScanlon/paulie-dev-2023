export const prerender = true;

import { getCollection } from 'astro:content';
import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

import { formatDate } from '../../../utils/format-date';

// https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/
export async function GET({ props }) {
  const {
    article: {
      data: { title, logo, date, publication, base, author },
    },
  } = props;

  const InconsolataBlack = fs.readFileSync(path.resolve('./public/fonts/Inconsolata-Black.ttf'));
  const InconsolataBold = fs.readFileSync(path.resolve('./public/fonts/Inconsolata-Bold.ttf'));

  const html = {
    type: 'div',
    props: {
      tw: 'w-full h-full flex items-center relative px-24',
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
            tw: 'pl-14 flex flex-col',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'flex items-center',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'w-[44px] h-[44px] flex mb-1',
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
                        tw: 'pl-4 text-3xl',
                        style: {
                          color: '#a4a0fb',

                          fontFamily: 'Inconsolata Bold',
                        },
                        children: publication,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'pl-2 text-3xl',
                        style: {
                          color: '#d9dbdf',

                          fontFamily: 'Inconsolata Bold',
                        },
                        children: '•',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'pl-2 text-3xl',
                        style: {
                          color: '#f056c7',

                          fontFamily: 'Inconsolata Bold',
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
                  tw: 'mt-4',
                  style: {
                    color: '#d9dbdf',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    fontFamily: 'Inconsolata Black',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'flex items-center mt-12',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'text-2xl',
                        style: {
                          color: '#d9dbdf',
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
                        tw: 'text-2xl',
                        style: {
                          color: '#58e6d9',
                        },
                        children: `paulie.dev/${base}`,
                      },
                    },
                  ],
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
    fonts: [
      {
        name: 'Inconsolata Bold',
        data: InconsolataBold.buffer,
        style: 'normal',
      },
      {
        name: 'Inconsolata Black',
        data: InconsolataBlack.buffer,
        style: 'normal',
      },
    ],
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
