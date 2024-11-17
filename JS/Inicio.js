// Función para obtener las noticias desde Jikan API
async function fetchAnimeNews() {
    try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await response.json();
  
      // Seleccionamos el contenedor donde añadiremos las tarjetas de noticias
      const newsContainer = document.getElementById("newsContainer");
  
      data.data.slice(0, 4).forEach((newsItem, index) => {
        // Creamos la estructura de cada tarjeta
        const card = document.createElement("div");
        card.classList.add("card");
  
        const img = document.createElement("img");
        img.src = newsItem.images.jpg.large_image_url;
        img.alt = `Anime ${index + 1}`;
  
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
  
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = newsItem.title;
  
        
  
        // Añadimos los elementos a la tarjeta
        cardContent.appendChild(title);
        card.appendChild(img);
        card.appendChild(cardContent);
        newsContainer.appendChild(card);
  
        // Agregamos el efecto de expansión en hover usando CSS ya definido
      });
    } catch (error) {
      console.error("Error fetching anime news:", error);
    }
  }
  
  // Llamamos a la función para obtener las noticias cuando la página carga
  fetchAnimeNews();
  