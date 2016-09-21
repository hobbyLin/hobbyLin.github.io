var navIndex = 0, i=1;

$(function(){ 
	T = setInterval(run,2500);
	
	$("nav ul li").mouseover(function(){           // nav 轮播   
	navIndex = $(this).index();
	navIndex = navIndex+1;
	picgo(navIndex)	
})
$("nav").mouseover(function(){
	clearInterval(T);
	
})
$("nav").mouseout(function(){
	T = setInterval(run,2500);
	
})
	
	
function run(){
	navIndex = navIndex + 1;
	if(navIndex>4){
		navIndex = 1
	}
		picgo(navIndex)	;
}

function picgo(navIndex){
	$("nav ul li").eq(navIndex-1).addClass("li1").siblings().removeClass("li1");
	$("nav").css("background", "url(images/banner_0"+navIndex+".gif) no-repeat");
	if(navIndex == 1 ){
		$("nav .title").show();
		$("nav .video").show();
		$("nav>a.vote").hide();
		
	}
	else if(navIndex == 2){
		$("nav .title").hide();
		$("nav .video").hide();
		$("nav>a.vote").show();
		
	}
	else{
		$("nav .title").hide();
		$("nav .video").hide();
		$("nav>a.vote").hide();
	}
	
	
	
}


	
	
	
	// 微博关注的页面切换
	

	$('.focus .arrow').click(function(){
		$('.focus .logo1,.focus .logo2,.focus .logo3,.focus .logo4,.focus .logo5,.focus h2').fadeOut("fast");
		
		var height =$(".focus").innerHeight()
		if(height>5){i=-1; $('.focus .logo1,.focus .logo2,.focus .logo3,.focus .logo4,.focus .logo5,.focus h2').fadeOut("fast");}
		if(height<5){i=1;
		
		}
		
	T = setInterval(play,5);
		
		
		
		
	})
	
	
	
	
	function play(){
		var height =$(".focus").innerHeight()
		height=height+i;
		$(".focus").css("height", height+"px");
		if(height<5){
			clearInterval(T);
			$(".focus .arrow").css("transform","rotateZ(180deg)");
			
		}
		if(height>451){
			
			clearInterval(T);
			 $('.focus .logo1,.focus .logo2,.focus .logo3,.focus .logo4,.focus .logo5,.focus h2').fadeIn("fast");
			 $(".focus .arrow").css("transform","rotateZ(0deg)");
		}
		
	}
	
	
	
	
	
	
	
	
})

