import { sql } from '../../neon';
import { geolocation } from '@vercel/edge';

export async function POST({ params, request }) {
  const { slug } = await new Response(request.body).json();
  const { flag, country, city, latitude, longitude } = geolocation(request);
  const date = new Date();

  try {
    if (!slug || !city) {
      return Response.json({
        message: 'Missing required parameters',
        status: 200,
      });
    } else {
      await sql`INSERT INTO analytics (date, slug, flag, country, city, latitude, longitude)
      VALUES (${date}, ${slug}, ${flag}, ${country}, ${city.replace(/[^a-zA-Z ]/g, ' ')}, ${Number(latitude)}, ${Number(
        longitude
      )});`;

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
}

export const config = {
  runtime: 'edge',
};
