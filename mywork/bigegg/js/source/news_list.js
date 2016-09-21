

//动态刷新新



$('section .inner .main .news').each(function(e){
	if(e<5){
		
		this.style.display="block";
	}
	else{
		this.style.display="none";
	}
	
})

function page(num){
	var max = num*5
	var min = num*5-6
	
	$('section .inner .main .news').each(function(e){
	if(e>min && e<max){
		
		this.style.display="block";
	}
	else{
		this.style.display="none";
	}
	
})			
}




$('section .inner .main  ul li a').click(function(){
	$(this).addClass("noborder").parent().siblings().children("a").removeClass("noborder");
	
	if($(this).html()=="1"){    //第一个选项
		page(1);
		
	}
	
	if($(this).html()=="2"){    //第2个选项
   		page(2);
		
	}

	if($(this).html()=="3"){    //第2个选项
		page(3);
		
	}
	
	if($(this).html().match("下一页")=="下一页"){
		
		
		if($("section .inner .main .news").eq(4).css("display")=="block"){
			
			page(2);
		   
		}else if($("section .inner .main .news").eq(9).css("display")=="block"){
			page(3);
		}
		else if($("section .inner .main .news").eq(13).css("display")=="block"){
			page(1);
		}						
	}
	if($(this).html().match('最后一页')=='最后一页'){    //第2个选项
		page(3);
		
	}

	
	
	
})
