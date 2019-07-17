<?php

include '../../common/connectBbdd.php';

$json = json_decode($_POST['categoria']);

$stmt = $db_connection->prepare("INSERT INTO categorias (NOMBRE, DESCRIPCION, COLOR) VALUES (?, ?, ?)"); 
$stmt->bind_param("sss", $json->NOMBRE, $json->DESCRIPCION, $json->COLOR);

if($stmt->execute()){
    echo "true";
} else {
    echo "false";
}

$stmt->close();
$db_connection->close();

?>