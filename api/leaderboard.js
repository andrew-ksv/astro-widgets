const express = require('express');
const router = express.Router();
const { neon } = require('@neondatabase/serverless'); 
router.get('/', async (req, res) => {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Error fetching leaderboard');
  }
});

module.exports = router;
