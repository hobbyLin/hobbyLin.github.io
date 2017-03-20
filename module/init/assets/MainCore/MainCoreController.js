/**
 * Created by Administrator on 2017/2/28.
 */
/*
* 创建控制器 Controller 控制器，控制器作为执行业务逻辑的容器，负责创建调度模型和视图
*/
define(function(){
    var MainCoreController = MainCore.MainCoreController = function(options){
        this.initialize.apply(this,arguments);
    }
    // 控制器 继承backbone.Events， 因此运行使用events中的事件方法
    _.extend(MainCoreController.prototype,Backbone.Events,{
        initialize : function(options){
            var actions = this.actions;
            if(actions){
                var router = MainCore.router, list = [] , route = null, prefix = this.module+'/'+this.name;
                for (var key in actions){
                    list.unshift([key,this[actions[key]]]);

                }
                for(var i = 0 , len = list.length; i <len ; i++){
                    route = list[i];
                    router.route(prefix + (route[0] === '' ? '' : '/' + route[0]), '' , _.bind(route[1],this));
                }
            }
            this.__recordlog__();
            this.init.apply(this,arguments);
        },
        //模块名
        module : '',
        //控制器名
        name :'',
        // 模块规则
        actions : null,
        // 初始化方法
        init :function(options){

        },
        // 在销毁控制器时同时移除url中的action监管
        destroy : function(){
            var actions = this.actions;
            if(actions){
                var router = MainCore.router, handlers = MainCore.history.handlers, handler = null,
                    prefix = this.module +'/'+this.name+'/';
                for(var key in actions){
                    var exp = router._routeToRegExp(prefix + key).toString();
                    for(var i = 0 ,len = handlers.length; i < len ; i++){
                        handler= handlers[i];
                        if(handler.route.toString() == exp){
                            handlers.splice(i,1);
                            break
                        }
                    }
                }
            }
        }
    });

    //添加控制器的继承方法，在继承子控制器时自动添加getInstance 获取单例

    MainCoreController.extend = function(protoProps, classProps){
        var Controller = MainCore.MainCoreModel.extend.call(this,protoProps,classProps);
        Controller.getInstance = function(options){
            if(!this._instance){
                this._instance = new this(options);
            }
            return this._instance;
        }
        return Controller;
    }

    return MainCoreController;
})