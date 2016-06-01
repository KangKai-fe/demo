define(['jquery'], function($) {

    function Window() {
        this.conf = {
            width: 500,
            height:300,
            title: '系统消息',
            content: '',
            hasCloseBtn: false,
            skinClassName: null,
            handler4AlertBtn: null,
            handler4CloseBtn: null
        }
    };

    Window.prototype = {
        alert: function(conf) {
            var Conf = $.extend(this.conf, conf);
            var boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + Conf.title + '</div>' +
                    '<div class="window_body">' + Conf.content + '</div>' +
                    '<div class="window_footer"><input class="window_alertBtn" type="button" value="确定"></div>' +
                '</div>'
                );
            boundingBox.appendTo('body');

            var btn = boundingBox.find('.window_alertBtn');
            btn.click(function() {
                Conf.handler4AlertBtn && Conf.handler4AlertBtn();
                boundingBox.remove();
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
                    Conf.handler4CloseBtn && Conf.handler4CloseBtn();
                    boundingBox.remove();
                });
            }

            if (Conf.skinClassName) {
                boundingBox.addClass(Conf.skinClassName);
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