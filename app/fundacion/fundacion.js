'use strict';

angular.module('myApp.home', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'fundacion/fundacion.html',
    controller: 'FundacionCtrl'
  });
}])

.controller('FundacionCtrl', function($scope, $http, $filter, $log, $location) {
    

});




 
