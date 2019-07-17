'use strict';

angular.module('myApp.adminPartners', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/partners', {
    templateUrl: 'admin/partners/partners.html',
    controller: 'PartnersAdminCtrl'
  });
}])

.controller('PartnersAdminCtrl', function($scope, $http, $filter, $log, $location, auth, $mdDialog, licenses, partners, MSG_ALERT) {
    
    var update = false;
    $scope.patrocinador = {};
    $scope.disabled = true;
    
    var alertType;
    var alertText;
    $scope.alerts = [];
    
    // Manipulación de los input type files
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input ){
      var label	= input.nextElementSibling,
      labelVal = label.innerHTML;

       input.addEventListener( 'change', function( e ){
          var fileName = '';
          if( this.files && this.files.length > 1 )
             fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
          else
             fileName = e.target.value.split( '\\' ).pop();

          if( fileName )
             label.querySelector( 'span' ).innerHTML = fileName;
          else
             label.innerHTML = labelVal;
           });
    });
    
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
        $scope.patrocinador = {};
        update = false;
        $scope.disabled = false;
    }
    
    $scope.save = function() {
        
        if(update === false){
            partners.save($scope.patrocinador.NOMBRE, $scope.patrocinador.IMAGEN, $scope.patrocinador.RESUMEN, $scope.patrocinador.URL).then(function(insertado){
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
            partners.update($scope.patrocinador.ID, $scope.patrocinador.NOMBRE, $scope.patrocinador.IMAGEN, $scope.patrocinador.RESUMEN, $scope.patrocinador.URL).then(function(actualizado){
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
              .title('¿Estas seguro que deseas eliminar este patrocinador?')
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

        // Se borra la noticia con identificador item.ID
        partners.remove(item.ID).then(function(borrado){
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
    
    $scope.getImages = function() {

        partners.getImages().then(function(imagenes) {
            $scope.imagenes = imagenes;
        }).catch(function(err) {
            $scope.error = err;
        })
    }
    
    $scope.ver = function(item){
        $scope.patrocinador = item;
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
        $scope.patrocinador = {};
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
        partners.getAll().then(function(data){
            $scope.patrocinadores = data;
            $scope.totalItems = $scope.patrocinadores.length;
        })
    }
    
    $scope.subirImagen = function(){
        var form_data = new FormData();
            angular.forEach($scope.files, function(file){
                form_data.append('file', file);
            });
        
        $http.post('admin/partners/subirImagen.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).success(function(response){
                    if(response == 'true') {
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.LOAD_IMAGE_OK;
                        
                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.LOAD_IMAGE_KO;
                    }
                    showAlert();
                })
    }
    
    $scope.allowUpdate = function() {
        $scope.disabled = !$scope.disabled;
    }
    
    inicialize()
    obtenerTodo();
});