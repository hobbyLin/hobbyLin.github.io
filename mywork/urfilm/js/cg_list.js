require.config({
	shim:{
	 'jquery1.11.3':{
	 	exports:'$'
	 }
	 
   }
		
})


require(['jquery1.11.3'],function($){
	




//尾页星星特效
      setInterval(function(){
	  $('.star').fadeIn(1000)
	  $('.star').fadeOut(1000)      	
      },1000)

//尾页星星特效结束


//控制最底部特效开始
//	$(".best-rfig a").hover(function(){
//		$(this).addClass("hover");
//		$(this).find(".news").siblings().stop().animate({width:"100px",height:"110px",padding:"10px"},1000);
//	
//	},function(){
//		$(this).removeClass("hover");
//		$(this).find(".news").siblings().stop().animate({width:"100%",height:"100%",padding:"0px"},1);
//	});	
//		
//	 	
//	 	$(".best-lfig a").hover(function(){
//		$(this).addClass("hover");
//		$(this).find(".news").siblings().stop().animate({width:"140px",height:"96px",padding:"10px"},1000);
//	
//	},function(){
//		$(this).removeClass("hover");
//		$(this).find(".news").siblings().stop().animate({width:"100%",height:"100%",padding:"0px"},10);
//	});	
		

//控制最底部图片特效结束











});