//轮播图 
 jQuery(".banner .slideBox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,delayTime:700});

 //cg区的hover插件设置
 $(function() {
				//custom animations to use
				//in the transitions
				var animations		= ['right','left','top','bottom','rightFade','leftFade','topFade','bottomFade'];
				var total_anim		= animations.length;
				//just change this to one of your choice
				var easeType		= 'easeInOutSine';
				//the speed of each transition
				var animSpeed		= 500;
				//caching
				var $hs_container	= $('#hs_container');
				var $hs_areas		= $hs_container.find('.hs_area');
				
				//first preload all images
                $hs_images          = $hs_container.find('img');
                var total_images    = $hs_images.length;
                var cnt             = 0;
                $hs_images.each(function(){
                    var $this = $(this);
                    $('<img/>').load(function(){
                        ++cnt;
                        if(cnt == total_images){
							$hs_areas.each(function(){
								var $area 		= $(this);
								//when the mouse enters the area we animate the current
								//image (random animation from array animations),
								//so that the next one gets visible.
								//"over" is a flag indicating if we can animate 
								//an area or not (we don't want 2 animations 
								//at the same time for each area)
								$area.data('over',true).bind('mouseenter',function(){
									if($area.data('over')){
										$area.data('over',false);
										//how many images in this area?
										var total		= $area.children().length;
										//visible image
										var $current 	= $area.find('img:visible');
										//index of visible image
										var idx_current = $current.index();
										//the next image that's going to be displayed.
										//either the next one, or the first one if the current is the last
										var $next		= (idx_current == total-1) ? $area.children(':first') : $current.next();
										//show next one (not yet visible)
										$next.show();
										//get a random animation
										var anim		= animations[Math.floor(Math.random()*total_anim)];
										switch(anim){
											//current slides out from the right
											case 'right':
												$current.animate({
													'left':$current.width()+'px'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'left'		: '0px'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the left
											case 'left':
												$current.animate({
													'left':-$current.width()+'px'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'left'		: '0px'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the top	
											case 'top':
												$current.animate({
													'top':-$current.height()+'px'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'top'		: '0px'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the bottom	
											case 'bottom':
												$current.animate({
													'top':$current.height()+'px'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'top'		: '0px'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the right	and fades out
											case 'rightFade':
												$current.animate({
													'left':$current.width()+'px',
													'opacity':'0'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'left'		: '0px',
														'opacity'	: '1'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the left and fades out	
											case 'leftFade':
												$current.animate({
													'left':-$current.width()+'px','opacity':'0'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'left'		: '0px',
														'opacity'	: '1'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the top and fades out	
											case 'topFade':
												$current.animate({
													'top':-$current.height()+'px',
													'opacity':'0'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'top'		: '0px',
														'opacity'	: '1'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
											//current slides out from the bottom and fades out	
											case 'bottomFade':
												$current.animate({
													'top':$current.height()+'px',
													'opacity':'0'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'top'		: '0px',
														'opacity'	: '1'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;		
											default:
												$current.animate({
													'left':-$current.width()+'px'
												},
												animSpeed,
												easeType,
												function(){
													$current.hide().css({
														'z-index'	: '1',
														'left'		: '0px'
													});
													$next.css('z-index','9999');
													$area.data('over',true);
												});
												break;
										}	
									}
								});
							});
							
							//when clicking the hs_container all areas get slided
							//(just for fun...you would probably want to enter the site
							//or something similar)
							$hs_container.bind('click',function(){
								$hs_areas.trigger('mouseenter');
							});
						}
					}).attr('src',$this.attr('src'));
				});			
				

            });
            
// cg区标题hover

$(".cg-li-01").hover(function(){
	$(".cg-li-01 .cg-play").fadeIn('slow').siblings().css("display","none");
},function(){
	$(".cg-li-01 .word-logo ").fadeIn('slow').siblings().css("display","none");
})

//获取cg模块对象
//让黄条跟着手表移动
//
$(".cg-li-01,.cg-li-02,.cg-li-03,.cg-li-04,.cg-li-05,.cg-li-06,.cg-li-07,.cg-li-08").hover(
function(){
	var left =Math.round($(this).position().left) ;
	var width = $(this).innerWidth();	

    $(".getcolor").stop().animate({width:width+"px",left:left+"px"},600,"easeInOutElastic")


	

},function(){


}

	);

// 新闻轮播图

jQuery(".news-m .slideBox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,delayTime:400});



//talking板块  点击去除评论
$(".talking article").mousedown(function(){
	
	$(this).addClass("rotateset").addClass("rotate");
	
});

$(".talking article").mouseleave(function(){
	
		$(this).removeClass("rotate").removeClass("rotateset");

	
});

//activity活动板块
var actCount = 0,dclick =false;
$(".activity figure").length
$(".activity figure").innerHeight()
$(".activity .out").innerHeight()
$(".activity .out .top").innerHeight()

var dHeight = Math.floor(($(".activity .out").innerHeight()-$(".activity .out .top").innerHeight()-$(".activity figure").innerHeight())/($(".activity figure").length-1))
for(var i = 0; i <$(".activity figure").length; i++){
	$(".activity figure").eq(i).css("top",($(".activity .out .top").innerHeight()+i*dHeight)+"px")		
}


//点击头部移动相应的海报
$(".activity .out .top").click(function(){
	
	if(actCount>5){actCount=0}

	$(".activity figure").eq(actCount).addClass("act-set").addClass("act-effect").siblings(".activity figure").removeClass("act-effect").removeClass("act-set");
	
	actCount++;
})

//单击选择海报 双击恢复
$(".activity figure").click(function(){
	   actCount = $(this).index();
	   if(dclick==false){
	   			$(this).addClass("act-set").addClass("act-effect").siblings(".activity figure").removeClass("act-effect").removeClass("act-set");
	   			dclick=true;
	   }else{
	   	$(this).removeClass("act-effect").removeClass("act-set");
	   	dclick=false;
	   }

	
	
})



//human影评人板块


$(".human-li>a:first-of-type").hover(function(){
	var index = $(this).parent().index();
	
	$(".bubble").each(function(i){
				if(i == index){
					$(this).fadeIn("slow")
				}else{
					$(this).fadeOut(0);
				}
	})
	
},function(){
	var index = $(this).parent().index();
		$(".bubble").each(function(i){
				
				
			
					if(i == index)
					$(this).fadeOut(0);
				
	})
	
	
})


//culture板块

//第一层
//小轮播图
var culCount = 0;
var culT = setInterval(bgo,2000)
function bgo(){
	culCount++;
	if(culCount>2){culCount=0};
	brun(culCount);
	
	
}
function brun(n){
	$(".b>a").eq(n).fadeIn().siblings(".b>a").fadeOut();	
}

//让薄雾效果藏起来
$(".first .hide,.second .hide").each(function(i){
	var width = $(this).parent().innerWidth();
	$(this).css("left",-1*(width)+"px");
})

//hover 出现薄雾
$(".first li:not(.a),.second li").hover(function(){
	$(this).children(".hide").animate({left:"0px"},"slow","easeInOutQuad");
},function(){
	
	$(this).children(".hide").animate({left:-$(this).innerWidth()+"px"},"fast","easeInOutBounce");
})

//点击更换第二图层
$(".first .a").click(function(){
	$(".first").animate({left:-$(".first").innerWidth()+"px"},500,"swing",function(){
		$(".second").fadeIn();
		$(".second").animate({left:"0px"},500,"swing")
		$(".first").fadeOut();		
	})		
})

$(".second .gonext").click(function(){
	
	$(".second").animate({left:$(".second").innerWidth()+"px"},500,"swing",function(){
		$(".third").fadeIn();
		$(".third").animate({top:"0px"},500,"swing");
		$(".second").fadeOut();
		
	})
	
})
jQuery(".third .slideBox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,easing:"easeInBack"});

$(".third .backtomain").click(function(){
	
	$(".third").animate({top:-$(".third").innerHeight()+"px"},500,"swing",function(){
		$(".third").fadeOut();
		$(".first").fadeIn(0);
		$(".first").animate({left:"0px"},500,"swing");
	})
	
	
})



