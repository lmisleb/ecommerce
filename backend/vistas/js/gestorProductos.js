/*=============================================
    CARGAR LA TABLA DINÁMICA DE PRODUCTOS
=============================================*/

$.ajax({

    url:"ajax/tablaProductos.ajax.php",
    success:function(respuesta){
        
        //console.log("respuesta", respuesta);

    }

})

$('.tablaProductos').DataTable({

    "ajax":"ajax/tablaProductos.ajax.php",
    "deferRender": true,
    "retrieve": true,
    "processing": true,
    "language": {

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "No hay datos disponible en esta tabla ...",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

    }

});

/*=============================================
    ACTIVAR PRODUCTO
=============================================*/

$('.tablaProductos tbody').on("click", ".btnActivar", function(){

    var idProducto = $(this).attr("idProducto");
    var estadoProducto = $(this).attr("estadoProducto");
    var datos = new FormData();
    datos.append("activarId", idProducto);
    datos.append("activarProducto", estadoProducto);

    $.ajax({

        url:"ajax/productos.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success: function(respuesta){    
            
            //console.log("respuesta", respuesta);

        }

    })

    if(estadoProducto == 0){

        $(this).removeClass('btn-success');
        $(this).addClass('btn-danger');
        $(this).html('Desactivado');
        $(this).attr('estadoProducto',1);

    }else{

        $(this).addClass('btn-success');
        $(this).removeClass('btn-danger');
        $(this).html('Activado');
        $(this).attr('estadoProducto',0);

    }

})

/*=================================================
    REVISAR SI EL TITULO DEL PRODUCTO YA EXISTE
===================================================*/

$(".validarProducto").change(function(){

    $(".alert").remove();
    var datos = new FormData();
    datos.append("validarProducto", $(this).val());

    $.ajax({

        url:"ajax/productos.ajax.php",
        method:"POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success:function(respuesta){

            if(respuesta.length != 0){

                $(".validarProducto").parent().after('<div class="alert alert-warning">Este título de producto ya existe en la base de datos ...</div>');
                $(".validarProducto").val("");

            }

        }

    })

})

/*=============================================
    RUTA PRODUCTO
=============================================*/

function limpiarUrl(texto){

    var texto = texto.toLowerCase(); 
    texto = texto.replace(/[á]/, 'a');
    texto = texto.replace(/[é]/, 'e');
    texto = texto.replace(/[í]/, 'i');
    texto = texto.replace(/[ó]/, 'o');
    texto = texto.replace(/[ú]/, 'u');
    texto = texto.replace(/[ñ]/, 'n');
    texto = texto.replace(/ /g, "-")
    return texto;

}

$(".tituloProducto").change(function(){

    $(".rutaProducto").val(limpiarUrl($(".tituloProducto").val()));

})

/*=============================================
    AGREGAR MULTIMEDIA
=============================================*/

var tipo = null;

$(".seleccionarTipo").change(function(){

    tipo = $(this).val();

    if(tipo == "virtual"){

        $(".multimediaVirtual").show();
        $(".multimediaFisica").hide();
        $(".detallesVirtual").show();
        $(".detallesFisicos").hide();
    
    }else{

        $(".multimediaFisica").show();
        $(".multimediaVirtual").hide();
        $(".detallesFisicos").show();
        $(".detallesVirtual").hide();	

    }
})

/*=============================================
    AGREGAR MULTIMEDIA CON DROPZONE
=============================================*/

var arrayFiles = [];

$(".multimediaFisica").dropzone({

    url: "/",
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg, image/png",
    maxFilesize: 2,
    maxFiles: 10,
    init: function(){

        this.on("addedfile", function(file){

            arrayFiles.push(file);

            // console.log("arrayFiles", arrayFiles);

        })

        this.on("removedfile", function(file){

            var index = arrayFiles.indexOf(file);

            arrayFiles.splice(index, 1);

            // console.log("arrayFiles", arrayFiles);

        })

    }

})

/*=============================================
    SELECCIONAR CATEGORÍA
=============================================*/

$(".seleccionarCategoria").change(function(){

    $(".seleccionarSubCategoria").html("");
    $("#modalEditarProducto .seleccionarSubCategoria").html("");
    var datos = new FormData();
    datos.append("idCategoria", $(this).val());

    $.ajax({

        url:"ajax/subCategorias.ajax.php",
        method:"POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success:function(respuesta){
            
            // console.log("respuesta", respuesta);

            $(".entradaSubcategoria").show();

            respuesta.forEach(funcionForEach);

            function funcionForEach(item, index){

                $(".seleccionarSubCategoria").append(

                    '<option value="'+item["id"]+'">'+item["subcategoria"]+'</option>'

                )

            }

        }

    })

})

