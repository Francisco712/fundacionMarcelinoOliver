<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"SELECT * FROM noticias WHERE ID = '".$_GET['id']."'");

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
            $json[] = $row;
    }
echo json_encode($json);

?>