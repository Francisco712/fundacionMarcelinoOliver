'use strict';

angular.module('myApp.comp-notices', [])

.factory("notices", function($http, $q){
    
    return {
        
        findByPk : function(id){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/noticias/findByPk.php?id='+id)
            .success(function(response) {
                defered.resolve(response[0]);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getAll : function(ascen){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/noticias/getAll.php?orden='+ascen)
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
            
            $http.get('admin/noticias/deleteNews.php?id='+id)
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
            
            $http.get('admin/noticias/getImages.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getByCategory : function(c) {
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/noticias/getByCategory.php?cat='+c)
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        }
    }
})