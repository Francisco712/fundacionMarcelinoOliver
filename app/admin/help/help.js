'use strict';

angular.module('myApp.adminHelp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/help', {
    templateUrl: 'admin/help/help.html',
    controller: 'HelpCtrl'
  });
}])

.controller('HelpCtrl', function($scope, $http, $filter, $log, $location, auth, licenses) {
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Utilizado más adelante
    //$scope.sprintName = "hola";
    //$scope.sprintDesc = "adios";
    
    // Obtenemos los permisos
    licenses.getLicenses().then(function(data){
        $scope.licenses = data;
    })
    
    $scope.logout = function() {
		auth.logout();
	}

});