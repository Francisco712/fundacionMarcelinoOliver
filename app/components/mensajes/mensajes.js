'use strict';

angular.module('myApp.comp-messages', [])

.factory("messages", function($http, $q){
    
    return {
        
        send : function(user, message){
             
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var page = 'admin/mensajes/setMensaje.php?user='+user+'&msg='+message;
            $http.get(page).success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })
            
            return promise;
        },
        
        get : function(user){
            
            var defered = $q.defer();  
            var promise = defered.promise;

            var page = 'admin/mensajes/getMensajes.php?user='+user;
            $http.get(page).success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        }
    }
})