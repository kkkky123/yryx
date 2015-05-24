/**
 * Created by kezhong.ykz on 2015/5/21.
 */
var glodlogTestApp = angular.module("glodlogTestApp", []);
glodlogTestApp.directive("glodlogConsoleSpm", function () {
    return {
        restrict: "A",
        link: function (scope, elm, attrs) {
            /*console.log(elm.html());*/
            elm.bind("click", function () {
                console.log(attrs.spm);
                console.log(attrs.aliyunConsoleSpm);
                (function () {
                    window.goldlog ? goldlog.record('/tbact.818.3', '', '', 'H46777406') : setTimeout(arguments.callee, 200);
                })();
                /*(window.goldlog_queue || (window.goldlog_queue = [])).push({
                    action: "goldlog.record",
                    arguments: ['/tbact.818.3', '', '', 'H46777406']
                });*/
            });
        }
    }
}).directive("spmClick",function(){
    return {
        restrict:"A",
        link:function(scope,elm,attrs){
            elm.bind("click", function () {
                console.log(attrs.spm);
                console.log(attrs.aliyunConsoleSpm);
                (window.goldlog_queue || (window.goldlog_queue = [])).push({
                    action: "goldlog.record",
                    arguments: ['/tbact.818.3', '', '', 'H46777406']
                });
            });
        }
    }
});