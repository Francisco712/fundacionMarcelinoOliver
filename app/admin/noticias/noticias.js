'use strict';

angular.module('myApp.adminNoticias', ['ngRoute', 'ngMaterial', 'ui.bootstrap', 'ngAnimate', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/noticias', {
    templateUrl: 'admin/noticias/noticias.html',
    controller: 'NoticiasAdminCtrl'
  });
}])

.controller('NoticiasAdminCtrl', function($scope, $http, $filter, $log, $location, auth) {
    
    var alertType;
    var alertText;
    var ind_OK;
    $scope.alerts = [];
    
    /**
    * Método para establecer cuantos elementos están presentes en la página 
    */
    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    }
    
    // Primera pantalla a mostrar es consulta de noticias
    $scope.new = false;
    
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
    
    /*
    * Método para desloguearse de la parte de administración.
    */
    $scope.logout = function() {
        auth.logout();
    }
	
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
    
    /**
    * Método para obtener todos las noticias
    */
    var obtenerTodo =function(){
        //Consulta de todas las noticias en BBDD
        $http.get('admin/noticias/getAll.php')
            .success(function(response, status) {
                $scope.noticias = response;
                $scope.totalItems = $scope.noticias.length;
            }).error(function(err) {
                $log.error(err);
            })
    }
    
    /*
    * Método para habilitar la pantalla de creación de nuevas noticias.
    */
    $scope.fnew = function() {
        $scope.new = true;
    }
    
    /*
    * Método para deshabilitar la pantalla de creación de nuevas noticias y volver
    * a la pantalla de consulta de noticias.
    */
    $scope.return = function() {
        $scope.new = false;
        $scope.title = "";
        $scope.summary = "";
        $scope.content = "";
    }
    
    /*
    * Método para guardar una noticia en BBDD
    */
    $scope.save = function(){
        comprobarCampos();
        if(ind_OK === true){
            var form_data = new FormData();
            angular.forEach($scope.files, function(file){
                form_data.append('file', file);
            });

            form_data.append('title', $scope.title);
            form_data.append('summary', $scope.summary);
            form_data.append('content', $scope.content);

            $http.post('admin/noticias/insertNews.php', form_data,
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined, 'Process-Data': false}
            }).success(function(response){
                if(response == 'true') {
                    obtenerTodo();
                    $scope.new = false;
                    alertType = "success";
                    alertText = "La noticia se ha guardado correctamente";
                    $scope.title = "";
                    $scope.summary = "";
                    $scope.content = "";
                } else {
                    alertType = "danger";
                    alertText = "Ha ocurrido un error y no se ha guardado correctamente la noticia";
                }
                showAlert();
            })
        }
    }
    
    /*
    * Método para eliminar una entrada de la tabla noticias
    */
    $scope.delete = function(item){
        
        $http.get('admin/noticias/deleteNews.php?id='+item.ID)
            .success(function(response) {
            if(response == 'true'){
                obtenerTodo();
                alertType = "success";
                alertText = "La noticia se ha borrado correctamente";
            } else {
                alertType = "danger";
                alertText = "Ha ocurrido un error y no se ha borrado correctamente la noticia";
            }
            showAlert();
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
    
    /**
    * Método para comprobacion de todos los valores requeridos
    */
    var comprobarCampos = function() {
        if($scope.title === undefined || $scope.title === '' || $scope.title === null){
            ind_OK = false;
            alertType = "danger";
            alertText = "Falta el campo Titulo";
            showAlert();
        } else if ($scope.summary === undefined || $scope.summary === '' || $scope.summary === null){
            ind_OK = false;
            alertType = "danger";
            alertText = "Falta el campo Resumen";
            showAlert();
        } else if ($scope.content === undefined || $scope.content === '' || $scope.content === null){
            ind_OK = false;
            alertType = "danger";
            alertText = "Falta el campo Contenido";
            showAlert();
        } else {
            ind_OK = true;
        }
    }
    
    obtenerTodo();
    
    inicialize();
    
});




 
