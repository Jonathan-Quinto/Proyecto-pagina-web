// Función para obtener y mostrar OVAs
async function fetchAndDisplayAnimes(searchTerm = '') {
    try {
        const response = await fetch('https://api.jikan.moe/v4/schedules/wednesday?sfw');
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        // Limpiar el contenedor de animes
        const animeContainer = document.getElementById('anime-container');
        animeContainer.innerHTML = '';

        // Filtrar y llenar el contenedor con los animes
        const filteredAnimes = data.data.filter(anime => 
            anime.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        for (const anime of filteredAnimes) {
            const animeDiv = document.createElement('div');
            animeDiv.classList.add('anime-item');

            // Obtener y traducir la sinopsis a español (simulación)

            // Obtener géneros y formatearlos
            const genres = anime.genres.map(genre => genre.name).join(', ');

            animeDiv.innerHTML = `
                <div class="anime-grid">
                    <div class="anime-image">
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    </div>
                    <span>
                    <div class="anime-info">
                        <p id="generos"><strong>Géneros:</strong>
                        <div id="generitos">${genres}</div>
                        </p>
                        <h3>${anime.title}</h3>
                    </div>
                </div>
                </span>
            `;
            animeContainer.appendChild(animeDiv);
        }
        
        // Si no hay resultados, mostrar un mensaje
        if (filteredAnimes.length === 0) {
            animeContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error("Error al obtener los animes:", error);
        alert(`Hubo un problema al obtener la información: ${error.message}`);
    }
}

// Cargar todos los OVAs al inicio
fetchAndDisplayAnimes();

// Escuchar eventos del botón de búsqueda
document.getElementById('button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    fetchAndDisplayAnimes(searchTerm);
});

// Manejar el evento de entrada en el campo de búsqueda para búsqueda en tiempo real (opcional)
document.getElementById('search-input').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-input').value;
    fetchAndDisplayAnimes(searchTerm);
});

// Función simulada de traducción
