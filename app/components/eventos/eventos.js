'use strict';

angular.module('myApp.comp-events', [])

.factory("events", function($http, $cookieStore, $q){
    
    return {
        
        getAll : function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/eventos/getAll.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getImages : function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/eventos/getImages.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        remove : function(id){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/eventos/delete.php?id='+id)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        inscribir : function(codigo, nombre, apellidos, dni, email){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('eventos/inscribir.php?codigo='+codigo+'&nombre='+nombre+'&apellidos='+apellidos+'&dni='+dni+'&email='+email)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getParticipantes : function(codigo){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/eventos/getParticipantes.php?codigo='+codigo)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        }
    }
})