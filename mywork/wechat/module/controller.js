define(['module/view'], function (View) {

    var controller = function () {
        var view = new View();
        view.render('kenko');
view.$el.siblings('nav').find('.navli').eq(0).addClass('active').siblings('.navli').removeClass('active');

  


    };
    return controller;
});