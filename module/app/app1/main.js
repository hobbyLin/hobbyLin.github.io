/**
 * Created by Administrator on 2017/3/15.
 */
define([
    'tools/config',
    'tools/common',
    'view/indexWrapView',
    'view/indexMenuView',
    'view/indexHeadView',
    'controller/MainController',
    'controller/testController/testController'
],function(
    config,
    common,
    indexWrapView,
    indexMenuView,
    indexHeadView,
    MainController,
    testController
){
  // 初始化MainCore过滤器
    MainCore.addFilter("app1",{
        conditions:[/^\/?app1/ig],
        handler:function(routeReg,fragment,args,filterIndex){
            // 如果地址错误 会被过滤
            window.lastHash = window.currentHash || "";
            window.currentHash = fragment;
            var app1IndexWrapView = MainCore.MainCoreView.shareViews.get('app1IndexWrapView');
            if(app1IndexWrapView == undefined){ // 若是不存在
                var app1IndexWrapView = new indexWrapView();
                MainCore.MainCoreView.shareViews.add("app1IndexWrapView",app1IndexWrapView);
                app1IndexWrapView.setMenu(indexMenuView);
                app1IndexWrapView.setHeader(indexHeadView);
                // 设置头部按钮
                app1IndexWrapView.headerVeiw.button(fragment);
                app1IndexWrapView.menuView.menuHash(null,fragment);
            }else{
                //改变按钮
                app1IndexWrapView.headerVeiw.button(fragment);
                app1IndexWrapView.menuView.locationHash(fragment);
            }
            MainCore.execFilter(routeReg,fragment,args,filterIndex + 1);
        }
    })




    return function(){
       MainController.getInstance();
        testController.getInstance();
    }
})