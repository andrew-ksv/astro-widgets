import React from 'react';
import { neon } from '@neondatabase/serverless';

export default async function Page() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const results = await sql('SELECT * FROM snake_scores');

  return (
    <div>
      <h1>Snake Scores</h1>
      <ul>
        {results.map((row: any, index: number) => (
          <li key={index}>
            <strong>{row.nickname}</strong>: {row.score} points, played at {row.play_time}
          </li>
        ))}
      </ul>
    </div>
  );
}
