define(['text!templates/product-detail.html'], function (tpl) {

    var View1 = Backbone.View.extend({
        el: '#container',

        initialize: function () {
        	
        	
        	
        },

        render: function (name) {
            this.$el.html(_.template(tpl, {name: name}));
        }
    });

    return View1;
});