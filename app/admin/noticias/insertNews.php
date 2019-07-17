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

$id = utf8_decode($_POST['id']);
$title = utf8_decode($_POST['title']);
$content = utf8_decode($_POST['content']);
$photo = utf8_decode($_POST['photo']);

$stmt = $db_connection->prepare("INSERT INTO noticias (ID_USUARIO, TITULO, CONTENIDO, FOTO) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $id, $title, $content, $photo);

$result = $stmt->execute();
$lastId = $stmt->insert_id;
$d = array('op' => $result, 'id' => $lastId);
echo json_encode($d);

?>