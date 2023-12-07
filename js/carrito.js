let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductosEnCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    carrito.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.innerHTML = `
            <p>${producto.nombre}</p>
            <p>${producto.precio}</p>
        `;
        
        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'Eliminar';
        eliminarBtn.addEventListener('click', () => eliminarDelCarrito(producto.id));
        
        productoElement.appendChild(eliminarBtn);
        carritoContainer.appendChild(productoElement);
    });
}
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        const productoEliminado = carrito[index];

        Swal.fire({
            title: `¿Estás seguro de eliminar \n ${productoEliminado.nombre}?`,
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
                mostrarProductosEnCarrito();
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
            mostrarProductosEnCarrito();
            Swal.fire('¡Carrito vaciado!', '', 'success');
        }
    });
}
function calcularTotalCarrito() {
    const total = carrito.reduce((accumulator, producto) => accumulator + producto.precio, 0);
    Swal.fire(`El total de la compra es de ${total} pesos.`);
}

    const calcularTotalButton = document.getElementById("calcular-total");
    const vaciarCarritoButton = document.getElementById("vaciar-carrito");

    calcularTotalButton.addEventListener("click", calcularTotalCarrito);
    vaciarCarritoButton.addEventListener("click", vaciarCarrito);

    mostrarProductosEnCarrito();
