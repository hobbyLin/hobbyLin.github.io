/**
 * Created by Administrator on 2017/2/28.
 */
define(['backbone','MainCoreRequest'],function(){
    var MainCoreRouter =MainCore.MainCoreRouter= Backbone.Router.extend({
        initialize : function(options){
            this.init.apply(this,arguments);
        },
        init : function(options){

        },
        route:function(route,name,callback){
            if(!_.isRegExp(route)) route = this._routeToRegExp(route);
            if(!callback) callback = this[name];
            var statusReg = new RegExp();
            Backbone.history.route(route,_.bind(function(fragment){
                var args = this._extractParameters(route,fragment);
                MainCore.routeStatus = 200;
                MainCore.execFilter(route,fragment,args);
                statusReg.compile(MainCore.routeStatus,'ig');
                // 判断经过过滤器之后的状态码是否依旧OK，如果不OK的话，执行配置中的状态码处理
                if(!statusReg.test(MainCore.OK_STATUS)){
                    MainCore.handleStatus(MainCore.routeStatus,route,fragment,args);
                    return;
                };
                // 状态ok 继续
                callback && callback.apply(this,args);
                this.trigger.apply(this,['route'+name].concat(args));
                this.trigger('route',args);
                Backbone.history.trigger('route',this,name,args);
                MainCore.request.clear();

            },this));
            return this;
        }
    });
    MainCore.routeStatus = 200;
    return MainCoreRouter;
})