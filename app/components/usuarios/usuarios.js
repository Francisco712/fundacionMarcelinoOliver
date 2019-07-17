'use strict';

angular.module('myApp.comp-users', [])

.factory("users", function($http, $cookieStore, $q){
    
    return {
        
        findByName : function(user){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/usuarios/findByname.php?user='+user)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getAll : function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/usuarios/getAll.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getAllLessUser : function(){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var user = $cookieStore.get('username');
            $http.get('admin/usuarios/getAllLessUser.php?id='+user)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        insert : function(user, password, nombre, apellidos, sexo){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/usuarios/insertUser.php?user='+user+'&password='+password+'&nombre='+nombre+'&apellidos='+apellidos+'&sexo='+sexo)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        update : function(id, user, password, nombre, apellidos, sexo){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/usuarios/updateUser.php?id='+id+'&user='+user+'&password='+password+'&nombre='+nombre+'&apellidos='+apellidos+'&sexo='+sexo)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        delete : function(id){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/usuarios/deleteUser.php?id='+id)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getNotices : function(id){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/usuarios/getNotices.php?id='+id)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        }
    }
})