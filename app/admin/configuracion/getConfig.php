<?php

$xml=simplexml_load_file("../../assets/xml/config.xml") or die("Error: Cannot create object");

$xml_array = array();

foreach ($xml->page as $nodo) {
    $xml_array[] = $nodo;
}
echo json_encode($xml_array);

?>