require.config({
	shim:{
	 'jquery1.11.3':{
	 	exports:'$'
	 }
	 
   }
		
})


require(['jquery1.11.3'],function($){
	

//图片特效
$('.one').click(function(){
   $('.hover').fadeIn(1000);
   $('.one').eq($(this).index()).css({'z-index':'4'}).siblings().css({'z-index':'0'});
   });
   
   $('.hover').click(function(){
   $('.hover').fadeOut(1000);

   });
   
//图片特效结束



//尾页星星特效
      setInterval(function(){
	  $('.star').fadeIn(1000)
	  $('.star').fadeOut(1000)      	
      },1000)

//尾页星星特效结束



//中间图片轮播图特效
var k=0;
 var z=setInterval(fn,3000)

function fn(){
	
	k++;
	if(k>2){k=0}
		
	
	
	$('.tab1 img').eq(k).show().siblings().hide();
	$('.tab2 img').eq(k).show().siblings().hide();
	$('.tab3 img').eq(k).show().siblings().hide();
	$('.tab4 img').eq(k).show().siblings().hide();
	
	
	$('.tab5 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	$('.tab6 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	$('.tab7 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	$('.tab8 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	
	
	$('.tab9 img').eq(k).fadeIn(2000).delay(1200).siblings().fadeOut(2000);
	$('.tab10 img').eq(k).fadeIn(2000).delay(1200).siblings().fadeOut(2000);
	$('.tab11 img').eq(k).fadeIn(2000).delay(1200).siblings().fadeOut(2000);
	$('.tab12 img').eq(k).fadeIn(2000).delay(1200).siblings().fadeOut(2000);


    $('.tab13 img').eq(k).show().siblings().hide();
	$('.tab14 img').eq(k).show().siblings().hide();
	$('.tab15 img').eq(k).show().siblings().hide();
	$('.tab16 img').eq(k).show().siblings().hide();
	


    $('.tab17 img').eq(k).slideDown(2000).siblings().slideUp(2000);
    $('.tab18 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	$('.tab19 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	$('.tab20 img').eq(k).slideDown(2000).siblings().slideUp(2000);
	
}
	
	

	$('.one').mouseover(function(){
		clearInterval(z)
	})
	
	$('.one').mouseout(function(){
		z=setInterval(fn,3000)
	})

//中间图片轮播图特效结束


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