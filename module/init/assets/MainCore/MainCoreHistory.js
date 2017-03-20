/**
 * Created by Administrator on 2017/2/28.
 */
// 重载Backbone.History
define(['backbone'],function(){
    var MainCoreHistory = MainCore.MainCoreHistory = Backbone.History.extend({
        initialize : function(options){
            this.init.apply(this,arguments)
        },
        init : function(){

        }
    });
    return MainCoreHistory;
})