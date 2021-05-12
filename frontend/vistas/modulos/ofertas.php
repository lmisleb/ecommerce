<?php

	$servidor = Ruta::ctrRutaServidor();
	$url = Ruta::ctrRuta();

?>

<!--=====================================
BREADCRUMB OFERTAS
======================================-->
<div class="container-fluid well well-sm">
	
	<div class="container">
		
		<div class="row">
			
			<ul class="breadcrumb fondoBreadcrumb text-uppercase">
				
				<li><a href="<?php echo $url; ?>">INICIO</a></li>
				<li class="active pagActiva"><?php echo $rutas[0] ?></li>

			</ul>

		</div>

	</div>

</div>

<!--=====================================
JUMBOTRON AVISO OFERTA
======================================-->

<?php 

	if(isset($rutas[1])){

		if($rutas[1]=="aviso"){

			echo'<div class="container-fluid">

				<div class="container">
				
					<div class="jumbotron">
			
						<button type="button" class="close cerrarOfertas" style="margin-top:-50px;"><h1>&times;</h1></button>
					
						<h1 class="text-center">¡Hola!</h1>
			
						<p class="text-center">
			
							Tú artículo ha sido asignado a tus compras, pero antes te queremos presentar las siguientes ofertas,
							si no deseas ver estas ofertas y continuar con el artículo comprado, has click en el siguiente botón:
			
							<br><br>
			
							<a href="'.$url.'perfil"><button class="btn btn-default backColor btn-lg">VER ARTICULOS COMPRADOS</button></a>
			
							<br><br>
			
							<a href="#moduloOfertas"><button class="btn btn-default btn-lg">VER OFERTAS</button></a>
						
						</p>
			
					</div>
			
				</div>
		
			</div>';

		}

	}

?>

