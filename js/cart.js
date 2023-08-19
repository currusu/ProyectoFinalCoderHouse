
let carrito = []

//En este array estamos creando las funcionalidades de nuestro carrito

//Esta invocación de producto contenedor hace referencia a la escucha(lectura)del evento click. Un evento es la acción que el usuario realiza

const productoContenedor = document.getElementById("producto-contenedor");

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id);
         
    }

})
//Esta función hace referencia a que si el producto NO está repetido (!estaRepetido)lo encuentre con la función de órden superior find y haga un push (mostrar)
//La función de else es por si el prodcuto está repetido que solo aumente la cantidad
//También se agregó un fetch que se encargá de buscar los datos y transformarlos en el formato legible json y después los muestra.
//Después de traer los datos los buscamos por id y los mostramos con push en el carrito

const validarProductoEnCarrito = (id) => {
	const estaRepetido = carrito.some((producto) => producto.id == id);
	if (!estaRepetido) {
		fetch("./data/stock.json")
			.then((response) => response.json())
			.then((productos) => {
				const producto = productos.find((producto) => producto.id == id);
				carrito.push(producto);
				pintarProductoCarrito(producto);
				actualizarTotalesCarrito(carrito);
			});
	} else {
		const producto = carrito.find((producto) => producto.id == id);
		producto.cantidad++;
		pintarCarrito(carrito);
		actualizarTotalesCarrito(carrito);
	}
};

//Esta función hace que cada vez que el usuario apoya el mouse arriba del botón carrito de cada producto este lo marque.
//El inner HtMl hace que está acción sea renderizada en la vista de la página
//Appenchild hace que se guarde la función

const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById("carrito-contenedor")
    const div = document.createElement("div")
    div.classList.add('productoEnCarrito')

    div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad ${producto.id}>Cantidad ${producto.cantidad}</p> 
    <button class="btn waves-effect waves-ligh boton-eliminar"value="">X</${producto.id}button>
    `
    contenedor.appendChild(div)

}
//Esta función agarra el carrito, muestra en el DOM el contenedor y recorre mediante un bucle for each cada producto y mediante un div(son los que dividen la lógica de las páginas web) se agregan al carrito.
//Después con el innerHTML se renderiza lo anterior en la vista principal de la página
//Appenchild  guarda la información en el contenedor

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor')

    contenedor.innerHTML = ''

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>$ ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
      `
        contenedor.appendChild(div)
        
    });
}


//Este método es para eliminar productos. El método find sirve para encontrar lo que se quiere eliminar 
//Las funciones pegar y actualizar carrito están porque son necesarias para que eliminar funcione también

const eliminarProductoCarrito = (id) => {
    const productoIndex = carrito.findIndex(producto => producto.id == id)
    carrito.splice(productoIndex, 1)
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
}

//Esta función define la cantidad y multiplica el precio según la cantidad

const actualizarTotalesCarrito = (carrito) => {
    const totalCompra = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const totalCantidad = carrito.reduce((acc, item) => acc + (item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};



//Esta función muestra en el DOM la cantidad de productos y el precio total. Inner text lo muestra en la vista

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
}



//Esta función guarda un set (clave unica) de carrito y después lo guarda en el contenedor local del usuario. Este solo recibe cadenas de texto entonces gracias a JSON lo utilizamos. Esto sirve para que la información de las acciones que realiza el usuario se guarde de forma permanente y este no la pierda en caso que salga de la página y entre en otro momento. Es importnate NO guardar información confidencial en local storage ya que esta solo se elimina de forma manual.

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Esta función obtiene todo lo del carrito y con el método parse se convirtió de string a un objeto JS (recordemos que local storage solo recibe cadenas de texto)
//Si este existe se guardará, si no será null

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    return carritoStorage
}




//Esta función guarda todo lo anterior

const cargarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage()
        pintarCarrito(carrito)
        actualizarTotalesCarrito(carrito)
    }

}