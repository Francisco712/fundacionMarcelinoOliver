'use strict';

angular.module('myApp.adminMensajes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/messages', {
    templateUrl: 'admin/mensajes/mensajes.html',
    controller: 'MensajesCtrl'
  });
}])

.controller('MensajesCtrl', function($scope, $http, $filter, $log, $location, auth, licenses, messages) {
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Obtenemos los permisos
    licenses.getLicenses().then(function(data){
        $scope.licenses = data;
    })
    
    $scope.mensaje;
    $scope.logout = function() {
		auth.logout();
	}

    $http.get('admin/mensajes/getUsuarios.php')
        .success(function(response, status) {
            $scope.users = response;
        
            $scope.users.forEach(function(currentValue){
                    
                if(currentValue.FOTO_PERFIL == ""){
                    if(currentValue.SEXO == "M")
                        currentValue.FOTO_PERFIL = "assets/images/profiles/manUser.jpg";
                    else if(currentValue.SEXO == "F")
                        currentValue.FOTO_PERFIL = "assets/images/profiles/womanUser.jpg";
                    }
            })
        })
        .error(function(err) {
            $log.error(err);
        })

    $scope.sendMSG = function(){

        messages.send($scope.selectedUser, $scope.mensaje).then(function(data){
            $scope.getMSG($scope.selectedUser);
            $scope.mensaje = "";
        })        
    }
    
    $scope.getMSG = function(user){
        
        $scope.selectedUser = user;
        messages.get(user).then(function(data){
            $scope.msgs = data;
            
            $scope.msgs.forEach(function(currentValue){

            if(currentValue.FOTO_E == ""){
                if(currentValue.SEXO_E == "M")
                    currentValue.FOTO_E = "assets/images/profiles/manUser.jpg";
                else if(currentValue.SEXO_E == "F")
                    currentValue.FOTO_E = "assets/images/profiles/womanUser.jpg";
            }
        })
        })
    }
});