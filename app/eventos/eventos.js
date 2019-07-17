'use strict';

angular.module('myApp.eventos', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/eventos', {
    templateUrl: 'eventos/eventos.html',
    controller: 'EventosCtrl'
  });
}])

.controller('EventosCtrl', function($scope, $http, $filter, $log, $location, config, events) {
    
    $scope.nombre = "";
    $scope.apellidos = "";
    $scope.dni = "";
    $scope.email = "";
    var alertType;
    var alertText;
    $scope.alerts = [];
    $scope.aceptada = false;
    var ind_OK;
    var dniCorrecto;
    var fechaInformada;
    
    /**
    * Obtención las pestañas
    */
    var obtenerTab = function(){
        config.getTab().then(function(data){
            $scope.tabs = data;
        })
    }
    
    /**
    * Método para obtener todos las noticias
    */
    var obtenerTodo =function(){
        //Consulta de todas las noticias en BBDD
        events.getAll(false).then(function(data){
            $scope.eventos = data;
            
            for(var i = 0; i < $scope.eventos.length; i++){
                
                var fechaEvento = new Date($scope.eventos[i].FECHA);
                var fechaHoy = new Date();
                if(fechaHoy > fechaEvento){
                    $scope.eventos[i].HABILITADO = false;
                } else {
                    $scope.eventos[i].HABILITADO = true;
                }
                
                if($scope.eventos[i].FECHA === "0000-00-00 00:00:00"){
                    $scope.eventos[i].FECHA = "Próximamente";
                    fechaInformada = false;
                } else {
                    fechaInformada = true;
                    var d = new Date($scope.eventos[i].FECHA);

                    var dia = ("0" + (d.getDate())).slice(-2);
                    var mes = ("0" + (d.getMonth()+1)).slice(-2);
                    var anio = d.getFullYear();

                    var hora = ("0" + d.getHours()).slice(-2);
                    var minutos = ("0" + d.getMinutes()).slice(-2);

                    var fecha = [dia, mes, anio].join("/");
                    var hora = [hora, minutos].join(":");

                    $scope.eventos[i].FECHA = fecha;
                    $scope.eventos[i].HORA = hora;
                }
            }
        })
    }
    
    $scope.inscribirse = function(evento, nombre, apellidos, dni, email){
                
        comprobarCampos(nombre, apellidos, dni, email);

        if(ind_OK === true){
          validateDNIyNIE(dni);
            if(dniCorrecto === true){
               events.inscribir(evento, nombre, apellidos, dni, email).then(function(resolucion) {
                    if (resolucion === "B") {
                        obtenerTodo();
                        alertType = "success";
                        alertText = "Inscrito correctamente.";
                    } else if (resolucion === "A") {
                        alertType = "warning";
                        alertText = "Usted ya está inscrito en este evento.";
                    } else {
                        alertType = "danger";
                        alertText = "Error a la hora de inscribirse en el evento.";
                    }
                    showAlert();
                })
            }
        }
    }
    
    /**
     * Método para mostrar la alerta
     */
    var showAlert = function() {
        $scope.alert = {
            type: alertType,
            msg: alertText
        };
        $scope.alerts.push($scope.alert);
    }
    
    /**
     * Método para cerrar la alerta
     */
    /*$scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    }*/
    
    /**
     * Método para comprobacion de todos los valores requeridos
     */
    var comprobarCampos = function(nombre, apellidos, dni, email) {
        
        if (nombre === undefined || nombre === '' || nombre === null) {
            ind_OK = false;
            alertType = "danger";
            alertText = "Debe indicar su nombre.";
            showAlert();
        } else if (apellidos === undefined || apellidos === '' || apellidos === null) {
            ind_OK = false;
            alertType = "danger";
            alertText = "Debe indicar sus apellidos.";
            showAlert();
        } else if (dni === undefined || dni === '' || dni === null) {
            ind_OK = false;
            alertType = "danger";
            alertText = "Debe indicar su DNI.";
            showAlert();
        } else if (email === undefined || email === '' || email === null) {
            ind_OK = false;
            alertType = "danger";
            alertText = "Debe indicar su email.";
            showAlert();
        } else {
            ind_OK = true;
        }
    }
    
    var validateDNIyNIE = function(dni) {
        var numero, letr, letra;
        var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

        dni = dni.toUpperCase();

        if(expresion_regular_dni.test(dni) === true){
            numero = dni.substr(0,dni.length-1);
            numero = numero.replace('X', 0);
            numero = numero.replace('Y', 1);
            numero = numero.replace('Z', 2);
            letr = dni.substr(dni.length-1, 1);
            numero = numero % 23;
            letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero+1);
            if (letra != letr) {
                dniCorrecto = false;
                alertType = "danger";
                alertText = "Dni erroneo, la letra del NIF no se corresponde.";
                showAlert();
            }else{
                dniCorrecto = true;
            }
        }else{
            dniCorrecto = false;
            alertType = "danger";
            alertText = "Dni erroneo, formato no válido.";
            showAlert();
        }
    }
    
    obtenerTab();
    obtenerTodo();
});




 
