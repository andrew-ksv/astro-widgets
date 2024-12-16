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
  
  async function fetchMoonData() {
    try {
      const response = await fetch('/api/moon');
      const data = await response.json();
  
      const { moon_phase } = data.astronomy.astro;
  
      const phaseElement = document.getElementById('moon-phase');
      const iconElement = document.getElementById('moon-icon');
      const moonRise = document.getElementById('moonrise');
      const moonSet = document.getElementById('moonset');
      const city = document.getElementById('city');
  
      phaseElement.textContent = `Phase: ${moon_phase}`;
      iconElement.textContent = moonPhases[moon_phase] || "❓";
      iconElement.style.display = 'block';
      moonRise.textContent = `Moon rise: ${data.astronomy.astro.moonrise}`;
      moonSet.textContent = `Moon set: ${data.astronomy.astro.moonset}`;
      city.textContent = `Current location: ${data.location.name}`

    } catch (error) {
      document.getElementById('moon-phase').textContent = 'Data loading error.';
      console.error('Error:', error);
    }
  }
  fetchMoonData();