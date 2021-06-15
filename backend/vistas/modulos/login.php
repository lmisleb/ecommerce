<div class="login-box">

    <div class="login-logo">
        <img src="vistas/img/plantilla/logo.png" class="img-responsive" style="padding:10px 50px;">
    </div>
        
    <div class="login-box-body">
        
        <p class="login-box-msg">Ingresar al Sistema</p>

        <form method="post">

            <div class="form-group has-feedback">
                <input type="email" class="form-control" placeholder="Email" name="ingEmail" required>
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>

            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="Password" name="ingPassword" required>
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>

            <div class="row">

                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary">Ingresar</button>
                </div>

            </div>

            <?php

                $login = new ControladorAdministradores();
                $login -> ctrIngresoAdministrador();
            
            ?>

        </form>

    </div>

</div>