'use strict';

angular.module('myApp.adminHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/home', {
    templateUrl: 'admin/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($scope, $http, $filter, $log, $location, auth) {
    
    $scope.logout = function() {
		auth.logout();
	}

});