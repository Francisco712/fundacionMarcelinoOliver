'use strict';

angular.module('myApp.comp-testimonios', [])

.factory("testimonios", function($http, $cookieStore, $q){
    
    var data = {};
    
    return {
        
        getAll : function(){
            
            var defered = $q.defer();  
            var promise = defered.promise;

            var page2 = 'admin/testimonios/getAll.php';
            $http.get(page2)
            .success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        },
        
        insert : function(nombre, contenido){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            var page = 'admin/testimonios/insert.php?nombre=' + nombre +'&contenido=' + contenido;
            $http.get(page)
            .success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        },
        
        update : function(id, nombre, contenido){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            var page = 'admin/testimonios/update.php?id=' + id + '&nombre=' + nombre + '&contenido=' + contenido;
            $http.get(page)
            .success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        },
            
        delete : function(id){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            var page = 'admin/testimonios/delete.php?id=' + id;
            
            $http.get(page)
            .success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
        })
        
            return promise;
        }
    }
})
