<?php

include '../../common/connectBbdd.php';

// Variables a utilizar (son obtendidas del GET de la petición)
$ID_USER = $_GET['id'];
$S_USER = $_GET['showUsers'];
$C_USER = $_GET['createUsers'];
$U_USER = $_GET['updateUsers'];
$D_USER = $_GET['deleteUsers'];
$S_NEW = $_GET['showNews'];
$C_NEW = $_GET['createNews'];
$U_NEW = $_GET['updateNews'];
$D_NEW = $_GET['deleteNews'];
$CAP_VAL = $_GET['capacityValidation'];
$NEW_VAL = $_GET['validatedNews'];

$resultado = mysqli_query($db_connection, "INSERT INTO permisos (ID_USER, S_USER, C_USER, U_USER, D_USER, S_NEW, C_NEW, U_NEW, D_NEW, CAP_VAL, NEW_VAL) VALUES ('".$ID_USER."', '".$S_USER."', '".$C_USER."', '".$U_USER."', '".$D_USER."', '".$S_NEW."', '".$C_NEW."', '".$U_NEW."', '".$D_NEW."', '".$CAP_VAL."', '".$NEW_VAL."')");          

echo json_encode($resultado);

?>