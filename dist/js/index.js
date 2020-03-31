$(window).on('beforeunload', function () {
    $('body').hide();
    $(window).scrollTop(0);
});
date = new Date();
document.getElementById('currentDate').innerText = date.getFullYear().toString();