document.addEventListener("DOMContentLoaded", () => {
    const participantes = [{
            nombre: "Einer Mosquera",
            cedula: "8-924-1880",
            carrera: "Licenciatura en desarrollo y Gestion de Software",
            experiencia: "Mi experiencia como desarrollador se limita a tecnologías aprendidas durante la carrera.",
            imagen: "IMG/Einer.jpg"
        },
        {
            nombre: "Jonathan Quinto",
            cedula: "8-1007-1971.",
            carrera: "Licenciatura en desarrollo y Gestion de Software",
            experiencia: "No tengo mucha experiencia como desarrollador, pero estoy considerando especializarme en el área de desarrollo web, específicamente en el backend. Siento que, en cuanto a creatividad, el frontend no es mi punto fuerte, aunque me esforzaré por mejorar en ambas áreas.",
            imagen: "IMG/The nigga.jpg"
        },
        {
            nombre: "Crhistopher Perez",
            cedula: "8-996-1265",
            carrera: "Licenciatura en desarrollo y Gestion de Software",
            experiencia: "No he tenido tanta experiencia, pero si he visto lenguajes como java, c#, con usted ahora los de desarrollo web (html, CSS, JavaScript) y sinceramente me interesa bastante el lado de bases de datos, me gusta bastante ese tema.",
            imagen: "IMG/Chris.jpg"
        },
        {
            nombre: "Joseph Urriola",
            cedula: "8-1022-954",
            carrera: "Licenciatura en desarrollo y Gestion de Software",
            experiencia: "No he tenido demasiada experiencia en desarrollo pero lo poco que he hecho, han sido programas básicos con java, conectando java a una base de datos y no mucho más..",
            imagen: "IMG/Joseph.jpg"
        }
    ];

    const newsContainer = document.getElementById("newsContainer");

    participantes.forEach((participante) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = participante.imagen;
        imagen.alt = participante.nombre;

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const nombre = document.createElement("h3");
        nombre.textContent = participante.nombre;

        const cedula = document.createElement("p");
        cedula.textContent = `Cedula: ${participante.cedula}`;

        const carrera = document.createElement("p");
        carrera.textContent = `Carrera: ${participante.carrera}`;

        const experiencia = document.createElement("p");
        experiencia.textContent = `Experiencia: ${participante.experiencia} `;

        cardContent.appendChild(nombre);
        cardContent.appendChild(cedula);
        cardContent.appendChild(carrera);
        cardContent.appendChild(experiencia);

        card.appendChild(imagen);
        card.appendChild(cardContent);

        newsContainer.appendChild(card);
    });
});

