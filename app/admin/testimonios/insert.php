<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"INSERT INTO testimonios (NOMBRE, CONTENIDO) VALUES ('".utf8_decode($_GET['nombre'])."', '".utf8_decode($_GET['contenido'])."')");

echo json_encode($resultado);

?>