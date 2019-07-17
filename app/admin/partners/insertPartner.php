<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"INSERT INTO partners (NOMBRE, IMAGEN, RESUMEN, URL) VALUES ('".utf8_decode($_GET['nombre'])."', '".utf8_decode($_GET['imagen'])."', '".utf8_decode($_GET['resumen'])."', '".utf8_decode($_GET['url'])."')");

echo json_encode($resultado);

?>