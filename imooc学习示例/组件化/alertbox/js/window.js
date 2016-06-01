define(['jquery'], function($) {

    function Window() {
        this.config = {
            width: 500,
            height:300,
            content: '',
            handler: null
        }
    };

    Window.prototype = {
        alert: function(config) {
            var Config = $.extend(this.config, config);
            var boundingBox = $('<div class="window_boundingBox"></div>');
            boundingBox.appendTo('body');
            boundingBox.html(Config.content);

            // 添加按钮和回调入口
            var btn = $('<input type="button" value="确定">');
            btn.appendTo(boundingBox);
            btn.click(function() {
                Config.handler && Config.handler();
                boundingBox.remove();
            });

            boundingBox.css({
                width: Config.width + 'px',
                height: Config.height + 'px',
                left: (Config.x || (window.innerWidth - Config.width) / 2) + 'px',
                top: (Config.y || (window.innerHeight - Config.height) / 2) + 'px',
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