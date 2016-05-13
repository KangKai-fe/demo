// 通过call和apply实现继承
function Pet (words) {
     this.words = words;

     this.speak = function() {
        console.log(this.words);
     };
}

function Dog (words) {
     Pet.call(this, words);
     // Pet.apply(this, arguments);
}

// 创造一个示例对象
var dog = new Dog('Wang');

dog.speak();