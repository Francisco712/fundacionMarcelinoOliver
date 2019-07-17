'use strict';

angular.module('myApp.mantenimiento', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mantenimiento', {
    templateUrl: 'mantenimiento/mantenimiento.html',
    controller: 'MantenimientoCtrl'
  });
}])

.controller('MantenimientoCtrl', function($scope, $http, $filter, $log, $location) {
    
});




 
