<?php

include '../../common/connectBbdd.php';

/*$archivo = (isset($_FILES['file'])) ? $_FILES['file'] : null;*/

$set = "TITULO='".utf8_decode($_POST['title'])."', CONTENIDO='".utf8_decode($_POST['content'])."', FOTO='".utf8_decode($_POST['photo'])."'";

/*if($archivo){
    
    $res = move_uploaded_file($_FILES['file']['tmp_name'], '../../assets/images/news/'.$_FILES['file']['name']);
    if($res){
        $ruta = ", FOTO='assets/images/news/".$_FILES['file']['name']."'";
        $set = $set.$ruta;
    }
}*/
$resultado = mysqli_query($db_connection,"UPDATE noticias SET ".$set." WHERE ID=".utf8_decode($_POST['id']));

echo json_encode($resultado);

?>