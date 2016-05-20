$(function() {
    $('.del').click(function(e) {
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
            type: 'DELETE',
            url: '/admin/movie/list?id=' + id
        })
        .done(function(results) {
            if (results.success === 1) {
                if (tr.length > 0) {
                    tr.remove()
                }
            }
        })
    })

    $('#doubanBtn').click(function() {
        var douban = $('#douban');
        var id = douban.val();

        if (id) {
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function(data) {
                    $('#inputTitle').val(data.title)
                    $('#inputDirector').val(data.directors[0].name)
                    $('#inputCountry').val(data.countries[0])
                    $('#inputPoster').val(data.images.large)
                    $('#inputYear').val(data.year)
                    $('#inputSummary').val(data.summary)
                }
            })
        }
    })

    $('#movieInfo').submit(function(e) {
        if (!$('#inputCategory').val() && $(':checked').length === 0) {
            alert('请输入或选择电影分类!');
            e.preventDefault();
            $('#inputCategory').focus();
        }
    })
})