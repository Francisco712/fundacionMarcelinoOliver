'use strict';

angular.module('myApp.comp-configurations', [])

.factory("config", function($http, $q){
    
    return {
        
        updateById : function(id, pestana, titulo, contenido){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            var form_data = new FormData();

            form_data.append('id', id)
            form_data.append('pestana', pestana);
            form_data.append('titulo', titulo);
            form_data.append('contenido', contenido);

            $http.post('common/updateConfig.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).success(function(response){
                    defered.resolve(response);
                }).error(function(err) {
                    defered.reject(err);
                });
            
            return promise;
        },
        
        getImages : function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/configuracion/getImages.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getInfo: function(){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/configuracion/getConfig.php')
            .success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        setInfo: function(pages){
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.post('admin/configuracion/setConfig.php', {
                data: {pages: pages}
            }).success(function(response) {
                defered.resolve(response);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        },
        
        getTab: function(){
            var data = [];
            var defered = $q.defer();  
            var promise = defered.promise;
            
            $http.get('admin/configuracion/getConfig.php')
            .success(function(response) {
                
                for(var i = 0; i < response.length; i++){
                    var conf = {};
                    conf.tab = response[i].tab;
                    conf.url = response[i].url;
                    
                    if(Array.isArray(response[i].section)){
                        conf.section = response[i].section;
                    }else {
                        conf.section = [];
                    }
                    
                    if(Array.isArray(response[i].subpage)){
                        var subData = [];
                        for(var j = 0; j < response[i].subpage.length; j++){
                            var subpage = {};
                            subpage.tab = response[i].subpage[j].tab;
                            subpage.url = response[i].subpage[j].url;
                            subData.push(subpage);
                        }
                        
                        if(subData != null){
                            conf.subpage = [];
                            conf.subpage = subData;
                        }
                    } else{
                        
                        var subData = {};
                        if(response[i].subpage != null){
                            subData.tab = response[i].subpage.tab;
                            subData.url = response[i].subpage.url;
                            
                            conf.subpage = [];
                            conf.subpage.push(subData);
                        }else{
                            var subpage = [];
                            conf.subpage = subpage;
                        }
        
                    }
                    
                    data.push(conf);
                }
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            });
            
            return promise;
        }
    }
})