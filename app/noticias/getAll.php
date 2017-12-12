<?php

$db_host="127.0.0.1:3306";
$db_name="fmoliver";
$db_connection = mysqli_connect($db_host, "root", "root", $db_name);

$resultado = mysqli_query($db_connection,"SELECT * FROM tpw_noticias");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
    foreach ($row as $key => $value) { // Loops 4 times because there are 4 columns
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
}
echo json_encode($json);

?>