function fetchLeaderboard() {
  fetch('/api/leaderboard')
    .then(response => response.json())
    .then(data => {
      const leaderboardContainer = document.getElementById('leaderboard');
      leaderboardContainer.innerHTML = ''; // очищуємо перед відображенням нових лідерів

      data.slice(0, 10).forEach((leader, index) => {
        const leaderboardItem = document.createElement('p');
        leaderboardItem.textContent = `${index + 1}. ${leader.nickname} - ${leader.score} pts`;
        leaderboardContainer.appendChild(leaderboardItem);
      });
    })
    .catch(error => console.error('Error fetching leaderboard:', error));
}

// Викликаємо функцію, щоб відобразити лідерів
fetchLeaderboard();
