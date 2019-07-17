'use strict';

angular
    
.module('myApp.admin', ['ngRoute', 'ui.bootstrap.modal'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'login/login.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', function($scope, $http, $location, $log, auth, licenses) {
    
    var alertType;
    var alertText;
    $scope.alerts = [];
    
    $scope.login = function()
    {
        auth.findUser($scope.user, $scope.password).then(function(data){
            if(data.length > 0){
                licenses.findByPk(data[0].id).then(function(licensesUser){
                    licenses.addLicenses(licensesUser);
                    auth.login(data[0].id, data[0].nombre);
                })
            }else{
                alertType = "danger";
                alertText = "El usuario no existe o no está registrado";
                showAlert();
            }
        })
    }
    
    /**
    * Método para mostrar la alerta
    */
    var showAlert = function() {
        $scope.alert =   {
            type: alertType,
            msg: alertText
        };
        $scope.alerts.push($scope.alert);
    }
    
    /**
    * Método para cerrar la alerta
    */
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    }
});




 
