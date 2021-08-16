function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}


// boton modal login //

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// CRUD agregar juegos en local store//

const games = JSON.parse(localStorage.getItem("games")) || [];

const img = document.getElementById("img-card");
const titulo = document.getElementById("title-card");
const subTitulo = document.getElementById("sub-card");
const price1 = document.getElementById("price1");
const price2 = document.getElementById("price2");


function agregarJuego(event) {
    event.preventDefault();
    console.log("entrolafuncion")
    const nuevoJuego = {
        img: img.value,
        title: titulo.value,
        sub: subTitulo.value,
        price1: price1.value,
        price2: price2.value,
    }

    games.push(nuevoJuego)
    localStorage.setItem("games", JSON.stringify(games))
    listarTabla();


}

// funcion listar en tabla //

function listarTabla() {

    const tbody = document.getElementById("tbody")
    tbody.innerHTML = "";
    games.forEach((game, index) => {
        tbody.innerHTML += `
        <tr>
            <th scope="row">${index}</th>
            <td>${game.img}</td>
            <td>${game.title}</td>
            <td>${game.sub}</td>
            <td>${game.price1}</td>
            <td>${game.price2}</td>
        </tr>             
        `
    });
}

listarTabla();
