<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"DELETE FROM permisos WHERE ID_USER = ".$_GET['id']);          

echo json_encode($resultado);

?>