/**
 * Created by Administrator on 2017/3/16.
 */
define(["MainCore",
    "MainCoreController",
    "view/indexWrapView",
    'view/indexMenuView',
    "view/indexHeadView"
],function(MainCore,
           MainCoreController,
           indexWrapView,
           indexMenuView,
           indexHeadView){
    var mainController = MainCoreController.extend({
        //模块名
        module:"app1",
        name:'main',
        init:function(){
            this.setWrapView();
        },
        setWrapView:function () {
            var app1IndexWrapView = new indexWrapView();
            MainCore.MainCoreView.shareViews.add("app1IndexWrapView",app1IndexWrapView);
            console.log(indexMenuView)
            app1IndexWrapView.setMenu(indexMenuView);
            app1IndexWrapView.setHeader(indexHeadView);
        }
    });
    return mainController;
});