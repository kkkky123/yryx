/**
 * Created by ykz on 2014/8/11.
 */
var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
    $scope.count=1;
    $scope.price=1.99;
});