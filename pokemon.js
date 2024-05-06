let pokemonList = [];
let equiposPokemon = [];

function searchPokemon() {
    let pokemonName = document.getElementById("pokemonNameInput").value.toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then(response => response.json())
        .then(data => {
            let pokemonInfo = {
                name: data.name,
                id: data.id,
                types: data.types.map(type => type.type.name),
                image: data.sprites.front_default
            };

            pokemonList.push(pokemonInfo);
            actualizarLista();

            document.getElementById("pokemonNameInput").value = "";

            if (equiposPokemon.length >= 3 && equiposPokemon[equiposPokemon.length - 1].length >= 3) {
                alert("Se han formado 3 equipos de Pokémon. Por favor, cree otro equipo.");
            }
        })
        .catch(error => {
            console.error("Error al buscar el Pokémon:", error);
            alert("No se encontró el Pokémon. Por favor, ingrese un nombre o id válido.");
        });
}

function agregarPokemon() {
    if (equiposPokemon.length === 0 || equiposPokemon[equiposPokemon.length - 1].length >= 3) {
        alert("Por favor, cree un nuevo equipo antes de agregar un Pokémon.");
        return;
    }

    let pokemonName = document.getElementById("pokemonNameInput").value.toLowerCase();

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then(response => response.json())
        .then(data => {
            let pokemonInfo = {
                name: data.name,
                id: data.id,
                types: data.types.map(type => type.type.name),
                image: data.sprites.front_default
            };

            pokemonList.push(pokemonInfo);
            equiposPokemon[equiposPokemon.length - 1].push(pokemonInfo);
            actualizarLista();

            document.getElementById("pokemonNameInput").value = "";

            if (equiposPokemon.length >= 3 && equiposPokemon[equiposPokemon.length - 1].length >= 3) {
                alert("Se han formado 3 equipos de Pokémon. Por favor, cree otro equipo.");
            }
        })
        .catch(error => {
            console.error("Error al buscar el Pokémon:", error);
            alert("No se encontró el Pokémon. Por favor, ingrese un nombre o id válido.");
        });
}

function limpiarPagina() {
    document.getElementById("pokemonInfo").innerHTML = "";
    document.getElementById("pokemonImage").innerHTML = "";
    document.getElementById("pokemonList").innerHTML = "";
    document.getElementById("historial").innerHTML = "";
}


function limpiarListaPokemon() {
    pokemonList = [];
    actualizarLista();
}


function actualizarLista() {
    let pokemonListElement = document.getElementById("pokemonList");
    pokemonListElement.innerHTML = "";

    pokemonList.forEach(pokemonInfo => {
        let listItem = document.createElement("div");
        listItem.innerHTML = `
            <p>Nombre: ${pokemonInfo.name}</p>
            <p>ID: ${pokemonInfo.id}</p>
            <p>Tipo: ${pokemonInfo.types.join(", ")}</p>
            <img src="${pokemonInfo.image}" alt="Imagen del Pokémon">
        `;
        pokemonListElement.appendChild(listItem);
    });
}

function crearNuevoEquipo() {
    if (equiposPokemon.length >= 3) {
        alert("Se han formado 3 equipos de Pokémon. No se puede crear otro equipo.");
        return;
    }
    

    limpiarHistorial();

    equiposPokemon.push([]);
    limpiarListaPokemon();
    alert("Se ha creado un nuevo equipo de Pokémon.");
}

function limpiarHistorial() {
    let historialElement = document.getElementById("historial");
    historialElement.innerHTML = "";
}

function verHistorial() {
    let historialElement = document.getElementById("historial");
    historialElement.innerHTML = ""; // Limpiar contenido anterior antes de mostrar el historial

    equiposPokemon.forEach((equipo, index) => {
        let equipoElement = document.createElement("div");
        equipoElement.innerHTML = `<h3>Equipo ${index + 1}</h3>`;

        equipo.forEach(pokemon => {
            let pokemonElement = document.createElement("div");
            pokemonElement.innerHTML = `
                <p>Nombre: ${pokemon.name}</p>
                <p>ID: ${pokemon.id}</p>
                <p>Tipo: ${pokemon.types.join(", ")}</p>
                <img src="${pokemon.image}" alt="Imagen del Pokémon">
            `;
            equipoElement.appendChild(pokemonElement);
        });

        historialElement.appendChild(equipoElement);
    });
}