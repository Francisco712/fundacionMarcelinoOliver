<?php

include '../../common/connectBbdd.php';

if($_GET['orden'] == 'true'){
    $resultado = mysqli_query($db_connection,"SELECT * FROM noticias ORDER BY FECHA ASC");
}else{
    $resultado = mysqli_query($db_connection,"SELECT * FROM noticias ORDER BY FECHA DESC");
}
$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
    foreach ($row as $key => $value) { // Loops 4 times because there are 4 columns
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
}
echo json_encode($json);

?>