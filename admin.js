//variables formulario agregar
const titulo=document.getElementById('titulo');
const descripcion=document.getElementById('descripcion');
const categoria=document.getElementById('categoria');
const precio=document.getElementById('precio');
const precioDescuento=document.getElementById('precioDescuento');
const imagen=document.getElementById('imagen');
const agregarJuego=document.getElementById('form-agregar');
//variables formulario editar
const tituloEditar=document.getElementById('tituloEditar');
const descripcionEditar=document.getElementById('descripcionEditar');
const categoriaEditar=document.getElementById('categoriaEditar');
const imagenEditar=document.getElementById('imagenEditar');
const precioEditar=document.getElementById('precioEditar');
const precioDescuentoEditar=document.getElementById('precioDescuentoEditar');
const editarJuego=document.getElementById('formularioEditar')
const tabla=document.getElementById('tabla');
const json = localStorage.getItem('juegos');
let juegos = JSON.parse(json) || [];
let notaId = '';

function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

agregarJuego.onsubmit = function (e) {
    e.preventDefault();
    console.log('entro')
    const juego = {
        id: generarID(),
        titulo: titulo.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        precio: precio.value,
        precioDescuento: precioDescuento.value,
        imagen: imagen.value,
    };
    juegos.push(juego);
    const json = JSON.stringify(juegos);
    localStorage.setItem('juegos', json); 
    mostrarJuegos();
    console.log("Usuario Registrado");
    agregarJuego.reset(); 
};

//AGREGAR TABLA

function mostrarJuegos() {
    let filas = [];
    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];
        const tr = `
            <tr>
                <td>${juego.titulo}</td>
                <td>${juego.descripcion}</td>
                <td>${juego.categoria}</td>
                <td>${juego.precio}</td>
                <td>${juego.precioDescuento}</td>
                <td><img src="${juego.imagen}" class="w-25"></td>
                <td>
                    <button onclick="mostrarDetalle('${juego.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver detalle</button>
                    <button onclick="cargarModalEditar('${juego.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
                    data-bs-target="#modalEditar">Editar</button>
                    <button onclick="eliminarJuego('${juego.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        `;
        filas.push(tr);
    }
    tabla.innerHTML = filas.join('');
}

mostrarJuegos();

function eliminarJuego(id) {


    let notasFiltradas = [];
    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];
        const coincideId = juego.id === id;
        if (!coincideId) {
            notasFiltradas.push(juego);
        }
    }
    const json = JSON.stringify(notasFiltradas);
    localStorage.setItem('juegos', json);
    juegos = notasFiltradas;
    console.log("Usuario Eliminado 🚫");
    mostrarJuegos();
}

function mostrarDetalle(id) {
    const juegoEncontrado = juegos.find((juego) => juego.id === id);
    const detalleDiv = document.getElementById('detalleNota');
    const detallesNota = `
        <p>Titulo: ${juegoEncontrado.titulo}</p>
        <p>descripcion: ${juegoEncontrado.descripcion}</p>
        <p>Categoria: ${juegoEncontrado.categoria}</p>
        <p>Imagen: <img src="${juegoEncontrado.imagen}" class="w-50"></p>
        <p>Precio: ${juegoEncontrado.precio}</p>
        <p>Precio con Descuento: ${juegoEncontrado.precioDescuento}</p>
    `;
    detalleDiv.innerHTML = detallesNota;
}

function cargarModalEditar(id) {
    const juegoEncontrado = juegos.find((juego) => juego.id === id);
    tituloEditar.value = juegoEncontrado.titulo;
    descripcionEditar.value = juegoEncontrado.descripcion;
    imagenEditar.value = juegoEncontrado.imagen;
    precioEditar.value = juegoEncontrado.precio;
    precioDescuentoEditar.value = juegoEncontrado.precioDescuento;
    notaId = juegoEncontrado.id;
}

//EDITAR

editarJuego.onsubmit = function (e) {
    e.preventDefault();

    const juegosModificados = juegos.map((juego) => {

        if (juego.id === notaId) {
            
            const notaModificada = {
                ...juego,
                titulo: tituloEditar.value,
                descripcion: descripcionEditar.value,
                imagen: imagenEditar.value,
                precio: precioEditar.value,
                precioDescuento: precioDescuentoEditar.value,
            };
            return notaModificada;
        } else {
            return juego;
        }
    });

    const json = JSON.stringify(juegosModificados);
    localStorage.setItem('juegos', json);
    juegos = juegosModificados;
    console.log("Se modificó exitosamente un usuario. 👨‍💻");
    mostrarJuegos();

    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};

var numbers = [1, 4, 9];
