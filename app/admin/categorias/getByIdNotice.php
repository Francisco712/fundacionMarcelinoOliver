<?php

include '../../common/connectBbdd.php';

$id = $_GET['id'];
$stmt = $db_connection->prepare("SELECT nc.*, c.NOMBRE FROM categorias c, noti_cate_rln nc WHERE c.ID = nc.ID_CATEGORIA AND nc.ID_NOTICIA = ?");
$stmt->bind_param("i", $id);

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