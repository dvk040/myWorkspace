var app=angular.module('otUiApp');



app.controller('LoginCtrl',function($scope,ServerCall,$location,$rootScope){
    
    // $scope.isloginfm.uid.$untouched=true;
    // $scope.isloginfm.pwd.$untouched=true;
 

    $scope.fnLogin=function(){
        ServerCall.fnSendReq('users/login-check','post',$scope.data)
        .then(function(res){
            if(res.data.length > 0){
                $rootScope.$broadcast('login-eve',res.data[0]);
                $location.path('/home')
            }else{
                $scope.msg="Please check your entered uid or pwd";
            }
        })
        .catch(function(res){
            debugger; $scope.msg="Something went wrong..try again";
        })
    }
})