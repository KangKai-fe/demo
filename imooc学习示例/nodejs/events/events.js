var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

// 默认最大值10
life.setMaxListeners(5);

// on 和 addListner 作用相同
function laugh(who) {
    console.log('make ' + who + ' laugh \n');
}

life.on('myTarget', laugh);

life.on('myTarget', function(who) {
    console.log('make ' + who + ' a meal \n');
});

life.on('myTarget', function(who) {
    console.log('give ' + who + ' surprises \n');
});

life.on('myTarget', function(who) {
    console.log('buy ' + who + ' a ring \n');
});

life.on('myTarget', function(who) {
    console.log('marry ' + who + ' \n');
});

life.on('herTarget', function(who) {
    console.log('trust ' + who + ' \n');
});


// 移除监听life.removeListener('', 具体函数), 如果使用匿名函数,则无法移除
// life.removeListener('myTarget', function(who) {
//     console.log('make ' + who + ' laugh \n');
// })
life.removeListener('myTarget', laugh);
// 批量移除 -> 全部移除
// life.removeAllListeners();
// 批量移除
life.removeAllListeners('herTarget');

// life.emit('myTarget', 'her');

var hasMyListener = life.emit('myTarget', 'her');
var hasHerListener = life.emit('herTarget', 'me');
var hasHisListener = life.emit('hisTarget', 'her');

// 获取某个事件绑定函数的个数
console.log(life.listeners('myTarget').length);
console.log(EventEmitter.listenerCount(life, 'myTarget'));

// console.log(hasMyListener); // return trur
// console.log(hasHerListener); // return true
// console.log(hasHisListener); // return false
