var app=angular.module('otUiApp');

app.controller('HomeCtrl',function($scope){
    debugger;
    var role=sessionStorage.role;
    $scope.role=role.toUpperCase();
})