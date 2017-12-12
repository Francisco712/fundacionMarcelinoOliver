<?php

$db_host="127.0.0.1:3306";
$db_name="fmoliver";
$db_connection = mysqli_connect($db_host, "root", "root", $db_name);

$user = $_GET['user'];
$pass = $_GET['pass'];

$resultado = mysqli_query($db_connection,"SELECT * FROM tpw_usuario WHERE USER = '".$user."' AND PASSWORD = '".$pass."'");          

$json = array();

while($row =mysqli_fetch_assoc($resultado)) {
            $json[] = $row;
    }
echo json_encode($json);

?>