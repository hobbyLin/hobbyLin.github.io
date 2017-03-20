/**
 * Created by Administrator on 2017/2/28.
 */
/*
*  重载Backbone.View
*/
define(['backbone'],function(){
    var MainCoreView = MainCore.MainCoreView = Backbone.View.extend({
        // 用于视图关联的识标
        name : '',
        // 视图引用的控制器
        controller: null,
        initialize : function(options){
            MainCoreView.__super__.initialize.apply(this,arguments);
            if(options){
                this.controller = options.controller;
                this.top = options.top;   // 最顶层视图对象
                this.parent = options.parent; // 父层视图对象
            }
            //  存放所有字视图对象
            this.children = [];
            // 根据名称存放所有子视图对象
            this.childrenAsName = {};
            // 根据表达式存放所有子视图列表
            this.childrenAsEl= {};
            // 等待加入视图中的子视图对象列表
            this.awaitChildren = [];
            this.__recordlog__();
            this.init.apply(this,arguments);
        },
        init : function(options){

        },
        //显示视图对象
        show:function(){
            this.$el.show();
        },
        // 隐藏视图对象
        hide:function(){
            this.$el.hide();
        },
        /*
        *添加一个子视图对象到当前对象
        * @param {string} el 添加到视图的节点表达式
        * @param {string} name 字视图名称
        * @param {View Object} view 子视图对象
        * @param {Boolean} await 当节点不存在时是否将子视图加入
        */
        addChild : function (el,name,view,await){
            // 子视图添加的节点
            var $node = this.$el;
            if(el){
                $node = this.$el.find(el);
            }
            if($node.length){
                $node.append(view.el);
                view.parent = this;
                this.children.push({
                    el :el,
                    name : name,
                    view : view
                });
                this.childrenAsName[name] = view;
                if(!this.childrenAsEl[el]){
                    this.childrenAsEl[el] = [view]
                }else{
                    this.childrenAsEl[el].push(view);
                }
                if(!view.parent) view.parent = this; // 添加父视图引用
                if(!view.constroller) view.controller = this.controller; //添加控制器引用
            }else if(await || await === undefined){
                // 节点不存在，存储在待添加列表
                this.awaitChildren.push({
                    el:el,
                    name:name,
                    view:view
                });
            }
            return this;
        },
        /*
        * 渲染有待添加的子视图
        */
        renderChildren : function(){
            var awaitChildren = this.awaitChildren, child = null;
            for(var i = 0 ,len = awaitChildren.length; i < len; i++){
                child = awaitChildren[i];
                this.addChild(child.el,child.name,child.view,false);
            }
        },
        /*
        * 清除所有待添加的子视图列表
        */
        clearAwaitChildren : function(){
            this.awaitChildren.length = 0;
        },
        /*
        *根据视图名和表达式获取视图对象
        */
        getChildByName :function(name){
            return this.childrenAsName[name];
        },
        getChildByEl : function (el){
            return this.childrenAsEl[el];
        },
        /*
        * 获取所有子视图列表
        */
        getChildren :function(){
            return this.children;
        },
        /*
          私有
        */
        _destroyChild : function(){
            var children = this.children,child = null,childName ='',childEl = '',childValue = '';
            for(var i = 0 , len = children.length ; i < len ; i++){
                child = children[i];
                childName = child.name;
                childEl = child.el;
                childValue = child[type];
                if(childValue == value){
                    child.view.destroy();
                    this.childrenAsName[childName] = null;
                    this.childrenAsEl[childEl]=null;
                    delete this.childrenAsName[childName];
                    delete this.childrenAsEl[childEl];
                    break;
                }
            }
        },
        /*
        * 根据名称销毁子视图
        * @param {string} name
        */
        destroyChildByName : function(name){
            this._destroyChild('name',name);
        },
        destroyChildByEl : function(el){
            this._destroyChild('el',el);
        },
        destroyChilds : function(){
            var children = this.children;
            for(var i = children.length-1; i >=0; i-- ){
                child = children[i];
                children.splice(i,1);
                child.view.destroy();
            }
            this.clearAwaitChildren();
            this.childrenAsName = {};
            this.childrenAsEl={};
            this.children.length = 0;
        },
        remove : function(){
          MainCoreView.__super__.remove.apply(this,arguments);
          // 销毁子视图对象
            this.destroyChilds();
            // 解除事件绑定
            this.undelegateEvents();
            this.parent = null;
            this.controller = null;
            this.top = null;
            this.model = null ;
        },
        /*
        *  销毁当前视图对象 同时销毁所有
        */
        destroy :function(){

        }

    });
    // 用于存放应用中共享的视图对象
    MainCoreView.shareViews = {
        // 私有
        _shareList: {},

        /*
        * 添加共享模型
        */
        add : function(name,view){
          this._shareList[name] = view;
        },
        get:function(name){
            return this._shareList[name];
        },
        remove: function(name){
            var shareList = this._shareList;
            shareList[name] = null;
            delete shareList[name];
        }
    }
    return MainCoreView;
})