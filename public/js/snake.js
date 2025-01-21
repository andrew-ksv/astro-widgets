"use strict";

const gridSize = 20; //розмір сітки гри (n X n) клітинок
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let score = 0;
const initialSpeed = 300; //початкова швидкість змії
let intervalTime = initialSpeed; //змінна для управління поточною швидкістю змії
let interval; //змінна інтервалу, який контролює рух змії за допомогою функції setInterval

let totalTime = 0; //змінна для таймера
let timerInterval; //змінна інтервалу для таймера, який оновлюється у функції updateTimer

const foodEmojis = ['🥝', '🍒', '🍉', '🥑', '🍇'];
const snakeEmojis = ['⬛', '🟪', '🟦'];
const bonusEmoji = '⭐';
const debuffEmoji = '🕳️';

let cells; //масив клітинок гри
let snake; //масив індексів клітинок які утворюють змію
let direction; //напрямок руху змії
let foodIndex; //індекс клітинки з їжею
let snakeEmoji; //символ який позначає змію

let foodItems = [];
let debuffItems = [];
let starItems = [];
let bonusItems = [];

function createGrid() { //ф-ція створення сітки gridSize X gridSize, додавання її до HTML-елемента game
    game.innerHTML = ''; //очищення попереднього вмісту контейнера game
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div'); //створення клітинки для кожної позиції в сітці
        cell.classList.add('cell'); //Додається клас cell
        if ( //перевірка для меж сітки
            i < gridSize || i >= gridSize * (gridSize - 1) ||
            i % gridSize === 0 || i % gridSize === gridSize - 1
        ) {
            cell.classList.add('border'); //усі клітинки на межах сітки отримують додатковий клас border
        }
        game.appendChild(cell); //додавання створеної клітинки в контейнер game
    }
}

function startTimer() {
    totalTime = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    totalTime++;
    const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
    const seconds = (totalTime % 60).toString().padStart(2, '0');
    timerDisplay.innerText = `Time: ${minutes}:${seconds}`;
}

function startGame() {
    clearInterval(interval);
    clearInterval(timerInterval); //зупиняємо попередній таймер
    createGrid();
    score = 0;
    updateScore(0);
    startTimer(); //запускаємо новий таймер
    cells = document.querySelectorAll('.cell');
    snake = getValidStartPosition(); //визначення стартової позиції змійки
    direction = 1; //початковий рух змійки вправо 
    foodIndex = 0;
    snakeEmoji = snakeEmojis[Math.floor(Math.random() * snakeEmojis.length)];
    intervalTime = initialSpeed; //початкова швидкість руху змійки

    snake.forEach(index => {
        cells[index].innerText = snakeEmoji;
        cells[index].classList.add('snake');
    });

    randomFood();
    interval = setInterval(moveSnake, intervalTime);
    spawnItems(); // ф-ція створення бонусів та дебафів
}

function getValidStartPosition() { //ф-ція яка визначає початкову позицію змійки
    const validSnake = [];
    const startRow = Math.floor(gridSize / 2); //обчислення середини поля
    const startCol = Math.floor(gridSize / 2);
    validSnake.push(startRow * gridSize + startCol); //індекс клітинки голови змійки 
    validSnake.push(validSnake[0] - 1); //обчислення наступних позицій змійки
    validSnake.push(validSnake[1] - 1);
    //console.log(validSnake);
    return validSnake; //ф-ція повертає масив індексів, що представляють початкову позицію змійки
}

function randomFood() {
    do {
        foodIndex = Math.floor(Math.random() * cells.length);
    } while (cells[foodIndex].classList.contains('border') || 
            cells[foodIndex].classList.contains('snake')); //перевірка на допустимість клітинки
   
    const randomFoodEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    cells[foodIndex].innerText = randomFoodEmoji;
    cells[foodIndex].classList.add('food');
    foodItems.push(foodIndex);
}

function spawnItems() {
    setInterval(() => {
        if (Math.random() < 0.15) { // 15% ймовірність для бонусу
            spawnBonus();
        }
        if (Math.random() < 0.15) { // 15% ймовірність для дебафу
            spawnDebuff();
        }
    }, 15000); // кожні 15 секунд
}

function spawnBonus() {
    let bonusIndex;
    do {
        bonusIndex = Math.floor(Math.random() * cells.length);
    } while (cells[bonusIndex].classList.contains('border') || 
    cells[bonusIndex].classList.contains('snake') || 
    cells[bonusIndex].classList.contains('bonus'));

    cells[bonusIndex].innerText = bonusEmoji;
    cells[bonusIndex].classList.add('bonus');
    bonusItems.push(bonusIndex);

    setTimeout(((index) => () => {
        if (cells[index].classList.contains('bonus')) {
            cells[index].innerText = '';
            cells[index].classList.remove('bonus');
            bonusItems = bonusItems.filter(i => i !== index);
        }
    })(bonusIndex), 8000); //бонус зникає через 8 секунд
}

