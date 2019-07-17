'use strict';

angular.module('myApp.ciclista', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ciclista/:page/:subPage', {
    templateUrl: 'ciclista/ciclista.html',
    controller: 'CiclistaCtrl'
  });
}])

.controller('CiclistaCtrl', function($scope, $http, $filter, $log, $location, $routeParams, config, notices) {
    
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
            $scope.config = data[$routeParams.page].subpage[$routeParams.subPage];
            if(!Array.isArray($scope.config.section)){
               var section = {};
               section = $scope.config.section;
               $scope.config.section = [];
               $scope.config.section.push(section);
            }
            rellenarStyle();
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
    obtenerNoticias();
});




 
