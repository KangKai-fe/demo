angular.module('app', [])
.factory('Data', function() { // 多个controller中使用相同数据, 对象, 相当于全局变量
    return {
        msg: '我来自factory'
    }
})
.controller('FirstCtrl', function($scope, Data) {
    $scope.data = Data;
})
.controller('SecondCtrl', function($scope, Data) {
    $scope.data = Data;
})