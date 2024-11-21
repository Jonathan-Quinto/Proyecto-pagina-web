async function fetchAndDisplayAnimes(searchTerm = '', endpoint = 'characters') {
    try {
        // Construir la URL
        const url = searchTerm
            ? `https://api.jikan.moe/v4/characters?q=${searchTerm}&limit=10`
            : `https://api.jikan.moe/v4/${endpoint}?sfw`;

        const response = await fetch(url);



        const data = await response.json();
        const animeContainer = document.getElementById('anime-container');
        animeContainer.innerHTML = ''; // Limpiar contenedor

        // Validar si hay resultados
        const characters = data.data || [];
        if (characters.length === 0) {
            animeContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        // Mostrar resultados
        characters.forEach((character) => {
            const maxLength = 100; // Límite de caracteres
            const description = character.about
                ? character.about.length > maxLength
                    ? character.about.substring(0, maxLength) + '...'
                    : character.about
                : 'Mira papi, a este ni descripcion le pusieron, lo quieren menos que a ti';
        
            const animeDiv = document.createElement('div');
            animeDiv.classList.add('anime-item');
        
            animeDiv.innerHTML = `
                <a href="PaginaDeAnime.html">
                    <div class="anime-grid">
                        <div class="anime-image">
                            <img src="${character.images.jpg.image_url}" alt="${character.name}">
                        </div>
                        <div class="anime-info">
                            <h3>${character.name}</h3>
                            <h2>${character.name_kanji || "No tiene, que locura"}</h2>
                            <p><strong>NickNames:</strong> ${character.nicknames}</p>
                            <p><strong>Descripción:</strong> ${description}</p>
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

// Cargar Personajes al inicio
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayAnimes(''); // Cambiar por algo predeterminado
});

// Permitir búsqueda en tiempo real
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
