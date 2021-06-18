<?php

require_once "../controladores/usuarios.controlador.php";
require_once "../modelos/usuarios.modelo.php";

class AjaxUsuarios{

	/*=============================================
		ACTIVAR USUARIOS
  	=============================================*/	

  	public $activarUsuario;
  	public $activarId;

  	public function ajaxActivarUsuario(){

		$respuesta = ModeloUsuarios::mdlActualizarUsuario("usuarios", "verificacion", $this->activarUsuario, "id", $this->activarId);
		echo $respuesta;

  	}

}

/*=============================================
	METODO ACTIVAR USUARIOS
=============================================*/

if(isset($_POST["activarUsuario"])){

	$activarUsuario = new AjaxUsuarios();
  	$activarUsuario -> activarUsuario = $_POST["activarUsuario"];
  	$activarUsuario -> activarId = $_POST["activarId"];
  	$activarUsuario -> ajaxActivarUsuario();

}