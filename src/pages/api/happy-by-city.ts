import type { APIRoute } from 'astro';
import { sql } from '../../neon';

export const GET: APIRoute = async () => {
  try {
    const response = await sql`
      WITH happy_reactions AS (
        SELECT analytics.city, analytics.country, analytics.flag, COUNT(reactions.id) AS count
        FROM analytics
        INNER JOIN reactions 
        ON analytics.slug = reactions.slug
        WHERE reactions.reaction = 'happy'
        AND analytics.date >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY analytics.city, analytics.country, analytics.flag
      )
      SELECT city, country, flag, count
      FROM happy_reactions
      ORDER BY count DESC
      LIMIT 50;`;

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
