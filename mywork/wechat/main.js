(function (win) {
    //配置baseUrl
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    /*
     * 文件依赖
     */
    var config = {
        baseUrl: baseUrl,           //依赖相对路径
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            zepto: 'js/lib/zepto.min',
            jquery: 'js/lib/jquery.min',
            underscore: 'js/lib/underscore',
            backbone: 'js/lib/backbone',
            text: 'js/lib/text',//用于requirejs导入html类型的依赖
            bootstrap:'js/bootstrap.min',
            iscroll:'js/iscroll'
            
 
        },
        shim: {                     //引入没有使用requirejs模块写法的类库。backbone依赖underscore
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'zepto': {
                exports: '$'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'bootstrap':{
            	deps:['jquery']
            },
            'plugins':{
            	deps:['jquery']
            }

        }
    };

    require.config(config);

    //Backbone会把自己加到全局变量中
    require(['backbone','router','bootstrap'], function(){
    	$('.navli').click(function(){  //头部导航
    		
    		$(this).addClass('active').siblings('.navli').removeClass('active');   		
    		
    	})
    	
    //判断手机函数
		 function page() {
		  	var IsPhone;
		 if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		//移动端
		IsPhone = true;
		}
		else {
		IsPhone =false;
		//PC端
		}
		return IsPhone;
		}
		 var IsPhone = page();
    
    //判断手机电脑 处理底部footer
    	if(IsPhone){
					$(window).scroll(function(e){
										
					var footer = $("footer"),h=footer.height();
					var scrollTop = $(this).scrollTop();
					var scrollHeight = $(document).height();
					var windowHeight = $(this).height();
					
					if(scrollTop+windowHeight >=scrollHeight ){
					  
					 footer.animate({bottom:"0px",opacity:1},500,function(){
					setTimeout(function(){
						footer.animate({bottom:'-100px',opacity:0},500)
									
								},2000)
							});
					  			  
						}   		 		  		
					})
   			
    		}else{
    			$("footer").animate({bottom:"0px",opacity:1},100);
    			
    		}

  
		

    	
    	console.log('第一个main加载结束')
    	console.log($.fn.isotope)
        Backbone.history.start();   //开始监控url变化
        
    });

})(window);