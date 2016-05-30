// 单例模式
// 防止: 多次实例化->创建新对象->占用内存
var single = {
    attr_1: '1',
    base_64: '...',
    func_1: function() {
        console.log(1);
    }
};
// 访问
single.attr_1;
single.func_1();

// 工厂模式
function Class_A(param) {
    this.attr_1 = param;
    this.func_1 = function() {
        console.log(this.attr_1);
    }
}
// 实例化
var instance_1 = new Class_A('1');
instance_1.attr_1;
instance_1.func_1();
var instance_2 = new Class_A('2');
instance_2.attr_1;
instance_2.func_1();

