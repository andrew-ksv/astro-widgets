"use strict";

const starsContainer = document.getElementById('stars');
let previousPageHeight = 0; //змінна для перевірки зміни висоти

function generateStars() {
    starsContainer.innerHTML = ''; //очищення контейнера
    const pageHeight = document.body.scrollHeight; //повна висота елемента body
    const starsPerThousandPixels = 100;
    const numStars = Math.ceil((pageHeight / 1000) * starsPerThousandPixels);

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        //випадкові позиції по всій сторінці
        star.style.top = `${Math.random() * pageHeight}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        //star.style.animationDelay = `${Math.random() * 5}s`; //Випадкова затримка перед початком анімації
        starsContainer.appendChild(star); //додаємо div з класом star до контейнера starsContainer
    }
    // console.log(document.body.scrollHeight)
}

document.addEventListener('DOMContentLoaded', () => {
    generateStars(); //генерація зірок після завантаження сторінки
    const observer = new MutationObserver(() => { //спостерігач за змінами DOM
        const currentPageHeight = document.body.scrollHeight;
        if (currentPageHeight !== previousPageHeight) {
            previousPageHeight = currentPageHeight;
            generateStars(); //перегенерація зірок
        }
    });
    //спостереження за всім документом
    observer.observe(document.body, {
        //слідкувати за додаванням або видаленням дочірніх елементів
        childList: true,
        subtree: true,
    });
});

// Поточний рік
document.getElementById('currentYear').textContent = new Date().getFullYear();