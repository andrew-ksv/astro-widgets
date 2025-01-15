"use strict";

async function fetchApod() {
    try {
        const response = await fetch('/api/astro-pics');
        const data = await response.json();

        const content = document.getElementById('content');
        content.innerHTML = ''; //Clear previous content

        data.forEach(item => {
            content.innerHTML += `
                <div class="content-data">
                    <h2>${item.title}</h2>
                    <p>${item.date}</p>
                    <img src="${item.url}" alt="${item.title}" style="max-width: 100%;"/>
                    <p>${item.explanation}</p>
                </div>
            `;
        });
    } catch (error) {
        document.getElementById('content').innerHTML = 'Error loading data';
    }
}
fetchApod();