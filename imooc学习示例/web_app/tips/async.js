// 异步代码组织方式:
// 1. 回调函数
// 2. 事件消息通知
// 3. ES6 Promise -> 有一些框架上的实现
// 4. ES6 generator -> 语言特性, 纯ES6

// ES6 Promise

/**
 * 1. 将改造前的代码包在一个Promise对象中
 * 2. 添加resolve()和reject()方法, 代替callback()函数
 * 3. 调用时, 通过then()方法 嵌套式代码结构 -> 链式调用
 */

// var getCurChapterContent = function(chapter_id, callback) {
//     $.get('data/data' + chapter_id + '.json', function(data) {
//         // data.result === 0可以为其他形式, 只要是前后端约定好的
//         if (data.result === 0) {
//             var url = data.jsonp;
//             Util.getJSONP(url, function(data) {
//                 // debugger;
//                 // if (callback) {callback()};
//                 callback && callback(data);
//             });
//         }
//     }, 'json')
// }

var getCurChapterContentPromise = function() {
    return new Promise(function(resolve, reject) {
        $.get('data/data' + Chapter_id + '.json', function(data) {
            // data.result === 0可以为其他形式, 只要是前后端约定好的
            if (data.result === 0) {
                var url = data.jsonp;
                Util.getJSONP(url, function(data) {
                    // debugger;
                    // if (callback) {callback()};
                    resolve(data);
                });
            } else {
                reject({msg: 'fail'});
            }
        }, 'json')
    });
}


var init = function(UIcallback) {

    /*getFictionInfo(function() {
        getCurChapterContent(Chapter_id, function(data) {
            // todo ...
            UIcallback && UIcallback(data);
        });
    })*/

    getFictionInfoPromise().then(function(d) {
        // 返回一个Promise对象, 才能进一步链式调用then方法
        return getCurChapterContentPromise();
    }).then(function(data) {
        UIcallback && UIcallback(data);
    });
}