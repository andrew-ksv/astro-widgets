import { neon } from '@neondatabase/serverless';

export const GET = async () => {
  const sql = neon(`${process.env.DATABASE_URL}`);
  try {
    const results = await sql(
      'SELECT nickname, score, play_time FROM snake_scores ORDER BY score DESC LIMIT 10'
    );
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch leaderboard', { status: 500 });
  }
};