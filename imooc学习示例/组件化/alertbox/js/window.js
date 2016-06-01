define(['jquery'], function($) {

    function Window() {
        this.conf = {
            width: 500,
            height:300,
            title: '系统消息',
            content: '',
            handler: null
        }
    };

    Window.prototype = {
        alert: function(conf) {
            var Conf = $.extend(this.conf, conf);
            var boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + Conf.title + '</div>' +
                    '<div class="window_body">' + Conf.content + '</div>' +
                    '<div class="window_footer"><input type="button" value="确定"></div>' +
                '</div>'
                );
            boundingBox.appendTo('body');
            
            var btn = boundingBox.find('.window_footer input');
            btn.click(function() {
                Conf.handler && Conf.handler();
                boundingBox.remove();
            });

            boundingBox.css({
                width: Conf.width + 'px',
                height: Conf.height + 'px',
                left: (Conf.x || (window.innerWidth - Conf.width) / 2) + 'px',
                top: (Conf.y || (window.innerHeight - Conf.height) / 2) + 'px',
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