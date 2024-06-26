import type { APIRoute } from 'astro';
import { sql } from '../../neon';

export const POST: APIRoute = async ({ request }) => {
  const { slug } = await new Response(request.body).json();

  try {
    if (!slug) {
      return Response.json({
        message: 'Missing required parameters',
        status: 200,
      });
    } else {
      const response = await sql(
        'SELECT reaction, COUNT(*) AS count FROM reactions WHERE slug = $1 GROUP BY reaction',
        [slug]
      );

      return Response.json({
        message: 'A Ok!',
        status: 200,
        data: response,
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
