export const prerender = true;

import { getCollection } from 'astro:content';
import { ImageResponse, html } from 'og-img';
import fs from 'fs';
import path from 'path';

import { formatDate } from '../../../utils/format-date';

export async function GET({ props }) {
  const {
    article: {
      data: { title, logo, date, publication, base, author },
    },
  } = props;

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
          <img tw="w-12 h-12 flex mb-1" src=${logo} />
          <div tw="pl-4 text-4xl" style="color: #a4a0fb; fontFamily: Inconsolata Bold">${publication}</div>
          <div tw="pl-4 text-4xl" style="color: #d9dbdf; fontFamily: Inconsolata Bold">•</div>
          <div tw="pl-4 text-4xl" style="color: #f056c7; fontFamily: Inconsolata Bold">${formatDate(date)}</div>
        </div>
        <div tw="flex text-6xl leading-tight mb-12" style="color: #d9dbdf; fontFamily: Inconsolata Black">${title}</div>
        <div tw="flex items-center">
          <div tw="text-3xl" style="color: #d9dbdf; fontFamily: Inconsolata Bold">${author}</div>
          <div tw="pl-4 text-3xl" style="color: #d9dbdf; fontFamily: Inconsolata Bold">|</div>
          <div tw="pl-4 text-3xl" style="color: #58e6d9; fontFamily: Inconsolata Bold">${`paulie.dev/${base}`}</div>
        </div>
      </div>
    </div>`,
    {
      width: 1200,
      height: 600,
      fonts: [
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
