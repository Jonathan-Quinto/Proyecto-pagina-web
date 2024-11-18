// Función para obtener noticias y un video desde Jikan API
async function fetchAnimeNewsAndTrailer() {
  try {
    const animeId = 1; // ID del anime (por ejemplo, Cowboy Bebop)
    const newsResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/news`);
    const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    
    const newsData = await newsResponse.json();
    const animeData = await animeResponse.json();

    const newsContainer = document.getElementById("newsContainer");

    // 1. Mostrar el trailer del anime
    const trailer = animeData.data.trailer.embed_url;
    if (trailer) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("card");

      const iframe = document.createElement("iframe");
      iframe.src = trailer;
      iframe.width = "100%";
      iframe.height = "300px";
      iframe.allowFullscreen = true;

      const videoTitle = document.createElement("h3");
      videoTitle.textContent = "Trailer Oficial";

      videoCard.appendChild(iframe);
      videoCard.appendChild(videoTitle);
      newsContainer.appendChild(videoCard);
    }

    // 2. Mostrar 2 artículos de noticias
    newsData.data.slice(0, 2).forEach((newsItem) => {
      const articleCard = document.createElement("div");
      articleCard.classList.add("card");

      const articleImg = document.createElement("img");
      articleImg.src = newsItem.images.jpg.image_url;
      articleImg.alt = newsItem.title;

      const articleContent = document.createElement("div");
      articleContent.classList.add("card-content");

      const articleTitle = document.createElement("h3");
      articleTitle.textContent = newsItem.title;

      const articleLink = document.createElement("a");
      articleLink.href = newsItem.url;
      articleLink.target = "_blank"; // Abrir en una nueva pestaña
      articleLink.textContent = "Ver Articulo";

      articleContent.appendChild(articleTitle);
      articleContent.appendChild(articleLink);
      articleCard.appendChild(articleImg);
      articleCard.appendChild(articleContent);
      newsContainer.appendChild(articleCard);
    });
  } catch (error) {
    console.error("Error fetching anime news or trailer:", error);
  }
}

// Llamamos a la función al cargar la página
fetchAnimeNewsAndTrailer();
