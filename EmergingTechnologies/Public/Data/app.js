var app = angular.module('ET', ['ngRoute',
    'ControllersDoctor', 
    'ControllersPatient']);

app.config(['$routeProvider',
    function ($routeProvider){ 
        $routeProvider.
            when('/', {
            templateUrl: 'View/Home.html'
        }).
        when('/DocReg', {
            templateUrl: 'View/DoctorReg.html',
            constroller:'DoctorRegistration'
        }).
        when('/PatientReg', {
            templateUrl: 'View/PatientReg.html',
            constroller: 'PatientRegistration'
        }).
        when('/DocLogin', {
            templateUrl: 'View/DocLogin.html',
            constroller: 'DocLogin'
        }).
         when('/PatientLogin', {
            templateUrl: 'View/PatientLogin.html',
            controller:'PatientLogin'
        }).
        otherwise({
            redirectTo:'/'
        });
    }]);