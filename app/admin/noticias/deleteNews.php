<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"DELETE FROM noticias WHERE ID = ".$_GET['id']);          

echo json_encode($resultado);

?>