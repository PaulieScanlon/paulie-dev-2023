export const prerender = true;

import { getCollection } from 'astro:content';
import { ImageResponse, html } from 'og-img';
import fs from 'fs';
import path from 'path';

import { formatSlug } from '../../../utils/format-slug';

export async function GET({ props }) {
  const { name, collections } = props;

  const filteredCollection = collections.filter((collection) => {
    const sanitizedTags = collection.data.tags.map((tag) => formatSlug(tag));
    return sanitizedTags.includes(formatSlug(name));
  });

  return new ImageResponse(
    html`<div tw="relative flex w-full h-full items-center px-48" style="background-color: #131127">
      <div tw="absolute flex items-center top-12 left-16">
        <img
          tw="w-16 h-16"
          src="https://res.cloudinary.com/www-paulie-dev/image/upload/v1716149515/paulie.dev/Images/icon-logo_v1_x4nt1i.png"
        />
      </div>
      <div tw="relative flex flex-col">
        <div tw="flex items-center mb-6">
          <div tw="text-4xl" style="color: #a4a0fb; fontFamily: Inconsolata Bold">${name}</div>
        </div>
        <div tw="flex text-6xl leading-tight mb-1" style="color: #d9dbdf; fontFamily: Inconsolata Black">
          Tagged with ${name}
        </div>
        <div tw="flex text-3xl leading-tight mb-12" style="color: #d9dbdf; fontFamily: Roboto Regular">
          Here you'll find <strong tw="px-3" style="color: #f056c7">${filteredCollection.length}</strong> pieces of
          content about <strong tw="pl-3" style="color: #ffc107">${name}</strong>.
        </div>
        <div tw="flex items-center">
          <div tw="text-3xl" style="color: #d9dbdf; fontFamily: Inconsolata Bold">Paul Scanlon</div>
          <div tw="pl-4 text-3xl" style="color: #d9dbdf; fontFamily: Inconsolata Bold">|</div>
          <div tw="pl-4 text-3xl lowercase" style="color: #58e6d9; fontFamily: Inconsolata Bold">
            ${`paulie.dev/tags/${name}`}
          </div>
        </div>
      </div>
    </div>`,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Roboto Regular',
          data: fs.readFileSync(path.resolve('./public/fonts/Roboto-Regular.ttf')),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inconsolata Bold',
          data: fs.readFileSync(path.resolve('./public/fonts/Inconsolata-Bold.ttf')),
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Inconsolata Black',
          data: fs.readFileSync(path.resolve('./public/fonts/Inconsolata-Black.ttf')),
          weight: 900,
          style: 'normal',
        },
      ],
    }
  );
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
