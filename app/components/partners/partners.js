'use strict';

angular.module('myApp.comp-partners', [])

.factory("partners", function($http, $q){
    
    return {
        
        getAll : function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/partners/getAll.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        save : function(nombre, imagen, resumen, url){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/partners/insertPartner.php?nombre='+nombre+'&imagen='+imagen+'&resumen='+resumen+'&url='+url)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        update : function(id, nombre, imagen, resumen, url){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var form_data = new FormData();

            form_data.append('id', id);
            form_data.append('nombre', nombre);
            form_data.append('imagen', imagen);
            form_data.append('resumen', resumen);
            form_data.append('url', url);
            
            $http.post('admin/partners/updatePartner.php', form_data, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                }).success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        remove : function(id){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/partners/deletePartner.php?id='+id)
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
            
            $http.get('admin/partners/getImages.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        }
    }
})