require.config({
    paths: {
        'jquery': 'jquery-2.2.4.min',
        'jqueryUI': 'http://apps.bdimg.com/libs/jqueryui/1.9.2/jquery-ui.min'
    }
});
require(['jquery', 'window'], function($, w) {
    $('#alert').click(function() {
        var win = new w.Window();
        win.alert({
            title: '提示',
            content: 'welcome!',
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true,
            // hasMask: false,
            isDraggable: true,
            dragHandle: '.window_header',
            // skinClassName: 'window_skin_orange',
            text4AlertBtn: 'ok',
            handler4AlertBtn: function() {
                alert('button clicked');
            },
            handler4CloseBtn: function() {
                alert('close clicked');
            }
        }).on('alert', function() {
            alert('the 2nd alert handler');
        }).on('close', function() {
            alert('the 2nd close handler');
        });

        win.on('alert', function() {alert('the 3rd alert handler')});
    });

    $('#confirm').click(function() {
        new w.Window().confirm({
            title: '系统消息',
            content: '您确定要删除这个文件吗?',
            width: 300,
            height: 150,
            y: 50,
            text4ConfirmBtn: '是',
            text4CancelBtn: '否',
            dragHandle: '.window_header'
        }).on('confirm', function() {
            alert('确定');
        }).on('cancel', function() {
            alert('取消');
        });
    });

    $('#prompt').click(function() {
        new w.Window().prompt({
            title: '请输入您的姓名',
            content: '您输入的信息我们将会为您保密: ',
            width: 300,
            height: 150,
            y: 50,
            text4Prompt: '输入',
            text4CancelBtn: '取消',
            defaultValue4PromptInput: '张三',
            isPromptInputPassword: true,
            dragHandle: '.window_header',
            handler4PromptBtn: function(inputValue) {
                alert('您输入的内容是: ' + inputValue);
            },
            handler4CancelBtn: function() {
                alert('取消');
            }
        });
    })
});