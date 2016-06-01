// 阻塞, 回调
// 原生conform:
if (confirm('确定?')) {
    handler1();
} else {
    handler2();
}
handler3();

// 封装组件confirm:
new Window.confirm({
    content: '确定?',
    handler4Confirm: function() {
        handler1();
        handler3();
    },
    handler4Cancle: function() {
        handler2();
        handler3();
    }
})