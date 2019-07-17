<?php

include '../../common/connectBbdd.php';

$id = $_GET['id'];
$stmt = $db_connection->prepare("DELETE FROM categorias WHERE ID = ?");
$stmt->bind_param("i", $id);

if($stmt->execute()){
    echo "true";
} else {
    echo "false";
}

$stmt->close();
$db_connection->close();

?>