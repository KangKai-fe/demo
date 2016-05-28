angular.module('app', [])
// angular中service的创建模式: value constant factory service
// 最高级的: provider
.value('realname', 'kangkai-fe') // value可以改变值
.value('realname', 'kangkai')
.constant('http', 'www.baidu.com') // 值不会变
.constant('http', 'www.google.com')
.factory('SayHi', function() { // 最常用
    return {
        msg: 'hello',
        setMsg: function() {
            this.msg = 'bye';
        }
    }
})
.service('User', function() { // 与factory类似
    this.firstname = 'kang';
    this.lastname = 'kai';
    this.getName = function() {
        return this.firstname + this.lastname;
    }
})
.controller('MyCtrl', function($scope, realname, http, SayHi, User) {
    $scope.msg = 'angular';
    $scope.realname = realname;
    $scope.http = http;
    $scope.sayHi = SayHi;
    SayHi.setMsg();
    $scope.uname = User.getName();
})