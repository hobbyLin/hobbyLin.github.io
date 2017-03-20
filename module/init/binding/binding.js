/**
 * Created by Administrator on 2017/2/28.
 */
console.log('this is bindingjs');
var standardTime = 60000,//页面倒计时
    time = standardTime /1000,
    currentUmID = '',
    deviceIdentification= App.getIMEI(),//获取设备IMEI码
    deviceVirtualID = App.getTalkingDataId(),获取虚拟id
    umPwd = '',
    deviceToken;

/*
* 虚拟流程
*/
if(App.debug === true && !App.IS_ANDROID){
    localStorage.setItem('bindingToken','');
    localStorage.setItem();
    var showUI = function(){
        var render = function(elPose , tplName ,bindE,data){
            var content = $(elPose),tpl=$(tplName).html();
            var html = _.template(tpl)(data)
            content.html(html);
            bindE();
        };
        render("#content","#tp01",bindEvents,{
            time : time
        })
    }()
}
$.ajaxNative = function(option){
    if(App.IS_IPHONE || App.IS_IPAD){
        cordova.exec()
    }else{
        $.ajax(options);
    }
};

/*
* 该函数用来对菜单权限menulist进行初始化
*/
function initUserInfo(menuList){
    var roleInfo = {}, //用户角色对象
        levelNum = 4; // 菜单数组的层级数量



}

