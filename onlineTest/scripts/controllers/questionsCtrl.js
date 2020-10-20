var app = angular.module('otUiApp');

app.controller('questionsCtrl', function ($scope, ServerCall,$location,$routeParams,$timeout) {
debugger;
var path= $location.path();
$scope.fnQuePre=function () {
       ServerCall.fnSendReq('questions/prepare-questions','post',$scope.data)
           .then(function (res) {
               debugger;
               if (res.data && (res.data.affectedRows > 0)) {
                   $scope.msg = "Question Submited successfully";
                   $scope.data = {};
               } else {
                   $scope.msg = "Please try again";
               }
           })
           .catch(function (res) {
               $scope.msg = "Something went wrong";
           })
        }
// question list
$scope.queHeaders=['ID','Subject','Question','Opt1','Opt2','Opt3','Opt4','Ans','School']
$scope.getQueList = function () {
    debugger;
    $scope.queList=[];

    var subj=$scope.sub;
    // for(var key in $scope.data){
    //     var subj=$scope.data[key]
    // } 


    ServerCall.fnSendReq('questions/question-list?sub='+subj,'get')
    .then(function (res) {
        $scope.queList=res.data;
    })
    .catch(function (res) {
        $scope.queList=[];
    })
}
$scope.getQueList();
// if (path == '/que-list') {
//     $scope.getQueList();
// }
// if(path.indexOf('/que-list') != -1){
//     var subj=$routeParams.
//     $scope.getQueList();
// }



});