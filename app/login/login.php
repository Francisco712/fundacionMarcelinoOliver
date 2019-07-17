<?php

include '../common/connectBbdd.php';

$user = $_GET['user'];
$pass = $_GET['pass'];

$stmt = $db_connection->prepare("SELECT ID as id, NOMBRE as nombre FROM usuarios WHERE USER = ? AND PASSWORD = ?");          
$stmt->bind_param("ss", $user, $pass);

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