<div class="container-fluid">

	<div class="container">
	
		<div class="row" id="moduloOfertas">
		
			<?php

				date_default_timezone_set('America/Santiago');
				$item = null;
				$valor = null;
				$ordenar = "id";
				$fecha = date('Y-m-d');
				$hora = date('H:i:s');
				$fechaActual = $fecha .' '. $hora;
				$ofertas = false;
			
				/*=====================================
					OFERTAS POR CATEGORÍAS ACTIVAS
				=======================================*/
				
				$respuesta = ControladorProductos::ctrMostrarCategoriasActivas($item, $valor);
				//echo json_encode($respuesta);
				//print_r("Categorías: ");
				
				foreach ($respuesta as $key => $value) {
					
					if($value["oferta"] == 1){

						if($value["finOferta"] > $fecha){

							$dateTime1 = new DateTime($value["finOferta"]);
							$dateTime2 = new DateTime($fechaActual);
							$interval = date_diff($dateTime1, $dateTime2);
							$finOfertas = $interval->format('%a');

							echo'<div class="col-md-4 col-sm-6 col-xs-12">

								<div class="ofertas">
								
									<h3 class="text-center text-uppercase">
							
										¡OFERTA ESPECIAL EN <br> '.$value["categoria"].'!
											
									</h3>

									<figure>
							
										<img class="img-responsive" src="'.$servidor.$value["imgOferta"].'" width="100%">
										
										<div class="sombraSuperior"></div>';
								
										if($value["descuentoOferta"] != 0){
							
											echo'<h1 class="text-center text-uppercase">'.$value["descuentoOferta"].'% OFF</h1>';
							
										}else{
							
											echo'<h1 class="text-center text-uppercase">'.$value["precioOferta"].'$</h1>';
											
										}
									
									echo'</figure>';

									if($finOfertas == 0){

										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA HOY!</h4>';

									}else if($finOfertas == 1){

										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA EN '.$finOfertas.' DIA!</h4>';

									}else{
										
										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA EN '.$finOfertas.' DIAS!</h4>';

									}
							
									echo'<center>

										<div class="countdown" finOferta="'.$value["finOferta"].'"></div>

										<a href="'.$url.$value["ruta"].'" class="pixelOferta">

										<button class="btn backColor btn-lg text-uppercase btnOfertas">Ir a la Oferta</button>

										</a>

									</center>
								
								</div>
						
							</div>';

						}

					}

					if($value["oferta"] == 1){

						$ofertas = true;
	
					}

					//print_r($value["oferta"]);

				}

				/*=========================================
					OFERTAS POR SUB-CATEGORÍAS ACTIVAS
				===========================================*/

				$respuestaSubCategorias = ControladorProductos::ctrMostrarSubCategoriasActivas($item, $valor);
				//print_r(" Subcategorías: ");

				foreach ($respuestaSubCategorias as $key => $value) {

					if($value["oferta"] == 1 && $value["ofertadoPorCategoria"] == 0 ){

						if($value["finOferta"] > $fecha){

							$dateTime1 = new DateTime($value["finOferta"]);
							$dateTime2 = new DateTime($fechaActual);
							$interval = date_diff($dateTime1, $dateTime2);
							$finOfertas = $interval->format('%a');

							echo'<div class="col-md-4 col-sm-6 col-xs-12">

								<div class="ofertas">
								
									<h3 class="text-center text-uppercase">
							
										¡OFERTA ESPECIAL EN <br> '.$value["subcategoria"].'!
											
									</h3>

									<figure>
							
										<img class="img-responsive" src="'.$servidor.$value["imgOferta"].'" width="100%">
										
										<div class="sombraSuperior"></div>';
								
										if($value["descuentoOferta"] != 0){
							
											echo'<h1 class="text-center text-uppercase">'.$value["descuentoOferta"].'% OFF</h1>';
							
										}else{
							
											echo'<h1 class="text-center text-uppercase">'.$value["precioOferta"].'$</h1>';
											
										}
									
									echo'</figure>';

									if($finOfertas == 0){

										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA HOY!</h4>';

									}else if($finOfertas == 1){

										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA EN '.$finOfertas.' DIA!</h4>';

									}else{
										
										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA EN '.$finOfertas.' DIAS!</h4>';

									}
							
									echo'<center>

										<div class="countdown" finOferta="'.$value["finOferta"].'"></div>

										<a href="'.$url.$value["ruta"].'" class="pixelOferta">

										<button class="btn backColor btn-lg text-uppercase btnOfertas">Ir a la Oferta</button>

										</a>

									</center>
								
								</div>
						
							</div>';

						}

					}

					if($value["oferta"] == 1){

						$ofertas = true;
	
					}

					//print_r($value["oferta"]);
			
				}

				/*=====================================
					OFERTAS POR PRODUCTOS ACTIVOS
				=======================================*/

				$respuestaPorProductos = ControladorProductos::ctrListarProductos($ordenar, $item, $valor);
				//print_r(" Productos: ");

				foreach ($respuestaPorProductos as $key => $value) {
					
					if($value["oferta"] == 1 && $value["ofertadoPorCategoria"] == 0 && $value["ofertadoPorSubCategoria"] == 0 ){

						if($value["finOferta"] > $fecha){

							$dateTime1 = new DateTime($value["finOferta"]);
							$dateTime2 = new DateTime($fechaActual);
							$interval = date_diff($dateTime1, $dateTime2);
							$finOfertas = $interval->format('%a');

							echo'<div class="col-md-4 col-sm-6 col-xs-12">

								<div class="ofertas">
								
									<h3 class="text-center text-uppercase">
							
										¡OFERTA ESPECIAL EN <br> '.$value["titulo"].'!
											
									</h3>

									<figure>
							
										<img class="img-responsive" src="'.$servidor.$value["imgOferta"].'" width="100%">
										
										<div class="sombraSuperior"></div>';
								
										if($value["descuentoOferta"] != 0){
							
											echo'<h1 class="text-center text-uppercase">'.$value["descuentoOferta"].'% OFF</h1>';
							
										}else{
							
											echo'<h1 class="text-center text-uppercase">'.$value["precioOferta"].'$</h1>';
											
										}
									
									echo'</figure>';

									if($finOfertas == 0){

										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA HOY!</h4>';

									}else if($finOfertas == 1){

										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA EN '.$finOfertas.' DIA!</h4>';

									}else{
										
										echo'<h4 class="text-center text-uppercase">¡LA OFERTA TERMINA EN '.$finOfertas.' DIAS!</h4>';

									}
							
									echo'<center>

										<div class="countdown" finOferta="'.$value["finOferta"].'"></div>

										<a href="'.$url.$value["ruta"].'" class="pixelOferta">

										<button class="btn backColor btn-lg text-uppercase btnOfertas">Ir a la Oferta</button>

										</a>

									</center>
								
								</div>
						
							</div>';

						}

					}

					// if($value["oferta"] == 1){

					// 	$ofertas = true;
	
					// }

					// print_r($value["oferta"]);
			
				}

				if($ofertas == false){

					// echo '<div class="col-xs-12 error404 text-center">
	
					// 	<h1><small>¡Oops!</small></h1>

					// 	<h2>No hay ofertas en estos momentos.</h2>

					// 	<br>
					// 	<br>
					// 	<br>
					// 	<br>
					// 	<br>
					// 	<br>
					// 	<br>

					// </div>';

				}
			
			?>

		</div>
	
	</div>

</div>
