app.controller('patientListCtrl', function ($scope, $http) {
    $scope.renderpatientModels = function (response) {
        $scope.patientModels = response;
    };

    //get request to get dpctor names from doctor schema
    $scope.PatientInfo = function (currentUser) {
        $http.get('/PatientInfoDoc')
            .success($scope.renderpatientModels);
    }
    //initialization of the DocInfo method active when page is loaded
    $scope.PatientInfo();
});