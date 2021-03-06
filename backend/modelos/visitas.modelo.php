<?php

require_once "conexion.php";

class ModeloVisitas{

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
		MOSTRAR PAISES DE VISITAS
	=============================================*/
	
	static public function mdlMostrarPaises($tabla, $orden){
		
		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE codigo IS NOT NULL ORDER BY $orden DESC");
		$stmt -> execute();
		return $stmt -> fetchAll();
		$stmt -> close();
	
	}

	/*=============================================
		MOSTRAR VISITAS
	=============================================*/	

	static public function mdlMostrarVisitas($tabla){

		$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY id DESC");
		$stmt -> execute();
		return $stmt -> fetchAll();
		$stmt -> close();
		$stmt = null;

	}
	
}