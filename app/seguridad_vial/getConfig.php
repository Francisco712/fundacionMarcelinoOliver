<?php

include '../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"SELECT ID as id, PESTANA as pestana, TITULO as titulo, CONTENIDO as contenido, URL as url FROM PESTANA");          
$resultado = mysqli_query($db_connection,"SELECT ID as id, PESTANA as pestana, TITULO as titulo, CONTENIDO as contenido, URL as url FROM PESTANA");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
    foreach ($row as $key => $value) { // Loops 4 times because there are 4 columns
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
}
echo json_encode($json);

?>