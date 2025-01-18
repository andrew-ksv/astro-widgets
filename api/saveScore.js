const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  const { nickname, score, time } = req.body;

  if (!nickname || !score || !time) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Вставка в таблицю лідерів
    await sql('INSERT INTO snake_scores (nickname, score, play_time) VALUES ($1, $2, $3)', [nickname, score, time]);
    res.status(200).json({ message: 'Score saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving score' });
  }
};
