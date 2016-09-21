

// 选项卡功能

 // 老实巴交的方法
 
 
//$("#content .main .left ul li").click(function(){
//	var index = $(this).index();
//	$(this).addClass("ulli").children().addClass("aa").parent().siblings().removeClass("ulli").children().removeClass("aa");
//	$("#content .main .right .right_bar .bar_data").eq(index).addClass("hover").children().addClass("ahover").parent().siblings().removeClass("hover").children().removeClass("ahover");
//	$("#content .main .right .memberCt").eq(index).fadeIn().siblings("#content .main .right .memberCt").css("display","none");
//	
//	$("#member_data").html((index==0)?"基本信息":(index==1)?"账号设置":"客户留言");
//	
//	
//	
//})
//
//
//
//$("#content .main .right .right_bar .bar_data").click(function(){
//	var index = $(this).index();
//	$(this).addClass("hover").children().addClass("ahover").parent().siblings().removeClass("hover").children().removeClass("ahover");
//	$("#content .main .left ul li").eq(index).addClass("ulli").children().addClass("aa").parent().siblings().removeClass("ulli").children().removeClass("aa");
//	$("#content .main .right .memberCt").eq(index).fadeIn().siblings("#content .main .right .memberCt").css("display","none");
//	$("#member_data").html((index==0)?"基本信息":(index==1)?"账号设置":"客户留言");
//})



// 简练方式

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
	function exchang(i){
	
	$("#content .main .left ul li").eq(i).addClass("ulli").children().addClass("aa").parent().siblings().removeClass("ulli").children().removeClass("aa");
	$("#content .main .right .right_bar .bar_data").eq(i).addClass("hover").children().addClass("ahover").parent().siblings().removeClass("hover").children().removeClass("ahover");
	$("#content .main .right .memberCt").eq(i).fadeIn().siblings("#content .main .right .memberCt").css("display","none");
	$("#member_data").html((i==0)?"基本信息":(i==1)?"账号设置":"客户留言");
}


$("#content .main .left ul li,#content .main .right .right_bar .bar_data").click(function(){
	var index = $(this).index();
	exchang(index);
	
})
	
})

