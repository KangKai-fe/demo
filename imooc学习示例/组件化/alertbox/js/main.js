require.config({
    paths: {
        'jquery': 'jquery-2.2.4.min'
    }
});
require(['jquery', 'window'], function($, w) {
    $('#a').click(function() {
        new w.Window().alert({
            title: '提示',
            content: 'welcome!',
            handler: function() {
                alert('you click the button');
            },
            width: 300,
            height: 150,
            y: 50
        });
    });
});