'use strict';

angular.module('myApp.comp-licenses', [])

.factory("licenses", function($http, $cookieStore, $q){
    
    var data = {};
    
    return {
        
        addLicenses : function(licenses){
            data = parseLicenses(licenses);
            return data;
        },
        
        getLicenses : function(){
            
            var defered = $q.defer();  
            var promise = defered.promise;

            var user = $cookieStore.get('username');
            var page2 = 'login/getLicenses.php?user=' + user;
            $http.get(page2)
            .success(function(response, status) {
                data = parseLicenses(response[0]);
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        },
        
        findByPk : function(id){
            
            var defered = $q.defer();  
            var promise = defered.promise;

            var page2 = 'admin/usuarios/getLicensesById.php?id=' + id;
            $http.get(page2)
            .success(function(response, status) {
                defered.resolve(parseLicenses(response[0]));
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        },
        
        insert : function(id, permisos){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            var page = 'admin/usuarios/insertLicenses.php?id=' + id +'&showUsers='+permisos.showUsers+'&createUsers='+permisos.createUsers+'&updateUsers='+permisos.updateUsers+'&deleteUsers='+permisos.deleteUsers+'&showNews='+permisos.showNews+'&createNews='+permisos.createNews+'&updateNews='+permisos.updateNews+'&deleteNews='+permisos.deleteNews+'&capacityValidation='+permisos.capacityValidation+'&validatedNews='+permisos.validatedNews;
            
            $http.get(page)
            .success(function(response, status) {
                defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err);
            })

            return promise;
        },
        
        update : function(id, permisos){
            
            var defered = $q.defer();  
            var promise = defered.promise;
            var page = 'admin/usuarios/updateLicenses.php?id=' + id +'&showUsers='+permisos.showUsers+'&createUsers='+permisos.createUsers+'&updateUsers='+permisos.updateUsers+'&deleteUsers='+permisos.deleteUsers+'&showNews='+permisos.showNews+'&createNews='+permisos.createNews+'&updateNews='+permisos.updateNews+'&deleteNews='+permisos.deleteNews+'&capacityValidation='+permisos.capacityValidation+'&validatedNews='+permisos.validatedNews;
            
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
            var page = 'admin/usuarios/deleteLicenses.php?id=' + id;
            
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

function parseLicenses(licenses){
        
    var data = {};

    if(licenses.showUsers === "true"){
        data.showUsers = true;
    }else{
        data.showUsers = false;
    }

    if(licenses.createUsers === "true"){
        data.createUsers = true;
    }else{
        data.createUsers = false;
    }

    if(licenses.updateUsers === "true"){
        data.updateUsers = true;
    }else{
        data.updateUsers = false;
    }

    if(licenses.deleteUsers === "true"){
        data.deleteUsers = true;
    } else {
        data.deleteUsers = false;
    }

    if(licenses.showNews === "true"){
        data.showNews = true;
    } else {
        data.showNews = false;
    }

    if(licenses.createNews === "true"){
        data.createNews = true;
    } else {
        data.createNews = false;
    }

    if(licenses.updateNews === "true"){
        data.updateNews = true;
    } else{
        data.updateNews = false;
    }

    if(licenses.deleteNews === "true"){
        data.deleteNews = true;
    } else {
        data.deleteNews = false;
    }

    if(licenses.capacityValidation === "true"){
        data.capacityValidation = true;
    } else {
        data.capacityValidation = false;
    }

    if(licenses.validatedNews === "true"){
        data.validatedNews = true;
    } else {
        data.validatedNews = false;
    }

    return data;
}
