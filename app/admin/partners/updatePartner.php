<?php

include '../../common/connectBbdd.php';

/*$archivo = (isset($_FILES['file'])) ? $_FILES['file'] : null;*/

$set = "NOMBRE='".utf8_decode($_POST['nombre'])."', IMAGEN='".utf8_decode($_POST['imagen'])."', RESUMEN='".utf8_decode($_POST['resumen'])."', URL='".utf8_decode($_POST['url'])."'";

/*if($archivo){
    
    $res = move_uploaded_file($_FILES['file']['tmp_name'], '../../assets/images/news/'.$_FILES['file']['name']);
    if($res){
        $ruta = ", FOTO='assets/images/news/".$_FILES['file']['name']."'";
        $set = $set.$ruta;
    }
}*/

$resultado = mysqli_query($db_connection,"UPDATE partners SET ".$set." WHERE ID=".utf8_decode($_POST['id']));

echo json_encode($resultado);

?>