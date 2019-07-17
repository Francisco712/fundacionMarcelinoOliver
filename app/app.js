'use strict';

// Declare app level module which depends on views, and components
angular

.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.somos',
    'myApp.psicologo',
    'myApp.ciclismo',
    'myApp.juridico',
    'myApp.partners',
    'myApp.colabora',
    'myApp.equipo23',
    'myApp.equipoFemenino',
    'myApp.equipoBase',
    'myApp.seguridadVial',
    'myApp.ciclista',
    'myApp.conductor',
    'myApp.testimonios',
    'myApp.eventos',
    'myApp.noticias',
    'myApp.contenidoNoticia',
    'myApp.protecDatos',
    'myApp.mantenimiento',
    'myApp.admin',
    'myApp.adminHome',
    'myApp.adminUsers',
    'myApp.adminNoticias',
    'myApp.adminHelp',
    'myApp.adminMensajes',
    'myApp.adminConfig',
    'myApp.adminPartners',
    'myApp.adminEvents',
    'myApp.adminTestimonios',
    'myApp.adminCategorias',
    'myApp.version',
    'myApp.comp-users',
    'myApp.comp-notices',
    'myApp.comp-licenses',
    'myApp.comp-events',
    'myApp.comp-configurations',
    'myApp.comp-partners',
    'myApp.comp-messages',
    'myApp.comp-testimonios',
    'myApp.comp-categorias',
    'ngCookies'
])
.constant('MSG_ALERT', {
    SAVE_OK: "Se ha guardado correctamente.",
    SAVE_KO: "Ha ocurrido un error inesperado.",
    DELETE_OK: "Se ha eliminado correctamente",
    LOAD_IMAGE_OK: "La imagen se ha cargado correctamente",
    LOAD_IMAGE_KO: "Ha ocurrido un error y la imagen no se ha cargado correctamente",
    TYPE_SUCCESS: "success",
    TYPE_ERROR: "danger"
})

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/home/0'});
}])

.directive('fileModel', function ($parse) {
    return {
       link: function($scope, element, attrs) {
          element.on("change", function(event){
              var files = event.target.files;
              $parse(attrs.fileModel).assign($scope, element[0].files);
              $scope.$apply();
          });
       }
    }      
 })

/*.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
})*/

.directive('clickToEdit', function($timeout) {
    return {
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            type: '@type'
        },
        replace: true,
        transclude: false,
        // includes our template
        template:
            '<div class="templateRoot">'+
                '<div class="hover-edit-trigger" title="click to edit">'+
                    '<div class="hover-text-field" ng-show="!editState" ng-click="toggle()">{{model}}<div class="edit-pencil glyphicon glyphicon-pencil"></div></div>'+
                    '<input class="inputText" type="text" ng-model="localModel" ng-enter="save()" ng-show="editState && type == \'inputText\'" />' +
                '</div>'+
                '<div class="edit-button-group pull-right" ng-show="editState">'+
                    '<div class="glyphicon glyphicon-ok"  ng-click="save()"></div>'+
                    '<div class="glyphicon glyphicon-remove" ng-click="cancel()"></div>'+
                '</div>'+
            '</div>',
        link: function (scope, element, attrs) {
            scope.editState = false;

            // make a local ref so we can back out changes, this only happens once and persists
            scope.localModel = scope.model;

            // apply the changes to the real model
            scope.save = function(){
                scope.model = scope.localModel;
                scope.toggle();
            };

            // don't apply changes
            scope.cancel = function(){
                scope.localModel = scope.model;
                scope.toggle();
            }

            /*
             * toggles the editState of our field
             */
            scope.toggle = function () {

                scope.editState = !scope.editState;

                /*
                 * a little hackish - find the "type" by class query
                 *
                 */
                var x1 = element[0].querySelector("."+scope.type);

                /*
                 * could not figure out how to focus on the text field, needed $timout
                 * http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field-in-angularjs
                 */
                $timeout(function(){
                    // focus if in edit, blur if not. some IE will leave cursor without the blur
                    scope.editState ? x1.focus() : x1.blur();
                }, 0);
            }
        }
    }
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

.factory("dialogo", function(){
    return {
        data: {}
      };
})

.factory("auth", function($http, $q, $cookies,$cookieStore,$location)
{
    return{
        login : function(username, name)
        {
            //creamos la cookie con el nombre que nos han pasado
            var exp = new Date();
            exp.setDate(exp.getDate() + 1);

            $cookies.put('username', username,{
              expires: exp
            });

            $cookies.put('name', name,{
              expires: exp
            });
            
            //mandamos a home
            $location.path("admin/home");
        },
        
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove("username"),
            $cookieStore.remove("name");
            
            //mandamos al login
            $location.path("admin");
        },
        
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/admin/home", "/admin/users", "/admin/notices", "/admin/eventos", "/admin/config", "/admin/messages", "/admin/help", "/admin/partners", "/admin/testimonios", "admin/categorias"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.get('username')) == "undefined")
            {
                $location.path("admin")
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array("/admin",rutasPrivadas) && typeof($cookies.get('username')) != "undefined")
            {
                $location.path("admin/home")
            }
        },
        
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        },
        
        getName : function(){
            return $cookies.get('name');
        },
        
        getUserName : function(){
            return $cookies.get('username');
        },
        
        findUser : function(user, password){
            
            var defered = $q.defer();  
            var promise = defered.promise;

            var page = 'login/login.php?user='+user+'&pass='+password;
            $http.get(page).success(function(response) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        }
    }
})

.run(function($rootScope, auth)
{   
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    });
});