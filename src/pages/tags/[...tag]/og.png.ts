export const prerender = true;

import { getCollection } from 'astro:content';
import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

import { formatDate } from '../../../utils/format-date';
import { formatSlug } from '../../../utils/format-slug';

// https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/
export async function GET({ props }) {
  const { name, collections } = props;

  const InconsolataBlack = fs.readFileSync(path.resolve('./public/fonts/Inconsolata-Black.ttf'));
  const InconsolataBold = fs.readFileSync(path.resolve('./public/fonts/Inconsolata-Bold.ttf'));

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
                        tw: 'flex pl-2 border rounded p-2',
                        style: {
                          color: '#f056c7',
                          borderColor: '#232140',
                          fontSize: '20px',
                          fontFamily: 'Inconsolata Bold',
                        },
                        children: `x${collections.length}`,
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
                  children: name,
                },
              },
              //   {
              //     type: 'div',
              //     props: {
              //       tw: 'flex items-center mt-12',
              //       children: [
              //         {
              //           type: 'div',
              //           props: {
              //             tw: 'text-xl',
              //             style: {
              //               color: '#d9dbdf',
              //               fontFamily: 'Inconsolata',
              //             },
              //             children: author,
              //           },
              //         },
              //         {
              //           type: 'div',
              //           props: {
              //             tw: 'px-2 text-xl',
              //             style: {
              //               color: '#d9dbdf',
              //               fontSize: '20px',
              //             },
              //             children: '|',
              //           },
              //         },
              //         {
              //           type: 'div',
              //           props: {
              //             tw: 'text-xl capitalize',
              //             style: {
              //               color: '#58e6d9',
              //             },
              //             children: base,
              //           },
              //         },
              //       ],
              //     },
              //   },
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
  const demos = await getCollection('demos');
  const opensource = await getCollection('opensource');
  const posts = await getCollection('posts');
  const streams = await getCollection('streams');

  const collections = [...articles, ...demos, ...opensource, ...posts, ...streams];

  return collections
    .map((collection) => {
      const {
        data: { tags },
      } = collection;

      return tags
        .map((tag) => {
          return {
            params: {
              tag: formatSlug(tag),
            },
            props: { name: tag, collections: collections },
          };
        })
        .flat();
    })
    .flat();
}
