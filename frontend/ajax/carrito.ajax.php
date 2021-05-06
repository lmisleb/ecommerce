<?php

require_once "../extensiones/paypal.controlador.php";
require_once "../controladores/carrito.controlador.php";
require_once "../modelos/carrito.modelo.php";
require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";

class AjaxCarrito{

    /*==============================================
    METODO PAYPAL
    ================================================*/

    public $divisa;
    public $total;
    public $totalEncriptado;
    public $impuesto;
    public $envio;
    public $subtotal;
    public $tituloArray;
    public $cantidadArray;
    public $valorItemArray;
    public $idProductoArray;

    public function ajaxEnviarPaypal(){

        // echo $this->totalEncriptado;
        // echo"...";
        // echo md5($this->total);
        // return;

        if(md5($this->total) == $this->totalEncriptado){

            $datos = array(
                "divisa"=>$this->divisa,
                "total"=>$this->total,
                "impuesto"=>$this->impuesto,
                "envio"=>$this->envio,
                "subtotal"=>$this->subtotal,
                "tituloArray"=>$this->tituloArray,
                "cantidadArray"=>$this->cantidadArray,
                "valorItemArray"=>$this->valorItemArray,
                "idProductoArray"=>$this->idProductoArray,
            );

            $respuesta = Paypal::mdlPagoPaypal($datos);

                echo $respuesta;
        }
    }

    /*=============================================
	MÉTODO PAYU
	=============================================*/

	public function ajaxTraerComercioPayu(){

		$respuesta = ControladorCarrito::ctrMostrarTarifas(); 
        echo json_encode($respuesta);
        
    }
    
    /*================================================
	VERIFICAR QUE EL PRODUCTO GRATIS NO ESTÉ ADQUIRIDO
    ================================================*/
    
    public $idUsuario;
    public $idProducto;

    public function ajaxVerificarProducto(){

        $datos = array("idUsuario"=>$this->idUsuario,
                       "idProducto"=>$this->idProducto);

        $respuesta = ControladorCarrito::ctrVerificarProducto($datos);
        //echo json_encode($respuesta);
        echo $respuesta;

    }

}

/*==============================================
METODO PAYPAL
================================================*/

if(isset($_POST["divisa"])){

    $item = "id";
    $valorDivisa = 0;
    $idProductos = explode(",", $_POST["idProductoArray"]);
    $cantidadProductos = explode(",", $_POST["cantidadArray"]);
    $precioProductos = explode(",", $_POST["valorItemArray"]);
    $divisa = $_POST["divisa"];

    switch ($divisa) {

        case "USD":
            $valorDivisa = 1;
        break;

        case "CAD":
            $valorDivisa = 1.32;
        break;

        case "EUR":
            $valorDivisa = 0.85;
        break;

        case "GBP":
            $valorDivisa = 0.77;
        break;

        case "MXN":
            $valorDivisa = 21.05;
        break;

        case "BRL":
            $valorDivisa = 5.71;
        break;

        case "PEN":
            $valorDivisa = 3.62;
        break;
        
        case "ARS":
            $valorDivisa = 78.31;
        break;

        case "COP":
            $valorDivisa = 3809.60;
        break;

        case "CLP":
            $valorDivisa = 773.00;
        break;
    }

    for ($i = 0; $i < count($idProductos) ; $i++) { 
        
        $valor = $idProductos[$i];
        $verificarProductos = ControladorProductos::ctrMostrarInfoProducto($item, $valor);

        if($verificarProductos["precioOferta"] == 0){
            $precio = number_format($verificarProductos["precio"] * $valorDivisa, 2);
        }else{
            $precio = number_format($verificarProductos["precioOferta"] * $valorDivisa, 2);
        }

        $verificarSubTotal = $cantidadProductos[$i] * $precio;

        // echo number_format($verificarSubTotal, 2)."<br>"; 
        // echo number_format($precioProductos[$i], 2)."<br>"; 
        // return;

        if(number_format($verificarSubTotal, 2) != number_format($precioProductos[$i], 2)){ 
            echo "carrito-de-compra";
            return;
        }

    }

    $paypal = new AjaxCarrito();
	$paypal ->divisa = $_POST["divisa"];
    $paypal ->total = $_POST["total"];
    $paypal ->totalEncriptado = $_POST["totalEncriptado"];
	$paypal ->impuesto = $_POST["impuesto"];
	$paypal ->envio = $_POST["envio"];
	$paypal ->subtotal = $_POST["subtotal"];
	$paypal ->tituloArray = $_POST["tituloArray"];
	$paypal ->cantidadArray = $_POST["cantidadArray"];
	$paypal ->valorItemArray = $_POST["valorItemArray"];
	$paypal ->idProductoArray = $_POST["idProductoArray"];
	$paypal -> ajaxEnviarPaypal();

}

/*=================================================
VERIFICAR QUE NO TENGA EL PRODUCTO GRATIS ADQUIRIDO
==================================================*/

if(isset($_POST["idProducto"])){

    $producto = new AjaxCarrito();
    $producto -> idUsuario = $_POST["idUsuario"];
    $producto -> idProducto = $_POST["idProducto"];
    $producto -> ajaxVerificarProducto();

}


/*=============================================
MÉTODO PAYU
=============================================*/	

// if(isset($_POST["metodoPago"]) && $_POST["metodoPago"] == "payu"){

// 	$idProductos = explode("," , $_POST["idProductoArray"]);
// 	$cantidadProductos = explode("," , $_POST["cantidadArray"]);
// 	$precioProductos = explode("," , $_POST["valorItemArray"]);

// 	$item = "id";

// 	for($i = 0; $i < count($idProductos); $i ++){

// 		$valor = $idProductos[$i];
// 		$verificarProductos = ControladorProductos::ctrMostrarInfoProducto($item, $valor);
// 		$divisa = file_get_contents("http://free.currconv.com/api/v7/convert?q=USD_".$_POST["divisaPayu"]."&compact=ultra&apiKey=a01ebaf9a1c69eb4ff79");
// 		$jsonDivisa = json_decode($divisa, true);
// 		$conversion = number_format($jsonDivisa["USD_".$_POST["divisaPayu"]],2);

// 		if($verificarProductos["precioOferta"] == 0){

// 			$precio = $verificarProductos["precio"]*$conversion;
		
// 		}else{

// 			$precio = $verificarProductos["precioOferta"]*$conversion;

// 		}

// 		$verificarSubTotal = $cantidadProductos[$i]*$precio;
// 		// echo number_format($verificarSubTotal,2)."<br>";
// 		// echo number_format($precioProductos[$i],2)."<br>";
// 		// return;

// 		if(number_format($verificarSubTotal,2) != number_format($precioProductos[$i],2)){

// 			echo "carrito-de-compras";
// 			return;

// 		}

// 	}

// 	$payu = new AjaxCarrito();
// 	$payu -> ajaxTraerComercioPayu();

// }