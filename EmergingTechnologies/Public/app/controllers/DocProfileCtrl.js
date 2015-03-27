app.controller('DocProfileCtrl', function ($scope, $http) {

    $http.get("/rest/user")
    .success(function (users) {
        $scope.users = users;
    });
});