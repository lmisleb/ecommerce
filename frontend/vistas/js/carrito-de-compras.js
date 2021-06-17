//alert("Archivo Javascript funcionando...!");

if(localStorage.getItem("cantidadCesta") != null){

    $(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
    $(".sumaCesta").html(localStorage.getItem("sumaCesta"));

}else{

    $(".cantidadCesta").html("0");
    $(".sumaCesta").html("0.00");

}

/*============================
AGREGAR AL CARRITO DE COMPRAS
=============================*/

if(localStorage.getItem("listaProductos") != null){

    var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

}else{

    var listaCarrito = [];
    $(".cuerpoCarrito").html('<div class="well">No hay productos en el carrito de compras. </div>');
    $(".sumaCarrito").hide();
    $(".cabeceraCheckout").hide();
    
}

for(var i = 0; i < indice.length; i++ ){

    if(indice[i] == "carrito-de-compras"){

        listaCarrito.forEach(funcionListarProductos);

        function funcionListarProductos(item, index){
            //console.log("index", index);
            var datosProducto = new FormData();
            var precio = 0;
            datosProducto.append("id", item.idProducto);

            $.ajax({

                url:rutaOculta+"ajax/producto.ajax.php",
                type:"POST",
                data:datosProducto,
                cache:false,
                contentType:false,
                processData:false,
                dataType:"json",
                success: function(respuesta){

                    //console.log("respuesta", respuesta);

                    if(respuesta["precioOferta"] == 0){

                        precio = Number(respuesta["precio"]).toFixed(2);

                    }else{

                        precio = Number(respuesta["precioOferta"]).toFixed(2);

                    }

                    $(".cuerpoCarrito").append(

                        '<div>'+
                        
                        '<div class="row itemCarrito">'+
            
                            '<div class="col-sm-1 col-xs-12">'+
                            
                                '<br>'+
            
                                '<center>'+
                                
                                    '<button class="btn btn-default backColor quitarItemCarrito" idProducto="'+ item.idProducto +'" peso="'+ item.peso +'">'+
                                    
                                        '<i class="fa fa-times"></i>'+
                                    
                                    '</button>'+
                                
                                '</center>'+
                            
                        '</div>'+
            
                            '<div class="col-sm-1 col-xs-12">'+
            
                                '<figure>'+
            
                                    '<img src="'+ item.imagen +'" class="img-thumbnail">'+
                                
                                '</figure>'+
            
                            '</div>'+
            
                            '<div class="col-sm-4 col-xs-12">'+
            
                                '<br>'+
            
                                '<p class="tituloCarritoCompra text-left">'+ item.titulo +'</p>'+
            
                            '</div>'+
            
                            '<div class="col-md-2 col-sm-1 col-xs-12">'+
            
                                '<br>'+
            
                                '<p class="precioCarritoCompra text-center">USD $ <span>'+ precio +'</span></p>'+
            
                            '</div>'+
            
                            '<div class="col-md-2 col-sm-3 col-xs-8">'+
            
                                '<br>'+
            
                                '<div class="col-xs-8">'+
            
                                    '<center>'+
            
                                        '<input type="number" class="form-control text-center cantidadItem" min="1" value="'+ item.cantidad +'" tipo="'+ item.tipo +'" precio="'+ precio +'" idProducto="'+ item.idProducto +'" item="'+ index +'">'+
            
                                    '</center>'+
                                    
                                '</div>'+						
            
                            '</div>'+
            
                            '<div class="col-md-2 col-sm-1 col-xs-4 text-center">'+
            
                                '<br>'+
            
                                '<p class="subTotal'+ index +' subtotales">'+
            
                                    '<strong>USD $ <span>'+ (Number(item.cantidad) * Number(precio)).toFixed(2) +'</span></strong>'+
                                
                                '</p>'+
            
                            '</div>'+
            
                        '</div>'+
            
                        '<div class="clearfix"></div>'+
            
                        '<hr>'+
            
                        '</div>'
                    
                    );
            
                    /*============================================
                    LIMITAR LA CANTIDAD A 1 EN PRODUCTOS VIRTUALES
                    ==============================================*/
            
                    $(".cantidadItem[tipo='virtual']").attr("readonly","true");

                    /*================================
                    ACTUALIZAR SUB-TOTAL
                    ==================================*/

                    var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");
                    cestaCarrito(precioCarritoCompra.length);
                    sumaSubTotales();

                    // var cantidadItem = $(".cuerpoCarrito .cantidadItem");
                    // for(var i = 0; i < precioCarritoCompra.length; i++){
                    //     var idProductoArray = $(cantidadItem[i]).attr("idProducto");
                    //     var precioCarritoCompraArray = $(precioCarritoCompra[i]).html();
                    //     var cantidadItemArray = $(cantidadItem[i]).val();
                    //     $(".subTotal" + idProductoArray).html('<strong>USD $ <span>'+ (cantidadItemArray * precioCarritoCompraArray) +'</span></strong>');
                    //     sumaSubTotales();
                    //     cestaCarrito(precioCarritoCompra.length);
                    // }
            
                }

            })

        }

    }

}

$(".agregarCarrito").click(function(){

    var idProducto = $(this).attr("idProducto").trim();
    var imagen = $(this).attr("imagen").trim();
    var titulo = $(this).attr("titulo").trim();
    //var precio = $(this).attr("precio").trim();
    var precio = 0;
    var tipo = $(this).attr("tipo").trim();
    var peso = $(this).attr("peso").trim();
    var agregarAlCarrito = false;

    /*============================
    CAPTURAR DETALLES
    =============================*/

    if(tipo == "virtual"){

        agregarAlCarrito = true;

    }else{

        var talla = $("#seleccionarTalla").val();
        var color = $("#seleccionarColor").val();

        if((talla == "") || (color == "")){

            swal({
                title: "Debe seleccionar Talla y Color",
                text: "",
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "¡Seleccionar!",
                closeConfirm: false
            })

        }else{

            agregarAlCarrito = true;
            color = color[0].toUpperCase() + color.slice(1);
            titulo = titulo + " - " + talla + " - " + color;

        }
        
    }
    
    /*======================================
    ALMACENAR EN EL LOCALSTORE LOS PRODUCTOS 
    =======================================*/

    if(agregarAlCarrito){

        /*===============================================
            RECUPERAR ALMACENAMIENTO DEL LOCAL STORAGE
        =================================================*/

        if(localStorage.getItem("listaProductos") != null){

            var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

            for(i = 0; i < listaProductos.length; i++){

                if(listaProductos[i]["idProducto"] == idProducto && listaProductos[i]["tipo"] == "virtual"){

                    swal({
                        title: "El producto ya está agregado al carrito de compras!",
                        text: "",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "¡Volver!",
                        closeOnConfirm: false
                    })

                    return;

                }

            }

            listaCarrito.concat(localStorage.getItem("listaProductos"));

        }

        listaCarrito.push({"idProducto":idProducto,
                           "imagen":imagen,
                           "titulo":titulo,
                           "precio":precio,
                           "tipo":tipo,
                           "peso":peso,
                           "cantidad":"1"
                        });
        
        //console.log("ListaCarrito:",listaCarrito);
        localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

        /*========================================
        ACTUALIZAR LA CESTA
        ==========================================*/

        var datosProducto = new FormData();
        datosProducto.append("id", idProducto);

        $.ajax({

            url:rutaOculta+"ajax/producto.ajax.php",
            type:"POST",
            data:datosProducto,
            cache:false,
            contentType:false,
            processData:false,
            dataType:"json",
            success: function(respuesta){

                if(respuesta["precioOferta"] == 0){

                    precio = Number(respuesta["precio"]).toFixed(2);

                }else{

                    precio = Number(respuesta["precioOferta"]).toFixed(2);

                }

                var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
                var sumaCesta = (Number($(".sumaCesta").html()) + Number(precio)).toFixed(2);

                $(".cantidadCesta").html(cantidadCesta);
                $(".sumaCesta").html(sumaCesta);

                localStorage.setItem("cantidadCesta", cantidadCesta);
                localStorage.setItem("sumaCesta", sumaCesta);
                
            }

        })

        /*===========================================================
             MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO
        =============================================================*/

        swal({
            title: "",
            text: "¡Se ha agregado un nuevo producto al carrito de compras!",
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "¡Continuar comprando!",
            confirmButtonText: "¡Ir a mi carrito de compras!",
            closeOnConfirm: false
        },

        function(isConfirm){
            if(isConfirm){
                window.location = rutaOculta + "carrito-de-compras";
            }
        });

    }

})

/*=============================================
    QUITAR PRODUCTOS DEL CARRITO DE COMPRAS
===============================================*/

$(document).on("click", ".quitarItemCarrito", function(){

    $(this).parent().parent().parent().parent().remove();

    var idProducto = $(".cuerpoCarrito button");
    var imagen = $(".cuerpoCarrito img");
    var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
    var precio = $(".cuerpoCarrito .precioCarritoCompra span");
    var cantidad = $(".cuerpoCarrito .cantidadItem");

    /*=============================================================
        SI QUEDAN PRODUCTOS VOLVER ACTUALIZAR EL LOCALSTORAGE
    ===============================================================*/

    listaCarrito = [];

    if(idProducto.length != 0){

        for(var i = 0; i < idProducto.length; i++){

            var idProductoArray = $(idProducto[i]).attr("idProducto");
            var imagenArray = $(imagen[i]).attr("src");
            var tituloArray = $(titulo[i]).html();
            var precioArray = $(precio[i]).html();
            var pesoArray = $(idProducto[i]).attr("peso");
            var tipoArray = $(cantidad[i]).attr("tipo");
            var cantidadArray = $(cantidad[i]).val();
            
            listaCarrito.push({"idProducto":idProductoArray,
                               "imagen":imagenArray,
                               "titulo":tituloArray,
                               "precio":precioArray,
                               "tipo":tipoArray,
                               "peso":pesoArray,
                               "cantidad":cantidadArray
                            });
        }

        localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));
        $(".cantidadCesta").html(i);
        localStorage.setItem("cantidadCesta", i);
        sumaSubTotales();
        cestaCarrito(listaCarrito.length);
        
    }else{

        if(idProducto.length == 0){

            /*============================================
            SI YA NO QUEDAN PRODUCTOS HAY QUE REMOVER TODO
            ==============================================*/

            localStorage.removeItem("listaProductos");
            localStorage.removeItem("cantidadCesta");
            localStorage.removeItem("sumaCesta");
            $(".cantidadCesta").html("0");
            $(".sumaCesta").html("0.00");
            $(".cuerpoCarrito").html('<div class="well">No hay productos en el carrito de compras. </div>');
            $(".sumaCarrito").hide();
            $(".cabeceraCheckout").hide();

        }

    }

})

