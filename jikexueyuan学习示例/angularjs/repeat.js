// 特有属性$index, $last, $first
angular.module('app', [])
.controller('AddressCtrl', function($scope) {
    $scope.list = [
        {id: 1, address: '金谈固家园9号楼1单元123'},
        {id: 2, address: '裕东小区9号楼1单元234'},
        {id: 3, address: '和平街9号楼1单元345'},
        {id: 4, address: '北三环东路9号楼1单元567'}
    ];
})