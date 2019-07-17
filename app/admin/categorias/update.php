<?php

include '../../common/connectBbdd.php';

$json = json_decode($_POST['categoria']);

$stmt = $db_connection->prepare("UPDATE categorias SET NOMBRE = ?, DESCRIPCION = ?, COLOR = ? WHERE ID = ?"); 
$stmt->bind_param("sssi", $json->NOMBRE, $json->DESCRIPCION, $json->COLOR, $json->ID);

if($stmt->execute()){
    echo "true";
} else {
    echo "false";
}

$stmt->close();
$db_connection->close();

?>