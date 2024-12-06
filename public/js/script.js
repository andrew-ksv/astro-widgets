"use strict";
console.log("Hello");

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