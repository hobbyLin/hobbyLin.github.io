define(['text!templates/index.html'], function (tpl) {

    var View1 = Backbone.View.extend({
        el: '#container',

        initialize: function () {
        },
		events:{
			"click .item" : "getDetail",
			"click .post-thumb a" :"getDetail"
			
			
		},
        render: function (name) {
        	
            this.$el.html(_.template(tpl, {name: name}));
           
        },
        getDetail:function(e){
        	e.preventDefault();
        	//console.log(e.target)
        	var $e = this.$(e.target),url;
        	if($e.is('a')){
        		url = $e.parents('.post-thumb').children('img').attr('src');
        	}else{
        		 url =$e.parents('.item').children('img').attr('src');
        	};
        	url = encodeURIComponent(url);
        	router.navigate('products/'+url, {trigger: true})
        	
        	
        }
        
        
        
    });

    return View1;
});