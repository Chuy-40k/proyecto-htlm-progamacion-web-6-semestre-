
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* FUNCIÓN: AGREGAR PRODUCTOS */
function agregarAlCarrito(nombre, precio) {
    const producto = { nombre: nombre, precio: precio };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("¡" + nombre + " agregado al carrito!");
}


/* VALIDAR EMAIL */
function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/* --- VALIDAR FORMULARIO --- */
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre === "" || mensaje === "") {
        alert("Por favor, llena todos los campos.");
        return;
    }

    if (!validarEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    alert("Gracias " + nombre + ". Tu mensaje ha sido enviado.");
}

/* --- CARGAR CARRITO  --- */
function mostrarCarrito() {
    const lista = document.getElementById('lista-carrito');
    if (!lista) return;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        lista.innerHTML = "";
        carrito.forEach((prod, index) => {
            lista.innerHTML += "<p>" + (index + 1) + ". " + prod.nombre + " - $" + prod.precio + "</p>";
        });
    }
}

/* --- FINALIZAR COMPRA --- */
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("No hay nada que comprar.");
    } else {
        alert("Compra enviada a revisión. ¡Gracias!");
        carrito = [];
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
}

function buscarProducto() {
    // Obtenemos lo que el usuario escribio
    let busqueda = document.getElementById('inputBuscador').value.toLowerCase();
    
    // Obtenemos todas las tarjetas de productos
    let productos = document.getElementsByClassName('producto-card');
    let encontrado = false;

    //Recorremos cada tarjeta
    for (let i = 0; i < productos.length; i++) {
        // Obtenemos el nombre del producto (el texto dentro del h3)
        let nombreProducto = productos[i].getElementsByTagName('h3')[0].innerText.toLowerCase();

        //Si el nombre contiene lo que buscamos, lo mostramos si no se oculta
        if (nombreProducto.includes(busqueda)) {
            productos[i].style.display = "block";
            encontrado = true;
        } else {
            productos[i].style.display = "none";
        }
    }

    // Si no se escribió nada aparece todo de nuevo
    if (busqueda === "") {
        for (let i = 0; i < productos.length; i++) {
            productos[i].style.display = "block";
        }
    }

    // Alerta si no se encontro nada
    if (!encontrado && busqueda !== "") {
        Swal.fire({
            title: 'No encontrado',
            text: 'No tenemos la pieza "' + busqueda + '" en este momento.',
            icon: 'error',
            confirmButtonColor: '#ff4444'
        });
    }
}