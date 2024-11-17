// Función para buscar y mostrar animes
async function fetchAndDisplayAnimes(searchTerm = '', endpoint = 'anime') {
    try {
        // Determinar el endpoint según si hay un término de búsqueda
        const url = searchTerm
            ? `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=10`
            : `https://api.jikan.moe/v4/${endpoint}?sfw`;

        const response = await fetch(url);
       

        const data = await response.json();
        const animeContainer = document.getElementById('anime-container');
        animeContainer.innerHTML = ''; // Limpiar contenedor

        // Validar si hay resultados
        const animes = data.data || [];
        if (animes.length === 0) {
            animeContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        // Mostrar resultados
        animes.forEach((anime) => {
            const animeDiv = document.createElement('div');
            animeDiv.classList.add('anime-item');

            const genres = anime.genres.map((genre) => genre.name).join(', ');

            animeDiv.innerHTML = `
            <a href="PaginaDeAnime.html">
                <div class="anime-grid">
                    <div class="anime-image">
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    </div>
                    <div class="anime-info">
                        <h3>${anime.title}</h3>
                        <p><strong>Géneros:</strong> ${genres}</p>
                        <p><strong>Tipo:</strong> ${anime.type}</p>
                        <p><strong>Año:</strong> ${anime.year}</p>
                        
                        <p><strong>Episodios:</strong> ${anime.episodes || 'Desconocido'}</p>
                    </div>
                </div>
                </a>
            `;
            animeContainer.appendChild(animeDiv);
        });
    } catch (error) {
        console.error('Error al obtener los animes:', error);
        alert(`Hubo un problema al obtener la información: ${error.message}`);
    }
}

// Cargar animes de temporada al inicio
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayAnimes(); // Cargar temporada actual
});

// Botón de búsqueda
document.getElementById('button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.trim();
    fetchAndDisplayAnimes(searchTerm); // Buscar con el término ingresado
});

// Permitir búsqueda en tiempo real (opcional)
document.getElementById('search-input').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-input').value.trim();
    fetchAndDisplayAnimes(searchTerm);
});

// Permitir buscar con la tecla Enter
document.getElementById('search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = document.getElementById('search-input').value.trim();
        fetchAndDisplayAnimes(searchTerm);
    }
});
