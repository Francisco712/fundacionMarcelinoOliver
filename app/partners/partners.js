'use strict';

angular.module('myApp.partners', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/partners/:page', {
    templateUrl: 'partners/partners.html',
    controller: 'PartnersCtrl'
  });
}])

.controller('PartnersCtrl', function($scope, $http, $filter, $log, $location, $routeParams, config, partners, notices) {
        
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
        partners.getAll().then(function(data){
            $scope.patrocinadores = data;
        })
    }
    
     /**
    * Obtener 4 noticias
    */
    var obtenerNoticias =function(){
        //Consulta de toda la configuración en BBDD
        notices.getByCategory($scope.config.categoria).then(function(data){
            var notice = {};
            $scope.notices = [];
            
            if(Array.isArray(data)){
                for(var i = 0; i < data.length; i++) {
                    notice = data[i];
                    $scope.notices.push(notice);

                    if(i === 3){break;}
                }
            } else {
                notice = data;
                $scope.notices.push(notice);
            }
        })
    }
    
    $scope.showNoticia = function(id){
        $location.path("noticias/"+id);
    }
    
    $scope.showNoticias = function(){
        $location.path("noticias/");
    }
    
    obtenerTab();
    obtenerTodo();
    obtenerNoticias();
});




 
