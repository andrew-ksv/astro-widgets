const express = require('express');
const router = express.Router();
const { neon } = require('@neondatabase/serverless'); 

router.get('/', async (req, res) => {
  try {
    const sql = neon(process.env.DATABASE_URL); 
    
    const result = await sql('SELECT * FROM snake_scores ORDER BY score DESC LIMIT 10');
    
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No leaderboard data available' });
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
});

module.exports = router;