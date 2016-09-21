require.config({
	shim:{
	 'jquery1.11.3':{
	 	exports:'$'
	 }
	 
   }
		
})


require(['jquery1.11.3'],function($){
	
//控制广告图的函数	
  $('.one').click(function(){
	   $('.hover').fadeIn(500);
	   $('.one').eq($(this).index()).css({'z-index':'4',}).siblings().css({'z-index':'0'});
	  
	   })
   $('.hover').click(function(){
   $('.hover').fadeOut(500);

   });	
//控制广告图的函数结束	
	
	
//控制 广告图下面导航条的函数开始
	 setInterval(function(){
	 	
      $('.loginbar ul li .a1').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
        $('.loginbar ul li .a2').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
          $('.loginbar ul li .a3').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
            $('.loginbar ul li .a4').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
              $('.loginbar ul li .a5').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
	 		 	
 	},500)
//控制 广告图下面导航条的函数结束



//控制精华帖子那四个字的函数开始
setInterval(function(){
	 $('.subnav .li2').fadeOut().fadeIn()
	 $('.subnav .li2').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
	 		
	 },2000)
//控制精华帖子那四个字的函数结束


//控制中间字体样式函数
	$('.column .submenu2 p').mouseover(function(){
	$(this).css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''}).css({'font-size':'18px'});
		
	})
		
	$('.column .submenu2 p').mouseout(function(){
		$(this).css({'color':'#b1b1b1'}).css({'font-size':'90%'})
		$('.change').css({'color':'#f41b2e'}).css({'font-size':'100%'})
	})
	
$('.column .submenu2 span').mouseover(function(){
		$(this).css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''})
		
	})
		
	$('.column .submenu2 span').mouseout(function(){
		$(this).css({'color':'#8d8a89'})

	})	
	
//控制中间字体样式函数结束


//有啊活动特效
setInterval(function(){
				
$('.msg h4').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
										
			
			},1000)
					
//有啊活动特效结束



//有啊精华区特效
setInterval(function(){
				
$('.best-bar .jinghua').css({'color':'rgb('+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+','+parseInt(Math.random()*225)+''});
										
			
			},800)
					
//有啊精华区特效结束







//	控制底部星星的函数开始
	setInterval(function(){
		$('.star').slideDown(1000);
		$('.star').fadeOut(1000);
		
	},100)		
//	控制底部星星的函数结束


//控制最底部图片函数
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
		

//控制最底部图片函数结束


});

