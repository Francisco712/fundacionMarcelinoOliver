<?php

chdir('../../assets/images/news');

$json = array();

if ($gestor = opendir(getcwd())) {
    
    while (false !== ($entrada = readdir($gestor))) {
        if ($entrada != "." && $entrada != "..") {
            $json[] = $entrada;
        }
    }
    closedir($gestor);
}

echo json_encode($json);
?>