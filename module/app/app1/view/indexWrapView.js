/**
 * Created by Administrator on 2017/3/16.
 */
define(['text!template/indexWrap.html','MainCoreAll'],function(template){
    var indexWrapView = MainCore.MainCoreView.extend({
        $el:$('body'),
        el : $('body')[0],
        template:_.template(template),
        init:function(){
          this.render();
        },
        setHeader : function(ViewClass,options){
            var headerView = this.headerView;
            if(headerView && this.headerView instanceof  ViewClass){
                headerView.init(options);
                return headerView;
            }else if(headerView){
                headerView.destroy();
            }
            headerView = new ViewClass(options);
            this.$el.prepend(headerView.el);
            this.headerVeiw = headerView;
            return headerView;
        },
        setBody : function(ViewClass,options){
            var bodyView = this.bodyView;
            if(bodyView && this.bodyView instanceof ViewClass){
                bodyView.init(options);
                return bodyView;
            }else if(bodyView){
                this.bodyView.destroy();
            }
            //这里实例化过程也顺便渲染了
            this.bodyView = new ViewClass(options);
            return this.bodyView;
        },
        setMenu :function(ViewClass,options){
            var menuView = this.menuView;
            if(menuView && this.menuView instanceof ViewClass){
                return menuView
            }else if(menuView){
                menuView.destroy();
            }
            menuView = new ViewClass(options)
            this.$el.prepend(menuView.el);
            this.menuView = menuView;
            return menuView;
        },
        render : function(){
            var self = this;
            self.$el.html(self.template());
        }
    });
    console.log(indexWrapView);
    return indexWrapView;
})