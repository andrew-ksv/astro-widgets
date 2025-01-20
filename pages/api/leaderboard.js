import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    const leaders = await sql('SELECT nickname, score, play_time FROM snake_scores ORDER BY score DESC LIMIT 10');
    res.status(200).json(leaders);
}
