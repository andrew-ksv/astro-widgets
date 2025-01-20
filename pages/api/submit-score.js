import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const sql = neon(process.env.DATABASE_URL);
        const { nickname, score, play_time } = req.body;
        await sql('INSERT INTO snake_scores (nickname, score, play_time) VALUES ($1, $2, $3)', [nickname, score, play_time]);
        res.status(200).json({ message: 'Score submitted successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
