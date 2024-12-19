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

// Магнітна буря 🌞
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
      kpElement.textContent = `Planetary K index: ${kp}`;
      kpElement.style.color = kpColor;

  } catch (error) {
      console.error('Error fetching magnetic storm data:', error);
      document.getElementById('storm-time').textContent = 'Error loading storm data.';
  }
}

fetchMagneticStormData();