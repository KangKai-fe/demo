(function() {
    var n = 'kangkai'
    function Person(name) {
        var _this = {};
        _this._name = name;
        _this.sayHello = function() {
            console.log('hello ' + this._name + n);
        }
        return _this;
    }
    window.Person = Person;
}());


function Teacher(name) {
    var _this = Person(name);
    var superSay = _this.sayHello;
    _this.sayHello = function() {
        superSay.call(this);
        console.log('t-hello ' + this._name);
    };
    return _this;
}

var t = Teacher('kk');
t.sayHello();