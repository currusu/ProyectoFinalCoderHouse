const modalContenedor = document.querySelector(".modal-contenedor")
const abrirCarrito = document.getElementById("cesta-carrito")
const cerrarCarrito = document.getElementById("btn-cerrar-carrito")
const modalCarrito = document.querySelector('.modal-carrito');
const compraExitosa = document.getElementById("compraExitosa")

//Estas funciones son las que hacen que nuestros botones funcionen y además se muestran en el DOM
abrirCarrito.addEventListener("click", () => {
    modalContenedor.classList.toggle("modal-active")

});

cerrarCarrito.addEventListener("click", () => {
    modalContenedor.classList.toggle("modal-active")
});

modalContenedor.addEventListener("click", () => {
    cerrarCarrito.click()
});
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductoCarrito(e.target.value)
    }
})

//Esta función es la encargada de realizar la compra en el carrito
compraExitosa.addEventListener("click", () => {
    mostrarMensajeCompraExitosa()
        .then(() => {

            console.log("Mensaje de compra exitosa mostrado");
        })
        .catch((error) => {
            console.error("Error al mostrar el mensaje:", error);
        });
});

//Esta función asincrónica está conectada con el evento de compraExitosa porque maneja el tiempo de espera y a la vez muestra un mensaje de éxito
const mostrarMensajeCompraExitosa = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Bien Hecho!',
                text: 'Su compra ha sido realizada con éxito'
            });
            resolve(); // Resuelve la promesa después de mostrar el mensaje
        }, 2000); // Simula un retraso de 2 segundos antes de mostrar el mensaje
    });

}


