angular.module('myApp', [])
    .controller('SignUpController', function($scope) {

        $scope.userdata = {};

        $scope.submitForm = function() {
            console.log($scope.userdata);

            if ($scope.signUpForm.$invalid) {
                alert('输入信息有误');
            } else {
                alert('提交成功');
            }
        };
    })

    .directive('compare', function() {
        var o = {};
        o.strict = 'AE'; //作用在元素和属性上
        o.scope = {
            orgText: '=compare'
        }
        o.require = 'ngModel';
        o.link = function(sco, ele, att, con) {
            con.$validators.compare = function(v) {
                return v === sco.orgText;
            }
            sco.$watch('orgText', function() {
                con.$validate();
            })
        }
        return o;
    })