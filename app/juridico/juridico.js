'use strict';

angular.module('myApp.juridico', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/juridico', {
    templateUrl: 'juridico/juridico.html',
    controller: 'JuridicoCtrl'
  });
}])

.controller('JuridicoCtrl', function($scope, $http, $filter, $log, $location) {
    

});




 
