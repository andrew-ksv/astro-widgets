"use strict";

const numStars = 100; //Кількість зірок
const starsContainer = document.getElementById('stars');
//Створення зірок
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    //Вертикальна позиція зірки-випадкове значення від 0% до 100% висоти екрану
    star.style.top = `${Math.random() * 100}vh`; 
    star.style.left = `${Math.random() * 100}vw`;
    //star.style.animationDelay = `${Math.random() * 5}s`; //Випадкова затримка перед початком анімації
    starsContainer.appendChild(star); //Додаємо зірки в контейнер .stars
}

// Фази місяця
const moonPhases = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘",
};

async function fetchMoonData(city = '') {
  try {
    const response = await fetch(`/api/moon?city=${city}`);
    const data = await response.json();

    document.getElementById('moon-phase').textContent = `Phase: ${data.astronomy.moon_phase}`;
    document.getElementById('moon-icon').textContent = moonPhases[data.astronomy.moon_phase] || "❓";
    document.getElementById('moon-icon').style.display = 'block';
    document.getElementById('moonrise').textContent = `Moon rise: ${data.astronomy.moonrise}`;
    document.getElementById('moonset').textContent = `Moon set: ${data.astronomy.moonset}`;
    document.getElementById('city').textContent = `Current location: ${data.location}`;
  } catch (error) {
    document.getElementById('moon-phase').textContent = 'Data loading error.';
    console.error('Error:', error);
  }
}

// Обробник натискання кнопки
document.getElementById('city-btn').addEventListener('click', () => {
  const cityInput = document.getElementById('city-input').value.trim();
  fetchMoonData(cityInput || '');
});

fetchMoonData();

// Магнітна буря ☀
async function fetchMagneticStormData() {
  try {
      const response = await fetch('/api/k-index');
      const data = await response.json();

      const stormTime = new Date(data.time);
      document.getElementById('storm-time').textContent = `Last updated: ${stormTime.toLocaleString()}`;

      const kp = data.kp;
      let kpColor;

      if (kp >= 7) {
          kpColor = 'rgb(254, 65, 65)';
      } else if (kp >= 5) {
          kpColor = 'rgb(254, 251, 65)';
      } else {
          kpColor = 'rgb(109, 254, 65)';
      }

      const kpElement = document.getElementById('storm-kp');
      kpElement.textContent = `Kp Index: ${kp}`;
      kpElement.style.color = kpColor;

  } catch (error) {
      console.error('Error fetching magnetic storm data:', error);
      document.getElementById('storm-time').textContent = 'Error loading storm data.';
  }
}

fetchMagneticStormData();