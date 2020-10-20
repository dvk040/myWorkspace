var app = angular.module('otUiApp');

app.controller('examCtrl', function ($scope,$interval,ServerCall,$location,$filter,$routeParams,$timeout) {
debugger;
   var path= $location.path();

   // Get question for Exam
      var uid=sessionStorage.uid
      
   $scope.examQue= function () {
      debugger;
     
     $scope.isabouttoTakeTest=true;
     $scope.queList=[]
      var sub=$scope.sub; 
      sessionStorage.sub=sub;

      var school=$scope.school;
      sessionStorage.school=school;
      $scope.timeLeft=15;
      ServerCall.fnSendReq('result/exam-sub?sub='+sub+'&school='+school,'get')
      .then(function (res) {
          debugger;
          $scope.queList=res.data;
          var timeInterv=$interval(function(){  
              $scope.timeLeft-- ;
              if($scope.timeLeft==0){
                $interval.cancel(timeInterv);
                $scope.fnSubmitTest();
              }
          },1000)
          
      })
      .catch(function (res) {
          $scope.queList=[];
          $scope.msg="Something went wrong..try again";
      })
  }

   $scope.ans={};
    $scope.fnSubmitTest=function(){
       debugger;
        var keyobj={};
        $scope.queList.forEach(function(q){
         keyobj[q.id]=q.ans
         console.log(keyobj);
        });
        var marks=0;
        
        for(var key in $scope.ans){
           if(keyobj[key]==$scope.ans[key])
           marks++
        }
         alert(marks)
        // collect and post the result
        
        var dataObj={
            "uid":uid,
            "marks":marks,
            "sub":sessionStorage.sub,
            "school":sessionStorage.school,
            "date":$filter('date')(new Date(),"yyyy-MM-dd hh:mm:ss")

           // $filter('date')(date, format, timezone)       
            }
                         
        ServerCall.fnSendReq('result/post-result', 'post', dataObj)
             .then(function (res) {
                 debugger;
                 if (res.data && (res.data.affectedRows > 0)) {
                     alert("Exam submited")
                   $location.path('/Results');
                }else 
                 {
                     alert("Please try again");
                 }
             })
             .catch(function (res) {
                 $scope.msg = "Something went wrong";
             })
 }
    
    
    // to get stored result from data base
    $scope.resultHeaders=['ID','USER NAME','MARKS','SUBJECT','SCHOOL','DATE'];
    $scope.resList=[];
   
    // i need to work on belongs or after taking test it will show result or work with id 
    
    $scope.fnGetResult=function(){
        var uid=sessionStorage.uid;
        var school=sessionStorage.school;
        ServerCall.fnSendReq('result/get-result?uid='+uid+'&school='+school,'get')
        .then(function (res) {
            debugger;
            $scope.resList=res.data;
           var resArrdata=res.data;
           

            //pichar
            $scope.tabledata= resArrdata.slice((resArrdata.length)-3,resArrdata.length);
             var slicedata= $scope.tabledata;
            $scope.data=[]
            slicedata.forEach(function(obj){
                        debugger;
                    var dataobj={
                        key: obj.sub+'_'+obj.date,
                        y:obj.marks
                    }
                    $scope.data.push(dataobj)
                })
            
    })
        .catch(function (res) {
            $scope.resList=[];
            $scope.msg="Something went wrong..try again";
        })
    }
    if(path=='/Results'){
        $scope.fnGetResult();
    }

    // bar graph**************
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

//     $scope.data=[]
//     pidata.forEach(function(obj){
//         debugger;
//     var dataobj={
//         key: obj.sub+'_'+obj.date,
//         y:obj.marks
//     }
//     $scope.data.push(dataobj)
// })

// $scope.data= 
//     [
//         {
//             key: "One",
//             y: 5
//         },
//         {
//             key: "Two",
//             y: 2
//         },
//         {
//             key: "Three",
//             y: 9
//         },
//         {
//             key: "Four",
//             y: 7
//         },
//         {
//             key: "Five",
//             y: 4
//         },
//         {
//             key: "Six",
//             y: 3
//         },
//         {
//             key: "Seven",
//             y: .5
//         }
//     ];
    

  //**** */
})