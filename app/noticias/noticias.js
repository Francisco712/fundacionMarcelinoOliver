'use strict';

angular.module('myApp.noticias', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/noticias', {
    templateUrl: 'noticias/noticias.html',
    controller: 'NoticiasCtrl'
  });
}])

.controller('NoticiasCtrl', function($scope, $http, $filter, $log, $location, config, notices) {
    
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
        notices.getAll(false).then(function(data){
            $scope.noticias = data;
            $scope.totalItems = $scope.noticias.length;
        })
    }
    
    /**
    * Método para redirigir hacia la noticia clicada
    */
    $scope.showNoticia = function(id){
        $location.path("noticias/"+id);
    }
    
    obtenerTab();
    obtenerTodo();
});




 
