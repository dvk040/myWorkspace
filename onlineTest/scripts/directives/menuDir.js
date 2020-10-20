var app=angular.module('otUiApp');

app.directive('menuDir',function(){
    return {
        templateUrl:'views/menu.html',
        replace:true,
        controller:function($scope,$rootScope){
            $scope.isLoggedIn=false;
            var uid=sessionStorage.uid;
            var role=sessionStorage.role;
            if(uid && role){
                $scope.isLoggedIn=true;
                $scope.role=role; 
            }

            $rootScope.$on('login-eve',function(eve,data){
                debugger;
                sessionStorage.uid=data.uid;
                sessionStorage.role=data.role;
                $scope.isLoggedIn=true;
                $scope.role=data.role;
            })
            $scope.fnLogout=function(){
                debugger
                if(sessionStorage.getItem('role')){
                    sessionStorage.clear();
                     $scope.isLoggedIn=false;
                     $scope.role='';
                     alert('Logged Out succesfully')
                }
            }
            
        }
    }
})