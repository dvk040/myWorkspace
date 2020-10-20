var app=angular.module('otUiApp');

app.directive('headerDir',function(){
    return {
        template:'<div class="header text-center bg-primary">Online Test</div>',
        replace:true
    }
})