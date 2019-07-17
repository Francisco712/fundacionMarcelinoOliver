<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"DELETE FROM usuarios WHERE ID = ".$_GET['id']);          

echo json_encode($resultado);

?>