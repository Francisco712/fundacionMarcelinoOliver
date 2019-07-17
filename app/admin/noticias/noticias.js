'use strict';

angular.module('myApp.adminNoticias', ['ngRoute', 'ui.bootstrap', 'ngMaterial', 'ngAnimate', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin/notices', {
        templateUrl: 'admin/noticias/noticias.html',
        controller: 'NoticiasAdminCtrl'
    })
    $routeProvider.when('/admin/notices/:id', {
        templateUrl: 'admin/noticias/noticias.html',
        controller: 'NoticiasAdminCtrl'
    });
}])

.controller('NoticiasAdminCtrl', function($scope, $http, $filter, $log, $location, $routeParams, auth, $mdDialog, dialogo, licenses, notices, categorias, MSG_ALERT) {

    $scope.selectedCategory = [];
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();

    // Obtenemos los permisos
    licenses.getLicenses().then(function(data) {
        $scope.licenses = data;
    })

    $scope.noticia = {};
    var alertType;
    var alertText;
    var ind_OK;
    $scope.alerts = [];
    $scope.disabled = true;

    /**
     * Método para establecer cuantos elementos están presentes en la página
     */
    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    }

    // Primera pantalla a mostrar es consulta de noticias
    $scope.new = false;
    var update = false;

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
     * Método para obtener todas las noticias
     */
    var obtenerTodo = function() {
        //Consulta de todas las noticias
        notices.getAll(true).then(function(data) {
            $scope.noticias = data;
            $scope.totalItems = $scope.noticias.length;
        })
    }

    /*
     * Método para habilitar la pantalla de creación de nuevas noticias.
     */
    $scope.fnew = function() {
        $scope.selectedCategory = [];
        $scope.new = true;
        update = false;
        $scope.disabled = false;
        CKEDITOR.instances['editor'].setData("");
    }

    /*
     * Método para deshabilitar la pantalla de creación de nuevas noticias y volver
     * a la pantalla de consulta de noticias.
     */
    $scope.return = function() {
        
        if($routeParams.id != null){
            var url = "admin/users";
            $location.path(url);
        } else {
            $scope.new = false;
            $scope.disabled = true;
            $scope.noticia = {};
        }
    }

    /*
     * Método para guardar una noticia en BBDD
     */
    $scope.save = function() {
        
        comprobarCampos();
        
        if (ind_OK == true) {
            var form_data = new FormData();
            form_data.append('id', auth.getUserName());
            form_data.append('title', $scope.noticia.TITULO);
            form_data.append('content', $scope.noticia.CONTENIDO);
            form_data.append('photo', $scope.noticia.FOTO);

            if (update == true) {
                $http.post('admin/noticias/updateNews.php', form_data, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                }).success(function(response) {
                    if (response == 'true') {
                        guardarCategoriaNoticia($scope.noticia.ID);
                        obtenerTodo();
                        $scope.new = false;
                        $scope.noticia = {};
                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.SAVE_KO;
                    }
                    showAlert();
                })
            }

            if (update == false) {
                $http.post('admin/noticias/insertNews.php', form_data, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                }).success(function(response) {
                    if (response.op == true) {
                        guardarCategoriaNoticia(response.id);
                        obtenerTodo();
                        $scope.new = false;
                        $scope.noticia = {};
                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.SAVE_KO;
                    }
                    showAlert();
                })
            }
        }
    }

    var guardarCategoriaNoticia = function (id) {
        
        categorias.saveCategoryNew(id, $scope.selectedCategory).then(function(insertado) {
                if (insertado.op == true) {
                    if(update == false){
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.SAVE_OK;
                    } else {
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.SAVE_OK;
                    }
                } else {
                    alertType = MSG_ALERT.TYPE_ERROR;
                    alertText = MSG_ALERT.SAVE_KO;
                }
            })
    }

    /**
     * Método para mostrar el dialogo de confirmación de la eliminación
     */
    $scope.showConfirm = function(ev, item) {

            var confirm = $mdDialog.confirm()
                .title('¿Estas seguro que deseas eliminar esta noticia?')
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
    $scope.delete = function(item) {

        // Se borra la noticia con identificador item.ID
        notices.remove(item.ID).then(function(borrado) {
            if (borrado == 'true') {
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

    /**
     * Método para mostrar la alerta
     */
    var showAlert = function() {
        $scope.alert = {
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
     * Método para mostrar el detalle de la noticia
     */
    $scope.ver = function(item) {

        $scope.noticia = item;
        item.CONTENIDO = item.CONTENIDO.replace("class=\"center\"", "style=\"text-align:center\"");
        item.CONTENIDO = item.CONTENIDO.replace("class=\"justify\"", "style=\"text-align:justify\"");
        item.CONTENIDO = item.CONTENIDO.replace("class=\"left\"", "style=\"text-align:left\"");
        item.CONTENIDO = item.CONTENIDO.replace("class=\"right\"", "style=\"text-align:right\"");
        CKEDITOR.instances['editor'].setData(item.CONTENIDO);
        $scope.noticia.CONTENIDO = item.CONTENIDO;

        getCategoryNotice(item);
        $scope.new = true;
        update = true;
    }

    $scope.getImages = function() {

        notices.getImages().then(function(imagenes) {
            $scope.imagenes = imagenes;
        }).catch(function(err) {
            $scope.error = err;
        })
    }

    var getCategoryNotice = function (item) {
     
        categorias.getByIdNotice(item.ID).then(function(categorias){
            $scope.selectedCategory = categorias;
        }).catch(function(err) {
            $scope.error = err;
        })
    }
    
    $scope.getCategory = function() {
        
        categorias.getAll().then(function(categorias){
            $scope.categorias = categorias;
            
            for (var i = 0; i < $scope.categorias.length; i++){
                var encontrado = false;
                for(var j = 0; j < $scope.selectedCategory.length && !encontrado; j++){
                    if($scope.categorias[i].ID === $scope.selectedCategory[j].ID_CATEGORIA){
                        $scope.categorias[i].SELECTED = true;
                        encontrado = true;
                    } else {
                        $scope.categorias[i].SELECTED = false;
                    }
                }
            }
        }).catch(function(err) {
            $scope.error = err;
        })
    }
    
    $scope.aniadirCategoria = function(item) {
    
        var categoriaAux = {};
        categoriaAux.ID_CATEGORIA = item.ID;
        categoriaAux.NOMBRE = item.NOMBRE;
        $scope.selectedCategory.push(categoriaAux);
        item.SELECTED = true;
    }
    
    $scope.eliminarCategoria = function(index) {
        
        var item = $scope.selectedCategory[index];
        $scope.selectedCategory.splice(index, 1);
        
        for(var i = 0; i < $scope.categorias.length; i++){
            if($scope.categorias[i].ID === item.ID_CATEGORIA){
                $scope.categorias[i].SELECTED = false;
            }
        }
    }
    
    $scope.showPrev = function(ev) {

        // Pasamos los datos a traves de un servicio al controlador del dialog
        dialogo.data = $scope.noticia;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'admin/noticias/dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
    };

    $scope.allowUpdate = function() {
        $scope.disabled = !$scope.disabled;
    }

    /**
     * Método para comprobacion de todos los valores requeridos
     */
    var comprobarCampos = function() {
        
        $scope.content = CKEDITOR.instances['editor'].getData();
        $scope.content = $scope.content.replace("style=\"text-align:center\"", "class=\"center\"");
        $scope.content = $scope.content.replace("style=\"text-align:justify\"", "class=\"justify\"");
        $scope.content = $scope.content.replace("style=\"text-align:left\"", "class=\"left\"");
        $scope.content = $scope.content.replace("style=\"text-align:right\"", "class=\"right\"");
        $scope.noticia.CONTENIDO = $scope.content;
        if ($scope.noticia.TITULO === undefined || $scope.noticia.TITULO === '' || $scope.noticia.TITULO === null) {
            ind_OK = false;
            alertType = "danger";
            alertText = "Falta el campo Titulo";
            showAlert();
        } else if ($scope.noticia.CONTENIDO === undefined || $scope.noticia.CONTENIDO === '' || $scope.noticia.CONTENIDO === null) {
            ind_OK = false;
            alertType = "danger";
            alertText = "Falta el campo Contenido";
            showAlert();
        } else {
            ind_OK = true;
        }
    }

    $scope.subirImagen = function(){
        var form_data = new FormData();
            angular.forEach($scope.files, function(file){
                form_data.append('file', file);
            });
        
        $http.post('admin/noticias/subirImagen.php', form_data,
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
    
    function DialogController($scope, $mdDialog, dialogo) {

        $scope.noticia = dialogo.data;

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }

    if($routeParams.id != null){
        notices.findByPk($routeParams.id).then(function(data){
            $scope.ver(data);
        })
    } else {
        obtenerTodo();
        inicialize();
    }
});