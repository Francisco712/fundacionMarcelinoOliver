<?php

include '../../common/connectBbdd.php';

$amigo = $_GET['user'];
$msg = $_GET['msg'];

$query = "INSERT INTO mensajes (ID_EMISOR, ID_RECEPTOR, CONTENIDO) VALUES (".utf8_decode($_COOKIE["username"]).", ".utf8_decode($amigo).", '".utf8_decode($msg)."')";

$resultado = mysqli_query($db_connection,$query);


echo json_encode($resultado);

?>