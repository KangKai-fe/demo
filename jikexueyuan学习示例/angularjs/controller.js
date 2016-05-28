angular.module('app', [])
.controller('FirstCtrl', function($scope) {
    $scope.msg = "hello angular";
})
.controller('SecondCtrl', function($scope) {
    $scope.msg = "hello front-end";
})