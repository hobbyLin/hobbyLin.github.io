//这是公共部分js代码		
                        var schSwitch = true;
						document.getElementsByClassName("search")[0].onclick=function(){
							if(schSwitch==true){
								document.getElementById("search").style.display="block";
								
								schSwitch = false;
							}else{document.getElementById("search").style.display="none";schSwitch = true;}
							
							
						}
						
//有啊精华区hover事件
$(".best-hover").each(function(i){
	
	$(this).hover(function(){
//		console.log(i)
		for(var x = 0; x<$(".best-hover").length; x++){
			if(x != i){
				$(".best-hover").eq(x).removeClass("best-up").addClass("best-down");
			}
			
		}
	},function(){
		for(var x = 0; x<$(".best-hover").length; x++){
			if(x != i){
				$(".best-hover").eq(x).removeClass("best-down").addClass("best-up");
				
			}
			
		}
	})
	
	
})

