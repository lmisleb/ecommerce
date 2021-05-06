<?php

class Ruta{

	/*=============================================
	RUTA LADO DEL CLIENTE
	=============================================*/

	public function ctrRuta(){

		return "http://localhost/ecommerce/frontend/";

		//Solo para hacer pruebas de facebook
		//return "https://localhost/ecommerce/frontend/";
	
	}

	/*=============================================
	RUTA LADO DEL SERVIDOR
	=============================================*/

	public function ctrRutaServidor(){

		return "http://localhost/ecommerce/backend/";

		//Solo para hacer pruebas de facebook
		//return "https://localhost/ecommerce/backend/";
	
	}

}