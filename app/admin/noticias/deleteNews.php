<?php

$db_host="127.0.0.1:3306";
$db_name="fmoliver";
$db_connection = mysqli_connect($db_host, "root", "root", $db_name);

$resultado = mysqli_query($db_connection,"DELETE FROM tpw_noticias WHERE ID = ".$_GET['id']);          

echo json_encode($resultado);

?>