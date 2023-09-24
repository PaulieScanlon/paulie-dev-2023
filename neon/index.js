import { neon } from '@neondatabase/serverless';

export const sql = neon(import.meta.env.DATABASE_URL);
