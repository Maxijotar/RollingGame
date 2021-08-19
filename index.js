const json = localStorage.getItem('juegos');
let juegos = JSON.parse(json) || [];
const cardsJuegos=document.getElementById('cardsJuegos');

function mostrarJuegos() {
    let filas = [];
    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];
        const card = `
            <div class="main-container">
                <div class="poster-container">
                    <a href="#"><img src="${juego.imagen}" class="poster" /></a>
                </div>
                <div class="ticket-container">
                    <div class="ticket__content">
                        <h4 class="ticket__movie-title">${juego.titulo}</h4>
                        <p class="ticket__movie-slogan">
                        ${juego.descripcion}.
                        </p>
                        <p class="ticket__current-price">${juego.precioDescuento}</p>
                        <p class="ticket__old-price">${juego.precio}</p>
                        <button class="ticket__buy-btn">Buy now</button>
                    </div>
                </div>
            </div>
        `;
        filas.push(card);
    }
    cardsJuegos.innerHTML = filas.join('');
}

mostrarJuegos();
