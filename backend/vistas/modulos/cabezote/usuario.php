<!--==================================
	USUARIOS
======================================-->	

<!-- user-menu -->
<li class="dropdown user user-menu">

	<!-- dropdown-toggle -->
	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
	
		<!-- <img src="vistas/dist/img/lenin-misle.jpg" class="user-image" alt="Lenin Misle"> -->
		
		<!-- <span class="hidden-xs">Administrador</span> -->

		<?php

			if($_SESSION["foto1"] == ""){

				echo '<img src="vistas/img/default/anonymous.jpg" class="user-image" alt="User Image">';

			}else{

				echo '<img src="'.$_SESSION["foto1"].'" class="user-image" alt="'.$_SESSION["nombre1"].'">';

			}

		?>
		
		<!-- <span class="hidden-xs"><?php echo $_SESSION["nombre1"]; ?> &nbsp; (&nbsp;<?php echo ucfirst($_SESSION["perfil"]); ?>&nbsp;)</span> -->

		<span class="hidden-xs"><?php echo ucfirst($_SESSION["perfil"]); ?></span>
	
	</a>
	<!-- dropdown-toggle -->

	<!-- dropdown-menu -->
	<ul class="dropdown-menu">

		<li class="user-header">

			<br>
		
			<!-- <img src="vistas/dist/img/lenin-misle.jpg" class="img-circle" alt="Lenin Misle"> -->

			<!-- <p>Lenin Misle</p> -->

			<?php

				if($_SESSION["foto1"] == ""){

					echo '<img src="vistas/img/default/anonymous.jpg" class="img-circle" alt="User Image">';

				}else{

					echo '<img src="'.$_SESSION["foto1"].'" class="img-circle" alt="'.$_SESSION["nombre1"].'">';

				}

			?>

			<h4 style="color:white"><p><?php echo $_SESSION["nombre1"]; ?></p></h4>

		</li>

		<li class="user-footer">
		
			<div class="pull-left">
				
				<!-- <a href="perfil" class="btn btn-default btn-flat">Perfil</a> -->
			
			</div>
			
			<div class="pull-right">
			
				<a href="salir" class="btn btn-default btn-flat">Salir</a>
			
			</div>
		</li>

	</ul>
	<!-- dropdown-menu -->

</li>
<!-- user-menu -->