<?php

include '../../common/connectBbdd.php';

$amigo = $_GET['user'];

$query = "SELECT ID_EMISOR, ID_RECEPTOR, CONTENIDO, FECHA, (SELECT NOMBRE FROM usuarios WHERE ID = mensajes.ID_EMISOR) as NOMBRE_E, (SELECT FOTO_PERFIL FROM usuarios WHERE ID = mensajes.ID_EMISOR) as FOTO_E, (SELECT SEXO FROM usuarios WHERE ID = mensajes.ID_EMISOR) as SEXO_E FROM mensajes WHERE (ID_RECEPTOR = '".utf8_decode($_COOKIE["username"])."' AND ID_EMISOR = '".utf8_decode($amigo)."') OR (ID_EMISOR = '".utf8_decode($_COOKIE["username"])."' AND ID_RECEPTOR = '".utf8_decode($amigo)."') ORDER BY FECHA DESC";

$resultado = mysqli_query($db_connection,$query);          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
         
    foreach ($row as $key => $value) {
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
} 
echo json_encode($json);
?>