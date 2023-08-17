
document.addEventListener("DOMContentLoaded", () => {
	fetch("./data/stock.json")
		.then((response) => response.json())
		.then((productos) => {
			pintarProductos(productos);
		});
});
document.addEventListener("DOMContentLoaded", cargarCarrito());

//Acá estamos cargando al DOM los eventos para cargar el carrito y la base de datos