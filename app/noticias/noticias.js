'use strict';

angular.module('myApp.noticias', ['ngRoute', 'ngMaterial', 'textAngular'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/noticias', {
    templateUrl: 'noticias/noticias.html',
    controller: 'NoticiasCtrl'
  });
}])

.controller('NoticiasCtrl', function($scope, $http, $filter, $log, $location) {
    
    /**
    * Método para obtener todos las noticias
    */
    var obtenerTodo =function(){
        //Consulta de todas las noticias en BBDD
        $http.get('admin/noticias/getAll.php')
            .success(function(response, status) {
                $scope.noticias = response;
                $scope.totalItems = $scope.noticias.length;
            }).error(function(err) {
                $log.error(err);
            })
    }
    
    obtenerTodo();
});




 