/*=============================================
    SUBIENDO LA FOTO DE PORTADA
=============================================*/

var imagenPortada = null;

$(".fotoPortada").change(function(){

    imagenPortada = this.files[0];
    
    /*=====================================================
        VALIDAMOS EL FORMATO DE LA IMAGEN SEA JPG O PNG
    =======================================================*/

    if(imagenPortada["type"] != "image/jpeg" && imagenPortada["type"] != "image/png"){

        $(".fotoPortada").val("");

        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen debe estar en formato JPG o PNG!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

    }else if(imagenPortada["size"] > 2000000){

        $(".fotoPortada").val("");

        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen no debe pesar más de 2MB!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

    }else{

        var datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagenPortada);

        $(datosImagen).on("load", function(event){

            var rutaImagen = event.target.result;
            $(".previsualizarPortada").attr("src", rutaImagen);

        })

    }

})

/*=============================================
    SUBIENDO LA FOTO PRINCIPAL
=============================================*/

var imagenFotoPrincipal = null;

$(".fotoPrincipal").change(function(){

    imagenFotoPrincipal = this.files[0];
    
    /*====================================================
        VALIDAMOS EL FORMATO DE LA IMAGEN SEA JPG O PNG
    ======================================================*/

    if(imagenFotoPrincipal["type"] != "image/jpeg" && imagenFotoPrincipal["type"] != "image/png"){

        $(".fotoPrincipal").val("");

        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen debe estar en formato JPG o PNG!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

    }else if(imagenFotoPrincipal["size"] > 2000000){

        $(".fotoPrincipal").val("");

        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen no debe pesar más de 2MB!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

    }else{

        var datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagenFotoPrincipal);

        $(datosImagen).on("load", function(event){

            var rutaImagen = event.target.result;
            $(".previsualizarPrincipal").attr("src", rutaImagen);

        })

    }

})

/*=============================================
    ACTIVAR OFERTA
=============================================*/

function activarOferta(event){

    if(event == "oferta"){

        $(".datosOferta").show();
        $(".valorOferta").prop("required",true);
        $(".valorOferta").val("");

    }else{

        $(".datosOferta").hide();
        $(".valorOferta").prop("required",false);
        $(".valorOferta").val("");

    }
}

$(".selActivarOferta").change(function(){

    activarOferta($(this).val())

})

/*=============================================
    VALOR OFERTA
=============================================*/

