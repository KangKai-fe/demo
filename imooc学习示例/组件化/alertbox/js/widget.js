// Widget抽象类
define(function() {
    function Widget() {}
    Widget.prototype = {
        /**
         * 自定义事件
         * 1. 本质: 观察者模式
         * 2. 优点: 跳出原生事件的限制, 提高封装的抽象层级
         */
        on: function(type, handler) {

            if (typeof this.handlers[type] === 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);

            // 实现链式调用
            return this;
        },
        fire: function(type, data) {

            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];

                for (var i=0, len=handlers.length; i<len; i++) {
                    handlers[i](data);
                }
            }

            // 实现链式调用
            return this;
        }
    }

    return {
        Widget: Widget
    }
})