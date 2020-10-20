var app=angular.module('otUiApp');

app.directive('footerDir',function(){
    return {
        template:'<div class="footer text-center bg-primary">&copy; rigts  belongs to me.</div>',
        replace:true
    }
})