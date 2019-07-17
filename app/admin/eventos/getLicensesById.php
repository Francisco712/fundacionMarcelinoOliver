<?php

include '../../common/connectBbdd.php';

$id = $_GET['id'];

$resultado = mysqli_query($db_connection,"SELECT S_USER as showUsers, C_USER as createUsers, U_USER as updateUsers, D_USER as deleteUsers, S_NEW as showNews, C_NEW as createNews, U_NEW as updateNews, D_NEW as deleteNews, CAP_VAL as capacityValidation, NEW_VAL as validatedNews FROM permisos WHERE ID_USER = '".$id."'");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
            $json[] = $row;
    }
echo json_encode($json);

?>