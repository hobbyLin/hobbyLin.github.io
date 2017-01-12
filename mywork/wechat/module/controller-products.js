define(['module/productsView'], function (View) {
	console.log('products');
    var controller = function () {
        var view = new View();
        view.render('kenko');
        view.$el.siblings('nav').find('.navli').eq(1).addClass('active').siblings('.navli').removeClass('active');
    };
    return controller;
});