$("#modalAgregarProducto .valorOferta").change(function(){

    if($(".precio").val()!= 0){

        if($(this).attr("tipo") == "oferta"){

            var descuento = 100 - (Number($(this).val())*100/Number($(".precio").val()));
            $(".precioOferta").prop("readonly",true);
            $(".descuentoOferta").prop("readonly",false);
            $(".descuentoOferta").val(Math.ceil(descuento));	

        }

        if($(this).attr("tipo") == "descuento"){

            var oferta = Number($(".precio").val())-(Number($(this).val())*Number($(".precio").val())/100);
            $(".descuentoOferta").prop("readonly",true);
            $(".precioOferta").prop("readonly",false);
            $(".precioOferta").val(oferta);

        }

    }else{

        swal({
            title: "Error al agregar la oferta",
            text: "¡Primero agregue un precio al producto!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

        $(".precioOferta").val(0);
        $(".descuentoOferta").val(0);
        return;

    }

})

/*=============================================
    CAMBIAR EL PRECIO
=============================================*/

$(".precio").change(function(){

    $(".precioOferta").val(0);
    $(".descuentoOferta").val(0);

})

/*=============================================
    SUBIENDO LA FOTO DE LA OFERTA
=============================================*/

var imagenOferta = null;

$(".fotoOferta").change(function(){

    imagenOferta = this.files[0];
    
    /*=====================================================
        VALIDAMOS EL FORMATO DE LA IMAGEN SEA JPG O PNG
    =======================================================*/

    if(imagenOferta["type"] != "image/jpeg" && imagenOferta["type"] != "image/png"){

        $(".fotoOferta").val("");

        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen debe estar en formato JPG o PNG!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

    }else if(imagenOferta["size"] > 2000000){

        $(".fotoOferta").val("");

        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen no debe pesar más de 2MB!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

    }else{

        var datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagenOferta);

        $(datosImagen).on("load", function(event){

            var rutaImagen = event.target.result;
            $(".previsualizarOferta").attr("src", rutaImagen);

        })

    }

})

/*=============================================
    GUARDAR EL PRODUCTO
=============================================*/

var multimediaFisica = null;
var multimediaVirtual = null;	

$(".guardarProducto").click(function(){

    /*==========================================================
        PREGUNTAMOS SI LOS CAMPOS OBLIGATORIOS ESTÁN LLENOS
    ============================================================*/

    if($(".tituloProducto").val() != "" && $(".seleccionarTipo").val() != "" && $(".seleccionarCategoria").val() != "" && $(".seleccionarSubCategoria").val() != "" && $(".descripcionProducto").val() != "" && $(".pClavesProducto").val() != ""){

        /*=====================================================================
            PREGUNTAMOS SI VIENEN IMÁGENES PARA MULTIMEDIA O LINK DE YOUTUBE
        =======================================================================*/

        if(tipo != "virtual"){

            if(arrayFiles.length > 0 && $(".rutaProducto").val() != ""){

                var listaMultimedia = [];
                var finalFor = 0;

                for(var i = 0; i < arrayFiles.length; i++){

                    var datosMultimedia = new FormData();
                    datosMultimedia.append("file", arrayFiles[i]);
                    datosMultimedia.append("ruta", $(".rutaProducto").val());

                    $.ajax({

                        url:"ajax/productos.ajax.php",
                        method: "POST",
                        data: datosMultimedia,
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function(){

                            $(".modal-footer .preload").html(`

                                <center>

                                    <img src="vistas/img/plantilla/status.gif" id="status" />
                                    <br>

                                </center>

                            `);

                        },

                        success: function(respuesta){

                            $("#status").remove();
                            
                            listaMultimedia.push({"foto" : respuesta.substr(3)})
                            multimediaFisica = JSON.stringify(listaMultimedia);
                            multimediaVirtual = null;

                            if(multimediaFisica == null){

                                swal({
                                    title: "El campo de multimedia no debe estar vacío",
                                    type: "error",
                                    confirmButtonText: "¡Cerrar!"
                                });

                                return;

                            }

                            if((finalFor + 1) == arrayFiles.length){

                                agregarMiProducto(multimediaFisica);
                                finalFor = 0;

                            }

                            finalFor++;

                        }

                    })

                }

            }

        }else{

            multimediaVirtual = $(".multimedia").val();
            multimediaFisica = null;

            if(multimediaVirtual == null){	

                swal({
                    title: "El campo de multimedia no debe estar vacío",
                    type: "error",
                    confirmButtonText: "¡Cerrar!"
                });

                return;
        
            }

            agregarMiProducto(multimediaVirtual);		

        }

    }else{

        swal({
            title: "Llenar todos los campos obligatorios",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });

        return;
    }

})

function agregarMiProducto(imagen){

    /*===============================================
        ALMACENAMOS TODOS LOS CAMPOS DE PRODUCTO
    =================================================*/

    var tituloProducto = $(".tituloProducto").val();
    var rutaProducto = $(".rutaProducto").val();
    var seleccionarTipo = $(".seleccionarTipo").val();
    var seleccionarCategoria = $(".seleccionarCategoria").val();
    var seleccionarSubCategoria = $(".seleccionarSubCategoria").val();
    var descripcionProducto = $(".descripcionProducto").val();
    var pClavesProducto = $(".pClavesProducto").val();
    var precio = $(".precio").val();
    var peso = $(".peso").val();
    var entrega = $(".entrega").val();
    var selActivarOferta = $(".selActivarOferta").val();
    var precioOferta = $(".precioOferta").val();
    var descuentoOferta = $(".descuentoOferta").val();
    var finOferta = $(".finOferta").val();

    if(seleccionarTipo == "virtual"){

        var detalles = {"Clases": $(".detalleClases").val(),
                        "Tiempo": $(".detalleTiempo").val(),
                        "Nivel": $(".detalleNivel").val(),
                        "Acceso": $(".detalleAcceso").val(),
                        "Dispositivo": $(".detalleDispositivo").val(),
                        "Certificado": $(".detalleCertificado").val()};

    }else{

        var detalles = {"Talla": $(".detalleTalla").tagsinput('items'),
                        "Color": $(".detalleColor").tagsinput('items'),
                        "Marca": $(".detalleMarca").tagsinput('items')};

    }

    var detallesString = JSON.stringify(detalles);
    var datosProducto = new FormData();
    datosProducto.append("tituloProducto", tituloProducto);
    datosProducto.append("rutaProducto", rutaProducto);
    datosProducto.append("seleccionarTipo", seleccionarTipo);	
    datosProducto.append("detalles", detallesString);	
    datosProducto.append("seleccionarCategoria", seleccionarCategoria);
    datosProducto.append("seleccionarSubCategoria", seleccionarSubCategoria);
    datosProducto.append("descripcionProducto", descripcionProducto);
    datosProducto.append("pClavesProducto", pClavesProducto);
    datosProducto.append("precio", precio);
    datosProducto.append("peso", peso);
    datosProducto.append("entrega", entrega);	
    datosProducto.append("multimedia", imagen);
    datosProducto.append("fotoPortada", imagenPortada);
    datosProducto.append("fotoPrincipal", imagenFotoPrincipal);
    datosProducto.append("selActivarOferta", selActivarOferta);
    datosProducto.append("precioOferta", precioOferta);
    datosProducto.append("descuentoOferta", descuentoOferta);
    datosProducto.append("finOferta", finOferta);
    datosProducto.append("fotoOferta", imagenOferta);

    $.ajax({

        url:"ajax/productos.ajax.php",
        method: "POST",
        data: datosProducto,
        cache: false,
        contentType: false,
        processData: false,
        success: function(respuesta){
            
            //console.log("respuesta", respuesta);

            if(respuesta == "ok"){

                swal({

                    type: "success",
                    title: "El producto ha sido guardado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar"

                }).then(function(result){

                    if (result.value) {

                        window.location = "productos";

                    }

                })

            }

        }

    })

}

/*=============================================
    EDITAR PRODUCTO
=============================================*/

$('.tablaProductos tbody').on("click", ".btnEditarProducto", function(){
    
    $(".previsualizarImgFisico").html("");

    var idProducto = $(this).attr("idProducto");
    var datos = new FormData();
    datos.append("idProducto", idProducto);

    $.ajax({

        url:"ajax/productos.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(producto){

            //console.log("respuesta", respuesta);
            
            $("#modalEditarProducto .idProducto").val(producto[0]["id"]);
            $("#modalEditarProducto .tituloProducto").val(producto[0]["titulo"]);
            $("#modalEditarProducto .rutaProducto").val(producto[0]["ruta"]);

            /*=============================================
                TRAER EL TIPO DE PRODUCTO
            =============================================*/

            $("#modalEditarProducto .seleccionarTipo").val(producto[0]["tipo"]);

            /*=============================================
                CUANDO EL PRODUCTO ES VIRTUAL
            =============================================*/

            if(producto[0]["tipo"] == "virtual"){
        
                $(".multimediaVirtual").show();
                $(".multimediaFisica").hide();
                $("#modalEditarProducto .multimedia").val(producto[0]["multimedia"]);
                $(".detallesVirtual").show();
                $(".detallesFisicos").hide();

                var detalles = JSON.parse(producto[0]["detalles"]);
                
                $("#modalEditarProducto .detalleClases").val(detalles.Clases);
                $("#modalEditarProducto .detalleTiempo").val(detalles.Tiempo);
                $("#modalEditarProducto .detalleNivel").val(detalles.Nivel);
                $("#modalEditarProducto .detalleAcceso").val(detalles.Acceso);
                $("#modalEditarProducto .detalleDispositivo").val(detalles.Dispositivo);
                $("#modalEditarProducto .detalleCertificado").val(detalles.Certificado);

                /*=============================================
                    CUANDO EL PRODUCTO ES FÍSICO
                =============================================*/
            
            }else{

                $(".multimediaVirtual").hide();
                $(".multimediaFisica").show();

                if(producto[0]["multimedia"] != ""){

                    var imagenesMultimedia = JSON.parse(producto[0]["multimedia"]);
                    
                    for(var i = 0; i < imagenesMultimedia.length; i++){

                        $(".previsualizarImgFisico").append(

                            '<div class="col-md-3">'+

                                '<div class="thumbnail text-center">'+

                                    '<img class="imagenesRestantes" src="'+imagenesMultimedia[i].foto+'" style="width:100%">'+

                                    '<div class="removerImagen" style="cursor:pointer">Remove file</div>'+

                                '</div>'+

                            '</div>'

                        );

                        localStorage.setItem("multimediaFisica", JSON.stringify(imagenesMultimedia));

                    }		

                    /*==============================================
                        CUANDO ELIMINAMOS UNA IMAGEN DE LA LISTA
                    ================================================*/

                    $(".removerImagen").click(function(){

                        $(this).parent().parent().remove();

                        var imagenesRestantes = $(".imagenesRestantes");
                        var arrayImgRestantes = [];

                        for(var i = 0; i < imagenesRestantes.length; i++){

                            arrayImgRestantes.push({"foto":$(imagenesRestantes[i]).attr("src")})
                            
                        }

                        localStorage.setItem("multimediaFisica", JSON.stringify(arrayImgRestantes));
                        
                    })

                }

                $(".detallesVirtual").hide();
                $(".detallesFisicos").show();

                var detalles = JSON.parse(producto[0]["detalles"]);

                $(".editarTalla").html(

                    '<input class="form-control input-lg tagsInput detalleTalla" value="'+detalles.Talla+'" data-role="tagsinput" type="text" style="padding:20px">'

                )

                $("#modalEditarProducto .detalleTalla").tagsinput('items');

                $(".editarColor").html(

                    '<input class="form-control input-lg tagsInput detalleColor" value="'+detalles.Color+'" data-role="tagsinput" type="text" style="padding:20px">'

                )

                $("#modalEditarProducto .detalleColor").tagsinput('items');

                $(".editarMarca").html(

                    '<input class="form-control input-lg tagsInput detalleMarca" value="'+detalles.Marca+'" data-role="tagsinput" type="text" style="padding:20px">'

                )

                $("#modalEditarProducto .detalleMarca").tagsinput('items');

                $(".bootstrap-tagsinput").css({"padding":"12px",
                                               "width":"110%"})
            
            }

            /*===================================================================
                POSICIONARSE EN LA CATEGORIA DESPUES QUE EL SELECT ESTA LLENO
            =====================================================================*/

            if(producto[0]["id_categoria"] != 0){
            
                var datosCategoria = new FormData();
                datosCategoria.append("idCategoria", producto[0]["id_categoria"]);

                $.ajax({

                    url:"ajax/categorias.ajax.php",
                    method: "POST",
                    data: datosCategoria,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function(resCategoria){

                        $("#modalEditarProducto .seleccionarCategoria").val(resCategoria["id"]);
                        $("#modalEditarProducto .optionEditarCategoria").html(resCategoria["categoria"]);

                    }

                })

            }else{

                $("#modalEditarProducto .optionEditarCategoria").html("SIN CATEGORÍA");

            }

            /*=============================================
                LLENAR EL SELECT DE LA SUBCATEGORIA
            =============================================*/

            $("#modalEditarProducto .seleccionarSubCategoria").html("");

            if(producto[0]["id_subcategoria"] != 0){ 

                var datosCategoria = new FormData();
                datosCategoria.append("idCategoria", producto[0]["id_categoria"]);

                $.ajax({

                    url:"ajax/subCategorias.ajax.php",
                    method: "POST",
                    data: datosCategoria,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function(resSubCategoria){

                        resSubCategoria.forEach(funcionForEach);

                        function funcionForEach(item, index){

                            //console.log("a[" + index + "] = " + item["subcategoria"]);
                            
                            $("#modalEditarProducto .seleccionarSubCategoria").append('<option value="'+item["id"]+'">'+item["subcategoria"]+'</option>')

                        }

                        var datosSubCategoria = new FormData();
                        datosSubCategoria.append("idSubCategoria", producto[0]["id_subcategoria"]);

                        $.ajax({

                            url:"ajax/subCategorias.ajax.php",
                            method: "POST",
                            data: datosSubCategoria,
                            cache: false,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            success: function(resSubCategoria){

                                $("#modalEditarProducto .seleccionarSubCategoria").val(resSubCategoria[0]["id"]);
                                $("#modalEditarProducto .optionEditarSubCategoria").html(resSubCategoria[0]["subcategoria"]);

                            }

                        })

                    }

                })                

            }else{

                $("#modalEditarProducto .seleccionarSubCategoria").append('<option value="0">SIN SUBCATEGORÍA</option>')

                var datosCategoria = new FormData();
                datosCategoria.append("idCategoria", producto[0]["id_categoria"]);

                $.ajax({

                    url:"ajax/subCategorias.ajax.php",
                    method: "POST",
                    data: datosCategoria,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function(resSubCategoria){

                        resSubCategoria.forEach(funcionForEach);

                        function funcionForEach(item, index){
                            
                            $("#modalEditarProducto .seleccionarSubCategoria").append('<option value="'+item["id"]+'">'+item["subcategoria"]+'</option>')

                        }
                        
                    }

                })

            }

            /*=============================================
                TRAEMOS DATOS DE CABECERA
            =============================================*/

            var datosCabecera = new FormData();
            datosCabecera.append("ruta", producto[0]["ruta"]);

            $.ajax({

                url:"ajax/cabeceras.ajax.php",
                method: "POST",
                data: datosCabecera,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function(resCabecera){

                    /*=============================================
                        CARGAMOS EL ID DE LA CABECERA
                    =============================================*/

                    $("#modalEditarProducto .idCabecera").val(resCabecera["id"]);

                    /*=============================================
                        CARGAMOS LA DESCRIPCION
                    =============================================*/

                    $("#modalEditarProducto .descripcionProducto").val(resCabecera["descripcion"]);

                    /*=============================================
                        CARGAMOS LAS PALABRAS CLAVES
                    =============================================*/	
                    
                    if(resCabecera["palabrasClaves"] != null){

                        $("#modalEditarProducto .editarPalabrasClaves").html('<div class="input-group">'+
                
                                '<span class="input-group-addon"><i class="fa fa-key"></i></span>'+ 

                                '<input type="text" class="form-control input-lg tagsInput pClavesProducto" value="'+resCabecera["palabrasClaves"]+'" data-role="tagsinput">'+
                        
                            '</div>'
                        
                        );

                        $("#modalEditarProducto .pClavesProducto").tagsinput('items');

                    }else{

                        $("#modalEditarProducto .editarPalabrasClaves").html('<div class="input-group">'+
                
                                '<span class="input-group-addon"><i class="fa fa-key"></i></span>'+ 

                                '<input type="text" class="form-control input-lg tagsInput pClavesProducto" value="" data-role="tagsinput">'+

                            '</div>'
                        
                        );

                        $("#modalEditarProducto .pClavesProducto").tagsinput('items');

                    }

                    /*=============================================
                        CARGAMOS LA IMAGEN DE PORTADA
                    =============================================*/

                    $("#modalEditarProducto .previsualizarPortada").attr("src", resCabecera["portada"]);
                    $("#modalEditarProducto .antiguaFotoPortada").val(resCabecera["portada"]);
                
                }
                    
            });

            /*============================================
                CARGAMOS LA IMAGEN PRINCIPAL
            =============================================*/

            $("#modalEditarProducto .previsualizarPrincipal").attr("src", producto[0]["portada"]);
            $("#modalEditarProducto .antiguaFotoPrincipal").val(producto[0]["portada"]);

            /*===============================================
                CARGAMOS EL PRECIO, PESO Y DIAS DE ENTREGA
            =================================================*/

            $("#modalEditarProducto .precio").val(producto[0]["precio"]);
            $("#modalEditarProducto .peso").val(producto[0]["peso"]);
            $("#modalEditarProducto .entrega").val(producto[0]["entrega"]);

            /*=============================================
                PREGUNTAMOS SI EXITE OFERTA
            =============================================*/

            if(producto[0]["oferta"] != 0){

                $("#modalEditarProducto .selActivarOferta").val("oferta");
                $("#modalEditarProducto .datosOferta").show();
                $("#modalEditarProducto .valorOferta").prop("required",true);
                $("#modalEditarProducto .precioOferta").val(producto[0]["precioOferta"]);
                $("#modalEditarProducto .descuentoOferta").val(producto[0]["descuentoOferta"]);

                if(producto[0]["precioOferta"] != 0){

                    $("#modalEditarProducto .precioOferta").prop("readonly",true);
                    $("#modalEditarProducto .descuentoOferta").prop("readonly",false);

                }

                if(producto[0]["descuentoOferta"] != 0){

                    $("#modalEditarProducto .descuentoOferta").prop("readonly",true);
                    $("#modalEditarProducto .precioOferta").prop("readonly",false);

                }
    
                $("#modalEditarProducto .previsualizarOferta").attr("src", producto[0]["imgOferta"]);
                $("#modalEditarProducto .antiguaFotoOferta").val(producto[0]["imgOferta"]);
                $("#modalEditarProducto .finOferta").val(producto[0]["finOferta"]);						

            }else{

                $("#modalEditarProducto .selActivarOferta").val("");
                $("#modalEditarProducto .datosOferta").hide();
                $("#modalEditarProducto .valorOferta").prop("required",false);
                $("#modalEditarProducto .previsualizarOferta").attr("src", "vistas/img/default/default.png");
                $("#modalEditarProducto .antiguaFotoOferta").val(producto[0]["imgOferta"]);

            }

            /*=============================================
                CREAR NUEVA OFERTA AL EDITAR
            =============================================*/

            $("#modalEditarProducto .selActivarOferta").change(function(){

                activarOferta($(this).val())

            })

            $("#modalEditarProducto .valorOferta").change(function(){

                if($(this).attr("tipo") == "oferta"){

                    var descuento = 100-(Number($(this).val())*100/Number($("#modalEditarProducto .precio").val()));
                    $("#modalEditarProducto .precioOferta").prop("readonly",true);
                    $("#modalEditarProducto .descuentoOferta").prop("readonly",false);
                    $("#modalEditarProducto .descuentoOferta").val(Math.ceil(descuento));

                }

                if($(this).attr("tipo") == "descuento"){

                    var oferta = Number($("#modalEditarProducto .precio").val())-(Number($(this).val())*Number($("#modalEditarProducto .precio").val())/100);	
                    $("#modalEditarProducto .descuentoOferta").prop("readonly",true);
                    $("#modalEditarProducto .precioOferta").prop("readonly",false);
                    $("#modalEditarProducto .precioOferta").val(oferta);

                }

            })

            /*=============================================
                GUARDAR CAMBIOS DEL PRODUCTO
            =============================================*/	

            var multimediaFisica = null;
            var multimediaVirtual = null;	

            $(".guardarCambiosProducto").click(function(){

                /*=========================================================
                    PREGUNTAMOS SI LOS CAMPOS OBLIGATORIOS ESTÁN LLENOS
                ===========================================================*/

                if($("#modalEditarProducto .tituloProducto").val() != "" && $("#modalEditarProducto .seleccionarTipo").val() != "" && $("#modalEditarProducto .seleccionarCategoria").val() != "" && $("#modalEditarProducto .seleccionarSubCategoria").val() != "" && $("#modalEditarProducto .descripcionProducto").val() != "" && $("#modalEditarProducto .pClavesProducto").val() != ""){

                    /*======================================================================
                        PREGUNTAMOS SI VIENEN IMÁGENES PARA MULTIMEDIA O LINK DE YOUTUBE
                    ========================================================================*/

                    if($("#modalEditarProducto .seleccionarTipo").val() != "virtual"){	

                        if(arrayFiles.length > 0 && $("#modalEditarProducto .rutaProducto").val() != ""){

                            var listaMultimedia = [];
                            var finalFor = 0;

                            for(var i = 0; i < arrayFiles.length; i++){
                                
                                var datosMultimedia = new FormData();
                                datosMultimedia.append("file", arrayFiles[i]);
                                datosMultimedia.append("ruta", $("#modalEditarProducto .rutaProducto").val());

                                $.ajax({

                                    url:"ajax/productos.ajax.php",
                                    method: "POST",
                                    data: datosMultimedia,
                                    cache: false,
                                    contentType: false,
                                    processData: false,
                                    beforeSend: function(){

                                        $(".modal-footer .preload").html(`

                                            <center>

                                                <img src="vistas/img/plantilla/status.gif" id="status" />
                                                <br>

                                            </center>

                                        `);

                                    },

                                    success: function(respuesta){

                                        $("#status").remove();

                                        listaMultimedia.push({"foto" : respuesta.substr(3)});
                                        multimediaFisica = JSON.stringify(listaMultimedia);
                                        
                                        if(localStorage.getItem("multimediaFisica") != null){

                                            var jsonLocalStorage = JSON.parse(localStorage.getItem("multimediaFisica"));
                                            var jsonMultimediaFisica = listaMultimedia.concat(jsonLocalStorage);
                                            multimediaFisica = JSON.stringify(jsonMultimediaFisica);

                                        }
                                                                        
                                        multimediaVirtual = null;

                                        if(multimediaFisica == null){

                                            swal({
                                                title: "El campo de multimedia no debe estar vacío",
                                                type: "error",
                                                confirmButtonText: "¡Cerrar!"
                                            });

                                            return;
                                        }

                                        if((finalFor + 1) == arrayFiles.length){

                                            editarMiProducto(multimediaFisica);
                                            finalFor = 0;

                                        }

                                        finalFor++;							
                            
                                    }

                                })

                            }

                        }else{
                
                            var jsonLocalStorage = JSON.parse(localStorage.getItem("multimediaFisica"));
                            multimediaFisica = JSON.stringify(jsonLocalStorage);
                            editarMiProducto(multimediaFisica);	
                            
                        }

                    }else{

                        multimediaVirtual = $("#modalEditarProducto .multimedia").val();
                        multimediaFisica = null;

                        if(multimediaVirtual == null){

                            swal({
                                title: "El campo de multimedia no debe estar vacío",
                                type: "error",
                                confirmButtonText: "¡Cerrar!"
                            });

                            return;

                        }	

                        editarMiProducto(multimediaVirtual);	
                        
                    }

                }else{

                    swal({
                        title: "Llenar todos los campos obligatorios",
                        type: "error",
                        confirmButtonText: "¡Cerrar!"
                    });

                    return;

                }					

            })
                    
        }

    })

})

