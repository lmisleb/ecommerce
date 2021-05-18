<?php

require_once "../controladores/subcategorias.controlador.php";
require_once "../modelos/subcategorias.modelo.php";
require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";
require_once "../controladores/cabeceras.controlador.php";
require_once "../modelos/cabeceras.modelo.php";

class TablaSubCategorias{

	/*=============================================
  		MOSTRAR LA TABLA DE SUBCATEGORÍAS
  	=============================================*/ 

	public function mostrarTablaSubCategoria(){	

		$categoria = null;
		$imgPortada = null;
		$item = null;
		$valor = null;
		$subcategorias = ControladorSubCategorias::ctrMostrarSubCategorias($item, $valor);
		//echo json_encode($subcategorias); return;

		$datosJson = '{

			"data": [ ';

				for($i = 0; $i < count($subcategorias); $i++){

					/*=============================================
						TRAER LAS CATEGORÍAS
					=============================================*/

					$item = "id";
					$valor = $subcategorias[$i]["id_categoria"];
					$categorias = ControladorCategorias::ctrMostrarCategorias($item, $valor);


					if($categorias == false){

						$categoria = "SIN CATEGORÍA";
						$categorialbl = "<label class='lblCategoriaRed'>SIN CATEGORÍA</label>";

					}else{

						$categorialbl = "<label class='lblCategoria'>".$categorias["categoria"]."</label>";
											
					}

					/*=============================================
						NOMBRE DE LA SUBCATEGORIA
					=============================================*/

					$subcategorialbl = "<label class='lblSubCategoria'>".$subcategorias[$i]["subcategoria"]."</label>";

					/*=============================================
						REVISAR ESTADO
					=============================================*/

					if($subcategorias[$i]["estado"] == 0){

						$colorEstado = "btn-danger";
						$textoEstado = "Desactivado";
						$estadoSubCategoria = 1;
						$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idSubCategoria='". $subcategorias[$i]["id"]."' estadoSubCategoria='".$estadoSubCategoria."'>".$textoEstado."</button>";

					}else{

						$colorEstado = "btn-success";
						$textoEstado = "Activado";
						$estadoSubCategoria = 0;
						$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idSubCategoria='". $subcategorias[$i]["id"]."' estadoSubCategoria='".$estadoSubCategoria."'>".$textoEstado."</button>";

					}

					if($categorias != false){

						if($categorias["estado"] == 0){

							$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idSubCategoria='". $subcategorias[$i]["id"]."' estadoSubCategoria='".$estadoSubCategoria."' disabled>".$textoEstado."</button>";

						}
							
						if($categoria == "SIN CATEGORÍA"){

							$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idSubCategoria='". $subcategorias[$i]["id"]."' estadoSubCategoria='".$estadoSubCategoria."'>".$textoEstado."</button>";

						}

					}else{

						$estado = "<button class='btn btn-xs btnActivar ".$colorEstado."' idSubCategoria='". $subcategorias[$i]["id"]."' estadoSubCategoria='".$estadoSubCategoria."' disabled>".$textoEstado."</button>";

					}

					/*=============================================
						REVISAR IMAGEN PORTADA
					=============================================*/

					$item2 = "ruta";
					$valor2 = $subcategorias[$i]["ruta"];
					$cabeceras = ControladorCabeceras::ctrMostrarCabeceras($item2, $valor2);

					if($cabeceras == false){

						$cabeceras["portada"] = "";
						$cabeceras["descripcion"] = "";
						$cabeceras["palabrasClaves"] = "";
						$imgPortada = "<img class='img-thumbnail imgPortadaCategorias' src='vistas/img/cabeceras/default/default.jpg' width='100px'>";

					}else{

						if($cabeceras["portada"] != ""){

							$imgPortada = "<img src='".$cabeceras["portada"]."' class='img-thumbnail imgPortadaSubCategorias' width='100px'>";

						}else{

							$imgPortada = "<img src='vistas/img/cabeceras/default/default.jpg' class='img-thumbnail imgPortadaSubCategorias' width='100px'>";
						}

					}

					/*=============================================
						REVISAR OFERTAS
					=============================================*/

					if($subcategorias[$i]["oferta"] != 0){

						if($subcategorias[$i]["precioOferta"] != 0){	

							$tipoOferta = "PRECIO";
							$valorOferta = "$ ".number_format($subcategorias[$i]["precioOferta"],2);

						}else{

							$tipoOferta = "DESCUENTO";
							$valorOferta = $subcategorias[$i]["descuentoOferta"]." %";	

						}	

					}else{

						$tipoOferta = "No tiene oferta";
						$valorOferta = 0;
						
					}

					if($subcategorias[$i]["imgOferta"] != ""){

						$imgOferta = "<img src='".$subcategorias[$i]["imgOferta"]."' class='img-thumbnail imgTablaSubCategorias' width='100px'>";

					}else{

						$imgOferta = "<img src='vistas/img/ofertas/default/default.jpg' class='img-thumbnail imgTablaSubCategorias' width='100px'>";

					}

					/*=============================================
						CREAR LAS ACCIONES
					=============================================*/

					$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarSubCategoria' idSubCategoria='".$subcategorias[$i]["id"]."' data-toggle='modal' data-target='#modalEditarSubCategoria'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarSubCategoria' idSubCategoria='".$subcategorias[$i]["id"]."' imgOferta='".$subcategorias[$i]["imgOferta"]."' rutaCabecera='".$subcategorias[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."'><i class='fa fa-times'></i></button></div>";

					if($categorias != false){
					
						if($categorias["estado"] == 0){

							$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarSubCategoria' idSubCategoria='".$subcategorias[$i]["id"]."' data-toggle='modal' data-target='#modalEditarSubCategoria' disabled><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarSubCategoria' idSubCategoria='".$subcategorias[$i]["id"]."' imgOferta='".$subcategorias[$i]["imgOferta"]."' rutaCabecera='".$subcategorias[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."'><i class='fa fa-times'></i></button></div>";

						}

						if($categoria == "SIN CATEGORÍA"){

							$acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarSubCategoria' idSubCategoria='".$subcategorias[$i]["id"]."' data-toggle='modal' data-target='#modalEditarSubCategoria'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarSubCategoria' idSubCategoria='".$subcategorias[$i]["id"]."' imgOferta='".$subcategorias[$i]["imgOferta"]."' rutaCabecera='".$subcategorias[$i]["ruta"]."' imgPortada='".$cabeceras["portada"]."'><i class='fa fa-times'></i></button></div>";

						}
					
					}

					$datosJson .=  '[
							"'.($i+1).'",
							"'.$categorialbl.'",
							"'.$subcategorialbl.'",
							"'.$subcategorias[$i]["ruta"].'",
							"'.$estado.'",
							"'.$cabeceras["descripcion"].'",
							"'.$cabeceras["palabrasClaves"].'",
							"'.$imgPortada.'",
							"'.$tipoOferta.'",
							"'.$valorOferta.'",
							"'.$imgOferta.'",
							"'.$subcategorias[$i]["finOferta"].'",			
							"'.$acciones.'"
							],';
											
				}

				$datosJson =  substr($datosJson, 0, -1);

			$datosJson .=  ']

		}';

		echo $datosJson;
		
	}

}

/*=============================================
	ACTIVAR TABLA DE SUBCATEGORÍAS
=============================================*/

$activarSubcategoria = new TablaSubCategorias();
$activarSubcategoria -> mostrarTablaSubCategoria();