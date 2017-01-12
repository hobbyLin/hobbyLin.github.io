define(['text!templates/products.html'], function (tpl) {

    var View1 = Backbone.View.extend({
        el: '#container',

        initialize: function () {
        },
        events:{
			"click .item" : "getDetail"
			
			
		},

        render: function (name) {
            this.$el.html(_.template(tpl, {name: name}));
        },
        getDetail:function(e){
        	var $e = this.$(e.target),url;
        	url =$e.parents('.item').children('img').attr('src');
        	url = encodeURIComponent(url);
        	router.navigate('products/'+url, {trigger: true})
        }
    });

    return View1;
});