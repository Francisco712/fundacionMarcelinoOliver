'use strict';

angular.module('myApp.adminCategorias', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/categorias', {
    templateUrl: 'admin/categorias/categorias.html',
    controller: 'CategoriasAdminCtrl'
  });
}])

.controller('CategoriasAdminCtrl', function($scope, $http, $filter, $log, $location, auth, licenses, $mdDialog, categorias, MSG_ALERT) {
    
    var update = false;
    $scope.categorias = {};
    $scope.disabled = true;
    
    var alertType;
    var alertText;
    $scope.alerts = [];
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Obtenemos los permisos
    licenses.getLicenses().then(function(data){
        $scope.licenses = data;
    })
    
    $scope.logout = function() {
		auth.logout();
	}

    /**
    * Método para establecer cuantos elementos están presentes en la página  
    */
    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    }
    
    /*
    * Método para habilitar la pantalla de creación de nuevas categorias.
    */
    $scope.fnew = function() {
        $scope.new = true;
        $scope.categorias = {};
        update = false;
        $scope.disabled = false;
    }
    
    $scope.save = function() {
        
        if(update === false){
            categorias.save($scope.categoria).then(function(insertado){
                if(insertado == 'true'){
                    obtenerTodo();
                    $scope.new = false;
                    alertType = MSG_ALERT.TYPE_SUCCESS;
                    alertText = MSG_ALERT.SAVE_OK;
                } else {
                    alertType = MSG_ALERT.TYPE_ERROR;
                    alertText = MSG_ALERT.SAVE_KO;
                }
                showAlert(); 
            })
        } else {
            categorias.update($scope.categoria).then(function(actualizado){
                if(actualizado == 'true'){
                    obtenerTodo();
                    $scope.new = false;
                    alertType = MSG_ALERT.TYPE_SUCCESS;
                    alertText = MSG_ALERT.SAVE_OK;
                } else {
                    alertType = MSG_ALERT.TYPE_ERROR;
                    alertText = MSG_ALERT.SAVE_KO;
                }
                showAlert(); 
            })
        }
    }
    
    /**
    * Método para mostrar el dialogo de confirmación de la eliminación
    */
    $scope.showConfirm = function(ev, item) {
    
        var confirm = $mdDialog.confirm()
              .title('¿Estas seguro que deseas eliminar esta categoria?')
              .textContent('Una vez eliminada no se podrá recuperar posteriormente.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Si')
              .cancel('No');


        $mdDialog.show(confirm).then(function() {
            $scope.delete(item);
        }, function() {
            $mdDialog.hide();
        });
      }
    
    /*
    * Método para eliminar una categoria
    */
    $scope.delete = function(item){

        // Se borra la noticia con identificador item.ID
        categorias.remove(item.ID).then(function(borrado){
           if(borrado == 'true'){
                obtenerTodo();
                alertType = MSG_ALERT.TYPE_SUCCESS;
                alertText = MSG_ALERT.DELETE_OK;
            } else {
                alertType = MSG_ALERT.TYPE_ERROR;
                alertText = MSG_ALERT.SAVE_KO;
            }
            showAlert(); 
        })
    }
    
    $scope.ver = function(item){
        $scope.categoria = item;
        $scope.new = true;
        update = true;
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
    
    /*
    * Método para deshabilitar la pantalla de creación de nuevas categorias y volver
    * a la pantalla de consulta de categorias.
    */
    $scope.return = function() {
        $scope.new = false;
        $scope.disabled = true;
        $scope.categoria = {};
        update = false;
        obtenerTodo();
    }
    
    /**
    * Método para inicializar algunas variables
    */
    function inicialize() {
        // Configuración alertas
        alertType = "";
        alertText = "";
        
        $scope.viewby = '10';
        $scope.currentPage = 4;
        $scope.itemsPerPage = $scope.viewby;
    }
    
    /**
    * Método para obtener todas las categorias
    */
    var obtenerTodo =function(){
        //Consulta de todas las categorias
        categorias.getAll().then(function(data){
            $scope.categorias = data;
            $scope.totalItems = $scope.categorias.length;
        })
    }
    
    $scope.allowUpdate = function() {
        $scope.disabled = !$scope.disabled;
    }
    
    inicialize()
    obtenerTodo();
});