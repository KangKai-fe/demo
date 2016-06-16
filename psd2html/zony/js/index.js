$(function() {
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
});
