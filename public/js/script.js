"use strict";

const numStars = 100; //Кількість зірок
const starsContainer = document.getElementById('stars');
// Отримати висоту всієї сторінки
const pageHeight = document.body.scrollHeight;

// Створення зірок
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    // Випадкові позиції по всій сторінці
    star.style.top = `${Math.random() * pageHeight}px`; 
    star.style.left = `${Math.random() * window.innerWidth}px`;
     //star.style.animationDelay = `${Math.random() * 5}s`; //Випадкова затримка перед початком анімації
    starsContainer.appendChild(star);
}

// Поточний рік
document.getElementById('currentYear').textContent = new Date().getFullYear();