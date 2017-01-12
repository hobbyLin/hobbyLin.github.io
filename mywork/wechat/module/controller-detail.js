define(['module/detailView'], function (View) {

    var controller = function (IScroll,detail) {
        var view = new View();
        view.render('kenko');
        //加入图片
        view.$('#scroller,#minimap').css("background-image","url("+detail+")");
       view.$el.siblings('footer').css('opacity',0);
        //导航选项卡设置
        view.$el.siblings('nav').find('.navli').eq(1).addClass('active').siblings('.navli').removeClass('active');
        view.$('#wrapper')[0]
        
        //启动小地图
        window.myscroll=new IScroll(view.$('#wrapper')[0], {
		startX: -359,
		startY: -85,
		scrollY: true,
		scrollX: true,
		freeScroll: true,
		mouseWheel: true,
		indicators: {
			el: view.$('#minimap')[0],
			interactive: true
		}
	});
	
	//制作一个背景
	var h = $(window).height()-51;
	var w = $(window).width();
	var mask = document.createElement('div');
	style = "position:fixed; bottom:0px;left:0px;width:"+w+"px;height:"+h+"px;background:#e7e7e7;z-index:997;"
	mask.setAttribute('style',style);
	view.el.appendChild(mask);
       
        
            
        
    };
    return controller;
});