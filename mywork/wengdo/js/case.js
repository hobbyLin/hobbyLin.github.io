


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


require(['jquery'],function($){
	var num =0;

$("#content_a01,#content_a03").click(function(){
	num--;
	if(num<0){
		num =4;
	}
	play(num);
	
})


$("#content_a02,#content_a04").click(function(){
  num ++;
  if(num>4){
  	num =0;
  }
  
  play(num);
})


//函数换页面

function play(index){
	
	$("#content .content_main").css("background","url(images/case_01_07"+index+".gif) no-repeat 50% 51%")
	
	
}

	
})


