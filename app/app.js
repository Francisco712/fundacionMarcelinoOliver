'use strict';

// Declare app level module which depends on views, and components
angular

.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.psicologo',
  'myApp.ciclismo',
  'myApp.juridico',
  'myApp.noticias',
  'myApp.admin',
  'myApp.adminHome',
  'myApp.adminNoticias',
  'myApp.adminHelp',
  'myApp.version',
  'ngCookies'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}])

/*.directive("alertMessage", function($compile) {
    return {
        restrict: "E",
        scope: {
            alertM: "="
        },
       	link: function (scope, element) {
            scope.$watch('alertM', function () {
                updateAlert();
            });

            scope.close = function() {
                scope.alertM = null;
            }

            function updateAlert() {
                var html = "";

                if (scope.alertM) {
                    var icon = null;

                    switch (scope.alertM.type) {
                        case 'success': {
                            icon = 'ok-sign';
                        } break;
                        case 'warning': {
                            icon = 'exclamation-sign';
                        } break;
                        case 'info': {
                            icon = 'info-sign';
                        } break;
                        case 'danger': {
                            icon = 'remove-sign';
                        } break;
                    }

                    html = "<div class='alert alert-" + scope.alert.type + "' role='alert'>";

                    if (scope.alertM.closable) {
                        html += "<button type='button' class='close' data-dismiss='alert' ng-click='close()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                    }

                    if (icon) {
                        html += "<span style='padding-right: 5px;' class='glyphicon glyphicon-" + icon + "' aria-hidden='true'></span>";
                    }

                    html += scope.alertM.text;
                    html += "</div>";
                }

                var newElement = angular.element(html);
                var compiledElement = $compile(newElement)(scope);

                element.html(compiledElement);

                if (scope.alertM && scope.alertM.delay > 0) {
                    setTimeout(function () {
                        scope.alertM = null; 
                        scope.$apply();
                    }, scope.alertM.delay * 1000);
                }
            }
        }
  	}
})
*/
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
		 
.directive('tooltip', function(){
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
})

.factory("auth", function($cookies,$cookieStore,$location)
{
    return{
        login : function(username, password)
        {
            //creamos la cookie con el nombre que nos han pasado
            var exp = new Date();
            exp.setDate(exp.getDate() + 1);

            $cookies.put('username',username,{
              expires: exp
            });

            $cookies.put('password',password,{
              expires: exp
            });

            //mandamos a home
            $location.path("admin/home");
        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove("username"),
            $cookieStore.remove("password");
            //mandamos al login
            $location.path("admin");
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/admin/home", "/admin/noticias", "/admin/help"];
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



