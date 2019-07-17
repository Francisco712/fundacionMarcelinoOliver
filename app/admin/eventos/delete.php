<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"DELETE FROM eventos WHERE CODIGO = ".$_GET['id']);          

echo json_encode($resultado);

?>