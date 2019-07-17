'use strict';

angular.module('myApp.adminEvents', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/eventos', {
    templateUrl: 'admin/eventos/eventos.html',
    controller: 'EventsCtrl'
  });
}])

.controller('EventsCtrl', function($scope, $http, $filter, $log, $location, auth, events, licenses, MSG_ALERT) {
    
    // Obtenemos el nombre del usuario logueado
    $scope.name = auth.getName();
    
    // Obtenemos los permisos
    licenses.getLicenses().then(function(data){
        $scope.licenses = data;
    })
    
    var alertType;
    var alertText;
    var ind_OK;
    $scope.alerts = [];
    $scope.event = {};
    $scope.disabled = true;
    
    /**
     * Método para establecer cuantos elementos están presentes en la página
     */
    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    }
    
    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    }
    
    // Primera pantalla a mostrar es consulta de noticias
    $scope.new = false;
    var update = false;
    
    /**
    * Método para inicializar algunas variables
    */
    function inicialize() {
        // Configuración alertas
        alertType = "";
        alertText = "";   
        
        $scope.viewby = '10';
        $scope.currentPage = 4;
        $scope.itemsPerPage = $scope.viewby;
    }
    
    $scope.logout = function() {
		auth.logout();
	}

    /**
    * Método para obtener todos los usuarios
    */
    var obtenerTodo =function(){
        //Consulta de todos los usuarios en BBDD
        events.getAll().then(function(data){
            $scope.eventos = data;
            
            for(var i = 0; i < $scope.eventos.length; i++){
                if($scope.eventos[i].FECHA === "0000-00-00 00:00:00"){
                    $scope.eventos[i].FECHA = "Próximamente";
                }
            }
            
            $scope.totalItems = $scope.eventos.length;
        })
    }
    
    /**
    * Método para obtener todos los participantes
    */
    var obtenerParticipantes = function(codigo) {
        events.getParticipantes(codigo).then(function(data){
            $scope.participantes = data;
            $scope.numeroParticipantes = data.length;
            
            if(data.length !== 0){
                $scope.descargable = true;
            }
        })
    }
    
    /*
    * Método para habilitar la pantalla de creación de nuevas noticias.
    */
    $scope.fnew = function() {
        $scope.event = {};
        $scope.new = true;
        $scope.disabled = false;
        update = false;
    }
    
    /*
    * Método para deshabilitar la pantalla de creación de nuevas noticias y volver
    * a la pantalla de consulta de noticias.
    */
    $scope.return = function() {
        $scope.event = {};
        obtenerTodo();
        $scope.new = false;
        $scope.disabled = true;
    }
    
    /**
    * Método para mostrar el detalle de la noticia
    */
    $scope.ver = function(item) {
        $scope.event = item;
        $scope.fecha = item.FECHA;
        $scope.event.FECHA = new Date(item.FECHA);
        $scope.descargable = false;
        obtenerParticipantes(item.CODIGO);
        $scope.tab = 1;
        $scope.new = true;
        update = true;
    }
    
    $scope.allowUpdate = function(){
        $scope.disabled = !$scope.disabled;
    }
    
    /**
    * Método para mostrar la alerta
    */
    var showAlert = function() {
        $scope.alert =   {
            type: alertType,
            msg: alertText
        };
        $scope.alerts.push($scope.alert);
    }
    
    $scope.getImages = function() {

        events.getImages().then(function(imagenes) {
            $scope.imagenes = imagenes;
        }).catch(function(err) {
            $scope.error = err;
        })
    }
    
    $scope.subirImagen = function(){
        var form_data = new FormData();
            angular.forEach($scope.files, function(file){
                form_data.append('file', file);
            });
        
        $http.post('admin/eventos/subirImagen.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).success(function(response){
                    if(response == 'true') {
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.LOAD_IMAGE_OK;
                        
                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.LOAD_IMAGE_KO;
                    }
                    showAlert();
                })
    }
    
    /*
     * Método para guardar una noticia en BBDD
     */
    $scope.save = function() {
        //if (ind_OK === true) {
            var form_data = new FormData();
            
            if (!($scope.event.FECHA === null || $scope.event.FECHA === undefined || $scope.event.FECHA === "")){
                var date = convert($scope.event.FECHA);
            }
        
            if (update === true) {
                
                form_data.append('id', $scope.event.CODIGO);
                form_data.append('title', $scope.event.TITULO);
                form_data.append('description', $scope.event.DESCRIPCION);
                form_data.append('photo', $scope.event.FOTO);
                form_data.append('date', date);
                form_data.append('place', $scope.event.LUGAR);
                
                $http.post('admin/eventos/update.php', form_data, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                }).success(function(response) {
                    if (response == 'true') {
                        obtenerTodo();
                        $scope.new = false;
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.SAVE_OK;
                        $scope.event = {};

                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.SAVE_KO;
                    }
                    showAlert();
                })
            }

            if (update === false) {
                
                form_data.append('title', $scope.event.TITULO);
                form_data.append('description', $scope.event.DESCRIPCION);
                form_data.append('photo', $scope.event.FOTO);
                form_data.append('date', date);
                form_data.append('place', $scope.event.LUGAR);
                
                $http.post('admin/eventos/insert.php', form_data, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                }).success(function(response) {
                    if (response == 'true') {
                        obtenerTodo();
                        $scope.new = false;
                        alertType = MSG_ALERT.TYPE_SUCCESS;
                        alertText = MSG_ALERT.SAVE_OK;
                        $scope.event = {};
                    } else {
                        alertType = MSG_ALERT.TYPE_ERROR;
                        alertText = MSG_ALERT.SAVE_KO;
                    }
                    showAlert();
                })
            }
        //}
    }
    
    /*
     * Método para eliminar una entrada de la tabla noticias
     */
    $scope.delete = function(item) {

        // Se borra la noticia con identificador item.ID
        events.remove(item.CODIGO).then(function(borrado) {
            if (borrado == 'true') {
                obtenerTodo();
                alertType = MSG_ALERT.TYPE_SUCCESS;
                alertText = MSG_ALERT.DELETE_OK;
            } else {
                alertType = MSG_ALERT.TYPE_ERROR;
                alertText = MSG_ALERT.SAVE_KO;
            }
            showAlert();
        })
    }
    
    /**
     * Método para mostrar la alerta
     */
    var showAlert = function() {
        $scope.alert = {
            type: alertType,
            msg: alertText
        };
        $scope.alerts.push($scope.alert);
    }
    
    /**
     * Método para cerrar la alerta
     */
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    }
    
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2), hour = ("0" + (date.getHours())).slice(-2), mnts = ("0" + (date.getMinutes())).slice(-2), sec = ("0" + (date.getSeconds())).slice(-2);
        var fecha = [ date.getFullYear(), mnth, day ].join("-");
        var hora = [ hour, mnts, sec ].join(":");
        return fecha + " " + hora;
    }
    
    $scope.descargarPDF = function(){
        
        var pdf = new jsPDF('p', 'pt', 'letter');
        pdf.setFont('courier');
        
        pdf.setFontSize(22);
        pdf.setFontType('bold');
        pdf.text(150, 70, 'Información del evento')
        
        pdf.setFontSize(12);
        pdf.text(50, 105, 'Evento: ');
        pdf.setFontType('normal');
        pdf.text(115, 105, $scope.event.TITULO);
        pdf.setFontType('bold');
        pdf.text(50, 120, 'Fecha de realización: ');
        pdf.setFontType('normal');
        
        if($scope.fecha === 'Próximamente'){
            pdf.text(215, 120, 'Próximamente');
        } else {
            pdf.text(215, 120, convert($scope.event.FECHA));
        }
        
        pdf.setFontType('bold');
        pdf.text(50, 135, 'Lugar: ');
        pdf.setFontType('normal');
        pdf.text(115, 135, $scope.event.LUGAR);
        pdf.setFontType('bold');
        pdf.text(50, 160, 'Lista de participantes ');
        
        var tabla = $('#imprimir')[0];
        var source = tabla;

        var specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        var margins = {
            top: 160,
            bottom: 60,
            left: 75,
            width: 525
        };

        pdf.fromHTML(
            source, 
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, 
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                var nombreArchivo = 'Lista_Participantes_Evento_' + $scope.event.CODIGO + '.pdf';
                pdf.save(nombreArchivo);
            }, margins
        );
        
    }
    
    obtenerTodo();
    inicialize();
});