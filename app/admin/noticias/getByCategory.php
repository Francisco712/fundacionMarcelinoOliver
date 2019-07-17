<?php

include '../../common/connectBbdd.php';

$cat = $_GET['cat'];
$stmt = $db_connection->prepare("SELECT * FROM noticias WHERE ID IN (SELECT nc.ID_NOTICIA FROM noti_cate_rln nc JOIN categorias c ON nc.ID_CATEGORIA = c.ID AND c.NOMBRE = ?)");
$stmt->bind_param("s", $cat);

$stmt->execute();
$result = $stmt->get_result();

$json = array();

while($row = $result->fetch_assoc()) {
    $json[] = $row;
}

echo json_encode($json);

$stmt->close();
$db_connection->close();

?>