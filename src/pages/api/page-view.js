import { sql } from '../../neon';
import { geolocation } from '@vercel/edge';

export async function POST({ params, request }) {
  const { slug, referrer } = await new Response(request.body).json();
  console.log('api referrer: ', referrer);
  const { flag, country, city, latitude, longitude } = geolocation(request);
  const date = new Date();

  try {
    if (!(flag && country && city && latitude && longitude && slug && referrer)) {
      return Response.json({
        message: 'Missing required parameters',
      });
    } else {
      await sql(
        'INSERT INTO analytics(date, slug, referrer, flag, country, city, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        [date, slug, referrer, flag, country, city.replace(/[^a-zA-Z ]/g, ' '), latitude, longitude]
      );

      return Response.json({
        message: 'A Ok!',
      });
    }
  } catch (error) {
    return Response.json({
      message: 'Error',
    });
  }
}

export const config = {
  runtime: 'edge',
};
