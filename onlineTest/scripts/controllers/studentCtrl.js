var app = angular.module('otUiApp');

app.controller('studentCtrl', function ($scope) {
    debugger;

    $scope.fnReg = function () {
        ServerCall.fnSendReq('users/user-reg', 'post', $scope.data)
            .then(function (res) {
                debugger;
                if (res.data && (res.data.affectedRows>0)) {
                    $scope.msg = "Registed successfully";
                    $scope.data = {};
                } else {
                    $scope.msg = "Please try again";
                }
            })
            .catch(function (res) {
                $scope.msg = "Something went wrong";
            })
    }

});