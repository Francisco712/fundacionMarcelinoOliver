<?php

$json = file_get_contents('php://input');
$obj = json_decode($json);

//echo $json;
 
$xml = new DomDocument('1.0', 'UTF-8');

$config = $xml->createElement('config');
$config = $xml->appendChild($config);

foreach($obj->data->pages as $p){

    // Página 
    $page = $xml->createElement('page');
    $page = $config->appendChild($page);

    // Nombre de la pestaña
    $tab = $xml->createElement('tab', $p->tab);
    $tab = $page->appendChild($tab);

    // Url de la pestaña
    $url = $xml->createElement('url', $p->url);
    $url = $page->appendChild($url);
    
    // Categoria de la pestaña
    $categoria = $xml->createElement('categoria', $p->categoria);
    $categoria = $page->appendChild($categoria);
    
    // Id de la pestaña
    $id = $xml->createElement('id', $p->id);
    $id = $page->appendChild($id);

    if(!empty($p->section)){
        foreach($p->section as $s){

            // Sección de la pestaña
            $section = $xml->createElement('section');
            $section = $page->appendChild($section);

            // Identificador de la sección
            $identificator = $xml->createElement('identificator', $s->identificator);
            $identificator = $section->appendChild($identificator);

            // Tipo de sección
            $type = $xml->createElement('type', $s->type);
            $type = $section->appendChild($type);

            // Alineación de sección
            $aline = $xml->createElement('aline', $s->aline);
            $aline = $section->appendChild($aline);

            // Campo opcional1 de la sección
            $optional1 = $xml->createElement('optional1');
            $optional1 = $section->appendChild($optional1);

            // Campo cabecera del campo opcional1 de la sección
            $head = $xml->createElement('head', $s->optional1->head);
            $head = $optional1->appendChild($head);

            // Campo parrafo del campo opcional1 de la sección
            $paragraph = $xml->createElement('paragraph', $s->optional1->paragraph);
            $paragraph = $optional1->appendChild($paragraph);

            // Campo opcional2 de la sección
            $optional2 = $xml->createElement('optional2');
            $optional2 = $section->appendChild($optional2);

            // Campo cabecera del campo opcional2 de la sección
            $head = $xml->createElement('head', $s->optional2->head);
            $head = $optional2->appendChild($head);

            // Campo parrafo del campo opcional2 de la sección
            $paragraph = $xml->createElement('paragraph', $s->optional2->paragraph);
            $paragraph = $optional2->appendChild($paragraph);

            // Campo areaMult de la sección
            $areaMult = $xml->createElement('areaMult');
            $areaMult = $section->appendChild($areaMult);

            // Campo multimedia del campo areaMult de la sección
            $mult = $xml->createElement('mult', $s->areaMult->mult);
            $mult = $areaMult->appendChild($mult);        
        }
    }
    
    if(!empty($p->subpage)){
        foreach($p->subpage as $sp){

            // Sección de la pestaña
            $subpage = $xml->createElement('subpage');
            $subpage = $page->appendChild($subpage);

            // Nombre de la pestaña
            $tab = $xml->createElement('tab', $sp->tab);
            $tab = $subpage->appendChild($tab);

            // Url de la pestaña
            $url = $xml->createElement('url', $sp->url);
            $url = $subpage->appendChild($url);

            // Categoria de la pestaña
            $categoria = $xml->createElement('categoria', $sp->categoria);
            $categoria = $subpage->appendChild($categoria);
            
            // Id de la pestaña
            $id = $xml->createElement('id', $p->id);
            $id = $subpage->appendChild($id);
            
            foreach ($sp->section as $ssp) {
                // Sección de la subcategoria
                $sectionSubpage = $xml->createElement('section');
                $sectionSubpage = $subpage->appendChild($sectionSubpage);

                // Identificador de la sección
                $identificator = $xml->createElement('identificator', $ssp->identificator);
                $identificator = $sectionSubpage->appendChild($identificator);

                // Tipo de sección
                $type = $xml->createElement('type', $ssp->type);
                $type = $sectionSubpage->appendChild($type);

                // Alineación de sección
                $aline = $xml->createElement('aline', $ssp->aline);
                $aline = $sectionSubpage->appendChild($aline);

                // Campo opcional1 de la sección
                $optional1 = $xml->createElement('optional1');
                $optional1 = $sectionSubpage->appendChild($optional1);

                // Campo cabecera del campo opcional1 de la sección
                $head = $xml->createElement('head', $ssp->optional1->head);
                $head = $optional1->appendChild($head);

                // Campo parrafo del campo opcional1 de la sección
                $paragraph = $xml->createElement('paragraph', $ssp->optional1->paragraph);
                $paragraph = $optional1->appendChild($paragraph);

                // Campo opcional2 de la sección
                $optional2 = $xml->createElement('optional2');
                $optional2 = $sectionSubpage->appendChild($optional2);

                // Campo cabecera del campo opcional2 de la sección
                $head = $xml->createElement('head', $ssp->optional2->head);
                $head = $optional2->appendChild($head);

                // Campo parrafo del campo opcional2 de la sección
                $paragraph = $xml->createElement('paragraph', $ssp->optional2->paragraph);
                $paragraph = $optional2->appendChild($paragraph);

                // Campo areaMult de la sección
                $areaMult = $xml->createElement('areaMult');
                $areaMult = $sectionSubpage->appendChild($areaMult);

                // Campo multimedia del campo areaMult de la sección
                $mult = $xml->createElement('mult', $ssp->areaMult->mult);
                $mult = $areaMult->appendChild($mult);
            }
        }
    }
}

$xml->formatOutput = true;
$el_xml = $xml->saveXML();
$xml->save('../../assets/xml/config.xml');

echo "true";
?>