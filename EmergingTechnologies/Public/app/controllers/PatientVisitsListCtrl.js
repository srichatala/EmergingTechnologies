﻿app.controller('PatientVisitsListCtrl', function ($scope, $http) {
    //get the response from the server and send it to front end to display information
    $scope.renderpatientModels = function (response) {
        $scope.patientModels = response;
    };

    //get request to get dpctor names from doctor schema
    $scope.PatientInfo = function () {
        $http.get('/PatientInfo')
            .success($scope.renderpatientModels);
    }
    //initialization of the DocInfo method active when page is loaded
    $scope.PatientInfo();
    $scope.showStates = function (item) {
        item.active = !item.active;
    };
});