/*============================================
GENERAR SUB-TOTAL DESPUES DE CAMBIAR CANTIDAD
==============================================*/

$(document).on("change", ".cantidadItem", function(){

    var idProducto = $(this).attr("idProducto");
    var cantidad = $(this).val();
    var precio = $(this).attr("precio");
    var item = $(this).attr("item");

    $(".subTotal" + item).html('<strong>USD $ <span>'+ (cantidad * precio).toFixed(2) +'</span></strong>');

    /*========================================
    ACTUALIZAR LA CANTIDAD EN EL LOCAL STORAGE
    ==========================================*/

    var idProducto = $(".cuerpoCarrito button");
    var imagen = $(".cuerpoCarrito img");
    var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
    var precio = $(".cuerpoCarrito .precioCarritoCompra span");
    var cantidad = $(".cuerpoCarrito .cantidadItem");

    listaCarrito = [];

    for(var i = 0; i < idProducto.length; i++){

        var idProductoArray = $(idProducto[i]).attr("idProducto");
        var imagenArray = $(imagen[i]).attr("src");
        var tituloArray = $(titulo[i]).html();
        var precioArray = $(precio[i]).html();
        var pesoArray = $(idProducto[i]).attr("peso");
        var tipoArray = $(cantidad[i]).attr("tipo");
        var cantidadArray = $(cantidad[i]).val();
        

        listaCarrito.push({"idProducto":idProductoArray,
                           "imagen":imagenArray,
                           "titulo":tituloArray,
                           "precio":precioArray,
                           "tipo":tipoArray,
                           "peso":pesoArray,
                           "cantidad":cantidadArray
                        });
    }

    localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));
    $(".cantidadCesta").html(i);
    localStorage.setItem("cantidadCesta", i);
    sumaSubTotales();
    cestaCarrito(listaCarrito.length);

});

