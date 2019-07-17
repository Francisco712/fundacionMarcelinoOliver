<?php

include 'connectBbdd.php';

$resultado = mysqli_query($db_connection,"UPDATE pestana SET PESTANA='".utf8_decode($_POST['pestana'])."', TITULO='".utf8_decode($_POST['titulo'])."', CONTENIDO='".utf8_decode($_POST['contenido'])."' WHERE ID = ".utf8_decode($_POST['id']));

echo json_encode($resultado);

?>