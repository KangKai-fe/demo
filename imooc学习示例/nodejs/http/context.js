/**
 * this -> '函数拥有者';
 * 定义时的上下文, 和运行时的上下文;
 * 使用call和apply可以改变上下文执行对象,
 * 可以在自定义上下文中执行函数;
 * call函数需要传递参数列表,
 * apply函数传递参数数组;
 */


// 作为对象的方法被调用
// var pet = {
//     words: '...',
//     speak: function() {
//         console.log(this.words);
//         console.log(this === pet);
//     }
// }

// pet.speak();


// 函数的调用, 指向全局对象; 浏览器 -> window, nodejs -> global;
// function pet(words) {
//     this.words = words;

//     console.log(this.words);
//     console.log(this === global);
// }

// pet('...');


// 构造函数, 指向实例对象
function Pet(words) {
    this.words = words;
    this.speak = function() {
        console.log(this.words);
        console.log(this);
    };
}

var cat = new Pet('喵');

cat.speak();