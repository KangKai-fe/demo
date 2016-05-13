// NodeJs -> 非阻塞, 单线程, 事件驱动; Nodejs适合高并发, IO密集操作...
// 事件驱动
function clickIt(e) {
    window.alert('Button is clicked');
}

var button = document.getElementById('button');
button.addEventListener('click', clickIt);

// EventEmitter
