<?php

include '../../common/connectBbdd.php';

$archivo = (isset($_FILES['file'])) ? $_FILES['file'] : null;

if($archivo){
    
    echo move_uploaded_file($_FILES['file']['tmp_name'], '../../assets/images/news/'.$_FILES['file']['name']);
}

?>