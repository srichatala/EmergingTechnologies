var app = angular.module('App', ['ngRoute','ControllersDoctor', 'ControllersPatient']);

app.config(['$routeProvider',
    function ($routeProvider){ 
        $routeProvider.
            when('/', {
            templateUrl: 'View/Home.html'
        }).
        when('/DocReg', {
            templateUrl: 'View/DoctorReg.html',
            controller:'DocReg'
        }).
        when('/PatientReg', {
            templateUrl: 'View/PatientReg.html',
            controller: 'PatientRegistration'
        }).
        when('/DocLogin', {
            templateUrl: 'View/DocLogin.html',
            controller: 'DocLogin'
        }).
         when('/PatientLogin', {
            templateUrl: 'View/PatientLogin.html',
            controller:'PatientLogin'
        }).
        otherwise({
            redirectTo:'/'
        });
    }]);
