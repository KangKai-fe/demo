(function($) {
    var privateFun = function() {
        // 私有方法
    }
    var PageSwitch = (function() {
        function PageSwitch(element, options) {
            this.settins = $.extend(true, $.fn.PageSwitch.default, options || {});
            this.element = element;
            this.init(); // 初始化插件
        }
        PageSwitch.prototype = {
            init: function() {

            }
        }
        return PageSwitch;
    })();
    $.fn.PageSwitch = function(options) {
        // 实现单例模式
        return this.each(function() {
            var me = $(this),
                instance = me.data("PageSwitch"); // 创建对象存放插件实例

            if (!instance) { // 若对象为空, 就创建一个实例给它
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance); // 将实例存放在me.data的PageSwitch上
            }

            if ($.type(options) === "string") {
                return instance[options]();
            }
        });
    }

    // 插件默认参数
    $.fn.PageSwitch.default = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active"
        },
        index: 0,
        easing: "ease",
        duration: 500, // 单位: ms
        loop: false, // 循环播放
        pagination: true, // 是否进行分页处理
        keyboard: true, // 是否触发键盘事件
        direction: "vertical", // 默认竖屏滑动
        callback: ""
    }

    $(function() {
        $("[data-PageSwitch]").PageSwitch();
    });
})(jQuery);