<?php

include '../../common/connectBbdd.php';

$resultado = mysqli_query($db_connection,"SELECT ID as id, USER as user, NOMBRE as nombre, APELLIDOS as apellidos, SEXO as sexo, FOTO_PERFIL as foto FROM usuarios WHERE ID <> '".$_GET['id']."'");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
    foreach ($row as $key => $value) { // Loops 4 times because there are 4 columns
        $row[$key] = utf8_encode($value);
    }
    $json[] = $row;
}
echo json_encode($json);

?>