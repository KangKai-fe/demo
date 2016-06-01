define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {

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
            handler4CloseBtn: null,
            text4ConfirmBtn: '确定',      // 以下四项为confirm弹窗参数
            text4CancelBtn: '取消',
            handler4ConfirmBtn: null,
            handler4CancelBtn: null
        };
    }

    Window.prototype = $.extend({}, new widget.Widget(), {

        renderUI: function() {
            var footerContent = '';

            switch (this.conf.winType) {
                case 'alert':
                    footerContent = '<input type="button" value="' + this.conf.text4AlertBtn + '" class="window_alertBtn">';
                    break;
                case 'confirm':
                    footerContent = '<input type="button" value="' + this.conf.text4ConfirmBtn + '" class="window_confirmBtn"><input type="button" value="' + this.conf.text4CancelBtn + '" class="window_cancelBtn">';
                    break;
            }
            this.boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">' + this.conf.title + '</div>' +
                    '<div class="window_body">' + this.conf.content + '</div>' +
                    '<div class="window_footer">' + footerContent + '</div>' +
                '</div>'
                );

            if (this.conf.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }

            if (this.conf.hasCloseBtn) {
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }

            this.boundingBox.appendTo(document.body);
        },

        bindUI: function() {
            var that = this;
            this.boundingBox.delegate('.window_alertBtn', 'click', function() {
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn', 'click', function() {
                that.fire('close');
                that.destroy();
            }).delegate('.window_confirmBtn', 'click', function() {
                that.fire('confirm');
                that.destroy();
            }).delegate('.window_cancelBtn', 'click', function() {
                that.fire('cancel');
                that.destroy();
            });

            if (this.conf.handler4AlertBtn) {
                this.on('alert', this.conf.handler4AlertBtn);
            }

            if (this.conf.handler4CloseBtn) {
                this.on('close', this.conf.handler4CloseBtn);
            }

            if (this.conf.handler4ConfirmBtn) {
                this.on('alert', this.conf.handler4ConfirmBtn);
            }

            if (this.conf.handler4CancelBtn) {
                this.on('close', this.conf.handler4CancelBtn);
            }
        },

        initUI: function() {
            this.boundingBox.css({
                width: this.conf.width + 'px',
                height: this.conf.height + 'px',
                left: (this.conf.x || (window.innerWidth - this.conf.width) / 2) + 'px',
                top: (this.conf.y || (window.innerHeight - this.conf.height) / 2) + 'px'
            });

            if (this.conf.skinClassName) {
                this.boundingBox.addClass(this.conf.skinClassName);
            }

            if (this.conf.isDraggable) {

                if (this.conf.dragHandle) {
                    this.boundingBox.draggable({handle: this.conf.dragHandle});
                } else {
                    this.boundingBox.draggable();
                }
            }
        },

        destructor: function() {
            this._mask && this._mask.remove();
        },

        alert: function(conf) {
            $.extend(this.conf, conf, {winType: 'alert'});
            this.render();
            return this;    // 实现链式调用
        },
        confirm: function(conf) {
            $.extend(this.conf, conf, {winType: 'confirm'});
            this.render();
            return this;
        },
        prompt: function() {

        }
    })

    return {
        Window: Window
    }
})