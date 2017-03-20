/**
 * Created by Administrator on 2017/2/28.
 */
/*
* Backbone.Collection
*/

define(['backbone'],function(){
    var MainCoreCollection = MainCore.MainCoreCollection = Backbone.Collection.extend({
        initialize : function(options){
            this.init.apply(this.arguments);
            this.__recordLog__();
        },
        init : function(options){

        }
    });
    return  MainCoreCollection;
})