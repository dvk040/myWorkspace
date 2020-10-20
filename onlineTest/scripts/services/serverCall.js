var app=angular.module('otUiApp');

app.service('ServerCall',function($http){
    this.baseUrl="http://localhost:2021/";
    this.fnSendReq=function(url,method,data){
       return  $http({
            url:this.baseUrl+url,
            method:method,
            data:data
        })
    }
})