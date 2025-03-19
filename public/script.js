async function agregarPersona() {
    let nombre = document.getElementById("nombre").value;
    let edad = parseInt(document.getElementById("edad").value, 10);
    let nota = parseFloat(document.getElementById("nota").value);

    if (nombre && !isNaN(edad) && !isNaN(nota)) {
        let response = await fetch("/agregar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, nota })
        });

        let data = await response.json();
        if (data.success) {
            obtenerPersonas();
        } else {
            alert(data.message);
        }
    } else {
        alert("Ingrese datos válidos");
    }
}

async function obtenerPersonas() {
    let response = await fetch("/personas");
    if (!response.ok) {
        console.error("Error obteniendo la lista de personas.");
        return;
    }
    let personas = await response.json();
    actualizarLista(personas);
}

async function obtenerPersonasOrdenadas() {
    let response = await fetch("/ordenadas");
    if (!response.ok) {
        console.error("Error obteniendo la lista ordenada.");
        return;
    }
    let personas = await response.json();
    actualizarLista(personas);
}

function actualizarLista(personas) {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    personas.forEach(p => {
        let item = document.createElement("li");
        item.textContent = `Nombre: ${p.nombre}, Edad: ${p.edad}, Nota: ${p.nota}`;
        lista.appendChild(item);
    });
}
