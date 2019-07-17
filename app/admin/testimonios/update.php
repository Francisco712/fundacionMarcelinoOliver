<?php

include '../../common/connectBbdd.php';

$set = "NOMBRE='".utf8_decode($_GET['nombre'])."', CONTENIDO='".utf8_decode($_GET['contenido'])."'";

$resultado = mysqli_query($db_connection,"UPDATE testimonios SET ".$set." WHERE ID=".utf8_decode($_GET['id']));

echo json_encode($resultado);

?>