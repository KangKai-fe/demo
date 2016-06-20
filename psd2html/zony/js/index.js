$(function() {
    // calendar
    $("#calendar").jqxCalendar({
        width: 275,
        height: 278,
        columnHeaderHeight: 30,
        culture: 'ch-CN'
    });
    var date = [];
    date[0] = new Date(2016, 5, 8);
    date[1] = new Date(2016, 5, 18);
    date[2] = new Date(2016, 5, 19);
    $.each(date, function(index, item) {
        $('#calendar').jqxCalendar('addSpecialDate', item, "", "Special Date");
    });

    // nav-left
    $('.nav-cat-item').on('mouseenter mouseleave', function() {
        $(this).toggleClass('current');
        $(this).find('.nav-cat-panel').toggle();
    });

    // courses-cat
    $('.courses-cat .courses-list-item').mouseover(function() {
        $(this).css({
            'transform': 'scale(1.2)',
            'transition': 'translate .5s ease'
        });
    }).mouseout(function() {
        $(this).css({
            'transform': 'scale(1)'
        });
    });

    // banner
    var timer = setInterval(autoScroll, 3000);
    var imgWidth = $('.banner-box img').width();
    var iNow = 0;

    $('.banner').mouseover(function() {
        clearInterval(timer);
    }).mouseout(function() {
        timer = setInterval(autoScroll, 3000);
    });
    $('#banner_btns span').each(function(i) {
        $(this).mouseover(function() {
            $(this).addClass('current');
            clearInterval(timer);
        }).mouseout(function() {
            setCurrentBtn($('#banner_btns span'), iNow);
        }).click(function() {
            iNow = i;
            $('.banner-box').animate({left: -iNow * $('.banner-box img').width()}, 500);
            setCurrentBtn($('#banner_btns span'), iNow);
        });
    });
    $('#next').mouseover(function() {
        clearInterval(timer);
    }).click(function() {
        autoScroll();
    });
    $('#prev').mouseover(function() {
        clearInterval(timer);
    }).click(function() {
        autoScrollPrev();
    });

    function autoScroll() {

        if (iNow === $('.banner-box img').length - 1) {
            $('.banner-box').animate({left: 0}, 500);
            iNow = 0;
        } else {
            var leftTarget = $('.banner-box').offset().left - $('.banner-box img').width();
            $('.banner-box').animate({left: leftTarget}, 500);
            iNow ++;
        }
        setCurrentBtn($('#banner_btns span'), iNow);
    }

    function autoScrollPrev() {

        if (iNow === 0) {
            $('.banner-box').animate({left: -$('.banner-box img').width() * 2}, 500);
            iNow = $('.banner-box img').length - 1;
        } else {
            var leftTarget = $('.banner-box').offset().left + $('.banner-box img').width();
            $('.banner-box').animate({left: leftTarget}, 500);
            iNow --;
        }
        setCurrentBtn($('#banner_btns span'), iNow);
    }

    function setCurrentBtn(arr, index) {
        $(arr).removeClass('current');
        $(arr).eq(index).addClass('current');
    }

});
