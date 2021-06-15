<!--=====================================
BREADCRUMB CARRITO DE COMPRAS
======================================-->

<div class="container-fluid well well-sm">
	
	<div class="container">
		
		<div class="row">
			
			<ul class="breadcrumb fondoBreadcrumb text-uppercase">
				
				<li><a href="<?php echo $url;?>">CARRITO DE COMPRAS</a></li>
				<li class="active pagActiva"><?php echo $rutas[0] ?></li>

			</ul>

		</div>

	</div>

</div>

<!--=====================================
TABLA CARRITO DE COMPRAS
======================================-->

<div class="container-fluid">

	<div class="container">

		<div class="panel panel-default">
		
			<!--=====================================
			CABECERA CARRITO DE COMPRAS
			======================================-->

			<div class="panel-heading cabeceraCarrito">

				<div class="col-md-6 col-sm-7 col-xs-12 text-center">

					<h3>
						<small>PRODUCTO</small>
					</h3>

				</div>

				<div class="col-md-2 col-sm-1 col-xs-0 text-center">

					<h3>
						<small>PRECIO</small>
					</h3>

				</div>

				<div class="col-sm-2 col-xs-0 text-center">

					<h3>
						<small>CANTIDAD</small>
					</h3>

				</div>

				<div class="col-sm-2 col-xs-0 text-center">

					<h3>
						<small>SUB-TOTAL</small>
					</h3>

				</div>

			</div>

			<!--=====================================
			CUERPO DEL CARRITO DE COMPRAS
			======================================-->

			<div class="panel-body cuerpoCarrito">

				<!-- item 1 -->
			
				<div class="row itemCarrito">

					<div class="col-sm-1 col-xs-12">
					
						<br>

						<center>
						
							<button class="btn btn-default backColor">
							
								<i class="fa fa-times"></i>
							
							</button>
						
						</center>
					
					</div>

					<div class="col-sm-1 col-xs-12">

						<figure>

							<img src="http://localhost/ecommerce/backend/vistas/img/productos/cursos/curso02.jpg" class="img-thumbnail">
						
						</figure>

					</div>

					<div class="col-sm-4 col-xs-12">

						<br>

						<p class="tituloCarritoCompra text-left">Aprende Javascript desde Cero</p>

					</div>

					<div class="col-md-2 col-sm-1 col-xs-12">

						<br>

						<p class="precioCarritoCompra text-center">USD $ <span>119</span></p>

					</div>

					<div class="col-md-2 col-sm-3 col-xs-8">

						<br>

						<div class="col-xs-8">

							<center>

								<input type="number" class="form-control text-center" min="1" value="1" readonly>

							</center>
							
						</div>						

					</div>

					<div class="col-md-2 col-sm-1 col-xs-4 text-center">

						<br>

						<p>

							<strong>USD $ <span>77</span></strong>
						
						</p>

					</div>

				</div>

				<div class="clearfix"></div>

				<hr>

				<!-- item 2 -->

				<div class="row itemCarrito">

					<div class="col-sm-1 col-xs-12">
					
						<br>

						<center>
						
							<button class="btn btn-default backColor">
							
								<i class="fa fa-times"></i>
							
							</button>
						
						</center>
					
					</div>

					<div class="col-sm-1 col-xs-12">

						<figure>

							<img src="http://localhost/ecommerce/backend/vistas/img/productos/tecnologia/tecnologia06.jpg" class="img-thumbnail">
						
						</figure>

					</div>

					<div class="col-sm-4 col-xs-12">

						<br>

						<p class="tituloCarritoCompra text-left">Super Equipo de Sonido para dejar Sordo a todo el mundo</p>

					</div>

					<div class="col-md-2 col-sm-1 col-xs-12">

						<br>

						<p class="precioCarritoCompra text-center">USD $ <span>1.077</span></p>

					</div>

					<div class="col-md-2 col-sm-3 col-xs-8">

						<br>

						<div class="col-xs-8">

							<center>

								<input type="number" class="form-control text-center" min="1" value="1">

							</center>
							
						</div>						

					</div>

					<div class="col-md-2 col-sm-1 col-xs-4 text-center">

						<br>

						<p>

							<strong>USD $ <span>900</span></strong>
						
						</p>

					</div>

				</div>

				<div class="clearfix"></div>

				<hr>

				<!-- item 3 -->

				<div class="row itemCarrito">

					<div class="col-sm-1 col-xs-12">
					
						<br>

						<center>
						
							<button class="btn btn-default backColor">
							
								<i class="fa fa-times"></i>
							
							</button>
						
						</center>
					
					</div>

					<div class="col-sm-1 col-xs-12">

						<figure>

							<img src="http://localhost/ecommerce/backend/vistas/img/productos/tecnologia/tecnologia02.jpg" class="img-thumbnail">
						
						</figure>

					</div>

					<div class="col-sm-4 col-xs-12">

						<br>

						<p class="tituloCarritoCompra text-left">Samsung S1000</p>

					</div>

					<div class="col-md-2 col-sm-1 col-xs-12">

						<br>

						<p class="precioCarritoCompra text-center">USD $ <span>3.527</span></p>

					</div>

					<div class="col-md-2 col-sm-3 col-xs-8">

						<br>

						<div class="col-xs-8">

							<center>

								<input type="number" class="form-control text-center" min="1" value="1">

							</center>
							
						</div>						

					</div>

					<div class="col-md-2 col-sm-1 col-xs-4 text-center">

						<br>

						<p>

							<strong>USD $ <span>2.500</span></strong>
						
						</p>

					</div>

				</div>

				<div class="clearfix"></div>

				<hr>

			</div>

			<!--=====================================
			SUMA DEL TOTAL DE PRODUCTOS
			======================================-->

			<div class="panel-body sumaCarrito">

				<div class="col-md-4 col-sm-6 col-xs-12 pull-right well">

					<div class="col-xs-6">
					
						<h4>TOTAL:</h4>
					
					</div>

					<div class="col-xs-6">
					
						<h4 class="sumaSubTotal">
						
							<strong>USD $ <span>3.477</span></strong>
						
						</h4>
					
					</div>
				
				</div>

			</div>

			<!--=====================================
			BOTÓN CHECKOUT
			======================================-->

			<div class="panel-heading cabeceraCheckout">

				<button class="btn btn-default backColor btn-lg pull-right">REALIZAR PAGO</button>
			
			</div>
		
		</div>
	
	</div>

</div>