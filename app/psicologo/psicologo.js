'use strict';

angular.module('myApp.psicologo', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/psicologo', {
    templateUrl: 'psicologo/psicologo.html',
    controller: 'PsicologoCtrl'
  });
}])

.controller('PsicologoCtrl', function($scope, $http, $filter, $log, $location) {
    

});




 
