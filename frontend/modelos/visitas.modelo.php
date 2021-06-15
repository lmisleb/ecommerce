<?php

require_once "conexion.php";

class ModeloVisitas{

	/*=========================
	CONSULTAR IP Y FECHA
	==========================*/

    static public function mdlconsultarIpFecha($tabla, $ip, $fechaActual){

        $stmt = Conexion::conectar()->prepare("SELECT COUNT(*) total FROM $tabla WHERE ip = :ip AND fecha = :fecha");
		$stmt->bindParam(":ip", $ip, PDO::PARAM_STR);
		$stmt->bindParam(":fecha", $fechaActual, PDO::PARAM_STR);
        $stmt -> execute();
		$total = $stmt -> fetchColumn();

		if ($total > 0 ){

			return "existe";

		} else {

			return "no existe";

		}
        
        $stmt-> close();
        $stmt = null;

    }
	
	/*=========================
	GUARDAR IP NUEVA
	==========================*/

    static public function mdlGuardarNuevaIp($tabla, $ip, $pais, $visitas, $fechaActual){

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla (ip, pais, visitas, fecha) VALUES (:ip, :pais, :visitas, :fecha)");
		$stmt->bindParam(":ip", $ip, PDO::PARAM_STR);
		$stmt->bindParam(":pais", $pais, PDO::PARAM_STR);
		$stmt->bindParam(":visitas", $visitas, PDO::PARAM_INT);
		$stmt->bindParam(":fecha", $fechaActual, PDO::PARAM_STR);
        
		if($stmt -> execute()){

            return "ok";

        }else{

            return "error";
        }

        $stmt-> close();
        $stmt = null;
        
    }

	/*=========================
	CONSULTAR PAIS
	==========================*/

    static public function mdlconsultarPais($tabla, $pais){

        $stmt = Conexion::conectar()->prepare("SELECT COUNT(*) total FROM $tabla WHERE pais = :pais");
		$stmt->bindParam(":pais", $pais, PDO::PARAM_STR);
		$stmt -> execute();
		$total = $stmt -> fetchColumn();

		if ($total > 0 ){

			return "existe pais";

		} else {

			return "no existe pais";

		}
        
        $stmt-> close();
        $stmt = null;
    }

	/*=========================
	INGRESAR PAIS
	==========================*/

    static public function mdlIngresarPais($tabla, $pais, $codigo, $cantidad, $fechaActual){

        $stmt = Conexion::conectar()->prepare("INSERT INTO $tabla (pais, codigo, cantidad, fecha) VALUES (:pais, :codigo, :cantidad, :fecha)");
		$stmt->bindParam(":pais", $pais, PDO::PARAM_STR);
		$stmt->bindParam(":codigo", $codigo, PDO::PARAM_STR);
		$stmt->bindParam(":cantidad", $cantidad, PDO::PARAM_INT);
		$stmt->bindParam(":fecha", $fechaActual, PDO::PARAM_STR);
		
		if($stmt -> execute()){

			return "ok";

		}else{

			return "error";

		}

		$stmt-> close();
		$stmt = null;

    }

	/*===========================================
	SOLICITAR CANTIDAD
	=============================================*/

	static public function mdlSolicitarCantidad($tabla, $pais){

		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE pais = :pais");
		$stmt->bindParam(":pais", $pais, PDO::PARAM_STR);
		$stmt -> execute();
		return $stmt -> fetch();
		$stmt-> close();
		$stmt = null;
		
	}

	/*===========================================
	ACTUALIZAR CANTIDAD AL PAIS
	=============================================*/

    static public function mdlActualizarPais($tabla, $pais, $nuevaCantidad, $fechaActual){

        $stmt = Conexion::conectar()->prepare("UPDATE $tabla SET cantidad = :cantidad, fecha = :fecha WHERE pais = :pais");
		$stmt->bindParam(":pais", $pais, PDO::PARAM_STR);
		$stmt->bindParam(":cantidad", $nuevaCantidad, PDO::PARAM_INT);
		$stmt->bindParam(":fecha", $fechaActual, PDO::PARAM_STR);

        if($stmt -> execute()){

			return "ok";

		}else{

			return "error";

		}

		$stmt-> close();
		$stmt = null;

    }

	/*=============================================
	MOSTRAR EL TOTAL DE VISITAS
	=============================================*/	

	static public function mdlMostrarTotalVisitas($tabla){

		$stmt = Conexion::conectar()->prepare("SELECT SUM(cantidad) as total FROM $tabla");
		$stmt -> execute();
		return $stmt -> fetch();
		$stmt -> close();
		$stmt = null;

	}

	/*=============================================
	MOSTRAR LOS PRIMEROS 6 PAISES DE VISITAS
	=============================================*/
	
	static public function mdlMostrarPaises($tabla){
		
		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY cantidad DESC LIMIT 6");
		$stmt -> execute();
		return $stmt -> fetchAll();
		$stmt -> close();
	
	}

}