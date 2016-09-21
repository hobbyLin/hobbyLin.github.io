var num = 0,i = 1,w=1,left=0; 
T = setInterval(play,50);
                                    // 无缝轮播
$(".nav ul div.liall").html($(".nav ul div.liall").html()+$(".nav ul div.liall").html())
$('section .inner .main .photo .nav ul .left').click(function(){
	w=-1;
	i = -1;
	if(num == -8){
		num = 0;
	}	
	move();		
})
$('section .inner .main .photo .nav ul .right').click(function(){
	w=1;
	i = 1;
	if(num == 0){
		num = -8;
	}	
	move();		
})
$(".nav ul").hover(
	function(){
		clearInterval(T);
	},
	function(){
		T = setInterval(play,50);
		
	}

)




function move(){
	num = num +i
	$(".nav ul div.liall").css("margin-left",82*num+"px")		
}



function play(){
	var left = $(".nav ul div.liall")[0].offsetLeft;
	left=left+w;
	if(left>0){
		left = -656
	}
	if(left<-656){
		left = 0
	}
	
	$(".nav ul div.liall").css("margin-left",left+"px")	
	
}



//点击获取图片
var aNum;
$('section .inner .main .photo .nav ul li').click(function(){
	aNum = $(this).index();
	if(aNum>=8){
		aNum = aNum-8;
	}
	$('section .inner .main .photo .show .left').css("background","url(images/huimei_pic_"+aNum+".gif)  no-repeat").css("background-size","440px 245px");
	
	
	
	
})

// show 滑过
//$('section .inner .main .photo .show').mouseover(function(){
//	$('section .inner .main .photo .show div.slide').animate({left:"0px"},500)
//	
//	
//})
//$('section .inner .main .photo .show').mouseleave(function(){
//	$('section .inner .main .photo .show div.slide').animate({left:"653px"},200)
//	
//	
//})    /// 反应迟钝

$('section .inner .main .photo .show').hover(
	function(){
		$('section .inner .main .photo .show div.slide').animate({left:"0px"},500)
	},function(){
		$('section .inner .main .photo .show div.slide').animate({left:"653px"},200)
	}
	
	
)
