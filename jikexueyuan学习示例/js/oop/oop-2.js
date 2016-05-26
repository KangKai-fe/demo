(function() {
    var n = 'kk';
    function People(name){
        this._name = name;
    }
    People.prototype.say = function() {
        console.log('peo-hello ' + this._name);
    }
    // 公开接口
    window.People = People;
}());


(function() {
    function Student(name) {
        this._name = name;
    }
    // 继承
    Student.prototype = new People();
    // 覆盖
    var superSay = Student.prototype.say;
    Student.prototype.say = function() {
        superSay.call(this);
        console.log('stu-hello ' + this._name);
    }
    window.Student = Student;
}());

var s = new Student('kangkai');
s.say();

// function hello() {
//     alert(n);
// }
// hello();