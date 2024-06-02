import type { APIRoute } from 'astro';
import { sql } from '../../neon';
import { geolocation } from '@vercel/edge';

export const POST: APIRoute = async ({ request }) => {
  const { slug, reaction } = await new Response(request.body).json();

  const { flag, country, city, latitude, longitude } = geolocation(request);
  const date = new Date();

  try {
    if (!slug || !reaction) {
      return Response.json({
        message: 'Missing required parameters',
        status: 200,
      });
    } else {
      await sql(
        'INSERT INTO reactions(date, slug, reaction, flag, country, city, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        [date, slug, reaction, flag, country, city.replace(/[^a-zA-Z ]/g, ' '), latitude, longitude]
      );

      return Response.json({
        message: 'A Ok!',
        status: 200,
      });
    }
  } catch (error) {
    return Response.json({
      message: 'Error',
      status: 500,
    });
  }
};

export const config = {
  runtime: 'edge',
};
