'use strict';

angular.module('myApp.seguridadVial', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/seguridad-vial/:page', {
    templateUrl: 'seguridad-vial/seguridad-vial.html',
    controller: 'SeguridadvialCtrl'
  });
}])

.controller('SeguridadvialCtrl', function($scope, $http, $filter, $log, $location, $routeParams, config) {
    
    var path = (window.location.hash).substr(3);
    
    $scope.style = [];
    $scope.config = [];
    
    /**
    * Obtención las pestañas
    */
    var obtenerTab = function(){
        config.getTab().then(function(data){
            $scope.tabs = data;
        })
    }
    
    /**
    * Obtener toda la configuración
    */
    var obtenerTodo =function(){
        //Consulta de toda la configuración en BBDD
        config.getInfo().then(function(data){
            $scope.config = data[$routeParams.page];
            rellenarStyle();
        })
    }
    
    $scope.translate = function(t){
        
        var text = t;
        text = text.replace(/@p/g, "<p>");
        text = text.replace(/@!p/g, "</p>");
        return text;
    }
    
    var rellenarStyle = function(){
    
        for(var i = 0; i < $scope.config.section.length; i++){
            var imagen = "url("+$scope.config.section[i].areaMult.mult+")";
                var styleSection = {
                    "background": imagen,
                    "background-size": "cover",
                    "background-attachment": "fixed",
                    "background-repeat": "no-repeat"
                }
            $scope.style.push(styleSection);
        }
    }
    
    obtenerTab();
    obtenerTodo();
});




 
