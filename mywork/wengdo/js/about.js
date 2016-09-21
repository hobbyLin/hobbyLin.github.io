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

require(["jquery"],function($){
	//选项卡
$(" #about ul .about_li").click(function(){
	var index = $(this).parent().index();
	$(this).addClass("hover").parent().siblings().children().removeClass("hover");
	$(".about_content").eq(index).fadeIn().siblings(".about_content").css("display","none");
	
})
})

