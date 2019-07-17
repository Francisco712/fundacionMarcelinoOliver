'use strict';

angular.module('myApp.protecDatos', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/proteccion_datos', {
    templateUrl: 'proteccion_datos/proteccion_datos.html',
    controller: 'ProtecDatosCtrl'
  });
}])

.controller('ProtecDatosCtrl', function($scope, $http, $filter, $log, $location, $routeParams, config) {
    
});




 
