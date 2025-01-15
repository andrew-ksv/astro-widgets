"use strict";

async function fetchNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        const articles = data.articles;
        const newsContainer = document.getElementById('newsContainer');

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
            articleElement.innerHTML = `
                <img src="${article.image}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read More</a>
                `;
                    newsContainer.appendChild(articleElement);
                });
    } catch (error) {
        newsContainer.innerHTML = `<p>Failed to load news: ${error.message}</p>`;
    }
}
fetchNews();