/*===========================
SUMA DE TODOS LOS SUB-TOTALES
=============================*/

function sumaSubTotales(){

    var subtotales = $(".subtotales span");
    var arraySumaSubTotales = [];
    
    for(var i = 0; i < subtotales.length; i++){
        var subtotalesArray = $(subtotales[i]).html();
        arraySumaSubTotales.push(Number(subtotalesArray).toFixed(2));
    }

    function sumaArraySubTotales(total, numero){
        return (Number(total) + Number(numero)).toFixed(2);
    }

    var total = arraySumaSubTotales.reduce(sumaArraySubTotales);
    $(".sumaSubTotal").html('<strong>USD $ <span>'+ total +'</span></strong>');
    $(".sumaCesta").html(total);
    localStorage.setItem("sumaCesta", total);

}

/*==================================
ACTUALIZAR CESTA AL CAMBIAR CANTIDAD
====================================*/

function cestaCarrito(cantidadProductos){

    if(cantidadProductos != 0){

        var cantidadItem = $(".cuerpoCarrito .cantidadItem");
        var arraySumaCantidades = [];
    
        for(var i = 0; i < cantidadItem.length; i++){

            var cantidadItemArray = $(cantidadItem[i]).val();
            arraySumaCantidades.push(Number(cantidadItemArray));

        }

        function sumaArrayCantidades(total, numero){
            return total + numero;
        }

        var totalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);
        $(".cantidadCesta").html(totalCantidades);
        localStorage.setItem("cantidadCesta", totalCantidades);

    }
    
}

