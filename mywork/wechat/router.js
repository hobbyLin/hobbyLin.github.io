define(['backbone'], function () {
		console.log('router');
    var Router = Backbone.Router.extend({

        routes: {
            '': 'home',
            'products(/:detail)': 'products',
            'aboutus':'about',
            'contact':'contact'
        },
		
        //路由初始化可以做一些事
        initialize: function () {
        },

        home: function() {
        	
            var url = 'module/controller';
            //这里不能用模块依赖的写法，而改为url的写法，是为了grunt requirejs打包的时候断开依赖链，分开多个文件
            require([url], function (controller) {
                controller();
            });
        },
        products : function(detail){
        	var detail = detail || null;
        	
        	var detail = detail || null,url;
        	if(detail === null ){
        	url = 'module/controller-products';
        	require([url], function (controller) {
                controller();
            });
        	}else{
        	var detail = decodeURIComponent(detail);
			url = 'module/controller-detail';
			require([url,'iscroll'], function (controller,IScroll) {
				
				console.log(IScroll);
			    controller(IScroll,detail);
			});
        	}
        	
        	
        },
        about : function(){
        	
        	console.log('about page');
            var url = 'module/controller-about';
            //这里不能用模块依赖的写法，而改为url的写法，是为了grunt requirejs打包的时候断开依赖链，分开多个文件
            require([url], function (controller) {
                controller();
            });        	
        	
        },
        contact : function(){
        	
        	
        	console.log('contact page');
        	var url = 'module/controller-contact';
            //这里不能用模块依赖的写法，而改为url的写法，是为了grunt requirejs打包的时候断开依赖链，分开多个文件
            require([url], function (controller) {
                controller();
            });  
        	
        }

//      //name跟路由配置里边的:name一致
//      module2: function(name) {
//          var url = 'module2/controller2.js';
//          require([url], function (controller) {
//              controller(name);
//          });
//      },
//
//      defaultAction: function () {
//          console.log('404');
//          location.hash = 'module2';
//      }

    });

    window.router = new Router();
    router.on('route', function (route, params) {
        console.log('hash change what the fuck', arguments);  //这里route是路由对应的方法名
    });

    return router;    //这里必须的，让路由表执行
});