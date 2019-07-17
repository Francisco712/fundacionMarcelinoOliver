<?php

include '../../common/connectBbdd.php';

$stmt = $db_connection->prepare("SELECT * FROM categorias");          

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