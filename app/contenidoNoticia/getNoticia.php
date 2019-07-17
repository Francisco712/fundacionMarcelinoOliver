<?php

include '../common/connectBbdd.php';

$user = $_GET['user'];
$resultado = mysqli_query($db_connection,"SELECT * FROM noticias WHERE ID = '".$user."'");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
    foreach ($row as $key => $value) { // Loops 4 times because there are 4 columns
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
}
echo json_encode($json);

?>