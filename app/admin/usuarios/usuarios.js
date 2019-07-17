'use strict';

angular.module('myApp.adminUsers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/users', {
    templateUrl: 'admin/usuarios/usuarios.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', function($scope, $http, $filter, $log, $location, $routeParams, $mdDialog, auth, users, licenses, MSG_ALERT) {
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Obtenemos los permisos
    licenses.getLicenses().then(function(data){
        $scope.licenses = data;
    })
    
    var alertType;
    var alertText;
    var ind_OK;
    $scope.alerts = [];
    $scope.user = {};
    $scope.disabled = true;
    
    // Primera pantalla a mostrar es consulta de noticias
    $scope.new = false;
    var update = false;
    
    /**
    * Método para establecer cuantos elementos están presentes en la página  
    */
    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    }
    
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
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
    
    $scope.toggleAllUser = function () {
        
        if($scope.indUser.all === false){
            
            $scope.indUser.showUsers = true;
            $scope.indUser.createUsers = true;
            $scope.indUser.updateUsers = true;
            $scope.indUser.deleteUsers = true;
            
        } else {
            
            $scope.indUser.showUsers = false;
            $scope.indUser.createUsers = false;
            $scope.indUser.updateUsers = false;
            $scope.indUser.deleteUsers = false;
        }
        
    }
    
    $scope.toggleAllNotices = function () {
        
        if($scope.indNews.all === false){
            
            $scope.indNews.showNews = true;
            $scope.indNews.createNews = true;
            $scope.indNews.updateNews = true;
            $scope.indNews.deleteNews = true;
            $scope.indNews.capacityValidation = true;
            $scope.indNews.validatedNews = true;
            
        } else {
            
            $scope.indNews.showNews = false;
            $scope.indNews.createNews = false;
            $scope.indNews.updateNews = false;
            $scope.indNews.deleteNews = false;
            $scope.indNews.capacityValidation = false;
            $scope.indNews.validatedNews = false;
        }
    }
    
    $scope.logout = function() {
		auth.logout();
	}

    /**
    * Método para obtener todos los usuarios
    */
    var obtenerTodo =function(){
        //Consulta de todos los usuarios en BBDD
        users.getAllLessUser().then(function(data){
            $scope.usuarios = data;
            $scope.totalItems = $scope.usuarios.length;
        })
    }
    
    /**
    * Métodod para insertar y actualizar un usuario
    */
    $scope.save = function(){
    
        var permisos = {
                showUsers: $scope.indUser.showUsers,
                createUsers: $scope.indUser.createUsers,
                updateUsers: $scope.indUser.updateUsers,
                deleteUsers: $scope.indUser.deleteUsers,
                showNews: $scope.indNews.showNews,
                createNews: $scope.indNews.createNews,
                updateNews: $scope.indNews.updateNews,
                deleteNews: $scope.indNews.deleteNews,
                capacityValidation: $scope.indNews.capacityValidation,
                validatedNews: $scope.indNews.validatedNews
        };
        
        if(update === false){
            users.insert($scope.user.user, $scope.user.password, $scope.user.nombre, $scope.user.apellidos, $scope.user.sexo).then(function(response){
                if (response == 'true') {
                    users.findByName($scope.user.user).then(function(pers){
                        licenses.insert(pers[0].ID, permisos).then(function(insertado){
                            if (insertado == 'true') {
                                obtenerTodo();
                                $scope.new = false;
                                alertType = MSG_ALERT.TYPE_SUCCESS;
                                alertText = MSG_ALERT.SAVE_OK;
                                $scope.user = {};
                            } else {
                                alertType = MSG_ALERT.TYPE_ERROR;
                                alertText = MSG_ALERT.SAVE_KO;
                            }
                            showAlert();
                        })
                    })
                } else {
                    alertType = MSG_ALERT.TYPE_ERROR;
                    alertText = MSG_ALERT.SAVE_KO;
                }
                showAlert();
            })
        } else {
            users.update($scope.user.id, $scope.user.user, $scope.user.password, $scope.user.nombre, $scope.user.apellidos, $scope.user.sexo).then(function(response){
                if (response == 'true') {
                    licenses.update($scope.user.id, permisos).then(function(actualizado){
                        if (actualizado == 'true') {
                            obtenerTodo();
                            $scope.new = false;
                            alertType = MSG_ALERT.TYPE_SUCCESS;
                            alertText = MSG_ALERT.SAVE_OK;
                            $scope.user = {};
                        } else {
                            alertType = MSG_ALERT.TYPE_ERROR;
                            alertText = MSG_ALERT.SAVE_KO;
                        }
                        showAlert();
                    })
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
                .title('¿Estas seguro que deseas eliminar este usuario?')
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
    
    /**
    * Método para eliminar un usuario
    */
    $scope.delete = function(item) {
        users.delete(item.id).then(function(borrado){
            if (borrado == 'true') {
                licenses.delete(item.id).then(function(borradoLicenses){
                    if(borradoLicenses == 'true'){
                        obtenerTodo();
                        $scope.new = false;
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.DELETE_OK;
                        $scope.user = {};
                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.SAVE_KO;
                    }
                    showAlert();
                })
            } else {
                alertType = MSG_ALERT.TYPE_ERROR;
                alertText = MSG_ALERT.SAVE_KO;
            }
            showAlert();
        })
    }
    
    /*
    * Método para habilitar la pantalla de creación de nuevas noticias.
    */
    $scope.fnew = function() {
        $scope.new = true;
        $scope.disabled = false;
        update = false;
        $scope.tab = 1;
        
        $scope.indUser = {all: false, showUsers: false, createUsers: false, updateUsers: false, deleteUsers: false};
        $scope.indNews = {all: false, showNews: false, createNews: false, updateNews: false, deleteNews: false, capacityValidation: false, validatedNews: false};
    }
    
    /*
    * Método para deshabilitar la pantalla de creación de nuevas noticias y volver
    * a la pantalla de consulta de noticias.
    */
    $scope.return = function() {
        $scope.user = {};
        $scope.notices = [];
        $scope.new = false;
        $scope.disabled = true;
        $scope.licensesUserSelected = {};
        update = false;
    }
    
    /**
    * Método para mostrar el detalle de la noticia
    */
    $scope.ver = function(item) {
        licenses.findByPk(item.id).then(function(data){
            $scope.licensesUserSelected = data;
            rellenarPermisos();
        })
        $scope.tab = 1;
        obtenerNoticias(item.id);
        $scope.user = item;
        $scope.disabled = true;
        $scope.new = true;
        update = true;
    }
    
    $scope.allowUpdate = function(){
        $scope.disabled = !$scope.disabled;
    }
    
    var rellenarPermisos = function(){
        
        var allUsers = false;
        var allNews = false; 
        
        if($scope.licensesUserSelected.showUsers === true && $scope.licensesUserSelected.createUsers == true && $scope.licensesUserSelected.updateUsers == true && $scope.licensesUserSelected.deleteUsers == true){
            allUsers = true;
        }
        
        $scope.indUser = {
            all : allUsers,
            showUsers : $scope.licensesUserSelected.showUsers,
            createUsers : $scope.licensesUserSelected.createUsers,
            updateUsers : $scope.licensesUserSelected.updateUsers,
            deleteUsers : $scope.licensesUserSelected.deleteUsers
        }

        if($scope.licensesUserSelected.showNews === true && $scope.licensesUserSelected.createNews == true && $scope.licensesUserSelected.updateNews == true && $scope.licensesUserSelected.deleteNews == true && $scope.licensesUserSelected.capacityValidation == true && $scope.licensesUserSelected.validatedNews == true){
            allNews = true;
        }
        
        $scope.indNews = {
            all : allNews,
            showNews : $scope.licensesUserSelected.showNews,
            createNews : $scope.licensesUserSelected.createNews,
            updateNews : $scope.licensesUserSelected.updateNews,
            deleteNews : $scope.licensesUserSelected.deleteNews,
            capacityValidation : $scope.licensesUserSelected.capacityValidation,
            validatedNews : $scope.licensesUserSelected.validatedNews
        }
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
    
    var obtenerNoticias = function(id) {
    
        users.getNotices(id).then(function(data){
            $scope.notices = data;
        })
    }
    
    $scope.verNoticia = function(id) {
        var url = "admin/notices/"+id;
        $location.path(url);
    }
    obtenerTodo();
    inicialize();
});