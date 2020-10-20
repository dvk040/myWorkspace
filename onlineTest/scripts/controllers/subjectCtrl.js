 
var app = angular.module('otUiApp');

app.controller('subjectCtrl', function ($scope, ServerCall,$location,$routeParams,$timeout) {
debugger;
   var path= $location.path();
 $scope.fnReg = function () {
        ServerCall.fnSendReq('subject/subj-reg', 'post', $scope.data)
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
// get subject list
$scope.subHeaders=['ID','SubName','School']
$scope.getSubList = function () {
    debugger;
    $scope.subList=[];
    ServerCall.fnSendReq('subject/sub-list','get')
    .then(function (res) {
        $scope.subList=res.data;
    })
    .catch(function (res) {
        $scope.subList=[];
    })
}
if (path == '/sub-list') {
    $scope.getSubList();
}

// update subject list
$scope.subEditInfo=function(user){ 
    debugger;
    $location.path('/sub-update/'+user.id)
}

// get std-data
$scope.fnGetSubInfo=function(id){
    ServerCall.fnSendReq('subject/get-sub-details?id='+id,'get')
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
if(path.indexOf('/sub-update') != -1){
    var id=$routeParams.id
    $scope.fnGetSubInfo(id)
}
// update now std-data
$scope.fnSubUpdate=function(){
    debugger;
 ServerCall.fnSendReq('subject/update-subj', 'post', $scope.data)
 .then(function (res) {
     debugger;
     if (res.data && (res.data.affectedRows > 0)) {
         $scope.msg = "updated successfully";
         $timeout(function(){
             $location.path('/sub-list')
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

$scope.fnDelete=function(user){
    debugger;
 ServerCall.fnSendReq('subject/delete-subj?id='+user.id,'get')
 .then(function (res) {
     debugger;
     if (res.data.affectedRows > 0) {
        alert( "deleted successfully");
        $scope.getSubList();
     } else {
         $scope.msg = "Please try again";
     }
 })
 .catch(function (res) {
     $scope.msg = "Something went wrong";
 })
}

});
