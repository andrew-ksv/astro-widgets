import React from 'react';
import { neon } from '@neondatabase/serverless';

export default function Page() {
    async function create(formData: FormData) {
        'use server';
        // Connect to the Neon database
        const sql = neon(`${process.env.DATABASE_URL}`);
        const nickname = formData.get('nickname');
        const score = formData.get('score');
        const play_time = formData.get('play_time');
        // Insert the new record into the Postgres database
        await sql('INSERT INTO snake_scores (nickname, score, play_time) VALUES ($1, $2, $3)', [nickname, score, play_time]);
    }

    return (
        <form action={create}>
            <input type="text" placeholder="Your nickname" name="nickname" />
            <input type="hidden" name="score" value="0" />
            <input type="hidden" name="play_time" value="00:00" />
            <button type="submit">Submit</button>
        </form>
    );
}
