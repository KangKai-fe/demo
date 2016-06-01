// Widget抽象类
define(['jquery'], function($) {
    function Widget() {
        this.boundingBox = null;    // 属性: 最外层容器
    }
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
        },
        render: function(container) {   // 方法: 渲染组件
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.initUI();
            $(container || document.body).append(this.boundingBox);
        },
        destroy: function() {           // 方法: 销毁组件
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        },
        renderUI: function() {},        // 接口: 添加dom节点
        bindUI: function() {},          // 接口: 监听事件
        initUI: function() {},          // 接口: 初始化组件属性
        destructor: function() {}       // 接口: 销毁前的处理函数
    }

    return {
        Widget: Widget
    }
})