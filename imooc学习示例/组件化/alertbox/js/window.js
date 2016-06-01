define(['jquery'], function($) {

    function Window() {
        this.config = {
            width: 500,
            height:300
        }
    };

    Window.prototype = {
        alert: function(content, handler, config) {
            var boundingBox = $('<div class="window_boundingBox"></div>');
            boundingBox.appendTo('body');
            boundingBox.html(content);

            // 添加按钮和回调入口
            var btn = $('<input type="button" value="确定">');
            btn.appendTo(boundingBox);
            btn.click(function() {
                handler && handler();
                boundingBox.remove();
            });

            $.extend(this.config, config);
            boundingBox.css({
                width: this.config.width + 'px',
                height: this.config.height + 'px',
                left: (this.config.x || (window.innerWidth - this.config.width) / 2) + 'px',
                top: (this.config.y || (window.innerheight - this.config.height) / 2) + 'px',
            })
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