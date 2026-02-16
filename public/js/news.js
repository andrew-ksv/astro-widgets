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

        const publishedDate = new Date(article.publishedAt);
        const formattedDate = publishedDate.toLocaleDateString("en-GB"); //dd/mm/yyyy

            articleElement.innerHTML = `
                <img src="${article.image}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <p>Published at ${formattedDate}</p>
                <a href="${article.url}" target="_blank">Read More</a>
                `;
                    newsContainer.appendChild(articleElement);
                });
    } catch (error) {
        newsContainer.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
    }
}
fetchNews();