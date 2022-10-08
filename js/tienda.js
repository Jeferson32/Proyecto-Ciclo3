const URL_Productos = "http://localhost:8080/productos"


async function get_productos(URL_Productos) {
	const resp = await fetch(URL_Productos)
	const productos = await resp.json()
	return productos
}


async function main() {
	const productos = await get_productos(URL_Productos)
	mostrar_cel(productos)
}

main()


function mostrar_cel(producto) {
	let cards = ''
	for (let i = 0; i < producto.length; i++) {
		const pro = producto[i]
		cards += `

      <div class="col-md-3 product-men women_two shop-gd ">
									<div class="product-googles-info googles m-2">
										<div class="men-pro-item">
											<div class="men-thumb-item">
												<img class="imgTienda" src="imagenes/${pro.imagen}" class="img-fluid" alt="">
												<div class="men-cart-pro">
													<div class="inner-men-cart-pro">
														<a onclick='set_datos_modal(${JSON.stringify(pro)})' href="single.html" data-toggle="modal" data-target=".detalle" class="link-product-add-cart" data-toggle="modal"data-target="detalle">Ver Detalle</a>
													</div>
												</div>
												<span class="product-new-top">New</span>
											</div>
											<div class="item-info-product">
												<div class="info-product-price">
													<div class="grid_meta">
														<div class="product_price">
															<h4>
																<a id="productoNombre" href="single.html">${pro.nombre}</a>
															</h4>
															<div class="grid-price mt-2">
																<span class="money">$ ${pro.precio.toLocaleString(2)}</span>
															</div>
                                                            <div class="grid-price mt-2">
                                                            <span class="fas fa-shield-alt ">Garantía del producto:1 año</span>
															</div>
														</div>
														<ul class="stars">
															<li>
																<a href="#">
																	<i class="fa fa-star" aria-hidden="true"></i>
																</a>
															</li>
															<li>
																<a href="#">
																	<i class="fa fa-star" aria-hidden="true"></i>
																</a>
															</li>
															<li>
																<a href="#">
																	<i class="fa fa-star" aria-hidden="true"></i>
																</a>
															</li>
															<li>
																<a href="#">
																	<i class="fa fa-star" aria-hidden="true"></i>
																</a>
															</li>
															<li>
																<a href="#">
																	<i class="fa fa-star-half-o" aria-hidden="true"></i>
																</a>
															</li>
														</ul>
													</div>
													<div class="googles single-item hvr-outline-out">
													<form action="#" method="post">
														<input type="hidden" name="cmd" value="_cart">
														<input type="hidden" name="add" value="1">
														<input type="hidden" name="googles_item"
															value="Royal Son Aviator">
														<input type="hidden" name="amount" value="425.00">
														<button type="submit"
															class="googles-cart pgoogles-cart">
															<i class="fas fa-cart-plus"></i>
														</button>
													</form>
												</div>
												</div>
												<div class="clearfix"></div>
											</div>
										</div>
									</div>
									
								</div>

      `
	}
	document.getElementById('carts').innerHTML = cards
}



function set_datos_modal(producto){
	document.getElementById("nombreProducto").textContent=producto.nombre
	document.getElementById("precioProducto").textContent="$"+producto.precio.toLocaleString(2)
	document.getElementById("imgProducto").src="imagenes/"+producto.imagen
	document.getElementById("descripcionCel").textContent=producto.descripcion
}



 




	


