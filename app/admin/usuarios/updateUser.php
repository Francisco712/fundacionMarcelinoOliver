<?php

include '../../common/connectBbdd.php';

$ID = $_GET['id'];
$USER = $_GET['user'];
$PASSWORD = $_GET['password'];
$NOMBRE = $_GET['nombre'];
$APELLIDOS = $_GET['apellidos'];
$SEXO = $_GET['sexo'];

$resultado = mysqli_query($db_connection, "UPDATE usuarios SET USER = '".$USER."', PASSWORD = '".$PASSWORD."', NOMBRE = '".$NOMBRE."', APELLIDOS = '".$APELLIDOS."', SEXO = '".$SEXO."' WHERE ID= '".$ID."'");

echo json_encode($resultado);

?>