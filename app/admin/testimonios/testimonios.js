'use strict';

angular.module('myApp.adminTestimonios', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/testimonios', {
    templateUrl: 'admin/testimonios/testimonios.html',
    controller: 'TestimoniosAdminCtrl'
  });
}])

.controller('TestimoniosAdminCtrl', function($scope, $http, $filter, $log, $location, auth, $mdDialog, licenses, testimonios, MSG_ALERT) {
    
    var update = false;
    $scope.testimonio = {};
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
    * Método para habilitar la pantalla de creación de nuevos patrocinadores.
    */
    $scope.fnew = function() {
        $scope.new = true;
        $scope.testimonio = {};
        update = false;
        $scope.disabled = false;
    }
    
    $scope.save = function() {
        
        if(update === false){
            
            testimonios.insert($scope.testimonio.NOMBRE, $scope.testimonio.CONTENIDO).then(function(insertado){
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
           testimonios.update($scope.testimonio.ID, $scope.testimonio.NOMBRE, $scope.testimonio.CONTENIDO).then(function(actualizado){
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
              .title('¿Estas seguro que deseas eliminar este testimonio?')
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
    * Método para eliminar una entrada de la tabla noticias
    */
    $scope.delete = function(item){

        testimonios.delete(item.ID).then(function(borrado){
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
        $scope.testimonio = item;
        $scope.testimonio.FECHA = new Date(item.FECHA);
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
    * Método para deshabilitar la pantalla de creación de nuevos patrocinadores y volver
    * a la pantalla de consulta de patrocinadores.
    */
    $scope.return = function() {
        $scope.new = false;
        $scope.disabled = true;
        $scope.testimonio = {};
        obtenerTodo();
        update = false;
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
    * Método para obtener todos los patrocinadores
    */
    var obtenerTodo =function(){
        //Consulta de todos los patrocinadores
        testimonios.getAll().then(function(data){
            $scope.testimonios = data;
            $scope.totalItems = $scope.testimonios.length;
        })
    }
    
    inicialize()
    obtenerTodo();
});