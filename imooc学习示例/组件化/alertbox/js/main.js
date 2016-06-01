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
        win2 = new w.Window().confirm({
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
    })
});