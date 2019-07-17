<?php

include '../../common/connectBbdd.php';

/*$archivo = (isset($_FILES['file'])) ? $_FILES['file'] : null;*/

$set = "TITULO='".utf8_decode($_POST['title'])."', DESCRIPCION='".utf8_decode($_POST['description'])."', FOTO='".utf8_decode($_POST['photo'])."', FECHA='".utf8_decode($_POST['date'])."', LUGAR='".utf8_decode($_POST['place'])."'";

/*if($archivo){
    
    $res = move_uploaded_file($_FILES['file']['tmp_name'], '../../assets/images/news/'.$_FILES['file']['name']);
    if($res){
        $ruta = ", FOTO='assets/images/news/".$_FILES['file']['name']."'";
        $set = $set.$ruta;
    }
}*/
$resultado = mysqli_query($db_connection,"UPDATE eventos SET ".$set." WHERE CODIGO=".utf8_decode($_POST['id']));

echo json_encode($resultado);

?>