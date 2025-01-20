import { neon } from '@neondatabase/serverless';

export const POST = async (req: Request) => {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const { nickname, score, play_time } = await req.json();

  try {
    await sql(
      'INSERT INTO snake_scores (nickname, score, play_time) VALUES ($1, $2, $3)',
      [nickname, score, play_time]
    );
    return new Response('Score submitted', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to submit score', { status: 500 });
  }
};