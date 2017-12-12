'use strict';

angular
    
.module('myApp.admin', ['ngRoute', 'ui.bootstrap.modal'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'login/login.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', function($scope, $http, $location, $log, auth) {
    
    $scope.login = function()
    {
        var page = 'login/login.php?user='+$scope.user+'&pass='+$scope.password;
        $http.get(page)
        .success(function(response, status) {
            auth.login(response[0].USER, response[0].PASSWORD);
        })
        .error(function(err) {
            $log.error(err);
        })
        
    }
    
});




 
