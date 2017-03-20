/**
 * Created by Administrator on 2017/2/28.
 */
// 封装ajax
;(function(win){
    console.log('这是load文件');
    win.goSomeWhere=null;

    win.updateApp = function(appName,callback){
        win.linkName = appName;
        win.gotoAppCallback = callback;
        // 获取更新状态 需要就更新 不需要就直接进入app
        // if(App.needUpdate("app/"+ win.linkName) && Object.keys(appInfo).indexOf(win.linkName) !== -1){
        //     App.update("app/"+ win.linkName,"updateAppCallback");
        // }else{
        //     gotoAppCallback();
        // }

        gotoAppCallback();
    }



})(this)