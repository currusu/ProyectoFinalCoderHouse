const modalContenedor = document.querySelector(".modal-contenedor")
const abrirCarrito = document.getElementById("cesta-carrito")
const cerrarCarrito = document.getElementById("btn-cerrar-carrito")
const modalCarrito = document.querySelector('.modal-carrito');
const compraExitosa = document.getElementById("compraExitosa")
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');


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
    if (carrito.length > 0) {
        mostrarMensajeCompraExitosa()
            .then(() => {
            })
            .catch((error) => {
                // Manejar errores que ocurran en la promesa
            });
    } else if (carrito.length === 0) {
        mostrarMensajeCompraNoExitosa()
        .then(()=>{
        })
    }
});


//Esta función asincrónica está conectada con el evento de compraExitosa porque maneja el tiempo de espera y a la vez muestra un mensaje de éxito
const mostrarMensajeCompraExitosa = async () => {
    await new Promise((resolve) => {
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

const mostrarMensajeCompraNoExitosa = async () => {
    await new Promise((resolve) => {
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes cargar al menos un producto en el carrito para realizar la compra.',
            });
            resolve(); // Resuelve la promesa después de mostrar el mensaje
        }, 2000); // Simula un retraso de 2 segundos antes de mostrar el mensaje
    });

}





//Esta función crea el evento para vaciar carrito

btnVaciarCarrito.addEventListener('click', () => {
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            swal.fire({
                title: "¿Está seguro de que quiere vaciar el carrito?",
                icon: "warning",
                buttons: ["Cancelar", "Vaciar"],
                dangerMode: true,
              }).then((willVaciar) => {
                if (willVaciar.isConfirmed) {
                  // Vaciar el carrito y actualizar la interfaz
                  carrito = [];
                  pintarCarrito(carrito);
                  actualizarTotalesCarrito(carrito);
                  localStorage.removeItem('carrito'); // Limpiar el almacenamiento local también
                }
              });
                 resolve();
            },2000);

            });
    });
    
  
  