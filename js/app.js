const tbody = document.getElementById("tbody");

// Función petición: hace la petición al servidor por el método GET
// y obtiene los datos en formato JSON
function peticion() {
    let url = 'https://jsonplaceholder.typicode.com/todos';

    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            mostrarTodos(data);
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}

// Función para mostrar los datos recibidos en la tabla
function mostrarTodos(data) {
    tbody.innerHTML = "";
    data.forEach(todo => {
        const fila = document.createElement("tr");

        const cUser = document.createElement("td");
        cUser.textContent = todo.userId;
        fila.appendChild(cUser);

        const cId = document.createElement("td");
        cId.textContent = todo.id;
        fila.appendChild(cId);

        const cTitle = document.createElement("td");
        cTitle.textContent = todo.title;
        fila.appendChild(cTitle);

        const cCompleted = document.createElement("td");

        if (todo.completed) {
            cCompleted.textContent = "Completado";
        } else {
            cCompleted.textContent = "Pendiente";
        }

        fila.appendChild(cCompleted);
        tbody.appendChild(fila);
    });
}

// Evento: al cargar la página se llama a la función petición
document.addEventListener('DOMContentLoaded', peticion);
