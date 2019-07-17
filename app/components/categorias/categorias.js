'use strict';

angular.module('myApp.comp-categorias', [])

.factory("categorias", function($http, $cookieStore, $q){
    
    return {
        
        getAll : function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/categorias/getAll.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getByIdNotice : function(id) {
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/categorias/getByIdNotice.php?id='+id)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        save : function (categoria){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var form_data = new FormData();
            form_data.append('categoria', JSON.stringify(categoria));
            
            $http.post('admin/categorias/insert.php', form_data, {
                transformRequest: angular.identity,
                headers: {
                       'Content-Type': undefined,
                       'Process-Data': false
                    } }).success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        saveCategoryNew : function (idNoticia, categorias) {
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var array = new Array();
            for(var i = 0; i < categorias.length; i++){
                array.push(categorias[i].ID_CATEGORIA);
            }
            
            var form_data = new FormData();
            form_data.append('id', idNoticia);
            form_data.append('categorias', JSON.stringify(array));
            
            $http.post('admin/categorias/insertCategoriaNoticia.php', form_data, {
                transformRequest: angular.identity,
                headers: {
                       'Content-Type': undefined,
                       'Process-Data': false
                    } }).success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        remove : function(id){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/categorias/delete.php?id='+id)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        update : function(categoria){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var form_data = new FormData();
            form_data.append('categoria', JSON.stringify(categoria));
            
            $http.post('admin/categorias/update.php', form_data, {
                transformRequest: angular.identity,
                headers: {
                       'Content-Type': undefined,
                       'Process-Data': false
                    } }).success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        }
    }
})