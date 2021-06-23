<?php

class ControladorCarrito{

	/*===========================================
		MOSTRAR TARIFAS
	=============================================*/

	public function ctrMostrarTarifas(){

		$tabla = "comercio";
		$respuesta = ModeloCarrito::mdlMostrarTarifas($tabla);
		return $respuesta;

	}	

	/*===========================================
		NUEVAS COMPRAS
	=============================================*/

	static public function ctrNuevasCompras($datos){

		$tabla = "compras";
		$respuesta = ModeloCarrito::mdlNuevasCompras($tabla, $datos);

		if($respuesta == "ok"){

			$tabla = "comentarios";
			ModeloUsuarios::mdlIngresoComentarios($tabla, $datos);

			/*===============================================
				NOTIFICACION NUEVAS VENTAS
			=================================================*/

			$consultaNotificaciones = ControladorNotificaciones::ctrMostrarNotificaciones();
			$nuevaVenta = $consultaNotificaciones["nuevasVentas"] + 1;
			ModeloNotificaciones::mdlActualizarNotificaciones("notificaciones", "nuevasVentas", $nuevaVenta);

		}

		return $respuesta;

	}

	/*========================================
		VERIFICAR PRODUCTO GRATIS ADQUIRIDO
	==========================================*/

	static public function ctrVerificarProducto($datos){

		$tabla = "compras";
		$respuesta = ModeloCarrito::mdlVerificarProducto($tabla, $datos);
		return $respuesta;

	}

}