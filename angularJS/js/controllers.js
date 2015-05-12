/**
 * Created by ykz on 2014/8/11.
 */
function PhoneListCtrl($scope) {
    $scope.phones = [
        {"name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S.",
            "age":0},
        {"name": "Motorola XOOM with Wi-Fi",
            "snippet": "The Next, Next Generation tablet.",
            "age":1},
        {"name": "MOTOROLA XOOM",
            "snippet": "The Next, Next Generation tablet.",
            "age":2}
    ];
    $scope.hello="hello ,world";
    $scope.names = [
        {"name":"aaaa"},
        {"name":"bbbb"},
        {"name":"cccb"}
    ];
    $scope.orderProp="age";
}