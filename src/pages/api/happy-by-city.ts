import type { APIRoute } from 'astro';
import { sql } from '../../neon';

export const POST: APIRoute = async ({ request }) => {
  const { period } = await new Response(request.body).json();

  try {
    const response = await sql(`
      SELECT flag, country, city, reaction, COUNT(reaction) AS total
      FROM reactions
      WHERE reaction LIKE 'happy' 
        AND date >= NOW() - INTERVAL '${period} days'
        AND flag IS NOT NULL
      GROUP BY flag, country, city, reaction
      ORDER BY total DESC
      LIMIT 10;
  `);

    return Response.json({
      message: 'A Ok!',
      status: 200,
      data: response,
    });
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
