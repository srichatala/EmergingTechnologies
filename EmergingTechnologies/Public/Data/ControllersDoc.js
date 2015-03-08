var appDoc = angular.module('ControllersDoctor', []);

appDoc.controller('DocReg', function ($scope, $http) {
    $scope.create = function () {
        $http.post('/docReg', $scope.docReg)
            .success(function (response) { 
            $scope.message = "Registration Completed";
        });
    };
});
