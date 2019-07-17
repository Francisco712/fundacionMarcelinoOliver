<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"SELECT p.*  FROM participantes p, event_part_rln ep  WHERE p.DNI = ep.DNI AND ep.CODIGO = '".utf8_decode($_GET['codigo'])."'");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
    foreach ($row as $key => $value) {
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
}
echo json_encode($json);

?>