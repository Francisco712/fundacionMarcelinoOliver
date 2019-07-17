'use strict';

angular.module('myApp.adminConfig', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/config', {
    templateUrl: 'admin/configuracion/configuracion.html',
    controller: 'ConfigCtrl'
  });
}])

.controller('ConfigCtrl', function($scope, $http, $filter, $log, $location, auth, config, licenses, categorias) {
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Obtenemos los permisos
    licenses.getLicenses().then(function(data){
        $scope.licenses = data;
    })
    
    var alertType;
    var alertText;
    $scope.tab = 1;
    $scope.secundaryTab = 1;
    $scope.terciaryTab = 1;
    $scope.cuaternaryTab = 1;
    $scope.alerts = [];
    $scope.user = {};
    
    $scope.setSecundaryTab = function(newTab){
        $scope.secundaryTab = newTab;
    };

    $scope.isSecundarySet = function(tabNum){
        return $scope.secundaryTab === tabNum;
    }
    
    $scope.setTerciaryTab = function(newTab){
        $scope.terciaryTab = newTab;
    };

    $scope.isTerciarySet = function(tabNum){
        return $scope.terciaryTab === tabNum;
    }
    
    $scope.setCuaternaryTab = function(newTab){
        $scope.cuaternaryTab = newTab;
    };

    $scope.isCuaternarySet = function(tabNum){
        return $scope.cuaternaryTab === tabNum;
    }
    
    $scope.setTab = function(newTab){
        $scope.secundaryTab = 1;
        $scope.terciaryTab = 1;
        $scope.cuaternaryTab = 1;
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    }
    
    $scope.aniadirPestania = function(){
        
        var pestania = {
            tab: "",
            url: "",
            section: [{
                identificator: "Sección 1",
                type: "",
                aline: "",
                optional1: {
                    head: "",
                    paragraph: "",
                },
                optional2: {
                    head: "",
                    paragraph: "",
                },
                areaMult: {
                    mult: ""
                }
            }]
        }
        
        $scope.config.push(pestania);
    }
    
    $scope.aniadirSeccionPage = function(page){
        
        var numSeccion = parseInt(page.section.length) + parseInt(1);
        var nameSeccion = "Sección " + numSeccion;
        var seccion = {
                identificator: nameSeccion,
                type: "",
                aline: "",
                optional1: {
                    head: "",
                    paragraph: "",
                },
                optional2: {
                    head: "",
                    paragraph: "",
                },
                areaMult: {
                    mult: ""
                }
            }
        
        page.section.push(seccion);
        $scope.setSecundaryTab(parseInt(page.section.length));
    }
    
    $scope.aniadirSeccionSubpage = function(subpage){
        
        var numSeccion = parseInt(subpage.section.length) + parseInt(1);
        var nameSeccion = "Sección " + numSeccion;
        var seccion = {
                identificator: nameSeccion,
                type: "",
                aline: "",
                optional1: {
                    head: "",
                    paragraph: "",
                },
                optional2: {
                    head: "",
                    paragraph: "",
                },
                areaMult: {
                    mult: ""
                }
            }
        
        subpage.section.push(seccion);
        $scope.setCuaternaryTab(parseInt(subpage.section.length));
    }
    
    $scope.getImages = function(){
        
        config.getImages().then(function(imagenes){
            $scope.imagenes = imagenes;
        }).catch(function(err) {
            $scope.error = err;
        })
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
    
    $scope.logout = function() {
		auth.logout();
	}

    $scope.save = function(){
        
        for(var i = 0; i < $scope.config.length; i++){
            
            if(Array.isArray($scope.config[i].section)){
                
                for(var j = 0; j < $scope.config[i].section.length; j++){
              
                    if(Object.values($scope.config[i].section[j].aline).length == 0){
                        $scope.config[i].section[j].aline = "";
                    }

                    if(Object.values($scope.config[i].section[j].optional1.head).length == 0){
                        $scope.config[i].section[j].optional1.head = "";
                    }

                    if(Object.values($scope.config[i].section[j].optional1.paragraph).length == 0){
                        $scope.config[i].section[j].optional1.paragraph = "";
                    }

                    if(Object.values($scope.config[i].section[j].optional2.head).length == 0){
                        $scope.config[i].section[j].optional2.head = "";
                    }

                    if(Object.values($scope.config[i].section[j].optional2.paragraph).length == 0){
                        $scope.config[i].section[j].optional2.paragraph = "";
                    }

                    if(Object.values($scope.config[i].section[j].areaMult.mult).length == 0){
                        $scope.config[i].section[j].areaMult.mult = "";
                    }
                }
            } else {
                if(!$scope.config[i].section) {
                    var section = [];
                    $scope.config[i].section = section;    
                } else {
                    var seccionPagina = {};
                    seccionPagina = $scope.config[i].section;
                    $scope.config[i].section = [];
                    $scope.config[i].section.push(seccionPagina);

                    for(var j = 0; j < $scope.config[i].section.length; j++){

                        if(Object.values($scope.config[i].section[j].aline).length == 0){
                            $scope.config[i].section[j].aline = "";
                        }

                        if(Object.values($scope.config[i].section[j].optional1.head).length == 0){
                            $scope.config[i].section[j].optional1.head = "";
                        }

                        if(Object.values($scope.config[i].section[j].optional1.paragraph).length == 0){
                            $scope.config[i].section[j].optional1.paragraph = "";
                        }

                        if(Object.values($scope.config[i].section[j].optional2.head).length == 0){
                            $scope.config[i].section[j].optional2.head = "";
                        }

                        if(Object.values($scope.config[i].section[j].optional2.paragraph).length == 0){
                            $scope.config[i].section[j].optional2.paragraph = "";
                        }

                        if(Object.values($scope.config[i].section[j].areaMult.mult).length == 0){
                            $scope.config[i].section[j].areaMult.mult = "";
                        }
                    }
                }
            }
            
            if(Array.isArray($scope.config[i].subpage)){
                for(var k = 0; k < $scope.config[i].subpage.length; k++){
                    
                    if(Array.isArray($scope.config[i].subpage[k].section)){
                        for(var l = 0; l < $scope.config[i].subpage[k].section.length; l++){
                            if(Object.values($scope.config[i].subpage[k].section[l].aline).length == 0){
                                $scope.config[i].subpage[k].section[l].aline = "";
                            }

                            if(Object.values($scope.config[i].subpage[k].section[l].optional1.head).length == 0){
                                $scope.config[i].subpage[k].section[l].optional1.head = "";
                            }

                            if(Object.values($scope.config[i].subpage[k].section[l].optional1.paragraph).length == 0){
                                $scope.config[i].subpage[k].section[l].optional1.paragraph = "";
                            }

                            if(Object.values($scope.config[i].subpage[k].section[l].optional2.head).length == 0){
                                $scope.config[i].subpage[k].section[l].optional2.head = "";
                            }

                            if(Object.values($scope.config[i].subpage[k].section[l].optional2.paragraph).length == 0){
                                $scope.config[i].subpage[k].section[l].optional2.paragraph = "";
                            }

                            if(Object.values($scope.config[i].subpage[k].section[l].areaMult.mult).length == 0){
                                $scope.config[i].subpage[k].section[l].areaMult.mult = "";
                            }
                        }
                    } else {
                        if(!$scope.config[i].subpage[k].section) {
                            $scope.config[i].subpage[k].section = [{
                                identificator: "",
                                type: "",
                                aline: "",
                                optional1: {
                                    head: "",
                                    paragraph: "",
                                },
                                optional2: {
                                    head: "",
                                    paragraph: "",
                                },
                                areaMult: {
                                    mult: ""
                                }
                            }];    
                        } else {
                            var seccionSubpagina = {};
                            seccionSubpagina = $scope.config[i].subpage[k].section;
                            $scope.config[i].subpage[k].section = [];
                            $scope.config[i].subpage[k].section.push(seccionSubpagina);
                            
                            for(var l = 0; l < $scope.config[i].subpage[k].section.length; l++){
                                if(Object.values($scope.config[i].subpage[k].section[l].aline).length == 0){
                                    $scope.config[i].subpage[k].section[l].aline = "";
                                }

                                if(Object.values($scope.config[i].subpage[k].section[l].optional1.head).length == 0){
                                    $scope.config[i].subpage[k].section[l].optional1.head = "";
                                }

                                if(Object.values($scope.config[i].subpage[k].section[l].optional1.paragraph).length == 0){
                                    $scope.config[i].subpage[k].section[l].optional1.paragraph = "";
                                }

                                if(Object.values($scope.config[i].subpage[k].section[l].optional2.head).length == 0){
                                    $scope.config[i].subpage[k].section[l].optional2.head = "";
                                }

                                if(Object.values($scope.config[i].subpage[k].section[l].optional2.paragraph).length == 0){
                                    $scope.config[i].subpage[k].section[l].optional2.paragraph = "";
                                }

                                if(Object.values($scope.config[i].subpage[k].section[l].areaMult.mult).length == 0){
                                    $scope.config[i].subpage[k].section[l].areaMult.mult = "";
                                }
                            }
                        }
                    }
                }
            } else {
                if(!$scope.config[i].subpage) {
                    var subpage = [];
                    $scope.config[i].subpage = subpage; 
                }
            }
        }
        
        config.setInfo($scope.config).then(function(data){
                if(data == 'true') {
                    alertType = "success";
                    alertText = "La pestaña se ha actualizado correctamente";
                } else {
                    alertType = "danger";
                    alertText = "Ha ocurrido un error y no se ha actualizado correctamente la pestaña";
                }
                showAlert();
        })
    }
    
    /**
    * Método para obtener toda la configuración
    */
    var obtenerTodo =function(){
        //Consulta de toda la configuración en BBDD
        config.getInfo().then(function(data){
            $scope.config = data;
            
            $scope.sectionEnabled = [];
            $scope.subpageEnabled = [];
            for(var i = 0; i < $scope.config.length; i++){
                
                if(Object.keys($scope.config[i].categoria).length === 0){
                    $scope.config[i].categoria = "";
                }
                
                if(Array.isArray($scope.config[i].section)){
                    $scope.sectionEnabled[i] = true;
                } else {
                    $scope.sectionEnabled[i] = false;
                }
                
                if(Array.isArray($scope.config[i].subpage)){
                    $scope.subpageEnabled[i] = true;
                    
                    for(var k = 0; k < $scope.config[i].subpage.length; k++){
                    
                        if(Object.keys($scope.config[i].subpage[k].categoria).length === 0){
                            $scope.config[i].subpage[k].categoria = "";
                        }
                        
                        if(!Array.isArray($scope.config[i].subpage[k].section) && $scope.config[i].subpage[k].section){
                            var sectionSub = {};
                            sectionSub = $scope.config[i].subpage[k].section;
                            $scope.config[i].subpage[k].section = [];
                            $scope.config[i].subpage[k].section.push(sectionSub);
                        }
                    }
                } else {
                    $scope.subpageEnabled[i] = false;
                }
            }
        })
    }
    
    /**
    * Método para mostrar todas las categorias
    */
    var getCategory = function(){
        categorias.getAll().then(function(data){
            $scope.categorias = data;
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
    
    obtenerTodo();
    getCategory();
    inicialize();
});