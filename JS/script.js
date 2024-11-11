// Función para obtener y mostrar animes
async function fetchAndDisplayAnimes(searchTerm = '') {
    try {
        const response = await fetch('https://api.jikan.moe/v4/anime?q=bleach&sfw');
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        const animeContainer = document.getElementById('anime-container');
        animeContainer.innerHTML = ''; // Limpiar el contenedor de animes

        // Filtrar animes según el término de búsqueda
        const filteredAnimes = data.data.filter(anime => 
            anime.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredAnimes.forEach(anime => {
            const animeDiv = document.createElement('div');
            animeDiv.classList.add('anime-item');

            const genres = anime.genres.map(genre => genre.name).join(', ');

            animeDiv.innerHTML = `
                <div class="anime-grid">
                    <div class="anime-image">
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    </div>
                    <div class="anime-info">
                        <p><strong>Géneros:</strong> ${genres}</p>
                        <h3>${anime.title}</h3>
                    </div>
                </div>
            `;
            animeContainer.appendChild(animeDiv);
        });

        if (filteredAnimes.length === 0) {
            animeContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error("Error al obtener los animes:", error);
        alert(`Hubo un problema al obtener la información: ${error.message}`);
    }
}

// Cargar los animes al inicio
fetchAndDisplayAnimes();

// Botón de búsqueda
document.getElementById('button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    fetchAndDisplayAnimes(searchTerm);
});

// Búsqueda en tiempo real (opcional)
document.getElementById('search-input').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-input').value;
    fetchAndDisplayAnimes(searchTerm);
});

// Función para obtener noticias
async function fetchAnimeNews() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime");
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        const newsContainer = document.getElementById("newsContainer");
        newsContainer.innerHTML = ''; // Limpiar el contenedor de noticias

        data.data.slice(0, 4).forEach(newsItem => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = newsItem.images.jpg.large_image_url;
            img.alt = newsItem.title;

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const title = document.createElement("h3");
            title.classList.add("title");
            title.textContent = newsItem.title;

            const backdrop = document.createElement("div");
            backdrop.classList.add("backdrop");
            backdrop.textContent = newsItem.synopsis || 'Sin descripción';

            cardContent.appendChild(title);
            card.appendChild(img);
            card.appendChild(cardContent);
            card.appendChild(backdrop);
            newsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error al obtener noticias de anime:", error);
        alert(`Hubo un problema al obtener las noticias: ${error.message}`);
    }
}

// Llamada a la función para cargar las noticias al inicio
fetchAnimeNews();
