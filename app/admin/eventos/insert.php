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

$resultado = mysqli_query($db_connection,"INSERT INTO eventos (TITULO, DESCRIPCION, FOTO, FECHA, LUGAR) VALUES ( '".utf8_decode($_POST['title'])."', '".utf8_decode($_POST['description'])."', '".utf8_decode($_POST['photo'])."', '".utf8_decode($_POST['date'])."', '".utf8_decode($_POST['place'])."')");

echo json_encode($resultado);

?>