const productosDiv = document.getElementById("productos");
let listaProductos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const productoEncontrado = carrito.find(item => item.id === id);

    if (!productoEncontrado) {
        const producto = listaProductos.find(item => item.id === id); 
        if (producto) {
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
            Swal.fire(`Agregar al carrito: \n ${producto.nombre} $${producto.precio}`);
        }
    } 
}

function actualizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    if (carritoDiv) {
        carritoDiv.innerHTML = "";

        carrito.forEach(producto => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = `
                ${producto.nombre}
                ${producto.precio} pesos <button onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
            `;
            carritoDiv.appendChild(itemDiv);
        });
    }
}

function mostrarProductosFiltrados(productosFiltrados) {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";

    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <img class="img-producto" src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <b>$${producto.precio}</b>
            <button onclick="agregarAlCarrito('${producto.id}')">Agregar al Carrito</button>`;
        productosDiv.appendChild(productoDiv);
    });
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        const productoEliminado = carrito[index];

        Swal.fire({
            title: `¿Estás seguro de eliminar del carrito: \n ${productoEliminado.nombre}?`,
            text: 'Esta acción eliminará el producto del carrito',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
                Swal.fire('¡Eliminado!', '', 'success');
            }
        });
    }
}

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción vaciará el carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarCarrito();
            Swal.fire('¡Carrito vaciado!', '', 'success');
        }
    });
}

function calcularTotalCarrito() {
    const total = carrito.reduce((accumulator, producto) => accumulator + producto.precio, 0);
    Swal.fire(`El total de la compra es de ${total} pesos.`);
}

    const vaciarCarritoButton = document.getElementById("vaciar-carrito");
    const calcularTotalButton = document.getElementById("calcular-total");
    const accesoriosBtn = document.getElementById("accesoriosBtn");
    const bellezaBtn = document.getElementById("bellezaBtn");
    const manicuriaBtn = document.getElementById("manicuriaBtn");

    calcularTotalButton.addEventListener("click", calcularTotalCarrito);
    vaciarCarritoButton.addEventListener("click", vaciarCarrito);
    
fetch("../js/data.json")
.then(response => response.json())
    .then(data => {
        producto = data;
        mostrarProductosFiltrados(producto); 
    });

    accesoriosBtn.addEventListener("click", function() {
        const productosAccesorios = producto.filter(producto => producto.id.startsWith("accesorios"));
        mostrarProductosFiltrados(productosAccesorios);
    });

    bellezaBtn.addEventListener("click", function() {
        const productosBelleza = producto.filter(producto => producto.id.startsWith("belleza"));
        mostrarProductosFiltrados(productosBelleza);
    });

    manicuriaBtn.addEventListener("click", function() {
        const productosManicuria = producto.filter(producto => producto.id.startsWith("manicuria"));
        mostrarProductosFiltrados(productosManicuria);
    });

    actualizarCarrito();


