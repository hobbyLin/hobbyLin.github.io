/**
 * Created by Administrator on 2017/2/28.
 */
/*
* 重载Backbone.model
*/
define(['backbone'],function(){
    var MainCoreModel = MainCore.MainCoreModel = Backbone.Model.extend({
        initialize : function(options){
            this.init.apply(this.arguments);
            this.__recordlog__();
        },
        init: function(options){

        }
    });
    // 用于存放应用共享的模型对象
    MainCoreModel.shareModels={
        _shareList : {},
        /*
        * 添加共享模型
        */
        add :function(name,model){
            MainCoreModel.shareModels._shareList[name] = model;
        },
        /*
        * 获取共享模型
        */
        get : function(name){
            return MainCoreModel.shareModels._shareList[name];
        },
        /*
        * 移除模型
        */
        remove:function(name){
            var shareList = MainCoreModel.shareModels._shareList;
            shareList[name] = null;
            delete shareList[name];
        }


    }
    return MainCoreModel;
})