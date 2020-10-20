var app = angular.module('otUiApp');

app.controller('usersCtrl', function ($scope, ServerCall,$location,$routeParams,$timeout) {
    /** handle update oparation */
    debugger;
    var path=$location.path();
     if(path=='/users-reg'){
         $scope.heading='School';
        $scope.roles='school';
    }
    if(path=='/std-reg'){
        $scope.heading='Student';
        $scope.roles='student';
    }

    $scope.fnGetUserInfo=function(id){
        ServerCall.fnSendReq('users/get-user-details?id='+id,'get')
        .then(function(res){
            if(res.data && (res.data.length >0)){
                $scope.data=res.data[0];
            }else{
                alert("user doesn't  exist");
            }
        })
        .catch(function(res){
           alert("something went wrong");
        })
   }
   if(path.indexOf('/users-update') != -1){
    var id=$routeParams.id
    $scope.fnGetUserInfo(id)
}
   $scope.fnUpdate=function(){
       debugger;
    ServerCall.fnSendReq('users/update-user', 'post', $scope.data)
    .then(function (res) {
        debugger;
        if (res.data && (res.data.affectedRows > 0)) {
            $scope.msg = "updated successfully";
            $timeout(function(){
                $location.path('/users-list')
            },3000);
            $scope.data = {};
        } else {
            $scope.msg = "Please try again";
        }
    })
    .catch(function (res) {
        $scope.msg = "Something went wrong";
    })
   }
    
    $scope.getEditInfo=function(user){ 
        debugger;
        $location.path('/users-update/'+user.id)
    }
    
    $scope.usersHeaders=['ID','USER NAME','PASSWORD','EMAIL','PHONE','ROLE']
    /* --- register button click ---*/
    
    $scope.fnReg = function () {
        ServerCall.fnSendReq('users/user-reg', 'post', $scope.data)
            .then(function (res) {
                debugger;
                if (res.data && (res.data.affectedRows > 0)) {
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

    /** get schools list  */

    $scope.getUsersList = function () {
        $scope.usersList=[];
        ServerCall.fnSendReq('users/users-list', 'get')
        .then(function (res) {
            $scope.usersList=res.data;
        })
        .catch(function (res) {
            $scope.usersList=[];
        })
    }
   
    /** get update data */
     
    if (path == '/users-list') {
        $scope.getUsersList();
    }
    
    

     /** delete */
 $scope.fnDelete=function(user){
         debugger;   
ServerCall.fnSendReq('users/delete-user?id='+user.id,'get',undefined)

   .then(function(res){
        debugger
        if(res.data.affectedRows>0){
            alert('Deleted Row succesfully');
            $scope.getUsersList()

        }else{
            alert('Row is not Deleted') 
        }
     })
     .catch(function(res){
        alert('somting went wrong')
     })
  }

})