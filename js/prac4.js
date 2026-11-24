const resultado = document.getElementById("resultado");
const mensaje = document.getElementById("mensaje");

// Petición GET de fotos filtradas por albumId
function buscar() {
    let albumId = document.getElementById("albumId").value;

    if (albumId === "") {
        mensaje.textContent = "Captura un Album ID.";
        return;
    }

    mensaje.textContent = "Cargando...";
    let url = 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId;

    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            mostrarFotos(data);
        })
        .catch(error => {
            mensaje.textContent = "Error al consultar el servicio web.";
            console.error("Error al obtener los datos:", error);
        });
}

// Muestra id, albumId, title y la imagen (url) de cada foto
function mostrarFotos(data) {
    resultado.innerHTML = "";

    if (data.length === 0) {
        mensaje.textContent = "No se encontraron fotografías para ese álbum.";
        return;
    }
    mensaje.textContent = "Se encontraron " + data.length + " fotografías.";

    data.forEach(foto => {
        const col = document.createElement("div");
        col.className = "col-md-6";

        const card = document.createElement("div");
        card.className = "card shadow-sm h-100 flex-row align-items-center p-2";

        const img = document.createElement("img");
        img.src = foto.url;
        img.alt = foto.title;
        img.width = 100;
        img.height = 100;
        img.className = "rounded me-3";
        // Si la imagen de placeholder no carga, se usa un servicio alterno con el mismo color
        img.onerror = function () {
            const color = foto.url.split("/").pop();
            this.onerror = null;
            this.src = "https://placehold.co/150/" + color + "/white?text=" + foto.id;
        };

        const cuerpo = document.createElement("div");

        const titulo = document.createElement("h5");
        titulo.textContent = "Foto " + foto.id;

        const ids = document.createElement("p");
        ids.className = "text-muted mb-1 small";
        ids.textContent = "Album ID: " + foto.albumId + " · Foto ID: " + foto.id;

        const texto = document.createElement("p");
        texto.className = "mb-0";
        texto.textContent = foto.title;

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(ids);
        cuerpo.appendChild(texto);

        card.appendChild(img);
        card.appendChild(cuerpo);
        col.appendChild(card);
        resultado.appendChild(col);
    });
}

// Permite buscar presionando Enter
document.getElementById("albumId").addEventListener("keyup", function (e) {
    if (e.key === "Enter") buscar();
});
