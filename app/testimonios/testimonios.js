'use strict';

angular.module('myApp.testimonios', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/testimonios/:page', {
    templateUrl: 'testimonios/testimonios.html',
    controller: 'TestimoniosCtrl'
  });
}])

.controller('TestimoniosCtrl', function($scope, $http, $filter, $log, $location, $routeParams, config, testimonios) {
    
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
    * Método para obtener todos los testimonios
    */
    var obtenerTodo =function(){
        //Consulta de todos los c
        testimonios.getAll().then(function(data){
            $scope.testimonios = data;
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




 
