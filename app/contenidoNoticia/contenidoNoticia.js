'use strict';

angular.module('myApp.contenidoNoticia', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/noticias/:id', {
    templateUrl: 'contenidoNoticia/contenidoNoticia.html',
    controller: 'ContenidoNoticiasCtrl'
  });
}])

.controller('ContenidoNoticiasCtrl', function($scope, $http, $filter, $log, $location, $routeParams, config, notices, categorias) {
    
    /**
    * Obtención las pestañas
    */
    var obtenerTab = function(){
        config.getTab().then(function(data){
            $scope.tabs = data;
        })
    }
    
    /**
    * Método para obtener la noticia
    */
    var obtenerNoticia = function(){
        notices.findByPk($routeParams.id).then(function(data){
            $scope.noticia = data;
        })
    }
    
    /**
    * Método para obtener las categorias a las que pertenece una noticia
    */
    var obtenerCategorias = function(){
        categorias.getByIdNotice($routeParams.id).then(function(data){
            $scope.categorias = data;
        })
    }
    
    obtenerTab();
    obtenerNoticia();
    obtenerCategorias();
});




 
