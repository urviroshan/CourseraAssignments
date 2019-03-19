
(function(){
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject=['$scope','$filter'];

function LunchCheckController($scope,$filter){

    $scope.UserMessage ="";
    $scope.Highlighter='';

    $scope.CheckIfTooMuch=function()
    {
        if($scope.ItemsForLunch!="" && $scope.ItemsForLunch !=undefined)
        {
            
               var counter=0;
               var items=$scope.ItemsForLunch.split(",")
                angular.forEach(items, function (value, key) {
                    if(value.trim()!="")
                    {
                        counter=counter+1;
                    }
                });
                if(counter==0)
                {
                    $scope.UserMessage="Please enter data first"
                    $scope.Highlighter='red';
                }
                else if(counter<=3)
                {
                    $scope.UserMessage="Enjoy!"
                    $scope.Highlighter='green';
                }
                else
                {
                    $scope.UserMessage="Too much!";
                    $scope.Highlighter='green';
                }
                
            
        }
        else{
            $scope.UserMessage="Please enter data first"
            $scope.Highlighter='red';
        }
       
    }
}

})();
