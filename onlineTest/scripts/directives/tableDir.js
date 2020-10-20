var app=angular.module('otUiApp');

app.directive('tableDir',function(){
    return {
        templateUrl:'views/table.html',
        replace:true,
        scope:{
           headers:'=',
           data:'=',
           edit:'&',
           delete:'&'
        }

    }
})