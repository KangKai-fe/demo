var app = angular.module('app', []);

// 自定义可重用组件hello
// app.directive('hello', function() {
//     return {
//         restrict: 'E', // element
//         replace: true, // default: false; 为true时, 替换掉自定义标签的名称
//         template: '<div>Hello AngularJs</div>'
//     }
// })

// app.directive('hello', function() {
//     return {
//         restrict: 'A', // attribute, 默认值
//         link: function() {
//             alert('我在这里');
//         }
//     }
// })

app.directive('hello', function() {
    return {
        restrict: 'C', // class
        link: function() {
            alert('class');
        }
    }
})

app.directive('hi', function() {
    return {
        restrict: 'A', // attribute
        link: function() {
            alert('attribute');
        }
    }
})