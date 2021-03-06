<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";
require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";
require_once "../controladores/subcategorias.controlador.php";
require_once "../modelos/subcategorias.modelo.php";
require_once "../controladores/cabeceras.controlador.php";
require_once "../modelos/cabeceras.modelo.php";

class TablaProductos{

  	/*=============================================
  	MOSTRAR LA TABLA DE PRODUCTOS
  	=============================================*/ 

	public function mostrarTablaProductos(){	

		$item = null;
		$valor = null;
		$productos = ControladorProductos::ctrMostrarProductos($item, $valor);
		//echo json_encode($productos); return;
		//print_r($productos);

		$datosJson = '{	

			"data": [ ';

				for($i = 0; $i < count($productos); $i++){

					/*=============================================
						TRAER LAS CATEGORÍAS
					=============================================*/

					$categoria = null;
					$subcategoria = null;
					$imgPortada = null;
					$vistaMultimedia = null;
					$estadoProducto = null;
					$item = "id";
					$valor = $productos[$i]["id_categoria"];
					$categorias = ControladorCategorias::ctrMostrarCategorias($item, $valor);

					if($categorias == false){

						$categoria = "SIN CATEGORÍA";
						$categorialbl = "<label class='lblCategoriaRed'>SIN CATEGORÍA</label>";

					}else{

						$categorialbl = "<label class='lblCategoria'>".$categorias["categoria"]."</label>";
											
					}

					/*=============================================
						TRAER LAS SUBCATEGORÍAS
					=============================================*/

					$item2 = "id";
					$valor2 = $productos[$i]["id_subcategoria"];
					$subcategorias = ControladorSubCategorias::ctrMostrarSubCategorias($item2, $valor2);

					if($subcategorias == false){

						$subcategoria = "SIN SUBCATEGORÍA";
						$subcategorialbl = "<label class='lblSubCategoriaRed'>SIN SUBCATEGORÍA</label>";

					}else{

						$subcategorialbl = "<label class='lblSubCategoria'>".$subcategorias[0]["subcategoria"]."</label>";

					}

					/*=============================================
						NOMBRE DEL PRODUCTO
					=============================================*/

					$productolbl = "<label class='lblProducto'>".$productos[$i]["titulo"]."</label> <label class='lblCod'>"." Cod: (".$productos[$i]["id"].")"."</label>";

					/*=============================================
						ACTIVAR / DESACTIVAR PRODUCTO
					=============================================*/

					if($productos[$i]["estado"] == 0){

						$colorEstado = "btn-danger";
						$textoEstado = "Desactivado";
						$estadoProducto = 1;
	  
					}else{
	  
						$colorEstado = "btn-success";
						$textoEstado = "Activado";
						$estadoProducto = 0;
	  
					}
	  
					$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idProducto='".$productos[$i]["id"]."' estadoProducto='".$estadoProducto."'>".$textoEstado."</button>";

					/*===================================================================================================
						ANULAR BOTON (ACTIVAR / DESACTIVAR) PRODUCTO SI EN CATEGORIA Y SUBCATEGORIA ESTA DESACTIVADO
					=====================================================================================================*/

					if($categorias != false){

						if($categorias[3] == 0){
							$colorEstado = "btn-danger";
					 		$textoEstado = "Desactivado";
							$estadoProducto = 1;
 							$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idProducto='".$productos[$i]["id"]."' estadoProducto='".$estadoProducto."' disabled>".$textoEstado."</button>";
						}

					}

					if($subcategorias != false ){

						if($subcategorias[0][4] == 0){
							$colorEstado = "btn-danger";
					 		$textoEstado = "Desactivado";
							$estadoProducto = 1;
 							$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idProducto='".$productos[$i]["id"]."' estadoProducto='".$estadoProducto."' disabled>".$textoEstado."</button>";
						}

					}

					if($categoria == "SIN CATEGORÍA" || $subcategoria == "SIN SUBCATEGORÍA"){
						$colorEstado = "btn-danger";
						$textoEstado = "Desactivado";
					   	$estadoProducto = 1;
						$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idProducto='".$productos[$i]["id"]."' estadoProducto='".$estadoProducto."' disabled>".$textoEstado."</button>";
					}
					
					/*=============================================
						TRAER LAS CABECERAS
					=============================================*/

					$item3 = "ruta";
					$valor3 = $productos[$i]["ruta"];
					$cabeceras = ControladorCabeceras::ctrMostrarCabeceras($item3, $valor3);

					if($cabeceras == false){

						$cabeceras["portada"] = "";
						$cabeceras["descripcion"] = "";
						$cabeceras["palabrasClaves"] = "";
						$imgPortada = "<img class='img-thumbnail imgPortadaCategorias' src='vistas/img/default/default.png' width='100px'>";

					}else{

						if($cabeceras["portada"] != ""){

							$imgPortada = "<img src='".$cabeceras["portada"]."' class='img-thumbnail imgPortadaProductos' width='100px'>";

						}else{

							$imgPortada = "<img src='vistas/img/default/default.png' class='img-thumbnail imgPortadaProductos' width='100px'>";

						}

					}

					/*=============================================
						TRAER IMAGEN PRINCIPAL
					=============================================*/

					$imagenPrincipal = "<img src='".$productos[$i]["portada"]."' class='img-thumbnail imgTablaPrincipal' width='100px'>";

					/*=============================================
						TRAER MULTIMEDIA
					=============================================*/

					if($productos[$i]["multimedia"] != null){

						$multimedia = json_decode($productos[$i]["multimedia"],true);

						if($multimedia != false){

							if($multimedia[0]["foto"] != ""){

								$vistaMultimedia = "<img src='".$multimedia[0]["foto"]."' class='img-thumbnail imgTablaMultimedia' width='100px'>";

							}

						}else if($vistaMultimedia == ""){

								$vistaMultimedia = "<img src='vistas/img/default/default.png' class='img-thumbnail imgTablaMultimedia' width='100px'>";

							}else{

								$vistaMultimedia = "<img src='http://i3.ytimg.com/vi/".$productos[$i]["multimedia"]."/hqdefault.jpg' class='img-thumbnail imgTablaMultimedia' width='100px'>";
							
							}

					}else{

						$vistaMultimedia = "<img src='vistas/img/default/default.png' class='img-thumbnail imgTablaMultimedia' width='100px'>";

					}

					/*=============================================
						TRAER DETALLES
					=============================================*/

					$detalles = json_decode($productos[$i]["detalles"],true);

					if($productos[$i]["tipo"] == "fisico"){

						$talla = json_encode($detalles["Talla"]);
						$color = json_encode($detalles["Color"]);
						$marca = json_encode($detalles["Marca"]);
						$vistaDetalles = "Talla: ".str_replace(array("[","]",'"'), "", $talla)." - Color: ".str_replace(array("[","]",'"'), "", $color)." - Marca: ".str_replace(array("[","]",'"'), "", $marca);

					}else{

						$vistaDetalles = "Clases: ".$detalles["Clases"].", Tiempo: ".$detalles["Tiempo"].", Nivel: ".$detalles["Nivel"].", Acceso: ".$detalles["Acceso"].", Dispositivo: ".$detalles["Dispositivo"].", Certificado: ".$detalles["Certificado"];

					}

					/*=============================================
						TRAER PRECIO
					=============================================*/

					if($productos[$i]["precio"] == 0){

						$precio = "Gratis";
					
					}else{

						$precio = "$ ".number_format($productos[$i]["precio"],2);

					}

					/*=============================================
						TRAER ENTREGA
					=============================================*/

					if($productos[$i]["entrega"] == 0){

						$entrega = "Inmediata";
					
					}else{

						$entrega = $productos[$i]["entrega"]. " días hábiles";

					}

					/*=============================================
						REVISAR SI HAY OFERTAS
					=============================================*/
					
					if($productos[$i]["oferta"] != 0){

						if($productos[$i]["precioOferta"] != 0){	

							$tipoOferta = "PRECIO";
							$valorOferta = "$ ".number_format($productos[$i]["precioOferta"],2);

						}else{

							$tipoOferta = "DESCUENTO";
							$valorOferta = $productos[$i]["descuentoOferta"]." %";	

						}	

					}else{

						$tipoOferta = "No tiene oferta";
						$valorOferta = 0;
						
					}

					/*=============================================
						TRAER IMAGEN OFERTA
					=============================================*/

					if($productos[$i]["imgOferta"] != ""){

						$imgOferta = "<img src='".$productos[$i]["imgOferta"]."' class='img-thumbnail imgTablaProductos' width='100px'>";

					}else{

						$imgOferta = "<img src='vistas/img/default/default.png' class='img-thumbnail imgTablaProductos' width='100px'>";

					}

					/*=============================================
						TRAER LAS ACCIONES
					=============================================*/

					$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarProducto' idProducto='".$productos[$i]["id"]."' data-toggle='modal' data-target='#modalEditarProducto' title='Editar'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarProducto' idProducto='".$productos[$i]["id"]."' imgOferta='".$productos[$i]["imgOferta"]."' rutaCabecera='".$productos[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."' imgPrincipal='".$productos[$i]["portada"]."' title='Eliminar'><i class='fa fa-times'></i></button></div>";						

					/*===================================================================================================
						ANULAR BOTON (ACCCIONES) PRODUCTO SI EN CATEGORIA Y SUBCATEGORIA ESTA DESACTIVADO
					=====================================================================================================*/

					if($categorias != false){

						if($categorias[3] == 0){

							$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarProducto' idProducto='".$productos[$i]["id"]."' data-toggle='modal' data-target='#modalEditarProducto' disabled><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarProducto' idProducto='".$productos[$i]["id"]."' imgOferta='".$productos[$i]["imgOferta"]."' rutaCabecera='".$productos[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."' imgPrincipal='".$productos[$i]["portada"]."'><i class='fa fa-times'></i></button></div>";						

						}

					}

					if($subcategorias != false ){

						if($subcategorias[0][4] == 0){

							$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarProducto' idProducto='".$productos[$i]["id"]."' data-toggle='modal' data-target='#modalEditarProducto' disabled><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarProducto' idProducto='".$productos[$i]["id"]."' imgOferta='".$productos[$i]["imgOferta"]."' rutaCabecera='".$productos[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."' imgPrincipal='".$productos[$i]["portada"]."'><i class='fa fa-times'></i></button></div>";						
							
						}

					}

					if($categoria == "SIN CATEGORÍA" || $subcategoria == "SIN SUBCATEGORÍA"){
						
						$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarProducto' idProducto='".$productos[$i]["id"]."' data-toggle='modal' data-target='#modalEditarProducto' title='Editar'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarProducto' idProducto='".$productos[$i]["id"]."' imgOferta='".$productos[$i]["imgOferta"]."' rutaCabecera='".$productos[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."' imgPrincipal='".$productos[$i]["portada"]."' title='Eliminar'><i class='fa fa-times'></i></button></div>";						

					}
				
					/*=============================================
						CONSTRUIR LOS DATOS JSON
					=============================================*/

					$datosJson .='[							
						"'.($i+1).'",
						"'.$categorialbl.'",
						"'.$subcategorialbl.'",
						"'.$productolbl.'",
						"'.$productos[$i]["ruta"].'",
						"'.$estado.'",
						"'.$productos[$i]["tipo"].'",
						"'.$cabeceras["descripcion"].'",
						"'.$cabeceras["palabrasClaves"].'",
						"'.$imgPortada.'",
						"'.$imagenPrincipal.'",
						"'.$vistaMultimedia.'",
						"'.$vistaDetalles.'",
						"'.$precio.'",
						"'.$productos[$i]["peso"].' kg",
						"'.$entrega.'",
						"'.$tipoOferta.'",
						"'.$valorOferta.'",
						"'.$imgOferta.'",
						"'.$productos[$i]["finOferta"].'",			
						"'.$acciones.'"
					],';

				}

				$datosJson = substr($datosJson, 0, -1);

			$datosJson .= ']

		}';

		echo $datosJson;

	}

}

/*=============================================
	ACTIVAR TABLA DE PRODUCTOS
=============================================*/ 

$activarProductos = new TablaProductos();
$activarProductos -> mostrarTablaProductos();