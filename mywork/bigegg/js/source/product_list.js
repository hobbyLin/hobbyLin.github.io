var index = 0, x=0;
T=setInterval(operation,1000)
$("nav>img").eq(0).show();
$("nav ul li").mouseover(function(){
	
	//$(this).addClass("li1").siblings().removeClass("li1");
	index = $(this).index();
	move(index);
	
	//index = index +2;
	//$("nav>img").eq(index).show().siblings("nav>img").hide()
	//$("nav").eq(0).css("background", "url(images/banner_0"+index+".gif) no-repeat 50% 98%")
	
	
})
function move(i){
	$("nav ul li").eq(i).addClass("li1").siblings().removeClass("li1");
	$("nav>img").eq(i).fadeIn("fast").siblings("nav>img").fadeOut("fast");
	
}

function operation(){
	x=x+1;
	if(x>3){x=0}
	
	
	move(x);
	
	
}
$("nav").mouseover(function(){
	clearInterval(T);
	
}).mouseout(function(){
	T=setInterval(operation,1000);
})



