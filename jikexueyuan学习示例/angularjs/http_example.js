angular.module('app', [])
.config(function($httpProvider) {
    // 删除AngularJS默认的X-Request-With头
    delete $httpProvider.default.headers.common['X-Requested-With'];
    // 为所有GET请求设置DO NOT TRACK
    $httpProvider.default.headers.get['DNT'] = '1';
})
.controller('UserCtrl', function($scope, $http) {
    $scope.id = '';
    $scope.name = '';
    $scope.roles = [];
    $scope.rights = [];
    $scope.curselect = '';

    $scope.$watch('curselect', function() {
        loadRoleRight();
    })

    function loadRoleRight() {
        $http.post('http://localhost:3000/user/getRoleRight', {roleid: $scope.curselect})
        .success(function(resp) {
            var rights = resp;
            for (var i=0; i<$scope.rights.length; i++) {
                $scope.rights[i].ischecked = false;
                for (var j=0; j<rights.length; j++) {
                    if ($scope.rights[i].id === rights[i].rightid) {
                        // 数据库中为false
                        $scope.rights[i].ischecked = true;
                    }
                }
            }
        })
    }

    function init() {
        $http.get('http://localhost:3000/user/getRoles')
        .success(function(resp) {
            $scope.roles = resp;
        })

        $http.get('http://localhost:3000/user/getRights')
        .success(function(resp) {
            $scope.rights = resp;
        })
    }
    init();
    $scope.addUser = function() {
        $http.post('http://localhost:3000/user/addUser', {id: $scope.id, name: $scope.name})
        .success(function(resp) {
            if (resp.success) {
                alert('添加成功');
            }
        })
    };
    $scope.delUser = function() {
        $http.post('http://localhost:3000/user/delUser', {id: $scope.id})
        .success(function(resp) {
            if (resp.success) {
                alert('删除成功');
            }
        })
    };
})