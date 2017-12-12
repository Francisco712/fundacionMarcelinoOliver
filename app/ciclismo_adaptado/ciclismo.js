'use strict';

angular.module('myApp.ciclismo', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ciclismo-adaptado', {
    templateUrl: 'ciclismo_adaptado/ciclismo.html',
    controller: 'CiclismoCtrl'
  });
}])

.controller('CiclismoCtrl', function($scope, $http, $filter, $log, $location) {
    

});




 
