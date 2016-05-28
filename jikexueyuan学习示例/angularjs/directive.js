// ng-bind{{}}, ng-model, ng-show/hide, ng-if, ng-submit, ng-disabled
// 条件为false时移除HTML元素, 而show和hide则是隐藏显示, 不移除
// ng-checked, ng-src, ng-href, ng-class, ng-selected, ng-change
angular.module('app', [])
.controller('UserCtrl', function($scope) {
    $scope.user = {
        isShowImg: true,
        showIcon: true,
        icon: 'logo.jpg',
        uname: '',
        pwd: '',
        skill: '3',
        sex: '1',
        hobby: [1, 2]
    };
    $scope.isChecked = function(n) {
        var isChecked = false;

        if ($scope.user.hobby.indexOf(n) !== -1) {
            isChecked = true;
        }
        return isChecked;
    };
    $scope.register = function(u) {
        console.log(u);
    }
})