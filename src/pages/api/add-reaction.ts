import type { APIRoute } from 'astro';
import { sql } from '../../neon';

export const POST: APIRoute = async ({ request }) => {
  const { slug, reaction } = await new Response(request.body).json();
  const date = new Date();

  try {
    if (!slug || !reaction) {
      return Response.json({
        message: 'Missing required parameters',
        status: 200,
      });
    } else {
      await sql('INSERT INTO reactions(date, slug, reaction) VALUES($1, $2, $3)', [date, slug, reaction]);

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