function spawnDebuff() {
    let debuffIndex;
    do {
        debuffIndex = Math.floor(Math.random() * cells.length);
    } while (
        cells[debuffIndex].classList.contains('border') || 
        cells[debuffIndex].classList.contains('snake') || 
        cells[debuffIndex].classList.contains('debuff'));

    cells[debuffIndex].innerText = debuffEmoji;
    cells[debuffIndex].classList.add('debuff');
    debuffItems.push(debuffIndex);

    setTimeout(((index) => () => {
        if (cells[index].classList.contains('debuff')) {
            cells[index].innerText = '';
            cells[index].classList.remove('debuff');
            debuffItems = debuffItems.filter(i => i !== index);
        }
    })(debuffIndex), 8000); //дебаф зникає через 8 секунд
}

// function endGame() {
//     clearInterval(interval);
//     clearInterval(timerInterval);
//     document.getElementById('nickname-modal').style.display = 'block';
//   }

function moveSnake() {
    const tail = snake.pop(); //видаляє останній елемент масиву snake (хвіст змії)
    cells[tail].innerText = '';
    cells[tail].classList.remove('snake');

    const head = snake[0] + direction; //обчислення нової голови змії

    if ( //перевірка на зіткнення або вихід за межі
        (head >= gridSize * gridSize && direction === gridSize) ||
        (head % gridSize === gridSize - 1 && direction === 1) ||
        (head % gridSize === 0 && direction === -1) ||
        (head < 0 && direction === -gridSize) ||
        cells[head].classList.contains('snake') ||
        cells[head].classList.contains('border')
    ) {
        clearInterval(interval);
        clearInterval(timerInterval); //зупиняємо таймер при програші
        // endGame(); // Викликаємо endGame, якщо зіткнення або вихід за межі
        return;
    }

    snake.unshift(head);

    if (cells[head].classList.contains('food')) {
        updateScore(10);
        cells[head].classList.remove('food');
        randomFood();
        snake.push(tail);
        clearInterval(interval);
        intervalTime = intervalTime * 0.98; //швидкість збільшується на 2%
        interval = setInterval(moveSnake, intervalTime);
    } else if (cells[head].classList.contains('bonus')) {
        updateScore(100);
        cells[head].classList.remove('bonus');
        bonusItems = bonusItems.filter(i => i !== head); //видаляємо з масиву бонусів
        // randomFood();
        snake.push(tail);
        clearInterval(interval);
        intervalTime = intervalTime * 0.98; //швидкість збільшується на 2%
        interval = setInterval(moveSnake, intervalTime);
    } else if (cells[head].classList.contains('debuff')) {
        updateScore(-50);
        cells[head].classList.remove('debuff');
        debuffItems = debuffItems.filter(i => i !== head); //видаляємо з масиву дебафів
        // randomFood();
        snake.push(tail);
        clearInterval(interval);
        intervalTime = intervalTime * 0.98; //швидкість збільшується на 2%
        interval = setInterval(moveSnake, intervalTime);
    }

    cells[head].innerText = snakeEmoji;
    cells[head].classList.add('snake');
}

function updateScore(points) {
    score += points;
    scoreDisplay.innerText = `Score: ${score}`;
}

function control(e) { //обробка натискання клавіш
    if (e.keyCode === 39 && direction !== -1) {
        direction = 1;
    } else if (e.keyCode === 38 && direction !== gridSize) {
        direction = -gridSize;
    } else if (e.keyCode === 37 && direction !== 1) {
        direction = -1;
    } else if (e.keyCode === 40 && direction !== -gridSize) {
        direction = gridSize;
    }
}

function controlDirection(dir) { //управління кнопками на екрані
    if (dir === 'left' && direction !== 1) {
        direction = -1;
    } else if (dir === 'up' && direction !== gridSize) {
        direction = -gridSize;
    } else if (dir === 'right' && direction !== -1) {
        direction = 1;
    } else if (dir === 'down' && direction !== -gridSize) {
        direction = gridSize;
    }
}

document.addEventListener('keydown', control);
document.getElementById('left').addEventListener('click', () => controlDirection('left'));
document.getElementById('up').addEventListener('click', () => controlDirection('up'));
document.getElementById('right').addEventListener('click', () => controlDirection('right'));
document.getElementById('down').addEventListener('click', () => controlDirection('down'));
document.getElementById('restart').addEventListener('click', startGame);

startGame();