<?php

$db_host="127.0.0.1:3306";
$db_name="fmoliver";
$db_connection = mysqli_connect($db_host, "root", "root", $db_name);

$archivo = (isset($_FILES['file'])) ? $_FILES['file'] : null;

if($archivo){
    if(move_uploaded_file($_FILES['file']['tmp_name'], '..\..\assets\images\news\\'.$_FILES['file']['name'])){
        $ruta = "assets/images/news/".$_FILES['file']['name'];
    }else{
        $ruta = "";
    }
}else{
    $ruta = "";
}

$fecha = strftime("%Y-%m-%d", time());

$resultado = mysqli_query($db_connection,"INSERT INTO tpw_noticias (TITULO, CONTENIDO, FECHA, RESUMEN, FOTO) VALUES ('".utf8_decode($_POST['title'])."', '".utf8_decode($_POST['content'])."', '".$fecha."', '".utf8_decode($_POST['summary'])."', '".$ruta."')");

echo json_encode($resultado);

?>