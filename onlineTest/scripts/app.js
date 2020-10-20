'use strict';

/**
 * @ngdoc overview
 * @name otUiApp
 * @description
 * # otUiApp
 *
 * Main module of the application.
 */
angular
  .module('otUiApp', ['ngRoute','nvd3'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })

     // Admin Block
      .when('/users-reg', {
        templateUrl: 'views/admin/usersReg.html',
        controller: 'usersCtrl'
      })
      .when('/users-list', {
        templateUrl: 'views/admin/usersList.html',
        controller: 'usersCtrl'
      })
      .when('/users-update/:id', {
        templateUrl: 'views/admin/updateSchool.html',
        controller: 'usersCtrl'
      })
      // school block
      .when('/std-reg', {
        templateUrl: 'views/admin/usersReg.html',
        controller: 'usersCtrl'
      })
      .when('/std-list', {
        templateUrl: 'views/school/studentList.html',
        controller: 'studentCtrl'
      })
      .when('/std-update/:id', {
        templateUrl: 'views/school/studentUpdate.html',
        controller: 'studentCtrl'
      })
      .when('/sub-reg', {
        templateUrl: 'views/school/subReg.html',
        controller: 'subjectCtrl' 
      })
      .when('/sub-list', {
        templateUrl: 'views/school/subjectList.html',
        controller: 'subjectCtrl'
      })
      .when('/sub-update/:id', {
        templateUrl: 'views/school/subjectUpdate.html',
        controller: 'subjectCtrl'
      })
      .when('/pre-que', {
        templateUrl: 'views/school/preQuestions.html',
        controller: 'questionsCtrl'
      })
      .when('/que-list', {
        templateUrl: 'views/school/questionsList.html',
        controller: 'questionsCtrl'
      }) 
      .when('/write-test', {
        templateUrl: 'views/exam/exam.html',
        controller: 'examCtrl'
      })
      .when('/Results', {
        templateUrl: 'views/exam/examResult.html',
        controller: 'examCtrl'
      })  

      .otherwise({
        redirectTo: '/login'
      });
  }).run(function($rootScope,$location){
    $rootScope.$on('$routeChangeStart',function(event,next,current){
      var path=$location.path();
      var uid=sessionStorage.uid;
      var role=sessionStorage.role;
      var adminRouteArr=['/home','/users-reg','/users-list','/users-update']
      var schoolRouteArr=['/home','/std-reg','/std-list','/std-update',
      '/sub-reg','/sub-list','/sub-update','/pre-que','/que-update',
      '/que-list'];
      var studentRouteArr=['/home','/write-test','/Results']
      
      if(uid && role){
        if(path=='/login'){
          $location.path('/home')
        }
        var isAutherized=true;
        switch(path){
          case 'admin':      //school-update/12  indexOf gives number
          if(path.indexOf('users-update')!=-1){
            $location.path('/users-update')
          }
          isAutherized=adminRouteArr.includes(path);
          case 'school':
          if(path.indexOf('std-update')!=-1){
            $location.path('/std-update')
          }
          if(path.indexOf('sub-update')!=-1){
            $location.path('/sub-update')
          }
          if(path.indexOf('que-update')!=-1){
            $location.path('/que-update')
          }
          // if(path.indexOf('que-list')!=-1){
          //    $location.path('/que-list')
          // }
          isAutherized=schoolRouteArr.includes(path);
          case 'student':
          isAutherized=studentRouteArr.includes(path);
         
        }
        
      }
      else{
        $location.path('/login');
      }
    })
  })
