/**
 * Created by kezhong.ykz on 2015/5/20.
 */
var myApp = angular.module("myApp", ["ui.router"]);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/pageTab");
    $stateProvider.state("/pageTab", {
        url: "/pageTab",
        templateUrl: "pageTab.html"
    }).state("/pageTab.page1", {
        url: "/page1",
        templateUrl: "page1.html"
    }).state("/pageTab.page2", {
        url: "/page2",
        templateUrl: "page2.html"
    }).state("/pageTab.page3", {
        url: "/page3",
        templateUrl: "page3.html"
    });
});