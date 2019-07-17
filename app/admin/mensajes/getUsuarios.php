<?php

include '../../common/connectBbdd.php';

$query = "SELECT * FROM usuarios WHERE ID <> '".utf8_decode($_COOKIE["username"])."'";

$resultado = mysqli_query($db_connection,$query);          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
            $json[] = $row;
    }
echo json_encode($json);

?>