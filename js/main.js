let productos = [];
let carrito = [];

fetch("../js/data.json")
.then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos); 
    });

function mostrarProductos(productosFiltrados) {
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
function agregarAlCarrito(id) {
    const productoEncontrado = carrito.find(item => item.id === id);
    const producto = productos.find(item => item.id === id); 

    if (producto && !productoEncontrado) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductosEnCarrito();
        Swal.fire({
            title: `¡Agregado al carrito!`,
            text: `Agregar al carrito \n ${producto.nombre} $${producto.precio}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
}

    const accesoriosBtn = document.getElementById("accesoriosBtn");
    const bellezaBtn = document.getElementById("bellezaBtn");
    const manicuriaBtn = document.getElementById("manicuriaBtn");

    accesoriosBtn.addEventListener("click", function() {
    const productosAccesorios = productos.filter(producto => producto.id.startsWith("accesorios"));
        mostrarProductos(productosAccesorios);
    });

    bellezaBtn.addEventListener("click", function() {
        const productosBelleza = productos.filter(producto => producto.id.startsWith("belleza"));
        mostrarProductos(productosBelleza);
    });

    manicuriaBtn.addEventListener("click", function() {
        const productosManicuria = productos.filter(producto => producto.id.startsWith("manicuria"));
        mostrarProductos(productosManicuria);
    });



