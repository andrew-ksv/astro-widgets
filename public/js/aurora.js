"use strict";

const img1 = document.getElementById('image1');
const img2 = document.getElementById('image2');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const caption = document.getElementById('caption');
const close = document.getElementById('close');

// Відкриття модального вікна для картинок
[img1, img2].forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        caption.innerHTML = this.alt;
    }
});

// Закриття модального вікна
close.onclick = function() {
    modal.style.display = "none";
}

// Закриття модального вікна при натисканні поза його межами
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}