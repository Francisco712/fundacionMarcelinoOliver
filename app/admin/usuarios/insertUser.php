<?php

include '../../common/connectBbdd.php';

/*$archivo = (isset($_FILES['file'])) ? $_FILES['file'] : null;
$ruta = "";

if($archivo){
    $res = move_uploaded_file($_FILES['file']['tmp_name'], '../../assets/images/news/'.$_FILES['file']['name']);
    if($res){
        $ruta = "assets/images/news/".$_FILES['file']['name'];
    }
}*/

$resultado = mysqli_query($db_connection,"INSERT INTO usuarios (USER, PASSWORD, NOMBRE, APELLIDOS, SEXO) VALUES ('".utf8_decode($_GET['user'])."', '".utf8_decode($_GET['password'])."', '".utf8_decode($_GET['nombre'])."', '".utf8_decode($_GET['apellidos'])."', '".utf8_decode($_GET['sexo'])."')");

echo json_encode($resultado);

?>