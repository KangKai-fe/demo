require.config({
    paths: {
        'jquery': 'jquery-2.2.4.min',
        'jqueryUI': 'http://apps.bdimg.com/libs/jqueryui/1.9.2/jquery-ui.min'
    }
});
require(['jquery', 'window'], function($, w) {
    $('#a').click(function() {
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
        });

        win.on('alert', function() {alert('the 2nd alert handler')});
        win.on('alert', function() {alert('the 3rd alert handler')});
        win.on('close', function() {alert('the 2nd close handler')});
    });
});