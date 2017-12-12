'use strict';

angular.module('myApp.adminHelp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/help', {
    templateUrl: 'admin/help/help.html',
    controller: 'HelpCtrl'
  });
}])

.controller('HelpCtrl', function($scope, $http, $filter, $log, $location, auth) {
    
    $scope.logout = function() {
		auth.logout();
	}

});