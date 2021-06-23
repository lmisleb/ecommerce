<?php

class ControladorVisitas{

	static public function ctrEnviarIp($ip, $pais, $codigo){

		/*============================================================================================================================
			CONSULTAR IP Y FECHA, GUARDAR UNA IP NUEVA, VERIFICAR EL PAIS, GUARDAR UN PAIS NUEVO, ACTUALIZAR LA CANTIDAD DE VISITAS
		==============================================================================================================================*/

		date_default_timezone_set('America/Santiago');
		$fechaActual = date('d-m-Y');
		$tabla1 = "visitaspersonas";
		$tabla2 = "visitaspaises";
		$respuestaInsertarIp = null;

		if($pais == ""){

			$pais = "Desconocido";

		}

		$consultarIpFecha = ModeloVisitas::mdlconsultarIpFecha($tabla1, $ip, $fechaActual);

		if($consultarIpFecha == "no existe"){

			$visita = 1;
			$respuestaInsertarIp = ModeloVisitas::mdlGuardarNuevaIp($tabla1, $ip, $pais, $visita, $fechaActual);

			if($respuestaInsertarIp == "ok"){

				/*===============================================
					NOTIFICACION NUEVAS VISITAS
				=================================================*/

				$consultaNotificaciones = ControladorNotificaciones::ctrMostrarNotificaciones();
				$nuevaVisita = $consultaNotificaciones["nuevasVisitas"] + 1;
				ModeloNotificaciones::mdlActualizarNotificaciones("notificaciones", "nuevasVisitas", $nuevaVisita);

				$consultarPais = ModeloVisitas::mdlconsultarPais($tabla2, $pais);

				if($consultarPais == "no existe pais"){

					$cantidad = 1;
					$ingresarPais = ModeloVisitas::mdlIngresarPais($tabla2, $pais, $codigo, $cantidad, $fechaActual);

				}else{

					$solicitarCantidad = ModeloVisitas::mdlSolicitarCantidad($tabla2, $pais);
					$nuevaCantidad = $solicitarCantidad["cantidad"] + 1;
		 			$actualizarPais = ModeloVisitas::mdlActualizarPais($tabla2, $pais, $nuevaCantidad, $fechaActual);

				}

			}

		}
				
	}

	/*============================================
		MOSTRAR EL TOTAL DE VISITAS
	==============================================*/	

	public function ctrMostrarTotalVisitas(){

		$tabla = "visitaspaises";
		$respuesta = ModeloVisitas::mdlMostrarTotalVisitas($tabla);
		return $respuesta;

	}

	/*==============================================================
		MOSTRAR EL TOTAL DE LOS PRIMEROS 6 PAISES CON MÁS VISITAS
	================================================================*/	

	public function ctrMostrarPaises(){

		$tabla = "visitaspaises";
		$respuesta = ModeloVisitas::mdlMostrarPaises($tabla);
		return $respuesta;

	}

}