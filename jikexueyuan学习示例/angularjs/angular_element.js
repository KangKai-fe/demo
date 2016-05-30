var app = angular.module('app', []);

app.directive('enter', function() {
    return function(scope, element, attrs) {
        // 与jQuery中获取元素绑定方法类似, $().bind('')
        console.log(element);
        element.bind('mouseenter', function() {
            console.log('鼠标进入');
            element.addClass('alert alert-danger')
        })
    }
})

app.directive('leave', function() {
    return function(scope, element, attrs) {
        element.bind('mouseleave', function() {
            console.log('鼠标移出');
            element.removeClass('alert alert-danger')
        })
    }
})

app.directive('hello', function() {
    return {
        restrict: 'E',
        template: '<div><input ng-model="text"><div>{{text}}</div></div>',
        link: function(scope, element) {
            scope.$watch('text', function(newVal) {
                if (newVal === 'error') {
                    element.addClass('alert alert-danger');
                }
            })
        }
    }
})