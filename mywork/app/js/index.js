// 轮播图
var T,i=0;

touch.on('.baner p a', 'tap', function(ev){
   i= $(this).index();
   clearInterval(T);
   $(this).addClass("a_white").siblings().removeClass("a_white");
   $(".baner img").eq(i).fadeIn().siblings(".baner img").fadeOut();
   setTimeout(function(){
   	T = setInterval(play,2000);
   },4000)
   
});



T = setInterval(play,2000)

function play(){ // 轮播函数
	i++;
	if(i>4){i=0}
	$(".baner img").eq(i).fadeIn().siblings(".baner img").fadeOut();
	
	$(".baner p a").eq(i).addClass("a_white").siblings().removeClass("a_white");
}


var  ccc = document.getElementById("location").style;

console.log(ccc);