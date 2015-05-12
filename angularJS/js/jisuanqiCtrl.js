/**
 * Created by ykz on 2014/8/11.
 */
function jisuanqiCtrl($scope){
    $scope.opes=["+","-","*","/"];
    $scope.first=1;
    $scope.second=1;
    $scope.operate="+";
    $scope.result=function(){
        switch ($scope.operate){
            case "+":return parseFloat($scope.first)+parseFloat($scope.second);break;
            case "-":return parseFloat($scope.first)-parseFloat($scope.second);break;
            case "*":return parseFloat($scope.first)*parseFloat($scope.second);break;
            case "/":return parseFloat($scope.first)/parseFloat($scope.second);break;
        }
    }
}