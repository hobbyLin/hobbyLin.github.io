
$(function () {
	var i=0;
	$('#personal_page_main_top_left').mouseover(function () {
		$('#personal_page_main_top_left p').css({'display':'none'});								
	});


	$('#personal_page_main_top_left #video1').click(function () {	
		i=1;			
		$('#personal_page_main_top_left #video1').css({'display':'none'});
		$('#personal_page_main_top_left #one').css({'display':'none'});
		$('#personal_page_main_top_left #div').append('<video src="images/400p.ogg" autoplay="autoplay" controls="controls" width="866" height="601" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>');												
	});

	$('#personal_page_main_top_left').mouseout(function () {
		$('#personal_page_main_top_left p').css({'display':'block'});	
		if (i==1) {
			$('#personal_page_main_top_left p').css({'display':'none'});
			$('#personal_page_main_top_left #video1').css({'display':'none'});
		}	
	});
	
	
});



$(function(){
	$(".content").hover(function(){
		$(this).children(".txt").stop().animate({height:"36px"},200);
		$(this).find(".txt h3").stop().animate({paddingTop:"130"},550);
		$(this).find(".txt p").stop().show();
	},function(){
		$(this).children(".txt").stop().animate({height:"0px"},200);
		$(this).find(".txt h3").stop().animate({paddingTop:"0px"},550);
		$(this).find(".txt p").stop().hide();
	})

	$('#personal_page_main_bottom li').click(function () {
		var index=$(this).index();
		run(index);
		function run(index){
			switch(index){
				case 0:
					$("#personal_page_main_top_left #div video").replaceWith('<video src="images/1.mp4" autoplay="autoplay" controls="controls" width="866" height="601" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>');
				break;
				case 1:
					$("#personal_page_main_top_left #div video").replaceWith('<video src="images/2.mp4" autoplay="autoplay" controls="controls" width="866" height="601" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>');
				break;
				case 2:
					$("#personal_page_main_top_left #div video").replaceWith('<video src="images/400p.ogg" autoplay="autoplay" controls="controls" width="866" height="601" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>');
				break;
				case 3:
					$("#personal_page_main_top_left #div video").replaceWith('<video src="images/1.mp4" autoplay="autoplay" controls="controls" width="866" height="601" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>');
				break;
				case 4:
					$("#personal_page_main_top_left #div video").replaceWith('<video src="images/2.mp4" autoplay="autoplay" controls="controls" width="866" height="601" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>');
				break;
			}
			
	
		};
	});


	// $('#personal_page_main_bottom li').click(function () {
	// 	var index=$(this).index();
	// 	run(index);
	// });
	// function run (index) {
	// 	$('#personal_page_main_bottom ul li .teacherPic').eq(index).css({'display':'none'});
	// 	$('#personal_page_main_bottom ul li .teacher').eq(index).append('<video src="images/400p.ogg" controls="controls" width="200" height="189" loop="loop" poster="images/personal_page_main_left2_03.gif"></video>').parents().siblings().children().children().css({'display':'block'});
	
	// }
});
						