function editarMiProducto(imagen){

    var idProducto = $("#modalEditarProducto .idProducto").val();
    var tituloProducto = $("#modalEditarProducto .tituloProducto").val();
    var rutaProducto = $("#modalEditarProducto .rutaProducto").val();
    var seleccionarTipo = $("#modalEditarProducto .seleccionarTipo").val();
    var seleccionarCategoria = $("#modalEditarProducto .seleccionarCategoria").val();
    var seleccionarSubCategoria = $("#modalEditarProducto .seleccionarSubCategoria").val();
    var descripcionProducto = $("#modalEditarProducto .descripcionProducto").val();
    var pClavesProducto = $("#modalEditarProducto .pClavesProducto").val();
    var precio = $("#modalEditarProducto .precio").val();
    var peso = $("#modalEditarProducto .peso").val();
    var entrega = $("#modalEditarProducto .entrega").val();
    var selActivarOferta = $("#modalEditarProducto .selActivarOferta").val();
    var precioOferta = $("#modalEditarProducto .precioOferta").val();
    var descuentoOferta = $("#modalEditarProducto .descuentoOferta").val();
    var finOferta = $("#modalEditarProducto .finOferta").val();

      if(seleccionarTipo == "virtual"){

        var detalles = {"Clases": $("#modalEditarProducto .detalleClases").val(),
                        "Tiempo": $("#modalEditarProducto .detalleTiempo").val(),
                        "Nivel": $("#modalEditarProducto .detalleNivel").val(),
                        "Acceso": $("#modalEditarProducto .detalleAcceso").val(),
                        "Dispositivo": $("#modalEditarProducto .detalleDispositivo").val(),
                        "Certificado": $("#modalEditarProducto .detalleCertificado").val()};

    }else{

        var detalles = {"Talla": $("#modalEditarProducto .detalleTalla").tagsinput('items'),							
                        "Color": $("#modalEditarProducto .detalleColor").tagsinput('items'),
                        "Marca": $("#modalEditarProducto .detalleMarca").tagsinput('items')};

    }

    var detallesString = JSON.stringify(detalles);
    var antiguaFotoPortada = $("#modalEditarProducto .antiguaFotoPortada").val();
    var antiguaFotoPrincipal = $("#modalEditarProducto .antiguaFotoPrincipal").val();
    var antiguaFotoOferta = $("#modalEditarProducto .antiguaFotoOferta").val();
    var idCabecera = $("#modalEditarProducto .idCabecera").val();

    var datosProducto = new FormData();
    datosProducto.append("id", idProducto);
    datosProducto.append("editarProducto", tituloProducto);
    datosProducto.append("rutaProducto", rutaProducto);
    datosProducto.append("seleccionarTipo", seleccionarTipo);	
    datosProducto.append("detalles", detallesString);	
    datosProducto.append("seleccionarCategoria", seleccionarCategoria);
    datosProducto.append("seleccionarSubCategoria", seleccionarSubCategoria);
    datosProducto.append("descripcionProducto", descripcionProducto);
    datosProducto.append("pClavesProducto", pClavesProducto);
    datosProducto.append("precio", precio);
    datosProducto.append("peso", peso);
    datosProducto.append("entrega", entrega);

    if(imagen == null){

        multimediaFisica = localStorage.getItem("multimediaFisica");
        datosProducto.append("multimedia", multimediaFisica);

    }else{

        datosProducto.append("multimedia", imagen);

    }	

    datosProducto.append("fotoPortada", imagenPortada);
    datosProducto.append("fotoPrincipal", imagenFotoPrincipal);
    datosProducto.append("selActivarOferta", selActivarOferta);
    datosProducto.append("precioOferta", precioOferta);
    datosProducto.append("descuentoOferta", descuentoOferta);
    datosProducto.append("finOferta", finOferta);
    datosProducto.append("fotoOferta", imagenOferta);
    datosProducto.append("antiguaFotoPortada", antiguaFotoPortada);
    datosProducto.append("antiguaFotoPrincipal", antiguaFotoPrincipal);
    datosProducto.append("antiguaFotoOferta", antiguaFotoOferta);
    datosProducto.append("idCabecera", idCabecera);

    $.ajax({

        url:"ajax/productos.ajax.php",
        method: "POST",
        data: datosProducto,
        cache: false,
        contentType: false,
        processData: false,
        success: function(respuesta){
                                    
            if(respuesta == "ok"){

                swal({
                    type: "success",
                    title: "El producto ha sido cambiado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar"
                    
                }).then(function(result){
                        
                    if (result.value) {
                        localStorage.removeItem("multimediaFisica");
                        localStorage.clear();
                        window.location = "productos";

                    }

                })
                
            }

        }

    })
    
}

/*=============================================
    ELIMINAR PRODUCTO
=============================================*/

$('.tablaProductos tbody').on("click", ".btnEliminarProducto", function(){

    var idProducto = $(this).attr("idProducto");
    var imgOferta = $(this).attr("imgOferta");
    var rutaCabecera = $(this).attr("rutaCabecera");
    var imgPortada = $(this).attr("imgPortada");
    var imgPrincipal = $(this).attr("imgPrincipal");

    swal({

        title: '¿Está seguro de borrar el producto?',
        text: "¡Si no lo está puede cancelar la accíón!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar producto!'

    }).then(function(result){

        if(result.value){

            window.location = "index.php?ruta=productos&idProducto="+idProducto+"&imgOferta="+imgOferta+"&rutaCabecera="+rutaCabecera+"&imgPortada="+imgPortada+"&imgPrincipal="+imgPrincipal;

        }

    })

})