/*==================================
CHECKOUT
====================================*/

$("#btnCheckout").click(function(){

    $(".listaProductos table.tablaProductos tbody").html("");
    $("#checkPaypal").prop("checked", true);
    $("#checkPayu").prop("checked", false);
    var idUsuario = $(this).attr("idUsuario");
    var peso = $(".cuerpoCarrito button, .comprarAhora button");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra, .comprarAhora .tituloCarritoCompra");
	var cantidad = $(".cuerpoCarrito .cantidadItem, .comprarAhora .cantidadItem");
	var subtotal = $(".cuerpoCarrito .subtotales span, .comprarAhora .subtotales span");
    var tipoArray = [];
    var cantidadPeso = [];

    /*==================================
    SUMA SUBTOTAL
    ====================================*/

    var sumaSubTotal = $(".sumaSubTotal span");
    $(".valorSubTotal").html($(sumaSubTotal).html());
    $(".valorSubTotal").attr("valor", $(sumaSubTotal).html());

    /*==================================
    APLICAR TASA DE IMPUESTO
    ====================================*/

    var impuestoTotal = $(".valorSubTotal").html() * ($("#tasaImpuesto").val() / 100);
    $(".valorTotalImpuesto").html(impuestoTotal.toFixed(2));
    $(".valorTotalImpuesto").attr("valor", impuestoTotal.toFixed(2));
    sumaTotalCompra();

    /*==================================
    SUMA SUBTOTAL
    ====================================*/
    
    for(i = 0; i < peso.length; i++){

        var pesoArray = $(peso[i]).attr("peso");
        var tituloArray = $(titulo[i]).html();
        var cantidadArray = $(cantidad[i]).val();
        var subtotalArray = $(subtotal[i]).html();

        /*======================================
        EVALUAR EL PESO DE ACUERDO A LA CANTIDAD
        ========================================*/

        cantidadPeso[i] = (pesoArray * cantidadArray);
        
        function sumaArrayPeso(total, numero){
            return total + numero;
        }

        var totalPeso = cantidadPeso.reduce(sumaArrayPeso);

        /*=====================================
        MOSTRAR PRODUCTOS A COMPRAR EN LA TABLA
        =======================================*/

        $(".listaProductos table.tablaProductos tbody").append('<tr>'+
                                                               '<td class="valorTitulo">'+ tituloArray +'</td>'+
                                                               '<td class="valorCantidad">'+ cantidadArray +'</td>'+
                                                               '<td>$<span class="valorItem" valor="'+ subtotalArray +'">'+ subtotalArray +'</span></td>'+
                                                               '</tr>');

        /*======================================
        LLENAR EL SELECT CON LOS PAISES
        ========================================*/

        tipoArray.push($(cantidad[i]).attr("tipo"));
        
        function checkTipo(tipo){

            return tipo == "fisico";

        }

    }

    /*======================================
    EXISTEN PRODUCTOS FISICOS
    ========================================*/

    if(tipoArray.find(checkTipo) == "fisico"){

        $(".seleccionePais").html(
            
            '<select class="form-control" id="seleccionarPais" required>'+
                                    
                '<option value="">Seleccione el país</option>'+
                                    
            '</select>'
        
        );

        $(".formEnvio").show();
        $(".btnPagar").attr("tipo","fisico");

        $.ajax({
            url:rutaOculta+"vistas/js/plugins/countries.json",
            type:"GET",
            cache:false,
            contentType:false,
            processData:false,
            dataType:"json",
            success: function(respuesta){
                
                respuesta.forEach(seleccionarPais);

                function seleccionarPais(item,index){

                    var codPais = item.code;
                    var pais = item.name;
                    $("#seleccionarPais").append('<option value="'+ codPais +'">'+ pais +'</option>');

                }
            }
        })

        /*============================================
        EVALUAR TASA DE ENVIO SI EL PRODUCTO ES FISICO
        ==============================================*/

        $("#seleccionarPais").change(function(){

            $(".alert").remove();

            var pais = $(this).val();
            var tasaPais = $("#tasaPais").val();

            if(pais == tasaPais){

                var resultadoPeso = totalPeso * $("#envioNacional").val();

                if(resultadoPeso < $("#tasaMinimaNal").val()){

                    $(".valorTotalEnvio").html($("#tasaMinimaNal").val());
                    $(".valorTotalEnvio").attr("valor", $("#tasaMinimaNal").val());

                }else{

                    $(".valorTotalEnvio").html(resultadoPeso);
                    $(".valorTotalEnvio").attr("valor", resultadoPeso);

                }

            }else{

                var resultadoPeso = totalPeso * $("#envioInternacional").val();

                if(resultadoPeso < $("#tasaMinimaInt").val()){

                    $(".valorTotalEnvio").html($("#tasaMinimaInt").val());
                    $(".valorTotalEnvio").attr("valor", $("#tasaMinimaInt").val());

                }else{

                    $(".valorTotalEnvio").html(resultadoPeso);
                    $(".valorTotalEnvio").attr("valor", resultadoPeso);

                }

            }

            /*============================================
            RETORNAR EL CAMBIO DE DIVISA A USD
            ==============================================*/

            $("#cambiarDivisa").val("USD");
            $(".cambioDivisa").html("USD");
            $(".valorSubTotal").html(( 1 * Number($(".valorSubTotal").attr("valor"))).toFixed(2));
            $(".valorTotalEnvio").html(( 1 * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
            $(".valorTotalImpuesto").html(( 1 * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
            $(".valorTotalCompra").html(( 1 * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));

            var valorItem = $(".valorItem");

            for(i = 0; i < valorItem.length; i++){

                $(valorItem[i]).html(( 1  * Number($(valorItem[i]).attr("valor"))).toFixed(2));
    
            }

            sumaTotalCompra();

        })

    }else{

        $(".btnPagar").attr("tipo", "virtual");

    }

})

/*==============================================
TOTAL DE LA COMPRA (SUBTOTAL + ENVÍO + IMPUESTO)
================================================*/

function sumaTotalCompra(){

    var sumaTotalTasas = Number($(".valorSubTotal").html()) + Number($(".valorTotalEnvio").html()) + Number($(".valorTotalImpuesto").html());
    $(".valorTotalCompra").html(sumaTotalTasas.toFixed(2));
    $(".valorTotalCompra").attr("valor", sumaTotalTasas.toFixed(2));
    localStorage.setItem("total", hex_md5($(".valorTotalCompra").html()));
}

/*==============================================
METODO DE PAGO PARA CAMBIO DE DIVISA
================================================*/

//var metodoPago = $("paypal").val();
var metodoPago = "paypal";
divisas(metodoPago);

$("input[name='pago']").change(function(){

    var metodoPago = $(this).val();
    divisas(metodoPago);

    if(metodoPago == "paypal"){
        $(".btnPagar").show();
        $(".formPayu").hide();
    }else{
        $(".btnPagar").hide();
        $(".formPayu").show();
        pagarConPayu();
    }

})

/*==============================================
FUNCION PARA SELECCIONAR DIVISA
================================================*/

function divisas(metodoPago){

    $("#cambiarDivisa").html("");

    if(metodoPago == "paypal"){

        $("#cambiarDivisa").append(
            '<option value="USD">(USD) DÓLAR AMERICANO</option>'+
            '<option value="CAD">(CAD) DÓLAR CANADIENSE</option>'+
            '<option value="EUR">(EUR) EURO</option>'+
            '<option value="GBP">(GBP) LIBRA ESTERLINA</option>'+
            '<option value="MXN">(MXN) PESO MEXICANO</option>' + 
            '<option value="BRL">(BRL) REAL BRASILEÑO</option>'
        );
        
    }else{

        $("#cambiarDivisa").append(
            '<option value="USD">(USD) DÓLAR AMERICANO</option>' + 
            '<option value="PEN">(PEN) NUEVO SOL PERUANO</option>' +
            '<option value="ARS">(ARS) PESO ARGENTINO</option>' + 
            '<option value="COP">(COP) PESO COLOMBIANO</option>' +
            '<option value="CLP">(CLP) PESO CHILENO</option>' +
            '<option value="MXN">(MXN) PESO MEXICANO</option>' +
            '<option value="BRL">(BRL) REAL BRASILEÑO</option>'
        );
    
    }
}

/*==============================================
CAMBIO DE DIVISA
================================================*/

var divisaBase = "USD";

$("#cambiarDivisa").change(function(){

    $(".alert").remove();

    if($("#seleccionarPais").val() == ""){

        $("#cambiarDivisa").before('<div class="alert alert-warning">Seleccione el país de envío</div>');

        return;

    }
    
    var divisa = $(this).val();
    var valor = 0;

    switch (divisa) {

        case "USD":
            valor = 1;
            console.log(divisa + " = " + valor);
        break;

        case "CAD":
            valor = 1.32;
            console.log(divisa + " = " + valor);
        break;

        case "EUR":
            valor = 0.85;
            console.log(divisa + " = " + valor);
        break;

        case "GBP":
            valor = 0.77;
            console.log(divisa + " = " + valor);
        break;

        case "MXN":
            valor = 21.05;
            console.log(divisa + " = " + valor);
        break;

        case "BRL":
            valor = 5.71;
            console.log(divisa + " = " + valor);
        break;

        case "PEN":
            valor = 3.62;
            console.log(divisa + " = " + valor);
        break;
        
        case "ARS":
            valor = 78.31;
            console.log(divisa + " = " + valor);
        break;

        case "COP":
            valor = 3809.60;
            console.log(divisa + " = " + valor);
        break;

        case "CLP":
            valor = 773.00;
            console.log(divisa + " = " + valor);
        break;
    }

    $(".cambioDivisa").html(divisa);
    $(".valorSubTotal").html((Number(valor) * Number($(".valorSubTotal").attr("valor"))).toFixed(2));
    $(".valorTotalEnvio").html((Number(valor) * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
    $(".valorTotalImpuesto").html((Number(valor) * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
    $(".valorTotalCompra").html((Number(valor) * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));

    var valorItem = $(".valorItem");
    localStorage.setItem("total", hex_md5($(".valorTotalCompra").html()));
    
    for(i = 0; i < valorItem.length; i++){

        $(valorItem[i]).html((Number(valor) * Number($(valorItem[i]).attr("valor"))).toFixed(2));
        
    }

    // $.ajax({

    //     //url: "https://free.currencyconverterapi.com/api/v3/convert?q=" + divisaBase + "_" + divisa + "&compaty=y",
    //     //url: "https://free.currconv.com/api/v7/convert?q="+divisaBase+"_"+divisa+"&compact=ultra&apiKey=a01ebaf9a1c69eb4ff79",
    //     url: "https://api.currconv.com/api/v7/convert?q=" + divisaBase + "_" + divisa + "&compact=ultra&apiKey=a83bf3b34f26262438db",
    //     type:"GET",
	// 	   cache: false,
	//     contentType: false,
	//     processData: false, // para el cruce de origen cuando traemos información que se encuentra en otro servidor
	//     dataType:"jsonp",
    //     success: function(respuesta){

    //         var divisaString = JSON.stringify(respuesta);
    //         var conversion = divisaString.substr(18,4); // según el formato que trae el Json, se quitan 18 caracteres a la izquierda y se dejan solo 4 caracteres
            
    //         $(".cambioDivisa").html(divisa);

    //         $(".valorSubTotal").html((Number(conversion) * Number($(".valorSubTotal").attr("valor"))).toFixed(2));
    //         $(".valorTotalEnvio").html((Number(conversion) * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
    //         $(".valorTotalImpuesto").html((Number(conversion) * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
    //         $(".valorTotalCompra").html((Number(conversion) * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));

    //         var valorItem = $(".valorItem");

    //         for(i = 0; i < valorItem.length; i++){

    //             $(valorItem[i]).html((Number(conversion) * Number($(valorItem[i]).attr("valor"))).toFixed(2));

    //         }

    //     }
    // })

})

/*==============================================
BOTON PAGAR
================================================*/

$(".btnPagar").click(function(){

    var tipo = $(this).attr("tipo");

    if(tipo == "fisico" && $("#seleccionarPais").val() == ""){

        $(".btnPagar").before('<div class="alert alert-warning">No ha seleccionado el país de envío</div>');
        return;

    }

    var divisa = $("#cambiarDivisa").val();
    var total = $(".valorTotalCompra").html();
    var totalEncriptado = localStorage.getItem("total");
    var impuesto = $(".valorTotalImpuesto").html();
    var envio = $(".valorTotalEnvio").html();
    var subtotal = $(".valorSubTotal").html();
    var titulo = $(".valorTitulo");
    var cantidad = $(".valorCantidad");
    var valorItem = $(".valorItem");
    var idProducto = $('.cuerpoCarrito button, .comprarAhora button');
    var tituloArray = [];
    var cantidadArray = [];
    var valorItemArray = [];
    var idProductoArray = [];

    for(i = 0; i < titulo.length; i++){

        tituloArray[i] = $(titulo[i]).html();
        cantidadArray[i] = $(cantidad[i]).html();
        valorItemArray[i] = $(valorItem[i]).html();
        idProductoArray[i] = $(idProducto[i]).attr("idProducto");

    }

    var datos = new FormData();
	datos.append("divisa", divisa);
    datos.append("total",total);
    datos.append("totalEncriptado",totalEncriptado);
	datos.append("impuesto",impuesto);
	datos.append("envio",envio);
	datos.append("subtotal",subtotal);
	datos.append("tituloArray",tituloArray);
	datos.append("cantidadArray",cantidadArray);
	datos.append("valorItemArray",valorItemArray);
	datos.append("idProductoArray",idProductoArray);

    // console.log("divisa:", divisa);
    // console.log("total:", total);
    // console.log("impuesto:", impuesto);
    // console.log("envio:", envio);
    // console.log("subtotal:", subtotal);
    // console.log("titulo:", titulo);
    // console.log("cantidad:", cantidad);
    // console.log("valorItem:", valorItem);
    // console.log("idProducto:", idProducto);
    // console.log("tituloArray:", tituloArray);
    // console.log("cantidadArray:", cantidadArray);
    // console.log("valorItemArray:", valorItemArray);
    // console.log("idProductoArray:", idProductoArray);
    
    $.ajax({

        url:rutaOculta + "ajax/carrito.ajax.php",
		method:"POST",
		data: datos,
		cache: false,
        contentType: false,
        processData: false,
        success:function(respuesta){

            //console.log(respuesta);
            window.location = respuesta;

        }

    })

})

/*=============================================
BOTÓN PAGAR PAYU
=============================================*/

function pagarConPayu(){

	if($("#seleccionarPais").val() == ""){

		$(".formPayu").before('<div class="alert alert-warning">No ha seleccionado el país de envío</div>');
		$(".formPayu input[name='Submit']").attr("type","button");
		return;

	}

	var divisa = $("#cambiarDivisa").val();
	var total = $(".valorTotalCompra").html();
	var impuesto = $(".valorTotalImpuesto").html();
	var envio = $(".valorTotalEnvio").html();
	var subtotal = $(".valorSubtotal").html();
	var titulo = $(".valorTitulo");
	var cantidad = $(".valorCantidad");
	var valorItem = $(".valorItem");
	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');
	var tituloArray = [];
	var cantidadArray = [];
	var idProductoArray = [];
	var valorItemArray = [];

	for(var i = 0; i < titulo.length; i++){

		tituloArray[i] = $(titulo[i]).html();
		cantidadArray[i] = $(cantidad[i]).html();
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");
		valorItemArray[i] = $(valorItem[i]).html();

	}

	var valorItemString = valorItemArray.toString();
	var pago = valorItemString.replace(",","-");
    
	var datos = new FormData();
	datos.append("metodoPago", "payu");
	datos.append("cantidadArray",cantidadArray);
	datos.append("valorItemArray",valorItemArray);
	datos.append("idProductoArray",idProductoArray);
	datos.append("divisaPayu", divisa);

	if(hex_md5(total) == localStorage.getItem("total")){

		$.ajax({
            url:rutaOculta+"ajax/carrito.ajax.php",
            method:"POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success:function(respuesta){
	          
                var merchantId = JSON.parse(respuesta).merchantIdPayu;
                var accountId = JSON.parse(respuesta).accountIdPayu;
                var apiKey = JSON.parse(respuesta).apiKeyPayu;
                var modo = JSON.parse(respuesta).modoPayu;
                var description = tituloArray.toString();
                var referenceCode = (Number(Math.ceil(Math.random()*1000000))+Number(total).toFixed());
                var productosToString = idProductoArray.toString();
                var productos = productosToString.replace(/,/g, "-");
                var cantidadToString = cantidadArray.toString();
                var cantidad = cantidadToString.replace(/,/g, "-");
                var signature = hex_md5(apiKey+"~"+merchantId+"~"+referenceCode+"~"+total+"~"+divisa);
            
                if(divisa == "COP"){

                    var taxReturnBase = (total - impuesto).toFixed(2)

                }else{

                    var taxReturnBase = 0;

                }        

                if(modo == "sandbox"){

                    var url = "https://sandbox.gateway.payulatam.com/ppp-web-gateway/";
                    var test = 1;

                }else{

                    var url = "https://gateway.payulatam.com/ppp-web-gateway/";
                    var test = 0;

                }

                if(envio != 0){

                    var tipoEnvio = "YES";
                
                }else{

                    var tipoEnvio = "NO";
                }

                $(".formPayu").attr("method","POST");
                $(".formPayu").attr("action",url);
                $(".formPayu input[name='merchantId']").attr("value", merchantId);
                $(".formPayu input[name='accountId']").attr("value", accountId);
                $(".formPayu input[name='description']").attr("value", description);
                $(".formPayu input[name='referenceCode']").attr("value", referenceCode);
                $(".formPayu input[name='amount']").attr("value", total);
                $(".formPayu input[name='tax']").attr("value", impuesto);
                $(".formPayu input[name='taxReturnBase']").attr("value", taxReturnBase);
                $(".formPayu input[name='shipmentValue']").attr("value", envio);
                $(".formPayu input[name='currency']").attr("value", divisa);
                $(".formPayu input[name='responseUrl']").attr("value", rutaOculta+"index.php?ruta=finalizar-compra&payu=true&productos="+productos+"&cantidad="+cantidad+"&pago="+pago);
                $(".formPayu input[name='declinedResponseUrl']").attr("value", rutaOculta+"carrito-de-compras");
                $(".formPayu input[name='displayShippingInformation']").attr("value", tipoEnvio);
                $(".formPayu input[name='test']").attr("value", test);
                $(".formPayu input[name='signature']").attr("value", signature);

                /*=============================================
                GENERADOR DE TARJETAS DE CRÉDITO
                http://www.elfqrin.com/discard_credit_card_generator.php
                =============================================*/

	        }
        })
      
    }
    
}

/*=============================================
AGREGAR PRODUCTOS GRATIS
=============================================*/

$(".agregarGratis").click(function(){

    var idUsuario = $(this).attr("idUsuario");
    var idProducto = $(this).attr("idProducto");
    var tipo = $(this).attr("tipo");
    var titulo = $(this).attr("titulo").trim();
    var agregarGratis = false;

    /*=================================================
    VERIFICAR QUE EL PRODUCTOS GRATIS NO ESTE ADQUIRIDO
    ===================================================*/

    var datos = new FormData();
    datos.append("idUsuario", idUsuario);
    datos.append("idProducto", idProducto);

    $.ajax({
        url:rutaOculta + "ajax/carrito.ajax.php",
        method:"POST",
        data:datos,
        cache:false,
        contentType:false,
        processData:false,
        success:function(respuesta){

            if(respuesta == "existe") {

                swal({
                    title: "Usted ya adquirió este producto!",
                    text: "",
                    type: "warning",
                    showCancelButton:false,
                    confirmButtonColor:'#DD6B55',
                    confirmButtonText: "Regresar",
                    closeOnConfirm: false  
                })
        
            }else{

                if(tipo == "virtual"){

                    agregarGratis = true;
            
                }else{
            
                    var talla = $("#seleccionarTalla").val();
                    var color = $("#seleccionarColor").val();
            
                    if((talla == "") || (color == "")){
            
                        swal({
                            title: "Debe seleccionar Talla y Color",
                            text: "",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "¡Seleccionar!",
                            closeConfirm: false
                        })
            
                    }else{
            
                        color = color[0].toUpperCase() + color.slice(1);
                        titulo = titulo + " - " + talla + " - " + color;
                        agregarGratis = true;
            
                    }
                    
                }

            }

            if(agregarGratis){

                window.location = rutaOculta + "index.php?ruta=finalizar-compra&gratis=true&producto=" + idProducto + "&titulo=" + titulo;

            }          

        }

    })

})