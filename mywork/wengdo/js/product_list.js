// 选项卡
require.config({
	paths:{
		"jquery":"jquery-1.4.2.min"
	},
	shim:{
		"jquery":{
			exports:"$"
		}
	}
	
})

require(['jquery'],function($){
	$("#main .content .nav .navul .navli").click(function(){
	var index = $(this).index();
	$(this).addClass("hover").siblings().removeClass("hover");
	$("#main .content .pic .picul").eq(index).fadeIn().siblings("#main .content .pic .picul").css("display","none");
	
})

	
})


