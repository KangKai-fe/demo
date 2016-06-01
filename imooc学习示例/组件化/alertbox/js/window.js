define(['jquery', 'jqueryUI'], function($, $UI) {

    function Window() {
        this.conf = {
            width: 500,
            height:300,
            title: '系统消息',
            content: '',
            hasCloseBtn: false,
            hasMask: true,
            isDraggable: true,
            dragHandle: null,
            skinClassName: null,
            text4AlertBtn: '确定',
            handler4AlertBtn: null,
            handler4CloseBtn: null
        };
        this.handlers = {};
    };

    Window.prototype = {

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
        },
        fire: function(type, data) {

            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];

                for (var i=0, len=handlers.length; i<len; i++) {
                    handlers[i](data);
                }
            }
        },
        alert: function(conf) {
            var Conf = $.extend(this.conf, conf);
            var boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + Conf.title + '</div>' +
                    '<div class="window_body">' + Conf.content + '</div>' +
                    '<div class="window_footer"><input class="window_alertBtn" type="button" value="' + Conf.text4AlertBtn + '"></div>' +
                '</div>'
                );
            boundingBox.appendTo('body');

            var btn = boundingBox.find('.window_alertBtn'),
                mask = null,
                that = this;

            btn.click(function() {
                // Conf.handler4AlertBtn && Conf.handler4AlertBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire('alert');
            });

            boundingBox.css({
                width: Conf.width + 'px',
                height: Conf.height + 'px',
                left: (Conf.x || (window.innerWidth - Conf.width) / 2) + 'px',
                top: (Conf.y || (window.innerHeight - Conf.height) / 2) + 'px',
            });

            if (Conf.hasCloseBtn) {
                var closeBtn = $('<span class="window_closeBtn">X</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function() {
                    // Conf.handler4CloseBtn && Conf.handler4CloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire('close');
                });
            }

            if (Conf.handler4AlertBtn) {
                this.on('alert', Conf.handler4AlertBtn);
            }

            if (Conf.handler4CloseBtn) {
                this.on('close', Conf.handler4CloseBtn);
            }

            if (Conf.skinClassName) {
                boundingBox.addClass(Conf.skinClassName);
            }

            if (Conf.isDraggable) {

                if (Conf.dragHandle) {
                    boundingBox.draggable({handle: Conf.dragHandle});
                } else {
                    boundingBox.draggable();
                }
            }

            if (Conf.hasMask) {
                mask = $('<div class="window_mask"></div>');
                mask.appendTo('body');
            }
        },
        confirm: function() {

        },
        prompt: function() {

        }
    }

    return {
        Window: Window
    }
})