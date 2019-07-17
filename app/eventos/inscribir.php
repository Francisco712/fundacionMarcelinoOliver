<?php

include '../common/connectBbdd.php';

/**
* CODIGOS DEVUELTOS
*
* A - USUARIO YA INSCRITO EN EL EVENTO 
* B - INSCRIPCION REALIZADA CON EXITO
*
*/

$resultadoPart = mysqli_query($db_connection, "SELECT * FROM participantes WHERE DNI = '".utf8_decode($_GET['dni']."'"));

if(mysqli_num_rows($resultadoPart) > 0){
    consultarRelacionEventoParticipante($db_connection);
} else {
    insertarParticipante($db_connection);
    consultarRelacionEventoParticipante($db_connection);
}

function insertarParticipante($db_connection){
    $insertParticipante = mysqli_query($db_connection, "INSERT INTO participantes (DNI, NOMBRE, APELLIDOS, EMAIL) VALUES ( '".utf8_decode($_GET['dni'])."', '".utf8_decode($_GET['nombre'])."', '".utf8_decode($_GET['apellidos'])."', '".utf8_decode($_GET['email'])."')");
}

function insertarRelacionEventoParticipante($db_connection) {
    $insertRelacion = mysqli_query($db_connection, "INSERT INTO event_part_rln (DNI, CODIGO) VALUES ( '".utf8_decode($_GET['dni'])."', '".utf8_decode($_GET['codigo'])."')");
}

function consultarRelacionEventoParticipante($db_connection) {
     $resultadoRelacion = mysqli_query($db_connection, "SELECT * FROM event_part_rln WHERE DNI = '".utf8_decode($_GET['dni'])."' AND CODIGO = '".utf8_decode($_GET['codigo']."'"));
                                       
    if(mysqli_num_rows($resultadoRelacion) > 0){
        echo 'A';
    } else {
        insertarRelacionEventoParticipante($db_connection);
        echo 'B';
    }
}

?>