/**
 * Created by Administrator on 2017/2/28.
 */
console.log("处理业务逻辑");
// 给标记 设置不同的打开区块
 App.debug && ( localStorage.setItem("login-guest",'{"10001":{"100011":{},"100012":{}},"10002":{},"10003":{}}'))
 localStorage.setItem('littleFriend',"徐信阳")
// 针对电脑和手机的两种事件类型


var UserRole = JSON.parse(localStorage.getItem('login-guest')),
    //获取能够进入权限的appid
    PermissionArr = Object.keys(UserRole);
 // 页面图标和文字配置信息
userInfo ={
    backbone :[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    },{
        appId:'10005',
        name:'secondApp',
        appName:'第二个app'
    }],
    angular:[{
        appId:'10003',
        name:'firstApp',
        appName:'第一个app'
    }],
    vue:[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    }],
    react:[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    }],
    plugin:[{
        appId:'10001',
        name:'firstApp',
        appName:'第一个app'
    }],
    guestId : UserRole.guestId
}
// 处理角色信息 渲染
var userInfoProgress = function(key){
    for(var i = 0 ; i < userInfo[key].length; i++){
        PermissionArr.indexOf(userInfo[key][i].appId) === -1 ?userInfo[key][i].display= 'inline-block' : userInfo[key][i].display='none';
    }

};
userInfoProgress("backbone");
/*
* renderView
 * @param {string} elpos 要填充模板element元素jq选择表达方式
 * @param {string} tpName 所要使用模板jq选择表达式
 * @param {function} 渲染后执行的事件
 * @param {Object} data 渲染页面的数据
*/

var render = function(elPose , tplName ,bindE,data){
    var content = $(elPose),tpl=$(tplName).html();
    var html = _.template(tpl)(data)
    content.html(html);
    bindE();
}

/*
* [gtoApp 根据linkName跳转到相应App]
*/
function checkSccIsNineNumber(scc){
    if(scc == '' || !scc) return false;
    if(scc.length != 9 )return false;
    scc = scc+'';
    if(scc.match(/^\d+$/g) === null) return false;
    return true;
}
function gotoApp(){
    // 如果没有权限 阻止程序调到应用内
    console.log(window.appId)
    console.log(UserRole[window.appId])
    if(window.appId !== 'allUser' && window.appId !== '10008' && Object.keys(UserRole[window.appId]).length === 0){
        alert("sorry guys, u don't have the permission access my blog");
        return;
    }
    switch(window.linkName){
        case 'firstApp':
            // 进行验证
            console.log("firstApp")
            localStorage.setItem('mylove','yy')
            location.href = "../../app/app1/index.html"
            break;
        case 'secondApp':
            // 验证
            console.log("secondApp")
            //location.href = ""
            break;
    }
}
/*
* 点击应用图标的事件处理
*/
var gotoCorresponding = function(e){

    if(e.target.dataset.link && e.target.parentNode.parentNode.querySelector('.appMark').style.display !== 'inline-block'){
        e.target.classList.remove('app_icon_hover');
        window.linkName = e.target.dataset.link;
        window.appId = e.target.dataset.appid;
    }else{
        //其他
        console.log("这是图标事件额")
        return;
    }
    window.updateApp(window.linkName,gotoApp);

}
/*
* 切换应用大类的标签
*/
var toggleAppType = function(e){
    var appListDom = document.querySelectorAll("[data-app-list]"),
        appTypeButtonList = document.querySelectorAll('[data-app-type');
     alert(appListDom.length);
    if(e.target.dataset.appType){
        for(var i = 0 ; i < appListDom.length; i++){
            appListDom[i].classList.add("dsn");
        }
        for(var i = 0 ; i < appTypeButtonList.length;i++){
            appTypeButtonList[i].classList.remove("curron");
        }
        e.target.classList.add('curron');
        document.querySelector('[data-app-list="'+e.target.dataset.appType+'"]').classList.remove('dsn');
    }

};
/*
* events  页面元素事件添加逻辑
 * 没有输入参数，每次render都会回调
*/
var bindEvents = function(){
    document.body.addEventListener(App.clickUp,gotoCorresponding,false);
    document.body.addEventListener(App.clickDown,function(e){
        if(e.target.dataset.link && e.target.parentNode.parentNode.querySelector('.appMark').style.display !== 'inline-block'){
            // 点击瞬间 改变图标颜色
          //  e.target.classList.add('app_icon_'+e.target.dataset.link + "_hover");
            e.target.classList.add("app_icon_hover");
        }
    },false);
    // 标签加事件响应
    document.querySelector("#apptype").addEventListener(App.clickDown,toggleAppType,false );
    // document.querySelector(".logout").addEventListener("touchstart",function(){
    //     if(confirm('是否离开')){
    //         location.href = "../binding/binding.html";
    //         return;
    //     }
    // })
};
// 打印localStorage到日志
var localStorageLog = function(){
    var log , json ={};
    for(var key in localStorage){
        json[key] = localStorage.getItem(key);
    }
    log = '[localStorage]:' + JSON.stringify(json);
    console.log(log);
}
// 渲染页面
console.log("appjs");
render("#content","#tp03",bindEvents,userInfo);
localStorageLog();