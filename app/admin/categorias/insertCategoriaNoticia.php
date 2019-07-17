<?php

include '../../common/connectBbdd.php';

$id = $_POST['id'];
$json = json_decode($_POST['categorias']);

$stmt = $db_connection->prepare("SELECT ID_CATEGORIA as id FROM noti_cate_rln WHERE ID_NOTICIA = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

// Variable en la que se guardan las categorias existentes en BBDD
$resultSelect = array();

while($row = $result->fetch_assoc()) {
    array_push($resultSelect,$row['id']);
}

if(empty($resultSelect)){
    insertarCategorias($db_connection, $id, $json);
} else {
    borrarCategorias($db_connection, $id, $resultSelect);
    insertarCategorias($db_connection, $id, $json);
}

function borrarCategorias($db_connection, $id, $c){
    for ($i = 0; $i < sizeof($c); $i++){
        $stmt = $db_connection->prepare("DELETE FROM noti_cate_rln WHERE ID_NOTICIA = ? AND ID_CATEGORIA = ?");
        $stmt->bind_param("ii", $id, $c[$i]);
        $stmt->execute();
        $stmt->close();
    }
}

function insertarCategorias($db_connection, $id, $c){
    for ($i = 0; $i < sizeof($c); $i++){
        $stmt = $db_connection->prepare("INSERT INTO noti_cate_rln (ID_NOTICIA, ID_CATEGORIA) VALUES (?, ?)");
        $stmt->bind_param("ii", $id, $c[$i]);
        $stmt->execute();
        $stmt->close();
    }
}

/*$stmt = $db_connection->prepare("INSERT INTO noti_cate_rln (ID_NOTICIA, ID_CATEGORIA) VALUES (?, ?)");
$stmt->bind_param("ii", $idNotica, $idCategoria);

$result = $stmt->execute();
$d = array('op' => $result);
echo json_encode($d);*/

?>