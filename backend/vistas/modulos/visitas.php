<div class="content-wrapper">
    
    <section class="content-header">
      
        <h1>Gestor Visitas</h1>
 
        <ol class="breadcrumb">

            <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>

            <li class="active">Gestor Visitas</li>
      
        </ol>

    </section>

    <section class="content">

        <div class="box">  

            <div class="box-header with-border">

                <?php

                    include "inicio/grafico-visitas.php";

                ?>

            </div>

            <div class="box-body">

                <div class="box-tools">

                    <a href="vistas/modulos/reportes.php?reporte=visitaspersonas">

                        <button class="btn btn-success" style="margin-top:5px">Descargar reporte en Excel</button>

                    </a>

                </div>

                <br>
            
                <table class="table table-bordered table-striped dt-responsive tablaVisitas" width="100%">

                    <thead>
                
                        <tr>
                
                            <th style="width:10px">#</th>
                            <th>IP Pública</th>
                            <th>País</th>
                            <th>Visitas</th>
                            <th>Fecha</th>

                        </tr>

                    </thead>

                </table> 

            </div>
            
        </div>

    </section>

</div>