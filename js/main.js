let producto = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const productoEncontrado = producto.find(producto => producto.id === id);
    carrito.push(productoEncontrado);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    Swal.fire(`Agregar al carrito: \n ${productoEncontrado.nombre} + $${productoEncontrado.precio}`);
}


function eliminarDelCarrito(id) {
    const index = carrito.findIndex(producto => producto.id === id);
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

        localStorage.setItem("carrito", JSON.stringify(carrito));
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
    alert(`El total de la compra es de ${total} pesos.`);
}

document.addEventListener('DOMContentLoaded', function() {
    const productosDiv = document.getElementById("productos");

    fetch(`../js/data.json`)
        .then(response => response.json())
        .then(data => {
            producto = data;
            producto.forEach(producto => {
                const productoDiv = document.createElement("div");
                productoDiv.innerHTML = `
                    <img class="img-producto" src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <b>$${producto.precio}</b>
                    <button onclick="agregarAlCarrito('${producto.id}')">Agregar al Carrito</button>`;
                productosDiv.appendChild(productoDiv);
            });
        });

    const accesoriosImg = document.querySelector('.col:nth-child(1) img');
    const bellezaImg = document.querySelector('.col:nth-child(2) img');
    const manicuriaImg = document.querySelector('.col:nth-child(3) img');
    
        accesoriosImg.addEventListener('click', function() {
            const productosAccesorios = producto.filter(producto => producto.id.startsWith('accesorios'));
            mostrarProductosFiltrados(productosAccesorios);
        });
    
        bellezaImg.addEventListener('click', function() {
            const productosBelleza = producto.filter(producto => producto.id.startsWith('belleza'));
            mostrarProductosFiltrados(productosBelleza);
        });
    
        manicuriaImg.addEventListener('click', function() {
            const productosManicuria = producto.filter(producto => producto.id.startsWith('manicuria'));
            mostrarProductosFiltrados(productosManicuria);
        });
    
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

    const calcularTotalButton = document.getElementById("calcular-total");
    calcularTotalButton.addEventListener("click", calcularTotalCarrito);

    const vaciarCarritoButton = document.getElementById("vaciar-carrito");
    vaciarCarritoButton.addEventListener("click", vaciarCarrito);

    const elemento = document.getElementById("elemento"); 
    elemento.addEventListener('click', function() { 
        
    });

    const carritoDiv = document.getElementById("carrito");
    if (carritoDiv) {
        actualizarCarrito();
    }
});