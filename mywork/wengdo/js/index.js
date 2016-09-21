
require.config({
	paths:{
		"jquery":"jquery-1.4.2.min",
		"slide":"jquery.SuperSlide.2.1.1",
		
	},
	shim:{
		"jquery":{
			exports:"$"
		},
		"slide":{
			deps:["jquery"],
			exports:"slide"
		}
	}
})

require(['jquery','slide'],function($,slide){
	var i = 0,T;

	// 横幅轮播
	$("#baner .box ul li").mouseover(function(){
		var index = $(this).index();   // 选项卡
		run(index);
		
	})
	
	
	function run(num){
		$("#baner .box ul li").eq(num).addClass("boxli").siblings().removeClass("boxli");
		$("#baner img").eq(num).fadeIn("fast").siblings("#baner img").fadeOut("fast");
		
		
	}
	
	function play(){
		i++;
		if(i>2){i = 0}
		run(i);
		//console.log(i);
	}
	
	T = setInterval(play,2000);
	
	
	$("#baner").hover(function(){  // 横幅轮播
		clearInterval(T);
		
	},function(){T = setInterval(play,2000);})
	
	
	// 左边圆图选项卡
	
	$("#content_top .content_top_left #content_top_left_top .topul").click(function(){
		var x = $(this).index();
		console.log(x);
		$("#content_top .content_top_left .content_top_left_bottom").eq(x).fadeIn().siblings("#content_top .content_top_left .content_top_left_bottom").fadeOut();
	})
	
	
	// 案例
$('#gallery').slide({
	prevCell:'#g_right',
	nextCell:'#g_left',
	mainCell:'#g_box ul',
	autoPlay:true,
	effect:"leftLoop",
	easing:"easeInSine",
	interTime:4000,
	delayTime:1000,
	trigger:"click"
})

//遮挡层// 

$('#g_box ul li p img').mouseover(function(){
	//$('#g_box ul li p span').css("display"," block");
	$(this).siblings().stop(true, true).animate({top:'0px',lineHeight: "20em"});
	});
$('#g_box ul li p span').mouseout(function(){
	//$('#g_box ul li p span').css("display"," none");
	$('#g_box ul li p span').stop(true, true).animate({top:'300px',lineHeight: "1em"});
});
	
	


	
})









