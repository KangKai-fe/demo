angular.module('app', [])
.controller('UserCtrl', function($scope, $http) {
    $scope.id = '';
    $scope.name = '';

    // $http.get('url', {data})
    // .success(function(resp) {
    //      console.log(resp);
    // })
    // .error()
    //
    // $http.post('url', {data})
    // .success(function(resp) {
    //      // ...
    // })

    // 相关adduser和deluser逻辑在后端完成

    $scope.adduser = function() {
        $http.post('http://localhost:3000/user/adduser', {id: $scope.id, name: $scope.name})
        .success(function(resp) {
            if (resp.success) {
                alert('添加成功');
            }
        })
    };
    $scope.deluser = function() {
        $http.post('http://localhost:3000/user/deluser', {id: $scope.id})
        .success(function(resp) {
            if (resp.success) {
                alert('删除成功');
            }
        })
    };
})